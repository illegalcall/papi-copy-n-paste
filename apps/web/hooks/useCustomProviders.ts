/**
 * Custom hook for managing custom RPC providers
 */

import { useState, useEffect, useCallback } from 'react';
import { getCustomProvidersForChain, CustomProvider } from '@/utils/customRpc';

interface UseCustomProvidersReturn {
  customProviders: CustomProvider[];
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  refreshProviders: () => void;
  selectProvider: (provider: CustomProvider, onProviderChange: (providerId: string) => void) => void;
  getCurrentCustomProvider: (selectedProvider: string) => CustomProvider | null;
}

export function useCustomProviders(selectedChain: string): UseCustomProvidersReturn {
  const [customProviders, setCustomProviders] = useState<CustomProvider[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const refreshProviders = useCallback(() => {
    setCustomProviders(getCustomProvidersForChain(selectedChain));
  }, [selectedChain]);

  // Load custom providers for this chain
  useEffect(() => {
    refreshProviders();
  }, [refreshProviders]);

  // Update custom providers when dialog opens or closes
  useEffect(() => {
    refreshProviders();
  }, [isDialogOpen, refreshProviders]);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const selectProvider = useCallback((
    provider: CustomProvider,
    onProviderChange: (providerId: string) => void
  ) => {
    onProviderChange(provider.id);
    setIsDialogOpen(false);
    // Refresh custom providers to ensure the newly selected one is available
    refreshProviders();
  }, [refreshProviders]);

  const getCurrentCustomProvider = useCallback((selectedProvider: string): CustomProvider | null => {
    // Find current custom provider
    const currentCustomProvider = customProviders.find((p) => p.id === selectedProvider);

    // Fallback: if custom provider not found in state, check localStorage directly
    if (!currentCustomProvider && selectedProvider.startsWith('custom-')) {
      return getCustomProvidersForChain(selectedChain).find((p) => p.id === selectedProvider) || null;
    }

    return currentCustomProvider || null;
  }, [customProviders, selectedChain]);

  return {
    customProviders,
    isDialogOpen,
    openDialog,
    closeDialog,
    refreshProviders,
    selectProvider,
    getCurrentCustomProvider,
  };
}