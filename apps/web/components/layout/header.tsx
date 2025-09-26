"use client";

import { memo } from "react";
import { Button } from "@workspace/ui/components/button";
import { Moon, Sun, BookOpen, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { NetworkSelector } from "../network/network-selector";
import { ProviderSelector } from "../network/provider-selector";
import { WalletConnector } from "../wallet/wallet-connector";
import {
  networkConfigs,
  getDefaultProvider,
} from "@workspace/core/network-providers";

interface HeaderProps {
  selectedChain: string;
  selectedProvider: string;
  onNetworkChange: (chainKey: string, providerId: string) => void;
  isConnecting?: boolean;
  hasError?: boolean;
}

export const Header = memo(function Header({
  selectedChain,
  selectedProvider,
  onNetworkChange,
  isConnecting = false,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const handleNetworkChange = (chainKey: string) => {
    // When network changes, auto-select the default provider for that network
    const network = networkConfigs.find((n) => n.chain === chainKey);
    const defaultProvider = network ? getDefaultProvider(chainKey) : null;
    if (defaultProvider) {
      onNetworkChange(chainKey, defaultProvider.id);
    }
  };

  const handleProviderChange = (providerId: string) => {
    onNetworkChange(selectedChain, providerId);
  };

  return (
    <header className="flex justify-between items-center px-6 h-12 border-b bg-background">
      <div className="font-bold text-lg whitespace-nowrap">
        Copy‑n‑Paste PAPI
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Network:
            </span>
            <NetworkSelector
              selectedChain={selectedChain}
              onNetworkChange={handleNetworkChange}
              disabled={isConnecting}
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Provider:
            </span>
            <ProviderSelector
              selectedChain={selectedChain}
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              disabled={isConnecting}
            />
          </div>
        </div>

        <div className="h-4 border-l border-border"></div>

        {/* Wallet Connector */}
        <WalletConnector />

        <div className="h-4 border-l border-border"></div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/polkadot-api/polkadot-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://papi.how"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-4 w-4" />
              <span className="sr-only">Documentation</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
});
