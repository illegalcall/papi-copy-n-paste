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

export function useChainConnection(
  initialChain = "polkadot",
  initialProvider = "allnodes-polkadot",
) {
  const [selectedChain, setSelectedChain] = useState(initialChain);
  const [selectedProvider, setSelectedProvider] = useState(initialProvider);
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
  const isConnecting = enhancedStatus === "connecting";
  const hasError = enhancedStatus === "error" || !!error;

  // Map enhanced client status to legacy status for compatibility
  const chainStatus: "connecting" | "ready" | "error" =
    enhancedStatus === "connected"
      ? "ready"
      : enhancedStatus === "disconnected"
        ? "error"
        : enhancedStatus;

  // Enhanced metadata fetching with better state management
  useEffect(() => {
    if (enhancedStatus === "connected" && api) {
      // Add a small delay to ensure client is fully stable
      const timeoutId = setTimeout(
        async () => {
          setIsLoadingMetadata(true);
          setMetadataError(null);

          try {
            const metadata = await fetchMetadata(selectedChain, api);

            if (metadata && metadata.pallets.length > 0) {
              const palletTree = buildPalletTree(metadata);
              setPallets(palletTree);
              setMetadataError(null);
            } else {
              setPallets([]);
              if (selectedChain === "polkadot") {
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
            if (selectedChain === "polkadot") {
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
        enhancedStatus === "connected" ? 1000 : 0,
      ); // Wait 1 second for client to stabilize

      return () => clearTimeout(timeoutId);
    } else if (enhancedStatus === "connecting") {
      setIsLoadingMetadata(true);
      setMetadataError(null);
      setPallets([]);
    } else if (enhancedStatus === "error") {
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

  const handleNetworkChange = (chainKey: string, providerId: string) => {
    setSelectedChain(chainKey);
    setSelectedProvider(providerId);
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
