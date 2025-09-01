"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Package, Zap, Database, Calendar } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { PalletInfo, PalletCall } from "@workspace/core"

interface PalletTreeProps {
  pallets: PalletInfo[]
  searchQuery: string
  onCallSelect: (pallet: string, call: PalletCall) => void
  onStorageSelect: (pallet: string, storage: any) => void
  selectedCall?: { pallet: string; call: string }
  selectedStorage?: { pallet: string; storage: string }
}

export function PalletTree({ pallets, searchQuery, onCallSelect, onStorageSelect, selectedCall, selectedStorage }: PalletTreeProps) {
  // Start with essential pallets expanded for better UX and scrollable content
  const [expandedPallets, setExpandedPallets] = useState<Set<string>>(new Set(['System', 'Balances', 'Timestamp']))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['System-calls', 'Balances-calls', 'Timestamp-calls']))


  const filteredPallets = pallets.filter(pallet => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      pallet.name.toLowerCase().includes(query) ||
      pallet.calls.some(call => call.name.toLowerCase().includes(query)) ||
      pallet.storage.some(storage => storage.name.toLowerCase().includes(query)) ||
      pallet.events.some(event => event.name.toLowerCase().includes(query))
    )
  })

  const togglePallet = (palletName: string) => {
    const newExpanded = new Set(expandedPallets)
    if (newExpanded.has(palletName)) {
      newExpanded.delete(palletName)
    } else {
      newExpanded.add(palletName)
    }
    setExpandedPallets(newExpanded)
  }

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey)
    } else {
      newExpanded.add(sectionKey)
    }
    setExpandedSections(newExpanded)
  }

  const handleCallClick = (pallet: PalletInfo, call: PalletCall) => {
    onCallSelect(pallet.name, call)
  }

  const handleStorageClick = (pallet: PalletInfo, storage: any) => {
    onStorageSelect(pallet.name, storage)
  }

  if (filteredPallets.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        {searchQuery ? 'No matching pallets found' : 'No pallets available'}
      </div>
    )
  }

  return (
    <div className="space-y-1" data-testid="pallet-tree">
      {filteredPallets.map((pallet) => (
        <div key={pallet.name} data-testid="pallet-item">
          <Button
            variant="ghost"
            className="w-full justify-start h-8 px-2 font-normal"
            onClick={() => togglePallet(pallet.name)}
          >
            {expandedPallets.has(pallet.name) ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            )}
            <Package className="w-4 h-4 mr-2" />
            <span className="truncate">{pallet.name}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {pallet.calls.length}
            </span>
          </Button>

            {expandedPallets.has(pallet.name) && (
            <div className="ml-4 space-y-1">
              {/* Calls Section */}
              {pallet.calls.length > 0 && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-7 px-2 font-normal text-xs"
                    onClick={() => toggleSection(`${pallet.name}-calls`)}
                  >
                    {expandedSections.has(`${pallet.name}-calls`) ? (
                      <ChevronDown className="w-3 h-3 mr-1" />
                    ) : (
                      <ChevronRight className="w-3 h-3 mr-1" />
                    )}
                    <Zap className="w-3 h-3 mr-2" />
                    <span>Calls ({pallet.calls.length})</span>
                  </Button>

                  {expandedSections.has(`${pallet.name}-calls`) && (
                    <div className="ml-4 space-y-0.5">
                      {pallet.calls.map((call) => {
                        const isSelected = selectedCall?.pallet === pallet.name && selectedCall?.call === call.name
                        return (
                          <Button
                            key={call.name}
                            variant={isSelected ? "secondary" : "ghost"}
                            className="w-full justify-start h-6 px-2 font-normal text-xs"
                            onClick={() => handleCallClick(pallet, call)}
                          >
                            <span className="truncate">{call.name}</span>
                            {call.args.length > 0 && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                {call.args.length} args
                              </span>
                            )}
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Storage Section */}
              {pallet.storage.length > 0 && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-7 px-2 font-normal text-xs"
                    onClick={() => toggleSection(`${pallet.name}-storage`)}
                  >
                    {expandedSections.has(`${pallet.name}-storage`) ? (
                      <ChevronDown className="w-3 h-3 mr-1" />
                    ) : (
                      <ChevronRight className="w-3 h-3 mr-1" />
                    )}
                    <Database className="w-3 h-3 mr-2" />
                    <span>Storage ({pallet.storage.length})</span>
                  </Button>

                  {expandedSections.has(`${pallet.name}-storage`) && (
                    <div className="ml-4 space-y-0.5">
                      {pallet.storage.map((storage) => {
                        const isSelected = selectedStorage?.pallet === pallet.name && selectedStorage?.storage === storage.name
                        return (
                          <Button
                            key={storage.name}
                            variant={isSelected ? "secondary" : "ghost"}
                            className="w-full justify-start h-6 px-2 font-normal text-xs"
                            onClick={() => handleStorageClick(pallet, storage)}
                          >
                            <span className="truncate">{storage.name}</span>
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Events Section */}
              {pallet.events.length > 0 && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-7 px-2 font-normal text-xs"
                    onClick={() => toggleSection(`${pallet.name}-events`)}
                  >
                    {expandedSections.has(`${pallet.name}-events`) ? (
                      <ChevronDown className="w-3 h-3 mr-1" />
                    ) : (
                      <ChevronRight className="w-3 h-3 mr-1" />
                    )}
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Events ({pallet.events.length})</span>
                  </Button>

                  {expandedSections.has(`${pallet.name}-events`) && (
                    <div className="ml-4 space-y-0.5">
                      {pallet.events.map((event) => (
                        <Button
                          key={event.name}
                          variant="ghost"
                          className="w-full justify-start h-6 px-2 font-normal text-xs"
                          disabled
                        >
                          <span className="truncate">{event.name}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}