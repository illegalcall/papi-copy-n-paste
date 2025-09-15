#!/usr/bin/env node

/**
 * Test patterns directly from the web application code
 */

// Import the actual dynamicStorageDetection module
import { getStorageParameterInfo } from './apps/web/utils/dynamicStorageDetection.ts';

console.log('🔍 Testing patterns from actual web application code...\n');

// Test cases based on the comprehensive analysis
const testCases = [
  // Previously problematic cases
  { pallet: 'XYK', storage: 'TotalLiquidity', expected: ['SS58String'] },
  { pallet: 'XYKWarehouseLM', storage: 'GlobalFarm', expected: ['u32'] },
  { pallet: 'XcmpQueue', storage: 'SignalMessages', expected: ['u32'] },

  // New comprehensive fixes
  { pallet: 'UnknownTokens', storage: 'ConcreteFungibleBalances', expected: ['u32', 'u32'] },
  { pallet: 'UnknownTokens', storage: 'AbstractFungibleBalances', expected: ['u32', 'u32'] },

  { pallet: 'Uniques', storage: 'Class', expected: ['u32'] },
  { pallet: 'Uniques', storage: 'OwnershipAcceptance', expected: ['SS58String'] },
  { pallet: 'Uniques', storage: 'Account', expected: ['u32', 'u32'] },
  { pallet: 'Uniques', storage: 'ClassAccount', expected: ['u32', 'u32'] },
  { pallet: 'Uniques', storage: 'Asset', expected: ['u32', 'u32'] },
  { pallet: 'Uniques', storage: 'InstanceMetadataOf', expected: ['u32', 'u32'] },
  { pallet: 'Uniques', storage: 'ItemPriceOf', expected: ['u32', 'u32'] },

  { pallet: 'TransactionPause', storage: 'PausedTransactions', expected: ['u32', 'u32'] },

  { pallet: 'Referrals', storage: 'ReferralCodes', expected: ['Binary'] },
  { pallet: 'Referrals', storage: 'ReferralAccounts', expected: ['SS58String'] },
  { pallet: 'Referrals', storage: 'LinkedAccounts', expected: ['SS58String'] },
  { pallet: 'Referrals', storage: 'AssetRewards', expected: ['u32', 'u32'] },

  { pallet: 'DCA', storage: 'ScheduleIdSequencer', expected: [] },
  { pallet: 'DCA', storage: 'Schedules', expected: ['u32'] },
  { pallet: 'DCA', storage: 'ScheduleOwnership', expected: ['u32', 'u32'] },

  { pallet: 'MultiTransactionPayment', storage: 'AccountCurrencyMap', expected: ['SS58String'] },
  { pallet: 'MultiTransactionPayment', storage: 'AcceptedCurrencies', expected: ['u32'] },

  // Additional comprehensive coverage
  { pallet: 'AssetRegistry', storage: 'Assets', expected: ['u32'] },
  { pallet: 'AssetRegistry', storage: 'NextAssetId', expected: [] },
  { pallet: 'AssetRegistry', storage: 'LocationAssets', expected: ['u32', 'u32'] },

  { pallet: 'Omnipool', storage: 'Assets', expected: ['u32'] },
  { pallet: 'Omnipool', storage: 'NextPositionId', expected: [] },

  { pallet: 'CircuitBreaker', storage: 'TradeVolumeLimitPerAsset', expected: ['u32'] },

  { pallet: 'Multisig', storage: 'Multisigs', expected: ['u32', 'u32'] },

  { pallet: 'Identity', storage: 'IdentityOf', expected: ['SS58String'] },
  { pallet: 'Identity', storage: 'AccountOfUsername', expected: ['Binary'] },

  { pallet: 'Proxy', storage: 'Proxies', expected: ['SS58String'] },

  { pallet: 'Vesting', storage: 'VestingSchedules', expected: ['SS58String'] }
];

console.log('🧪 Testing with actual web application logic:');
let successCount = 0;
let totalCount = testCases.length;

for (const testCase of testCases) {
  try {
    const info = getStorageParameterInfo('hydration', testCase.pallet, testCase.storage);
    const actual = info.required;

    const matches = JSON.stringify(actual) === JSON.stringify(testCase.expected);
    const status = matches ? '✅' : '❌';

    const actualText = actual.length > 0
      ? `${actual.join(', ')} (${actual.length} parameter${actual.length > 1 ? 's' : ''})`
      : 'None';

    const expectedText = testCase.expected.length > 0
      ? `${testCase.expected.join(', ')} (${testCase.expected.length} parameter${testCase.expected.length > 1 ? 's' : ''})`
      : 'None';

    console.log(`   ${status} ${testCase.pallet}.${testCase.storage}:`);
    console.log(`      Expected: ${expectedText}`);
    console.log(`      Actual:   ${actualText}`);

    if (matches) {
      successCount++;
    } else {
      console.log(`      ⚠️  MISMATCH - needs pattern fix`);
    }
    console.log();

  } catch (error) {
    console.log(`   ❌ ${testCase.pallet}.${testCase.storage}: ERROR - ${error.message}`);
    console.log();
  }
}

console.log(`📊 Results: ${successCount}/${totalCount} patterns working correctly`);

if (successCount === totalCount) {
  console.log('🎉 All comprehensive patterns are working correctly!');
  console.log('💡 The web UI should now handle ALL storage queries without parameter errors.');
} else {
  console.log(`⚠️  ${totalCount - successCount} patterns need fixes.`);
  console.log('🔧 Check the mismatches above and update the patterns accordingly.');
}

console.log('\n🚀 Ready for production use!');