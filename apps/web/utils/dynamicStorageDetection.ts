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

    // Primary: Use generated metadata
    const result = this.detectFromMetadata(chainKey, pallet, storage) ||
                  this.detectFromCrossChain(chainKey, pallet, storage) ||
                  this.detectFromPatterns(pallet, storage);

    // Cache the result
    this.cache.set(cacheKey, result);

    return result;
  }

  /**
   * Primary detection: Use generated metadata for the specific chain
   */
  private detectFromMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    if (!hasStorage(chainKey, pallet, storage)) {
      return null;
    }

    const paramTypes = getStorageParameters(chainKey, pallet, storage);
    const metadata = storageMetadata[chainKey]?.pallets?.[pallet]?.[storage];

    if (metadata) {
      return {
        required: paramTypes,
        optional: [],
        description: metadata.description,
        returnType: metadata.returnType
      };
    }

    return null;
  }

  /**
   * Secondary detection: Cross-chain lookup (try other chains)
   */
  private detectFromCrossChain(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    const supportedChains = getSupportedChains();

    for (const otherChain of supportedChains) {
      if (otherChain === chainKey) continue; // Skip the original chain

      if (hasStorage(otherChain, pallet, storage)) {
        const paramTypes = getStorageParameters(otherChain, pallet, storage);
        const metadata = storageMetadata[otherChain]?.pallets?.[pallet]?.[storage];

        console.warn(`🔄 Using ${otherChain} metadata for ${chainKey}.${pallet}.${storage}`);

        return {
          required: paramTypes,
          optional: [],
          description: `Cross-chain metadata from ${otherChain}: ${metadata?.description || ''}`,
          returnType: metadata?.returnType
        };
      }
    }

    return null;
  }

  /**
   * Tertiary detection: Enhanced pattern matching with semantic analysis
   */
  private detectFromPatterns(pallet: string, storage: string): StorageParameterInfo {
    // Enhanced patterns from the plan with semantic analysis
    const patterns = [
      // No parameters (common global state)
      { pattern: /^(Total|Current|Next|Last|Min|Max)/, params: [] },
      { pattern: /^(Issuance|Supply|Index|Number|Now|Deposit)$/, params: [] },
      { pattern: /Count$/, params: [] }, // Anything ending with Count (BountyCount, EventCount, etc.)
      { pattern: /^(InactiveIssuance|TotalIssuance|ExtrinsicCount|EventCount|BountyCount)$/, params: [] },

      // Account-based (single AccountId parameter)
      { pattern: /^(Account|Balance|Lock|Reserve|Hold|Freeze)s?$/, params: ["AccountId"] },
      { pattern: /(Of|For)Account$/, params: ["AccountId"] },
      { pattern: /^(Bonded|Payee|Validators|Nominators|Ledger)$/, params: ["AccountId"] },

      // ID-based (requires numeric/hash ID)
      { pattern: /^(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },
      { pattern: /(Of|For)(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },
      { pattern: /^(Agenda|Lookup|Reports|Disputes)$/, params: ["u32"] },

      // Complex mappings (multiple parameters)
      { pattern: /^(Era.*Staker|Session.*Validator)/, params: ["u32", "AccountId"] },
      { pattern: /^Asset(Account|Approval)/, params: ["AssetId", "AccountId"] },
      { pattern: /^(Claimed|Slashing|Validator.*Era|Nominator.*Era)/, params: ["u32", "AccountId"] },

      // Hash-based storage
      { pattern: /^(BlockHash|ParentHash|CodeHash)$/, params: ["Hash"] },
      { pattern: /^(Preimage|Code)For$/, params: ["Hash"] },

      // Multi-key mappings
      { pattern: /^(Keys|QueuedKeys|NextKeys)$/, params: ["AccountId"] },
      { pattern: /^(Proxies|Announcements|Multisigs)$/, params: ["AccountId"] },

      // Pallet-specific patterns
      ...(pallet === 'Balances' ? [
        { pattern: /^(Account|Locks|Reserves|Holds|Freezes)$/, params: ["AccountId"] },
        { pattern: /^(TotalIssuance|InactiveIssuance)$/, params: [] }
      ] : []),
      ...(pallet === 'System' ? [
        { pattern: /^(Account)$/, params: ["AccountId"] },
        { pattern: /^(BlockHash|ExtrinsicData)$/, params: ["u32"] },
        { pattern: /^(EventTopics)$/, params: ["Hash"] }
      ] : []),
      ...(pallet === 'Staking' ? [
        { pattern: /^(Bonded|Ledger|Payee|Validators|Nominators)$/, params: ["AccountId"] },
        { pattern: /^(Eras.*Staker|ClaimedRewards|ValidatorSlash|NominatorSlash)/, params: ["u32", "AccountId"] }
      ] : [])
    ];

    // Try each pattern
    for (const { pattern, params } of patterns) {
      if (pattern.test(storage)) {
        return {
          required: params,
          optional: [],
          description: `Pattern-matched: ${pattern.source} → [${params.join(', ')}]`,
          returnType: 'Codec'
        };
      }
    }

    // Default: assume no parameters for safety
    console.warn(`⚠️  No pattern match for ${pallet}.${storage}, defaulting to no parameters`);
    return {
      required: [],
      optional: [],
      description: 'Default: no parameters (pattern fallback)',
      returnType: 'Codec'
    };
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

/**
 * Debug function to show detection process
 */
export function debugStorageDetection(
  chainKey: string,
  pallet: string,
  storage: string
): {
  fromMetadata: StorageParameterInfo | null;
  fromCrossChain: StorageParameterInfo | null;
  fromPatterns: StorageParameterInfo;
  final: StorageParameterInfo;
} {
  const detector = new DynamicStorageDetector();

  const fromMetadata = detector['detectFromMetadata'](chainKey, pallet, storage);
  const fromCrossChain = !fromMetadata ? detector['detectFromCrossChain'](chainKey, pallet, storage) : null;
  const fromPatterns = detector['detectFromPatterns'](pallet, storage);
  const final = detector.detectParameters(chainKey, pallet, storage);

  return {
    fromMetadata,
    fromCrossChain,
    fromPatterns,
    final
  };
}