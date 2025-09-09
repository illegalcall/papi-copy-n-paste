/**
 * Hook for managing call selection and form data
 */

import { useState, useCallback } from 'react'
import { PalletCall } from "@workspace/core"

export function useCallSelection() {
  const [selectedCall, setSelectedCall] = useState<{ pallet: string; call: PalletCall } | undefined>()
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [canRun, setCanRun] = useState(false)

  // Handle call selection
  const handleCallSelect = useCallback((pallet: string, call: PalletCall) => {
    console.log(`📋 Call selected: ${pallet}.${call.name}`)
    console.log('Call args:', call.args)
    
    setSelectedCall({ pallet, call })
    setFormData({}) // Reset form data when selecting new call
    setCanRun(false) // Reset validation
  }, [])

  // Handle form data changes
  const handleFormChange = useCallback((newFormData: Record<string, any>) => {
    console.log('📝 Form data changed:', newFormData)
    setFormData(newFormData)
  }, [])

  // Handle form validation changes
  const handleValidChange = useCallback((isValid: boolean) => {
    setCanRun(isValid)
  }, [])

  // Clear call selection
  const clearCallSelection = useCallback(() => {
    setSelectedCall(undefined)
    setFormData({})
    setCanRun(false)
  }, [])

  // Reset all call state (when network changes)
  const resetCallState = useCallback(() => {
    setSelectedCall(undefined)
    setFormData({})
    setCanRun(false)
  }, [])

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
    setCanRun
  }
}