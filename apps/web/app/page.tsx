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

// simulateTransactionExecution function removed as it's no longer used

function getSetupCommands(chainKey: string): string {
  const chainConfigs = {
    polkadot: {
      wsUrl: "wss://rpc.polkadot.io",
      description: "Polkadot mainnet"
    },
    kusama: {
      wsUrl: "wss://kusama-rpc.polkadot.io", 
      description: "Kusama mainnet"
    },
    moonbeam: {
      wsUrl: "wss://wss.api.moonbeam.network",
      description: "Moonbeam mainnet"
    },
    bifrost: {
      wsUrl: "wss://hk.p.bifrost-rpc.liebi.com/ws",
      description: "Bifrost mainnet"
    },
    astar: {
      wsUrl: "wss://rpc.astar.network",
      description: "Astar mainnet"
    },
    acala: {
      wsUrl: "wss://acala-rpc.dwellir.com",
      description: "Acala mainnet"
    },
    hydration: {
      wsUrl: "wss://rpc.hydration.cloud",
      description: "Hydration mainnet"
    }
  }

  const config = chainConfigs[chainKey as keyof typeof chainConfigs] || chainConfigs.polkadot
  
  return `// npm install polkadot-api
// npx papi add dot -n ${chainKey}
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
  return `import { MultiAddress, ${descriptorName} } from "@polkadot-api/descriptors"`
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
  // Use the correct chainSpec pattern based on the working code
  const chainConfigs = {
    polkadot: { wsUrl: "wss://rpc.polkadot.io", chainSpec: "polkadot" },
    kusama: { wsUrl: "wss://kusama-rpc.polkadot.io", chainSpec: "ksmcc3" },
    moonbeam: { wsUrl: "wss://wss.api.moonbeam.network", chainSpec: "moonbeam" },
    bifrost: { wsUrl: "wss://hk.p.bifrost-rpc.liebi.com/ws", chainSpec: "bifrost" },
    astar: { wsUrl: "wss://rpc.astar.network", chainSpec: "astar" },
    acala: { wsUrl: "wss://acala-rpc.dwellir.com", chainSpec: "acala" },
    hydration: { wsUrl: "wss://rpc.hydration.cloud", chainSpec: "hydration" }
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
    const formatted = (value / 1000000000000).toFixed(12) // Convert from planck to DOT
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

function generateStorageQueryCode(chainKey: string, pallet: string, storage: any): string {
  const setupCommands = getSetupCommands(chainKey)
  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)
  
  return `// SETUP REQUIRED: Run these commands in your project:
${setupCommands}

import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function queryStorage() {
${connection}
  const typedApi = client.getTypedApi(${descriptorName})
  
  const result = await typedApi.query.${pallet}.${storage.name}()
  console.log("${pallet}.${storage.name}:", JSON.stringify(result, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))${cleanup || ''}
  
  return result
}

queryStorage().catch(console.error)`
}

function generateCodeSnippet(chainKey: string, pallet: string, call: PalletCall, formData: Record<string, any>): string {
  const args = call.args.map(arg => {
    const value = formData[arg.name] || ''
    
    // Handle MultiAddress types properly for dest/target fields
    if (arg.name === 'dest' || arg.name === 'target' || arg.type.includes('MultiAddress')) {
      // If it's a named account like //Alice, //Bob, convert to proper SS58 address
      if (typeof value === 'string' && value.startsWith('//')) {
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        const address = accountMap[value] || accountMap['//Alice']
        return `  ${arg.name}: MultiAddress.Id("${address}"), // ${value}`
      }
      // If it's already a valid SS58 address, use it directly
      else if (typeof value === 'string' && value.length > 40) {
        return `  ${arg.name}: MultiAddress.Id("${value}")`
      }
      // Default to Alice for empty values
      else {
        return `  ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY") // //Alice`
      }
    }
    
    // Handle BigInt values properly
    if (arg.type.includes('u128') || arg.type.includes('u64') || arg.name === 'value' || arg.name === 'amount') {
      const numValue = typeof value === 'string' ? value : String(value || '0')
      // Add 'n' suffix for BigInt if it's a large number
      if (numValue && !numValue.includes('n') && (parseInt(numValue) > Number.MAX_SAFE_INTEGER || numValue.length > 10)) {
        return `  ${arg.name}: ${numValue}n`
      }
      return `  ${arg.name}: ${numValue}n`
    }
    
    return `  ${arg.name}: ${JSON.stringify(value)}`
  }).join(',\n')

  const setupCommands = getSetupCommands(chainKey)
  const descriptorImport = getDescriptorImport(chainKey)
  const descriptorName = getDescriptorName(chainKey)
  const { imports, connection, cleanup } = getChainConnection(chainKey)

  return `// SETUP REQUIRED: Run these commands in your project:
${setupCommands}

import { createClient } from "polkadot-api"
${imports}
${descriptorImport}

async function main() {
${connection}
  const typedApi = client.getTypedApi(${descriptorName})
  
  const call = typedApi.tx.${pallet}.${call.name}({${args ? '\n' + args + '\n' : ''}})
  
  // For testing purposes, just create the call (don't actually submit)
  console.log("Call created:", JSON.stringify(call.decodedCall, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
  
  // To actually submit, you would need a proper signer:
  // const hash = await call.signAndSubmit(yourSigner)
  // console.log("Transaction hash:", hash)${cleanup || ''}
}

main().catch(console.error)`
}
