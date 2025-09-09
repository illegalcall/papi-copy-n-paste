"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { networkConfigs } from "@workspace/core/network-providers";
import Image from "next/image";

interface NetworkSelectorProps {
  selectedChain: string;
  onNetworkChange: (chainKey: string) => void;
  disabled?: boolean;
}

export function NetworkSelector({
  selectedChain,
  onNetworkChange,
  disabled = false,
}: NetworkSelectorProps) {
  const selectedNetwork = networkConfigs.find(
    (config) => config.chain === selectedChain,
  );

  return (
    <Select
      value={selectedChain}
      onValueChange={onNetworkChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[120px] h-8">
        <SelectValue>
          {selectedNetwork && (
            <div className="flex items-center gap-2">
              <Image
                src={selectedNetwork.icon}
                alt={selectedNetwork.chainName}
                width={16}
                height={16}
                className="rounded-full"
              />
              <span className="text-sm font-medium">
                {selectedNetwork.chainName}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {networkConfigs.map((network) => (
          <SelectItem key={network.chain} value={network.chain}>
            <div className="flex items-center gap-2">
              <Image
                src={network.icon}
                alt={network.chainName}
                width={16}
                height={16}
                className="rounded-full"
              />
              <span>{network.chainName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
