"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";
import {
  networkConfigs,
  NetworkProvider,
} from "@workspace/core/network-providers";
import { Zap, Globe, Settings, Wifi } from "lucide-react";

interface ProviderSelectorProps {
  selectedChain: string;
  selectedProvider: string;
  onProviderChange: (providerId: string) => void;
  disabled?: boolean;
}

function getProviderIcon(type: NetworkProvider["type"]) {
  switch (type) {
    case "smoldot":
      return <Zap className="h-3 w-3" />;
    case "rpc":
      return <Globe className="h-3 w-3" />;
    case "chopsticks":
      return <Settings className="h-3 w-3" />;
    case "custom":
      return <Wifi className="h-3 w-3" />;
  }
}

function getProviderTypeColor(type: NetworkProvider["type"]) {
  switch (type) {
    case "smoldot":
      return "text-purple-600";
    case "rpc":
      return "text-blue-600";
    case "chopsticks":
      return "text-orange-600";
    case "custom":
      return "text-gray-600";
  }
}

export function ProviderSelector({
  selectedChain,
  selectedProvider,
  onProviderChange,
  disabled = false,
}: ProviderSelectorProps) {
  const network = networkConfigs.find(
    (config) => config.chain === selectedChain,
  );
  const providers = network?.providers || [];
  const currentProvider = providers.find((p) => p.id === selectedProvider);

  return (
    <Select
      value={selectedProvider}
      onValueChange={onProviderChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue>
          {currentProvider && (
            <div className="flex items-center gap-2">
              <div className={getProviderTypeColor(currentProvider.type)}>
                {getProviderIcon(currentProvider.type)}
              </div>
              <span className="text-sm font-medium truncate">
                {currentProvider.name}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {providers.map((provider) => (
          <SelectItem key={provider.id} value={provider.id}>
            <div className="flex items-center gap-2 min-w-0">
              <div className={getProviderTypeColor(provider.type)}>
                {getProviderIcon(provider.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate">{provider.name}</span>
                  {provider.isRecommended && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      Rec
                    </Badge>
                  )}
                  {provider.type === "smoldot" && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      Light
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {provider.description}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
