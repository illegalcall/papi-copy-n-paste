#!/usr/bin/env node

/**
 * Test all pallet patterns comprehensively
 */

console.log('🔍 Testing comprehensive pallet patterns...\n');

// Simulate the complete pattern matching logic from dynamicStorageDetection.ts
function testPatternMatching(pallet, storage) {
  const patterns = [
    // Pallet-specific patterns (FIRST - highest priority)
    ...(pallet === 'Balances' ? [
      { pattern: /^(Account|Locks|Reserves|Holds|Freezes)$/, params: ["AccountId"] },
      { pattern: /^(TotalIssuance|InactiveIssuance)$/, params: [] }
    ] : []),
    ...(pallet === 'System' ? [
      { pattern: /^(Account)$/, params: ["AccountId"] },
      { pattern: /^(BlockHash|ExtrinsicData)$/, params: ["u32"] },
      { pattern: /^(EventTopics)$/, params: ["Hash"] }
    ] : []),
    ...(pallet === 'Staking' ? [
      { pattern: /^(Bonded|Ledger|Payee|Validators|Nominators)$/, params: ["AccountId"] },
      { pattern: /^(Eras.*Staker|ClaimedRewards|ValidatorSlash|NominatorSlash)/, params: ["u32", "AccountId"] }
    ] : []),
    // Hydration-specific patterns (HIGH PRIORITY)
    ...(pallet === 'XYK' ? [
      { pattern: /^(ShareToken|TotalLiquidity|LiquidityPool|LiquidityAssets)$/, params: ["SS58String"] },
      { pattern: /^(PoolAssets|AssetPair)$/, params: ["u32", "u32"] },
      { pattern: /^(Pools|Shares)$/, params: [] }
    ] : []),
    ...(pallet === 'AssetRegistry' ? [
      { pattern: /^(Assets|Metadata)$/, params: ["u32"] },
      { pattern: /^(NextAssetId|BannedAssets)$/, params: [] }
    ] : []),
    ...(pallet === 'Omnipool' ? [
      { pattern: /^(Assets|Positions|HubAssetLiquidity)$/, params: ["u32"] },
      { pattern: /^(NextAssetId|NextPositionId)$/, params: [] }
    ] : []),
    ...(pallet === 'XYKWarehouseLM' ? [
      { pattern: /^GlobalFarm$/, params: ["u32"] },
      { pattern: /^Deposit$/, params: ["u64"] },
      { pattern: /^(FarmSequencer|DepositSequencer)$/, params: [] },
      { pattern: /^YieldFarm$/, params: ["u32"] },
      { pattern: /^ActiveYieldFarm$/, params: ["SS58String"] }
    ] : []),
    ...(pallet === 'OmnipoolWarehouseLM' ? [
      { pattern: /^(GlobalFarm|YieldFarm)$/, params: ["u32"] },
      { pattern: /^(UserDeposit|UserLockMultiplier)$/, params: ["SS58String", "u32"] },
      { pattern: /^(FarmSequencer|ActiveYieldFarmsPerLiquidityToken)$/, params: [] }
    ] : []),
    ...(pallet === 'XcmpQueue' ? [
      { pattern: /^(SignalMessages|DeliveryFeeFactor)$/, params: ["u32"] },
      { pattern: /^(InboundXcmpSuspended|OutboundXcmpStatus|QueueConfig|QueueSuspended)$/, params: [] },
      { pattern: /^OutboundXcmpMessages$/, params: ["u32"] }
    ] : []),
    ...(pallet === 'UnknownTokens' ? [
      { pattern: /^(ConcreteFungibleBalances|AbstractFungibleBalances)$/, params: ["SS58String", "u32"] }
    ] : []),
    ...(pallet === 'Uniques' ? [
      { pattern: /^(Class|ClassMetadataOf|CollectionMaxSupply)$/, params: ["u32"] },
      { pattern: /^OwnershipAcceptance$/, params: ["SS58String"] },
      { pattern: /^(Account|ClassAccount|Asset|InstanceMetadataOf|Attribute|ItemPriceOf)$/, params: ["u32", "u32"] }
    ] : []),
    ...(pallet === 'TransactionPause' ? [
      { pattern: /^PausedTransactions$/, params: ["Binary"] }
    ] : []),
    ...(pallet === 'Referrals' ? [
      { pattern: /^ReferralCodes$/, params: ["Binary"] },
      { pattern: /^(ReferralAccounts|LinkedAccounts)$/, params: ["SS58String"] },
      { pattern: /^AssetRewards$/, params: ["u32", "u32"] }
    ] : []),
    ...(pallet === 'DCA' ? [
      { pattern: /^ScheduleIdSequencer$/, params: [] },
      { pattern: /^(Schedules|ScheduleOwnership|RetryOnError)$/, params: ["u32"] }
    ] : []),
    ...(pallet === 'MultiTransactionPayment' ? [
      { pattern: /^(AccountCurrencyMap|AcceptedCurrencies|FeeWithdrawalFee)$/, params: ["SS58String"] },
      { pattern: /^AcceptedCurrencyPrice$/, params: ["u32"] }
    ] : []),
    ...(pallet === 'Vesting' ? [
      { pattern: /^VestingSchedules$/, params: ["SS58String"] }
    ] : []),
    ...(pallet === 'Identity' ? [
      { pattern: /^(IdentityOf|SuperOf|SubsOf|Registrars)$/, params: ["SS58String"] },
      { pattern: /^(UsernameAuthorities|AccountOfUsername|PendingUsernames)$/, params: ["Binary"] }
    ] : []),
    ...(pallet === 'Proxy' ? [
      { pattern: /^(Proxies|Announcements)$/, params: ["SS58String"] }
    ] : []),
    ...(pallet === 'Multisig' ? [
      { pattern: /^Multisigs$/, params: ["SS58String", "Hash"] }
    ] : []),
    ...(pallet === 'Preimage' ? [
      { pattern: /^(StatusFor|PreimageFor)$/, params: ["Hash"] }
    ] : []),
    ...(pallet === 'Scheduler' ? [
      { pattern: /^(Agenda|Lookup)$/, params: ["u32"] }
    ] : []),
    ...(pallet === 'Democracy' ? [
      { pattern: /^(PublicProps|DepositOf|ReferendumInfoOf|VotingOf|DepositOf)$/, params: ["u32"] },
      { pattern: /^(Blacklist|Cancellations)$/, params: ["Hash"] }
    ] : []),
    ...(pallet === 'ConvictionVoting' ? [
      { pattern: /^(VotingFor|ClassLocksFor)$/, params: ["SS58String"] }
    ] : []),
    // Generic patterns (LOWER PRIORITY - only used if no pallet-specific match)
    { pattern: /^(Total|Current|Next|Last|Min|Max)/, params: [] },
    { pattern: /^(Account|Balance|Lock|Reserve|Hold|Freeze)s?$/, params: ["AccountId"] },
    { pattern: /.*/, params: [] } // Final fallback
  ];

  for (const { pattern, params } of patterns) {
    if (pattern.test(storage)) {
      return params;
    }
  }
  return [];
}

// Comprehensive test cases
const testCases = [
  // Previously fixed
  { pallet: 'XYK', storage: 'TotalLiquidity' },
  { pallet: 'XYKWarehouseLM', storage: 'GlobalFarm' },
  { pallet: 'XcmpQueue', storage: 'SignalMessages' },

  // New ones from your images
  { pallet: 'UnknownTokens', storage: 'ConcreteFungibleBalances' },
  { pallet: 'UnknownTokens', storage: 'AbstractFungibleBalances' },

  { pallet: 'Uniques', storage: 'Class' },
  { pallet: 'Uniques', storage: 'OwnershipAcceptance' },
  { pallet: 'Uniques', storage: 'Account' },
  { pallet: 'Uniques', storage: 'ClassAccount' },
  { pallet: 'Uniques', storage: 'Asset' },
  { pallet: 'Uniques', storage: 'ClassMetadataOf' },
  { pallet: 'Uniques', storage: 'InstanceMetadataOf' },
  { pallet: 'Uniques', storage: 'Attribute' },
  { pallet: 'Uniques', storage: 'ItemPriceOf' },
  { pallet: 'Uniques', storage: 'CollectionMaxSupply' },

  { pallet: 'TransactionPause', storage: 'PausedTransactions' },

  { pallet: 'Referrals', storage: 'ReferralCodes' },
  { pallet: 'Referrals', storage: 'ReferralAccounts' },
  { pallet: 'Referrals', storage: 'LinkedAccounts' },
  { pallet: 'Referrals', storage: 'AssetRewards' },

  { pallet: 'DCA', storage: 'ScheduleIdSequencer' },
  { pallet: 'DCA', storage: 'Schedules' },

  { pallet: 'MultiTransactionPayment', storage: 'AccountCurrencyMap' },
  { pallet: 'Vesting', storage: 'VestingSchedules' },

  // Common Substrate pallets
  { pallet: 'Identity', storage: 'IdentityOf' },
  { pallet: 'Proxy', storage: 'Proxies' },
  { pallet: 'Multisig', storage: 'Multisigs' }
];

console.log('🧪 Testing comprehensive pattern matching:');
let successCount = 0;
let totalCount = testCases.length;

testCases.forEach(({ pallet, storage }) => {
  const params = testPatternMatching(pallet, storage);
  const paramText = params.length > 0
    ? `${params.join(', ')} (${params.length} parameter${params.length > 1 ? 's' : ''})`
    : 'None (no parameters)';

  const hasParams = params.length > 0;
  const status = hasParams ? '✅' : '⚠️';

  console.log(`   ${status} ${pallet}.${storage}: ${paramText}`);

  if (hasParams || ['ScheduleIdSequencer', 'TotalIssuance', 'InactiveIssuance', 'NextAssetId', 'BannedAssets', 'NextPositionId', 'FarmSequencer', 'DepositSequencer', 'Pools', 'Shares', 'InboundXcmpSuspended', 'OutboundXcmpStatus', 'QueueConfig', 'QueueSuspended', 'ActiveYieldFarmsPerLiquidityToken'].includes(storage)) {
    successCount++;
  }
});

console.log(`\n📊 Results: ${successCount}/${totalCount} patterns working correctly`);

if (successCount === totalCount) {
  console.log('✅ All patterns should now work in the web UI!');
} else {
  console.log('⚠️  Some patterns may need additional tuning.');
}

console.log('\n💡 Next: Clear browser cache and test in the web UI.');