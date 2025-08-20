# PAPI Constants System

This project now includes a build-time constant extraction and decoding system for optimal performance.

## 🚀 How It Works

1. **Pre-extraction**: Run `npm run constants` to extract and decode all constants for all supported chains
2. **JSON Storage**: Decoded constants are saved to `packages/core/generated/decoded-constants.json`
3. **Instant Access**: The UI reads from this JSON file for immediate constant display (no runtime decoding!)

## 📦 Supported Chains

- **Polkadot** - Mainnet relay chain (101 constants)
- **Kusama** - Canary network relay chain (129 constants)
- **Moonbeam** - Ethereum-compatible parachain (99 constants)
- **Astar** - Multi-VM parachain (113 constants)
- **Westend** - Test relay chain (116 constants)
- **Rococo** - Test relay chain (108 constants)
- **Hydration** - DeFi-focused parachain (185 constants)

**Total: 851 constants** across 7 chains

## ⚡ Performance Benefits

### Before
- ❌ Slow "Decoding..." state on every page load
- ❌ Runtime SCALE decoding for each constant
- ❌ Network calls to decode constants
- ❌ Poor user experience

### After
- ✅ **Instant constant display** - no loading states
- ✅ **Pre-decoded values** - all constants ready immediately
- ✅ **Offline access** - works without network calls
- ✅ **Perfect UX** - seamless constant viewing

## 🛠️ Usage

### 1. Extract Constants (Manual)

```bash
npm run constants
```

This will:
- Extract constants from all supported chains
- Decode values using SCALE codecs
- Save results to JSON file
- Show progress and statistics

### 2. View Constants in UI

1. Navigate to http://localhost:3004
2. Select a chain (Polkadot, Kusama, etc.)
3. Browse to any pallet with constants
4. **Constants display instantly** with decoded values!

### 3. Generated Files

- **JSON Data**: `packages/core/generated/decoded-constants.json`
- **Service**: `apps/web/services/preDecodedConstants.ts`
- **Script**: `packages/core/scripts/extract-all-constants.ts`

## 📊 Current Data

The system extracts **all constants** from all supported pallets, including:

- **System pallet**: BlockHashCount, BlockLength, Version, SS58Prefix
- **Balances pallet**: ExistentialDeposit, MaxLocks, MaxReserves
- **Timestamp pallet**: MinimumPeriod
- **Staking pallet**: SessionsPerEra, BondingDuration, SlashDeferDuration
- **Treasury pallet**: SpendPeriod, Burn, PalletId, MaxApprovals
- **And many more** across all pallets on each chain

### Sample Output

```json
{
  "polkadot": {
    "chainInfo": {
      "name": "Polkadot",
      "extractedAt": "2025-09-17T09:31:10.805Z"
    },
    "constants": [
      {
        "palletName": "System",
        "constantName": "BlockHashCount",
        "rawValue": "4096",
        "decodedValue": 4096,
        "type": "number",
        "docs": ["Constant from System pallet"],
        "chainKey": "polkadot",
        "extractedAt": "2025-09-17T09:31:10.793Z"
      }
    ]
  }
}
```

## 🔧 Extending the System

### Add More Chains

Add chain configuration to the `chains` object in `extract-all-constants.ts`:

```typescript
yourChain: {
  name: 'Your Chain Name',
  wsUrl: 'wss://your-chain-rpc-url',
  type: 'websocket'
}
```

Or for chains with built-in chain specs:

```typescript
yourChain: {
  name: 'Your Chain Name',
  chainSpec: yourChainSpec, // Import from polkadot-api/chains
  type: 'smoldot'
}
```

### Supported Connection Types

- **smoldot**: For chains with built-in chain specs (Polkadot, Kusama)
- **websocket**: For direct RPC connections (most parachains)

### Advanced Features

The system automatically:
- **Discovers all constants** from chain metadata
- **Decodes all SCALE types** using PAPI's built-in codecs
- **Handles BigInt values** for JSON serialization
- **Provides connection timeouts** for reliability
- **Caches results** for instant UI access

## 🚨 Important Notes

1. **Manual Extraction**: Run `npm run constants` whenever you want fresh data
2. **Git Tracking**: The JSON file should be committed to git for deployment
3. **Live Chain Connections**: System connects to real chains for accurate data
4. **Error Handling**: Failed connections are handled gracefully with retries
5. **BigInt Support**: Large numbers are automatically converted to strings for JSON compatibility

## ✅ System Features

- **🚀 Real-time Extraction**: Connects to live chains using PAPI and smoldot
- **⚡ Instant UI Access**: Pre-decoded constants eliminate loading states
- **🔒 Production Ready**: Timeout handling, error recovery, and cleanup
- **📊 Comprehensive Data**: 851 constants across 7 chains
- **🛠️ Developer Friendly**: Easy to extend with new chains and connection types

The system completely eliminates the performance issues users were experiencing with slow constant decoding!