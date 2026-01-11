import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getChainConfig,
  getChainKeys,
  getPalletInfo,
  getCallMeta,
  getStorageItemMeta,
} from "../metadata.js";
import { toolResult, toolError } from "../utils/formatting.js";
import { GenerateCodeInput } from "../utils/validation.js";

// Map chain keys to their PAPI descriptor import names
const DESCRIPTOR_MAP: Record<string, string> = {
  polkadot: "polkadot",
  kusama: "kusama",
  moonbeam: "moonbeam",
  bifrost: "bifrost",
  astar: "astar",
  hydration: "hydration",
  westend: "westend",
  rococo: "rococo",
  paseo: "paseo",
  paseo_asset_hub: "paseo_asset_hub",
  polkadot_asset_hub: "polkadot_asset_hub",
  polkadot_people: "polkadot_people",
  // acala: not supported — no descriptor available
};

// Map metadata type names to conventional Substrate parameter names and example values
const TYPE_TO_PARAM: Record<string, { name: string; example: string; needsImport?: string }> = {
  AccountId: { name: "dest", example: 'MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")', needsImport: "MultiAddress" },
  Balance: { name: "value", example: "1_000_000_000_000n" },
  "u128": { name: "value", example: "1_000_000_000_000n" },
  "u64": { name: "amount", example: "1000n" },
  "u32": { name: "index", example: "0" },
  "u16": { name: "value", example: "0" },
  "u8": { name: "value", example: "0" },
  bool: { name: "keepAlive", example: "true" },
  "Vec<bytes>": { name: "keys", example: '["0x..."]' },
  bytes: { name: "data", example: '"0x..."' },
};

function getParamNameAndExample(
  typeName: string,
  index: number,
  seenNames: Set<string>,
): { name: string; example: string; needsImport?: string } {
  const mapping = TYPE_TO_PARAM[typeName];
  let name = mapping?.name ?? typeName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const example = mapping?.example ?? `/* ${typeName} */`;

  // Deduplicate names (e.g., two AccountId params → dest, source)
  if (seenNames.has(name)) {
    const altNames: Record<string, string[]> = {
      dest: ["source", "who", "target"],
      value: ["amount", "maxAmount", "minAmount"],
      index: ["index2", "paraId", "poolId"],
    };
    const alts = altNames[name] ?? [];
    name = alts[seenNames.size] ?? `${name}${index + 1}`;
  }
  seenNames.add(name);

  return { name, example, needsImport: mapping?.needsImport };
}

function getDescriptorName(chainKey: string): string | null {
  return DESCRIPTOR_MAP[chainKey] ?? null;
}

function getConnectionCode(chainKey: string): {
  imports: string;
  setup: string;
  cleanup: string;
} {
  const config = getChainConfig(chainKey);
  if (!config) throw new Error(`Unknown chain: ${chainKey}`);

  const descriptor = getDescriptorName(chainKey);

  // Always use WebSocket provider for simplicity
  const imports = [
    `import { createClient } from "polkadot-api"`,
    `import { getWsProvider } from "polkadot-api/ws-provider/web"`,
    `import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"`,
  ];

  if (descriptor) {
    imports.push(
      `import { ${descriptor} } from "@polkadot-api/descriptors"`,
    );
  }

  const setup = [
    `// Connect to ${config.name}`,
    `const provider = withPolkadotSdkCompat(getWsProvider("${config.ws}"))`,
    `const client = createClient(provider)`,
  ];

  if (descriptor) {
    setup.push(`const typedApi = client.getTypedApi(${descriptor})`);
  }

  return {
    imports: imports.join("\n"),
    setup: setup.join("\n"),
    cleanup: `\n// Clean up when done\n// client.destroy()`,
  };
}

function generateTransactionCode(
  chainKey: string,
  pallet: string,
  method: string,
  params?: Record<string, any>,
): string {
  const conn = getConnectionCode(chainKey);
  const descriptor = getDescriptorName(chainKey);
  const callMeta = getCallMeta(chainKey, pallet, method);

  // Build parameter entries with proper names and example values
  const seenNames = new Set<string>();
  const extraImports = new Set<string>();

  let paramEntries: string;
  if (params && Object.keys(params).length > 0) {
    // User provided explicit params
    paramEntries = Object.entries(params)
      .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
      .join(",\n");
  } else if (callMeta?.required?.length) {
    paramEntries = callMeta.required
      .map((typeName: string, i: number) => {
        const { name, example, needsImport } = getParamNameAndExample(typeName, i, seenNames);
        if (needsImport) extraImports.add(needsImport);
        return `  ${name}: ${example}`;
      })
      .join(",\n");
  } else {
    paramEntries = "  // Add parameters here";
  }

  const importExtra = extraImports.size > 0
    ? `\nimport { ${Array.from(extraImports).join(", ")} } from "polkadot-api"`
    : "";

  if (!descriptor) {
    return [
      `// Transaction: ${pallet}.${method} on ${getChainConfig(chainKey)?.name}`,
      `// Note: Chain "${chainKey}" requires manual descriptor setup`,
      `// Run: npx papi add ${chainKey} --wsUrl ${getChainConfig(chainKey)?.ws}`,
      "",
      conn.imports,
      importExtra,
      "",
      conn.setup,
      "",
      `// Build and submit transaction`,
      `const tx = typedApi.tx.${pallet}.${method}({`,
      paramEntries,
      `})`,
      "",
      `// Sign and submit (requires a signer)`,
      `// const result = await tx.signAndSubmit(signer)`,
      `// console.log("Transaction hash:", result)`,
      conn.cleanup,
    ].join("\n");
  }

  return [
    `// Transaction: ${pallet}.${method} on ${getChainConfig(chainKey)?.name}`,
    "",
    conn.imports,
    `import { getPolkadotSigner } from "polkadot-api/signer"`,
    importExtra,
    "",
    conn.setup,
    "",
    `// Build transaction`,
    `const tx = typedApi.tx.${pallet}.${method}({`,
    paramEntries,
    `})`,
    "",
    `// To sign with a browser wallet:`,
    `// const extension = await window.injectedWeb3["polkadot-js"].enable("my-app")`,
    `// const signer = getPolkadotSigner(extension.signer)`,
    `// const result = await tx.signAndSubmit(signer)`,
    `// console.log("Transaction hash:", result)`,
    conn.cleanup,
  ].join("\n");
}

function generateQueryCode(
  chainKey: string,
  pallet: string,
  method: string,
  params?: Record<string, any>,
): string {
  const conn = getConnectionCode(chainKey);
  const storageMeta = getStorageItemMeta(chainKey, pallet, method);

  const hasParams = storageMeta?.required?.length > 0;
  const paramStr = hasParams
    ? storageMeta.required
        .map((p: string) => params?.[p] ?? `/* ${p} */`)
        .map((v: any) =>
          typeof v === "string" && !v.startsWith("/*") ? `"${v}"` : v,
        )
        .join(", ")
    : "";

  const queryCall = hasParams
    ? `typedApi.query.${pallet}.${method}.getValue(${paramStr})`
    : `typedApi.query.${pallet}.${method}.getValue()`;

  const entriesCall = `typedApi.query.${pallet}.${method}.getEntries()`;

  return [
    `// Query: ${pallet}.${method} on ${getChainConfig(chainKey)?.name}`,
    "",
    conn.imports,
    "",
    conn.setup,
    "",
    hasParams
      ? [
          `// Get a specific value`,
          `const result = await ${queryCall}`,
          `console.log("${pallet}.${method}:", result)`,
          "",
          `// Or get all entries`,
          `// const entries = await ${entriesCall}`,
          `// console.log("All entries:", entries)`,
        ].join("\n")
      : [
          `// Get the value`,
          `const result = await ${queryCall}`,
          `console.log("${pallet}.${method}:", result)`,
        ].join("\n"),
    conn.cleanup,
  ].join("\n");
}

function generateSubscriptionCode(
  chainKey: string,
  pallet: string,
  method: string,
  params?: Record<string, any>,
): string {
  const conn = getConnectionCode(chainKey);
  const storageMeta = getStorageItemMeta(chainKey, pallet, method);

  const hasParams = storageMeta?.required?.length > 0;
  const paramStr = hasParams
    ? storageMeta.required
        .map((p: string) => params?.[p] ?? `/* ${p} */`)
        .map((v: any) =>
          typeof v === "string" && !v.startsWith("/*") ? `"${v}"` : v,
        )
        .join(", ")
    : "";

  const watchCall = hasParams
    ? `typedApi.query.${pallet}.${method}.watchValue(${paramStr})`
    : `typedApi.query.${pallet}.${method}.watchValue()`;

  return [
    `// Subscription: ${pallet}.${method} on ${getChainConfig(chainKey)?.name}`,
    "",
    conn.imports,
    "",
    conn.setup,
    "",
    `// Watch for value changes (returns an Observable)`,
    `const subscription = ${watchCall}.subscribe({`,
    `  next: (value) => {`,
    `    console.log("${pallet}.${method} changed:", value)`,
    `  },`,
    `  error: (error) => {`,
    `    console.error("Subscription error:", error)`,
    `  },`,
    `})`,
    "",
    `// Unsubscribe when done`,
    `// subscription.unsubscribe()`,
    conn.cleanup,
  ].join("\n");
}

export function registerCodeGenTools(server: McpServer): void {
  server.tool(
    "generate_code",
    "Generate production-ready TypeScript code using the Polkadot API (PAPI) for transactions, queries, or subscriptions",
    GenerateCodeInput,
    async ({ chain, pallet, method, type, params }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Available: ${getChainKeys().join(", ")}`,
        );
      }

      // Validate pallet exists
      const palletInfo = getPalletInfo(chain, pallet);
      if (!palletInfo) {
        return toolError(
          `Pallet "${pallet}" not found on ${chain}. Use list_pallets to see available pallets.`,
        );
      }

      let code: string;
      let methodType: string;

      switch (type) {
        case "transaction": {
          const callExists = palletInfo.calls.some(
            (c: any) => c.name === method,
          );
          if (!callExists) {
            const available = palletInfo.calls
              .map((c: any) => c.name)
              .slice(0, 20);
            return toolError(
              `Call "${method}" not found in ${pallet}. Available: ${available.join(", ")}${palletInfo.calls.length > 20 ? "..." : ""}`,
            );
          }
          code = generateTransactionCode(chain, pallet, method, params);
          methodType = "Transaction";
          break;
        }

        case "query": {
          const storageExists = palletInfo.storage.some(
            (s: any) => s.name === method,
          );
          if (!storageExists) {
            const available = palletInfo.storage
              .map((s: any) => s.name)
              .slice(0, 20);
            return toolError(
              `Storage item "${method}" not found in ${pallet}. Available: ${available.join(", ")}${palletInfo.storage.length > 20 ? "..." : ""}`,
            );
          }
          code = generateQueryCode(chain, pallet, method, params);
          methodType = "Query";
          break;
        }

        case "subscription": {
          const storageExists = palletInfo.storage.some(
            (s: any) => s.name === method,
          );
          if (!storageExists) {
            const available = palletInfo.storage
              .map((s: any) => s.name)
              .slice(0, 20);
            return toolError(
              `Storage item "${method}" not found in ${pallet}. Available: ${available.join(", ")}${palletInfo.storage.length > 20 ? "..." : ""}`,
            );
          }
          code = generateSubscriptionCode(chain, pallet, method, params);
          methodType = "Subscription";
          break;
        }

        default:
          return toolError(
            `Invalid type "${type}". Must be "transaction", "query", or "subscription".`,
          );
      }

      const descriptor = getDescriptorName(chain);
      const setupNote = descriptor
        ? ""
        : `\n> **Setup required:** Run \`npx papi add ${chain} --wsUrl ${config.ws}\` to generate type-safe descriptors.\n`;

      return toolResult(
        [
          `# ${methodType}: ${pallet}.${method} on ${config.name}`,
          setupNote,
          "```typescript",
          code,
          "```",
          "",
          `**Prerequisites:**`,
          `- \`npm install polkadot-api\``,
          descriptor
            ? `- \`npx papi add ${chain}\` (generates type-safe descriptors)`
            : `- \`npx papi add ${chain} --wsUrl ${config.ws}\``,
        ].join("\n"),
      );
    },
  );
}
