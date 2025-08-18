#!/usr/bin/env tsx

/**
 * Build-time TypeScript AST parser for extracting storage metadata
 * Generates comprehensive storage parameter information from PAPI descriptors
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

interface StorageMetadata {
  required: string[];
  optional: string[];
  description?: string;
}

interface ChainStorageMetadata {
  [pallet: string]: {
    [storage: string]: StorageMetadata;
  };
}

interface AllChainsMetadata {
  [chainKey: string]: ChainStorageMetadata;
}

class StorageMetadataExtractor {
  private program: ts.Program;
  private checker: ts.TypeChecker;

  constructor() {
    // Create TypeScript program for the descriptors
    const descriptorPath = path.resolve(process.cwd(), '.papi/descriptors/dist');
    const configPath = path.resolve(process.cwd(), 'tsconfig.json');

    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsedConfig = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      path.dirname(configPath)
    );

    this.program = ts.createProgram({
      rootNames: [path.join(descriptorPath, 'index.d.ts')],
      options: parsedConfig.options
    });

    this.checker = this.program.getTypeChecker();
  }

  /**
   * Extract storage metadata for all chains
   */
  extractAllMetadata(): AllChainsMetadata {
    const result: AllChainsMetadata = {};

    // Get all chain descriptor files
    const descriptorPath = path.resolve(process.cwd(), '.papi/descriptors/dist');
    const chainFiles = fs.readdirSync(descriptorPath)
      .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts')
      .map(file => file.replace('.d.ts', ''));

    for (const chainKey of chainFiles) {
      console.log(`🔍 Extracting metadata for ${chainKey}...`);
      try {
        result[chainKey] = this.extractChainMetadata(chainKey);
        console.log(`✅ Extracted ${Object.keys(result[chainKey]).length} pallets for ${chainKey}`);
      } catch (error) {
        console.warn(`⚠️  Failed to extract metadata for ${chainKey}:`, error);
        result[chainKey] = {};
      }
    }

    return result;
  }

  /**
   * Extract storage metadata for a specific chain
   */
  private extractChainMetadata(chainKey: string): ChainStorageMetadata {
    const descriptorFile = path.resolve(process.cwd(), '.papi/descriptors/dist', `${chainKey}.d.ts`);

    if (!fs.existsSync(descriptorFile)) {
      throw new Error(`Descriptor file not found: ${descriptorFile}`);
    }

    const sourceFile = this.program.getSourceFile(descriptorFile);
    if (!sourceFile) {
      throw new Error(`Could not parse descriptor file: ${descriptorFile}`);
    }

    const metadata: ChainStorageMetadata = {};

    // Find the default export (chain descriptor)
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isExportAssignment(node) && node.isExportEquals === false) {
        // This is the `export default` statement
        const exportType = this.checker.getTypeAtLocation(node.expression);
        this.extractFromChainType(exportType, metadata);
      }
    });

    return metadata;
  }

  /**
   * Extract storage information from the chain type
   */
  private extractFromChainType(chainType: ts.Type, metadata: ChainStorageMetadata): void {
    const queryProperty = chainType.getProperty('query');
    if (!queryProperty || !queryProperty.valueDeclaration) {
      return;
    }

    const queryType = this.checker.getTypeOfSymbolAtLocation(
      queryProperty,
      queryProperty.valueDeclaration
    );

    // Iterate through all pallets in the query type
    for (const palletProperty of queryType.getProperties()) {
      const palletName = palletProperty.getName();
      const palletType = this.checker.getTypeOfSymbolAtLocation(
        palletProperty,
        palletProperty.valueDeclaration!
      );

      metadata[palletName] = {};

      // Iterate through all storage items in the pallet
      for (const storageProperty of palletType.getProperties()) {
        const storageName = storageProperty.getName();
        const storageType = this.checker.getTypeOfSymbolAtLocation(
          storageProperty,
          storageProperty.valueDeclaration!
        );

        metadata[palletName][storageName] = this.extractStorageDescriptor(storageType);
      }
    }
  }

  /**
   * Extract parameter information from StorageDescriptor type
   */
  private extractStorageDescriptor(storageType: ts.Type): StorageMetadata {
    // StorageDescriptor<Args, Return, Optional, Never>
    // We need to extract the Args type parameter

    const typeArguments = this.checker.getTypeArguments(storageType as ts.TypeReference);
    if (!typeArguments || typeArguments.length === 0) {
      return { required: [], optional: [] };
    }

    const argsType = typeArguments[0];
    const parameters = this.extractParameterTypes(argsType);

    return {
      required: parameters,
      optional: [],
      description: `Auto-generated from ${storageType.symbol?.getName() || 'unknown'} descriptor`
    };
  }

  /**
   * Extract parameter types from the Args tuple type
   */
  private extractParameterTypes(argsType: ts.Type): string[] {
    if (argsType.isUnion()) {
      // Handle union types (less common in storage args)
      return argsType.types.flatMap(t => this.extractParameterTypes(t));
    }

    if (this.checker.isTupleType(argsType)) {
      // Handle tuple types [Arg1, Arg2, ...]
      const elementTypes = this.checker.getTypeArguments(argsType as ts.TypeReference) || [];
      return elementTypes.map(elementType => this.getParameterTypeName(elementType));
    }

    // Handle array types
    if (this.checker.isArrayType(argsType)) {
      const elementType = this.checker.getTypeArguments(argsType as ts.TypeReference)?.[0];
      if (elementType) {
        return [this.getParameterTypeName(elementType)];
      }
    }

    // If it's an empty tuple or void, return empty array
    if (argsType.flags & ts.TypeFlags.Void ||
        (argsType.symbol && argsType.symbol.getName() === '__type' && argsType.getProperties().length === 0)) {
      return [];
    }

    // Single parameter type
    return [this.getParameterTypeName(argsType)];
  }

  /**
   * Convert TypeScript type to parameter type name
   */
  private getParameterTypeName(type: ts.Type): string {
    // Handle primitive types
    if (type.flags & ts.TypeFlags.Number) return 'u32';
    if (type.flags & ts.TypeFlags.String) return 'string';
    if (type.flags & ts.TypeFlags.Boolean) return 'bool';
    if (type.flags & ts.TypeFlags.BigInt) return 'u64';

    // Handle named types
    const typeName = this.checker.typeToString(type);

    // Map common PAPI types to parameter types
    const typeMap: Record<string, string> = {
      'SS58String': 'AccountId',
      'AccountId32': 'AccountId',
      'MultiAddress': 'AccountId',
      'H256': 'Hash',
      'FixedSizeBinary<32>': 'Hash',
      'bigint': 'u64',
      'number': 'u32',
      'Compact<bigint>': 'Balance',
      'Compact<number>': 'u32'
    };

    // Check for exact matches first
    if (typeMap[typeName]) {
      return typeMap[typeName];
    }

    // Check for partial matches
    for (const [pattern, result] of Object.entries(typeMap)) {
      if (typeName.includes(pattern)) {
        return result;
      }
    }

    // Handle generic types
    if (typeName.startsWith('Compact<')) {
      return 'u64'; // Most compact types are numeric
    }

    if (typeName.includes('AccountId') || typeName.includes('SS58')) {
      return 'AccountId';
    }

    if (typeName.includes('Hash') || typeName.includes('H256')) {
      return 'Hash';
    }

    if (typeName.includes('Balance') || typeName.includes('bigint')) {
      return 'Balance';
    }

    if (typeName.includes('number') || typeName.startsWith('u') || typeName.startsWith('i')) {
      return 'u32';
    }

    // Default to generic type name
    return typeName.replace(/[<>]/g, '_');
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting storage metadata extraction...');

  try {
    const extractor = new StorageMetadataExtractor();
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
    const totalPallets = Object.values(metadata).reduce((sum, chain) => sum + Object.keys(chain).length, 0);
    const totalStorage = Object.values(metadata).reduce((sum, chain) =>
      sum + Object.values(chain).reduce((palletSum, pallet) => palletSum + Object.keys(pallet).length, 0), 0
    );

    console.log(`📊 Summary: ${totalChains} chains, ${totalPallets} pallets, ${totalStorage} storage items`);

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
}

export interface ChainStorageMetadata {
  [pallet: string]: {
    [storage: string]: StorageParameterInfo;
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
`;

  fs.writeFileSync(outputPath, content);
}

// Run the script
main().catch(console.error);