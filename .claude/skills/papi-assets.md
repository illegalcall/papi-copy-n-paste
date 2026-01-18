---
name: papi-assets
description: Generate PAPI Asset Hub code — create, mint, transfer fungible assets and NFTs, teleport DOT/KSM between relay and Asset Hub
---

You are a Polkadot API (PAPI) specialist for Asset Hub operations. Generate typed, production-ready code for fungible assets, NFTs, and cross-chain transfers.

## Step 1: Gather Requirements

Ask the user:
1. **Which Asset Hub?** polkadot_asset_hub (mainnet), paseo_asset_hub (testnet, default)
2. **Which operation?**
   - `create` — Create a new fungible asset
   - `mint` — Mint tokens for an asset
   - `transfer` — Transfer an asset to another account
   - `query` — Query asset metadata, balances, supply
   - `nft-create` — Create an NFT collection
   - `nft-mint` — Mint an NFT item
   - `nft-transfer` — Transfer an NFT
   - `teleport` — Teleport DOT/KSM between relay chain and Asset Hub
3. **Asset ID?** (for existing assets)
4. **Signing method?** Browser wallet or dev keyring

## Step 2: Generate Code

### Create a Fungible Asset
```typescript
import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { paseo_asset_hub } from "@polkadot-api/descriptors"
import { MultiAddress } from "polkadot-api"

async function createAsset() {
  const client = createClient(
    getWsProvider("wss://asset-hub-paseo-rpc.dwellir.com")
  )
  const typedApi = client.getTypedApi(paseo_asset_hub)

  // Create a new fungible asset
  const tx = typedApi.tx.Assets.create({
    id: 100,                    // Asset ID (must be unique)
    admin: MultiAddress.Id(myAddress), // Admin account
    min_balance: 1_000n,        // Minimum balance (prevents dust)
  })

  const result = await tx.signAndSubmit(signer)
  console.log("Asset created! Tx:", result.txHash)

  // Set metadata (name, symbol, decimals)
  const metadataTx = typedApi.tx.Assets.set_metadata({
    id: 100,
    name: "My Token",   // Token name (bytes)
    symbol: "MTK",      // Token symbol (bytes)
    decimals: 10,       // Decimal places
  })

  const metaResult = await metadataTx.signAndSubmit(signer)
  console.log("Metadata set! Tx:", metaResult.txHash)

  client.destroy()
}
```

### Batch: Create + Set Metadata
```typescript
const batchTx = typedApi.tx.Utility.batch_all({
  calls: [
    typedApi.tx.Assets.create({
      id: 100,
      admin: MultiAddress.Id(myAddress),
      min_balance: 1_000n,
    }).decodedCall,
    typedApi.tx.Assets.set_metadata({
      id: 100,
      name: "My Token",
      symbol: "MTK",
      decimals: 10,
    }).decodedCall,
  ],
})

const result = await batchTx.signAndSubmit(signer)
```

### Mint Tokens
```typescript
const tx = typedApi.tx.Assets.mint({
  id: 100,                                // Asset ID
  beneficiary: MultiAddress.Id(recipientAddress),
  amount: 1_000_000_000_000n,            // Amount to mint
})

const result = await tx.signAndSubmit(signer)
console.log("Minted! Tx:", result.txHash)
```

### Transfer Asset
```typescript
const tx = typedApi.tx.Assets.transfer_keep_alive({
  id: 100,                                // Asset ID
  target: MultiAddress.Id(recipientAddress),
  amount: 500_000_000_000n,              // Amount to transfer
})

const result = await tx.signAndSubmit(signer)
console.log("Transferred! Tx:", result.txHash)
```

### Query Asset Info
```typescript
// Get asset details
const asset = await typedApi.query.Assets.Asset.getValue(100)
console.log("Asset 100:", asset)
console.log("  Supply:", asset?.supply)
console.log("  Accounts:", asset?.accounts)
console.log("  Status:", asset?.status)

// Get asset metadata
const metadata = await typedApi.query.Assets.Metadata.getValue(100)
console.log("  Name:", metadata?.name)
console.log("  Symbol:", metadata?.symbol)
console.log("  Decimals:", metadata?.decimals)

// Get account balance for an asset
const account = await typedApi.query.Assets.Account.getValue(100, myAddress)
console.log("  My balance:", account?.balance)

// List all assets
const allAssets = await typedApi.query.Assets.Asset.getEntries()
for (const { keyArgs, value } of allAssets) {
  const [assetId] = keyArgs
  console.log(`Asset #${assetId}: supply=${value.supply}`)
}
```

### NFT: Create Collection
```typescript
// Using the Nfts pallet
const tx = typedApi.tx.Nfts.create({
  admin: MultiAddress.Id(myAddress),
  config: {
    settings: 0n,           // Default settings
    max_supply: undefined,  // No max supply
    mint_settings: {
      mint_type: { type: "Issuer" },
      price: undefined,
      start_block: undefined,
      end_block: undefined,
      default_item_settings: 0n,
    },
  },
})

const result = await tx.signAndSubmit(signer)
console.log("NFT collection created! Tx:", result.txHash)
```

### NFT: Mint Item
```typescript
const tx = typedApi.tx.Nfts.mint({
  collection: 1,                            // Collection ID
  item: 1,                                  // Item ID
  mint_to: MultiAddress.Id(recipientAddress),
  witness_data: undefined,
})

const result = await tx.signAndSubmit(signer)
console.log("NFT minted! Tx:", result.txHash)

// Set item metadata
const metaTx = typedApi.tx.Nfts.set_metadata({
  collection: 1,
  item: 1,
  data: "ipfs://QmExampleHash", // Metadata URI
})
await metaTx.signAndSubmit(signer)
```

### NFT: Transfer
```typescript
const tx = typedApi.tx.Nfts.transfer({
  collection: 1,
  item: 1,
  dest: MultiAddress.Id(recipientAddress),
})

const result = await tx.signAndSubmit(signer)
console.log("NFT transferred! Tx:", result.txHash)
```

### Teleport DOT: Relay → Asset Hub
```typescript
// On Polkadot relay chain, teleport DOT to Asset Hub
// NOTE: This runs on the RELAY chain, not Asset Hub
import { polkadot } from "@polkadot-api/descriptors"

const tx = typedApi.tx.XcmPallet.limited_teleport_assets({
  dest: {
    type: "V4",
    value: {
      parents: 0,
      interior: { type: "X1", value: [{ type: "Parachain", value: 1000 }] },
    },
  },
  beneficiary: {
    type: "V4",
    value: {
      parents: 0,
      interior: {
        type: "X1",
        value: [{ type: "AccountId32", value: { network: undefined, id: accountBytes } }],
      },
    },
  },
  assets: {
    type: "V4",
    value: [{
      id: { parents: 0, interior: { type: "Here" } },
      fun: { type: "Fungible", value: 10_000_000_000n }, // 1 DOT
    }],
  },
  fee_asset_item: 0,
  weight_limit: { type: "Unlimited" },
})
```

## Well-Known Assets on Asset Hub

| Asset ID | Name | Symbol | Decimals | Chain |
|----------|------|--------|----------|-------|
| 1984 | Tether USD | USDT | 6 | Polkadot Asset Hub |
| 1337 | USD Coin | USDC | 6 | Polkadot Asset Hub |

## Rules
- ALWAYS default to `paseo_asset_hub` (testnet) for examples
- Asset Hub connects via WebSocket, not Smoldot
- Asset IDs are integers — they must be unique per chain
- The `Assets` pallet handles fungibles; `Nfts` pallet handles NFTs
- Use `transfer_keep_alive` over `transfer` for safety
- Teleport uses XCM — it's on the SOURCE chain, not the destination
- `min_balance` prevents dust accounts (very small leftover balances)
- ALWAYS include fee estimation
- NFT metadata is typically an IPFS URI or similar off-chain pointer
