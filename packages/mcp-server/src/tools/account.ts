import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getChainConfig, getChainKeys } from "../metadata.js";
import { toolResult, toolError } from "../utils/formatting.js";
import { GetBalanceInput, ValidateAddressInput } from "../utils/validation.js";

// SS58 address format: base58check with a network prefix
const SS58_REGEX = /^[1-9A-HJ-NP-Za-km-z]{46,48}$/;

function isValidSS58Format(address: string): boolean {
  return SS58_REGEX.test(address);
}

export function registerAccountTools(server: McpServer): void {
  server.tool(
    "validate_address",
    "Validate an SS58 address format and extract its properties",
    ValidateAddressInput,
    async ({ address, chain }) => {
      const valid = isValidSS58Format(address);

      if (!valid) {
        return toolResult(
          [
            `# Address Validation`,
            "",
            `**Address:** \`${address}\``,
            `**Valid:** No`,
            "",
            "The address does not match SS58 format. SS58 addresses are base58-encoded, typically 46-48 characters.",
          ].join("\n"),
        );
      }

      const lines = [
        `# Address Validation`,
        "",
        `**Address:** \`${address}\``,
        `**Valid:** Yes (SS58 format)`,
      ];

      if (chain) {
        const config = getChainConfig(chain);
        if (config) {
          lines.push(`**Chain:** ${config.name}`);
          if (config.explorerUrl) {
            lines.push(
              `**Explorer:** ${config.explorerUrl}/account/${address}`,
            );
          }
        }
      }

      return toolResult(lines.join("\n"));
    },
  );

  server.tool(
    "get_balance",
    "Get a runnable TypeScript code snippet and explorer link for querying token balances. Does not execute live queries — use the generated code or explorer link to check balances.",
    GetBalanceInput,
    async ({ chain, address }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Available: ${getChainKeys().join(", ")}`,
        );
      }

      if (!isValidSS58Format(address)) {
        return toolError("Invalid SS58 address format.");
      }

      const lines = [
        `# Balance Query for \`${address}\` on ${config.name}`,
        "",
        `Use the **generate_code** tool to create a runnable balance query:`,
        "",
        "```",
        `generate_code({ chain: "${chain}", pallet: "System", method: "Account", type: "query", params: { key: "${address}" } })`,
        "```",
      ];

      if (config.explorerUrl) {
        lines.push(
          "",
          `Or view the balance on the explorer:`,
          `${config.explorerUrl}/account/${address}`,
        );
      }

      return toolResult(lines.join("\n"));
    },
  );
}
