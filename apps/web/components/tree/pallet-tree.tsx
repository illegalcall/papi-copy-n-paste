"use client";

import { useState, useMemo, useCallback, memo } from "react";
import {
  ChevronRight,
  ChevronDown,
  Package,
  Zap,
  Database,
  Calendar,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { PalletInfo, PalletCall, PalletConstant, PalletError, PalletEvent } from "@workspace/core";
import { exportPallet } from "@/utils/markdownExport";
import { ExportMarkdownButton } from "@/components/export-button";
import {
  buildSearchItems,
  createFuseIndex,
  fuzzySearch,
  type FuzzyMatchSet,
} from "@/utils/searchIndex";

interface PalletTreeProps {
  pallets: PalletInfo[];
  searchQuery: string;
  onCallSelect: (pallet: string, call: PalletCall) => void;
  onStorageSelect: (pallet: string, storage: unknown) => void;
  onConstantSelect?: (pallet: string, constant: PalletConstant) => void;
  onErrorSelect?: (pallet: string, error: PalletError) => void;
  onEventSelect?: (pallet: string, event: PalletEvent) => void;
  selectedCall?: { pallet: string; call: string };
  selectedStorage?: { pallet: string; storage: string };
  selectedConstant?: { pallet: string; constant: string };
  selectedError?: { pallet: string; error: string };
  selectedEvent?: { pallet: string; event: string };
  selectedChain?: string;
  onPalletExport?: (markdown: string) => void;
}

/** Get the first non-empty doc string from a docs array, truncated for preview. */
function getDocPreview(docs: string[] | undefined, maxLen = 80): string {
  if (!docs || docs.length === 0) return "";
  const first = docs[0]!.replace(/^#+\s*/, "").trim();
  if (first.length <= maxLen) return first;
  return first.slice(0, maxLen) + "...";
}

export const PalletTree = memo(function PalletTree({
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
  selectedChain,
  onPalletExport,
}: PalletTreeProps) {
  const [expandedPallets, setExpandedPallets] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  // Build Fuse index once when pallets change
  const fuseIndex = useMemo(() => {
    const items = buildSearchItems(pallets);
    return createFuseIndex(items);
  }, [pallets]);

  // Fuzzy match set computed from search query
  const matchSet: FuzzyMatchSet | null = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return null;
    return fuzzySearch(fuseIndex, searchQuery);
  }, [fuseIndex, searchQuery]);

  // Filter pallets using fuzzy match results
  const filteredPallets = useMemo(() => {
    if (!matchSet) return pallets;

    return pallets
      .map((pallet) => {
        if (!matchSet.pallets.has(pallet.name)) return null;

        // If the pallet itself was a direct fuzzy match (not just via children),
        // check if it has matched children — if not, show all items
        const matchedCalls = matchSet.calls.get(pallet.name);
        const matchedStorage = matchSet.storage.get(pallet.name);
        const matchedEvents = matchSet.events.get(pallet.name);
        const matchedConstants = matchSet.constants.get(pallet.name);
        const matchedErrors = matchSet.errors.get(pallet.name);

        const hasChildMatches =
          matchedCalls || matchedStorage || matchedEvents || matchedConstants || matchedErrors;

        // If no child matches, this pallet was matched by name — show all items
        if (!hasChildMatches) return pallet;

        // Otherwise filter to matched items only
        return {
          ...pallet,
          calls: matchedCalls
            ? pallet.calls.filter((c) => matchedCalls.has(c.name))
            : [],
          storage: matchedStorage
            ? pallet.storage.filter((s) => matchedStorage.has(s.name))
            : [],
          events: matchedEvents
            ? pallet.events.filter((e) => matchedEvents.has(e.name))
            : [],
          constants: matchedConstants
            ? (pallet.constants ?? []).filter((c) => matchedConstants.has(c.name))
            : [],
          errors: matchedErrors
            ? (pallet.errors ?? []).filter((e) => matchedErrors.has(e.name))
            : [],
        };
      })
      .filter((p): p is PalletInfo => p !== null);
  }, [pallets, matchSet]);

  const togglePallet = useCallback((palletName: string) => {
    setExpandedPallets((prev) => {
      const next = new Set(prev);
      if (next.has(palletName)) next.delete(palletName);
      else next.add(palletName);
      return next;
    });
  }, []);

  const toggleSection = useCallback((sectionKey: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionKey)) next.delete(sectionKey);
      else next.add(sectionKey);
      return next;
    });
  }, []);

  const handleCallClick = useCallback((pallet: PalletInfo, call: PalletCall) => {
    onCallSelect(pallet.name, call);
  }, [onCallSelect]);

  const handleStorageClick = useCallback((pallet: PalletInfo, storage: unknown) => {
    onStorageSelect(pallet.name, storage);
  }, [onStorageSelect]);

  const handleConstantClick = useCallback((pallet: PalletInfo, constant: PalletConstant) => {
    onConstantSelect?.(pallet.name, constant);
  }, [onConstantSelect]);

  const handleErrorClick = useCallback((pallet: PalletInfo, error: PalletError) => {
    onErrorSelect?.(pallet.name, error);
  }, [onErrorSelect]);

  // Auto-expand pallets/sections when searching
  const shouldAutoExpand = useCallback(
    (_pallet: PalletInfo): boolean => !!searchQuery,
    [searchQuery],
  );

  const shouldAutoExpandSection = useCallback(
    (_palletName: string): boolean => !!searchQuery,
    [searchQuery],
  );

  // Highlight matching text — works with fuzzy by highlighting the query substring
  const highlightRegex = useMemo(() => {
    if (!searchQuery) return null;
    return new RegExp(
      `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
  }, [searchQuery]);

  const highlightMatch = useCallback(
    (text: string, query: string) => {
      if (!query || !highlightRegex) return text;
      const parts = text.split(highlightRegex);
      return parts.map((part, index) =>
        highlightRegex.test(part) ? (
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
    },
    [highlightRegex],
  );

  if (filteredPallets.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        {searchQuery ? "No matching pallets found" : "No pallets available"}
      </div>
    );
  }

  return (
    <div className="space-y-1" data-testid="pallet-tree">
      {searchQuery && (
        <div className="text-xs text-muted-foreground px-2 pb-1">
          {filteredPallets.length} pallets matched
        </div>
      )}
      {filteredPallets.map((pallet) => {
        const isExpanded =
          expandedPallets.has(pallet.name) || shouldAutoExpand(pallet);
        const totalItems =
          pallet.calls.length +
          pallet.storage.length +
          pallet.events.length +
          (pallet.constants || []).length +
          (pallet.errors || []).length;

        return (
          <div key={pallet.name} data-testid="pallet-item" className="group">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="flex-1 justify-start h-7 px-1.5 font-normal text-sm"
                onClick={() => togglePallet(pallet.name)}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 mr-1 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 mr-1 shrink-0" />
                )}
                <Package className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span className="truncate text-xs">
                  {highlightMatch(pallet.name, searchQuery)}
                </span>
                <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                  {totalItems}
                </span>
              </Button>
              {selectedChain && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <ExportMarkdownButton
                    getMarkdown={() => exportPallet(selectedChain, pallet)}
                    onExported={onPalletExport}
                    label={`Export ${pallet.name} as Markdown`}
                  />
                </div>
              )}
            </div>

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
                      {expandedSections.has(`${pallet.name}-calls`) ||
                      shouldAutoExpandSection(pallet.name) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Zap className="w-3 h-3 mr-2" />
                      <span>Calls ({pallet.calls.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-calls`) ||
                      shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.calls.map((call) => {
                          const isSelected =
                            selectedCall?.pallet === pallet.name &&
                            selectedCall?.call === call.name;
                          const docPreview = getDocPreview(call.docs);

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
                                {docPreview && searchQuery && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left truncate w-full">
                                    {docPreview}
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
                      {expandedSections.has(`${pallet.name}-storage`) ||
                      shouldAutoExpandSection(pallet.name) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Database className="w-3 h-3 mr-2" />
                      <span>Storage ({pallet.storage.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-storage`) ||
                      shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.storage.map((storage) => {
                          const isSelected =
                            selectedStorage?.pallet === pallet.name &&
                            selectedStorage?.storage === storage.name;
                          const docPreview = getDocPreview(storage.docs);
                          return (
                            <Button
                              key={storage.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-auto min-h-6 px-2 py-1 font-normal text-xs"
                              onClick={() => handleStorageClick(pallet, storage)}
                            >
                              <div className="flex flex-col items-start w-full">
                                <span className="truncate">
                                  {highlightMatch(storage.name, searchQuery)}
                                </span>
                                {docPreview && searchQuery && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left truncate w-full">
                                    {docPreview}
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

                {/* Events Section */}
                {pallet.events.length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() => toggleSection(`${pallet.name}-events`)}
                    >
                      {expandedSections.has(`${pallet.name}-events`) ||
                      shouldAutoExpandSection(pallet.name) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Calendar className="w-3 h-3 mr-2" />
                      <span>Events ({pallet.events.length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-events`) ||
                      shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {pallet.events.map((event) => {
                          const docPreview = getDocPreview(event.docs);
                          return (
                            <Button
                              key={event.name}
                              variant="ghost"
                              className={`w-full justify-start h-auto min-h-6 px-2 py-1 font-normal text-xs ${
                                selectedEvent?.pallet === pallet.name &&
                                selectedEvent?.event === event.name
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                  : ""
                              }`}
                              onClick={() =>
                                onEventSelect?.(pallet.name, event)
                              }
                            >
                              <div className="flex flex-col items-start w-full">
                                <span className="truncate">
                                  {highlightMatch(event.name, searchQuery)}
                                </span>
                                {docPreview && searchQuery && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left truncate w-full">
                                    {docPreview}
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

                {/* Constants Section */}
                {(pallet.constants || []).length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() =>
                        toggleSection(`${pallet.name}-constants`)
                      }
                    >
                      {expandedSections.has(`${pallet.name}-constants`) ||
                      shouldAutoExpandSection(pallet.name) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Settings className="w-3 h-3 mr-2" />
                      <span>
                        Constants ({(pallet.constants || []).length})
                      </span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-constants`) ||
                      shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {(pallet.constants || []).map((constant) => {
                          const isSelected =
                            selectedConstant?.pallet === pallet.name &&
                            selectedConstant?.constant === constant.name;
                          const docPreview = getDocPreview(constant.docs);
                          return (
                            <Button
                              key={constant.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-auto min-h-6 px-2 py-1 font-normal text-xs"
                              onClick={() =>
                                handleConstantClick(pallet, constant)
                              }
                            >
                              <div className="flex flex-col items-start w-full">
                                <span className="truncate">
                                  {highlightMatch(
                                    constant.name,
                                    searchQuery,
                                  )}
                                </span>
                                {docPreview && searchQuery && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left truncate w-full">
                                    {docPreview}
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

                {/* Errors Section */}
                {(pallet.errors || []).length > 0 && (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-7 px-2 font-normal text-xs"
                      onClick={() => toggleSection(`${pallet.name}-errors`)}
                    >
                      {expandedSections.has(`${pallet.name}-errors`) ||
                      shouldAutoExpandSection(pallet.name) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <AlertTriangle className="w-3 h-3 mr-2" />
                      <span>Errors ({(pallet.errors || []).length})</span>
                    </Button>

                    {(expandedSections.has(`${pallet.name}-errors`) ||
                      shouldAutoExpandSection(pallet.name)) && (
                      <div className="ml-4 space-y-0.5">
                        {(pallet.errors || []).map((error) => {
                          const isSelected =
                            selectedError?.pallet === pallet.name &&
                            selectedError?.error === error.name;
                          const docPreview = getDocPreview(error.docs);
                          return (
                            <Button
                              key={error.name}
                              variant={isSelected ? "secondary" : "ghost"}
                              className="w-full justify-start h-auto min-h-6 px-2 py-1 font-normal text-xs"
                              onClick={() =>
                                handleErrorClick(pallet, error)
                              }
                            >
                              <div className="flex flex-col items-start w-full">
                                <span className="truncate">
                                  {highlightMatch(error.name, searchQuery)}
                                </span>
                                {docPreview && searchQuery && (
                                  <div className="text-xs text-muted-foreground mt-0.5 text-left truncate w-full">
                                    {docPreview}
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
