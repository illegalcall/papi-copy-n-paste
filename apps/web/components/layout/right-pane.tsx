"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Toast } from "@workspace/ui/components/toast"
import { Copy, Terminal, Trash2, Settings } from "lucide-react"
import { SyntaxHighlighter } from "@/components/code/syntax-highlighter"

interface RightPaneProps {
  code: string
  consoleOutput: string[]
  onClearConsole?: () => void
  activeTab?: "setup" | "code" | "console"
  selectedChain?: string
}

export function RightPane({ 
  code, 
  consoleOutput, 
  onClearConsole, 
  activeTab,
  selectedChain
}: RightPaneProps) {
  const [currentTab, setCurrentTab] = useState<"setup" | "code" | "console">("setup")
  const [showToast, setShowToast] = useState(false)

  // Update current tab when activeTab prop changes
  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab])

  const getSetupCommands = (chainKey: string): { commands: string[], description: string } => {
    const chainConfigs: Record<string, { wsUrl: string; description: string }> = {
      polkadot: {
        wsUrl: "wss://rpc.polkadot.io",
        description: "Polkadot mainnet"
      },
      kusama: {
        wsUrl: "wss://kusama-rpc.polkadot.io",
        description: "Kusama network"
      },
      moonbeam: {
        wsUrl: "wss://wss.api.moonbeam.network",
        description: "Moonbeam parachain"
      },
      bifrost: {
        wsUrl: "wss://hk.p.bifrost-rpc.liebi.com/ws",
        description: "Bifrost parachain"
      },
      astar: {
        wsUrl: "wss://rpc.astar.network",
        description: "Astar parachain"
      },
      acala: {
        wsUrl: "wss://acala-rpc.dwellir.com",
        description: "Acala parachain"
      },
      hydration: {
        wsUrl: "wss://rpc.hydration.cloud",
        description: "Hydration parachain"
      }
    }
    
    const config = chainConfigs[chainKey] || chainConfigs.polkadot
    
    return {
      commands: [
        "npm install -g polkadot-api",
        `papi add ${chainKey} --wsUrl ${config!.wsUrl}`,
        "papi generate",
        "npm install"
      ],
      description: config!.description
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setShowToast(true)
    } catch (err) {
      console.error('Failed to copy code:', err)
      // Fallback: show toast anyway to indicate attempt was made
      setShowToast(true)
    }
  }

  const renderConsoleLine = (line: string) => {
    // Check if line contains a URL (starting with http)
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = line.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors break-all inline-block max-w-full"
            title={part} // Show full URL on hover
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <div className="flex-1 border-l bg-muted/30 flex flex-col min-h-0 max-h-full overflow-hidden">
      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "setup" | "code" | "console")} className="flex-1 flex flex-col min-h-0 max-h-full">
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="setup" className="flex-1 p-4 m-0 h-0 max-h-full overflow-hidden">
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <CardTitle className="text-sm">
                  Setup Required{selectedChain && ` for ${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)}`}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-auto">
              {selectedChain ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Run these commands in your project to use the generated code:
                  </div>
                  
                  <div className="space-y-2">
                    {getSetupCommands(selectedChain).commands.map((command, index) => (
                      <div key={index} className="font-mono text-sm bg-muted p-3 rounded-md flex items-center gap-2">
                        <span className="text-muted-foreground select-none">$</span>
                        <span className="text-foreground">{command}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Setting up:</strong> {getSetupCommands(selectedChain).description}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-md">
                    <strong>Note:</strong> After running these commands, you can copy and use the generated code from the Code tab.
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select a chain from the left panel to see setup instructions.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 p-4 m-0 h-0 max-h-full overflow-hidden">
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Generated Code</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  disabled={!code}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="overflow-auto p-4 bg-muted rounded-md h-[calc(100vh-20rem)]">
                <SyntaxHighlighter 
                  code={code}
                  language="typescript"
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="console" className="flex-1 p-4 m-0 h-0 max-h-full overflow-hidden">
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Console Output
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearConsole}
                  disabled={consoleOutput.length === 0}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="overflow-auto p-4 pr-6 font-mono text-xs space-y-1 h-[calc(100vh-20rem)]">
                {consoleOutput.length === 0 ? (
                  <div className="text-muted-foreground">No output yet...</div>
                ) : (
                  consoleOutput.map((line, index) => (
                    <div key={index} className="break-words whitespace-pre-wrap leading-relaxed">
                      {renderConsoleLine(line)}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Toast 
        message="Code copied to clipboard!" 
        show={showToast} 
        onHide={() => setShowToast(false)}
      />
    </div>
  )
}