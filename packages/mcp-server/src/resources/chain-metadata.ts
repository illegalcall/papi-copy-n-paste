import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { chains, getPalletNames, getPalletInfo } from "../metadata.js";

export function registerChainMetadataResources(server: McpServer): void {
  // Static resource: full chain catalog
  server.resource(
    "chains",
    "papi://chains",
    async (uri) => {
      const catalog = chains.map((c) => ({
        key: c.key,
        name: c.name,
        specVersion: c.specVersion,
        paraId: c.paraId,
        rpc: c.ws,
        explorer: c.explorerUrl,
        hasSmoldot: !!c.chainSpecPath,
      }));

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(catalog, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    },
  );

  // Dynamic resource: pallets for a specific chain
  server.resource(
    "chain-pallets",
    new ResourceTemplate("papi://chain/{chainKey}/pallets", { list: undefined }),
    async (uri, vars) => {
      const chainKey = vars.chainKey as string;
      const palletNames = getPalletNames(chainKey);

      const pallets = palletNames.map((name) => {
        const info = getPalletInfo(chainKey, name);
        return {
          name,
          calls: info?.calls.length ?? 0,
          storage: info?.storage.length ?? 0,
          events: info?.events.length ?? 0,
          constants: info?.constants.length ?? 0,
          errors: info?.errors.length ?? 0,
        };
      });

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(pallets, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    },
  );
}
