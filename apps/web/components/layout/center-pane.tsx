"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
// Badge import removed as not currently used
import { Play, Square } from "lucide-react"
import { SimpleCallForm } from "@/components/forms/simple-call-form"
import { PalletCall } from "@workspace/core"

interface CenterPaneProps {
  chainStatus: 'connecting' | 'ready' | 'error'
  selectedChain: string
  selectedCall?: { pallet: string; call: PalletCall }
  selectedStorage?: { pallet: string; storage: any }
  onFormChange: (formData: Record<string, any>) => void
  onValidChange: (isValid: boolean) => void
  onRunClick: () => void
  onAbortClick: () => void
  isRunning: boolean
  canRun: boolean
}

export function CenterPane({ 
  chainStatus, 
  selectedChain, 
  selectedCall,
  selectedStorage,
  onFormChange,
  onValidChange,
  onRunClick,
  onAbortClick,
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
            <CardDescription>
              {selectedStorage.storage.docs?.length > 0 
                ? selectedStorage.storage.docs.join(' ') 
                : 'Storage query - no parameters needed'
              }
            </CardDescription>
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
          <Button 
            size="lg" 
            disabled={!canRun || !selectedCall || isRunning}
            onClick={onRunClick}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
          <Button 
            variant="destructive" 
            size="lg" 
            disabled={!isRunning}
            onClick={onAbortClick}
          >
            <Square className="w-4 h-4 mr-2" />
            Abort
          </Button>
        </div>
      </div>
    </div>
  )
}