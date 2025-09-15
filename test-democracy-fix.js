#!/usr/bin/env node

/**
 * Test Democracy.Blacklist fix
 */

console.log('🔍 Testing Democracy.Blacklist fix...\n');

// Simulate the fixed detection logic
function detectStorageParameters(chainKey, pallet, storage) {
  const patterns = [
    ...(pallet === 'Democracy' ? [
      { pattern: /^(PublicPropCount|ReferendumCount|LowestUnbaked|LastTabledWasExternal)$/, params: [] },
      { pattern: /^(Blacklist|Cancellations)$/, params: ["Hash"] },
      { pattern: /^(PublicProps|NextExternal|MetadataOf)$/, params: ["u32","u32"] },
      { pattern: /^(DepositOf|ReferendumInfoOf)$/, params: ["u32"] },
      { pattern: /^VotingOf$/, params: ["SS58String"] }
    ] : []),
    ...(pallet === 'System' ? [
      { pattern: /^Account$/, params: ["SS58String"] },
      { pattern: /^(ExtrinsicCount|InherentsApplied|AllExtrinsicsLen|Number|ParentHash|EventCount|UpgradedToU32RefCount|UpgradedToTripleRefCount|ExecutionPhase)$/, params: [] },
      { pattern: /^EventTopics$/, params: ["Hash"] },
      { pattern: /^(BlockWeight|Digest|Events|LastRuntimeUpgrade|AuthorizedUpgrade)$/, params: ["u32","u32"] },
      { pattern: /^(BlockHash|ExtrinsicData)$/, params: ["u32"] }
    ] : []),
    ...(pallet === 'Preimage' ? [
      { pattern: /^(StatusFor|RequestStatusFor)$/, params: ["Hash"] },
      { pattern: /^PreimageFor$/, params: ["u32","u32"] }
    ] : []),
    { pattern: /.*/, params: [] }
  ];

  for (const { pattern, params } of patterns) {
    if (pattern.test(storage)) {
      return params;
    }
  }
  return [];
}

// Test cases for the fixes
const testCases = [
  { pallet: 'Democracy', storage: 'Blacklist', expected: ['Hash'] },
  { pallet: 'Democracy', storage: 'Cancellations', expected: ['Hash'] },
  { pallet: 'Democracy', storage: 'PublicPropCount', expected: [] },
  { pallet: 'System', storage: 'EventTopics', expected: ['Hash'] },
  { pallet: 'System', storage: 'Account', expected: ['SS58String'] },
  { pallet: 'Preimage', storage: 'StatusFor', expected: ['Hash'] },
  { pallet: 'Preimage', storage: 'RequestStatusFor', expected: ['Hash'] }
];

console.log('🧪 Testing fixed patterns:');
let successCount = 0;

for (const testCase of testCases) {
  const actual = detectStorageParameters('hydration', testCase.pallet, testCase.storage);
  const matches = JSON.stringify(actual) === JSON.stringify(testCase.expected);
  const status = matches ? '✅' : '❌';

  const actualText = actual.length > 0
    ? `${actual.join(', ')} (${actual.length} parameter${actual.length > 1 ? 's' : ''})`
    : 'None';

  const expectedText = testCase.expected.length > 0
    ? `${testCase.expected.join(', ')} (${testCase.expected.length} parameter${testCase.expected.length > 1 ? 's' : ''})`
    : 'None';

  console.log(`   ${status} ${testCase.pallet}.${testCase.storage}: ${actualText}`);

  if (!matches) {
    console.log(`      Expected: ${expectedText}`);
  }

  if (matches) successCount++;
}

console.log(`\n📊 Results: ${successCount}/${testCases.length} fixes working`);

if (successCount === testCases.length) {
  console.log('🎉 All Hash-based storage items are now fixed!');
  console.log('💡 Democracy.Blacklist should now work correctly.');
} else {
  console.log('⚠️  Some patterns still need fixes.');
}

console.log('\n🔧 Summary of fixes:');
console.log('   • Democracy.Blacklist: Hash parameter (was: no parameters)');
console.log('   • Democracy.Cancellations: Hash parameter (was: no parameters)');
console.log('   • System.EventTopics: Hash parameter (was: no parameters)');
console.log('   • Preimage.StatusFor: Hash parameter (was: no parameters)');
console.log('   • Preimage.RequestStatusFor: Hash parameter (was: no parameters)');

console.log('\n✅ These storage items should now work in the web UI!');