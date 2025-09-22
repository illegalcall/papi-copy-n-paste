/**
 * Hook for managing constant selection
 */

import { useState, useCallback } from "react";
import { PalletConstant } from "@workspace/core";

export function useConstantSelection() {
  const [selectedConstant, setSelectedConstant] = useState<
    { pallet: string; constant: PalletConstant } | undefined
  >();

  // Handle constant selection
  const handleConstantSelect = useCallback((pallet: string, constant: PalletConstant) => {
    setSelectedConstant({ pallet, constant });
  }, []);

  // Clear constant selection
  const clearConstantSelection = useCallback(() => {
    setSelectedConstant(undefined);
  }, []);

  // Reset all constant state (when network changes)
  const resetConstantState = useCallback(() => {
    setSelectedConstant(undefined);
  }, []);

  return {
    // State
    selectedConstant,

    // Actions
    handleConstantSelect,
    clearConstantSelection,
    resetConstantState,

    // Manual setters for compatibility
    setSelectedConstant,
  };
}