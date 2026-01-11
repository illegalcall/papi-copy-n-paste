import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getChainConfig,
  getChainKeys,
  getStorageItemMeta,
  getPalletInfo,
} from "../metadata.js";
import { toolResult, toolError } from "../utils/formatting.js";
import { QueryStorageInput } from "../utils/validation.js";

export function registerStorageTools(server: McpServer): void {
  server.tool(
    "query_storage",
    "Get storage item metadata (type, params, description) and generate a runnable TypeScript code snippet via generate_code. Does not execute live queries — use the generated code to run on-chain.",
    QueryStorageInput,
    async ({ chain, pallet, item, params }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Available: ${getChainKeys().join(", ")}`,
        );
      }

      // Check if storage item exists in metadata
      const storageMeta = getStorageItemMeta(chain, pallet, item);
      if (!storageMeta) {
        const palletInfo = getPalletInfo(chain, pallet);
        if (!palletInfo) {
          return toolError(
            `Pallet "${pallet}" not found on ${chain}. Use list_pallets to see available pallets.`,
          );
        }
        const available = palletInfo.storage.map((s: any) => s.name);
        return toolError(
          `Storage item "${item}" not found in ${pallet}. Available: ${available.join(", ") || "(none)"}`,
        );
      }

      // Show storage item metadata + code generation hint
      const lines = [
        `# ${pallet}.${item} on ${config.name}`,
        "",
        `**Description:** ${storageMeta.description || "N/A"}`,
        `**Return type:** ${storageMeta.returnType || "unknown"}`,
      ];

      if (storageMeta.required?.length > 0) {
        lines.push(
          `**Required params:** ${storageMeta.required.join(", ")}`,
        );
      }

      lines.push(
        "",
        "---",
        "",
        "**To query this value**, use `generate_code` to create a runnable TypeScript script:",
        "",
        "```",
        `generate_code({ chain: "${chain}", pallet: "${pallet}", method: "${item}", type: "query"${params?.length ? `, params: { key: "${params[0]}" }` : ""} })`,
        "```",
      );

      return toolResult(lines.join("\n"));
    },
  );
}
