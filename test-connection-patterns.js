#!/usr/bin/env node

// Test script to verify the new connection patterns
const { getChainConnection, getDescriptorImport, getDescriptorName } = require('./apps/web/utils/chainConfig.ts');

console.log('Testing connection patterns for different chains...\n');

// Test smoldot chains
const smoldotChains = ['polkadot', 'kusama', 'paseo'];
console.log('=== SMOLDOT CHAINS ===');
smoldotChains.forEach(chain => {
  console.log(`\n${chain.toUpperCase()}:`);
  const connection = getChainConnection(chain);
  const descriptorImport = getDescriptorImport(chain);
  const descriptorName = getDescriptorName(chain);

  console.log('Imports:', connection.imports);
  console.log('Connection:', connection.connection);
  console.log('Descriptor Import:', descriptorImport);
  console.log('Descriptor Name:', descriptorName);
});

// Test WebSocket chains
const websocketChains = ['moonbeam', 'bifrost', 'astar', 'acala', 'hydration'];
console.log('\n\n=== WEBSOCKET CHAINS ===');
websocketChains.forEach(chain => {
  console.log(`\n${chain.toUpperCase()}:`);
  const connection = getChainConnection(chain);
  const descriptorImport = getDescriptorImport(chain);
  const descriptorName = getDescriptorName(chain);

  console.log('Imports:', connection.imports);
  console.log('Connection:', connection.connection);
  console.log('Descriptor Import:', descriptorImport);
  console.log('Descriptor Name:', descriptorName);
});

console.log('\n✅ Connection pattern test completed!');