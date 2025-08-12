import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supportedChains, type SupportedChain } from "@/lib/chains"

export function ChainSelector() {
  const [selectedChain] = useState<SupportedChain>("{{chainName}}" as SupportedChain)
  
  // In a full implementation, this would handle chain switching
  const handleChainSelect = (chain: SupportedChain) => {
    console.log("Switching to chain:", chain)
    // This would trigger a chain switch and reconnection
  }
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Chain:</span>
      <Button
        variant="outline"
        size="sm"
        className="h-8"
      >
        {supportedChains[selectedChain].displayName}
      </Button>
      
      {/* Dropdown for other chains would go here */}
      <div className="hidden space-x-1">
        {Object.entries(supportedChains).map(([key, config]) => (
          <Badge
            key={key}
            variant={key === selectedChain ? "default" : "outline"}
            className={`cursor-pointer chain-badge-${key}`}
            onClick={() => handleChainSelect(key as SupportedChain)}
          >
            {config.displayName}
          </Badge>
        ))}
      </div>
    </div>
  )
}