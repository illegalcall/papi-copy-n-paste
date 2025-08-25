/**
 * Hook for managing error selection
 */

import { useState, useCallback } from "react";
import { PalletError } from "@workspace/core";

export function useErrorSelection() {
  const [selectedError, setSelectedError] = useState<
    { pallet: string; error: PalletError } | undefined
  >();

  // Handle error selection
  const handleErrorSelect = useCallback((pallet: string, error: PalletError) => {
    setSelectedError({ pallet, error });
  }, []);

  // Clear error selection
  const clearErrorSelection = useCallback(() => {
    setSelectedError(undefined);
  }, []);

  // Reset all error state (when network changes)
  const resetErrorState = useCallback(() => {
    setSelectedError(undefined);
  }, []);

  return {
    // State
    selectedError,

    // Actions
    handleErrorSelect,
    clearErrorSelection,
    resetErrorState,

    // Manual setters for compatibility
    setSelectedError,
  };
}