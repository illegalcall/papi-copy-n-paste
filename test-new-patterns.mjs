#!/usr/bin/env node

/**
 * Test the new patterns for UnknownTokens, Uniques, and TransactionPause
 */

console.log('🔍 Testing new pallet patterns...\n');

// Simulate the pattern matching logic
function testPatternMatching(pallet, storage) {
  const patterns = [
    // UnknownTokens patterns
    ...(pallet === 'UnknownTokens' ? [
      { pattern: /^(ConcreteFungibleBalances|AbstractFungibleBalances)$/, params: ["SS58String", "u32"] }
    ] : []),
    // Uniques patterns
    ...(pallet === 'Uniques' ? [
      { pattern: /^(Class|ClassMetadataOf|CollectionMaxSupply)$/, params: ["u32"] },
      { pattern: /^OwnershipAcceptance$/, params: ["SS58String"] },
      { pattern: /^(Account|ClassAccount|Asset|InstanceMetadataOf|Attribute|ItemPriceOf)$/, params: ["u32", "u32"] }
    ] : []),
    // TransactionPause patterns
    ...(pallet === 'TransactionPause' ? [
      { pattern: /^PausedTransactions$/, params: ["Binary"] }
    ] : []),
    // Fallback
    { pattern: /.*/, params: [] }
  ];

  for (const { pattern, params } of patterns) {
    if (pattern.test(storage)) {
      return params;
    }
  }
  return [];
}

// Test cases from the images
const testCases = [
  // UnknownTokens
  { pallet: 'UnknownTokens', storage: 'ConcreteFungibleBalances' },
  { pallet: 'UnknownTokens', storage: 'AbstractFungibleBalances' },

  // Uniques
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

  // TransactionPause
  { pallet: 'TransactionPause', storage: 'PausedTransactions' }
];

console.log('🧪 Testing pattern matching:');
testCases.forEach(({ pallet, storage }) => {
  const params = testPatternMatching(pallet, storage);
  const paramText = params.length > 0
    ? `${params.join(', ')} (${params.length} parameter${params.length > 1 ? 's' : ''})`
    : 'None (no parameters)';

  console.log(`   • ${pallet}.${storage}: ${paramText}`);
});

console.log('\n✅ All patterns should now return appropriate parameter requirements!');
console.log('\n💡 Next: Test these in the web UI to verify they work correctly.');