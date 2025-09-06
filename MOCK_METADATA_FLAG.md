# Mock Metadata Feature Flag

## Overview

The PAPI Copy-Paste tool includes a comprehensive mock metadata system that provides fallback data when real blockchain metadata cannot be fetched. This feature can be controlled via an environment variable.

## Feature Flag Configuration

### Environment Variable
```bash
NEXT_PUBLIC_ENABLE_MOCK_METADATA=true|false
```

### Default Behavior
- **Default**: `false` (mock metadata disabled)
- **Location**: `.env.local` file in project root

## Behavior Modes

### Mock Metadata Disabled (Default: `false`)
```bash
NEXT_PUBLIC_ENABLE_MOCK_METADATA=false
```

**When real metadata fetch fails:**
- Returns empty metadata with no pallets
- UI shows empty pallet tree
- No fallback data is provided
- Cleaner experience when you only want real blockchain data

### Mock Metadata Enabled (`true`)
```bash
NEXT_PUBLIC_ENABLE_MOCK_METADATA=true
```

**When real metadata fetch fails:**
- Returns comprehensive mock metadata
- UI shows 50+ common Substrate pallets
- Includes chain-specific pallets (Acala DEX, Astar DappsStaking, etc.)
- App remains functional even without blockchain connection

## Mock Metadata System Features

When enabled, the mock system provides:

### Base Pallets (14 core Substrate pallets)
- **System**: remark, remark_with_event, set_heap_pages
- **Balances**: transfer_allow_death, transfer, transfer_keep_alive, transfer_all, force_transfer
- **Staking**: bond, bond_extra, unbond, withdraw_unbonded, nominate, chill
- **Democracy**: propose, vote, delegate
- **Treasury**: propose_spend, approve_proposal, reject_proposal
- **Vesting**: vest, vest_other, vested_transfer
- **XcmPallet**: send, teleport_assets, reserve_transfer_assets
- **Utility**: batch, batch_all, force_batch, as_derivative
- **Timestamp**: set

### Chain-Specific Enhancements
- **Acala**: Tokens + DEX pallets (swap_with_exact_supply, transfer)
- **Astar**: DappsStaking pallet (bond_and_stake)
- **Moonbeam**: EthereumXcm pallet (transact)

### Intelligent Call Generation
The system detects pallet types by name and generates appropriate calls:
- **Oracle pallets**: submit_price, update_oracle
- **DEX pallets**: swap_tokens, add_liquidity
- **Token pallets**: transfer, mint
- **Governance pallets**: submit_proposal, vote

### 50+ Additional Pallets
Including: Bounties, ChildBounties, NominationPools, FastUnstake, BagsList, ElectionProviderMultiPhase, Council, TechnicalCommittee, Identity, Proxy, Multisig, Scheduler, and many more.

## Configuration Examples

### Development with Mock Data
```bash
# .env.local
NEXT_PUBLIC_ENABLE_MOCK_METADATA=true
```
- Great for development when blockchain connection is unreliable
- Allows testing UI with comprehensive pallet data
- Always shows full functionality

### Production/Testing with Real Data Only
```bash
# .env.local
NEXT_PUBLIC_ENABLE_MOCK_METADATA=false
```
- Only shows real blockchain metadata
- Clean experience without fallback data
- Immediately shows when blockchain connection fails

## Implementation Details

### Code Location
- **Main logic**: `packages/core/metadata.ts`
- **Helper functions**: 
  - `isMockMetadataEnabled()`: Checks environment variable
  - `getMockMetadataIfEnabled()`: Returns mock data if flag is true
  - `createEmptyMetadata()`: Returns empty data when flag is false

### Fallback Points
The feature flag is checked at all metadata failure points:
1. Mock client detection
2. Real metadata fetch failures  
3. Metadata parsing errors
4. Network timeouts
5. Unknown metadata versions

### Environment Variable Detection
Works in both server and client environments:
```typescript
// Server-side (Node.js)
process.env.NEXT_PUBLIC_ENABLE_MOCK_METADATA

// Client-side fallback
window.ENV?.NEXT_PUBLIC_ENABLE_MOCK_METADATA
```

## Usage Scenarios

### Scenario 1: Development
**Need**: Consistent UI testing regardless of network conditions
**Setting**: `NEXT_PUBLIC_ENABLE_MOCK_METADATA=true`
**Result**: Always shows comprehensive pallet data

### Scenario 2: Production
**Need**: Only show real blockchain data, fail gracefully
**Setting**: `NEXT_PUBLIC_ENABLE_MOCK_METADATA=false`  
**Result**: Empty pallets when connection fails, clear indication of issues

### Scenario 3: Demos/Presentations
**Need**: Reliable demo environment with full functionality
**Setting**: `NEXT_PUBLIC_ENABLE_MOCK_METADATA=true`
**Result**: Rich pallet data even without blockchain connection

## File Structure

```
├── .env.local              # Your environment configuration
├── .env.example            # Template with documentation
├── packages/core/
│   └── metadata.ts         # Mock metadata implementation
└── MOCK_METADATA_FLAG.md   # This documentation
```

## Migration Notes

### Upgrading from Previous Versions
- **Before**: Mock metadata was always enabled
- **After**: Mock metadata is disabled by default
- **Action**: Set `NEXT_PUBLIC_ENABLE_MOCK_METADATA=true` to restore previous behavior

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_ENABLE_MOCK_METADATA` to desired value
3. Restart development server

## Troubleshooting

### Empty Pallet Tree
**Problem**: No pallets showing in UI
**Solution**: Check if mock metadata should be enabled:
```bash
NEXT_PUBLIC_ENABLE_MOCK_METADATA=true
```

### Mock Data Not Showing
**Problem**: Still seeing empty pallets with flag enabled
**Solution**: 
1. Verify `.env.local` exists in project root
2. Restart development server after changing environment variables
3. Check browser console for feature flag detection logs

### Case Sensitivity
**Important**: Environment variable values are case-sensitive
- ✅ Correct: `true`, `false`  
- ❌ Incorrect: `True`, `FALSE`, `1`, `0`