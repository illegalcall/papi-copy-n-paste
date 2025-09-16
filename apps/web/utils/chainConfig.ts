/**
 * Chain configuration utilities for PAPI setup commands and descriptors
 */

import { getAllCustomProviders, CustomProvider } from "./customRpc";

export function getSetupCommands(chainKey: string): string {
  // This function is kept for backward compatibility but should not be used for code generation
  // Setup instructions are now handled by the Setup tab in RightPane
  return "";
}

export function getChainSpecImport(chainKey: string): string {
  // Only major relay chains have built-in chainSpecs
  const builtInChainSpecs = {
    polkadot: "polkadot",
    kusama: "ksmcc3",
  };

  const specName =
    builtInChainSpecs[chainKey as keyof typeof builtInChainSpecs];
  if (specName) {
    return `import { chainSpec } from "polkadot-api/chains/${specName}"`;
  }

  // For parachains, we need to connect via RPC (no built-in chainSpec)
  return `// Note: ${chainKey} connects directly via RPC endpoint`;
}

export function getDescriptorImport(chainKey: string): string {
  const descriptorMap = {
    polkadot: "polkadot",
    kusama: "kusama",
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    paseo: "paseo",
    westend: "westend",
    rococo: "rococo",
    hydration: "hydration",
    // Chains without descriptors - will show error in UI
    acala: null,
  };

  const descriptorName = descriptorMap[chainKey as keyof typeof descriptorMap];
  if (!descriptorName) {
    throw new Error(`No descriptor available for chain: ${chainKey}`);
  }
  return `import { ${descriptorName} } from "@polkadot-api/descriptors"`;
}

export function getDescriptorName(chainKey: string): string | null {
  const descriptorMap = {
    polkadot: "polkadot",
    kusama: "kusama",
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    paseo: "paseo",
    westend: "westend",
    rococo: "rococo",
    hydration: "hydration",
    // Chains without descriptors - will return null
    acala: null,
  };

  return descriptorMap[chainKey as keyof typeof descriptorMap] || null;
}

export function getCustomRPCConnection(rpcId: string): {
  imports: string;
  connection: string;
  cleanup?: string;
} | null {
  const customRPCs = getAllCustomProviders();
  const rpc = customRPCs.find(r => r.id === rpcId);

  if (!rpc) {
    return null;
  }

  return {
    imports: `import { getWsProvider } from "polkadot-api/ws-provider/web"`,
    connection: `  // Using custom RPC: ${rpc.name}
  const wsProvider = getWsProvider("${rpc.wsUrl}")
  const client = createClient(wsProvider)`,
    cleanup: `
  // Cleanup WebSocket connection
  client.destroy()`,
  };
}

export function getChainConnection(chainKey: string, providerId?: string): {
  imports: string;
  connection: string;
  cleanup?: string;
} {
  // Handle custom RPC connections
  if (chainKey === "custom" && providerId) {
    const customConnection = getCustomRPCConnection(providerId);
    if (customConnection) {
      return customConnection;
    }
  }

  // Chains that use smoldot as default
  const smoldotChains = ["polkadot", "kusama", "paseo", "westend"];

  if (smoldotChains.includes(chainKey)) {
    // Use smoldot connection for relay chains
    const chainConfigs = {
      polkadot: { chainSpec: "polkadot" },
      kusama: { chainSpec: "ksmcc3" },
      paseo: { chainSpec: "paseo" },
      westend: { chainSpec: "westend" },
    };

    const config =
      chainConfigs[chainKey as keyof typeof chainConfigs] ||
      chainConfigs.polkadot;

    return {
      imports: `import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/${config.chainSpec}"`,
      connection: `  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))`,
      cleanup: `
  // Cleanup
  smoldot.terminate()`,
    };
  } else {
    // Use WebSocket RPC for parachains and other chains
    const rpcUrls = {
      moonbeam: "wss://wss.api.moonbeam.network",
      bifrost: "wss://hk.p.bifrost-rpc.liebi.com/ws",
      astar: "wss://rpc.astar.network",
      acala: "wss://acala-rpc.dwellir.com",
      hydration: "wss://hydration-rpc.n.dwellir.com",
      westend: "wss://westend-rpc.polkadot.io",
      rococo: "wss://rococo-rpc.polkadot.io",
    };

    const rpcUrl = rpcUrls[chainKey as keyof typeof rpcUrls] || rpcUrls.moonbeam;

    return {
      imports: `import { getWsProvider } from "polkadot-api/ws-provider/web"`,
      connection: `  const wsProvider = getWsProvider("${rpcUrl}")
  const client = createClient(wsProvider)`,
      cleanup: `
  // Cleanup WebSocket connection
  client.destroy()`,
    };
  }
}

export function getParameterDescription(
  paramName: string,
  paramType: string,
): string {
  const descriptions: Record<string, string> = {
    dest: "destination account address",
    value: "amount in planck units (10^10 planck = 1 DOT)",
    who: "target account to perform action on",
    amount: "quantity for the operation",
    target: "target account or value",
    index: "position or identifier",
    id: "unique identifier",
    owner: "account that owns the resource",
    beneficiary: "account that receives benefits",
    validator: "validator account for staking",
    nominator: "nominator account for staking",
    remark: "text data to store on-chain",
  };

  return descriptions[paramName] || `parameter of type ${paramType}`;
}
