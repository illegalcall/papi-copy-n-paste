/**
 * Hook for managing constant query state
 */

import { useState, useCallback } from "react";

export function useConstantQuery() {
  const [selectedConstant, setSelectedConstant] = useState<
    { pallet: string; constant: any } | undefined
  >();
  const [canRunConstant, setCanRunConstant] = useState(false);

  // Handle constant selection
  const handleConstantSelect = useCallback((pallet: string, constant: any) => {
    console.log(`⚙️ Constant selected: ${pallet}.${constant.name}`);

    setSelectedConstant({ pallet, constant });
    setCanRunConstant(true); // Constants are always queryable
  }, []);

  // Clear constant selection
  const clearConstantSelection = useCallback(() => {
    setSelectedConstant(undefined);
    setCanRunConstant(false);
  }, []);

  // Reset all constant state (when network changes)
  const resetConstantState = useCallback(() => {
    setSelectedConstant(undefined);
    setCanRunConstant(false);
  }, []);

  return {
    // State
    selectedConstant,
    canRunConstant,

    // Actions
    handleConstantSelect,
    clearConstantSelection,
    resetConstantState,

    // Manual setters for compatibility
    setSelectedConstant,
  };
}