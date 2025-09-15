#!/usr/bin/env node

/**
 * Fix Hydration Address Format
 * Quick script to test Hydration storage with correct address format
 */

const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');
const path = require('path');

async function testHydrationAddresses() {
  console.log('🔍 Testing Hydration with correct address formats...\n');

  let client = null;
  try {
    // Connect to Hydration
    console.log('🔌 Connecting to Hydration...');
    const wsProvider = getWsProvider('wss://hydration-rpc.n.dwellir.com');
    client = createClient(wsProvider);

    // Load Hydration descriptor
    const { hydration } = require(path.resolve('./.papi/descriptors/dist'));
    const typedApi = client.getTypedApi(hydration);

    console.log('✅ Connected to Hydration\n');

    // Test different address formats for Hydration
    const testAddresses = [
      '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', // Polkadot format
      '7L53bUBopBeVEr1c9AMLr38tCHfNRan9cqTHHcCB6pNppRzV', // Hydration format 1
      '7NPoMQbiKBVmPDECE4qv5kAKhUr1dNmbg3UqtEvN1DPFVvPM', // Hydration format 2
      '7KPTGgBRgdLaW6FNWPhktxPyBdGTRHq45vKAM8n4wfvB6CNP', // Hydration format 3
    ];

    console.log('🧪 Testing System.Account with different address formats:');

    for (const address of testAddresses) {
      try {
        console.log(`\n   Testing: ${address}`);
        const result = await Promise.race([
          typedApi.query.System.Account.getValue(address),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);

        console.log(`   ✅ SUCCESS: ${typeof result} ${result ? '(has data)' : '(no data)'}`);
        if (result) {
          console.log(`   📊 Account data: ${JSON.stringify(result, null, 2).substring(0, 200)}...`);
        }
        break; // Stop on first success

      } catch (error) {
        console.log(`   ❌ FAILED: ${error.message}`);
      }
    }

    console.log('\n🧪 Testing some plain storage items:');

    const plainTests = [
      'System.Number',
      'System.ExtrinsicCount',
      'Balances.TotalIssuance',
      'Timestamp.Now'
    ];

    for (const test of plainTests) {
      try {
        const [pallet, storage] = test.split('.');
        console.log(`\n   Testing: ${test}`);

        const result = await Promise.race([
          typedApi.query[pallet][storage].getValue(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);

        console.log(`   ✅ SUCCESS: ${typeof result} = ${result?.toString?.() || 'undefined'}`);

      } catch (error) {
        console.log(`   ❌ FAILED: ${error.message}`);
      }
    }

    console.log('\n🧪 Testing Hydration-specific storage:');

    const hydrationTests = [
      { pallet: 'Tokens', storage: 'TotalIssuance', param: 0 },
      { pallet: 'AssetRegistry', storage: 'Assets', param: 0 },
      { pallet: 'Omnipool', storage: 'NextAssetId', param: null }
    ];

    for (const test of hydrationTests) {
      try {
        console.log(`\n   Testing: ${test.pallet}.${test.storage}`);

        let result;
        if (test.param !== null) {
          result = await Promise.race([
            typedApi.query[test.pallet][test.storage].getValue(test.param),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
          ]);
        } else {
          result = await Promise.race([
            typedApi.query[test.pallet][test.storage].getValue(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
          ]);
        }

        console.log(`   ✅ SUCCESS: ${typeof result} = ${result?.toString?.() || 'undefined'}`);

      } catch (error) {
        console.log(`   ❌ FAILED: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    if (client) {
      console.log('\n🧹 Cleaning up...');
      client.destroy();
    }
  }
}

if (require.main === module) {
  testHydrationAddresses();
}