"use client";

import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";
import { CONTRACT_CHAINS } from "@workspace/core/contracts/chains";
import type { ContractType } from "@workspace/core/contracts/types";

interface ChainSelectorProps {
  contractType: ContractType;
  selectedChain: string;
  onChainChange: (chainKey: string) => void;
  disabled?: boolean;
}

export const ChainSelector = memo(function ChainSelector({
  contractType,
  selectedChain,
  onChainChange,
  disabled,
}: ChainSelectorProps) {
  const chains = CONTRACT_CHAINS[contractType];

  return (
    <Select value={selectedChain} onValueChange={onChainChange} disabled={disabled}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {contractType === "ink" ? "ink! Chains" : "EVM Chains"}
          </SelectLabel>
          {chains.map((chain) => (
            <SelectItem key={chain.key} value={chain.key}>
              <div className="flex items-center gap-2">
                <span>{chain.name}</span>
                {chain.isTestnet && (
                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                    testnet
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
