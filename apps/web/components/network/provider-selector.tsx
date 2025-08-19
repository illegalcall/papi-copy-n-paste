"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";
import { Dialog, DialogContent } from "@workspace/ui/components/dialog";
import {
  networkConfigs,
  NetworkProvider,
} from "@workspace/core/network-providers";
import { Zap, Globe, Settings, Wifi, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomProviderManager } from "@/components/ui/custom-provider-manager";
import { getCustomProvidersForChain, CustomProvider } from "@/utils/customRpc";

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
  const [customProviders, setCustomProviders] = useState<CustomProvider[]>([]);
  const [isCustomProviderDialogOpen, setIsCustomProviderDialogOpen] = useState(false);

  const network = networkConfigs.find(
    (config) => config.chain === selectedChain,
  );
  const providers = network?.providers || [];

  // Load custom providers for this chain
  useEffect(() => {
    setCustomProviders(getCustomProvidersForChain(selectedChain));
  }, [selectedChain]);

  // Update custom providers when dialog opens
  useEffect(() => {
    if (isCustomProviderDialogOpen) {
      setCustomProviders(getCustomProvidersForChain(selectedChain));
    }
  }, [isCustomProviderDialogOpen, selectedChain]);

  // Find current provider (could be standard or custom)
  const currentProvider = providers.find((p) => p.id === selectedProvider);
  const currentCustomProvider = customProviders.find((p) => p.id === selectedProvider);

  const handleCustomProviderSelect = (provider: CustomProvider) => {
    onProviderChange(provider.id);
    setIsCustomProviderDialogOpen(false);
  };

  return (
    <>
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
          {currentCustomProvider && (
            <div className="flex items-center gap-2">
              <div className="text-blue-500">
                <Globe className="h-3 w-3" />
              </div>
              <span className="text-sm font-medium truncate">
                {currentCustomProvider.name}
              </span>
              {currentCustomProvider.isWorking === true && (
                <span className="text-green-500 text-xs">✓</span>
              )}
              {currentCustomProvider.isWorking === false && (
                <span className="text-red-500 text-xs">✗</span>
              )}
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

        {/* Custom Providers Section */}
        {customProviders.length > 0 && (
          <>
            {/* Visual separator */}
            <div className="h-px bg-border mx-2 my-1" />
            {customProviders.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="text-blue-500">
                    <Globe className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{provider.name}</span>
                      {provider.isWorking === true && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                      {provider.isWorking === false && (
                        <span className="text-red-500 text-xs">✗</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {provider.description || provider.wsUrl}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </>
        )}

        {/* Add Custom Provider Option */}
        <div className="h-px bg-border mx-2 my-1" />
        <div
          className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-accent cursor-pointer rounded-sm mx-1"
          onClick={(e) => {
            e.stopPropagation();
            setIsCustomProviderDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">Add Custom Provider</span>
        </div>
      </SelectContent>
    </Select>

      {/* Custom Provider Management Dialog */}
      <Dialog open={isCustomProviderDialogOpen} onOpenChange={setIsCustomProviderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <CustomProviderManager
            chainKey={selectedChain}
            onProviderSelect={handleCustomProviderSelect}
            selectedProviderId={currentCustomProvider?.id}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
