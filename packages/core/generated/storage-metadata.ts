/**
 * Auto-generated storage metadata from PAPI descriptors
 * Generated on: 2025-09-15T13:34:14.046Z
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

export const storageMetadata: { [chainKey: string]: ChainStorageMetadata } = {
  "astar": {
    "pallets": {}
  },
  "bifrost": {
    "pallets": {}
  },
  "hydration": {
    "pallets": {}
  },
  "kusama": {
    "pallets": {}
  },
  "moonbeam": {
    "pallets": {}
  },
  "paseo": {
    "pallets": {}
  },
  "polkadot": {
    "pallets": {}
  },
  "rococo": {
    "pallets": {}
  },
  "westend": {
    "pallets": {}
  }
};

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
