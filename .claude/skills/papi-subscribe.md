---
name: papi-subscribe
description: Generate PAPI real-time subscription code with RxJS for Polkadot/Substrate chains — watchValue, watchEntries, and advanced observable patterns
---

You are a Polkadot API (PAPI) specialist. Generate real-time subscription code using RxJS observables that is production-ready.

## Step 1: Gather Requirements

Ask the user:
1. **Which chain?** (default: polkadot). Supported: polkadot, kusama, westend, paseo, moonbeam, astar, acala, hydration, bifrost, rococo, paseo_asset_hub
2. **What to watch?**
   - `storage value` — Single storage item changes
   - `storage entries` — All entries in a map
   - `new blocks` — Block production
   - `events` — Runtime events
   - `multiple` — Combine multiple subscriptions
3. **RxJS operators needed?** (throttle, debounce, filter, combine, map, distinct)
4. **Environment?** Node.js long-running service or browser/React component

## Step 2: Generate Subscription Code

### Pattern: Watch Single Storage Value
```typescript
import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function main() {
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  // Watch total issuance changes
  const subscription = typedApi.query.Balances.TotalIssuance
    .watchValue()
    .subscribe({
      next: (value) => {
        console.log(`[${new Date().toISOString()}] Total issuance: ${Number(value) / 1e10} DOT`)
      },
      error: (err) => console.error("Subscription error:", err),
    })

  // Cleanup on exit
  process.on("SIGINT", () => {
    subscription.unsubscribe()
    client.destroy()
    smoldot.terminate()
    process.exit(0)
  })
}

main().catch(console.error)
```

### Pattern: Watch Keyed Value (e.g., account balance)
```typescript
const accountId = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"

const subscription = typedApi.query.System.Account
  .watchValue(accountId)
  .subscribe({
    next: (account) => {
      console.log("Balance update:")
      console.log("  Free:", Number(account.data.free) / 1e10, "DOT")
      console.log("  Reserved:", Number(account.data.reserved) / 1e10, "DOT")
      console.log("  Nonce:", account.nonce)
    },
    error: (err) => console.error(err),
  })
```

### Pattern: Watch at Finalized Block
```typescript
// Only emit on finalized blocks (confirmed, safe)
const subscription = typedApi.query.Balances.TotalIssuance
  .watchValue("finalized")
  .subscribe({
    next: (value) => {
      console.log("Finalized issuance:", Number(value) / 1e10, "DOT")
    },
  })
```

### Pattern: Watch Entries (all map entries)
```typescript
const subscription = typedApi.query.NominationPools.BondedPools
  .watchEntries()
  .subscribe({
    next: (entries) => {
      console.log(`Pool count: ${entries.length}`)
      for (const { keyArgs, value } of entries) {
        const [poolId] = keyArgs
        console.log(`  Pool #${poolId}: ${value.state}`)
      }
    },
    error: (err) => console.error(err),
  })
```

### Pattern: Throttled Watch (rate-limited)
```typescript
import { throttleTime } from "rxjs"

// Emit at most once per 5 seconds
const subscription = typedApi.query.Balances.TotalIssuance
  .watchValue()
  .pipe(throttleTime(5_000))
  .subscribe({
    next: (value) => {
      console.log("Throttled update:", Number(value) / 1e10, "DOT")
    },
  })
```

### Pattern: Debounced Watch (wait for quiet period)
```typescript
import { debounceTime } from "rxjs"

// Wait 2 seconds after last change before emitting
const subscription = typedApi.query.System.Account
  .watchValue(accountId)
  .pipe(debounceTime(2_000))
  .subscribe({
    next: (account) => {
      console.log("Settled balance:", Number(account.data.free) / 1e10, "DOT")
    },
  })
```

### Pattern: Distinct Changes Only
```typescript
import { distinctUntilChanged, map } from "rxjs"

const subscription = typedApi.query.Staking.ActiveEra
  .watchValue()
  .pipe(
    map((era) => era?.index),
    distinctUntilChanged(),
  )
  .subscribe({
    next: (eraIndex) => {
      console.log("New era started:", eraIndex)
    },
  })
```

### Pattern: Filter + Transform
```typescript
import { filter, map } from "rxjs"

// Watch account and only emit when free balance changes significantly
const subscription = typedApi.query.System.Account
  .watchValue(accountId)
  .pipe(
    map((account) => ({
      free: account.data.free,
      formatted: `${Number(account.data.free) / 1e10} DOT`,
    })),
    filter(({ free }) => free > 1_000_000_000_000n), // Only > 100 DOT
  )
  .subscribe({
    next: ({ formatted }) => {
      console.log("Significant balance:", formatted)
    },
  })
```

### Pattern: Combine Multiple Subscriptions
```typescript
import { combineLatest, map } from "rxjs"

// Watch multiple values simultaneously
const subscription = combineLatest([
  typedApi.query.Balances.TotalIssuance.watchValue(),
  typedApi.query.Staking.ActiveEra.watchValue(),
  typedApi.query.NominationPools.LastPoolId.watchValue(),
]).pipe(
  map(([issuance, era, lastPoolId]) => ({
    totalIssuance: `${Number(issuance) / 1e10} DOT`,
    activeEra: era?.index ?? "unknown",
    totalPools: lastPoolId,
    timestamp: new Date().toISOString(),
  })),
).subscribe({
  next: (snapshot) => {
    console.log("Chain snapshot:", JSON.stringify(snapshot, null, 2))
  },
  error: (err) => console.error("Combined subscription error:", err),
})
```

### Pattern: Take Until Condition
```typescript
import { takeWhile, tap } from "rxjs"

// Watch until a condition is met, then auto-unsubscribe
let count = 0
const subscription = typedApi.query.Balances.TotalIssuance
  .watchValue()
  .pipe(
    tap(() => count++),
    takeWhile(() => count <= 10), // Stop after 10 updates
  )
  .subscribe({
    next: (value) => {
      console.log(`Update ${count}: ${Number(value) / 1e10} DOT`)
    },
    complete: () => {
      console.log("Finished collecting 10 updates")
      client.destroy()
      smoldot.terminate()
    },
  })
```

### Pattern: Resilient Watch (auto-retry)
```typescript
import { retry, delay } from "rxjs"

const subscription = typedApi.query.Balances.TotalIssuance
  .watchValue()
  .pipe(
    retry({
      count: 3,
      delay: 5_000, // Retry after 5 seconds
    }),
  )
  .subscribe({
    next: (value) => console.log("Value:", value),
    error: (err) => console.error("Failed after 3 retries:", err),
  })
```

### Pattern: Node.js Monitoring Service (complete)
```typescript
import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"
import { combineLatest, throttleTime, map, retry } from "rxjs"
import type { Subscription } from "rxjs"

async function startMonitor() {
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  const subscriptions: Subscription[] = []

  // Monitor chain health
  const health$ = combineLatest([
    typedApi.query.Balances.TotalIssuance.watchValue(),
    typedApi.query.Staking.ActiveEra.watchValue(),
  ]).pipe(
    throttleTime(10_000), // Report every 10 seconds
    map(([issuance, era]) => ({
      issuance: `${Number(issuance) / 1e10} DOT`,
      era: era?.index,
      timestamp: new Date().toISOString(),
    })),
    retry({ count: 5, delay: 10_000 }),
  )

  subscriptions.push(
    health$.subscribe({
      next: (data) => console.log("[Health]", JSON.stringify(data)),
      error: (err) => console.error("[Health Error]", err),
    })
  )

  console.log("Monitor started. Press Ctrl+C to stop.")

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\nShutting down monitor...")
    subscriptions.forEach((sub) => sub.unsubscribe())
    client.destroy()
    smoldot.terminate()
    process.exit(0)
  })
}

startMonitor().catch(console.error)
```

## Rules
- ALWAYS import only the RxJS operators actually used — never import everything
- ALWAYS show the unsubscribe/cleanup pattern
- ALWAYS include `process.on("SIGINT", ...)` for Node.js services
- For browser/React: use `useEffect` cleanup to unsubscribe
- For multiple subscriptions: collect in an array and unsubscribe all on cleanup
- `watchValue()` returns an RxJS Observable — all RxJS operators work with it
- Use `throttleTime` to reduce update frequency for high-throughput chains
- Use `distinctUntilChanged` to skip duplicate values
- Use `retry` for resilience in production services
- Default to `watchValue()` (best block) unless user specifically needs `watchValue("finalized")`
