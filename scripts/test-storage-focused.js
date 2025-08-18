#!/usr/bin/env node

/**
 * Focused Storage Query Testing Script
 * Tests a limited set of storage queries to quickly identify failures and patterns
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');

// Configuration
const CONFIG = {
  timeout: 15000, // 15 seconds per query
  reportPath: './storage-query-focused-report.json',
};

// Limited chain configurations for focused testing
const CHAIN_CONFIGS = {
  polkadot: {
    wsUrl: "wss://rpc.polkadot.io"
  },
  kusama: {
    wsUrl: "wss://kusama.api.onfinality.io/public-ws"
  },
  hydration: {
    wsUrl: "wss://hydration-rpc.n.dwellir.com"
  }
};

class FocusedStorageTester {
  constructor() {
    this.results = {
      summary: {
        totalChains: 0,
        totalPallets: 0,
        totalStorageItems: 0,
        totalQueries: 0,
        successfulQueries: 0,
        failedQueries: 0,
        startTime: new Date().toISOString(),
        endTime: null
      },
      chains: {},
      failures: [],
      errors: []
    };
    this.connections = new Map();
  }

  parseStorageFromDescriptor(chainKey) {
    const descriptorPath = path.resolve(`./.papi/descriptors/dist/${chainKey}.d.ts`);

    if (!fs.existsSync(descriptorPath)) {
      console.log(`❌ Descriptor file not found: ${descriptorPath}`);
      return null;
    }

    const content = fs.readFileSync(descriptorPath, 'utf-8');
    const storageTypeMatch = content.match(/type IStorage = \{([\s\S]*?)\n\};/);

    if (!storageTypeMatch) {
      console.log('❌ IStorage type definition not found');
      return null;
    }

    const storageContent = storageTypeMatch[1];
    const pallets = {};

    // Extract pallets - focus on common ones
    const commonPallets = ['System', 'Balances', 'Staking', 'Timestamp'];
    const palletMatches = storageContent.match(/^\s+(\w+):\s*\{/gm);

    if (!palletMatches) {
      console.log('❌ No pallets found in IStorage');
      return null;
    }

    let totalItems = 0;
    for (const match of palletMatches) {
      const palletName = match.match(/^\s+(\w+):/)[1];

      // Only process common pallets for focused testing
      if (!commonPallets.includes(palletName)) continue;

      const palletRegex = new RegExp(`^\\s+${palletName}:\\s*\\{([\\s\\S]*?)^\\s+\\};`, 'm');
      const palletMatch = storageContent.match(palletRegex);

      if (!palletMatch) continue;

      const palletContent = palletMatch[1];
      const storageItems = {};

      // Extract storage items from the pallet content
      const storageMatches = palletContent.match(/^\s+(\w+):\s*StorageDescriptor/gm);

      if (storageMatches) {
        // Limit to first 5 storage items per pallet for focused testing
        for (const storageMatch of storageMatches.slice(0, 5)) {
          const storageName = storageMatch.match(/^\s+(\w+):/)[1];

          const storageRegex = new RegExp(`^\\s+${storageName}:\\s*StorageDescriptor<([^>]*)>`, 'm');
          const storageDefMatch = palletContent.match(storageRegex);

          let requiresParams = false;
          let storageType = 'unknown';

          if (storageDefMatch) {
            const descriptorParams = storageDefMatch[1];
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
        'Reserves': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Holds': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Freezes': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      },
      'Staking': {
        'Bonded': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Ledger': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Payee': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Validators': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        'Nominators': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      }
    };

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

  async createConnection(chainKey) {
    if (this.connections.has(chainKey)) {
      return this.connections.get(chainKey);
    }

    const config = CHAIN_CONFIGS[chainKey];
    if (!config) {
      throw new Error(`No configuration found for chain: ${chainKey}`);
    }

    console.log(`🔌 Creating connection to ${chainKey}...`);

    try {
      const wsProvider = getWsProvider(config.wsUrl);
      const client = createClient(wsProvider);

      this.connections.set(chainKey, client);
      console.log(`✅ Connected to ${chainKey}`);
      return client;

    } catch (error) {
      console.log(`❌ Failed to connect to ${chainKey}: ${error.message}`);
      throw error;
    }
  }

  async testStorageQuery(chainKey, palletName, storageItem) {
    const queryId = `${chainKey}.${palletName}.${storageItem.name}`;
    this.results.summary.totalQueries++;

    try {
      const client = await this.createConnection(chainKey);
      const descriptor = require(path.resolve('./.papi/descriptors/dist'))[chainKey];

      if (!descriptor) {
        throw new Error(`No descriptor available for ${chainKey}`);
      }

      const typedApi = client.getTypedApi(descriptor);

      if (!typedApi.query || !typedApi.query[palletName] || !typedApi.query[palletName][storageItem.name]) {
        throw new Error(`Storage item ${palletName}.${storageItem.name} not found in typed API`);
      }

      console.log(`🧪 Testing ${queryId} (params: ${storageItem.requiresParams})`);

      const storage = typedApi.query[palletName][storageItem.name];
      let result;

      if (storageItem.requiresParams) {
        const testParam = this.getTestParameter(palletName, storageItem.name);
        if (!testParam) {
          throw new Error(`No test parameter available for ${palletName}.${storageItem.name}`);
        }
        result = await Promise.race([
          storage.getValue(testParam),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), CONFIG.timeout))
        ]);
      } else {
        result = await Promise.race([
          storage.getValue(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), CONFIG.timeout))
        ]);
      }

      this.results.summary.successfulQueries++;
      console.log(`✅ ${queryId} succeeded: ${typeof result}`);

      return {
        queryId,
        success: true,
        result: {
          type: typeof result,
          hasValue: result !== undefined && result !== null
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.results.summary.failedQueries++;
      console.log(`❌ ${queryId} failed: ${error.message}`);

      const failure = {
        queryId,
        chain: chainKey,
        pallet: palletName,
        storage: storageItem.name,
        error: error.message,
        errorType: this.categorizeError(error.message),
        storageInfo: {
          requiresParams: storageItem.requiresParams,
          type: storageItem.storageType
        },
        timestamp: new Date().toISOString()
      };

      this.results.failures.push(failure);
      return { ...failure, success: false };
    }
  }

  categorizeError(errorMessage) {
    const message = errorMessage.toLowerCase();

    if (message.includes('timeout')) return 'timeout';
    if (message.includes('connection')) return 'connection';
    if (message.includes('not found')) return 'not_found';
    if (message.includes('parameter')) return 'parameter_error';
    if (message.includes('rpc')) return 'rpc_error';
    if (message.includes('decode')) return 'decode_error';
    if (message.includes('runtime entry')) return 'runtime_entry_not_found';

    return 'unknown';
  }

  async runTest() {
    console.log('🔍 Focused Storage Query Testing\n');

    try {
      // Step 1: Discover storage structure for each chain
      console.log('📋 Step 1: Discovering storage structures...');
      const discoveries = {};

      for (const chainKey of Object.keys(CHAIN_CONFIGS)) {
        console.log(`\n🔍 Discovering storage for ${chainKey}...`);
        const discovery = this.parseStorageFromDescriptor(chainKey);

        if (discovery) {
          discoveries[chainKey] = discovery;
          this.results.summary.totalChains++;
          this.results.summary.totalPallets += discovery.totalPallets;
          this.results.summary.totalStorageItems += discovery.totalStorageItems;

          console.log(`✅ ${chainKey}: ${discovery.totalPallets} pallets, ${discovery.totalStorageItems} storage items`);
        } else {
          console.log(`❌ No storage discovered for ${chainKey}`);
        }
      }

      console.log(`\n📊 Total Discovery: ${this.results.summary.totalChains} chains, ${this.results.summary.totalPallets} pallets, ${this.results.summary.totalStorageItems} storage items\n`);

      // Step 2: Test storage queries
      console.log('📋 Step 2: Testing storage queries...');

      for (const [chainKey, chainData] of Object.entries(discoveries)) {
        console.log(`\n🔗 Testing ${chainKey}...`);

        this.results.chains[chainKey] = {
          totalPallets: chainData.totalPallets,
          totalStorageItems: chainData.totalStorageItems,
          successfulQueries: 0,
          failedQueries: 0,
          results: []
        };

        for (const [palletName, palletData] of Object.entries(chainData.pallets)) {
          for (const [storageName, storageItem] of Object.entries(palletData.storageItems)) {
            const result = await this.testStorageQuery(chainKey, palletName, storageItem);
            this.results.chains[chainKey].results.push(result);

            if (result.success) {
              this.results.chains[chainKey].successfulQueries++;
            } else {
              this.results.chains[chainKey].failedQueries++;
            }

            // Small delay to avoid overwhelming the network
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
      }

      // Step 3: Generate report
      this.results.summary.endTime = new Date().toISOString();
      await this.generateReport();

    } catch (error) {
      console.error('💥 Test execution failed:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  async generateReport() {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`📊 Total Chains: ${this.results.summary.totalChains}`);
    console.log(`📦 Total Pallets: ${this.results.summary.totalPallets}`);
    console.log(`🗄️  Total Storage Items: ${this.results.summary.totalStorageItems}`);
    console.log(`🧪 Total Queries: ${this.results.summary.totalQueries}`);
    console.log(`✅ Successful: ${this.results.summary.successfulQueries}`);
    console.log(`❌ Failed: ${this.results.summary.failedQueries}`);

    if (this.results.summary.failedQueries > 0) {
      console.log('\n❌ Failure Analysis:');

      // Group failures by error type
      const failuresByType = {};
      this.results.failures.forEach(failure => {
        const type = failure.errorType;
        if (!failuresByType[type]) failuresByType[type] = [];
        failuresByType[type].push(failure);
      });

      for (const [type, failures] of Object.entries(failuresByType)) {
        console.log(`   ${type}: ${failures.length} failures`);
        failures.slice(0, 3).forEach(f => {
          console.log(`     - ${f.queryId}: ${f.error}`);
        });
        if (failures.length > 3) {
          console.log(`     ... and ${failures.length - 3} more`);
        }
      }

      console.log('\n💡 Recommendations:');
      if (failuresByType.parameter_error) {
        console.log('   • Add more test parameters for parameterized storage items');
      }
      if (failuresByType.runtime_entry_not_found) {
        console.log('   • Some storage items may not exist in current runtime versions');
      }
      if (failuresByType.timeout) {
        console.log('   • Consider increasing timeout for slow RPC responses');
      }
      if (failuresByType.connection) {
        console.log('   • Check network connectivity and RPC endpoint health');
      }
    }

    // Save detailed report
    fs.writeFileSync(CONFIG.reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${CONFIG.reportPath}`);
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up connections...');
    for (const [chainKey, client] of this.connections.entries()) {
      try {
        client.destroy();
        console.log(`✅ Cleaned up ${chainKey}`);
      } catch (error) {
        console.log(`⚠️ Error cleaning up ${chainKey}: ${error.message}`);
      }
    }
    this.connections.clear();
  }
}

// Run the test
if (require.main === module) {
  const tester = new FocusedStorageTester();

  process.on('SIGINT', async () => {
    console.log('\n🛑 Interrupted, cleaning up...');
    await tester.cleanup();
    process.exit(0);
  });

  tester.runTest()
    .then(() => {
      console.log('\n✅ Focused storage testing completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Focused storage testing failed:', error.message);
      process.exit(1);
    });
}