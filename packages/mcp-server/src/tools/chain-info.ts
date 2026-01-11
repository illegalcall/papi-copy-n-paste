import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { chains, getChainConfig, getPalletNames } from "../metadata.js";
import { toolResult, toolError } from "../utils/formatting.js";
import { ListChainsInput, GetChainInfoInput } from "../utils/validation.js";

export function registerChainInfoTools(server: McpServer): void {
  server.tool(
    "list_chains",
    "List all supported Polkadot/Substrate chains with their configuration",
    ListChainsInput,
    async () => {
      const lines = chains.map((c) => {
        const parts = [`**${c.name}** (\`${c.key}\`)`];
        parts.push(`  spec: v${c.specVersion}`);
        if (c.paraId) parts.push(`  paraId: ${c.paraId}`);
        parts.push(`  rpc: ${c.ws}`);
        if (c.explorerUrl) parts.push(`  explorer: ${c.explorerUrl}`);
        if (c.chainSpecPath) parts.push(`  smoldot: yes`);
        return parts.join("\n");
      });

      return toolResult(
        `# Supported Chains (${chains.length})\n\n${lines.join("\n\n")}`,
      );
    },
  );

  server.tool(
    "get_chain_info",
    "Get detailed information about a specific chain including its pallets",
    GetChainInfoInput,
    async ({ chain }) => {
      const config = getChainConfig(chain);
      if (!config) {
        return toolError(
          `Unknown chain "${chain}". Use list_chains to see available chains.`,
        );
      }

      const pallets = getPalletNames(chain);

      const info = [
        `# ${config.name}`,
        "",
        `| Property | Value |`,
        `| --- | --- |`,
        `| Key | \`${config.key}\` |`,
        `| Spec Version | ${config.specVersion} |`,
        `| Genesis Hash | \`${config.genesisHash}\` |`,
        `| RPC | ${config.ws} |`,
        config.paraId ? `| Para ID | ${config.paraId} |` : null,
        config.explorerUrl
          ? `| Explorer | [${config.explorerName}](${config.explorerUrl}) |`
          : null,
        config.chainSpecPath ? `| Smoldot | Supported |` : null,
        "",
        `## Pallets (${pallets.length})`,
        "",
        pallets.map((p) => `- ${p}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n");

      return toolResult(info);
    },
  );
}
