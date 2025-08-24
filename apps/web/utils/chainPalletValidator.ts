/**
 * Chain-specific pallet validation using PAPI descriptors
 *
 * This module ensures we only show pallets that actually exist on each specific chain
 * by checking the runtime metadata through PAPI descriptors.
 */

import { getDescriptorForChain } from "@workspace/core/descriptors";

/**
 * Cache for pallet availability to avoid repeated descriptor lookups
 */
class ChainPalletValidator {
  private cache = new Map<string, Set<string>>();

  /**
   * Check if a pallet exists on a specific chain using runtime metadata
   */
  isPalletAvailable(chainKey: string, palletName: string): boolean {
    const availablePallets = this.getAvailablePallets(chainKey);
    return availablePallets.has(palletName.toLowerCase());
  }

  /**
   * Get all pallets available on a specific chain
   */
  getAvailablePallets(chainKey: string): Set<string> {
    const cacheKey = chainKey;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Get the descriptor for this chain
      const descriptor = getDescriptorForChain(chainKey);

      // Get metadata from the descriptor
      const metadata = descriptor.getMetadata();

      // Extract pallet names from the metadata
      const palletNames = new Set<string>();

      if (metadata && metadata.pallets) {
        for (const pallet of metadata.pallets) {
          if (pallet.name) {
            palletNames.add(pallet.name.toLowerCase());
          }
        }
      }

      // Cache the result
      this.cache.set(cacheKey, palletNames);


      return palletNames;

    } catch (error) {
      console.warn(`Failed to get pallets for ${chainKey}:`, error);

      // Return empty set on error - better to show nothing than wrong pallets
      const emptySet = new Set<string>();
      this.cache.set(cacheKey, emptySet);
      return emptySet;
    }
  }

  /**
   * Filter a list of pallets to only include those available on the chain
   */
  filterAvailablePallets<T extends { name: string }>(
    chainKey: string,
    pallets: T[]
  ): T[] {
    const availablePallets = this.getAvailablePallets(chainKey);

    return pallets.filter(pallet =>
      availablePallets.has(pallet.name.toLowerCase())
    );
  }

  /**
   * Check if a storage item exists on a specific chain
   */
  isStorageAvailable(chainKey: string, palletName: string, storageName: string): boolean {
    try {
      const descriptor = getDescriptorForChain(chainKey);
      const metadata = descriptor.getMetadata();

      if (!metadata || !metadata.pallets) {
        return false;
      }

      // Find the pallet
      const pallet = metadata.pallets.find((p: any) =>
        p.name.toLowerCase() === palletName.toLowerCase()
      );

      if (!pallet || !pallet.storage || !pallet.storage.items) {
        return false;
      }

      // Check if storage item exists
      const storageItem = pallet.storage.items.find((item: any) =>
        item.name.toLowerCase() === storageName.toLowerCase()
      );

      return !!storageItem;

    } catch (error) {
      console.warn(`Failed to check storage ${palletName}.${storageName} on ${chainKey}:`, error);
      return false;
    }
  }

  /**
   * Clear cache for testing or when switching chains
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get debug info about what pallets are available on each chain
   */
  getDebugInfo(): Record<string, string[]> {
    const info: Record<string, string[]> = {};

    for (const [chainKey, pallets] of this.cache.entries()) {
      info[chainKey] = Array.from(pallets).sort();
    }

    return info;
  }
}

// Export singleton instance
export const chainPalletValidator = new ChainPalletValidator();

/**
 * Convenience functions for direct use
 */
export function isPalletAvailable(chainKey: string, palletName: string): boolean {
  return chainPalletValidator.isPalletAvailable(chainKey, palletName);
}

export function isStorageAvailable(chainKey: string, palletName: string, storageName: string): boolean {
  return chainPalletValidator.isStorageAvailable(chainKey, palletName, storageName);
}

export function filterChainSpecificPallets<T extends { name: string }>(
  chainKey: string,
  pallets: T[]
): T[] {
  return chainPalletValidator.filterAvailablePallets(chainKey, pallets);
}