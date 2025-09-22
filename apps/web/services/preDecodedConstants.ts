/**
 * Pre-decoded constants service
 *
 * Reads from the generated JSON file that contains all decoded constants
 * for instant access without any runtime decoding.
 */

// Import the generated constants
import decodedConstants from '@workspace/core/generated/decoded-constants.json';

export interface PreDecodedConstant {
  palletName: string;
  constantName: string;
  rawValue: string;
  decodedValue: any;
  type: string;
  docs?: string[];
  chainKey: string;
  extractedAt: string;
}

export interface ChainConstants {
  chainInfo: {
    name: string;
    extractedAt: string;
  };
  constants: PreDecodedConstant[];
}

export interface DecodedConstantsData {
  [chainKey: string]: ChainConstants;
}

class PreDecodedConstantsService {
  private constants: DecodedConstantsData;
  private constantLookup: Map<string, PreDecodedConstant>;

  constructor() {
    this.constants = decodedConstants as DecodedConstantsData;
    this.constantLookup = new Map();
    this.buildLookupIndex();
  }

  /**
   * Build an index for fast constant lookup
   */
  private buildLookupIndex(): void {
    for (const [chainKey, chainData] of Object.entries(this.constants)) {
      for (const constant of chainData.constants) {
        const key = this.getCacheKey(chainKey, constant.palletName, constant.constantName);
        this.constantLookup.set(key, constant);
      }
    }

  }

  /**
   * Get cache key for a constant
   */
  private getCacheKey(chainKey: string, palletName: string, constantName: string): string {
    return `${chainKey}:${palletName}:${constantName}`;
  }

  /**
   * Get a decoded constant value instantly
   */
  getDecodedConstant(
    chainKey: string,
    palletName: string,
    constantName: string
  ): PreDecodedConstant | null {
    const key = this.getCacheKey(chainKey, palletName, constantName);
    return this.constantLookup.get(key) || null;
  }

  /**
   * Check if a constant is available
   */
  hasConstant(chainKey: string, palletName: string, constantName: string): boolean {
    const key = this.getCacheKey(chainKey, palletName, constantName);
    return this.constantLookup.has(key);
  }

  /**
   * Get all constants for a chain
   */
  getChainConstants(chainKey: string): PreDecodedConstant[] {
    return this.constants[chainKey]?.constants || [];
  }

  /**
   * Get all constants for a specific pallet on a chain
   */
  getPalletConstants(chainKey: string, palletName: string): PreDecodedConstant[] {
    const chainConstants = this.getChainConstants(chainKey);
    return chainConstants.filter(constant => constant.palletName === palletName);
  }

  /**
   * Get chain information
   */
  getChainInfo(chainKey: string): { name: string; extractedAt: string } | null {
    return this.constants[chainKey]?.chainInfo || null;
  }

  /**
   * Get all available chains
   */
  getAvailableChains(): string[] {
    return Object.keys(this.constants);
  }

  /**
   * Get statistics about the loaded constants
   */
  getStats(): {
    totalChains: number;
    totalConstants: number;
    constantsByChain: Record<string, number>;
    lastExtracted: string;
  } {
    const totalChains = Object.keys(this.constants).length;
    const constantsByChain: Record<string, number> = {};
    let totalConstants = 0;
    let lastExtracted = '';

    for (const [chainKey, chainData] of Object.entries(this.constants)) {
      const chainConstantCount = chainData.constants.length;
      constantsByChain[chainKey] = chainConstantCount;
      totalConstants += chainConstantCount;

      // Find the most recent extraction date
      if (chainData.chainInfo.extractedAt > lastExtracted) {
        lastExtracted = chainData.chainInfo.extractedAt;
      }
    }

    return {
      totalChains,
      totalConstants,
      constantsByChain,
      lastExtracted
    };
  }

  /**
   * Search constants by name across all chains
   */
  searchConstants(query: string): PreDecodedConstant[] {
    const results: PreDecodedConstant[] = [];
    const lowerQuery = query.toLowerCase();

    for (const constant of this.constantLookup.values()) {
      if (
        constant.palletName.toLowerCase().includes(lowerQuery) ||
        constant.constantName.toLowerCase().includes(lowerQuery)
      ) {
        results.push(constant);
      }
    }

    return results;
  }
}

// Singleton instance
export const preDecodedConstantsService = new PreDecodedConstantsService();

export interface DecodeResult {
  success: boolean;
  value?: any;
  error?: string;
}

/**
 * Compatibility function that returns instant results from pre-decoded constants
 */
export function getInstantDecodedConstant(
  chainKey: string,
  palletName: string,
  constantName: string
): DecodeResult {
  const constant = preDecodedConstantsService.getDecodedConstant(chainKey, palletName, constantName);

  if (constant && constant.decodedValue !== null) {
    return {
      success: true,
      value: constant.decodedValue
    };
  }

  return {
    success: false,
    error: 'Constant not found in pre-decoded data'
  };
}