import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const GETTING_STARTED = `# PAPI (Polkadot API) Quick Start

PAPI is the modern, type-safe TypeScript API for interacting with Polkadot and Substrate chains.

## Installation

\`\`\`bash
npm install polkadot-api
npx papi add polkadot  # Generate type-safe descriptors
\`\`\`

## Basic Connection

\`\`\`typescript
import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { polkadot } from "@polkadot-api/descriptors"

const provider = withPolkadotSdkCompat(getWsProvider("wss://rpc.polkadot.io"))
const client = createClient(provider)
const typedApi = client.getTypedApi(polkadot)
\`\`\`

## Key Concepts

- **Descriptors**: Generated types for each chain (\`npx papi add <chain>\`)
- **Typed API**: Type-safe access to storage, transactions, constants, events
- **Providers**: WebSocket (\`getWsProvider\`) or light client (\`getSmProvider\`)
- **Signers**: Wallet integration via \`getPolkadotSigner\`

## Supported Chains

Use the \`list_chains\` tool to see all available chains.
`;

const PATTERNS = `# Common PAPI Patterns

## Storage Queries

\`\`\`typescript
// Get a single value
const balance = await typedApi.query.System.Account.getValue(address)

// Get all entries
const entries = await typedApi.query.System.Account.getEntries()

// Watch for changes (returns Observable)
typedApi.query.System.Account.watchValue(address).subscribe({
  next: (value) => console.log("Balance changed:", value),
})
\`\`\`

## Transactions

\`\`\`typescript
import { MultiAddress } from "polkadot-api"

const tx = typedApi.tx.Balances.transfer_allow_death({
  dest: MultiAddress.Id(recipientAddress),
  value: 1_000_000_000_000n,  // 1 DOT (10 decimals)
})

// Sign and submit
const result = await tx.signAndSubmit(signer)
\`\`\`

## Constants

\`\`\`typescript
const existentialDeposit = typedApi.constants.Balances.ExistentialDeposit()
console.log("Existential deposit:", existentialDeposit)
\`\`\`

## Events

\`\`\`typescript
// Events are available after transaction finalization
const result = await tx.signAndSubmit(signer)
// Check result.events for emitted events
\`\`\`

## Light Client (Smoldot)

\`\`\`typescript
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"

const smoldot = start()
const chain = await smoldot.addChain({ chainSpec })
const provider = getSmProvider(chain)
const client = createClient(provider)
\`\`\`

## Token Decimals

| Chain | Token | Decimals | 1 token in planck |
|-------|-------|----------|-------------------|
| Polkadot | DOT | 10 | 10,000,000,000 |
| Kusama | KSM | 12 | 1,000,000,000,000 |
| Moonbeam | GLMR | 18 | 1,000,000,000,000,000,000 |
| Astar | ASTR | 18 | 1,000,000,000,000,000,000 |

## Tips

- Always use \`withPolkadotSdkCompat\` wrapper for WebSocket providers
- Use \`BigInt\` for token amounts (\`1_000_000_000_000n\`)
- Call \`client.destroy()\` when done to clean up connections
- Use \`MultiAddress.Id(address)\` for address parameters
`;

export function registerPapiDocsResources(server: McpServer): void {
  server.resource(
    "docs-getting-started",
    "papi://docs/getting-started",
    async (uri) => ({
      contents: [
        { uri: uri.href, text: GETTING_STARTED, mimeType: "text/markdown" },
      ],
    }),
  );

  server.resource(
    "docs-patterns",
    "papi://docs/patterns",
    async (uri) => ({
      contents: [
        { uri: uri.href, text: PATTERNS, mimeType: "text/markdown" },
      ],
    }),
  );
}
