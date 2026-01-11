import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getChainConfig,
  getPalletNames,
  getPalletInfo,
} from "../metadata.js";
import { toolResult, toolError, formatTable, truncateList } from "../utils/formatting.js";
import { ListPalletsInput, GetPalletInfoInput } from "../utils/validation.js";

export function registerPalletTools(server: McpServer): void {
  server.tool(
    "list_pallets",
    "List all pallets available on a chain with summary of their capabilities",
    ListPalletsInput,
    async ({ chain }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Use list_chains to see available chains.`,
        );
      }

      const palletNames = getPalletNames(chain);
      if (palletNames.length === 0) {
        return toolError(`No metadata available for chain "${chain}".`);
      }

      const rows = palletNames.map((name) => {
        const info = getPalletInfo(chain, name);
        if (!info) return [name, "-", "-", "-", "-", "-"];
        return [
          name,
          String(info.calls.length),
          String(info.storage.length),
          String(info.events.length),
          String(info.constants.length),
          String(info.errors.length),
        ];
      });

      const table = formatTable(
        ["Pallet", "Calls", "Storage", "Events", "Constants", "Errors"],
        rows,
        100,
      );

      return toolResult(
        `# Pallets on ${config.name} (${palletNames.length})\n\n${table}`,
      );
    },
  );

  server.tool(
    "get_pallet_info",
    "Get full breakdown of a pallet: calls, storage items, events, constants, and errors",
    GetPalletInfoInput,
    async ({ chain, pallet }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Use list_chains to see available chains.`,
        );
      }

      const info = getPalletInfo(chain, pallet);
      if (!info) {
        const available = getPalletNames(chain);
        return toolError(
          `Pallet "${pallet}" not found on ${chain}. Available pallets: ${available.slice(0, 20).join(", ")}${available.length > 20 ? "..." : ""}`,
        );
      }

      const sections: string[] = [`# ${pallet} pallet on ${config.name}`];

      // Calls
      if (info.calls.length > 0) {
        sections.push(`\n## Calls (${info.calls.length})`);
        sections.push(
          truncateList(info.calls, 30, (c: any) => {
            const params =
              c.parameters.length > 0
                ? c.parameters
                    .map((p: any) => `${p.name}: ${p.type}`)
                    .join(", ")
                : "none";
            const desc = c.description ? ` — ${c.description}` : "";
            return `- **${c.name}**(${params})${desc}`;
          }),
        );
      }

      // Storage
      if (info.storage.length > 0) {
        sections.push(`\n## Storage Items (${info.storage.length})`);
        sections.push(
          truncateList(info.storage, 30, (s: any) => {
            const params =
              s.required.length > 0
                ? ` [params: ${s.required.join(", ")}]`
                : "";
            return `- **${s.name}**${params} → ${s.returnType}`;
          }),
        );
      }

      // Events
      if (info.events.length > 0) {
        sections.push(`\n## Events (${info.events.length})`);
        sections.push(
          truncateList(info.events, 30, (e: any) => {
            const fields =
              e.fields.length > 0
                ? e.fields.map((f: any) => `${f.name}: ${f.type}`).join(", ")
                : "none";
            return `- **${e.name}**(${fields})`;
          }),
        );
      }

      // Constants
      if (info.constants.length > 0) {
        sections.push(`\n## Constants (${info.constants.length})`);
        sections.push(
          truncateList(info.constants, 30, (c: any) => {
            const val = c.value != null ? ` = ${c.value}` : "";
            return `- **${c.name}**: ${c.type}${val}`;
          }),
        );
      }

      // Errors
      if (info.errors.length > 0) {
        sections.push(`\n## Errors (${info.errors.length})`);
        sections.push(
          truncateList(info.errors, 30, (e: any) => {
            const desc = e.description ? ` — ${e.description}` : "";
            return `- **${e.name}**${desc}`;
          }),
        );
      }

      return toolResult(sections.join("\n"));
    },
  );
}
