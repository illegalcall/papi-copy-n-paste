/**
 * Hook for managing storage query state and validation
 */

import { useState, useCallback } from "react";
import { isStorageQueryValid } from "../utils/storageHelpers";

export function useStorageQuery(chainKey: string = 'polkadot') {
  const [selectedStorage, setSelectedStorage] = useState<
    { pallet: string; storage: any } | undefined
  >();
  const [storageQueryType, setStorageQueryType] = useState<string>("getValue");
  const [storageParams, setStorageParams] = useState<Record<string, any>>({});
  const [canRunStorage, setCanRunStorage] = useState(false);

  // Handle storage selection
  const handleStorageSelect = useCallback((pallet: string, storage: any) => {
    setSelectedStorage({ pallet, storage });
    setStorageParams({}); // Reset params when selecting new storage

    // Update validation state with dynamic detection
    const isValid = isStorageQueryValid({ pallet, storage }, {}, chainKey);
    setCanRunStorage(isValid);
  }, [chainKey]);

  // Handle storage query type change
  const handleStorageQueryTypeChange = useCallback(
    (newQueryType: string) => {
      setStorageQueryType(newQueryType);

      // Re-validate with current params using dynamic detection
      const isValid = isStorageQueryValid(selectedStorage, storageParams, chainKey);
      setCanRunStorage(isValid);
    },
    [selectedStorage, storageParams, chainKey],
  );

  // Handle storage parameter changes
  const handleStorageParamsChange = useCallback(
    (newParams: Record<string, any>) => {
      setStorageParams(newParams);

      // Update validation state with dynamic detection
      const isValid = isStorageQueryValid(selectedStorage, newParams, chainKey);
      setCanRunStorage(isValid);
    },
    [selectedStorage, chainKey],
  );

  // Clear storage selection
  const clearStorageSelection = useCallback(() => {
    setSelectedStorage(undefined);
    setStorageParams({});
    setStorageQueryType("getValue");
    setCanRunStorage(false);
  }, []);

  // Reset all storage state (when network changes)
  const resetStorageState = useCallback(() => {
    setSelectedStorage(undefined);
    setStorageParams({});
    setStorageQueryType("getValue");
    setCanRunStorage(false);
  }, []);

  return {
    // State
    selectedStorage,
    storageQueryType,
    storageParams,
    canRunStorage,

    // Actions
    handleStorageSelect,
    handleStorageQueryTypeChange,
    handleStorageParamsChange,
    clearStorageSelection,
    resetStorageState,

    // Manual setters for compatibility
    setSelectedStorage,
    setStorageQueryType,
    setStorageParams,
  };
}
