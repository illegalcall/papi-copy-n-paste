"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/layout/header"
import { LeftPane } from "@/components/layout/left-pane"
import { CenterPane } from "@/components/layout/center-pane"
import { RightPane } from "@/components/layout/right-pane"
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Menu } from "lucide-react"
import { useClient, fetchMetadata, buildPalletTree, PalletCall, PalletInfo, executeTransactionWithSteps, type TransactionStep, getExplorerLinks, getExplorerName, hasExplorer } from "@workspace/core"

export default function Page() {
  const [selectedChain, setSelectedChain] = useState("polkadot")
  const [leftPaneOpen, setLeftPaneOpen] = useState(false)
  const [code, setCode] = useState("")
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [pallets, setPallets] = useState<PalletInfo[]>([])
  const [selectedCall, setSelectedCall] = useState<{ pallet: string; call: PalletCall } | undefined>()
  const [selectedStorage, setSelectedStorage] = useState<{ pallet: string; storage: any } | undefined>()
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [canRun, setCanRun] = useState(false)
  const [activeTab, setActiveTab] = useState<"code" | "console">("code")
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false)
  const [metadataError, setMetadataError] = useState<string | null>(null)
  
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
  }, [])

  const handleStorageSelect = (pallet: string, storage: any) => {
    setSelectedStorage({ pallet, storage })
    setSelectedCall(undefined) // Clear call selection
    setFormData({})
    
    // Generate storage query code immediately
    const queryCode = generateStorageQueryCode(selectedChain, pallet, storage)
    setCode(queryCode)
  }

  const handleFormChange = useCallback((newFormData: Record<string, any>) => {
    setFormData(newFormData)
    
    // Generate code snippet
    if (selectedCall) {
      const snippet = generateCodeSnippet(selectedChain, selectedCall.pallet, selectedCall.call, newFormData)
      setCode(snippet)
    }
  }, [selectedChain, selectedCall])

  const handleValidChange = useCallback((isValid: boolean) => {
    setCanRun(isValid)
  }, [])

  const handleRunClick = async () => {
    if (!selectedCall || !code || !api) return

    setIsRunning(true)
    setActiveTab("console") // Switch to console tab when running
    setConsoleOutput([]) // Clear previous output

    // Execute real transaction
    await executeRealTransaction(selectedCall, formData, selectedChain, api, setConsoleOutput, setIsRunning)
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
        <div className="hidden lg:grid lg:grid-cols-[260px_400px_1fr] flex-1">
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
            onFormChange={handleFormChange}
            onValidChange={handleValidChange}
            onRunClick={handleRunClick}
            onAbortClick={handleAbortClick}
            isRunning={isRunning}
            canRun={canRun}
          />
          <RightPane
            code={code}
            consoleOutput={consoleOutput}
            onClearConsole={handleClearConsole}
            activeTab={activeTab}
          />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex-1 flex flex-col">
          <CenterPane 
            chainStatus={chainStatus}
            selectedChain={selectedChain}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            onFormChange={handleFormChange}
            onValidChange={handleValidChange}
            onRunClick={handleRunClick}
            onAbortClick={handleAbortClick}
            isRunning={isRunning}
            canRun={canRun}
          />
          <div className="border-t">
            <RightPane
              code={code}
              consoleOutput={consoleOutput}
              onClearConsole={handleClearConsole}
              activeTab={activeTab}
            />
          </div>
        </div>

        {/* Mobile sheet for left pane */}
        <Sheet open={leftPaneOpen} onOpenChange={setLeftPaneOpen}>
          <SheetContent side="left" className="p-0 w-64">
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

// Keep the old simulation function for reference (will be removed later)
function simulateTransactionExecution(
  selectedCall: { pallet: string; call: PalletCall },
  formData: Record<string, any>,
  chainKey: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Generate a complete transaction hash
  const txHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
  
  const steps = [
    `> Running ${selectedCall.pallet}.${selectedCall.call.name}...`,
    `> Connecting to ${chainKey} via smoldot light client...`,
    `> ✓ Connected to chain (block #${21000000 + Math.floor(Math.random() * 1000000)})`,
    `> Building transaction: ${selectedCall.pallet}.${selectedCall.call.name}`,
    `> Arguments: ${JSON.stringify(formData, null, 2).split('\n').join('\n>   ')}`,
    `> Signing with //Alice (5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY)`,
    `> ✓ Transaction signed`,
    `> Submitting to network...`,
    `> ✓ Transaction hash: ${txHash}`,
    `⚠️  WARNING: This is a demo simulation with fake transaction data`,
    `> ✓ Included in block #${21000000 + Math.floor(Math.random() * 1000000)}`,
    ``,
    hasExplorer(chainKey) ?
      `🔗 View on ${getExplorerName(chainKey)}: ${getExplorerLinks(chainKey)?.transaction(txHash)}` :
      `🔗 Explorer not available for ${chainKey}`,
    `🔗 From: //Alice (5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY)`,
    formatTransactionDetails(selectedCall, formData),
    ``,
    `✅ Transaction executed successfully!`
  ]

  let stepIndex = 0
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      setConsoleOutput(prev => [...prev, steps[stepIndex] || ''])
      stepIndex++
    } else {
      clearInterval(interval)
      setIsRunning(false)
    }
  }, 300) // Show each step every 300ms
}

function formatTransactionDetails(selectedCall: { pallet: string; call: PalletCall }, formData: Record<string, any>): string {
  if (selectedCall.pallet === 'Balances' && selectedCall.call.name.includes('transfer')) {
    const dest = formData.dest || '//Bob'
    const value = formData.value || 0
    const formatted = (value / 1000000000000).toFixed(12) // Convert from planck to DOT
    return `🔗 To: ${dest} (5FHneW46...)
🔗 Amount: ${formatted} DOT`
  }
  
  if (selectedCall.pallet === 'System' && selectedCall.call.name === 'remark') {
    return `🔗 Remark: "${formData.remark || 'Hello World'}"`
  }
  
  return `🔗 Parameters: ${Object.entries(formData).map(([k, v]) => `${k}: ${v}`).join(', ')}`
}

function generateStorageQueryCode(chainKey: string, pallet: string, storage: any): string {
  return `import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"

async function queryStorage() {
  // Initialize smoldot light client
  const smoldot = start()
  const chain = await smoldot.addChain({ 
    chainSpec: "${chainKey}" 
  })
  
  // Create PAPI client
  const client = createClient(getSmProvider(chain))
  
  // Query storage
  const result = await client.query.${pallet}.${storage.name}()
  console.log("${pallet}.${storage.name}:", result)
  
  // Cleanup
  smoldot.terminate()
  
  return result
}

queryStorage().catch(console.error)`
}

function generateCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  const args = call.args.map(arg => {
    const value = formData[arg.name] || ''
    return `  ${arg.name}: ${JSON.stringify(value)}`
  }).join(',\n')

  return `import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"

async function main() {
  // Initialize smoldot light client
  const smoldot = start()
  const chain = await smoldot.addChain({ 
    chainSpec: "${chainKey}" 
  })
  
  // Create PAPI client
  const client = createClient(getSmProvider(chain))
  
  // Build the call
  const call = client.tx.${pallet}.${call.name}({${args ? '\n' + args + '\n' : ''}})
  
  // Sign and submit
  const hash = await call.signAndSubmit("//Alice")
  console.log("Transaction hash:", hash)
  
  // Cleanup
  smoldot.terminate()
}

main().catch(console.error)`
}
