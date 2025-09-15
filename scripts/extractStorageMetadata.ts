#!/usr/bin/env tsx

/**
 * PAPI Storage Metadata Extractor
 *
 * Extracts storage parameter information from TypeScript descriptor files
 * during build time to enable dynamic parameter detection at runtime.
 *
 * This replaces the hard-coded storage parameter detection system with
 * a metadata-driven approach that automatically supports new chains and
 * storage items without manual updates.
 */

import { Project, TypeAliasDeclaration, PropertySignature, TypeReferenceNode } from 'ts-morph';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

// Metadata structure as defined in the plan
interface StorageMetadata {
  [chainKey: string]: {
    pallets: {
      [pallet: string]: {
        [storage: string]: {
          paramTypes: string[];
          returnType: string;
          optional: boolean;
          description?: string;
        }
      }
    }
  }
}

interface ChainConfig {
  descriptorPath: string;
  chainKey: string;
  displayName: string;
}

// Chain configurations for supported networks
const CHAIN_CONFIGS: ChainConfig[] = [
  { descriptorPath: '.papi/descriptors/dist/polkadot.d.ts', chainKey: 'polkadot', displayName: 'Polkadot' },
  { descriptorPath: '.papi/descriptors/dist/kusama.d.ts', chainKey: 'kusama', displayName: 'Kusama' },
  { descriptorPath: '.papi/descriptors/dist/moonbeam.d.ts', chainKey: 'moonbeam', displayName: 'Moonbeam' },
  { descriptorPath: '.papi/descriptors/dist/bifrost.d.ts', chainKey: 'bifrost', displayName: 'Bifrost' },
  { descriptorPath: '.papi/descriptors/dist/astar.d.ts', chainKey: 'astar', displayName: 'Astar' },
  { descriptorPath: '.papi/descriptors/dist/westend.d.ts', chainKey: 'westend', displayName: 'Westend' },
  { descriptorPath: '.papi/descriptors/dist/rococo.d.ts', chainKey: 'rococo', displayName: 'Rococo' },
  { descriptorPath: '.papi/descriptors/dist/paseo.d.ts', chainKey: 'paseo', displayName: 'Paseo' },
];

class StorageMetadataExtractor {
  private project: Project;
  private metadata: StorageMetadata = {};

  constructor() {
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });
  }

  /**
   * Extract metadata for all configured chains
   */
  async extractAll(): Promise<StorageMetadata> {
    console.log('🔍 Starting storage metadata extraction...');

    for (const config of CHAIN_CONFIGS) {
      try {
        await this.extractChainMetadata(config);
      } catch (error) {
        console.warn(`⚠️  Failed to extract metadata for ${config.displayName}: ${error.message}`);
        continue;
      }
    }

    return this.metadata;
  }

  /**
   * Extract storage metadata for a specific chain
   */
  private async extractChainMetadata(config: ChainConfig): Promise<void> {
    const descriptorPath = join(process.cwd(), config.descriptorPath);

    if (!existsSync(descriptorPath)) {
      console.log(`⏭️  Skipping ${config.displayName} - descriptor not found at ${config.descriptorPath}`);
      return;
    }

    console.log(`📖 Processing ${config.displayName} descriptor...`);

    // Add the descriptor file to the project
    const sourceFile = this.project.addSourceFileAtPath(descriptorPath);

    // Initialize chain metadata
    this.metadata[config.chainKey] = { pallets: {} };

    // Look for the IStorage type which contains all storage definitions
    const storageType = sourceFile.getTypeAlias('IStorage');

    if (!storageType) {
      console.warn(`⚠️  Could not find IStorage type for ${config.displayName}`);
      return;
    }

    // Extract storage information from the IStorage type
    this.extractStorageFromIStorageType(storageType, config.chainKey);

    console.log(`✅ Extracted metadata for ${config.displayName} (${Object.keys(this.metadata[config.chainKey].pallets).length} pallets)`);
  }

  /**
   * Extract storage information from IStorage type
   */
  private extractStorageFromIStorageType(storageType: TypeAliasDeclaration, chainKey: string): void {
    const typeNode = storageType.getTypeNode();

    if (!typeNode) {
      console.log(`⚠️  No type node found for IStorage in ${chainKey}`);
      return;
    }

    // IStorage is structured as: { PalletName: { StorageName: StorageDescriptor<...> } }
    this.traverseIStorageType(typeNode, chainKey);
  }

  /**
   * Traverse IStorage type to find StorageDescriptor definitions
   */
  private traverseIStorageType(typeNode: any, chainKey: string): void {
    try {
      // Handle different type node kinds
      if (typeNode.getKind() === 186) { // TypeLiteral
        this.handleTypeLiteral(typeNode, chainKey);
      } else if (typeNode.getKind() === 188) { // MappedType
        // For mapped types, parse the text directly since AST traversal doesn't work
        this.parseIStorageFromText(typeNode.getText(), chainKey);
      } else {
        console.warn(`⚠️  Unexpected type node kind ${typeNode.getKind()} for ${chainKey}`);
      }
    } catch (error) {
      console.warn(`Error traversing IStorage type for ${chainKey}:`, error.message);
    }
  }

  /**
   * Handle TypeLiteral nodes
   */
  private handleTypeLiteral(typeNode: any, chainKey: string): void {
    const properties = typeNode.getProperties();

    for (const prop of properties) {
      if (prop.getKind() === 172) { // PropertySignature
        const propSig = prop as PropertySignature;
        const palletName = propSig.getName();
        const palletType = propSig.getTypeNode();

        if (palletType) {
          // Each property in IStorage is a pallet
          this.extractPalletStorage(palletType, chainKey, palletName);
        }
      }
    }
  }

  /**
   * Parse IStorage from text when AST parsing fails
   */
  private parseIStorageFromText(typeText: string, chainKey: string): void {
    try {
      // This is a fallback method - parse the TypeScript text directly
      // Look for pallet definitions in the format: PalletName: { StorageName: StorageDescriptor<...> }

      // Match pallet blocks
      const palletMatches = typeText.match(/(\w+):\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g);

      if (palletMatches) {
        for (const palletMatch of palletMatches) {
          const palletNameMatch = palletMatch.match(/^(\w+):/);
          if (palletNameMatch) {
            const palletName = palletNameMatch[1];
            // Extract storage items from this pallet block
            this.parseStorageFromPalletText(palletMatch, chainKey, palletName);
          }
        }
      }
    } catch (error) {
      console.warn(`Error parsing IStorage text for ${chainKey}:`, error.message);
    }
  }

  /**
   * Parse storage items from pallet text block
   */
  private parseStorageFromPalletText(palletText: string, chainKey: string, palletName: string): void {
    try {
      // Initialize pallet if not exists
      if (!this.metadata[chainKey].pallets[palletName]) {
        this.metadata[chainKey].pallets[palletName] = {};
      }

      // Look for StorageDescriptor patterns
      const storageMatches = palletText.match(/(\w+):\s*StorageDescriptor<([^>]+)>/g);

      if (storageMatches) {
        for (const storageMatch of storageMatches) {
          const storageNameMatch = storageMatch.match(/^(\w+):/);
          const descriptorMatch = storageMatch.match(/StorageDescriptor<([^>]+)>/);

          if (storageNameMatch && descriptorMatch) {
            const storageName = storageNameMatch[1];
            const typeArgs = descriptorMatch[1];

            // Parse the StorageDescriptor type arguments
            const { paramTypes, returnType, optional } = this.parseStorageDescriptorArgs(typeArgs);

            this.metadata[chainKey].pallets[palletName][storageName] = {
              paramTypes,
              returnType,
              optional,
              description: `Storage item: ${palletName}.${storageName} (parsed from text)`
            };
          }
        }
      }
    } catch (error) {
      console.warn(`Error parsing storage from pallet text for ${palletName}:`, error.message);
    }
  }

  /**
   * Parse StorageDescriptor type arguments from text
   */
  private parseStorageDescriptorArgs(typeArgs: string): { paramTypes: string[], returnType: string, optional: boolean } {
    try {
      // Split type arguments by comma, but be careful with nested generics
      const args = this.smartSplitTypeArgs(typeArgs);

      if (args.length >= 3) {
        const paramTypesArg = args[0].trim();
        const returnTypeArg = args[1].trim();
        const optionalArg = args[2].trim();

        // Parse parameter types from Args tuple
        const paramTypes = this.parseParameterTypesFromText(paramTypesArg);
        const returnType = this.simplifyTypeName(returnTypeArg);
        const optional = optionalArg === 'true';

        return { paramTypes, returnType, optional };
      }

      return { paramTypes: [], returnType: 'unknown', optional: false };
    } catch (error) {
      return { paramTypes: [], returnType: 'unknown', optional: false };
    }
  }

  /**
   * Smart split of type arguments considering nested generics
   */
  private smartSplitTypeArgs(typeArgs: string): string[] {
    const args = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < typeArgs.length; i++) {
      const char = typeArgs[i];

      if (char === '<' || char === '[' || char === '{') {
        depth++;
      } else if (char === '>' || char === ']' || char === '}') {
        depth--;
      } else if (char === ',' && depth === 0) {
        args.push(current);
        current = '';
        continue;
      }

      current += char;
    }

    if (current) {
      args.push(current);
    }

    return args;
  }

  /**
   * Parse parameter types from Args tuple text
   */
  private parseParameterTypesFromText(argsText: string): string[] {
    const cleaned = argsText.trim();

    // Handle empty tuple []
    if (cleaned === '[]') {
      return [];
    }

    // Handle tuple with content [Key: Type, ...]
    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
      const inner = cleaned.slice(1, -1).trim();
      if (!inner) return [];

      // Split by comma and extract types
      const params = this.smartSplitTypeArgs(inner);
      return params.map(param => {
        // Extract type from "Key: Type" format
        const colonIndex = param.indexOf(':');
        if (colonIndex !== -1) {
          return this.simplifyTypeName(param.substring(colonIndex + 1).trim());
        }
        return this.simplifyTypeName(param.trim());
      });
    }

    return [];
  }

  /**
   * Extract storage items from a pallet type
   */
  private extractPalletStorage(palletTypeNode: any, chainKey: string, palletName: string): void {
    try {
      // Handle type literal (object type) for pallet storage items
      if (palletTypeNode.getKind() === 186) { // TypeLiteral
        const properties = palletTypeNode.getProperties();

        // Initialize pallet if not exists
        if (!this.metadata[chainKey].pallets[palletName]) {
          this.metadata[chainKey].pallets[palletName] = {};
        }

        for (const prop of properties) {
          if (prop.getKind() === 172) { // PropertySignature
            const propSig = prop as PropertySignature;
            const storageName = propSig.getName();
            const storageType = propSig.getTypeNode();

            if (storageType) {
              this.extractStorageItem(storageType, chainKey, palletName, storageName);
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Error extracting pallet storage for ${palletName}:`, error.message);
    }
  }

  /**
   * Extract storage item information from StorageDescriptor type
   */
  private extractStorageItem(typeNode: any, chainKey: string, palletName: string, storageName: string): void {
    try {
      // Look for StorageDescriptor<Args, ReturnType, Optional, Default> pattern
      if (typeNode.getKind() === 177 && typeNode.getTypeName) { // TypeReference
        const typeRef = typeNode as TypeReferenceNode;
        const typeName = typeRef.getTypeName().getText();

        if (typeName === 'StorageDescriptor') {
          const typeArgs = typeRef.getTypeArguments();

          if (typeArgs.length >= 3) {
            // Extract parameter types from first type argument (Args tuple)
            const paramTypes = this.extractParameterTypes(typeArgs[0]);
            const returnType = this.extractReturnType(typeArgs[1]);
            const optional = this.extractOptional(typeArgs[2]);

            // Initialize pallet if not exists
            if (!this.metadata[chainKey].pallets[palletName]) {
              this.metadata[chainKey].pallets[palletName] = {};
            }

            // Store storage metadata
            this.metadata[chainKey].pallets[palletName][storageName] = {
              paramTypes,
              returnType,
              optional,
              description: `Storage item: ${palletName}.${storageName}`
            };
          }
        }
      }
    } catch (error) {
      // Create fallback entry for storage items we can't parse
      if (!this.metadata[chainKey].pallets[palletName]) {
        this.metadata[chainKey].pallets[palletName] = {};
      }

      this.metadata[chainKey].pallets[palletName][storageName] = {
        paramTypes: [], // Default to no parameters for safety
        returnType: 'unknown',
        optional: false,
        description: `Storage item: ${palletName}.${storageName} (fallback)`
      };
    }
  }

  /**
   * Extract parameter types from Args tuple type
   */
  private extractParameterTypes(argsTypeNode: any): string[] {
    try {
      // Handle tuple type: [Key1: Type1, Key2: Type2]
      if (argsTypeNode.getKind() === 185) { // TupleType
        return argsTypeNode.getElements().map((element: any) => {
          try {
            return this.simplifyTypeName(element.getText());
          } catch {
            return 'unknown';
          }
        });
      }

      // Handle empty tuple: []
      const argsText = argsTypeNode.getText().trim();
      if (argsText === '[]') {
        return [];
      }

      // Handle single parameter or complex types
      if (argsText.startsWith('[') && argsText.endsWith(']')) {
        const inner = argsText.slice(1, -1).trim();
        if (!inner) return [];

        // Simple parsing for common parameter patterns
        return [this.simplifyTypeName(inner)];
      }

      return [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Extract return type from ReturnType argument
   */
  private extractReturnType(returnTypeNode: any): string {
    try {
      return this.simplifyTypeName(returnTypeNode.getText());
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Extract optional flag from Optional argument
   */
  private extractOptional(optionalTypeNode: any): boolean {
    try {
      const optionalText = optionalTypeNode.getText().trim();
      return optionalText === 'true';
    } catch (error) {
      return false;
    }
  }

  /**
   * Simplify complex type names to basic parameter types
   */
  private simplifyTypeName(typeName: string): string {
    // Remove extra whitespace and clean up
    const cleaned = typeName.trim().replace(/\s+/g, ' ');

    // Map complex types to simplified parameter types
    const typeMap: Record<string, string> = {
      'SS58String': 'AccountId',
      'AccountId32': 'AccountId',
      'number': 'u32',
      'bigint': 'u128',
      'string': 'Text',
      'boolean': 'bool',
      'Uint8Array': 'Bytes',
      'HexString': 'Hash'
    };

    // Check for direct mappings
    if (typeMap[cleaned]) {
      return typeMap[cleaned];
    }

    // Handle complex types
    if (cleaned.includes('AccountId')) return 'AccountId';
    if (cleaned.includes('Hash')) return 'Hash';
    if (cleaned.includes('Balance')) return 'Balance';
    if (cleaned.match(/^u\d+$/)) return cleaned;
    if (cleaned.match(/^i\d+$/)) return cleaned;

    // Extract key types from key parameters like "Key: SS58String"
    const keyMatch = cleaned.match(/Key:\s*(\w+)/);
    if (keyMatch) {
      return this.simplifyTypeName(keyMatch[1]);
    }

    // Handle arrays
    if (cleaned.includes('Array') || cleaned.includes('[]')) {
      return 'Array';
    }

    // Default to the original type name for complex types
    return cleaned.split(' ')[0] || 'unknown';
  }
}

/**
 * Main extraction function
 */
async function extractStorageMetadata(): Promise<void> {
  try {
    console.log('🚀 PAPI Storage Metadata Extraction');
    console.log('=====================================');

    const extractor = new StorageMetadataExtractor();
    const metadata = await extractor.extractAll();

    // Generate output files
    const outputDir = join(process.cwd(), 'packages', 'core', 'generated');
    const metadataPath = join(outputDir, 'storage-metadata.json');

    // Ensure output directory exists
    await import('fs').then(fs => {
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
    });

    // Write metadata JSON
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // Generate summary
    const totalChains = Object.keys(metadata).length;
    const totalPallets = Object.values(metadata).reduce((sum, chain) => sum + Object.keys(chain.pallets).length, 0);
    const totalStorage = Object.values(metadata).reduce((sum, chain) =>
      sum + Object.values(chain.pallets).reduce((palletSum, pallet) =>
        palletSum + Object.keys(pallet).length, 0), 0);

    console.log('\n📊 Extraction Summary:');
    console.log(`   • Chains: ${totalChains}`);
    console.log(`   • Pallets: ${totalPallets}`);
    console.log(`   • Storage items: ${totalStorage}`);
    console.log(`   • Output: ${metadataPath}`);

    // Generate TypeScript definitions
    await generateTypeDefinitions(metadata, outputDir);

    console.log('\n✅ Storage metadata extraction completed successfully!');

  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    process.exit(1);
  }
}

/**
 * Generate TypeScript definitions for the metadata
 */
async function generateTypeDefinitions(metadata: StorageMetadata, outputDir: string): Promise<void> {
  const typeDefinitions = `
// Auto-generated storage metadata types
// Generated by scripts/extractStorageMetadata.ts

export interface StorageParameterInfo {
  paramTypes: string[];
  returnType: string;
  optional: boolean;
  description?: string;
}

export interface ChainStorageMetadata {
  pallets: {
    [pallet: string]: {
      [storage: string]: StorageParameterInfo;
    };
  };
}

export interface StorageMetadata {
  [chainKey: string]: ChainStorageMetadata;
}

// Metadata instance
export const storageMetadata: StorageMetadata = ${JSON.stringify(metadata, null, 2)} as const;

// Helper functions
export function getStorageParameters(
  chainKey: string,
  pallet: string,
  storage: string
): string[] {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.paramTypes || [];
}

export function getStorageReturnType(
  chainKey: string,
  pallet: string,
  storage: string
): string {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.returnType || 'unknown';
}

export function hasStorage(
  chainKey: string,
  pallet: string,
  storage: string
): boolean {
  return Boolean(storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]);
}

export function getSupportedChains(): string[] {
  return Object.keys(storageMetadata);
}

export function getSupportedPallets(chainKey: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets || {});
}

export function getSupportedStorage(chainKey: string, pallet: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets?.[pallet] || {});
}
`;

  const typesPath = join(outputDir, 'storage-metadata.ts');
  writeFileSync(typesPath, typeDefinitions);
  console.log(`   • Type definitions: ${typesPath}`);
}

// Run the extraction
if (require.main === module) {
  extractStorageMetadata();
}

export { extractStorageMetadata, StorageMetadataExtractor };