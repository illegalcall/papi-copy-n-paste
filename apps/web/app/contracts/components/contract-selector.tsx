"use client";

import { memo, useState, useCallback } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Loader2 } from "lucide-react";
import { ChainSelector } from "./chain-selector";
import { ContractUpload } from "./contract-upload";
import type { ContractType } from "@workspace/core/contracts/types";

interface ContractSelectorProps {
  contractType: ContractType;
  selectedChain: string;
  contractAddress: string;
  onContractTypeChange: (type: ContractType) => void;
  onChainChange: (chainKey: string) => void;
  onAddressChange: (address: string) => void;
  onMetadataFile: (file: File) => void;
  onAbiPasted?: (abiJson: string) => void;
  onLoad: () => void;
  isLoading?: boolean;
  isConnected?: boolean;
  uploadError?: string | null;
  contractName?: string;
}

export const ContractSelector = memo(function ContractSelector({
  contractType,
  selectedChain,
  contractAddress,
  onContractTypeChange,
  onChainChange,
  onAddressChange,
  onMetadataFile,
  onAbiPasted,
  onLoad,
  isLoading,
  isConnected,
  uploadError,
  contractName,
}: ContractSelectorProps) {
  return (
    <div className="space-y-4 p-4 border-b">
      {/* Contract Type Toggle */}
      <div className="flex items-center gap-4">
        <Tabs
          value={contractType}
          onValueChange={(v) => onContractTypeChange(v as ContractType)}
        >
          <TabsList className="h-8">
            <TabsTrigger value="ink" className="text-xs px-3">
              ink!
            </TabsTrigger>
            <TabsTrigger value="evm" className="text-xs px-3">
              EVM
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <ChainSelector
          contractType={contractType}
          selectedChain={selectedChain}
          onChainChange={onChainChange}
          disabled={isLoading}
        />

        {isConnected && (
          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
            Connected
          </Badge>
        )}
      </div>

      {/* Contract Address */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground">
            Contract Address
          </Label>
          <Input
            placeholder={
              contractType === "ink"
                ? "5GrwvaEF5zXb26Fz..."
                : "0x1234...abcd"
            }
            value={contractAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            className="font-mono text-sm"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={onLoad}
          disabled={isLoading || !contractAddress}
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Loading...
            </>
          ) : (
            "Load"
          )}
        </Button>
      </div>

      {/* Metadata Upload */}
      <ContractUpload
        contractType={contractType}
        onMetadataLoaded={onMetadataFile}
        onAbiPasted={onAbiPasted}
        isLoading={isLoading}
        error={uploadError}
      />

      {/* Contract Name Badge */}
      {contractName && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{contractName}</Badge>
          <span className="text-xs text-muted-foreground">loaded</span>
        </div>
      )}
    </div>
  );
});
