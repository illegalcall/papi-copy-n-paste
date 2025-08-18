# Generated Code Examples - Connection Pattern Test

## Polkadot (Smoldot Connection)

```typescript
import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
import { polkadot } from "@polkadot-api/descriptors"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"

async function executeBalancesTransfer() {
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  const call = typedApi.tx.Balances.transfer_allow_death({
    dest: MultiAddress.Id("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"), // //Bob
    value: 1000000000000n
  })

  // You'll need a proper signer here
  const hash = await call.signAndSubmit(signer)
  console.log('Transaction hash:', hash)

  // Cleanup
  smoldot.terminate()
}

executeBalancesTransfer().catch(console.error)
```

## Moonbeam (WebSocket RPC Connection)

```typescript
import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
import { moonbeam } from "@polkadot-api/descriptors"
import { getWsProvider } from "polkadot-api/ws-provider/web"

async function executeBalancesTransfer() {
  const wsProvider = getWsProvider("wss://wss.api.moonbeam.network")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(moonbeam)

  const call = typedApi.tx.Balances.transfer_allow_death({
    dest: MultiAddress.Id("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"), // //Bob
    value: 1000000000000n
  })

  // You'll need a proper signer here
  const hash = await call.signAndSubmit(signer)
  console.log('Transaction hash:', hash)

  // Cleanup WebSocket connection
  client.destroy()
}

executeBalancesTransfer().catch(console.error)
```

## Key Differences:

1. **Smoldot chains** (polkadot, kusama, paseo):
   - Use `start()` from "polkadot-api/smoldot"
   - Use `getSmProvider()` from "polkadot-api/sm-provider"
   - Import chainSpec from "polkadot-api/chains/[chain]"
   - Cleanup with `smoldot.terminate()`

2. **WebSocket RPC chains** (moonbeam, bifrost, astar, etc.):
   - Use `getWsProvider()` from "polkadot-api/ws-provider/web"
   - Direct connection to RPC endpoint
   - Cleanup with `client.destroy()`

3. **Descriptors**:
   - All chains use proper descriptors from "@polkadot-api/descriptors"
   - Paseo added as new chain with proper descriptor support
   - Fallback chains (acala, hydration) use polkadot descriptor as fallback