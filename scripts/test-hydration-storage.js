#!/usr/bin/env node

/**
 * Hydration Storage Query Testing Script
 * Focused testing for Hydration chain storage queries
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');

// Configuration
const CONFIG = {
  timeout: 20000, // 20 seconds per query
  reportPath: './hydration-storage-report.json',
  wsUrl: 'wss://hydration-rpc.n.dwellir.com'
};

class HydrationStorageTester {
  constructor() {
    this.results = {
      summary: {
        totalPallets: 0,
        totalStorageItems: 0,
        totalQueries: 0,
        successfulQueries: 0,
        failedQueries: 0,
        startTime: new Date().toISOString(),
        endTime: null
      },
      pallets: {},
      failures: [],
      successes: []
    };
    this.client = null;
  }

  parseHydrationStorage() {
    console.log('🔍 Parsing Hydration storage structure...');

    const descriptorPath = path.resolve('./.papi/descriptors/dist/hydration.d.ts');

    if (!fs.existsSync(descriptorPath)) {
      console.log(`❌ Hydration descriptor file not found: ${descriptorPath}`);
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

    // Extract all pallets for comprehensive testing
    const palletMatches = storageContent.match(/^\s+(\w+):\s*\{/gm);

    if (!palletMatches) {
      console.log('❌ No pallets found in IStorage');
      return null;
    }

    let totalItems = 0;
    for (const match of palletMatches) {
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
        for (const storageMatch of storageMatches) {
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

    console.log(`✅ Discovered ${Object.keys(pallets).length} pallets with ${totalItems} storage items`);

    this.results.summary.totalPallets = Object.keys(pallets).length;
    this.results.summary.totalStorageItems = totalItems;

    return pallets;
  }

  getTestParameter(palletName, storageName) {
    // Use standard Substrate address format (works on Hydration)
    const testAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

    // Hydration-specific test parameters
    const testParams = {
      'System': {
        'Account': testAddress,
        'BlockHash': 0,
        'ExtrinsicData': 0,
        'EventTopics': '0x0000000000000000000000000000000000000000000000000000000000000000'
      },
      'Balances': {
        'Account': testAddress,
        'Locks': testAddress,
        'Reserves': testAddress,
        'Holds': testAddress,
        'Freezes': testAddress
      },
      'Assets': {
        'Asset': 0, // Asset ID
        'Account': [0, testAddress], // [AssetId, AccountId]
        'Metadata': 0,
        'Approvals': [0, testAddress, testAddress] // [AssetId, Owner, Delegate]
      },
      'Tokens': {
        'Accounts': [testAddress, 0], // [AccountId, CurrencyId]
        'Locks': [testAddress, 0], // [AccountId, CurrencyId]
        'TotalIssuance': 0, // CurrencyId
        'Reserves': [testAddress, 0] // [AccountId, CurrencyId]
      },
      'AssetRegistry': {
        'Assets': 0, // AssetId
        'AssetMetadataMap': 0,
        'LocationToAsset': null // Complex type, skip for now
      },
      'Omnipool': {
        'Assets': 0, // AssetId
        'Positions': testAddress,
        'AssetTradability': 0
      },
      'Staking': {
        'Staking': testAddress,
        'Positions': 0,
        'Votes': testAddress,
        'VotesRewarded': testAddress
      },
      'LBP': {
        'PoolData': 0,
        'Pools': testAddress
      },
      'MultiTransactionPayment': {
        'AccountCurrencyMap': testAddress,
        'AcceptedCurrencies': 0
      },
      'Duster': {
        'AccountBlacklist': testAddress,
        'RewardAccount': null,
        'DustAccount': null
      },
      'Democracy': {
        'DepositOf': 0, // ReferendumIndex
        'VotingOf': testAddress,
        'ReferendumInfoOf': 0
      },
      'Elections': {
        'Members': null,
        'RunnersUp': null,
        'Candidates': null,
        'Voting': testAddress
      },
      'Tips': {
        'Tips': '0x0000000000000000000000000000000000000000000000000000000000000000', // Hash
        'Reasons': '0x0000000000000000000000000000000000000000000000000000000000000000'
      },
      'Proxy': {
        'Proxies': testAddress,
        'Announcements': testAddress
      },
      'Multisig': {
        'Multisigs': [testAddress, '0x0000000000000000000000000000000000000000000000000000000000000000'] // [AccountId, CallHash]
      },
      'Uniques': {
        'Class': 0, // ClassId
        'Asset': [0, 0], // [ClassId, InstanceId]
        'ClassAccount': [0, testAddress], // [ClassId, AccountId]
        'Account': [testAddress, 0, 0] // [AccountId, ClassId, InstanceId]
      },
      'Identity': {
        'IdentityOf': testAddress,
        'SuperOf': testAddress,
        'SubsOf': testAddress,
        'Registrars': null
      },
      'Vesting': {
        'Vesting': testAddress
      },
      'Scheduler': {
        'Agenda': 0, // BlockNumber
        'Lookup': '0x0000000000000000000000000000000000000000000000000000000000000000' // Hash
      },
      'Preimage': {
        'StatusFor': '0x0000000000000000000000000000000000000000000000000000000000000000', // Hash
        'PreimageFor': '0x0000000000000000000000000000000000000000000000000000000000000000'
      },
      'Treasury': {
        'Proposals': 0, // ProposalIndex
        'Approvals': null
      },
      'CollatorSelection': {
        'LastAuthoredBlock': testAddress
      },
      'Session': {
        'NextKeys': testAddress,
        'KeyOwner': [0, '0x00'] // [KeyTypeId, Key]
      },
      'Aura': {
        'Authorities': null,
        'CurrentSlot': null
      },
      'AuraExt': {
        'Authorities': null
      }
    };

    // Return specific test parameter if available
    if (testParams[palletName] && testParams[palletName][storageName]) {
      return testParams[palletName][storageName];
    }

    // Generic fallbacks based on common patterns
    if (storageName.toLowerCase().includes('account')) {
      return testAddress;
    }
    if (storageName.toLowerCase().includes('asset') || storageName.toLowerCase().includes('token') || storageName.toLowerCase().includes('currency')) {
      return 0; // Asset/Token/Currency ID
    }
    if (storageName.toLowerCase().includes('pool')) {
      return 0; // Pool ID
    }
    if (storageName.toLowerCase().includes('block') || storageName.toLowerCase().includes('era') || storageName.toLowerCase().includes('index')) {
      return 0;
    }
    if (storageName.toLowerCase().includes('hash')) {
      return '0x0000000000000000000000000000000000000000000000000000000000000000';
    }
    if (storageName.toLowerCase().includes('class') || storageName.toLowerCase().includes('collection')) {
      return 0; // Class/Collection ID
    }

    // Return null if no suitable parameter found
    return null;
  }

  async connectToHydration() {
    console.log('🔌 Connecting to Hydration...');

    try {
      const wsProvider = getWsProvider(CONFIG.wsUrl);
      this.client = createClient(wsProvider);

      // Load Hydration descriptor
      const { hydration } = require(path.resolve('./.papi/descriptors/dist'));
      this.typedApi = this.client.getTypedApi(hydration);

      console.log('✅ Connected to Hydration successfully');
      return true;

    } catch (error) {
      console.log(`❌ Failed to connect to Hydration: ${error.message}`);
      throw error;
    }
  }

  async testStorageQuery(palletName, storageItem) {
    const queryId = `hydration.${palletName}.${storageItem.name}`;
    this.results.summary.totalQueries++;

    try {
      if (!this.typedApi.query || !this.typedApi.query[palletName] || !this.typedApi.query[palletName][storageItem.name]) {
        throw new Error(`Storage item ${palletName}.${storageItem.name} not found in typed API`);
      }

      console.log(`🧪 Testing ${queryId} (${storageItem.storageType}, params: ${storageItem.requiresParams})`);

      const storage = this.typedApi.query[palletName][storageItem.name];
      let result;

      if (storageItem.requiresParams) {
        const testParam = this.getTestParameter(palletName, storageItem.name);
        if (!testParam) {
          throw new Error(`No test parameter available for ${palletName}.${storageItem.name}`);
        }

        console.log(`   Using parameter: ${JSON.stringify(testParam)}`);
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
      console.log(`✅ ${queryId} succeeded: ${typeof result} ${result !== undefined && result !== null ? '(has data)' : '(no data)'}`);

      const success = {
        queryId,
        pallet: palletName,
        storage: storageItem.name,
        result: {
          type: typeof result,
          hasValue: result !== undefined && result !== null,
          sample: this.getSample(result)
        },
        storageInfo: {
          requiresParams: storageItem.requiresParams,
          type: storageItem.storageType
        },
        timestamp: new Date().toISOString()
      };

      this.results.successes.push(success);
      return { ...success, success: true };

    } catch (error) {
      this.results.summary.failedQueries++;
      console.log(`❌ ${queryId} failed: ${error.message}`);

      const failure = {
        queryId,
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

  getSample(result) {
    if (result === null || result === undefined) return null;

    const type = typeof result;
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return result;
    }
    if (type === 'bigint') {
      return result.toString();
    }
    if (type === 'object') {
      if (Array.isArray(result)) {
        return `Array(${result.length})`;
      }
      try {
        // Try to safely serialize the object, handling BigInt values
        const jsonString = JSON.stringify(result, (key, value) => {
          return typeof value === 'bigint' ? value.toString() + 'n' : value;
        });
        return jsonString.length > 100 ? `Object(${Object.keys(result).length} keys)` : jsonString;
      } catch (error) {
        return `Object(${Object.keys(result).length} keys)`;
      }
    }
    return type;
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
    console.log('🔍 Hydration Storage Query Testing\n');

    try {
      // Step 1: Parse storage structure
      console.log('📋 Step 1: Parsing storage structure...');
      const pallets = this.parseHydrationStorage();

      if (!pallets) {
        console.log('❌ Failed to parse storage structure');
        return;
      }

      // Step 2: Connect to Hydration
      console.log('\n📋 Step 2: Connecting to chain...');
      await this.connectToHydration();

      // Step 3: Test storage queries
      console.log('\n📋 Step 3: Testing storage queries...\n');

      for (const [palletName, palletData] of Object.entries(pallets)) {
        console.log(`\n📦 Testing ${palletName} pallet (${palletData.totalItems} items):`);

        this.results.pallets[palletName] = {
          totalItems: palletData.totalItems,
          successfulQueries: 0,
          failedQueries: 0,
          results: []
        };

        for (const [storageName, storageItem] of Object.entries(palletData.storageItems)) {
          const result = await this.testStorageQuery(palletName, storageItem);
          this.results.pallets[palletName].results.push(result);

          if (result.success) {
            this.results.pallets[palletName].successfulQueries++;
          } else {
            this.results.pallets[palletName].failedQueries++;
          }

          // Small delay to avoid overwhelming the RPC
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log(`   📊 ${palletName}: ${this.results.pallets[palletName].successfulQueries}/${palletData.totalItems} successful`);
      }

      // Step 4: Generate report
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
    console.log('\n📊 Hydration Storage Test Results:');
    console.log('===================================');
    console.log(`📦 Total Pallets: ${this.results.summary.totalPallets}`);
    console.log(`🗄️  Total Storage Items: ${this.results.summary.totalStorageItems}`);
    console.log(`🧪 Total Queries: ${this.results.summary.totalQueries}`);
    console.log(`✅ Successful: ${this.results.summary.successfulQueries}`);
    console.log(`❌ Failed: ${this.results.summary.failedQueries}`);

    const successRate = ((this.results.summary.successfulQueries / this.results.summary.totalQueries) * 100).toFixed(1);
    console.log(`📈 Success Rate: ${successRate}%`);

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
        console.log(`\n   ${type.toUpperCase()}: ${failures.length} failures`);
        failures.slice(0, 5).forEach(f => {
          console.log(`     - ${f.queryId}`);
          if (f.storageInfo.requiresParams) {
            console.log(`       (needs parameter for ${f.storageInfo.type} storage)`);
          }
        });
        if (failures.length > 5) {
          console.log(`     ... and ${failures.length - 5} more`);
        }
      }

      console.log('\n💡 Recommendations:');
      if (failuresByType.parameter_error) {
        console.log('   • Add more Hydration-specific test parameters');
      }
      if (failuresByType.timeout) {
        console.log('   • Hydration RPC endpoint may be slow - consider alternative endpoints');
      }
      if (failuresByType.runtime_entry_not_found) {
        console.log('   • Some storage items may not exist in current Hydration runtime');
      }
      if (failuresByType.not_found) {
        console.log('   • Some pallets/storage may not be available on Hydration');
      }
    }

    if (this.results.summary.successfulQueries > 0) {
      console.log('\n✅ Working Storage Items:');

      // Group successes by pallet
      const successesByPallet = {};
      this.results.successes.forEach(success => {
        if (!successesByPallet[success.pallet]) successesByPallet[success.pallet] = [];
        successesByPallet[success.pallet].push(success);
      });

      for (const [pallet, successes] of Object.entries(successesByPallet)) {
        console.log(`\n   ${pallet.toUpperCase()}: ${successes.length} working`);
        successes.slice(0, 5).forEach(s => {
          console.log(`     ✅ ${s.storage} (${s.result.type}) ${s.result.hasValue ? '→ has data' : '→ no data'}`);
        });
        if (successes.length > 5) {
          console.log(`     ... and ${successes.length - 5} more`);
        }
      }
    }

    // Save detailed report
    fs.writeFileSync(CONFIG.reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${CONFIG.reportPath}`);
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up connection...');
    if (this.client) {
      try {
        this.client.destroy();
        console.log('✅ Connection cleaned up');
      } catch (error) {
        console.log(`⚠️ Error during cleanup: ${error.message}`);
      }
    }
  }
}

// Run the test
if (require.main === module) {
  const tester = new HydrationStorageTester();

  process.on('SIGINT', async () => {
    console.log('\n🛑 Interrupted, cleaning up...');
    await tester.cleanup();
    process.exit(0);
  });

  tester.runTest()
    .then(() => {
      console.log('\n✅ Hydration storage testing completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Hydration storage testing failed:', error.message);
      process.exit(1);
    });
}