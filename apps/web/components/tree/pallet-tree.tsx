"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Package,
  Zap,
  Database,
  Calendar,
  Settings,
  AlertTriangle,
  Code,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { PalletInfo, PalletCall, PalletConstant, PalletError, PalletEvent } from "@workspace/core";

interface PalletTreeProps {
  pallets: PalletInfo[];
  searchQuery: string;
  onCallSelect: (pallet: string, call: PalletCall) => void;
  onStorageSelect: (pallet: string, storage: any) => void;
  onConstantSelect?: (pallet: string, constant: PalletConstant) => void;
  onErrorSelect?: (pallet: string, error: PalletError) => void;
  onEventSelect?: (pallet: string, event: PalletEvent) => void;
  selectedCall?: { pallet: string; call: string };
  selectedStorage?: { pallet: string; storage: string };
  selectedConstant?: { pallet: string; constant: string };
  selectedError?: { pallet: string; error: string };
  selectedEvent?: { pallet: string; event: string };
}

export function PalletTree({
  pallets,
  searchQuery,
  onCallSelect,
  onStorageSelect,
  onConstantSelect,
  onErrorSelect,
  onEventSelect,
  selectedCall,
  selectedStorage,
  selectedConstant,
  selectedError,
  selectedEvent,
}: PalletTreeProps) {
  // Start with essential pallets expanded for better UX and scrollable content
  const [expandedPallets, setExpandedPallets] = useState<Set<string>>(
    new Set(["System", "Balances", "Timestamp"]),
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["System-calls", "Balances-calls", "Timestamp-calls"]),
  );

  // Filter function for individual items within pallets
  const filterItems = <T extends { name: string }>(
    items: T[],
    query: string,
  ): T[] => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(lowerQuery));
  };

  // Enhanced filtering that searches in method arguments and descriptions
  const enhancedFilterItems = <T extends { name: string; args?: any[] }>(
    items: T[],
    query: string,
  ): T[] => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => {
      // Search in item name
      if (item.name.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in arguments if available
      if (item.args) {
        return item.args.some((arg) => 
          arg.name?.toLowerCase().includes(lowerQuery) ||
          arg.type?.toLowerCase().includes(lowerQuery)
        );
      }
      
      return false;
    });
  };

  // Enhanced filtering that also filters items within pallets
  const filteredPallets = pallets
    .map((pallet) => {
      if (!searchQuery) return pallet;

      const query = searchQuery.toLowerCase();
      const palletNameMatches = pallet.name.toLowerCase().includes(query);

      // If pallet name matches, show ALL items within it (no filtering)
      // Otherwise, filter individual items within the pallet using enhanced search
      const filteredCalls = palletNameMatches ? pallet.calls : enhancedFilterItems(pallet.calls, searchQuery);
      const filteredStorage = palletNameMatches ? pallet.storage : enhancedFilterItems(pallet.storage, searchQuery);
      const filteredEvents = palletNameMatches ? pallet.events : filterItems(pallet.events, searchQuery);
      const filteredConstants = palletNameMatches ? (pallet.constants || []) : filterItems(pallet.constants || [], searchQuery);
      const filteredErrors = palletNameMatches ? (pallet.errors || []) : filterItems(pallet.errors || [], searchQuery);

      // Include pallet if name matches OR if any items within it match
      const hasMatches =
        palletNameMatches ||
        filteredCalls.length > 0 ||
        filteredStorage.length > 0 ||
        filteredEvents.length > 0 ||
        filteredConstants.length > 0 ||
        filteredErrors.length > 0;

      if (!hasMatches) return null;

      // Return pallet with filtered items
      return {
        ...pallet,
        calls: filteredCalls,
        storage: filteredStorage,
        events: filteredEvents,
        constants: filteredConstants,
        errors: filteredErrors,
      };
    })
    .filter((pallet): pallet is PalletInfo => pallet !== null);

  const togglePallet = (palletName: string) => {
    const newExpanded = new Set(expandedPallets);
    if (newExpanded.has(palletName)) {
      newExpanded.delete(palletName);
    } else {
      newExpanded.add(palletName);
    }
    setExpandedPallets(newExpanded);
  };

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const handleCallClick = (pallet: PalletInfo, call: PalletCall) => {
    onCallSelect(pallet.name, call);
  };

  const handleStorageClick = (pallet: PalletInfo, storage: any) => {
    onStorageSelect(pallet.name, storage);
  };

  const handleConstantClick = (pallet: PalletInfo, constant: PalletConstant) => {
    onConstantSelect?.(pallet.name, constant);
  };

  const handleErrorClick = (pallet: PalletInfo, error: PalletError) => {
    onErrorSelect?.(pallet.name, error);
  };

  // Auto-expand pallets that have search matches
  const shouldAutoExpand = (pallet: PalletInfo): boolean => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    const palletNameMatches = pallet.name.toLowerCase().includes(query);
    
    // Auto-expand if pallet name matches OR if items inside match
    return (
      palletNameMatches ||
      (pallet.calls.length > 0 ||
        pallet.storage.length > 0 ||
        pallet.events.length > 0 ||
        (pallet.constants || []).length > 0 ||
        (pallet.errors || []).length > 0)
    );
  };

  // Auto-expand sections when pallet name matches search
  const shouldAutoExpandSection = (palletName: string): boolean => {
    if (!searchQuery) return false;
    return palletName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Highlight matching text in names
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  if (filteredPallets.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        {searchQuery ? "No matching pallets found" : "No pallets available"}
      </div>
    );
  }

  return (
    <div className="space-y-1" data-testid="pallet-tree">
      {filteredPallets.map((pallet) => {
        const isExpanded =
          expandedPallets.has(pallet.name) || shouldAutoExpand(pallet);
        const totalItems =
          pallet.calls.length + pallet.storage.length + pallet.events.length +
          (pallet.constants || []).length + (pallet.errors || []).length;

        return (
          <div key={pallet.name} data-testid="pallet-item">
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 font-normal"
              onClick={() => togglePallet(pallet.name)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <Package className="w-4 h-4 mr-2" />
              <span className="truncate">
                {highlightMatch(pallet.name, searchQuery)}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {totalItems}
              </span>
            </Button>

            {isExpanded && (
              <div className="ml-4 space-y-1">
                {/* Calls Section */}
                {pallet.calls.length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() => toggleSection(`${pallet.name}-calls`)}
                    >
                      {(expandedSections.has(`${pallet.name}-calls`) || shouldAutoExpandSection(pallet.name)) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Zap className="w-3 h-3 mr-2" />
                      <span>Calls ({pallet.calls.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-calls`) || shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.calls.map((call) => {
                          const isSelected =
                            selectedCall?.pallet === pallet.name &&
                            selectedCall?.call === call.name;
                          
                          // Check if this call was matched by argument search
                          const argumentMatched = searchQuery && call.args.some((arg) => 
                            arg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            arg.type?.toLowerCase().includes(searchQuery.toLowerCase())
                          ) && !call.name.toLowerCase().includes(searchQuery.toLowerCase());

                          return (
                            <Button
                              key={call.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-auto min-h-6 px-2 py-1 font-normal text-xs"
                              onClick={() => handleCallClick(pallet, call)}
                            >
                              <div className="flex flex-col items-start w-full">
                                <div className="flex items-center justify-between w-full">
                                  <span className="truncate">
                                    {highlightMatch(call.name, searchQuery)}
                                  </span>
                                  {call.args.length > 0 && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                      {call.args.length} args
                                    </span>
                                  )}
                                </div>
                                {argumentMatched && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left">
                                    Found in: {call.args
                                      .filter(arg => 
                                        arg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        arg.type?.toLowerCase().includes(searchQuery.toLowerCase())
                                      )
                                      .map(arg => arg.name || arg.type)
                                      .slice(0, 2)
                                      .join(', ')}
                                  </div>
                                )}
                              </div>
                            </Button>
                          );
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
                      {(expandedSections.has(`${pallet.name}-storage`) || shouldAutoExpandSection(pallet.name)) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Database className="w-3 h-3 mr-2" />
                      <span>Storage ({pallet.storage.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-storage`) || shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.storage.map((storage) => {
                          const isSelected =
                            selectedStorage?.pallet === pallet.name &&
                            selectedStorage?.storage === storage.name;
                          return (
                            <Button
                              key={storage.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-6 px-2 font-normal text-xs"
                              onClick={() =>
                                handleStorageClick(pallet, storage)
                              }
                            >
                              <span className="truncate">
                                {highlightMatch(storage.name, searchQuery)}
                              </span>
                            </Button>
                          );
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
                      {(expandedSections.has(`${pallet.name}-events`) || shouldAutoExpandSection(pallet.name)) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Calendar className="w-3 h-3 mr-2" />
                      <span>Events ({pallet.events.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-events`) || shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.events.map((event) => (
                          <Button
                            key={event.name}
                            variant="ghost"
                            className={`w-full justify-start h-6 px-2 font-normal text-xs ${
                              selectedEvent?.pallet === pallet.name && selectedEvent?.event === event.name
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                : ""
                            }`}
                            onClick={() => onEventSelect?.(pallet.name, event)}
                          >
                            <span className="truncate">
                              {highlightMatch(event.name, searchQuery)}
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Constants Section */}
                {(pallet.constants || []).length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() => toggleSection(`${pallet.name}-constants`)}
                    >
                      {(expandedSections.has(`${pallet.name}-constants`) || shouldAutoExpandSection(pallet.name)) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Settings className="w-3 h-3 mr-2" />
                      <span>Constants ({(pallet.constants || []).length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-constants`) || shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {(pallet.constants || []).map((constant) => {
                          const isSelected =
                            selectedConstant?.pallet === pallet.name &&
                            selectedConstant?.constant === constant.name;
                          return (
                            <Button
                              key={constant.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-6 px-2 font-normal text-xs"
                              onClick={() => handleConstantClick(pallet, constant)}
                            >
                              <span className="truncate">
                                {highlightMatch(constant.name, searchQuery)}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Errors Section */}
                {(pallet.errors || []).length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() => toggleSection(`${pallet.name}-errors`)}
                    >
                      {(expandedSections.has(`${pallet.name}-errors`) || shouldAutoExpandSection(pallet.name)) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <AlertTriangle className="w-3 h-3 mr-2" />
                      <span>Errors ({(pallet.errors || []).length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-errors`) || shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {(pallet.errors || []).map((error) => {
                          const isSelected =
                            selectedError?.pallet === pallet.name &&
                            selectedError?.error === error.name;
                          return (
                            <Button
                              key={error.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-6 px-2 font-normal text-xs"
                              onClick={() => handleErrorClick(pallet, error)}
                            >
                              <span className="truncate">
                                {highlightMatch(error.name, searchQuery)}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
