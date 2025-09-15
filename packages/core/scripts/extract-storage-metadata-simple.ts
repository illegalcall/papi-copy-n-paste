#!/usr/bin/env tsx

/**
 * Simplified storage metadata extractor using regex parsing
 * Extracts StorageDescriptor parameter information directly from descriptor files
 */

import * as fs from 'fs';
import * as path from 'path';

interface StorageMetadata {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

interface ChainStorageMetadata {
  pallets: {
    [pallet: string]: {
      [storage: string]: StorageMetadata;
    };
  };
}

interface AllChainsMetadata {
  [chainKey: string]: ChainStorageMetadata;
}

class SimpleStorageExtractor {

  /**
   * Extract storage metadata for all chains
   */
  extractAllMetadata(): AllChainsMetadata {
    const result: AllChainsMetadata = {};

    // Get all actual chain descriptor files (not metadata files)
    const descriptorPath = path.resolve(process.cwd(), '.papi/descriptors/dist');
    const chainFiles = fs.readdirSync(descriptorPath)
      .filter(file =>
        file.endsWith('.d.ts') &&
        !file.includes('_metadata') &&
        !file.includes('common') &&
        !file.includes('metadataTypes') &&
        !file.includes('descriptors') &&
        file !== 'index.d.ts'
      )
      .map(file => file.replace('.d.ts', ''));

    console.log(`Found chain files: ${chainFiles.join(', ')}`);

    for (const chainKey of chainFiles) {
      console.log(`🔍 Extracting metadata for ${chainKey}...`);
      try {
        result[chainKey] = this.extractChainMetadata(chainKey);
        const totalStorage = Object.values(result[chainKey].pallets).reduce(
          (sum, pallet) => sum + Object.keys(pallet).length, 0
        );
        console.log(`✅ Extracted ${Object.keys(result[chainKey].pallets).length} pallets, ${totalStorage} storage items for ${chainKey}`);
      } catch (error) {
        console.warn(`⚠️  Failed to extract metadata for ${chainKey}:`, error);
        result[chainKey] = { pallets: {} };
      }
    }

    return result;
  }

  /**
   * Extract storage metadata for a specific chain using regex parsing
   */
  private extractChainMetadata(chainKey: string): ChainStorageMetadata {
    const descriptorFile = path.resolve(process.cwd(), '.papi/descriptors/dist', `${chainKey}.d.ts`);

    if (!fs.existsSync(descriptorFile)) {
      throw new Error(`Descriptor file not found: ${descriptorFile}`);
    }

    const fileContent = fs.readFileSync(descriptorFile, 'utf-8');
    const metadata: ChainStorageMetadata = { pallets: {} };

    // Find the IStorage type definition
    const storageTypeMatch = fileContent.match(/type IStorage = \{([\s\S]*?)\};/);
    if (!storageTypeMatch) {
      console.warn(`No IStorage type found in ${chainKey}`);
      return metadata;
    }

    const storageContent = storageTypeMatch[1];
    console.log(`  🔍 IStorage content length: ${storageContent.length} characters`);
    console.log(`  🔍 First 500 chars: ${storageContent.substring(0, 500)}...`);

    // Test pallets regex specifically
    console.log(`  🔍 Testing pallet regex on content...`);
    const testPalletRegex = /(\w+): \{/g;
    const palletMatches = [...storageContent.matchAll(testPalletRegex)];
    console.log(`  🔍 Found ${palletMatches.length} potential pallets: ${palletMatches.map(m => m[1]).join(', ')}`);

    // Use a direct regex approach to find all pallets and their storage items
    // The structure is: "    PalletName: {\n...content...\n    };"
    const palletRegex = /(\w+): \{([\s\S]*?)\};/g;
    let palletMatch;

    while ((palletMatch = palletRegex.exec(storageContent)) !== null) {
      const palletName = palletMatch[1];
      const palletContent = palletMatch[2];
      metadata.pallets[palletName] = {};

      console.log(`  📦 Processing pallet: ${palletName}`);

      // Parse storage items in the pallet - more specific regex for StorageDescriptor
      const storageRegex = /(\w+): StorageDescriptor<\[(.*?)\],\s*(.*?),\s*([\w]+),\s*([\w]+)>/g;
      let storageMatch;

      while ((storageMatch = storageRegex.exec(palletContent)) !== null) {
        const storageName = storageMatch[1];
        const storageArgs = storageMatch[2].trim();
        const returnTypeRaw = storageMatch[3].trim();

        // Extract parameter types from the arguments
        const parameters = this.parseStorageArguments(storageArgs);

        // Extract and clean return type
        const returnType = this.extractReturnType(returnTypeRaw);

        metadata.pallets[palletName][storageName] = {
          required: parameters,
          optional: [],
          description: this.extractDescription(palletContent, storageName),
          returnType: returnType,
        };

        console.log(`    📝 Found storage: ${storageName} (${parameters.join(', ')}) -> ${returnType}`);
      }
    }

    return metadata;
  }

  /**
   * Split storage content into top-level sections (pallets)
   */
  private splitTopLevelSections(content: string): string[] {
    const sections: string[] = [];
    let currentSection = '';
    let braceCount = 0;
    let inSection = false;

    const lines = content.split('\n');

    for (const line of lines) {
      // Check if this line starts a new top-level section
      const topLevelMatch = line.match(/^\s*(\w+): \{/);

      if (topLevelMatch && braceCount === 0) {
        // Save previous section if we have one
        if (currentSection.trim() && inSection) {
          sections.push(currentSection.trim());
        }

        // Start new section
        currentSection = line + '\n';
        braceCount = 1;
        inSection = true;
      } else if (inSection) {
        currentSection += line + '\n';

        // Count braces to track nesting
        for (const char of line) {
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
        }

        // If we've closed all braces, end this section
        if (braceCount === 0) {
          sections.push(currentSection.trim());
          currentSection = '';
          inSection = false;
        }
      }
    }

    // Add final section if needed
    if (currentSection.trim() && inSection) {
      sections.push(currentSection.trim());
    }

    return sections;
  }

  /**
   * Parse storage arguments to extract parameter types
   */
  private parseStorageArguments(args: string): string[] {
    if (!args || args.trim() === '') {
      return [];
    }

    const parameters: string[] = [];

    // Split by comma and parse each parameter
    const parts = args.split(',').map(part => part.trim());

    for (const part of parts) {
      if (part.includes(':')) {
        // Extract type after the colon
        const typePart = part.split(':')[1].trim();
        const paramType = this.mapTypeToParameterType(typePart);
        parameters.push(paramType);
      }
    }

    return parameters;
  }

  /**
   * Extract and clean return type from StorageDescriptor
   */
  private extractReturnType(returnTypeRaw: string): string {
    // Remove Anonymize wrapper and clean the type
    let returnType = returnTypeRaw.replace(/^Anonymize</, '').replace(/>$/, '');

    // Map specific PAPI types to more readable types
    const returnTypeMap: Record<string, string> = {
      'bigint': 'bigint',
      'number': 'number',
      'boolean': 'boolean',
      'string': 'string',
      'Binary': 'Uint8Array',
      'SS58String': 'string',
      'FixedSizeBinary<32>': 'Hash',
      'H256': 'Hash',
    };

    // Check for exact matches first
    if (returnTypeMap[returnType]) {
      return returnTypeMap[returnType];
    }

    // Handle specific patterns
    if (returnType.startsWith('FixedSizeBinary<')) {
      return 'Hash';
    }

    if (returnType.startsWith('I') && returnType.length > 10) {
      // These are complex anonymized types - try to infer from name context
      return 'unknown';
    }

    // Return the cleaned type
    return returnType;
  }

  /**
   * Map TypeScript types to parameter types
   */
  private mapTypeToParameterType(tsType: string): string {
    // Remove any generic brackets for matching
    const cleanType = tsType.replace(/[<>]/g, '');

    const typeMap: Record<string, string> = {
      'SS58String': 'AccountId',
      'AccountId32': 'AccountId',
      'MultiAddress': 'AccountId',
      'number': 'u32',
      'bigint': 'u64',
      'boolean': 'bool',
      'string': 'string',
      'Binary': 'bytes',
      'FixedSizeBinary': 'Hash',
      'H256': 'Hash'
    };

    // Check exact matches first
    for (const [pattern, result] of Object.entries(typeMap)) {
      if (tsType.includes(pattern)) {
        return result;
      }
    }

    // Handle specific patterns
    if (tsType.startsWith('FixedSizeBinary<32>') || tsType.includes('H256')) {
      return 'Hash';
    }

    if (tsType.includes('AccountId') || tsType.includes('SS58')) {
      return 'AccountId';
    }

    if (tsType.includes('Balance') || tsType.includes('Compact<bigint>')) {
      return 'Balance';
    }

    if (tsType.includes('Compact<number>') || tsType.startsWith('u') || tsType.startsWith('i')) {
      return 'u32';
    }

    // Default fallback
    return tsType.replace(/[<>,\s]/g, '_');
  }

  /**
   * Extract description comment for storage item
   */
  private extractDescription(palletContent: string, storageName: string): string {
    const lines = palletContent.split('\n');
    let description = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // If this line contains our storage name
      if (line.includes(`${storageName}:`)) {
        // Look backwards for comment lines
        for (let j = i - 1; j >= 0; j--) {
          const commentLine = lines[j].trim();
          if (commentLine.startsWith('*') && !commentLine.startsWith('*/')) {
            const comment = commentLine.replace(/^\*\s?/, '').trim();
            if (comment) {
              description = comment;
              break;
            }
          } else if (commentLine !== '/**' && commentLine !== '') {
            break;
          }
        }
        break;
      }
    }

    return description || `Storage item ${storageName}`;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting simplified storage metadata extraction...');

  try {
    const extractor = new SimpleStorageExtractor();
    const metadata = extractor.extractAllMetadata();

    // Generate the metadata file
    const outputPath = path.resolve(process.cwd(), 'packages/core/generated/storage-metadata.json');
    const outputDir = path.dirname(outputPath);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write metadata
    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));

    // Generate TypeScript interface file
    const tsOutputPath = path.resolve(process.cwd(), 'packages/core/generated/storage-metadata.ts');
    generateTypeScriptInterface(metadata, tsOutputPath);

    console.log('✅ Storage metadata extraction completed!');
    console.log(`📄 Generated: ${outputPath}`);
    console.log(`📄 Generated: ${tsOutputPath}`);

    // Print summary
    const totalChains = Object.keys(metadata).length;
    const totalPallets = Object.values(metadata).reduce((sum, chain) => sum + Object.keys(chain.pallets).length, 0);
    const totalStorage = Object.values(metadata).reduce((sum, chain) =>
      sum + Object.values(chain.pallets).reduce((palletSum, pallet) => palletSum + Object.keys(pallet).length, 0), 0
    );

    console.log(`📊 Summary: ${totalChains} chains, ${totalPallets} pallets, ${totalStorage} storage items`);

    // Show sample data
    console.log('\n🔍 Sample data:');
    for (const [chainKey, chainData] of Object.entries(metadata)) {
      console.log(`\n${chainKey}:`);
      for (const [palletName, palletData] of Object.entries(chainData.pallets)) {
        const storageCount = Object.keys(palletData).length;
        console.log(`  ${palletName}: ${storageCount} storage items`);

        // Show a few examples
        const examples = Object.entries(palletData).slice(0, 3);
        for (const [storageName, storageInfo] of examples) {
          console.log(`    ${storageName}: [${storageInfo.required.join(', ')}]`);
        }

        if (storageCount > 3) {
          console.log(`    ... and ${storageCount - 3} more`);
        }
        break; // Just show first pallet
      }
      if (Object.keys(chainData.pallets).length > 0) break; // Just show first chain
    }

  } catch (error) {
    console.error('❌ Metadata extraction failed:', error);
    process.exit(1);
  }
}

/**
 * Generate TypeScript interface file
 */
function generateTypeScriptInterface(metadata: AllChainsMetadata, outputPath: string): void {
  const content = `/**
 * Auto-generated storage metadata from PAPI descriptors
 * Generated on: ${new Date().toISOString()}
 */

export interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export interface ChainStorageMetadata {
  pallets: {
    [pallet: string]: {
      [storage: string]: StorageParameterInfo;
    };
  };
}

export const storageMetadata: { [chainKey: string]: ChainStorageMetadata } = ${JSON.stringify(metadata, null, 2)};

/**
 * Get storage parameters for a specific chain, pallet, and storage item
 */
export function getStorageParameters(chainKey: string, pallet: string, storage: string): string[] {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.required || [];
}

/**
 * Check if a storage item exists
 */
export function hasStorage(chainKey: string, pallet: string, storage: string): boolean {
  return !!(storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]);
}

/**
 * Get all supported chains
 */
export function getSupportedChains(): string[] {
  return Object.keys(storageMetadata);
}

/**
 * Get all supported pallets for a chain
 */
export function getSupportedPallets(chainKey: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets || {});
}

/**
 * Get all supported storage items for a pallet
 */
export function getSupportedStorage(chainKey: string, pallet: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets?.[pallet] || {});
}

/**
 * Get return type for a storage item
 */
export function getStorageReturnType(chainKey: string, pallet: string, storage: string): string {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.returnType || 'unknown';
}
`;

  fs.writeFileSync(outputPath, content);
}

// Run the script
main().catch(console.error);