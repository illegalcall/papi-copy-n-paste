/**
 * Custom hook for estimating transaction fees with error handling
 */

import { useState, useCallback } from 'react';

interface TransactionInfo {
  pallet: string;
  call: string;
  args: Record<string, any>;
  method?: unknown; // The actual method object for fee estimation
}

interface FeeEstimate {
  partialFee: string;
  weight: string;
  class: string;
  error?: string;
}

interface FeeEstimationState {
  feeEstimates: FeeEstimate[];
  isEstimating: boolean;
  error: string | null;
}

interface UseFeeEstimatorReturn extends FeeEstimationState {
  estimateFees: (
    api: unknown,
    accountAddress: string,
    transactions: TransactionInfo[]
  ) => Promise<void>;
  clearEstimates: () => void;
  getTotalFee: () => number;
  formatFee: (fee: string) => string;
}

export function useFeeEstimator(): UseFeeEstimatorReturn {
  const [state, setState] = useState<FeeEstimationState>({
    feeEstimates: [],
    isEstimating: false,
    error: null,
  });

  const estimateFees = useCallback(async (
    api: unknown,
    accountAddress: string,
    transactions: TransactionInfo[]
  ) => {
    if (!api || !accountAddress || transactions.length === 0) {
      setState(prev => ({ ...prev, error: 'Missing API, account address, or transactions' }));
      return;
    }

    setState(prev => ({ ...prev, isEstimating: true, error: null }));
    const estimates: FeeEstimate[] = [];

    try {
      // Fee estimation disabled for compatibility with paseo_asset_hub
      for (const tx of transactions) {
        try {
          if (tx.method) {
            // Temporarily disable fee estimation to avoid paseo_asset_hub encoding issues
            estimates.push({
              partialFee: "0", // Set to 0 temporarily
              weight: "0",
              class: "normal",
              error: "Fee estimation disabled for paseo_asset_hub compatibility"
            });
          } else {
            estimates.push({
              partialFee: "0", // Set to 0 temporarily
              weight: "0",
              class: "normal",
              error: "Fee estimation disabled for paseo_asset_hub compatibility"
            });
          }
        } catch (error) {
          console.warn(`Fee estimation failed for ${tx.pallet}.${tx.call}:`, error);
          estimates.push({
            partialFee: "0",
            weight: "0",
            class: "unknown",
            error: error instanceof Error ? error.message : "Fee estimation failed"
          });
        }
      }

      setState(prev => ({
        ...prev,
        feeEstimates: estimates,
        isEstimating: false,
        error: null
      }));

    } catch (error) {
      console.error('Fee estimation error:', error);
      setState(prev => ({
        ...prev,
        feeEstimates: [],
        isEstimating: false,
        error: error instanceof Error ? error.message : "Fee estimation failed"
      }));
    }
  }, []);

  const clearEstimates = useCallback(() => {
    setState({
      feeEstimates: [],
      isEstimating: false,
      error: null,
    });
  }, []);

  const getTotalFee = useCallback(() => {
    return state.feeEstimates.reduce((sum, estimate) => {
      return sum + (estimate.error ? 0 : parseInt(estimate.partialFee) || 0);
    }, 0);
  }, [state.feeEstimates]);

  const formatFee = useCallback((fee: string) => {
    const num = parseInt(fee);
    if (num === 0) return "0";
    // Convert from planck to decimal (assuming 12 decimal places for most chains)
    return (num / Math.pow(10, 12)).toFixed(6);
  }, []);

  return {
    ...state,
    estimateFees,
    clearEstimates,
    getTotalFee,
    formatFee,
  };
}