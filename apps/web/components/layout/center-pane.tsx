"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Play, Square, Plus, X, List } from "lucide-react"
import { SimpleCallForm } from "@/components/forms/simple-call-form"
import { PalletCall } from "@workspace/core"
import { SyntaxHighlighter } from "@/components/code/syntax-highlighter"

interface CenterPaneProps {
  chainStatus: 'connecting' | 'ready' | 'error'
  selectedChain: string
  selectedCall?: { pallet: string; call: PalletCall }
  selectedStorage?: { pallet: string; storage: any }
  methodQueue: Array<{ 
    pallet: string; 
    call: PalletCall; 
    formData: Record<string, any>;
    id: string;
  }>
  onFormChange: (formData: Record<string, any>) => void
  onValidChange: (isValid: boolean) => void
  onRunClick: () => void
  onAbortClick: () => void
  onAddToQueue: () => void
  onRemoveFromQueue: (id: string) => void
  onClearQueue: () => void
  isRunning: boolean
  canRun: boolean
}

// Helper function to render documentation with inline syntax highlighting
function renderDocumentation(docs: string[]) {
  const docText = docs.join(' ')
  
  // Pattern to match code snippets in backticks
  const codePattern = /`([^`]+)`/g
  const hasCodeExamples = codePattern.test(docText)
  
  if (hasCodeExamples) {
    const parts = docText.split(codePattern)
    
    return (
      <div className="text-sm text-muted-foreground leading-relaxed">
        {parts.map((part, index) => {
          // Check if this part was inside backticks (odd indices after split)
          if (index % 2 === 1) {
            // This is code - render with inline highlighting
            return (
              <code 
                key={index} 
                className="px-1.5 py-0.5 mx-0.5 bg-muted/70 text-foreground font-mono text-xs rounded border"
              >
                {part}
              </code>
            )
          } else {
            // This is regular text
            return part
          }
        })}
      </div>
    )
  }
  
  return <div className="text-sm text-muted-foreground leading-relaxed">{docText}</div>
}

export function CenterPane({ 
  chainStatus, 
  selectedChain, 
  selectedCall,
  selectedStorage,
  methodQueue,
  onFormChange,
  onValidChange,
  onRunClick,
  onAbortClick,
  onAddToQueue,
  onRemoveFromQueue,
  onClearQueue,
  isRunning,
  canRun
}: CenterPaneProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connecting': return 'bg-yellow-500'
      case 'ready': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="flex-1 px-6 py-4 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(chainStatus)}`} />
          <span className="text-sm text-muted-foreground">
            {chainStatus === 'connecting' && 'Connecting to chain...'}
            {chainStatus === 'ready' && `Connected to ${selectedChain}`}
            {chainStatus === 'error' && 'Connection failed'}
          </span>
        </div>
      </div>

      {/* Method Queue Display */}
      {methodQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Method Queue ({methodQueue.length})
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearQueue}
                disabled={isRunning}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Methods will be executed sequentially. If any method fails, execution will stop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {methodQueue.map((method, index) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <div className="font-medium">
                        {method.pallet}.{method.call.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {method.call.args.length} argument{method.call.args.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromQueue(method.id)}
                    disabled={isRunning}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCall ? (
        <SimpleCallForm
          key={`${selectedCall.pallet}-${selectedCall.call.name}`}
          pallet={selectedCall.pallet}
          call={selectedCall.call}
          onFormChange={onFormChange}
          onValidChange={onValidChange}
        />
      ) : selectedStorage ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedStorage.pallet}.{selectedStorage.storage.name}
            </CardTitle>
            <div className="mt-2">
              {selectedStorage.storage.docs?.length > 0 
                ? renderDocumentation(selectedStorage.storage.docs)
                : <div className="text-sm text-muted-foreground">Storage query - no parameters needed</div>
              }
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              Storage query code generated! Check the Code tab →
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select a Pallet Call or Storage</CardTitle>
            <CardDescription>
              Choose a call (to execute transactions) or storage item (to query data) from the left panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              {chainStatus === 'ready' ? 'Select a chain and explore the available pallets' : 'Connecting to chain...'}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-4 inset-x-4 lg:relative lg:bottom-auto lg:inset-x-auto lg:mt-6">
        <div className="flex gap-2 justify-center lg:justify-start">
          {/* Single method run */}
          {selectedCall && methodQueue.length === 0 && (
            <>
              <Button 
                size="lg" 
                disabled={!canRun || isRunning}
                onClick={onRunClick}
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run'}
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                disabled={!canRun || isRunning}
                onClick={onAddToQueue}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>
            </>
          )}
          
          {/* Multi-method run */}
          {methodQueue.length > 0 && (
            <>
              <Button 
                size="lg" 
                disabled={isRunning}
                onClick={onRunClick}
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running Queue...' : `Run Queue (${methodQueue.length})`}
              </Button>
              {selectedCall && (
                <Button 
                  variant="outline"
                  size="lg" 
                  disabled={!canRun || isRunning}
                  onClick={onAddToQueue}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More
                </Button>
              )}
            </>
          )}
          
          {/* Abort button - always available when running */}
          {isRunning && (
            <Button 
              variant="destructive" 
              size="lg" 
              onClick={onAbortClick}
            >
              <Square className="w-4 h-4 mr-2" />
              Abort
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}