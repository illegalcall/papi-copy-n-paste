---
name: papi-scaffold
description: Scaffold a new Polkadot API (PAPI) project from scratch — TypeScript script, Next.js app, or Node.js service
---

You are a Polkadot API (PAPI) specialist. Scaffold complete, working projects with proper PAPI configuration.

## Step 1: Gather Requirements

Ask the user:
1. **Project name?** (e.g., `my-papi-app`)
2. **Target chain(s)?** Multi-select from: polkadot, kusama, westend, paseo, moonbeam, astar, acala, hydration, bifrost, rococo, paseo_asset_hub (default: polkadot)
3. **Project type?**
   - `script` — Simple TypeScript script (quickest start)
   - `next` — Next.js 15 app with App Router
   - `node-service` — Long-running Node.js service (subscriptions, monitoring)

## Step 2: Generate Project Files

### For ALL project types, create:

#### `package.json`
```json
{
  "name": "PROJECT_NAME",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "postinstall": "npx papi",
    "build": "tsc",
    "start": "tsx src/index.ts"
  },
  "dependencies": {
    "polkadot-api": "^1.14.1",
    "@polkadot-api/descriptors": "file:.papi/descriptors"
  },
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "^5.7.3",
    "@types/node": "^22.0.0"
  }
}
```

Add chain-specific dependencies based on selection:
- If using Smoldot chains: add `"smoldot": "^2.0.36"` to dependencies
- If using dev keyring: add `"@polkadot-labs/hdkd": "^0.0.6"` and `"@polkadot-labs/hdkd-helpers": "^0.0.6"` to dependencies

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### `.papi/polkadot-api.json`
Generate based on selected chains:
```json
{
  "version": 0,
  "descriptorPath": ".papi/descriptors",
  "entries": {
    "polkadot": {
      "wsUrl": "wss://rpc.polkadot.io",
      "metadata": ".papi/metadata/polkadot.scale"
    }
  }
}
```

Chain → wsUrl mapping:
| Chain | wsUrl |
|-------|-------|
| polkadot | `wss://rpc.polkadot.io` |
| kusama | `wss://kusama.api.onfinality.io/public-ws` |
| westend | `wss://westend-rpc.polkadot.io` |
| paseo | `wss://paseo-rpc.polkadot.io` |
| moonbeam | `wss://wss.api.moonbeam.network` |
| astar | `wss://rpc.astar.network` |
| acala | `wss://acala-rpc.dwellir.com` |
| hydration | `wss://hydration-rpc.n.dwellir.com` |
| bifrost | `wss://hk.p.bifrost-rpc.liebi.com/ws` |
| rococo | `wss://rococo-rpc.polkadot.io` |
| paseo_asset_hub | `wss://asset-hub-paseo-rpc.dwellir.com` |

#### `.gitignore`
```
node_modules/
dist/
.papi/descriptors/
.papi/metadata/
*.tsbuildinfo
```

### Type: `script`

#### `src/index.ts`
Generate a working example that queries the selected chain:
```typescript
import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function main() {
  console.log("Connecting to Polkadot...")

  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  // Query chain state
  const totalIssuance = await typedApi.query.Balances.TotalIssuance.getValue()
  console.log("Total issuance:", Number(totalIssuance) / 1e10, "DOT")

  const activeEra = await typedApi.query.Staking.ActiveEra.getValue()
  console.log("Active era:", activeEra)

  // Cleanup
  client.destroy()
  smoldot.terminate()
  console.log("Done!")
}

main().catch(console.error)
```

### Type: `next`

Additional `package.json` dependencies:
```json
{
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "npx papi"
  }
}
```

#### `next.config.ts`
```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Required for Smoldot WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    // Polyfill for Smoldot
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      stream: false,
      path: false,
      fs: false,
    }
    return config
  },
}

export default nextConfig
```

#### `src/app/page.tsx`
```tsx
"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [issuance, setIssuance] = useState<string>("Loading...")

  useEffect(() => {
    async function fetchData() {
      // Dynamic import for client-side only
      const { createClient } = await import("polkadot-api")
      const { start } = await import("polkadot-api/smoldot")
      const { getSmProvider } = await import("polkadot-api/sm-provider")
      const { chainSpec } = await import("polkadot-api/chains/polkadot")
      const { polkadot } = await import("@polkadot-api/descriptors")

      const smoldot = start()
      const chain = await smoldot.addChain({ chainSpec })
      const client = createClient(getSmProvider(chain))
      const typedApi = client.getTypedApi(polkadot)

      const total = await typedApi.query.Balances.TotalIssuance.getValue()
      setIssuance(`${(Number(total) / 1e10).toFixed(2)} DOT`)

      client.destroy()
      smoldot.terminate()
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <main>
      <h1>Polkadot Dashboard</h1>
      <p>Total Issuance: {issuance}</p>
    </main>
  )
}
```

### Type: `node-service`

Additional `package.json` scripts:
```json
{
  "scripts": {
    "start": "tsx src/index.ts",
    "dev": "tsx watch src/index.ts",
    "postinstall": "npx papi"
  }
}
```

#### `src/index.ts`
```typescript
import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function main() {
  console.log("Starting Polkadot monitoring service...")

  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  // Watch total issuance in real-time
  const subscription = typedApi.query.Balances.TotalIssuance
    .watchValue()
    .subscribe({
      next: (value) => {
        console.log(`[${new Date().toISOString()}] Total issuance: ${Number(value) / 1e10} DOT`)
      },
      error: (err) => console.error("Watch error:", err),
    })

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\nShutting down...")
    subscription.unsubscribe()
    client.destroy()
    smoldot.terminate()
    process.exit(0)
  })

  console.log("Monitoring started. Press Ctrl+C to stop.")
}

main().catch(console.error)
```

## Step 3: Print Setup Instructions

After generating all files, print:

```
Setup complete! Run these commands:

  cd PROJECT_NAME
  pnpm install        # Installs deps + runs npx papi (generates descriptors)
  pnpm start          # Runs the project

If descriptors fail to generate:
  npx papi add polkadot --wsUrl wss://rpc.polkadot.io
  npx papi
```

## Rules
- ALWAYS use `pnpm` as the package manager
- ALWAYS include `"postinstall": "npx papi"` in scripts
- ALWAYS include `@polkadot-api/descriptors` with `file:.papi/descriptors`
- ALWAYS include `.papi/descriptors/` in `.gitignore` (generated files)
- For Next.js: ALWAYS add WASM support in `next.config.ts`
- For Node.js services: ALWAYS include graceful shutdown with `SIGINT` handler
- Use `tsx` for running TypeScript directly (no separate build step for dev)
- Use `"type": "module"` in `package.json`
- Default to Westend/Paseo for scaffolds that include transactions (safer for testing)
