import { useState, useEffect, useCallback, useMemo } from 'react';
import { WalletManager, type WalletState, type Account } from '@workspace/core';

let globalWalletManager: WalletManager | null = null;

function getWalletManager(): WalletManager {
  if (!globalWalletManager) {
    globalWalletManager = new WalletManager();
  }
  return globalWalletManager;
}

export interface UseWalletReturn {
  isAvailable: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  accounts: Account[];
  selectedAccount: Account | null;
  error: string | null;
  connect: () => Promise<void>;
  connectToWallet: (walletId: string) => Promise<void>;
  disconnect: () => void;
  selectAccount: (account: Account) => Promise<void>;
  getSigner: (address?: string) => Promise<any>;
  isAccountConnected: (address: string) => boolean;
  getAccount: (address: string) => Account | undefined;
}

export function useWallet(): UseWalletReturn {
  const walletManager = useMemo(() => getWalletManager(), []);
  const [state, setState] = useState<WalletState>(() => walletManager.getState());

  useEffect(() => {
    // Subscribe to wallet state changes
    const unsubscribe = walletManager.subscribe(setState);

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [walletManager]);

  const connect = useCallback(async () => {
    try {
      await walletManager.connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // Re-throw the error so the UI can handle it (e.g., show wallet selector)
      throw error;
    }
  }, [walletManager]);

  const connectToWallet = useCallback(async (walletId: string) => {
    try {
      await walletManager.connectToWallet(walletId);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
      // Re-throw the error so the UI can handle it
      throw error;
    }
  }, [walletManager]);

  const disconnect = useCallback(() => {
    walletManager.disconnect();
  }, [walletManager]);

  const selectAccount = useCallback(async (account: Account) => {
    try {
      await walletManager.selectAccount(account);
    } catch (error) {
      console.error('Failed to select account:', error);
      // Error is already stored in state by wallet manager
    }
  }, [walletManager]);

  const getSigner = useCallback(async (address?: string) => {
    return walletManager.getSigner(address);
  }, [walletManager]);

  const isAccountConnected = useCallback((address: string) => {
    return walletManager.isAccountConnected(address);
  }, [walletManager]);

  const getAccount = useCallback((address: string) => {
    return walletManager.getAccount(address);
  }, [walletManager]);

  return {
    // State
    isAvailable: state.isAvailable,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    accounts: state.accounts,
    selectedAccount: state.selectedAccount,
    error: state.error,

    // Actions
    connect,
    connectToWallet,
    disconnect,
    selectAccount,

    // Utilities
    getSigner,
    isAccountConnected,
    getAccount,
  };
}