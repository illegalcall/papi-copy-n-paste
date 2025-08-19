/**
 * Dynamic Storage Parameter Detection Engine
 *
 * Replaces hard-coded storage parameter detection with a metadata-driven approach
 * that automatically supports all PAPI chains and storage items.
 *
 * This is Phase 2 of the Dynamic Storage Detection Plan implementation.
 */

import { storageMetadata, getStorageParameters, hasStorage, getSupportedChains, getSupportedPallets, getSupportedStorage } from '../../../packages/core/generated/storage-metadata';

/**
 * Helper function to get dynamic storage parameters
 * Used by both the new dynamic system and legacy compatibility
 */
function getDynamicStorageParameters(chainKey: string, pallet: string, storage: string): string[] | null {
  try {
    if (hasStorage(chainKey, pallet, storage)) {
      const params = getStorageParameters(chainKey, pallet, storage);
      return params || [];
    }

    // Try cross-chain lookup
    const supportedChains = getSupportedChains();
    for (const otherChain of supportedChains) {
      if (otherChain !== chainKey && hasStorage(otherChain, pallet, storage)) {
        const params = getStorageParameters(otherChain, pallet, storage);
        if (params) {
          console.warn(`🔄 Using ${otherChain} metadata for ${chainKey}.${pallet}.${storage}`);
          return params;
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Error accessing dynamic metadata for ${chainKey}.${pallet}.${storage}:`, error);
  }

  return null;
}

export interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export class DynamicStorageDetector {
  private cache = new Map<string, StorageParameterInfo>();
  private hitRate = 0;
  private totalRequests = 0;

  /**
   * Detect storage parameters for a given chain, pallet, and storage item
   * Only uses actual metadata - no fallbacks or cross-chain lookups
   */
  detectParameters(
    chainKey: string,
    pallet: string,
    storage: string
  ): StorageParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${storage}`;

    this.totalRequests++;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.hitRate++;
      return this.cache.get(cacheKey)!;
    }

    // Only use actual metadata for this specific chain
    const result = this.detectFromMetadata(chainKey, pallet, storage);

    if (!result) {
      throw new Error(`No metadata available for ${chainKey}.${pallet}.${storage} - metadata may be incomplete or missing`);
    }

    // Cache the result
    this.cache.set(cacheKey, result);

    return result;
  }

  /**
   * Primary detection: Use generated metadata for the specific chain
   */
  private detectFromMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    try {
      if (!hasStorage(chainKey, pallet, storage)) {
        return null;
      }

      const paramTypes = getStorageParameters(chainKey, pallet, storage);
      const metadata = storageMetadata[chainKey]?.pallets?.[pallet]?.[storage];

      if (paramTypes && paramTypes.length >= 0) {
        return {
          required: paramTypes,
          optional: [],
          description: metadata?.description || `Dynamic metadata for ${chainKey}.${pallet}.${storage}`,
          returnType: metadata?.returnType || 'Codec'
        };
      }
    } catch (error) {
      console.warn(`⚠️  Error accessing dynamic metadata for ${chainKey}.${pallet}.${storage}:`, error);
    }

    return null;
  }


  /**
   * Get cache performance statistics
   */
  getCacheStats() {
    return {
      hitRate: this.totalRequests > 0 ? (this.hitRate / this.totalRequests) * 100 : 0,
      cacheSize: this.cache.size,
      totalRequests: this.totalRequests
    };
  }

  /**
   * Get supported chains
   */
  getSupportedChains(): string[] {
    return getSupportedChains();
  }

  /**
   * Get supported pallets for a chain
   */
  getSupportedPallets(chainKey: string): string[] {
    return getSupportedPallets(chainKey);
  }

  /**
   * Get supported storage items for a pallet
   */
  getSupportedStorage(chainKey: string, pallet: string): string[] {
    return getSupportedStorage(chainKey, pallet);
  }

  /**
   * Check if a storage item exists
   */
  hasStorage(chainKey: string, pallet: string, storage: string): boolean {
    return hasStorage(chainKey, pallet, storage);
  }

  /**
   * Clear the cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
    this.hitRate = 0;
    this.totalRequests = 0;
  }
}

// Create a singleton instance for use across the application
export const dynamicStorageDetector = new DynamicStorageDetector();

/**
 * Legacy compatibility function - replaces the old detectStorageParameters
 */
export function detectStorageParameters(
  pallet: string,
  storage: string,
  chainKey: string = 'polkadot'
): string[] {
  const info = dynamicStorageDetector.detectParameters(chainKey, pallet, storage);
  return info.required;
}

/**
 * Enhanced function with full parameter information
 */
export function getStorageParameterInfo(
  chainKey: string,
  pallet: string,
  storage: string
): StorageParameterInfo {
  return dynamicStorageDetector.detectParameters(chainKey, pallet, storage);
}

/**
 * Validation function for storage parameters
 */
export function validateStorageParameters(
  chainKey: string,
  pallet: string,
  storage: string,
  providedParams: any[]
): { valid: boolean; error?: string; expected: string[] } {
  const info = dynamicStorageDetector.detectParameters(chainKey, pallet, storage);

  if (providedParams.length !== info.required.length) {
    return {
      valid: false,
      error: `Expected ${info.required.length} parameters, got ${providedParams.length}`,
      expected: info.required
    };
  }

  return {
    valid: true,
    expected: info.required
  };
}

/**
 * Generate smart defaults for storage parameters
 */
export function generateParameterDefaults(paramTypes: string[]): Record<string, any> {
  return paramTypes.reduce((defaults, type, index) => {
    const key = `param${index + 1}`;
    switch(type) {
      case 'AccountId':
      case 'SS58String':
        defaults[key] = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
        break;
      case 'AssetId':
        defaults[key] = '1'; // Common asset ID default
        break;
      case 'u32':
      case 'u64':
        defaults[key] = '0';
        break;
      case 'u128':
      case 'Balance':
        defaults[key] = '1000000000000'; // 1 DOT in plancks
        break;
      case 'Hash':
        defaults[key] = '0x0000000000000000000000000000000000000000000000000000000000000000';
        break;
      case 'bool':
        defaults[key] = false;
        break;
      default:
        defaults[key] = '';
    }
    return defaults;
  }, {} as Record<string, any>);
}

