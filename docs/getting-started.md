# Getting Started with PAPI Copy-n-Paste

PAPI Copy-n-Paste is a developer tool that generates TypeScript code snippets for interacting with Polkadot/Substrate blockchains using the modern Polkadot API (PAPI).

## Prerequisites

- **Node.js** 20 or later
- **pnpm** 10.4.1 or later (`corepack enable && corepack prepare pnpm@10.4.1 --activate`)

## Installation

```bash
git clone <repository-url>
cd papi-copy-n-paste
pnpm install
```

## Generate PAPI Descriptors

Before the first run, generate the chain descriptors:

```bash
npx papi
```

This connects to configured chains and generates TypeScript descriptors for type-safe interactions.

## Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your First Storage Query

1. **Select a chain** from the network switcher in the top bar (e.g., Polkadot).
2. Wait for the connection indicator to turn green.
3. In the left panel, expand **System** > **Storage**.
4. Click **Account**.
5. Enter an account address in the parameter field (or use the default `//Alice` test account).
6. Click **Run Query**.
7. The right panel shows the generated TypeScript code. Copy it into your project!

The generated code looks like:

```typescript
import { createClient } from "polkadot-api";
import { start } from "polkadot-api/smoldot";
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec } from "polkadot-api/chains/polkadot";
import { polkadot } from "@polkadot-api/descriptors";

const smoldot = start();
const chain = await smoldot.addChain({ chainSpec });
const client = createClient(getSmProvider(chain));
const typedApi = client.getTypedApi(polkadot);

const result = await typedApi.query.System.Account.getValue("5GrwvaEF...");
console.log(result);

client.destroy();
smoldot.terminate();
```

## Your First Transaction

1. Select a chain (e.g., Polkadot).
2. Expand **Balances** > **Calls**.
3. Click **transfer_keep_alive**.
4. Fill in the `dest` (destination address) and `value` (amount in DOT).
5. Click **Run** to generate the code, or connect a wallet and click **Sign & Execute** to submit on-chain.

## Docker

```bash
# Development (with hot reload)
docker compose --profile dev up

# Production
docker compose --profile prod up
```

## Running Tests

```bash
# Unit tests
cd apps/web && pnpm test:unit

# E2E tests (requires dev server)
cd apps/web && pnpm test
```

## Project Structure

```
papi-copy-n-paste/
├── apps/web/           # Next.js 15 web application
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── tests/          # Playwright E2E + Vitest unit tests
├── packages/core/      # Chain configs, metadata, PAPI helpers
├── packages/ui/        # Shared shadcn/ui components
└── docs/               # Documentation
```

## Supported Chains

| Chain | Type | Connection |
|-------|------|-----------|
| Polkadot | Relay chain | Smoldot light client |
| Kusama | Relay chain | Smoldot light client |
| Polkadot Asset Hub | Parachain | WebSocket RPC |
| Polkadot People | Parachain | WebSocket RPC |
| Moonbeam | Parachain | WebSocket RPC |
| Astar | Parachain | WebSocket RPC |
| Bifrost | Parachain | WebSocket RPC |
| Hydration | Parachain | WebSocket RPC |
| Westend | Testnet | Smoldot light client |
| Rococo | Testnet | WebSocket RPC |
