"use client";

import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { PalletTree } from "@/components/tree/pallet-tree";
import { PalletInfo, PalletCall } from "@workspace/core";

interface LeftPaneProps {
  isOpen: boolean;
  onClose: () => void;
  pallets: PalletInfo[];
  onCallSelect: (pallet: string, call: PalletCall) => void;
  onStorageSelect: (pallet: string, storage: any) => void;
  selectedCall?: { pallet: string; call: string };
  selectedStorage?: { pallet: string; storage: string };
  isLoading?: boolean;
  error?: string | null;
}

export interface LeftPaneRef {
  focusSearch: () => void;
  clearSearch: () => void;
}

export const LeftPane = forwardRef<LeftPaneRef, LeftPaneProps>(({
  isOpen,
  onClose,
  pallets,
  onCallSelect,
  onStorageSelect,
  selectedCall,
  selectedStorage,
  isLoading = false,
  error = null,
}, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusSearch: () => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    },
    clearSearch: () => {
      setSearchQuery("");
    }
  }), []);

  return (
    <div className="w-full h-full bg-muted/40 border-r flex flex-col">
      <div className="p-4 border-b shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Search pallets, methods, args... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Scrollable content area - uses native CSS scrolling with overscroll containment */}
      <div className="flex-1 min-h-0 max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain">
        <div className="p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <div className="text-sm text-muted-foreground text-center">
                Loading pallets...
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-destructive mb-2 p-3 bg-destructive/10 rounded-md">
              <div className="font-medium mb-1">⚠️ Connection Issue</div>
              <div className="text-xs mb-2">{error}</div>
              {error.includes("Polkadot") && (
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded mt-2">
                  <div className="font-medium mb-1">💡 Quick Fix:</div>
                  <div>1. Switch to Kusama above ↑</div>
                  <div>2. Wait for it to connect</div>
                  <div>3. Switch back to Polkadot</div>
                </div>
              )}
            </div>
          ) : pallets.length === 0 ? (
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
      </div>
    </div>
  );
});

LeftPane.displayName = 'LeftPane';
