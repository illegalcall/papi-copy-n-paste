import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getChainConfig,
  getConstantValue,
  getPalletInfo,
} from "../metadata.js";
import { toolResult, toolError, formatValue } from "../utils/formatting.js";
import { GetConstantValueInput } from "../utils/validation.js";

export function registerConstantTools(server: McpServer): void {
  server.tool(
    "get_constant_value",
    "Get a decoded runtime constant value (e.g., ExistentialDeposit, BlockHashCount)",
    GetConstantValueInput,
    async ({ chain, pallet, constant }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Use list_chains to see available chains.`,
        );
      }

      // Try decoded constants first (pre-extracted with actual values)
      const decoded = getConstantValue(chain, pallet, constant);
      if (decoded) {
        const lines = [
          `# ${pallet}.${constant} on ${config.name}`,
          "",
          `**Type:** ${decoded.type}`,
          `**Value:** ${formatValue(decoded.decodedValue)}`,
        ];
        if (decoded.docs?.length > 0) {
          lines.push("", `**Docs:** ${decoded.docs.join(" ")}`);
        }
        return toolResult(lines.join("\n"));
      }

      // Fall back to metadata constants
      const palletInfo = getPalletInfo(chain, pallet);
      if (!palletInfo) {
        return toolError(
          `Pallet "${pallet}" not found on ${chain}. Use list_pallets to see available pallets.`,
        );
      }

      const constMeta = palletInfo.constants.find(
        (c: any) => c.name === constant,
      );
      if (!constMeta) {
        const available = palletInfo.constants.map((c: any) => c.name);
        return toolError(
          `Constant "${constant}" not found in ${pallet}. Available: ${available.join(", ") || "(none)"}`,
        );
      }

      const lines = [
        `# ${pallet}.${constant} on ${config.name}`,
        "",
        `**Type:** ${constMeta.type}`,
      ];
      if (constMeta.value != null) {
        lines.push(`**Value:** ${formatValue(constMeta.value)}`);
      }
      if (constMeta.description) {
        lines.push("", `**Docs:** ${constMeta.description}`);
      }

      return toolResult(lines.join("\n"));
    },
  );
}
