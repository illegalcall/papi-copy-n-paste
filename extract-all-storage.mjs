#!/usr/bin/env node

/**
 * Extract all storage items from Hydration descriptor file and analyze their parameter requirements
 */

import fs from 'fs';

console.log('🔍 Extracting ALL storage items from Hydration descriptor...\n');

try {
  const descriptorPath = '.papi/descriptors/dist/hydration.d.ts';
  const content = fs.readFileSync(descriptorPath, 'utf8');

  // Extract all StorageDescriptor entries with context
  const storagePattern = /([A-Za-z0-9_]+):\s*StorageDescriptor<([^>]+)>/g;
  const palletPattern = /^\s*([A-Za-z0-9_]+):\s*\{/gm;

  let currentPallet = '';
  const palletStorages = new Map();

  // First pass: identify pallet boundaries
  const lines = content.split('\n');
  let inPalletSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a pallet definition
    const palletMatch = line.match(/^\s*([A-Za-z0-9_]+):\s*\{/);
    if (palletMatch) {
      currentPallet = palletMatch[1];
      // Skip if this looks like it's in an API or event section
      if (!['System', 'Timestamp', 'Balances', 'TransactionPayment', 'MultiTransactionPayment', 'Treasury', 'Preimage', 'Identity', 'Democracy', 'TechnicalCommittee', 'Proxy', 'Multisig', 'Uniques', 'StateTrieMigration', 'ConvictionVoting', 'Referenda', 'Whitelist', 'Dispatcher', 'AssetRegistry', 'Claims', 'GenesisHistory', 'CollatorRewards', 'Omnipool', 'TransactionPause', 'Duster', 'OmnipoolWarehouseLM', 'OmnipoolLiquidityMining', 'OTC', 'CircuitBreaker', 'Router', 'DynamicFees', 'Staking', 'Stableswap', 'Bonds', 'LBP', 'XYK', 'Referrals', 'Liquidation', 'HSM', 'Parameters', 'Tokens', 'Vesting', 'EVM', 'EVMChainId', 'Ethereum', 'EVMAccounts', 'DynamicEvmFee', 'XYKWarehouseLM', 'DCA', 'Scheduler', 'ParachainSystem', 'ParachainInfo', 'PolkadotXcm', 'XcmpQueue', 'MessageQueue', 'UnknownTokens', 'Authorship', 'CollatorSelection', 'Session', 'Aura', 'AuraExt', 'EmaOracle', 'Broadcast', 'Utility', 'OtcSettlements', 'XYKLiquidityMining', 'RelayChainInfo', 'CumulusXcm', 'OrmlXcm', 'XTokens', 'Currencies'].includes(currentPallet)) {
        continue;
      }
      if (!palletStorages.has(currentPallet)) {
        palletStorages.set(currentPallet, []);
      }
    }

    // Check if this line contains a StorageDescriptor
    const storageMatch = line.match(/^\s*([A-Za-z0-9_]+):\s*StorageDescriptor<([^>]+)>/);
    if (storageMatch && currentPallet) {
      const storageName = storageMatch[1];
      const storageParams = storageMatch[2];

      // Analyze the parameter structure
      let paramTypes = [];

      if (storageParams.includes('[Key: SS58String]')) {
        paramTypes.push('SS58String');
      } else if (storageParams.includes('[Key: number]') || storageParams.includes('[Key: bigint]')) {
        paramTypes.push('u32');
      } else if (storageParams.includes('[Key: FixedSizeBinary<32>]')) {
        paramTypes.push('Hash');
      } else if (storageParams.includes('[Key: Binary]')) {
        paramTypes.push('Binary');
      } else if (storageParams.includes('Anonymize<')) {
        // Complex key structure - try to infer
        if (storageParams.includes('SS58String') && storageParams.includes('number')) {
          paramTypes = ['SS58String', 'u32'];
        } else if (storageParams.includes('SS58String')) {
          paramTypes = ['SS58String'];
        } else if (storageParams.includes('number')) {
          paramTypes = ['u32'];
        } else {
          paramTypes = ['u32', 'u32']; // Common complex case
        }
      } else if (storageParams.startsWith('[]')) {
        paramTypes = []; // No parameters
      } else {
        // Try to infer from parameter structure
        if (storageParams.includes('SS58String')) {
          paramTypes.push('SS58String');
        }
        if (storageParams.includes('number') && !paramTypes.includes('u32')) {
          paramTypes.push('u32');
        }
      }

      const storages = palletStorages.get(currentPallet) || [];
      storages.push({ name: storageName, params: paramTypes, raw: storageParams });
      palletStorages.set(currentPallet, storages);
    }
  }

  // Output results organized by pallet
  console.log('📊 Storage items by pallet:\n');

  const sortedPallets = Array.from(palletStorages.keys()).sort();
  let totalStorageItems = 0;

  for (const pallet of sortedPallets) {
    const storages = palletStorages.get(pallet);
    console.log(`\n🏗️  ${pallet} (${storages.length} items):`);

    for (const storage of storages) {
      const paramText = storage.params.length > 0
        ? `[${storage.params.join(', ')}]`
        : '[]';
      console.log(`   • ${storage.name}: ${paramText}`);
      totalStorageItems++;
    }
  }

  console.log(`\n📈 Total: ${totalStorageItems} storage items across ${sortedPallets.length} pallets`);

  // Generate pattern code
  console.log('\n📝 Generating pattern code...\n');

  let patternCode = '';
  for (const pallet of sortedPallets) {
    const storages = palletStorages.get(pallet);

    // Group storages by parameter pattern
    const paramGroups = new Map();
    for (const storage of storages) {
      const key = JSON.stringify(storage.params);
      if (!paramGroups.has(key)) {
        paramGroups.set(key, []);
      }
      paramGroups.get(key).push(storage.name);
    }

    if (paramGroups.size > 0) {
      patternCode += `      ...(pallet === '${pallet}' ? [\n`;

      for (const [paramKey, names] of paramGroups) {
        const params = JSON.parse(paramKey);
        const namePattern = names.length === 1
          ? `^${names[0]}$`
          : `^(${names.join('|')})$`;

        patternCode += `        { pattern: /${namePattern}/, params: ${JSON.stringify(params)} },\n`;
      }

      patternCode += `      ] : []),\n`;
    }
  }

  console.log('Generated pattern code:');
  console.log(patternCode);

  // Save the results to a file
  fs.writeFileSync('storage-analysis.json', JSON.stringify(Object.fromEntries(palletStorages), null, 2));
  console.log('\n💾 Detailed analysis saved to storage-analysis.json');

} catch (error) {
  console.error('❌ Error:', error.message);
}