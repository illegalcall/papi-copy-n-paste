#!/usr/bin/env node

/**
 * Parse Storage Structure from TypeScript Descriptor
 * Extracts all pallet and storage item information from descriptor files
 */

const fs = require('fs');
const path = require('path');

function parseStorageFromDescriptor(chainKey) {
  console.log(`🔍 Parsing storage structure for ${chainKey}...`);

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

  // For each pallet, extract its storage items
  for (const match of palletMatches) {
    const palletName = match.match(/^\s+(\w+):/)[1];
    console.log(`\n📦 Processing pallet: ${palletName}`);

    // Find the pallet's content block
    const palletRegex = new RegExp(`^\\s+${palletName}:\\s*\\{([\\s\\S]*?)^\\s+\\};`, 'm');
    const palletMatch = storageContent.match(palletRegex);

    if (!palletMatch) {
      console.log(`   ⚠️ Could not extract content for pallet ${palletName}`);
      continue;
    }

    const palletContent = palletMatch[1];
    const storageItems = {};

    // Extract storage items from the pallet content
    const storageMatches = palletContent.match(/^\s+(\w+):\s*StorageDescriptor</gm);

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

        console.log(`   ✅ ${storageName} (${storageType}, params: ${requiresParams})`);
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

  const result = {
    chainKey,
    pallets,
    totalPallets: Object.keys(pallets).length,
    totalStorageItems: Object.values(pallets).reduce((sum, pallet) => sum + pallet.totalItems, 0)
  };

  console.log(`\n📊 Summary for ${chainKey}:`);
  console.log(`   - Pallets: ${result.totalPallets}`);
  console.log(`   - Storage Items: ${result.totalStorageItems}`);

  return result;
}

// Test with polkadot
if (require.main === module) {
  const result = parseStorageFromDescriptor('polkadot');
  if (result) {
    console.log('\n📄 Full result:');
    console.log(JSON.stringify(result, null, 2));
  }
}