/**
 * Dynamic Call Parameter Detection Engine
 *
 * Metadata-driven approach for automatically detecting call/transaction parameters
 * across all PAPI chains. Mirrors the storage detection system but for calls/transactions.
 */

import { callMetadata, getCallParameters, hasCall, getSupportedChains, getSupportedPallets, getSupportedCalls } from '../../../packages/core/generated/call-metadata';

export interface CallParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export class DynamicCallDetector {
  private cache = new Map<string, CallParameterInfo>();
  private hitRate = 0;
  private totalRequests = 0;

  /**
   * Detect call parameters for a given chain, pallet, and call
   * Uses runtime introspection first, then fallback to generated metadata
   */
  detectParameters(
    chainKey: string,
    pallet: string,
    call: string
  ): CallParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${call}`;
    this.totalRequests++;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.hitRate++;
      const result = this.cache.get(cacheKey)!;
      return result;
    }

    // Try runtime detection first (most accurate)
    const runtimeResult = this.detectFromRuntime(chainKey, pallet, call);
    if (runtimeResult) {
      this.cache.set(cacheKey, runtimeResult);
      return runtimeResult;
    }

    // Fallback to generated metadata
    const metadataResult = this.detectFromMetadata(chainKey, pallet, call);
    if (metadataResult) {
      this.cache.set(cacheKey, metadataResult);
      return metadataResult;
    }

    throw new Error(`No metadata available for ${chainKey}.${pallet}.${call} - metadata may be incomplete or missing`);
  }

  /**
   * Primary detection: Use PAPI runtime introspection
   */
  private detectFromRuntime(chainKey: string, pallet: string, call: string): CallParameterInfo | null {
    try {
      // Runtime detection not yet implemented - fallback to metadata
      // TODO: Implement runtime call detection
      return null;

      // Import runtime detector dynamically to avoid circular dependencies
      // const { runtimeCallDetector } = require('./runtimeCallDetection');

      // const result = runtimeCallDetector.detectParameters(chainKey, pallet, call);

      // // If runtime detection returns a failure result, don't use it
      // if (result.description && result.description.includes('Failed to analyze')) {
      //   return null;
      // }

      // // Only use runtime result if it has actual parameters or is explicitly known to be parameterless
      // if (result.required.length > 0 || result.isPlain) {
      //   return {
      //     required: result.required,
      //     optional: result.optional,
      //     description: result.description || `Runtime call for ${pallet}.${call}`,
      //     returnType: result.returnType || 'void'
      //   };
      // }

      // return null;
    } catch (error) {
      // Silent fallback on runtime detection errors
      return null;
    }
  }

  /**
   * Fallback detection: Use generated metadata with known fixes
   */
  private detectFromMetadata(chainKey: string, pallet: string, call: string): CallParameterInfo | null {
    try {
      // Apply known fixes for incorrect generated metadata
      const knownFix = this.getKnownCallFix(chainKey, pallet, call);
      if (knownFix) {
        return knownFix;
      }

      if (!hasCall(chainKey, pallet, call)) {
        return null;
      }

      const paramTypes = getCallParameters(chainKey, pallet, call);
      const metadata = callMetadata[chainKey]?.pallets?.[pallet]?.[call];

      if (paramTypes && paramTypes.length >= 0) {
        return {
          required: paramTypes,
          optional: [],
          description: metadata?.description || `Generated metadata for ${chainKey}.${pallet}.${call}`,
          returnType: metadata?.returnType || 'void'
        };
      }
    } catch (error) {
      // Silent fallback on metadata errors
    }

    return null;
  }

  /**
   * Known fixes for call entries where our generated metadata is incorrect
   */
  private getKnownCallFix(chainKey: string, pallet: string, call: string): CallParameterInfo | null {
    const key = `${chainKey}:${pallet}:${call}`;

    // Known call entries with correct parameters
    const knownFixes: Record<string, CallParameterInfo> = {
      // Balances pallet fixes
      'polkadot:Balances:transfer_allow_death': {
        required: ['AccountId', 'Balance'],
        optional: [],
        description: 'Transfer tokens to another account (allows death of sender account)',
        returnType: 'void'
      },
      'polkadot:Balances:transfer_keep_alive': {
        required: ['AccountId', 'Balance'],
        optional: [],
        description: 'Transfer tokens to another account (keeps sender account alive)',
        returnType: 'void'
      },
      'polkadot:Balances:force_transfer': {
        required: ['AccountId', 'AccountId', 'Balance'],
        optional: [],
        description: 'Force transfer from one account to another (requires sudo)',
        returnType: 'void'
      },

      // System pallet fixes
      'polkadot:System:remark': {
        required: ['bytes'],
        optional: [],
        description: 'Make an on-chain remark',
        returnType: 'void'
      },
      'polkadot:System:set_code': {
        required: ['bytes'],
        optional: [],
        description: 'Set the new runtime code',
        returnType: 'void'
      },

      // Assets pallet fixes (for AssetHub chains)
      'polkadot:Assets:transfer': {
        required: ['AssetId', 'AccountId', 'Balance'],
        optional: [],
        description: 'Transfer asset tokens to another account',
        returnType: 'void'
      },
      'polkadot:Assets:mint': {
        required: ['AssetId', 'AccountId', 'Balance'],
        optional: [],
        description: 'Mint asset tokens to an account',
        returnType: 'void'
      },
      'polkadot:Assets:burn': {
        required: ['AssetId', 'AccountId', 'Balance'],
        optional: [],
        description: 'Burn asset tokens from an account',
        returnType: 'void'
      },

      // Staking pallet fixes
      'polkadot:Staking:bond': {
        required: ['AccountId', 'Balance', 'RewardDestination'],
        optional: [],
        description: 'Bond tokens for staking',
        returnType: 'void'
      },
      'polkadot:Staking:nominate': {
        required: ['Vec<AccountId>'],
        optional: [],
        description: 'Nominate validators for staking rewards',
        returnType: 'void'
      },
      'polkadot:Staking:unbond': {
        required: ['Balance'],
        optional: [],
        description: 'Unbond staked tokens',
        returnType: 'void'
      },

      // Democracy pallet fixes
      'polkadot:Democracy:propose': {
        required: ['Hash', 'Balance'],
        optional: [],
        description: 'Propose a referendum',
        returnType: 'void'
      },
      'polkadot:Democracy:vote': {
        required: ['u32', 'AccountVote'],
        optional: [],
        description: 'Vote on a referendum',
        returnType: 'void'
      },
      'polkadot:Democracy:second': {
        required: ['u32', 'u32'],
        optional: [],
        description: 'Second a proposal',
        returnType: 'void'
      },

      // Apply the same fixes to other chains
      'kusama:Balances:transfer_allow_death': {
        required: ['AccountId', 'Balance'],
        optional: [],
        description: 'Transfer tokens to another account (allows death of sender account)',
        returnType: 'void'
      },
      'kusama:Balances:transfer_keep_alive': {
        required: ['AccountId', 'Balance'],
        optional: [],
        description: 'Transfer tokens to another account (keeps sender account alive)',
        returnType: 'void'
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
   * Get supported calls for a pallet
   */
  getSupportedCalls(chainKey: string, pallet: string): string[] {
    return getSupportedCalls(chainKey, pallet);
  }

  /**
   * Check if a call exists
   */
  hasCall(chainKey: string, pallet: string, call: string): boolean {
    return hasCall(chainKey, pallet, call);
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
export const dynamicCallDetector = new DynamicCallDetector();

// Initialize client-side functionality when needed
let clientInitialized = false;

function initializeClientSide() {
  if (clientInitialized || typeof window === 'undefined') return;
  clientInitialized = true;

  // Clear cache on client initialization
  dynamicCallDetector.clearCache();

  // Also clear runtime detector cache (not yet implemented)
  // TODO: Implement runtime call detection
  // import('./runtimeCallDetection').then(({ runtimeCallDetector }) => {
  //   runtimeCallDetector.clearCache();
  // }).catch(() => {
  //   // Silently handle import errors
  // });
}

/**
 * Enhanced function with full parameter information
 */
export function getCallParameterInfo(
  chainKey: string,
  pallet: string,
  call: string
): CallParameterInfo {
  // Initialize client-side functionality on first use
  initializeClientSide();

  return dynamicCallDetector.detectParameters(chainKey, pallet, call);
}