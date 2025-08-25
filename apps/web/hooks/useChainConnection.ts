/**
 * Hook for managing chain connection and metadata state
 */

import { useState, useEffect } from "react";
import {
  useEnhancedClient,
  fetchMetadata,
  buildPalletTree,
  PalletInfo,
  getNetworkConfig,
  getProvider,
} from "@workspace/core";
import { loadChainPreferences, saveChainPreferences } from "../utils/localStorage";
import { ConnectionStatus, ChainKey } from "../types/enums";

function getInitialChainPreferences(
  defaultChain: string,
  defaultProvider: string,
): { chain: string; provider: string } {
  const saved = loadChainPreferences();

  if (saved) {
    // Validate that the saved chain and provider are still valid
    const networkConfig = getNetworkConfig(saved.selectedChain);
    const providerConfig = getProvider(saved.selectedChain, saved.selectedProvider);

    if (networkConfig && providerConfig) {
      return {
        chain: saved.selectedChain,
        provider: saved.selectedProvider,
      };
    }
  }

  return {
    chain: defaultChain,
    provider: defaultProvider,
  };
}

export function useChainConnection(
  initialChain = "polkadot",
  initialProvider = "allnodes-polkadot",
) {
  // Initialize with localStorage preferences if available and valid
  const initialPreferences = getInitialChainPreferences(initialChain, initialProvider);

  const [selectedChain, setSelectedChain] = useState(initialPreferences.chain);
  const [selectedProvider, setSelectedProvider] = useState(initialPreferences.provider);
  const [pallets, setPallets] = useState<PalletInfo[]>([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);

  // Use enhanced client with provider support
  const {
    status: enhancedStatus,
    client: api,
    provider,
    error,
  } = useEnhancedClient(selectedChain, selectedProvider);
  const isConnecting = enhancedStatus === ConnectionStatus.CONNECTING;
  const hasError = enhancedStatus === ConnectionStatus.ERROR || !!error;

  // Map enhanced client status to legacy status for compatibility
  const chainStatus: "connecting" | "ready" | "error" =
    enhancedStatus === ConnectionStatus.CONNECTED
      ? "ready"
      : enhancedStatus === ConnectionStatus.DISCONNECTED
        ? "error"
        : enhancedStatus;

  // Enhanced metadata fetching with better state management
  useEffect(() => {
    if (enhancedStatus === ConnectionStatus.CONNECTED && api) {
      // Clear any previous errors when connection is established
      setMetadataError(null);
      // Add a small delay to ensure client is fully stable
      const timeoutId = setTimeout(
        async () => {
          setIsLoadingMetadata(true);

          try {
            const metadata = await fetchMetadata(selectedChain, api);

            if (metadata && metadata.pallets.length > 0) {
              const palletTree = buildPalletTree(metadata);
              setPallets(palletTree);
              setMetadataError(null);

              // Store live metadata globally for fallback detection
              if (typeof window !== 'undefined') {
                if (!(window as any).__PAPI_LIVE_METADATA__) {
                  (window as any).__PAPI_LIVE_METADATA__ = {};
                }
                (window as any).__PAPI_LIVE_METADATA__[selectedChain] = metadata;
              }
            } else {
              setPallets([]);
              if (selectedChain === ChainKey.POLKADOT) {
                setMetadataError(
                  "Polkadot initial connection can be slow. Try switching to Kusama first, then back to Polkadot, or wait a moment and refresh.",
                );
              } else {
                setMetadataError(
                  `No pallets found for ${selectedChain}. The chain may still be connecting.`,
                );
              }
            }
          } catch (error) {
            const errorMsg =
              error instanceof Error ? error.message : "Unknown error";
            setPallets([]);
            if (selectedChain === ChainKey.POLKADOT) {
              setMetadataError(
                "Polkadot connection timed out. This is a known issue - try switching to Kusama first, then back to Polkadot.",
              );
            } else {
              setMetadataError(
                `Failed to load pallets for ${selectedChain}: ${errorMsg}`,
              );
            }
          } finally {
            setIsLoadingMetadata(false);
          }
        },
        enhancedStatus === ConnectionStatus.CONNECTED ? 1000 : 0,
      ); // Wait 1 second for client to stabilize

      return () => clearTimeout(timeoutId);
    } else if (enhancedStatus === ConnectionStatus.CONNECTING) {
      setIsLoadingMetadata(true);
      setMetadataError(null);
      setPallets([]);
    } else if (enhancedStatus === ConnectionStatus.ERROR) {
      const networkConfig = getNetworkConfig(selectedChain);
      const providerConfig = getProvider(selectedChain, selectedProvider);
      const networkName = networkConfig?.chainName || selectedChain;
      const providerName = providerConfig?.name || selectedProvider;

      setIsLoadingMetadata(false);
      setPallets([]);
      setMetadataError(
        `Failed to connect to ${networkName} via ${providerName}${error ? ": " + error : ""}. Please try another provider or check your connection.`,
      );
    } else {
      // Disconnected or other states
      setIsLoadingMetadata(false);
      setPallets([]);
      setMetadataError(null);
    }
  }, [enhancedStatus, api, selectedChain, selectedProvider, provider, error]);

  // Additional effect to clear errors when pallets are successfully loaded
  // This is the most important fix - if pallets exist, no error should be shown
  useEffect(() => {
    if (pallets.length > 0) {
      // If we have pallets, connection is working - clear any error
      setMetadataError(null);
    }
  }, [pallets.length]);

  const handleNetworkChange = (chainKey: string, providerId: string) => {
    setSelectedChain(chainKey);
    setSelectedProvider(providerId);

    // Save preferences to localStorage
    saveChainPreferences(chainKey, providerId);

    // Reset state when network changes
    setPallets([]);
    setMetadataError(null);
    setIsLoadingMetadata(false);
  };

  return {
    selectedChain,
    selectedProvider,
    pallets,
    isLoadingMetadata,
    metadataError,
    chainStatus,
    isConnecting,
    hasError,
    api,
    provider,
    error,
    handleNetworkChange,
  };
}
