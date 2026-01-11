#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAll } from "./server.js";
import { destroyAll } from "./connection/pool.js";

const server = new McpServer({
  name: "papi-mcp",
  version: "0.1.0",
});

registerAll(server);

// Graceful shutdown
process.on("SIGINT", () => {
  destroyAll();
  process.exit(0);
});
process.on("SIGTERM", () => {
  destroyAll();
  process.exit(0);
});

const transport = new StdioServerTransport();
await server.connect(transport);
