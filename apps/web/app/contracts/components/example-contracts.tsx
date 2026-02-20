"use client";

import { memo } from "react";
import { Badge } from "@workspace/ui/components/badge";
import {
  BookOpen,
  Coins,
  Hash,
  Image,
  Droplets,
  ArrowUpDown,
  Zap,
  ExternalLink,
} from "lucide-react";
import { EXAMPLE_CONTRACTS, type ExampleContract } from "../data/example-contracts";
import type { ContractType } from "@workspace/core/contracts/types";

interface ExampleContractsProps {
  contractType: ContractType;
  onSelectExample: (example: ExampleContract) => void;
}

const EXAMPLE_ICONS: Record<string, React.ReactNode> = {
  "ink-flipper": <ArrowUpDown className="h-5 w-5" />,
  "ink-psp22": <Coins className="h-5 w-5" />,
  "ink-incrementer": <Hash className="h-5 w-5" />,
  "evm-erc20": <Coins className="h-5 w-5" />,
  "evm-erc721": <Image className="h-5 w-5" />,
  "evm-weth": <Droplets className="h-5 w-5" />,
};

const ACCENT_COLORS: Record<string, string> = {
  "ink-flipper": "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  "ink-psp22": "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  "ink-incrementer": "from-green-500/20 to-green-600/5 border-green-500/30",
  "evm-weth": "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  "evm-erc20": "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30",
  "evm-erc721": "from-pink-500/20 to-pink-600/5 border-pink-500/30",
};

const ICON_COLORS: Record<string, string> = {
  "ink-flipper": "bg-blue-500/15 text-blue-500",
  "ink-psp22": "bg-amber-500/15 text-amber-500",
  "ink-incrementer": "bg-green-500/15 text-green-500",
  "evm-weth": "bg-purple-500/15 text-purple-500",
  "evm-erc20": "bg-cyan-500/15 text-cyan-500",
  "evm-erc721": "bg-pink-500/15 text-pink-500",
};

export const ExampleContracts = memo(function ExampleContracts({
  contractType,
  onSelectExample,
}: ExampleContractsProps) {
  const examples = EXAMPLE_CONTRACTS.filter(
    (e) => e.contractType === contractType,
  );

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">
          Quick Start — click to load instantly
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {examples.map((example) => {
          const hasLiveAddress = example.address.length > 0;
          const accent = ACCENT_COLORS[example.id] ?? "from-muted/50 to-muted/10 border-border";
          const iconColor = ICON_COLORS[example.id] ?? "bg-primary/10 text-primary";

          return (
            <button
              key={example.id}
              onClick={() => onSelectExample(example)}
              className={`group relative flex flex-col items-start gap-2.5 rounded-xl border bg-gradient-to-br p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${accent}`}
            >
              {hasLiveAddress && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1.5 py-0 border-green-500/40 text-green-500 bg-green-500/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 w-full">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconColor} transition-transform group-hover:scale-110`}
                >
                  {EXAMPLE_ICONS[example.id] ?? (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">
                    {example.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {example.contractType === "ink" ? "ink!" : "EVM"} on{" "}
                    {example.chainKey}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {example.description}
              </p>

              <div className="flex items-center justify-between w-full mt-auto">
                <div className="flex flex-wrap gap-1">
                  {example.tags
                    .filter((t) => t !== "live")
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
                {hasLiveAddress && (
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {contractType === "ink" && (
        <p className="text-[11px] text-muted-foreground text-center">
          ink! examples load the ABI for method exploration. Deploy on Shibuya testnet to interact live.
        </p>
      )}
    </div>
  );
});
