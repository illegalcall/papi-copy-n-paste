/**
 * Runtime Storage Parameter Detection using PAPI Metadata Builders
 *
 * This module implements the same approach as papi-console for dynamic storage
 * parameter detection without any hardcoding, using PAPI's runtime introspection.
 */

import { getDescriptorForChain } from "@workspace/core/descriptors";

export interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
  isPlain: boolean;
  isSingleKey: boolean;
  isMultiKey: boolean;
}

export interface RuntimeStorageEntry {
  pallet: string;
  name: string;
  type: any;
  docs: string[];
  parameters: StorageParameterInfo;
}

/**
 * Runtime-based storage parameter detector using PAPI metadata builders
 */
export class RuntimeStorageDetector {
  private cache = new Map<string, StorageParameterInfo>();
  private descriptorCache = new Map<string, any>();

  /**
   * Get storage parameters by analyzing the actual descriptor metadata
   */
  detectParameters(
    chainKey: string,
    pallet: string,
    storage: string
  ): StorageParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${storage}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Get the descriptor for this chain
      const descriptor = this.getDescriptor(chainKey);

      // Get the storage entry from the descriptor's metadata
      const storageEntry = this.getStorageEntry(descriptor, pallet, storage);

      if (!storageEntry) {
        throw new Error(`Storage item ${pallet}.${storage} not found on chain ${chainKey}`);
      }


      // Analyze the storage type to determine parameters
      const parameters = this.analyzeStorageType(storageEntry, descriptor);

      // Cache the result
      this.cache.set(cacheKey, parameters);

      console.log(`🎯 Runtime detection complete for ${pallet}.${storage}:`, parameters);
      return parameters;

    } catch (error) {
      console.error(`💥 Failed to detect parameters for ${chainKey}.${pallet}.${storage}:`, error);

      // Return empty parameters as fallback
      const fallback: StorageParameterInfo = {
        required: [],
        optional: [],
        description: `Failed to analyze ${pallet}.${storage}`,
        isPlain: true,
        isSingleKey: false,
        isMultiKey: false
      };

      this.cache.set(cacheKey, fallback);
      return fallback;
    }
  }

  /**
   * Get the descriptor for a chain with caching
   */
  private getDescriptor(chainKey: string): any {
    if (this.descriptorCache.has(chainKey)) {
      return this.descriptorCache.get(chainKey);
    }

    const descriptor = getDescriptorForChain(chainKey);
    this.descriptorCache.set(chainKey, descriptor);
    return descriptor;
  }

  /**
   * Find a storage entry in the descriptor's metadata
   */
  private getStorageEntry(descriptor: any, pallet: string, storage: string): any | null {
    try {
      // Access the metadata through the descriptor
      const metadata = descriptor.getMetadata();

      // Check if metadata and pallets exist
      if (!metadata || !metadata.pallets || !Array.isArray(metadata.pallets)) {
        console.warn(`Invalid metadata structure for ${pallet}.${storage}:`, {
          hasMetadata: !!metadata,
          hasPallets: !!(metadata && metadata.pallets),
          palletsType: metadata && typeof metadata.pallets
        });
        return null;
      }

      // Find the pallet
      const palletEntry = metadata.pallets.find((p: any) => p.name === pallet);
      if (!palletEntry || !palletEntry.storage) {
        return null;
      }

      // Find the storage item
      const storageEntry = palletEntry.storage.items.find((item: any) => item.name === storage);
      return storageEntry || null;

    } catch (error) {
      console.warn(`Error accessing metadata for ${pallet}.${storage}:`, error);
      return null;
    }
  }

  /**
   * Analyze storage type structure to determine required parameters
   * Following the exact patterns from papi-console
   */
  private analyzeStorageType(storageEntry: any, descriptor: any): StorageParameterInfo {
    const { type, docs } = storageEntry;


    try {
      // Handle plain storage (no parameters) - papi-console pattern
      if (type.tag === "plain") {
        return {
          required: [],
          optional: [],
          description: docs?.join(' ') || 'Plain storage item',
          isPlain: true,
          isSingleKey: false,
          isMultiKey: false
        };
      }

      // Handle map storage (has parameters) - papi-console pattern
      if (type.tag === "map") {
        const hashers = type.value.hashers || [];

        // Single parameter case - exact papi-console pattern
        if (hashers.length === 1) {
          const keyType = this.getTypeInfo(type.value.key, descriptor);
          return {
            required: [keyType],
            optional: [],
            description: docs?.join(' ') || 'Single-key storage item',
            isPlain: false,
            isSingleKey: true,
            isMultiKey: false
          };
        }

        // Multiple parameters case - exact papi-console pattern
        if (hashers.length > 1) {

          // Get the key definition from metadata lookup - exact papi-console pattern
          const metadata = descriptor.getMetadata();
          const keyDef = metadata.lookup[type.value.key];

    
          // This is the exact pattern from papi-console lines 129-139
          const keyTypeIds = (() => {
            if (keyDef.type === "array") {
              // Array case: repeated elements of same type
              return new Array(keyDef.len).fill(keyDef.value.id);
            }
            if (keyDef.type === "tuple") {
              // Tuple case: each element is a parameter
              return keyDef.value.map((e: any) => e.id);
            }
            throw new Error(`Invalid key type ${keyDef.type} for multi-key storage`);
          })();

          // Convert type IDs to type names
          const parameterTypes = keyTypeIds.map((typeId: number) => {
            const elementType = this.getTypeInfo(typeId, descriptor);
            return elementType;
          });

          return {
            required: parameterTypes,
            optional: [],
            description: docs?.join(' ') || 'Multi-key storage item',
            isPlain: false,
            isSingleKey: false,
            isMultiKey: true
          };
        }

        // Map with no hashers - shouldn't happen but handle gracefully
        console.warn(`⚠️ Map storage with no hashers: ${storageEntry.name}`);
        return {
          required: [],
          optional: [],
          description: docs?.join(' ') || 'Map storage with no hashers',
          isPlain: true,
          isSingleKey: false,
          isMultiKey: false
        };
      }

      // Fallback for unknown storage types
      console.warn(`❓ Unknown storage type for ${storageEntry.name}:`, type);
      return {
        required: [],
        optional: [],
        description: docs?.join(' ') || 'Unknown storage type',
        isPlain: true,
        isSingleKey: false,
        isMultiKey: false
      };

    } catch (error) {
      console.error(`💥 Error analyzing storage type for ${storageEntry.name}:`, error);
      return {
        required: [],
        optional: [],
        description: 'Error analyzing storage type',
        isPlain: true,
        isSingleKey: false,
        isMultiKey: false
      };
    }
  }

  /**
   * Get type information from metadata type ID
   */
  private getTypeInfo(typeId: number, descriptor: any): string {
    try {

      // Get the lookup function from descriptor metadata
      const metadata = descriptor.getMetadata();
      const lookup = this.createLookupFunction(metadata);

      const typeDef = lookup(typeId);

      const formattedType = this.formatTypeName(typeDef);

      return formattedType;

    } catch (error) {
      console.warn(`❌ Failed to resolve type ${typeId}:`, error);
      return 'unknown';
    }
  }


  /**
   * Create a lookup function for type resolution
   * Exact pattern from papi-console
   */
  private createLookupFunction(metadata: any) {
    return (typeId: number) => {
      const type = metadata.lookup[typeId];
      if (!type) {
        throw new Error(`Type ${typeId} not found in metadata lookup`);
      }
      return type;
    };
  }

  /**
   * Format type definition into a readable type name
   * Based on papi-console patterns with enhanced type recognition
   */
  private formatTypeName(typeDef: any): string {
    if (!typeDef) return 'unknown';


    // Handle primitive types
    if (typeDef.type === "primitive") {
      return typeDef.value;
    }

    // Handle composite types (structs, enums)
    if (typeDef.type === "composite") {
      if (typeDef.path) {
        const pathStr = typeDef.path.join('::');
        // Common Substrate types
        if (pathStr.includes('AccountId')) return 'AccountId';
        if (pathStr.includes('Balance')) return 'Balance';
        if (pathStr.includes('Hash')) return 'Hash';
        if (pathStr.includes('BlockNumber')) return 'BlockNumber';
        // Return the last part of the path
        return pathStr.split('::').pop() || 'composite';
      }
      return 'composite';
    }

    // Handle sequences (Vec<T>)
    if (typeDef.type === "sequence") {
      const innerType = this.formatTypeName(typeDef.value);
      return `Vec<${innerType}>`;
    }

    // Handle arrays ([T; N])
    if (typeDef.type === "array") {
      const innerType = this.formatTypeName(typeDef.value);
      return `[${innerType}; ${typeDef.len}]`;
    }

    // Handle tuples ((T1, T2, ...))
    if (typeDef.type === "tuple") {
      const elements = typeDef.value.map((v: any) => this.formatTypeName(v));
      return `(${elements.join(', ')})`;
    }

    // Handle variants (enums)
    if (typeDef.type === "variant") {
      if (typeDef.path) {
        const pathStr = typeDef.path.join('::');
        return pathStr.split('::').pop() || 'variant';
      }
      return 'variant';
    }

    // Handle compact types
    if (typeDef.type === "compact") {
      const innerType = this.formatTypeName(typeDef.value);
      return `Compact<${innerType}>`;
    }

    // Common patterns by path
    if (typeDef.path) {
      const pathStr = typeDef.path.join('::');

      // Substrate common types
      if (pathStr.includes('AccountId32') || pathStr.includes('AccountId')) return 'AccountId';
      if (pathStr.includes('H256') || pathStr.includes('Hash')) return 'Hash';
      if (pathStr.includes('U128') || pathStr.includes('Balance')) return 'Balance';
      if (pathStr.includes('U32') || pathStr.includes('BlockNumber')) return 'u32';
      if (pathStr.includes('U64')) return 'u64';
      if (pathStr.includes('U128')) return 'u128';

      // Return the last meaningful part
      return pathStr.split('::').pop() || 'unknown';
    }

    // Fallback
    return typeDef.type || 'unknown';
  }

  /**
   * Clear cache for testing
   */
  clearCache(): void {
    this.cache.clear();
    this.descriptorCache.clear();
  }
}

// Export singleton instance
export const runtimeStorageDetector = new RuntimeStorageDetector();