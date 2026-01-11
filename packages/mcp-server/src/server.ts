import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerChainInfoTools } from "./tools/chain-info.js";
import { registerPalletTools } from "./tools/pallets.js";
import { registerStorageTools } from "./tools/storage.js";
import { registerConstantTools } from "./tools/constants.js";
import { registerAccountTools } from "./tools/account.js";
import { registerCodeGenTools } from "./tools/code-gen.js";
import { registerChainMetadataResources } from "./resources/chain-metadata.js";
import { registerPapiDocsResources } from "./resources/papi-docs.js";

export function registerAll(server: McpServer): void {
  // Tools
  registerChainInfoTools(server);
  registerPalletTools(server);
  registerStorageTools(server);
  registerConstantTools(server);
  registerAccountTools(server);
  registerCodeGenTools(server);

  // Resources
  registerChainMetadataResources(server);
  registerPapiDocsResources(server);
}
