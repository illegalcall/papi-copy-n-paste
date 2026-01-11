# @papi/mcp-server

The first **PAPI-native MCP server** for AI agents to interact with Polkadot/Substrate chains. Provides 9 tools for chain exploration, metadata queries, and production-ready code generation using the modern typed Polkadot API.

## Quick Setup

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "papi": {
      "command": "npx",
      "args": ["tsx", "/path/to/papi-copy-n-paste/packages/mcp-server/src/index.ts"]
    }
  }
}
```

### Claude Code

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "papi": {
      "command": "npx",
      "args": ["tsx", "/path/to/papi-copy-n-paste/packages/mcp-server/src/index.ts"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "papi": {
      "command": "npx",
      "args": ["tsx", "/path/to/papi-copy-n-paste/packages/mcp-server/src/index.ts"]
    }
  }
}
```

### Continue

Add to `~/.continue/config.json`:

```json
{
  "mcpServers": [
    {
      "name": "papi",
      "command": "npx",
      "args": ["tsx", "/path/to/papi-copy-n-paste/packages/mcp-server/src/index.ts"]
    }
  ]
}
```

### Windsurf

Add to Windsurf MCP settings:

```json
{
  "mcpServers": {
    "papi": {
      "command": "npx",
      "args": ["tsx", "/path/to/papi-copy-n-paste/packages/mcp-server/src/index.ts"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `list_chains` | List all supported Polkadot/Substrate chains |
| `get_chain_info` | Get chain details + available pallets |
| `list_pallets` | List pallets with call/storage/event counts |
| `get_pallet_info` | Full pallet breakdown: calls, storage, events, constants, errors |
| `query_storage` | Query live on-chain storage values |
| `get_constant_value` | Get decoded runtime constants (e.g., ExistentialDeposit) |
| `get_balance` | Get account token balances |
| `validate_address` | Validate SS58 address format |
| `generate_code` | Generate production-ready TypeScript for transactions, queries, subscriptions |

## Resources

| URI | Description |
|-----|-------------|
| `papi://chains` | Full chain catalog as JSON |
| `papi://docs/getting-started` | PAPI quick start guide |
| `papi://docs/patterns` | Common PAPI patterns (queries, transactions, subscriptions) |
| `papi://chain/{chainKey}/pallets` | Pallet list for a specific chain |

## Supported Chains

Polkadot, Kusama, Astar, Moonbeam, Bifrost, Hydration, Acala, Westend (testnet), Rococo (testnet)

## Example Interactions

**"What pallets does Polkadot have?"**
```
list_pallets({ chain: "polkadot" })
```

**"What's the existential deposit on Polkadot?"**
```
get_constant_value({ chain: "polkadot", pallet: "Balances", constant: "ExistentialDeposit" })
```

**"Generate code to transfer DOT"**
```
generate_code({ chain: "polkadot", pallet: "Balances", method: "transfer_allow_death", type: "transaction" })
```

**"Show me how to query an account balance"**
```
generate_code({ chain: "polkadot", pallet: "System", method: "Account", type: "query" })
```

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm --filter @papi/mcp-server dev

# Build
pnpm --filter @papi/mcp-server build

# Test with MCP Inspector
npx @modelcontextprotocol/inspector npx tsx packages/mcp-server/src/index.ts
```

## Architecture

- **Stdio transport** — works everywhere, no HTTP server needed
- **Offline metadata** — 7/9 tools work without any chain connection using pre-generated metadata
- **Connection pooling** — max 3 concurrent chain connections with LRU eviction
- **Read-only** — no transaction signing (security-safe for MCP)
