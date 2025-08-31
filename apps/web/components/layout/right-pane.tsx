"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Toast } from "@workspace/ui/components/toast"
import { Copy, Terminal, Trash2 } from "lucide-react"
import { SyntaxHighlighter } from "@/components/code/syntax-highlighter"

interface RightPaneProps {
  code: string
  consoleOutput: string[]
  onClearConsole?: () => void
  activeTab?: "code" | "console"
}

export function RightPane({ code, consoleOutput, onClearConsole, activeTab }: RightPaneProps) {
  const [currentTab, setCurrentTab] = useState<"code" | "console">("code")
  const [showToast, setShowToast] = useState(false)

  // Update current tab when activeTab prop changes
  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab])

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
      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "code" | "console")} className="flex-1 flex flex-col min-h-0 max-h-full">
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
        </div>
        
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