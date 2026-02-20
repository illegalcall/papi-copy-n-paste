# PAPI Copy-n-Paste: A Code Generator for Polkadot Developers

## Article Outline

### Introduction
- Problem: Polkadot API has a learning curve; developers need working code examples
- Solution: PAPI Copy-n-Paste — an interactive tool that generates ready-to-use TypeScript snippets
- Built on the modern Polkadot API (PAPI v1.14+), not the legacy @polkadot/api

### What It Does
- Browse any chain's pallets, calls, storage items, events, constants, and errors
- Generate TypeScript code for queries, transactions, and subscriptions
- Fuzzy search across all pallets with Rust doc comment previews
- Connect browser wallets to sign and execute transactions directly
- Supports 10+ chains: Polkadot, Kusama, Asset Hub, People, Moonbeam, Astar, Bifrost, Hydration, and testnets

### Architecture
- **Monorepo**: Next.js 15 + React 19, pnpm workspaces, Turborepo
- **Chain connections**: Smoldot light client for relay chains, WebSocket for parachains
- **Type safety**: PAPI descriptors provide full TypeScript types for every chain
- **Metadata-driven**: All pallets, calls, and types come from on-chain metadata

### Demo Recipes
1. **Transfer tokens** — Balances.transfer_keep_alive with wallet signing
2. **Query account** — System.Account.getValue with real-time output
3. **Watch balances** — System.Account.watchValue subscription
4. **Stake DOT** — Staking.bond + Staking.nominate flow

### Screenshots
- [ ] Chain switcher with all networks
- [ ] Pallet tree with fuzzy search
- [ ] Call form with parameter types
- [ ] Generated code output
- [ ] Wallet connection dialog

### How to Use It
1. Visit the deployed site (or run locally with Docker)
2. Select a chain
3. Browse or search for the pallet/call you need
4. Fill in parameters
5. Copy the generated code into your project

### Future Roadmap
- **MCP server**: Expose PAPI code generation as an AI tool
- **Claude Code skills**: `/papi-connect`, `/papi-query`, `/papi-tx` commands
- **Contract IDE**: Ink! smart contract deployment and interaction
- **More chains**: Polkadot ecosystem expansion
- **Batch transactions**: `utility.batchAll` code generation

### Call to Action
- Try the tool
- Report issues on GitHub
- Contribute chains or features
