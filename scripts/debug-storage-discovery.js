#!/usr/bin/env node

/**
 * Debug Storage Discovery
 * Quick test to understand how to properly discover storage items
 */

const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');

async function debugStorageDiscovery() {
  console.log('🔍 Debug: Understanding storage discovery...\n');

  let client = null;
  try {
    // Connect to Polkadot
    console.log('🔌 Connecting to Polkadot...');
    const wsProvider = getWsProvider('wss://rpc.polkadot.io');
    client = createClient(wsProvider);

    // Load descriptor
    const { polkadot } = require('../.papi/descriptors/dist');
    const typedApi = client.getTypedApi(polkadot);

    console.log('✅ Connected and loaded typed API\n');

    // Examine the structure
    console.log('📊 TypedApi structure:');
    console.log('- keys:', Object.keys(typedApi));
    console.log('- has query:', !!typedApi.query);
    console.log('- has tx:', !!typedApi.tx);
    console.log('- has apis:', !!typedApi.apis);

    if (typedApi.query) {
      console.log('\n🗄️ Query pallets (keys):', Object.keys(typedApi.query));
      console.log('🗄️ Query pallets (getOwnPropertyNames):', Object.getOwnPropertyNames(typedApi.query));

      // Since Object.keys() is empty, let's try known pallets
      const knownPallets = ['System', 'Balances', 'Staking', 'Democracy', 'Treasury', 'Timestamp', 'Indices'];
      const foundPallets = [];

      for (const palletName of knownPallets) {
        try {
          const pallet = typedApi.query[palletName];
          if (pallet && typeof pallet === 'object') {
            foundPallets.push(palletName);
            console.log(`\n📦 ${palletName} pallet found`);

            // Try to get storage items
            const storageKeys = Object.keys(pallet);
            const storageProps = Object.getOwnPropertyNames(pallet);

            console.log(`   - keys: ${storageKeys.join(', ')}`);
            console.log(`   - props: ${storageProps.join(', ')}`);

            // For System, try known storage items
            if (palletName === 'System') {
              const knownSystemStorage = ['Account', 'Number', 'ExtrinsicCount', 'BlockHash'];
              for (const storageName of knownSystemStorage) {
                try {
                  const storage = pallet[storageName];
                  if (storage && typeof storage.getValue === 'function') {
                    console.log(`   ✅ ${palletName}.${storageName} - has getValue method`);
                  }
                } catch (e) {
                  console.log(`   ❌ ${palletName}.${storageName} - error: ${e.message}`);
                }
              }
            }

            // For Balances, try known storage items
            if (palletName === 'Balances') {
              const knownBalancesStorage = ['TotalIssuance', 'Account', 'Locks', 'Reserves'];
              for (const storageName of knownBalancesStorage) {
                try {
                  const storage = pallet[storageName];
                  if (storage && typeof storage.getValue === 'function') {
                    console.log(`   ✅ ${palletName}.${storageName} - has getValue method`);
                  }
                } catch (e) {
                  console.log(`   ❌ ${palletName}.${storageName} - error: ${e.message}`);
                }
              }
            }
          }
        } catch (error) {
          // Pallet doesn't exist
        }
      }

      console.log(`\n📊 Found pallets: ${foundPallets.join(', ')}`);
    }

    // Test a quick query
    console.log('\n🧪 Quick test: System.Number');
    const blockNumber = await typedApi.query.System.Number.getValue();
    console.log('✅ Result:', blockNumber);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (client) {
      console.log('\n🧹 Cleaning up...');
      client.destroy();
    }
  }
}

if (require.main === module) {
  debugStorageDiscovery();
}