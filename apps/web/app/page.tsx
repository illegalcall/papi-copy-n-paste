"use client"

import { useEffect, useCallback } from "react"
import { Header } from "@/components/layout/header"
import { LeftPane } from "@/components/layout/left-pane"
import { CenterPane } from "@/components/layout/center-pane"
import { RightPane } from "@/components/layout/right-pane"
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Menu } from "lucide-react"

// Import our refactored hooks
import { useChainConnection } from "../hooks/useChainConnection"
import { useCallSelection } from "../hooks/useCallSelection"
import { useStorageQuery } from "../hooks/useStorageQuery"
import { useTransactionQueue } from "../hooks/useTransactionQueue"
import { useCodeGeneration } from "../hooks/useCodeGeneration"
import { useExecution } from "../hooks/useExecution"

// Import execution helpers
import { 
  executeRealTransaction, 
  executeMultipleTransactions, 
  executeMultipleStorageQueries,
  executeStorageQuery 
} from "../utils/transactionHelpers"

export default function Page() {
  // Chain connection and metadata
  const {
    selectedChain,
    selectedProvider,
    pallets,
    isLoadingMetadata,
    metadataError,
    chainStatus,
    api,
    handleNetworkChange
  } = useChainConnection()

  // Call selection and form handling
  const {
    selectedCall,
    formData,
    canRun: canRunCall,
    handleCallSelect,
    handleFormChange,
    handleValidChange,
    clearCallSelection,
    resetCallState
  } = useCallSelection()

  // Storage query handling
  const {
    selectedStorage,
    storageQueryType,
    storageParams,
    canRunStorage,
    handleStorageSelect,
    handleStorageQueryTypeChange,
    handleStorageParamsChange,
    clearStorageSelection,
    resetStorageState
  } = useStorageQuery()

  // Queue management
  const {
    methodQueue,
    storageQueue,
    addToMethodQueue,
    addToStorageQueue,
    removeFromMethodQueue,
    removeFromStorageQueue,
    clearMethodQueue,
    clearStorageQueue,
    clearAllQueues
  } = useTransactionQueue()

  // Code generation
  const {
    code,
    updateGeneratedCode,
    clearCode
  } = useCodeGeneration(selectedChain, selectedProvider)

  // Execution state
  const {
    isRunning,
    consoleOutput,
    activeTab,
    hasSelectedPallet,
    leftPaneOpen,
    handleRunClick,
    handleAbortClick,
    handleClearConsole,
    resetExecutionState,
    setConsoleOutput,
    setHasSelectedPallet,
    setLeftPaneOpen
  } = useExecution()

  // Update generated code when dependencies change
  useEffect(() => {
    updateGeneratedCode(
      selectedCall,
      selectedStorage,
      formData,
      storageQueryType,
      storageParams,
      methodQueue,
      storageQueue
    )
  }, [
    selectedCall,
    selectedStorage,
    formData,
    storageQueryType,
    storageParams,
    methodQueue,
    storageQueue,
    updateGeneratedCode
  ])

  // Update hasSelectedPallet when pallets are selected
  useEffect(() => {
    const hasPalletSelection = !!selectedCall || !!selectedStorage || methodQueue.length > 0 || storageQueue.length > 0
    setHasSelectedPallet(hasPalletSelection)
  }, [selectedCall, selectedStorage, methodQueue.length, storageQueue.length, setHasSelectedPallet])

  // Handle network changes - reset all state
  const onNetworkChange = useCallback((chainKey: string, providerId: string) => {
    handleNetworkChange(chainKey, providerId)
    // Reset all dependent state
    resetCallState()
    resetStorageState()
    clearAllQueues()
    clearCode()
    resetExecutionState()
  }, [
    handleNetworkChange,
    resetCallState,
    resetStorageState,
    clearAllQueues,
    clearCode,
    resetExecutionState
  ])

  // Queue management handlers
  const handleAddToQueue = useCallback(() => {
    addToMethodQueue(selectedCall, formData)
    // Clear current selection after adding
    clearCallSelection()
    clearCode()
  }, [selectedCall, formData, addToMethodQueue, clearCallSelection, clearCode])

  const handleAddStorageToQueue = useCallback(() => {
    addToStorageQueue(selectedStorage, storageQueryType, storageParams)
    // Clear current selection after adding
    clearStorageSelection()
    clearCode()
  }, [selectedStorage, storageQueryType, storageParams, addToStorageQueue, clearStorageSelection, clearCode])

  // Create wrapped handlers that clear conflicting selections
  const wrappedHandleCallSelect = useCallback((pallet: string, call: any) => {
    handleCallSelect(pallet, call)
    clearStorageSelection() // Clear storage when call is selected
  }, [handleCallSelect, clearStorageSelection])

  const wrappedHandleStorageSelect = useCallback((pallet: string, storage: any) => {
    handleStorageSelect(pallet, storage)
    clearCallSelection() // Clear call when storage is selected
  }, [handleStorageSelect, clearCallSelection])

  // Execution handlers
  const executeCurrentOperation = useCallback(async () => {
    if (!api) return

    // Check if we have either a single call, storage query, method queue, or storage queue
    if (!selectedCall && !selectedStorage && methodQueue.length === 0 && storageQueue.length === 0) return

    try {
      if (methodQueue.length > 0) {
        // Execute multiple methods sequentially
        await executeMultipleTransactions(methodQueue, selectedChain, api, setConsoleOutput)
      } else if (storageQueue.length > 0) {
        // Execute multiple storage queries sequentially
        await executeMultipleStorageQueries(storageQueue, selectedChain, api, setConsoleOutput)
      } else if (selectedCall) {
        // Execute single transaction
        await executeRealTransaction(selectedCall, formData, selectedChain, api, setConsoleOutput, () => {})
      } else if (selectedStorage) {
        // Execute single storage query
        await executeStorageQuery(selectedStorage, storageQueryType, storageParams, selectedChain, api, setConsoleOutput, () => {})
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setConsoleOutput(prev => [...prev, `❌ Execution error: ${errorMessage}`])
    }
  }, [
    api,
    selectedCall,
    selectedStorage,
    methodQueue,
    storageQueue,
    formData,
    storageQueryType,
    storageParams,
    selectedChain,
    setConsoleOutput
  ])

  const onRunClick = useCallback(() => {
    handleRunClick(executeCurrentOperation)
  }, [handleRunClick, executeCurrentOperation])

  // Determine if we can run anything
  const canRunAny = canRunCall || canRunStorage || methodQueue.length > 0 || storageQueue.length > 0

  return (
    <div className="h-screen flex flex-col">
      <Header 
        selectedChain={selectedChain}
        selectedProvider={selectedProvider}
        onNetworkChange={onNetworkChange}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLeftPaneOpen(true)}
            className="fixed top-4 left-4 z-10 bg-background/80 backdrop-blur-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Left pane - always visible on desktop, sheet on mobile */}
        <div className="hidden lg:block lg:w-[25%] lg:flex-shrink-0">
          <LeftPane 
            isOpen={true}
            onClose={() => {}}
            pallets={pallets}
            selectedCall={selectedCall ? { pallet: selectedCall.pallet, call: selectedCall.call.name } : undefined}
            selectedStorage={selectedStorage ? { pallet: selectedStorage.pallet, storage: selectedStorage.storage.name } : undefined}
            onCallSelect={wrappedHandleCallSelect}
            onStorageSelect={wrappedHandleStorageSelect}
            isLoading={isLoadingMetadata}
            error={metadataError}
          />
        </div>

        {/* Mobile sheet for left pane */}
        <Sheet open={leftPaneOpen} onOpenChange={setLeftPaneOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <LeftPane 
              isOpen={leftPaneOpen}
              onClose={() => setLeftPaneOpen(false)}
              pallets={pallets}
              selectedCall={selectedCall ? { pallet: selectedCall.pallet, call: selectedCall.call.name } : undefined}
              selectedStorage={selectedStorage ? { pallet: selectedStorage.pallet, storage: selectedStorage.storage.name } : undefined}
              onCallSelect={(pallet, call) => {
                wrappedHandleCallSelect(pallet, call)
                setLeftPaneOpen(false)
              }}
              onStorageSelect={(pallet, storage) => {
                wrappedHandleStorageSelect(pallet, storage)
                setLeftPaneOpen(false)
              }}
              isLoading={isLoadingMetadata}
              error={metadataError}
            />
          </SheetContent>
        </Sheet>
        
        {/* Center pane */}
        <div className="w-full lg:w-[25%] lg:flex-shrink-0">
          <CenterPane 
            chainStatus={chainStatus}
            selectedChain={selectedChain}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            onFormChange={handleFormChange}
            onValidChange={handleValidChange}
            onStorageQueryTypeChange={handleStorageQueryTypeChange}
            onStorageParamsChange={handleStorageParamsChange}
            onAddToQueue={handleAddToQueue}
            onAddStorageToQueue={handleAddStorageToQueue}
            onRemoveFromQueue={removeFromMethodQueue}
            onRemoveStorageFromQueue={removeFromStorageQueue}
            onClearQueue={clearMethodQueue}
            onClearStorageQueue={clearStorageQueue}
            canRun={canRunAny}
            canRunStorage={canRunStorage}
            isRunning={isRunning}
            onRunClick={onRunClick}
            onAbortClick={handleAbortClick}
            methodQueue={methodQueue}
            storageQueue={storageQueue}
            storageQueryType={storageQueryType}
            storageParams={storageParams}
          />
        </div>
        
        {/* Right pane */}
        <div className="w-full lg:w-[50%] lg:flex-shrink-0">
          <RightPane 
            code={code}
            consoleOutput={consoleOutput}
            activeTab={activeTab}
            onClearConsole={handleClearConsole}
            selectedChain={selectedChain}
          />
        </div>
      </div>
    </div>
  )
}