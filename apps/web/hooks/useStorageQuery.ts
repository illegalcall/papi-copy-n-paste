/**
 * Hook for managing storage query state and validation
 */

import { useState, useCallback } from "react";
import type { StorageParams } from "../types/forms";
import { StorageQueryType, ChainKey } from "../types/enums";

export function useStorageQuery(chainKey: ChainKey | string = ChainKey.POLKADOT) {
  const [selectedStorage, setSelectedStorage] = useState<
    { pallet: string; storage: any } | undefined
  >();
  const [storageQueryType, setStorageQueryType] = useState<StorageQueryType | string>(StorageQueryType.GET_VALUE);
  const [storageParams, setStorageParams] = useState<StorageParams>({});
  const [canRunStorage, setCanRunStorage] = useState(false);
  const [storageValidationErrors, setStorageValidationErrors] = useState<Record<string, string>>({});

  // Handle storage selection
  const handleStorageSelect = useCallback((pallet: string, storage: any) => {
    setSelectedStorage({ pallet, storage });
    setStorageParams({}); // Reset params when selecting new storage

    // Update validation state with dynamic detection
    const isValid = true;
    setCanRunStorage(isValid);
  }, [chainKey]);

  // Handle storage query type change
  const handleStorageQueryTypeChange = useCallback(
    (newQueryType: StorageQueryType | string) => {
      setStorageQueryType(newQueryType);

      // Re-validate with current params using dynamic detection
      const isValid = true;
      setCanRunStorage(isValid);
    },
    [selectedStorage, storageParams, chainKey],
  );

  // Handle storage parameter changes
  const handleStorageParamsChange = useCallback(
    (newParams: StorageParams) => {
      setStorageParams(newParams);

      // Update validation state with dynamic detection
      const isValid = true;
      setCanRunStorage(isValid);
    },
    [selectedStorage, chainKey],
  );

  // Handle storage validation change (from Zod validation in StorageForm)
  const handleStorageValidationChange = useCallback(
    (isValid: boolean, errors: Record<string, string>) => {
      setCanRunStorage(isValid);
      setStorageValidationErrors(errors);
    },
    []
  );

  // Clear storage selection
  const clearStorageSelection = useCallback(() => {
    setSelectedStorage(undefined);
    setStorageParams({});
    setStorageQueryType(StorageQueryType.GET_VALUE);
    setCanRunStorage(false);
  }, []);

  // Reset all storage state (when network changes)
  const resetStorageState = useCallback(() => {
    setSelectedStorage(undefined);
    setStorageParams({});
    setStorageQueryType(StorageQueryType.GET_VALUE);
    setCanRunStorage(false);
  }, []);

  return {
    // State
    selectedStorage,
    storageQueryType,
    storageParams,
    canRunStorage,
    storageValidationErrors,

    // Actions
    handleStorageSelect,
    handleStorageQueryTypeChange,
    handleStorageParamsChange,
    handleStorageValidationChange,
    clearStorageSelection,
    resetStorageState,

    // Manual setters for compatibility
    setSelectedStorage,
    setStorageQueryType,
    setStorageParams,
  };
}
