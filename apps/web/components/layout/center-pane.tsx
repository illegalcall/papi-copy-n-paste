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

// Enhanced documentation renderer with better formatting and merged code blocks
function renderDocumentation(docs: string[]) {
  const docText = docs.join('\n\n')
  
  // Split into paragraphs for better structure
  const paragraphs = docText.split(/\n\s*\n/)
  
  // Merge continuous code blocks
  const mergedContent: Array<{ type: 'code' | 'text', content: string }> = []
  
  paragraphs.forEach((paragraph) => {
    const trimmedParagraph = paragraph.trim()
    
    // Skip empty paragraphs
    if (!trimmedParagraph) return
    
    const isCodeBlock = /^(impl|type|struct|enum|fn|use|#\[|\/\/|\/\*|```|nocompile)/.test(trimmedParagraph) ||
                       paragraph.includes('nocompile') ||
                       paragraph.includes('```') ||
                       paragraph.split('\n').length > 2 && paragraph.includes('::') ||
                       /^\s*(impl|type|struct|enum)\s+/.test(paragraph) ||
                       /^\s*[})\]]\s*$/.test(trimmedParagraph) || // Closing braces/brackets
                       /^\s*[{(\[]\s*$/.test(trimmedParagraph) || // Opening braces/brackets
                       /^[A-Za-z_][A-Za-z0-9_]*\s*[,:]/.test(trimmedParagraph) || // Field names
                       /Storage|Runtime|Account|Balance|Provider/.test(trimmedParagraph) // Common Rust types
    
    if (isCodeBlock) {
      // Clean up the code block
      const cleanedCode = paragraph
        .trim()
        .replace(/^```\w*\n?/, '')
        .replace(/\n?```$/, '')
        .replace(/^\s*nocompile\s*\n?/, '')
        .replace(/^# Example\s*\n?/, '')
        .replace(/^\s*```\s*$/, '') // Remove standalone backticks
        .trim()
      
      // Skip if cleaned code is empty
      if (!cleanedCode) return
      
      // Check if the last item was also a code block
      const lastItem = mergedContent[mergedContent.length - 1]
      if (lastItem && lastItem.type === 'code') {
        // Merge with previous code block
        lastItem.content += '\n\n' + cleanedCode
      } else {
        // Add new code block
        mergedContent.push({ type: 'code', content: cleanedCode })
      }
    } else {
      // Skip headers like "# Example" that are standalone
      if (trimmedParagraph.match(/^# Example\s*$/)) return
      
      // Add text content
      mergedContent.push({ type: 'text', content: trimmedParagraph })
    }
  })
  
  // Filter out any remaining empty items
  const filteredContent = mergedContent.filter(item => item.content.trim().length > 0)
  
  return (
    <div className="space-y-3">
      {filteredContent.map((item, index) => {
        if (item.type === 'code') {
          return (
            <div key={index} className="bg-muted/30 border rounded-lg p-3">
              <pre className="font-mono text-xs text-foreground whitespace-pre-wrap overflow-x-auto leading-5 m-0">
                {item.content}
              </pre>
            </div>
          )
        }
        
        // Check if this is a section header (starts with #)
        if (item.content.startsWith('#')) {
          return (
            <h4 key={index} className="text-sm font-medium text-foreground mt-4 mb-2">
              {item.content.replace(/^#+\s*/, '')}
            </h4>
          )
        }
        
        // Handle text with inline code
        const codePattern = /`([^`]+)`/g
        const hasInlineCode = codePattern.test(item.content)
        
        if (hasInlineCode) {
          const parts = item.content.split(codePattern)
          
          return (
            <div key={index} className="text-sm text-muted-foreground leading-relaxed">
              {parts.map((part, partIndex) => {
                if (partIndex % 2 === 1) {
                  return (
                    <code 
                      key={partIndex} 
                      className="px-2 py-1 mx-1 bg-muted/70 text-foreground font-mono text-xs rounded border"
                    >
                      {part}
                    </code>
                  )
                } else {
                  return <span key={partIndex}>{part}</span>
                }
              })}
            </div>
          )
        }
        
        // Regular paragraph
        return (
          <p key={index} className="text-sm text-muted-foreground leading-relaxed">
            {item.content}
          </p>
        )
      })}
    </div>
  )
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
        <div className="space-y-6">
          {/* Storage Header */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-1">Storage</Badge>
                <CardTitle className="text-lg font-medium">
                  {selectedStorage.pallet}.{selectedStorage.storage.name}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          {/* Documentation Section */}
          {selectedStorage.storage.docs?.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  📖 Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {renderDocumentation(selectedStorage.storage.docs)}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  ✅
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Storage Query Ready
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Storage query code generated! Check the <strong>Code</strong> tab to copy and use it.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
          {/* Single method run */}
          {selectedCall && methodQueue.length === 0 && (
            <>
              <Button 
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run'}
              </Button>
              <Button 
                variant="outline"
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onAddToQueue}
                className="min-w-0 flex-shrink"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isRunning ? 'Queue' : 'Add to Queue'}
              </Button>
            </>
          )}
          
          {/* Multi-method run */}
          {methodQueue.length > 0 && (
            <>
              <Button 
                size={isRunning ? "default" : "lg"}
                disabled={isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : `Run Queue (${methodQueue.length})`}
              </Button>
              {selectedCall && (
                <Button 
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={!canRun || isRunning}
                  onClick={onAddToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? 'Add' : 'Add More'}
                </Button>
              )}
            </>
          )}
          
          {/* Abort button - always available when running */}
          {isRunning && (
            <Button 
              variant="destructive" 
              size="default"
              onClick={onAbortClick}
              className="min-w-0 flex-shrink"
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