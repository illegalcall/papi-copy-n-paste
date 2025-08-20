/**
 * Dynamic Storage Parameter Detection Engine
 *
 * Replaces hard-coded storage parameter detection with a metadata-driven approach
 * that automatically supports all PAPI chains and storage items.
 *
 * This is Phase 2 of the Dynamic Storage Detection Plan implementation.
 */

import { storageMetadata, getStorageParameters, hasStorage, getSupportedChains, getSupportedPallets, getSupportedStorage } from '../../../packages/core/generated/storage-metadata';


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
   * Uses runtime introspection first, then fallback to generated metadata
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

    // Try runtime detection first (most accurate)
    const runtimeResult = this.detectFromRuntime(chainKey, pallet, storage);
    if (runtimeResult) {
      this.cache.set(cacheKey, runtimeResult);
      return runtimeResult;
    }

    // Fallback to generated metadata
    const metadataResult = this.detectFromMetadata(chainKey, pallet, storage);
    if (metadataResult) {
      this.cache.set(cacheKey, metadataResult);
      return metadataResult;
    }
    throw new Error(`No metadata available for ${chainKey}.${pallet}.${storage} - metadata may be incomplete or missing`);
  }

  /**
   * Primary detection: Use PAPI runtime introspection (like papi-console)
   */
  private detectFromRuntime(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    try {
      // Import runtime detector dynamically to avoid circular dependencies
      const { runtimeStorageDetector } = require('./runtimeStorageDetection');

      // Use async detection but handle it synchronously for now
      // In a real implementation, you might want to make this method async
      const result = runtimeStorageDetector.detectParameters(chainKey, pallet, storage);

      // If runtime detection returns a failure result, don't use it - let metadata fallback handle it
      if (result.description && result.description.includes('Failed to analyze')) {
        return null;
      }

      // Only use runtime result if it has actual parameters or is explicitly known to be parameterless
      if (result.required.length > 0 || result.isPlain) {
        // Convert to our format
        return {
          required: result.required,
          optional: result.optional,
          description: result.description || `Runtime storage for ${pallet}.${storage}`,
          returnType: result.returnType || 'unknown'
        };
      }

      // If runtime shows 0 parameters but we're not sure it's correct, fall back to metadata
      return null;

    } catch (error) {
      // Silent fallback on runtime detection errors
      return null;
    }
  }

  /**
   * Fallback detection: Use generated metadata with known fixes for the specific chain
   */
  private detectFromMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    try {
      // Apply known fixes for incorrect generated metadata
      const knownFix = this.getKnownStorageFix(chainKey, pallet, storage);
      if (knownFix) {
        return knownFix;
      }

      if (!hasStorage(chainKey, pallet, storage)) {
        return null;
      }

      const paramTypes = getStorageParameters(chainKey, pallet, storage);
      const metadata = storageMetadata[chainKey]?.pallets?.[pallet]?.[storage];

      if (paramTypes && paramTypes.length >= 0) {
        return {
          required: paramTypes,
          optional: [],
          description: metadata?.description || `Generated metadata for ${chainKey}.${pallet}.${storage}`,
          returnType: metadata?.returnType || 'Codec'
        };
      }
    } catch (error) {
      // Silent fallback on metadata errors
    }

    return null;
  }

  /**
   * Known fixes for storage entries where our generated metadata is incorrect
   * This provides a scalable way to fix specific known issues while the generation is improved
   */
  private getKnownStorageFix(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    const key = `${chainKey}:${pallet}:${storage}`;

    // Known storage entries that require parameters but our metadata shows empty
    const knownFixes: Record<string, StorageParameterInfo> = {
      // Staking pallet fixes - these are multi-key storage entries
      'polkadot:Staking:ErasStakers': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Exposure of validator at era - takes era number and validator account',
        returnType: 'Exposure'
      },
      'polkadot:Staking:ErasStakersClipped': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Clipped exposure of validator at era - takes era number and validator account',
        returnType: 'Exposure'
      },
      'polkadot:Staking:ErasStakersOverview': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Overview of validator exposure at era - takes era number and validator account',
        returnType: 'PagedExposureMetadata'
      },
      'polkadot:Staking:ErasStakersPaged': {
        required: ['u32', 'AccountId', 'u32'],
        optional: [],
        description: 'Paged exposure of validator at era - takes era number, validator account, and page',
        returnType: 'ExposurePage'
      },
      'polkadot:Staking:ErasValidatorReward': {
        required: ['u32'],
        optional: [],
        description: 'Validator reward points for era - takes era number',
        returnType: 'Balance'
      },
      'polkadot:Staking:ErasRewardPoints': {
        required: ['u32'],
        optional: [],
        description: 'Reward points for era - takes era number',
        returnType: 'EraRewardPoints'
      },
      'polkadot:Staking:ErasValidatorPrefs': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Validator preferences for era - takes era number and validator account',
        returnType: 'ValidatorPrefs'
      },

      // Apply the same fixes to other chains that have Staking
      'kusama:Staking:ErasStakers': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Exposure of validator at era - takes era number and validator account',
        returnType: 'Exposure'
      },
      'kusama:Staking:ErasStakersClipped': {
        required: ['u32', 'AccountId'],
        optional: [],
        description: 'Clipped exposure of validator at era - takes era number and validator account',
        returnType: 'Exposure'
      },

      // Democracy pallet - common multi-key storage entries
      'polkadot:Democracy:VotingOf': {
        required: ['AccountId'],
        optional: [],
        description: 'Voting records for account - takes account ID',
        returnType: 'Voting'
      },
      'polkadot:Democracy:ReferendumInfoOf': {
        required: ['u32'],
        optional: [],
        description: 'Information about referendum - takes referendum index',
        returnType: 'Option<ReferendumInfo>'
      },

      // ConvictionVoting (modern democracy) - from OpenGov
      'polkadot:ConvictionVoting:VotingFor': {
        required: ['AccountId', 'u16'],
        optional: [],
        description: 'Voting records for account and class - takes account ID and class',
        returnType: 'Voting'
      },
      'polkadot:ConvictionVoting:ClassLocksFor': {
        required: ['AccountId'],
        optional: [],
        description: 'Class locks for account - takes account ID',
        returnType: 'Vec<(u16, Balance)>'
      },

      // Balances pallet - common cases
      'polkadot:Balances:Account': {
        required: ['AccountId'],
        optional: [],
        description: 'Account balance information - takes account ID',
        returnType: 'AccountData'
      },
      'polkadot:Balances:Locks': {
        required: ['AccountId'],
        optional: [],
        description: 'Balance locks for account - takes account ID',
        returnType: 'Vec<BalanceLock>'
      },
      'polkadot:Balances:Reserves': {
        required: ['AccountId'],
        optional: [],
        description: 'Reserved balances for account - takes account ID',
        returnType: 'Vec<ReserveData>'
      }
    };

    return knownFixes[key] || null;
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

// Clear cache on app start to ensure fresh detection
if (typeof window !== 'undefined') {
  dynamicStorageDetector.clearCache();

  // Also clear runtime detector cache
  import('./runtimeStorageDetection').then(({ runtimeStorageDetector }) => {
    runtimeStorageDetector.clearCache();
  });
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


