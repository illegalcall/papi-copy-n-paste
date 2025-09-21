/**
 * Custom hook for fetching account balances with chain-specific decimal handling
 */

import { useState, useCallback } from 'react';

interface BalanceState {
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

interface UseBalanceFetcherReturn extends BalanceState {
  fetchBalance: (api: unknown, accountAddress: string, chainName: string) => Promise<void>;
  clearBalance: () => void;
}

export function useBalanceFetcher(): UseBalanceFetcherReturn {
  const [state, setState] = useState<BalanceState>({
    balance: null,
    isLoading: false,
    error: null,
  });

  const fetchBalance = useCallback(async (api: unknown, accountAddress: string, chainName: string) => {
    if (!api || !accountAddress) {
      setState(prev => ({ ...prev, error: 'Missing API or account address' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Import descriptor helper at runtime
      const { getTypedApiForChain } = await import('@workspace/core/descriptors');

      // Get typed API for the current chain
      const typedApi = getTypedApiForChain(api, chainName.toLowerCase());

      // Use PAPI pattern: typedApi.query.System.Account.getValue()
      const accountData = await typedApi.query.System.Account.getValue(accountAddress);

      if (!accountData) {
        setState(prev => ({ ...prev, balance: "Account not found", isLoading: false }));
        return;
      }

      // Extract balance using PAPI account structure
      const { data } = accountData;
      const freeBalance = data.free;

      // Get decimals from chain spec data
      let decimals = 10; // Default decimals

      try {
        // Check if api has getChainSpecData method and call it safely
        if (api && typeof api === 'object' && 'getChainSpecData' in api && typeof (api as any).getChainSpecData === 'function') {
          const chainSpecData = await (api as any).getChainSpecData();
          const properties = chainSpecData?.properties;

          if (properties && typeof properties === 'object' && 'tokenDecimals' in properties) {
            decimals = Number(properties.tokenDecimals);
          }
        }
      } catch (error) {
        // If getChainSpecData fails or doesn't exist, use default decimals
        console.warn('Could not get chain spec data, using default decimals:', error);
      }

      const divisor = BigInt(10 ** decimals);

      // Convert to readable format with chain spec decimals
      const balanceFormatted = (Number(freeBalance) / Number(divisor)).toFixed(4);

      setState(prev => ({
        ...prev,
        balance: balanceFormatted,
        isLoading: false,
        error: null
      }));

    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setState(prev => ({
        ...prev,
        balance: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error fetching balance"
      }));
    }
  }, []);

  const clearBalance = useCallback(() => {
    setState({
      balance: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    fetchBalance,
    clearBalance,
  };
}