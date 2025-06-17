"use client"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Input } from "@workspace/ui/components/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { PalletTree } from "@/components/tree/pallet-tree"
import { PalletInfo, PalletCall } from "@workspace/core"

interface LeftPaneProps {
  isOpen: boolean
  onClose: () => void
  pallets: PalletInfo[]
  onCallSelect: (pallet: string, call: PalletCall) => void
  onStorageSelect: (pallet: string, storage: any) => void
  selectedCall?: { pallet: string; call: string }
  selectedStorage?: { pallet: string; storage: string }
}

export function LeftPane({ isOpen, onClose, pallets, onCallSelect, onStorageSelect, selectedCall, selectedStorage }: LeftPaneProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-64 bg-muted/40 border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pallets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {pallets.length === 0 ? (
            <div className="text-sm text-muted-foreground mb-2">
              Connect to a chain to explore pallets
            </div>
          ) : (
            <PalletTree
              pallets={pallets}
              searchQuery={searchQuery}
              onCallSelect={onCallSelect}
              onStorageSelect={onStorageSelect}
              selectedCall={selectedCall}
              selectedStorage={selectedStorage}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  )
}