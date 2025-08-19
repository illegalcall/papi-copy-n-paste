/**
 * Hook for managing call selection and form data
 */

import { useState, useCallback } from "../utils/reactImports";
import { PalletCall } from "@workspace/core";
import type { FormData } from "../types/forms";

export function useCallSelection() {
  const [selectedCall, setSelectedCall] = useState<
    { pallet: string; call: PalletCall } | undefined
  >();
  const [formData, setFormData] = useState<FormData>({});
  const [canRun, setCanRun] = useState(false);

  // Handle call selection
  const handleCallSelect = useCallback((pallet: string, call: PalletCall) => {
    setSelectedCall({ pallet, call });
    setFormData({}); // Reset form data when selecting new call
    setCanRun(false); // Reset validation
  }, []);

  // Handle form data changes
  const handleFormChange = useCallback((newFormData: FormData) => {
    setFormData(newFormData);
  }, []);

  // Handle form validation changes
  const handleValidChange = useCallback((isValid: boolean) => {
    setCanRun(isValid);
  }, []);

  // Clear call selection
  const clearCallSelection = useCallback(() => {
    setSelectedCall(undefined);
    setFormData({});
    setCanRun(false);
  }, []);

  // Reset all call state (when network changes)
  const resetCallState = useCallback(() => {
    setSelectedCall(undefined);
    setFormData({});
    setCanRun(false);
  }, []);

  return {
    // State
    selectedCall,
    formData,
    canRun,

    // Actions
    handleCallSelect,
    handleFormChange,
    handleValidChange,
    clearCallSelection,
    resetCallState,

    // Manual setters for compatibility
    setSelectedCall,
    setFormData,
    setCanRun,
  };
}
