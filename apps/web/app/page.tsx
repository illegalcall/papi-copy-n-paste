"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/layout/header"
import { LeftPane } from "@/components/layout/left-pane"
import { CenterPane } from "@/components/layout/center-pane"
import { RightPane } from "@/components/layout/right-pane"
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Menu } from "lucide-react"
import { useClient, fetchMetadata, buildPalletTree, PalletCall, PalletInfo, executeTransactionWithSteps, type TransactionStep } from "@workspace/core"

export default function Page() {
  const [selectedChain, setSelectedChain] = useState("polkadot")
  const [leftPaneOpen, setLeftPaneOpen] = useState(false)
  const [code, setCode] = useState("")
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [pallets, setPallets] = useState<PalletInfo[]>([])
  const [selectedCall, setSelectedCall] = useState<{ pallet: string; call: PalletCall } | undefined>()
  const [selectedStorage, setSelectedStorage] = useState<{ pallet: string; storage: any } | undefined>()
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [storageQueryType, setStorageQueryType] = useState<string>('getValue')
  const [storageParams, setStorageParams] = useState<Record<string, any>>({})
  
  // Multi-method support
  const [methodQueue, setMethodQueue] = useState<Array<{ 
    pallet: string; 
    call: PalletCall; 
    formData: Record<string, any>;
    id: string;
  }>>([])
  
  const [isRunning, setIsRunning] = useState(false)
  const [canRun, setCanRun] = useState(false)
  const [activeTab, setActiveTab] = useState<"setup" | "code" | "console">("setup")
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false)
  const [metadataError, setMetadataError] = useState<string | null>(null)
  const [hasSelectedPallet, setHasSelectedPallet] = useState(false)
  const [hasRunCode, setHasRunCode] = useState(false)
  
  const { status: chainStatus, api } = useClient(selectedChain)

  // Enhanced metadata fetching with better state management
  useEffect(() => {
    console.log('Effect triggered:', { chainStatus, api: !!api, selectedChain })
    
    if (chainStatus === 'ready' && api) {
      // Add a small delay to ensure client is fully stable
      const timeoutId = setTimeout(async () => {
        console.log(`🔄 Fetching metadata for chain: ${selectedChain}`)
        setIsLoadingMetadata(true)
        setMetadataError(null)
        
        try {
          const metadata = await fetchMetadata(selectedChain, api)
          console.log('Metadata fetched:', metadata)
          
          if (metadata && metadata.pallets.length > 0) {
            const palletTree = buildPalletTree(metadata)
            console.log(`✅ Pallet tree built with ${palletTree.length} pallets for ${selectedChain}`)
            setPallets(palletTree)
            setMetadataError(null)
          } else {
            console.warn(`⚠️ No metadata or empty pallets returned for ${selectedChain}`)
            setPallets([])
            if (selectedChain === 'polkadot') {
              setMetadataError('Polkadot initial connection can be slow. Try switching to Kusama first, then back to Polkadot, or wait a moment and refresh.')
            } else {
              setMetadataError(`No pallets found for ${selectedChain}. The chain may still be connecting.`)
            }
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error'
          console.error(`❌ Error in metadata fetch for ${selectedChain}:`, error)
          setPallets([])
          if (selectedChain === 'polkadot') {
            setMetadataError('Polkadot connection timed out. This is a known issue - try switching to Kusama first, then back to Polkadot.')
          } else {
            setMetadataError(`Failed to load pallets for ${selectedChain}: ${errorMsg}`)
          }
        } finally {
          setIsLoadingMetadata(false)
        }
      }, chainStatus === 'ready' ? 1000 : 0) // Wait 1 second for client to stabilize
      
      return () => clearTimeout(timeoutId)
    } else if (chainStatus === 'connecting') {
      console.log(`🔄 Chain connecting: ${selectedChain}`)
      setIsLoadingMetadata(true)
      setMetadataError(null)
      setPallets([])
      setSelectedCall(undefined)
      setSelectedStorage(undefined)
    } else if (chainStatus === 'error') {
      console.log(`❌ Chain connection error for: ${selectedChain}`)
      setIsLoadingMetadata(false)
      setMetadataError(`Failed to connect to ${selectedChain}`)
      setPallets([])
      setSelectedCall(undefined)
      setSelectedStorage(undefined)
    } else {
      console.log(`🧹 Clearing pallets - chainStatus: ${chainStatus}, api: ${!!api}`)
      setIsLoadingMetadata(false)
      setPallets([])
      setSelectedCall(undefined)
      setSelectedStorage(undefined)
    }
  }, [chainStatus, api, selectedChain])

  const handleCallSelect = useCallback((pallet: string, call: PalletCall) => {
    console.log(`🎯 Selecting call: ${pallet}.${call.name}`)
    setSelectedCall({ pallet, call })
    setSelectedStorage(undefined) // Clear storage selection
    setFormData({})
    setCode("")
    
    // Auto-navigate to code tab on first pallet selection
    if (!hasSelectedPallet) {
      setActiveTab("code")
      setHasSelectedPallet(true)
    }
  }, [hasSelectedPallet])

  const handleStorageSelect = useCallback((pallet: string, storage: any) => {
    setSelectedStorage({ pallet, storage })
    setSelectedCall(undefined) // Clear call selection
    setFormData({})
    setStorageParams({}) // Clear storage params
    setStorageQueryType('getValue') // Reset to default query type
    
    // Generate storage query code immediately
    const queryCode = generateStorageQueryCode(selectedChain, pallet, storage, 'getValue', {})
    setCode(queryCode)
    
    // Auto-navigate to code tab on first pallet selection
    if (!hasSelectedPallet) {
      setActiveTab("code")
      setHasSelectedPallet(true)
    }
  }, [selectedChain, hasSelectedPallet])
  
  const handleStorageQueryTypeChange = useCallback((newQueryType: string) => {
    setStorageQueryType(newQueryType)
    if (selectedStorage) {
      const queryCode = generateStorageQueryCode(selectedChain, selectedStorage.pallet, selectedStorage.storage, newQueryType, storageParams)
      setCode(queryCode)
    }
  }, [selectedChain, selectedStorage, storageParams])
  
  const handleStorageParamsChange = useCallback((newParams: Record<string, any>) => {
    setStorageParams(newParams)
    if (selectedStorage) {
      const queryCode = generateStorageQueryCode(selectedChain, selectedStorage.pallet, selectedStorage.storage, storageQueryType, newParams)
      setCode(queryCode)
    }
  }, [selectedChain, selectedStorage, storageQueryType])

  const handleFormChange = useCallback((newFormData: Record<string, any>) => {
    setFormData(newFormData)
    
    // Generate code snippet
    updateGeneratedCode()
  }, [selectedChain, selectedCall, methodQueue])

  // Update generated code based on current state
  const updateGeneratedCode = useCallback(() => {
    if (methodQueue.length > 0) {
      // Multi-method code generation
      const multiCode = generateMultiMethodCode(selectedChain, methodQueue)
      setCode(multiCode)
    } else if (selectedCall) {
      // Single method code generation
      const singleCode = generateCodeSnippet(selectedChain, selectedCall.pallet, selectedCall.call, formData)
      setCode(singleCode)
    }
  }, [selectedChain, selectedCall, formData, methodQueue])

  // Update code when dependencies change
  useEffect(() => {
    updateGeneratedCode()
  }, [updateGeneratedCode])

  // Add current method to queue
  const handleAddToQueue = useCallback(() => {
    if (!selectedCall) return
    
    const queueItem = {
      pallet: selectedCall.pallet,
      call: selectedCall.call,
      formData: { ...formData },
      id: Math.random().toString(36).substr(2, 9)
    }
    
    setMethodQueue(prev => [...prev, queueItem])
    
    // Clear current selection after adding
    setSelectedCall(undefined)
    setFormData({})
    setCode("")
  }, [selectedCall, formData])

  // Remove method from queue
  const handleRemoveFromQueue = useCallback((id: string) => {
    setMethodQueue(prev => prev.filter(item => item.id !== id))
  }, [])

  // Clear entire queue
  const handleClearQueue = useCallback(() => {
    setMethodQueue([])
  }, [])

  const handleValidChange = useCallback((isValid: boolean) => {
    setCanRun(isValid)
  }, [])

  const handleRunClick = async () => {
    if (!api) return

    // Check if we have either a single call, storage query, or method queue
    if (!selectedCall && !selectedStorage && methodQueue.length === 0) return

    setIsRunning(true)
    setActiveTab("console") // Switch to console tab when running
    setConsoleOutput([]) // Clear previous output
    
    // Mark that user has run code (for future navigation behavior)
    if (!hasRunCode) {
      setHasRunCode(true)
    }

    try {
      if (methodQueue.length > 0) {
        // Execute multiple methods sequentially
        await executeMultipleTransactions(methodQueue, selectedChain, api, setConsoleOutput)
      } else if (selectedCall) {
        // Execute single transaction
        await executeRealTransaction(selectedCall, formData, selectedChain, api, setConsoleOutput, setIsRunning)
      } else if (selectedStorage) {
        // Execute storage query
        await executeStorageQuery(selectedStorage, storageQueryType, storageParams, selectedChain, api, setConsoleOutput, setIsRunning)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setConsoleOutput(prev => [...prev, `❌ Execution error: ${errorMessage}`])
    } finally {
      setIsRunning(false)
    }
  }

  const handleAbortClick = () => {
    setIsRunning(false)
    setConsoleOutput(prev => [...prev, `✕ Execution aborted`])
  }

  const handleClearConsole = () => {
    setConsoleOutput([])
  }



  return (
    <div className="h-screen flex flex-col">
      <Header 
        selectedChain={selectedChain} 
        onChainChange={setSelectedChain}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden p-4 border-r">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftPaneOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid flex-1 overflow-hidden lg:grid-cols-[320px_400px_1fr]">
          <LeftPane 
            isOpen={true} 
            onClose={() => {}} 
            pallets={pallets}
            onCallSelect={handleCallSelect}
            onStorageSelect={handleStorageSelect}
            selectedCall={selectedCall ? { pallet: selectedCall.pallet, call: selectedCall.call.name } : undefined}
            selectedStorage={selectedStorage ? { pallet: selectedStorage.pallet, storage: selectedStorage.storage.name } : undefined}
            isLoading={isLoadingMetadata}
            error={metadataError}
          />
          <CenterPane 
            chainStatus={chainStatus}
            selectedChain={selectedChain}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            methodQueue={methodQueue}
            onFormChange={handleFormChange}
            onValidChange={handleValidChange}
            onRunClick={handleRunClick}
            onAbortClick={handleAbortClick}
            onAddToQueue={handleAddToQueue}
            onRemoveFromQueue={handleRemoveFromQueue}
            onClearQueue={handleClearQueue}
            isRunning={isRunning}
            canRun={canRun}
            storageQueryType={storageQueryType}
            storageParams={storageParams}
            onStorageQueryTypeChange={handleStorageQueryTypeChange}
            onStorageParamsChange={handleStorageParamsChange}
          />
          <RightPane
            code={code}
            consoleOutput={consoleOutput}
            onClearConsole={handleClearConsole}
            activeTab={activeTab}
            selectedChain={selectedChain}
          />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex-1 flex flex-col">
          <CenterPane 
            chainStatus={chainStatus}
            selectedChain={selectedChain}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            methodQueue={methodQueue}
            onFormChange={handleFormChange}
            onValidChange={handleValidChange}
            onRunClick={handleRunClick}
            onAbortClick={handleAbortClick}
            onAddToQueue={handleAddToQueue}
            onRemoveFromQueue={handleRemoveFromQueue}
            onClearQueue={handleClearQueue}
            isRunning={isRunning}
            canRun={canRun}
            storageQueryType={storageQueryType}
            storageParams={storageParams}
            onStorageQueryTypeChange={handleStorageQueryTypeChange}
            onStorageParamsChange={handleStorageParamsChange}
          />
          <div className="border-t">
            <RightPane
              code={code}
              consoleOutput={consoleOutput}
              onClearConsole={handleClearConsole}
              activeTab={activeTab}
              selectedChain={selectedChain}
            />
          </div>
        </div>

        {/* Mobile sheet for left pane */}
        <Sheet open={leftPaneOpen} onOpenChange={setLeftPaneOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <LeftPane 
              isOpen={leftPaneOpen} 
              onClose={() => setLeftPaneOpen(false)}
              pallets={pallets}
              onCallSelect={handleCallSelect}
              onStorageSelect={handleStorageSelect}
              selectedCall={selectedCall ? { pallet: selectedCall.pallet, call: selectedCall.call.name } : undefined}
              selectedStorage={selectedStorage ? { pallet: selectedStorage.pallet, storage: selectedStorage.storage.name } : undefined}
              isLoading={isLoadingMetadata}
              error={metadataError}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-4 py-2 text-center text-xs text-muted-foreground">
        Made with 💖 by{" "}
        <a
          href="https://github.com/illegalcall"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          illegalcall
        </a>{" "}
        for Polkadot ecosystem
      </div>
    </div>
  )
}

async function executeRealTransaction(
  selectedCall: { pallet: string; call: PalletCall },
  formData: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    // Execute the transaction using our new transaction system
    const result = await executeTransactionWithSteps(
      selectedCall,
      formData,
      {
        signer: "//Alice" as const,
        chainKey,
        client
      },
      (step: TransactionStep) => {
        // Add each step to console output as it happens
        setConsoleOutput(prev => [...prev, step.message])
      }
    )

    // Add transaction details
    const details = formatTransactionDetails(selectedCall, formData)
    setConsoleOutput(prev => [...prev, details])

    if (result.success) {
      setConsoleOutput(prev => [...prev, `✅ Transaction completed successfully!`])
    } else {
      setConsoleOutput(prev => [...prev, `❌ Transaction failed: ${result.error}`])
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    setConsoleOutput(prev => [...prev, `❌ Execution error: ${errorMessage}`])
  } finally {
    setIsRunning(false)
  }
}

async function executeMultipleTransactions(
  methodQueue: Array<{ pallet: string; call: PalletCall; formData: Record<string, any>; id: string }>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  setConsoleOutput(prev => [...prev, `🚀 Starting execution of ${methodQueue.length} methods...`])
  
  for (let i = 0; i < methodQueue.length; i++) {
    const method = methodQueue[i]
    if (!method) continue // Safety check
    
    const methodNumber = i + 1
    
    setConsoleOutput(prev => [...prev, `\n📋 Method ${methodNumber}/${methodQueue.length}: ${method.pallet}.${method.call.name}`])
    
    try {
      // Execute this method
      const result = await executeTransactionWithSteps(
        { pallet: method.pallet, call: method.call },
        method.formData,
        {
          signer: "//Alice" as const,
          chainKey,
          client
        },
        (step: TransactionStep) => {
          // Add each step to console output as it happens
          setConsoleOutput(prev => [...prev, `  ${step.message}`])
        }
      )

      // Add transaction details
      const details = formatTransactionDetails({ pallet: method.pallet, call: method.call }, method.formData)
      setConsoleOutput(prev => [...prev, `  ${details}`])

      if (result.success) {
        setConsoleOutput(prev => [...prev, `  ✅ Method ${methodNumber} completed successfully!`])
      } else {
        setConsoleOutput(prev => [...prev, `  ❌ Method ${methodNumber} failed: ${result.error}`])
        setConsoleOutput(prev => [...prev, `⚠️  Stopping execution due to failure in method ${methodNumber}`])
        return // Stop execution on first failure
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setConsoleOutput(prev => [...prev, `  ❌ Method ${methodNumber} error: ${errorMessage}`])
      setConsoleOutput(prev => [...prev, `⚠️  Stopping execution due to error in method ${methodNumber}`])
      return // Stop execution on error
    }
  }
  
  setConsoleOutput(prev => [...prev, `\n🎉 All ${methodQueue.length} methods completed successfully!`])
}

async function executeStorageQuery(
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setConsoleOutput(prev => [...prev, `🔍 Executing ${selectedStorage.pallet}.${selectedStorage.storage.name} storage query...`])
    setConsoleOutput(prev => [...prev, `📊 Query Type: ${queryType}`])
    
    // Import the appropriate descriptor dynamically
    const descriptorName = getDescriptorName(chainKey)
    
    // For the web interface, we'll focus on demonstrating the raw client capabilities
    // The typed API with descriptors is used in the generated code that users copy
    setConsoleOutput(prev => [...prev, `🔧 Using raw client approach to demonstrate storage queries...`])
    setConsoleOutput(prev => [...prev, `💡 The generated code will use typed APIs with full descriptor support`])
    
    await executeRawStorageQuery(selectedStorage, queryType, storageParams, client, setConsoleOutput)
    
    setConsoleOutput(prev => [...prev, `✅ Storage query completed successfully!`])
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    setConsoleOutput(prev => [...prev, `❌ Storage query error: ${errorMessage}`])
  } finally {
    setIsRunning(false)
  }
}

// Execute storage query with typed API
async function executeTypedStorageQuery(
  typedApi: any,
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  const palletName = selectedStorage.pallet
  const storageName = selectedStorage.storage.name
  
  // Detect if storage requires parameters
  const requiredParams = detectStorageParameters(palletName, storageName)
  const hasParams = Boolean(requiredParams && Object.keys(storageParams).length > 0)
  
  // Generate parameter values for the query
  const paramValues = hasParams && requiredParams 
    ? generateStorageParamValues(storageParams, requiredParams)
    : []
  
  setConsoleOutput(prev => [...prev, `🔧 Parameters: ${hasParams ? JSON.stringify(paramValues) : 'None required'}`])
  
  // Access the storage query function
  const storageQuery = typedApi.query?.[palletName]?.[storageName]
  if (!storageQuery) {
    throw new Error(`Storage query ${palletName}.${storageName} not found in typed API`)
  }
  
  switch (queryType) {
    case 'getValue':
      {
        const result = hasParams 
          ? await storageQuery.getValue(...paramValues)
          : await storageQuery.getValue()
        
        setConsoleOutput(prev => [...prev, `📋 Result: ${formatStorageResult(result)}`])
        setConsoleOutput(prev => [...prev, `🎉 Successfully retrieved current value!`])
      }
      break
      
    case 'getValueAt':
      {
        const atFinalized = hasParams
          ? await storageQuery.getValue(...paramValues, { at: "finalized" })
          : await storageQuery.getValue({ at: "finalized" })
          
        const atBest = hasParams
          ? await storageQuery.getValue(...paramValues, { at: "best" })
          : await storageQuery.getValue({ at: "best" })
        
        setConsoleOutput(prev => [...prev, `📋 At finalized: ${formatStorageResult(atFinalized)}`])
        setConsoleOutput(prev => [...prev, `📋 At best: ${formatStorageResult(atBest)}`])
        setConsoleOutput(prev => [...prev, `🎉 Retrieved values at different blocks!`])
      }
      break
      
    case 'getValues':
      if (!hasParams) {
        setConsoleOutput(prev => [...prev, `⚠️ getValues requires storage with parameters, using getValue instead`])
        const result = await storageQuery.getValue()
        setConsoleOutput(prev => [...prev, `📋 Result: ${formatStorageResult(result)}`])
      } else {
        // For getValues, we can query multiple keys
        const keys = [paramValues] // Add more keys if needed
        const results = await storageQuery.getValues(keys)
        results.forEach((result: any, index: number) => {
          setConsoleOutput(prev => [...prev, `📋 Result ${index + 1}: ${formatStorageResult(result)}`])
        })
        setConsoleOutput(prev => [...prev, `🎉 Retrieved ${results.length} values!`])
      }
      break
      
    case 'getEntries':
      {
        const entries = hasParams 
          ? await storageQuery.getEntries(...paramValues)
          : await storageQuery.getEntries()
        
        setConsoleOutput(prev => [...prev, `📊 Found ${entries.length} entries`])
        entries.slice(0, 5).forEach(([key, value]: [any, any], index: number) => {
          setConsoleOutput(prev => [...prev, `📋 Entry ${index + 1}:`])
          setConsoleOutput(prev => [...prev, `  🔑 Key: ${JSON.stringify(key)}`])
          setConsoleOutput(prev => [...prev, `  💾 Value: ${formatStorageResult(value)}`])
        })
        
        if (entries.length > 5) {
          setConsoleOutput(prev => [...prev, `... and ${entries.length - 5} more entries`])
        }
        setConsoleOutput(prev => [...prev, `🎉 Successfully retrieved ${entries.length} entries!`])
      }
      break
      
    case 'watchValue':
      {
        setConsoleOutput(prev => [...prev, `👁️ Starting to watch ${palletName}.${storageName}...`])
        setConsoleOutput(prev => [...prev, `⏰ Will watch for 10 seconds, then stop`])
        
        const subscription = hasParams
          ? storageQuery.watchValue(...paramValues)
          : storageQuery.watchValue()
          
        let changeCount = 0
        const sub = subscription.subscribe({
          next: (result: any) => {
            changeCount++
            setConsoleOutput(prev => [...prev, `🔄 Change ${changeCount}: ${formatStorageResult(result)}`])
          },
          error: (error: any) => {
            setConsoleOutput(prev => [...prev, `❌ Watch error: ${error.message}`])
          }
        })
        
        // Stop watching after 10 seconds
        setTimeout(() => {
          sub.unsubscribe()
          setConsoleOutput(prev => [...prev, `⏹️ Stopped watching (detected ${changeCount} changes)`])
        }, 10000)
      }
      break
      
    case 'comprehensive':
      {
        setConsoleOutput(prev => [...prev, `🔍 Running comprehensive query analysis...`])
        
        // 1. Get current value
        const current = hasParams 
          ? await storageQuery.getValue(...paramValues)
          : await storageQuery.getValue()
        setConsoleOutput(prev => [...prev, `📋 Current: ${formatStorageResult(current)}`])
        
        // 2. Get finalized value
        const finalized = hasParams
          ? await storageQuery.getValue(...paramValues, { at: "finalized" })
          : await storageQuery.getValue({ at: "finalized" })
        setConsoleOutput(prev => [...prev, `📋 Finalized: ${formatStorageResult(finalized)}`])
        
        // 3. Get storage key
        const storageKey = hasParams
          ? storageQuery.getKey(...paramValues)
          : storageQuery.getKey()
        setConsoleOutput(prev => [...prev, `🔑 Storage Key: ${storageKey}`])
        
        // 4. Sample entries (limited)
        try {
          const entries = await storageQuery.getEntries()
          setConsoleOutput(prev => [...prev, `📊 Total entries available: ${entries.length}`])
        } catch (e) {
          setConsoleOutput(prev => [...prev, `ℹ️ Could not count total entries`])
        }
        
        setConsoleOutput(prev => [...prev, `🎉 Comprehensive analysis complete!`])
      }
      break
      
    default:
      {
        const result = hasParams 
          ? await storageQuery.getValue(...paramValues)
          : await storageQuery.getValue()
        setConsoleOutput(prev => [...prev, `📋 Result: ${formatStorageResult(result)}`])
        setConsoleOutput(prev => [...prev, `🎉 Default query completed!`])
      }
  }
}

// Format storage results for console display
function formatStorageResult(result: any): string {
  if (result === null || result === undefined) {
    return 'null'
  }
  
  if (typeof result === 'bigint') {
    // For DOT amounts, also show converted value
    if (result > 1000000000n) {
      const dotValue = (Number(result) / 10000000000).toFixed(4)
      return `${result.toString()} planck (${dotValue} DOT)`
    }
    return `${result.toString()} (BigInt)`
  }
  
  if (result instanceof Uint8Array) {
    return `[Uint8Array: ${result.length} bytes] 0x${Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('')}`
  }
  
  if (typeof result === 'object') {
    try {
      return JSON.stringify(result, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString() + 'n'
        }
        if (value instanceof Uint8Array) {
          return `[Uint8Array: ${value.length} bytes]`
        }
        return value
      }, 2)
    } catch (e) {
      return `[Object: ${result.constructor?.name || 'Unknown'}]`
    }
  }
  
  return String(result)
}

// Generate parameter values for storage queries
function generateStorageParamValues(storageParams: Record<string, any>, requiredParams: string[]): any[] {
  return requiredParams.map(paramType => {
    const paramValue = storageParams[paramType.toLowerCase()] || storageParams[paramType] || 
                       storageParams['key'] || storageParams['param'] || ''
    
    // Handle different parameter types
    if (paramType === 'AccountId' && typeof paramValue === 'string') {
      if (paramValue.startsWith('//')) {
        // Convert test accounts to actual addresses
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        return accountMap[paramValue] || accountMap['//Alice']
      }
      return paramValue
    } else if (paramType.includes('Number') || paramType.includes('Index')) {
      return parseInt(paramValue || '0')
    } else if (paramType === 'Hash') {
      return paramValue || '0x0000000000000000000000000000000000000000000000000000000000000000'
    }
    
    return paramValue
  })
}

// Execute storage query using raw client (fallback)
async function executeRawStorageQuery(
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  const palletName = selectedStorage.pallet
  const storageName = selectedStorage.storage.name
  
  setConsoleOutput(prev => [...prev, `🔍 Attempting basic query for ${palletName}.${storageName}`])
  
  try {
    // Try to get runtime metadata to understand the storage structure
    if (client._request && typeof client._request === 'function') {
      setConsoleOutput(prev => [...prev, `📡 Fetching chain information and attempting storage query...`])
      
      // Get basic chain info
      try {
        const chainName = await client._request('system_chain', [])
        setConsoleOutput(prev => [...prev, `🔗 Chain: ${chainName}`])
        
        const version = await client._request('system_version', [])
        setConsoleOutput(prev => [...prev, `📦 Runtime Version: ${version}`])
        
        // Get latest block header
        const header = await client._request('chain_getHeader', [])
        setConsoleOutput(prev => [...prev, `🧱 Latest Block: #${parseInt(header.number, 16)} (${header.hash})`])
        
        // Execute different query types based on user selection
        setConsoleOutput(prev => [...prev, `🔍 Executing ${queryType} query for ${palletName}.${storageName}...`])
        
        await executeRawStorageQueryByType(client, palletName, storageName, queryType, storageParams, setConsoleOutput)
        
        setConsoleOutput(prev => [...prev, `📝 For complete storage access with proper types, use the generated code`])
        setConsoleOutput(prev => [...prev, `🔧 Generated code includes: getValue(), watchValue(), getEntries(), etc.`])
        
      } catch (rpcError) {
        setConsoleOutput(prev => [...prev, `⚠️ Could not fetch chain info: ${rpcError instanceof Error ? rpcError.message : 'Unknown error'}`])
      }
    } else {
      setConsoleOutput(prev => [...prev, `❌ Client does not support direct RPC calls`])
    }
    
    // Show what would be needed for this storage query
    const requiredParams = detectStorageParameters(palletName, storageName)
    if (requiredParams && requiredParams.length > 0) {
      setConsoleOutput(prev => [...prev, `🔑 This storage requires parameters: ${requiredParams.join(', ')}`])
      if (Object.keys(storageParams).length > 0) {
        setConsoleOutput(prev => [...prev, `📝 You provided: ${JSON.stringify(storageParams)}`])
      }
    } else {
      setConsoleOutput(prev => [...prev, `ℹ️ This storage entry requires no parameters`])
    }
    
    setConsoleOutput(prev => [...prev, `✅ Basic query completed - see generated code for full functionality`])
    
  } catch (error) {
    throw new Error(`Raw storage query failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Execute different storage query types using raw client
async function executeRawStorageQueryByType(
  client: any,
  palletName: string,
  storageName: string,
  queryType: string,
  storageParams: Record<string, any>,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  // Known storage keys for demo purposes
  const knownStorageKeys: Record<string, string> = {
    'Balances.TotalIssuance': '0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80',
    'Balances.InactiveIssuance': '0xc2261276cc9d1f8598ea4b6a74b15c2f6226b0e5c41e7f21b654b12fb9c1e2a8d2',
    'System.Number': '0x26aa394eea5630e07c48ae0c9558cef702a5c1b19ab7a04f536c519aca4983ac',
    'Timestamp.Now': '0xf0c365c3cf59d671eb72da0e7a4113c49f1f0515f462cdcf84e0f1d6045dfcbb'
  }

  const storageKey = knownStorageKeys[`${palletName}.${storageName}`]

  switch (queryType) {
    case 'getValue':
      await executeGetValue(client, storageKey, palletName, storageName, setConsoleOutput)
      break
      
    case 'getValueAt':
      await executeGetValueAt(client, storageKey, palletName, storageName, setConsoleOutput)
      break
      
    case 'getValues':
      await executeGetValues(client, storageKey, palletName, storageName, setConsoleOutput)
      break
      
    case 'getEntries':
      await executeGetEntries(client, palletName, storageName, setConsoleOutput)
      break
      
    case 'watchValue':
      await executeWatchValue(client, storageKey, palletName, storageName, setConsoleOutput)
      break
      
    case 'comprehensive':
      await executeComprehensiveQuery(client, storageKey, palletName, storageName, setConsoleOutput)
      break
      
    default:
      await executeGetValue(client, storageKey, palletName, storageName, setConsoleOutput)
  }
}

// Get single storage value
async function executeGetValue(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    if (!storageKey) {
      setConsoleOutput(prev => [...prev, `⚠️ Storage key for ${palletName}.${storageName} not available for demo`])
      setConsoleOutput(prev => [...prev, `💡 Use generated code for automatic key calculation`])
      return
    }

    const result = await client._request('state_getStorage', [storageKey])
    
    if (result) {
      const decodedValue = decodeStorageResult(result, palletName, storageName)
      setConsoleOutput(prev => [...prev, `📋 Current Value: ${decodedValue}`])
      setConsoleOutput(prev => [...prev, `🎉 Successfully retrieved current storage value!`])
    } else {
      setConsoleOutput(prev => [...prev, `⚠️ Storage value is null or not found`])
    }
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Get value failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Get value at specific blocks
async function executeGetValueAt(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    if (!storageKey) {
      setConsoleOutput(prev => [...prev, `⚠️ Storage key for ${palletName}.${storageName} not available for demo`])
      return
    }

    setConsoleOutput(prev => [...prev, `🔍 Fetching values at finalized and best blocks...`])
    
    // Get finalized block hash
    const finalizedHash = await client._request('chain_getFinalizedHead', [])
    const finalizedValue = await client._request('state_getStorage', [storageKey, finalizedHash])
    
    // Get best block hash  
    const bestHash = await client._request('chain_getHead', [])
    const bestValue = await client._request('state_getStorage', [storageKey, bestHash])
    
    const decodedFinalized = finalizedValue ? decodeStorageResult(finalizedValue, palletName, storageName) : 'null'
    const decodedBest = bestValue ? decodeStorageResult(bestValue, palletName, storageName) : 'null'
    
    setConsoleOutput(prev => [...prev, `📋 At Finalized Block: ${decodedFinalized}`])
    setConsoleOutput(prev => [...prev, `📋 At Best Block: ${decodedBest}`])
    setConsoleOutput(prev => [...prev, `🎉 Successfully retrieved values at different blocks!`])
    
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Get value at block failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Get multiple values (simulate with multiple related queries)
async function executeGetValues(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    setConsoleOutput(prev => [...prev, `🔍 Simulating multiple value queries...`])
    
    if (palletName === 'Balances') {
      // Query multiple Balances storage items
      const totalIssuanceKey = '0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80'
      const inactiveIssuanceKey = '0xc2261276cc9d1f8598ea4b6a74b15c2f6226b0e5c41e7f21b654b12fb9c1e2a8d2'
      
      const [totalIssuance, inactiveIssuance] = await Promise.all([
        client._request('state_getStorage', [totalIssuanceKey]),
        client._request('state_getStorage', [inactiveIssuanceKey])
      ])
      
      if (totalIssuance) {
        const decoded = decodeStorageResult(totalIssuance, 'Balances', 'TotalIssuance')
        setConsoleOutput(prev => [...prev, `💰 TotalIssuance: ${decoded}`])
      }
      
      if (inactiveIssuance) {
        const decoded = decodeStorageResult(inactiveIssuance, 'Balances', 'InactiveIssuance')
        setConsoleOutput(prev => [...prev, `💰 InactiveIssuance: ${decoded}`])
      }
      
      setConsoleOutput(prev => [...prev, `🎉 Retrieved multiple Balances storage values!`])
    } else {
      setConsoleOutput(prev => [...prev, `ℹ️ Multiple values demo available for Balances pallet`])
      await executeGetValue(client, storageKey, palletName, storageName, setConsoleOutput)
    }
    
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Get multiple values failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Get all entries (simulate by showing metadata structure)
async function executeGetEntries(
  client: any,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    setConsoleOutput(prev => [...prev, `🔍 Simulating get all entries for ${palletName}.${storageName}...`])
    
    // Get metadata to show storage structure
    const metadata = await client._request('state_getMetadata', [])
    setConsoleOutput(prev => [...prev, `📋 Retrieved metadata to analyze storage structure`])
    
    // Show what entries would be available
    if (palletName === 'Balances' && storageName === 'Account') {
      setConsoleOutput(prev => [...prev, `📊 Account storage contains entries for all account holders`])
      setConsoleOutput(prev => [...prev, `🔑 Example entries: AccountId → AccountData structure`])
      setConsoleOutput(prev => [...prev, `💾 Each entry contains: { free, reserved, frozen, flags }`])
      setConsoleOutput(prev => [...prev, `ℹ️ In production: millions of entries (one per account)`])
    } else if (storageName === 'TotalIssuance') {
      setConsoleOutput(prev => [...prev, `📊 TotalIssuance has a single entry (no key required)`])
      setConsoleOutput(prev => [...prev, `💾 Contains the total supply of the native token`])
    } else {
      setConsoleOutput(prev => [...prev, `📊 ${storageName} storage structure would be shown here`])
      setConsoleOutput(prev => [...prev, `💾 Entry count depends on the storage type and usage`])
    }
    
    setConsoleOutput(prev => [...prev, `🎉 Storage structure analysis complete!`])
    setConsoleOutput(prev => [...prev, `💡 Use generated code for actual entry iteration`])
    
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Get entries simulation failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Watch storage value changes
async function executeWatchValue(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    if (!storageKey) {
      setConsoleOutput(prev => [...prev, `⚠️ Storage key for ${palletName}.${storageName} not available for demo`])
      return
    }

    setConsoleOutput(prev => [...prev, `👁️ Starting to watch ${palletName}.${storageName} for changes...`])
    setConsoleOutput(prev => [...prev, `⏰ Will monitor for 10 seconds, checking every 2 seconds`])
    
    let checkCount = 0
    const maxChecks = 5 // 10 seconds total
    let lastValue: string | null = null
    
    const watchInterval = setInterval(async () => {
      try {
        checkCount++
        const currentValue = await client._request('state_getStorage', [storageKey])
        const decodedValue = currentValue ? decodeStorageResult(currentValue, palletName, storageName) : 'null'
        
        if (lastValue === null) {
          setConsoleOutput(prev => [...prev, `📋 Initial Value: ${decodedValue}`])
        } else if (lastValue !== decodedValue) {
          setConsoleOutput(prev => [...prev, `🔄 Value Changed: ${decodedValue}`])
        } else {
          setConsoleOutput(prev => [...prev, `📋 Check ${checkCount}/5: ${decodedValue} (no change)`])
        }
        
        lastValue = decodedValue
        
        if (checkCount >= maxChecks) {
          clearInterval(watchInterval)
          setConsoleOutput(prev => [...prev, `⏹️ Stopped watching after ${checkCount} checks`])
          setConsoleOutput(prev => [...prev, `💡 Use generated code for real-time subscriptions with observables`])
        }
      } catch (error) {
        clearInterval(watchInterval)
        setConsoleOutput(prev => [...prev, `❌ Watch error: ${error instanceof Error ? error.message : 'Unknown error'}`])
      }
    }, 2000)
    
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Watch value setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Comprehensive query showing all capabilities
async function executeComprehensiveQuery(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    setConsoleOutput(prev => [...prev, `🔍 Running comprehensive analysis of ${palletName}.${storageName}...`])
    
    // 1. Current value
    setConsoleOutput(prev => [...prev, `\n1️⃣ Getting current value...`])
    await executeGetValue(client, storageKey, palletName, storageName, setConsoleOutput)
    
    // Wait a bit between operations
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 2. Values at different blocks
    setConsoleOutput(prev => [...prev, `\n2️⃣ Getting values at different blocks...`])
    await executeGetValueAt(client, storageKey, palletName, storageName, setConsoleOutput)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 3. Storage key info
    setConsoleOutput(prev => [...prev, `\n3️⃣ Storage key information...`])
    if (storageKey) {
      setConsoleOutput(prev => [...prev, `🔑 Storage Key: ${storageKey}`])
      setConsoleOutput(prev => [...prev, `📏 Key Length: ${storageKey.length - 2} hex characters (${(storageKey.length - 2) / 2} bytes)`])
    } else {
      setConsoleOutput(prev => [...prev, `🔑 Storage Key: Generated dynamically (see generated code)`])
    }
    
    // 4. Storage structure
    setConsoleOutput(prev => [...prev, `\n4️⃣ Storage structure analysis...`])
    await executeGetEntries(client, palletName, storageName, setConsoleOutput)
    
    setConsoleOutput(prev => [...prev, `\n🎉 Comprehensive analysis complete!`])
    setConsoleOutput(prev => [...prev, `💡 See generated code for full typed API capabilities`])
    
  } catch (error) {
    setConsoleOutput(prev => [...prev, `❌ Comprehensive query failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
  }
}

// Decode storage results based on known types
function decodeStorageResult(hexResult: string, palletName: string, storageName: string): string {
  try {
    // Remove 0x prefix
    const hexValue = hexResult.slice(2)
    
    if (palletName === 'Balances' && (storageName === 'TotalIssuance' || storageName === 'InactiveIssuance')) {
      // Decode as u128 (16 bytes, little endian)
      const bytes = hexValue.match(/.{1,2}/g)?.reverse().join('') || '0'
      const totalIssuance = BigInt('0x' + bytes)
      const dotAmount = (Number(totalIssuance) / 10000000000).toFixed(4)
      return `${totalIssuance.toString()} planck (${dotAmount} DOT)`
    }
    
    if (palletName === 'System' && storageName === 'Number') {
      // Decode as u32 (4 bytes, little endian)
      const bytes = hexValue.slice(0, 8).match(/.{1,2}/g)?.reverse().join('') || '0'
      const blockNumber = parseInt(bytes, 16)
      return `Block #${blockNumber}`
    }
    
    if (palletName === 'Timestamp' && storageName === 'Now') {
      // Decode as u64 timestamp (8 bytes, little endian)
      const bytes = hexValue.slice(0, 16).match(/.{1,2}/g)?.reverse().join('') || '0'
      const timestamp = parseInt(bytes, 16)
      const date = new Date(timestamp)
      return `${timestamp} ms (${date.toISOString()})`
    }
    
    // Generic hex display for unknown types
    return `0x${hexValue} (${hexValue.length / 2} bytes)`
    
  } catch (error) {
    return `Raw: ${hexResult} (decode failed: ${error instanceof Error ? error.message : 'unknown'})`
  }
}

// Note: Storage result formatting functions removed for simplicity - they would be used in the generated code

// simulateTransactionExecution function removed as it's no longer used

function getSetupCommands(chainKey: string): string {
  const chainConfigs = {
    polkadot: {
      cliName: "polkadot",
      aliasName: "dot"
    },
    kusama: {
      cliName: "kusama", 
      aliasName: "ksm"
    },
    moonbeam: {
      cliName: "moonbeam",
      aliasName: "moonbeam"
    },
    bifrost: {
      cliName: "bifrost",
      aliasName: "bifrost"
    },
    astar: {
      cliName: "astar",
      aliasName: "astar"
    },
    acala: {
      cliName: "acala",
      aliasName: "acala"
    },
    hydration: {
      cliName: "hydration",
      aliasName: "hydration"
    }
  }

  const config = chainConfigs[chainKey as keyof typeof chainConfigs] || chainConfigs.polkadot
  
  return `// Install polkadot-api
// npm i polkadot-api
// 
// Add chain and generate types:
// npx papi add ${config.aliasName} -n ${config.cliName}
// npx papi`
}

function getChainSpecImport(chainKey: string): string {
  // Only major relay chains have built-in chainSpecs
  const builtInChainSpecs = {
    polkadot: "polkadot",
    kusama: "ksmcc3"
  }
  
  const specName = builtInChainSpecs[chainKey as keyof typeof builtInChainSpecs]
  if (specName) {
    return `import { chainSpec } from "polkadot-api/chains/${specName}"`
  }
  
  // For parachains, we need to connect via RPC (no built-in chainSpec)
  return `// Note: ${chainKey} connects directly via RPC endpoint`
}

function getDescriptorImport(chainKey: string): string {
  const descriptorMap = {
    polkadot: "dot",
    kusama: "ksm", 
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    acala: "acala",
    hydration: "hydration"
  }
  
  const descriptorName = descriptorMap[chainKey as keyof typeof descriptorMap] || "dot"
  return `import { ${descriptorName} } from "@polkadot-api/descriptors"`
}

function getDescriptorName(chainKey: string): string {
  const descriptorMap = {
    polkadot: "dot",
    kusama: "ksm", 
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    acala: "acala", 
    hydration: "hydration"
  }
  
  return descriptorMap[chainKey as keyof typeof descriptorMap] || "dot"
}

function getChainConnection(chainKey: string): { imports: string, connection: string, cleanup?: string } {
  // Use smoldot connection pattern from documentation
  const chainConfigs = {
    polkadot: { chainSpec: "polkadot" },
    kusama: { chainSpec: "ksmcc3" },
    moonbeam: { chainSpec: "moonbeam" },
    bifrost: { chainSpec: "bifrost" },
    astar: { chainSpec: "astar" },
    acala: { chainSpec: "acala" },
    hydration: { chainSpec: "hydration" }
  }

  const config = chainConfigs[chainKey as keyof typeof chainConfigs] || chainConfigs.polkadot
  
  return {
    imports: `import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/${config.chainSpec}"`,
    connection: `  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))`,
    cleanup: `
  // Cleanup
  smoldot.terminate()`
  }
}

function formatTransactionDetails(selectedCall: { pallet: string; call: PalletCall }, formData: Record<string, any>): string {
  if (selectedCall.pallet === 'Balances' && selectedCall.call.name.includes('transfer')) {
    const dest = formData.dest || '//Bob'
    const value = formData.value || 0
    const formatted = (value / 10000000000).toFixed(10) // Convert from planck to DOT (10 decimal places)
    return `🔗 To: ${dest} (5FHneW46...)
🔗 Amount: ${formatted} DOT`
  }
  
  if (selectedCall.pallet === 'System' && selectedCall.call.name === 'remark') {
    const remarkText = typeof formData.remark === 'string' ? formData.remark : 'Hello World'
    return `🔗 Remark: "${remarkText}"`
  }

  if (selectedCall.pallet === 'Timestamp' && selectedCall.call.name === 'set') {
    const timestamp = formData.now || Date.now()
    const date = new Date(Number(timestamp)).toISOString()
    return `🔗 Timestamp: ${timestamp} (${date})`
  }
  
  // For other pallets, create a generic parameter display
  const paramStr = Object.entries(formData)
    .map(([k, v]) => {
      // Handle different value types
      if (typeof v === 'bigint') {
        return `${k}: ${v.toString()}`
      } else if (v instanceof Uint8Array) {
        return `${k}: [${v.length} bytes]`
      } else if (typeof v === 'object' && v !== null) {
        return `${k}: ${JSON.stringify(v)}`
      }
      return `${k}: ${v}`
    })
    .join(', ')
  
  return paramStr ? `🔗 Parameters: ${paramStr}` : `🔗 ${selectedCall.pallet}.${selectedCall.call.name} transaction`
}

function generateStorageQueryCode(chainKey: string, pallet: string, storage: any, queryType: string = 'getValue', storageParams: Record<string, any> = {}): string {
  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)
  const setupCommands = getSetupCommands(chainKey)
  
  // Detect if storage requires parameters
  const requiresKeys = detectStorageParameters(pallet, storage.name)
  const hasParams = Boolean(requiresKeys && Object.keys(storageParams).length > 0)
  
  // Generate parameter string for storage queries that need keys
  const paramString = hasParams && requiresKeys ? generateStorageParams(storageParams, requiresKeys) : ''
  
  // Generate different query types based on selection
  const queryCode = generateStorageQueryByType(queryType, pallet, storage.name, paramString, hasParams)
  
  return `// SETUP REQUIRED: Run these commands in your project:
${setupCommands}

import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function queryStorage() {
${connection}
  const typedApi = client.getTypedApi(${descriptorName})
  
${queryCode}${cleanup || ''}
}

queryStorage().catch(console.error)`
}

function detectStorageParameters(pallet: string, storageName: string): string[] | null {
  // Common storage entries that require parameters (account keys, indices, etc.)
  const storageWithParams = {
    'System': {
      'Account': ['AccountId'],
      'BlockHash': ['BlockNumber']
    },
    'Balances': {
      'Account': ['AccountId'], 
      'Locks': ['AccountId']
    },
    'Staking': {
      'Bonded': ['AccountId'],
      'Ledger': ['AccountId'],
      'Validators': ['AccountId'],
      'Nominators': ['AccountId']
    },
    'Democracy': {
      'ReferendumInfoOf': ['ReferendumIndex'],
      'VotingOf': ['AccountId']
    },
    'Treasury': {
      'Proposals': ['ProposalIndex']
    },
    'Vesting': {
      'Vesting': ['AccountId']
    },
    'XcmPallet': {
      'Queries': ['QueryId'],
      'AssetTraps': ['Hash']
    }
  }
  
  const palletStorage = storageWithParams[pallet as keyof typeof storageWithParams]
  if (palletStorage && storageName in palletStorage) {
    return palletStorage[storageName as keyof typeof palletStorage] as string[]
  }
  
  return null
}

function generateStorageParams(storageParams: Record<string, any>, requiredParams: string[]): string {
  const params = requiredParams.map(paramType => {
    const paramValue = storageParams[paramType.toLowerCase()] || storageParams[paramType] || 
                       storageParams['key'] || storageParams['param'] || ''
    
    // Handle different parameter types
    if (paramType === 'AccountId' && typeof paramValue === 'string') {
      if (paramValue.startsWith('//')) {
        // Convert test accounts to actual addresses
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        return `"${accountMap[paramValue] || accountMap['//Alice']}"`
      }
      return `"${paramValue}"`
    } else if (paramType.includes('Number') || paramType.includes('Index')) {
      return String(paramValue || '0')
    } else if (paramType === 'Hash') {
      return `"${paramValue || '0x0000000000000000000000000000000000000000000000000000000000000000'}"`
    }
    
    return `"${paramValue}"`
  }).join(', ')
  
  return params
}

function generateStorageQueryByType(queryType: string, pallet: string, storageName: string, paramString: string, hasParams: boolean): string {
  const baseQuery = `typedApi.query.${pallet}.${storageName}`
  const params = hasParams ? `(${paramString})` : '()'
  
  switch (queryType) {
    case 'getValue':
      return `  // Get single storage value
  const result = await ${baseQuery}.getValue${params}
  console.log("${pallet}.${storageName} result:", JSON.stringify(result, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))`

    case 'getValueAt':
      return `  // Get storage value at specific block
  const result = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ', ' : ''}{ at: "finalized" })
  console.log("${pallet}.${storageName} at finalized:", JSON.stringify(result, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
  
  // You can also query at "best" block or specific block hash:
  // const atBest = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ', ' : ''}{ at: "best" })
  // const atBlock = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ', ' : ''}{ at: "0x..." })`

    case 'getValues':
      if (!hasParams) {
        return `  // getValues() requires storage entries with keys
  // This storage entry ("${storageName}") doesn't require parameters
  // Use getValue() instead for simple storage entries
  const result = await ${baseQuery}.getValue()
  console.log("${pallet}.${storageName}:", JSON.stringify(result, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))`
      }
      return `  // Get multiple storage values with different keys
  const keys = [
    ${paramString},
    // Add more keys here...
    // "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", // Bob
    // "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y"  // Charlie
  ]
  
  const results = await ${baseQuery}.getValues(keys)
  console.log("${pallet}.${storageName} multiple results:")
  results.forEach((result, index) => {
    console.log(\`Key \${index}:\`, JSON.stringify(result, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ))
  })`

    case 'getEntries':
      return `  // Get all storage entries${hasParams ? ' (or entries matching partial keys)' : ''}
  const entries = await ${baseQuery}.getEntries()
  console.log("${pallet}.${storageName} all entries:")
  entries.forEach(([key, value]) => {
    console.log("Key:", key)
    console.log("Value:", JSON.stringify(value, (_key, val) =>
      typeof val === 'bigint' ? val.toString() : val
    ))
    console.log("---")
  })
  
  ${hasParams ? `// You can also get entries with partial key matching:
  // const partialEntries = await ${baseQuery}.getEntries(${paramString})` : ''}`

    case 'watchValue':
      return `  // Watch storage value changes (returns Observable)
  console.log("Watching ${pallet}.${storageName} for changes...")
  
  const subscription = ${baseQuery}.watchValue${params}.subscribe({
    next: (result) => {
      console.log("${pallet}.${storageName} changed:", JSON.stringify(result, (_key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ))
    },
    error: (error) => {
      console.error("Watch error:", error)
    },
    complete: () => {
      console.log("Watch complete")
    }
  })
  
  // Stop watching after 30 seconds (optional)
  setTimeout(() => {
    subscription.unsubscribe()
    console.log("Stopped watching ${pallet}.${storageName}")
  }, 30000)`

    case 'comprehensive':
      return `  // Comprehensive storage query example
  console.log("=== Comprehensive ${pallet}.${storageName} Query ===")
  
  // 1. Get current value
  const current = await ${baseQuery}.getValue${params}
  console.log("Current value:", JSON.stringify(current, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
  
  // 2. Get value at finalized block
  const finalized = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ', ' : ''}{ at: "finalized" })
  console.log("Finalized value:", JSON.stringify(finalized, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
  
  ${hasParams ? `// 3. Get multiple values (if storage has keys)
  const multipleKeys = [${paramString}] // Add more keys as needed
  const multipleResults = await ${baseQuery}.getValues(multipleKeys)
  console.log("Multiple results:", multipleResults.length)
  
  ` : ''}// ${hasParams ? '4' : '3'}. Get storage key for this query
  const storageKey = ${baseQuery}.getKey${params}
  console.log("Storage key:", storageKey)
  
  // ${hasParams ? '5' : '4'}. Watch for changes (uncomment to enable)
  // const watcher = ${baseQuery}.watchValue${params}.subscribe(console.log)`

    default:
      return `  // Default: Get single storage value
  const result = await ${baseQuery}.getValue${params}
  console.log("${pallet}.${storageName}:", JSON.stringify(result, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))`
  }
}

function generateCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  // Use educational template based on user preference or default to beginner
  const template = getCodeTemplate()
  
  if (template === 'beginner') {
    return generateBeginnerCodeSnippet(chainKey, pallet, call, formData)
  } else if (template === 'intermediate') {
    return generateIntermediateCodeSnippet(chainKey, pallet, call, formData)
  } else {
    return generateProductionCodeSnippet(chainKey, pallet, call, formData)
  }
}

function getCodeTemplate(): 'beginner' | 'intermediate' | 'production' {
  // For now, default to beginner to match our learning-first approach
  // This could be user configurable in the future
  return 'beginner'
}

function generateBeginnerCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  const args = call.args.map(arg => {
    const value = formData[arg.name] || ''
    const paramDescription = getParameterDescription(arg.name, arg.type)
    
    // Handle MultiAddress types properly for dest/target fields
    if (arg.name === 'dest' || arg.name === 'target' || arg.type.includes('MultiAddress')) {
      if (typeof value === 'string' && value.startsWith('//')) {
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        const address = accountMap[value] || accountMap['//Alice']
        return `    ${arg.name}: "${address}", // ${value} - ${paramDescription}`
      }
      else if (typeof value === 'string' && value.length > 40) {
        return `    ${arg.name}: "${value}", // ${paramDescription}`
      }
      else {
        return `    ${arg.name}: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", // //Alice - ${paramDescription}`
      }
    }
    
    // Handle BigInt values properly
    if (arg.type.includes('u128') || arg.type.includes('u64') || arg.name === 'value' || arg.name === 'amount') {
      const numValue = typeof value === 'string' ? value : String(value || '0')
      const dotValue = parseFloat(numValue) / 10000000000 // Convert planck to DOT (10^10)
      return `    ${arg.name}: ${numValue}n, // ${dotValue} DOT - ${paramDescription}`
    }
    
    return `    ${arg.name}: ${JSON.stringify(value)}, // ${paramDescription}`
  }).join('\n')

  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)
  const setupCommands = getSetupCommands(chainKey)

  return `// 🚀 QUICK START: Use the starter repository
// git clone https://github.com/yourusername/papi-starter-template.git
// cd papi-starter-template && npm install
// 
// Then copy this code into src/transactions.ts and run: npm run dev
//
// OR MANUAL SETUP: ${setupCommands}

import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function main() {
${connection}
  
  // Get the typed API with all chain types
  const ${descriptorName}Api = client.getTypedApi(${descriptorName})
  
  // Create the transaction call
  const call = ${descriptorName}Api.tx.${pallet}.${call.name}({
${args || '    // No parameters needed'}
  })
  
  // Preview the call structure
  console.log("Transaction preview:", JSON.stringify(call.decodedCall, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
  
  // To submit the transaction (uncomment when ready):
  // const signer = yourWallet // Replace with your actual wallet/signer
  // const hash = await call.signAndSubmit(signer)
  // console.log("Transaction submitted:", hash)${cleanup || ''}
}

main().catch(console.error)

// 📋 HOW TO USE THIS CODE:
//
// 1. With Starter Repository (Recommended):
//    - Clone: git clone https://github.com/yourusername/papi-starter-template.git
//    - Install: cd papi-starter-template && npm install
//    - Replace: Copy this entire code into src/transactions.ts
//    - Run: npm run dev
//
// 2. Manual Setup:
//    - Run the setup commands at the top
//    - Copy this code into your project
//    - Import and call main() from your entry point
//
// 3. Next Steps:
//    - Replace the placeholder signer with your wallet
//    - Uncomment the transaction submission lines
//    - Test with small amounts first`
}

function generateIntermediateCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  const args = call.args.map(arg => {
    const value = formData[arg.name] || ''
    
    if (arg.name === 'dest' || arg.name === 'target' || arg.type.includes('MultiAddress')) {
      if (typeof value === 'string' && value.startsWith('//')) {
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        const address = accountMap[value] || accountMap['//Alice']
        return `  ${arg.name}: MultiAddress.Id("${address}"), // ${value}`
      }
      else if (typeof value === 'string' && value.length > 40) {
        return `  ${arg.name}: MultiAddress.Id("${value}")`
      }
      else {
        return `  ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY") // //Alice`
      }
    }
    
    if (arg.type.includes('u128') || arg.type.includes('u64') || arg.name === 'value' || arg.name === 'amount') {
      const numValue = typeof value === 'string' ? value : String(value || '0')
      return `  ${arg.name}: ${numValue}n`
    }
    
    return `  ${arg.name}: ${JSON.stringify(value)}`
  }).join(',\n')

  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)

  return `import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function ${pallet.toLowerCase()}Transaction() {
${connection}
  const typedApi = client.getTypedApi(${descriptorName})
  
  // Create ${pallet}.${call.name} transaction
  const call = typedApi.tx.${pallet}.${call.name}({${args ? '\n' + args + '\n' : ''}})
  
  console.log("Call created:", JSON.stringify(call.decodedCall, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
  
  // Submit with proper signer
  // const hash = await call.signAndSubmit(signer)
  // return hash${cleanup || ''}
}

${pallet.toLowerCase()}Transaction().catch(console.error)`
}

function generateProductionCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  const args = call.args.map(arg => {
    const value = formData[arg.name] || ''
    
    if (arg.name === 'dest' || arg.name === 'target' || arg.type.includes('MultiAddress')) {
      if (typeof value === 'string' && value.startsWith('//')) {
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        const address = accountMap[value] || accountMap['//Alice']
        return `  ${arg.name}: MultiAddress.Id("${address}")`
      }
      else if (typeof value === 'string' && value.length > 40) {
        return `  ${arg.name}: MultiAddress.Id("${value}")`
      }
      else {
        return `  ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`
      }
    }
    
    if (arg.type.includes('u128') || arg.type.includes('u64') || arg.name === 'value' || arg.name === 'amount') {
      const numValue = typeof value === 'string' ? value : String(value || '0')
      return `  ${arg.name}: ${numValue}n`
    }
    
    return `  ${arg.name}: ${JSON.stringify(value)}`
  }).join(',\n')

  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)

  return `import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

export async function execute${pallet}${call.name}(signer: any) {
  try {
${connection}
    const typedApi = client.getTypedApi(${descriptorName})
    
    const call = typedApi.tx.${pallet}.${call.name}({${args ? '\n' + args + '\n' : ''}})
    const hash = await call.signAndSubmit(signer)
    
    return { success: true, hash }
  } catch (error) {
    return { success: false, error: error.message }
  }${cleanup || ''}
}
`
}

function getParameterDescription(paramName: string, paramType: string): string {
  const descriptions: Record<string, string> = {
    dest: 'destination account address',
    value: 'amount in planck units (10^10 planck = 1 DOT)',
    who: 'target account to perform action on',
    amount: 'quantity for the operation',
    target: 'target account or value',
    index: 'position or identifier',
    id: 'unique identifier',
    owner: 'account that owns the resource',
    beneficiary: 'account that receives benefits',
    validator: 'validator account for staking',
    nominator: 'nominator account for staking',
    remark: 'text data to store on-chain'
  }
  
  return descriptions[paramName] || `parameter of type ${paramType}`
}

function generateMultiMethodCode(
  chainKey: string, 
  methodQueue: Array<{ pallet: string; call: PalletCall; formData: Record<string, any>; id: string }>
): string {
  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)

  // Generate method calls
  const methodCalls = methodQueue.map((method, index) => {
    const args = method.call.args.map(arg => {
      const value = method.formData[arg.name] || ''
      
      // Handle MultiAddress types properly for dest/target fields
      if (arg.name === 'dest' || arg.name === 'target' || arg.type.includes('MultiAddress')) {
        if (typeof value === 'string' && value.startsWith('//')) {
          const accountMap: Record<string, string> = {
            '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
            '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
          }
          const address = accountMap[value] || accountMap['//Alice']
          return `    ${arg.name}: MultiAddress.Id("${address}"), // ${value}`
        } else if (typeof value === 'string' && value.length > 40) {
          return `    ${arg.name}: MultiAddress.Id("${value}")`
        } else {
          return `    ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY") // //Alice`
        }
      }
      
      // Handle BigInt values properly
      if (arg.type.includes('u128') || arg.type.includes('u64') || arg.name === 'value' || arg.name === 'amount') {
        const numValue = typeof value === 'string' ? value : String(value || '0')
        if (numValue && !numValue.includes('n') && (parseInt(numValue) > Number.MAX_SAFE_INTEGER || numValue.length > 10)) {
          return `    ${arg.name}: ${numValue}n`
        }
        return `    ${arg.name}: ${numValue}n`
      }
      
      return `    ${arg.name}: ${JSON.stringify(value)}`
    }).join(',\n')

    return `
  // Method ${index + 1}: ${method.pallet}.${method.call.name}
  console.log("Creating ${method.pallet}.${method.call.name}...")
  const call${index + 1} = typedApi.tx.${method.pallet}.${method.call.name}({${args ? '\n' + args + '\n  ' : ''}})
  const result${index + 1} = await call${index + 1}.signAndSubmit(signer)
  console.log("Result ${index + 1}:", result${index + 1})
  
  // Check if method ${index + 1} succeeded before continuing
  if (!result${index + 1}.success) {
    console.error("Method ${index + 1} failed, stopping execution")
    return
  }`
  }).join('\n')

  return `import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function executeMultipleMethods() {
${connection}
  const typedApi = client.getTypedApi(${descriptorName})
  
  // You'll need a proper signer here
  const signer = yourSigner // Replace with actual signer
  ${methodCalls}

  console.log("All methods completed successfully!")${cleanup || ''}
}

executeMultipleMethods().catch(console.error)`
}
