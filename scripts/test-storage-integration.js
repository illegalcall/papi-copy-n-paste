#!/usr/bin/env node

/**
 * Test Storage Integration
 * Quick test to validate the integrated storage testing system
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');

class QuickStorageTester {
  constructor() {
    this.results = [];
  }

  parseStorageFromDescriptor(chainKey) {
    const descriptorPath = path.resolve(`./.papi/descriptors/dist/${chainKey}.d.ts`);

    if (!fs.existsSync(descriptorPath)) {
      console.log(`❌ Descriptor file not found: ${descriptorPath}`);
      return null;
    }

    const content = fs.readFileSync(descriptorPath, 'utf-8');

    // Find the IStorage type definition
    const storageTypeMatch = content.match(/type IStorage = \{([\s\S]*?)\n\};/);

    if (!storageTypeMatch) {
      console.log('❌ IStorage type definition not found');
      return null;
    }

    const storageContent = storageTypeMatch[1];
    const pallets = {};

    // Extract pallets - they are top-level properties in IStorage
    const palletMatches = storageContent.match(/^\s+(\w+):\s*\{/gm);

    if (!palletMatches) {
      console.log('❌ No pallets found in IStorage');
      return null;
    }

    // For each pallet, extract its storage items (limited to first few for testing)
    let totalItems = 0;
    for (const match of palletMatches.slice(0, 3)) { // Test only first 3 pallets
      const palletName = match.match(/^\s+(\w+):/)[1];

      // Find the pallet's content block
      const palletRegex = new RegExp(`^\\s+${palletName}:\\s*\\{([\\s\\S]*?)^\\s+\\};`, 'm');
      const palletMatch = storageContent.match(palletRegex);

      if (!palletMatch) continue;

      const palletContent = palletMatch[1];
      const storageItems = {};

      // Extract storage items from the pallet content
      const storageMatches = palletContent.match(/^\s+(\w+):\s*StorageDescriptor/gm);

      if (storageMatches) {
        // Test only first 3 storage items per pallet
        for (const storageMatch of storageMatches.slice(0, 3)) {
          const storageName = storageMatch.match(/^\s+(\w+):/)[1];

          // Extract the full StorageDescriptor definition to understand parameters
          const storageRegex = new RegExp(`^\\s+${storageName}:\\s*StorageDescriptor<([^>]*)>`, 'm');
          const storageDefMatch = palletContent.match(storageRegex);

          let requiresParams = false;
          let storageType = 'unknown';

          if (storageDefMatch) {
            const descriptorParams = storageDefMatch[1];
            // If first parameter is an array with Key, it requires parameters
            if (descriptorParams.includes('[Key:') || descriptorParams.includes('[key:')) {
              requiresParams = true;
              storageType = 'map';
            } else if (descriptorParams.startsWith('[]')) {
              requiresParams = false;
              storageType = 'plain';
            }
          }

          storageItems[storageName] = {
            name: storageName,
            requiresParams,
            storageType
          };
          totalItems++;
        }
      }

      if (Object.keys(storageItems).length > 0) {
        pallets[palletName] = {
          name: palletName,
          storageItems,
          totalItems: Object.keys(storageItems).length
        };
      }
    }

    return {
      chainKey,
      pallets,
      totalPallets: Object.keys(pallets).length,
      totalStorageItems: totalItems
    };
  }

  getTestParameter(palletName, storageName) {
    const testParams = {
      'System': {
        'Account': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'BlockHash': 0,
        'ExtrinsicData': 0,
        'EventTopics': '0x0000000000000000000000000000000000000000000000000000000000000000'
      },
      'Balances': {
        'Account': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Locks': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Reserves': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      }
    };

    // Return specific test parameter if available
    if (testParams[palletName] && testParams[palletName][storageName]) {
      return testParams[palletName][storageName];
    }

    // Generic fallbacks
    if (storageName.toLowerCase().includes('account')) {
      return '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
    }
    if (storageName.toLowerCase().includes('block') || storageName.toLowerCase().includes('era')) {
      return 0;
    }

    return null;
  }

  async testStorageItem(client, typedApi, palletName, storageItem) {
    const queryId = `polkadot.${palletName}.${storageItem.name}`;
    console.log(`🧪 Testing ${queryId} (params: ${storageItem.requiresParams}, type: ${storageItem.storageType})`);

    try {
      if (!typedApi.query || !typedApi.query[palletName] || !typedApi.query[palletName][storageItem.name]) {
        throw new Error(`Storage item ${palletName}.${storageItem.name} not found in typed API`);
      }

      const storage = typedApi.query[palletName][storageItem.name];
      let result;

      if (storageItem.requiresParams) {
        const testParam = this.getTestParameter(palletName, storageItem.name);
        if (!testParam) {
          throw new Error(`No test parameter available for ${palletName}.${storageItem.name}`);
        }
        result = await Promise.race([
          storage.getValue(testParam),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);
      } else {
        result = await Promise.race([
          storage.getValue(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);
      }

      console.log(`✅ ${queryId} succeeded: ${typeof result} ${result?.toString?.() || 'no_data'}`);
      return { queryId, success: true, result: typeof result };

    } catch (error) {
      console.log(`❌ ${queryId} failed: ${error.message}`);
      return { queryId, success: false, error: error.message };
    }
  }

  async runTest() {
    console.log('🔍 Quick Storage Integration Test\n');

    // Step 1: Parse storage structure
    console.log('📋 Step 1: Parsing storage structure...');
    const discovery = this.parseStorageFromDescriptor('polkadot');

    if (!discovery) {
      console.log('❌ Failed to parse storage structure');
      return;
    }

    console.log(`✅ Discovered ${discovery.totalPallets} pallets with ${discovery.totalStorageItems} storage items\n`);

    // Step 2: Connect to chain
    console.log('📋 Step 2: Connecting to Polkadot...');
    const wsProvider = getWsProvider('wss://rpc.polkadot.io');
    const client = createClient(wsProvider);

    try {
      const { polkadot } = require('../.papi/descriptors/dist');
      const typedApi = client.getTypedApi(polkadot);
      console.log('✅ Connected to Polkadot\n');

      // Step 3: Test storage queries
      console.log('📋 Step 3: Testing storage queries...');

      for (const [palletName, palletData] of Object.entries(discovery.pallets)) {
        console.log(`\n📦 Testing ${palletName} pallet:`);

        for (const [storageName, storageItem] of Object.entries(palletData.storageItems)) {
          const result = await this.testStorageItem(client, typedApi, palletName, storageItem);
          this.results.push(result);

          // Small delay to avoid overwhelming
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Step 4: Summary
      const successful = this.results.filter(r => r.success).length;
      const failed = this.results.filter(r => !r.success).length;

      console.log('\n📊 Integration Test Results:');
      console.log('============================');
      console.log(`✅ Successful: ${successful}/${this.results.length}`);
      console.log(`❌ Failed: ${failed}/${this.results.length}`);

      if (failed > 0) {
        console.log('\n❌ Failures:');
        this.results.filter(r => !r.success).forEach(r => {
          console.log(`   ${r.queryId}: ${r.error}`);
        });
      }

    } catch (error) {
      console.error('❌ Test failed:', error.message);
    } finally {
      console.log('\n🧹 Cleaning up...');
      client.destroy();
    }
  }
}

if (require.main === module) {
  const tester = new QuickStorageTester();
  tester.runTest();
}