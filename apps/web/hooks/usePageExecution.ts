/**
 * Custom hook to manage execution logic for the main page
 * Consolidates all execution-related business logic
 */

import { useCallback } from 'react';
import { useExecution } from './useExecution';
import {
  executeRealTransaction,
  executeMultipleTransactions,
  executeMultipleStorageQueries,
  executeStorageQuery,
  stopWatchValue,
} from '../utils/transactionHelpers';

interface UsePageExecutionProps {
  api?: unknown;
  selectedAccount?: any;
  getSigner?: () => Promise<any>;
  addConsoleOutput: (output: any) => void;
  addTransactionResult: (result: any) => void;
  showTransactionPreview: (transactions: any[]) => void;
}

interface UsePageExecutionReturn {
  executeCall: (
    selectedCall: any,
    formData: Record<string, any>,
    canRunCall: boolean
  ) => Promise<void>;
  executeStorage: (
    selectedStorage: any,
    storageParams: Record<string, any>,
    storageQueryType: string,
    canRunStorage: boolean
  ) => Promise<void>;
  executeMultipleStorageCall: (queries: any[]) => Promise<void>;
  executeTransactionBatch: (transactions: any[]) => Promise<void>;
}

export function usePageExecution({
  api,
  selectedAccount,
  getSigner,
  addConsoleOutput,
  addTransactionResult,
  showTransactionPreview,
}: UsePageExecutionProps): UsePageExecutionReturn {

  const {
    consoleOutput,
    addOutput: addExecutionOutput,
    clearOutput,
    logInfo,
    logError,
    logSuccess,
    logWarn,
  } = useExecution();

  // Enhanced console output that also updates parent
  const enhancedAddOutput = useCallback((output: any) => {
    addExecutionOutput(output);
    addConsoleOutput(output);
  }, [addExecutionOutput, addConsoleOutput]);

  const executeCall = useCallback(async (
    selectedCall: any,
    formData: Record<string, any>,
    canRunCall: boolean
  ) => {
    if (!selectedCall || !canRunCall || !api) {
      logError('Cannot execute: Missing call selection, validation, or API connection');
      return;
    }

    try {
      logInfo(`Executing ${selectedCall.pallet}.${selectedCall.call}...`);

      if (!selectedAccount) {
        // Show transaction preview for wallet signing
        const pendingTransactions = [{
          pallet: selectedCall.pallet,
          call: selectedCall.call,
          args: formData,
          method: selectedCall.method,
        }];
        showTransactionPreview(pendingTransactions);
        return;
      }

      // Execute with wallet
      const signer = await getSigner?.();
      if (!signer) {
        logError('Unable to get wallet signer');
        return;
      }

      const result = await executeRealTransaction(
        api,
        selectedCall.pallet,
        selectedCall.call,
        formData,
        signer,
        enhancedAddOutput
      );

      if (result.success) {
        logSuccess(`Transaction executed successfully: ${result.hash}`);
        addTransactionResult({
          hash: result.hash,
          success: true,
          timestamp: Date.now(),
        });
      } else {
        logError(`Transaction failed: ${result.error}`);
        addTransactionResult({
          hash: result.hash || 'unknown',
          success: false,
          error: result.error,
          timestamp: Date.now(),
        });
      }

    } catch (error) {
      logError(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [
    api,
    selectedAccount,
    getSigner,
    logInfo,
    logError,
    logSuccess,
    showTransactionPreview,
    enhancedAddOutput,
    addTransactionResult
  ]);

  const executeStorage = useCallback(async (
    selectedStorage: any,
    storageParams: Record<string, any>,
    storageQueryType: string,
    canRunStorage: boolean
  ) => {
    if (!selectedStorage || !canRunStorage || !api) {
      logError('Cannot execute: Missing storage selection, validation, or API connection');
      return;
    }

    try {
      logInfo(`Executing storage query: ${selectedStorage.pallet}.${selectedStorage.storage?.name || 'unknown'}`);

      const result = await executeStorageQuery(
        api,
        selectedStorage.pallet,
        selectedStorage.storage,
        storageParams,
        storageQueryType,
        enhancedAddOutput
      );

      if (result.success) {
        logSuccess('Storage query executed successfully');
      } else {
        logError(`Storage query failed: ${result.error}`);
      }

    } catch (error) {
      logError(`Storage execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [api, logInfo, logError, logSuccess, enhancedAddOutput]);

  const executeMultipleStorageCall = useCallback(async (queries: any[]) => {
    if (!api || queries.length === 0) {
      logError('Cannot execute: Missing API connection or queries');
      return;
    }

    try {
      logInfo(`Executing ${queries.length} storage queries...`);

      const result = await executeMultipleStorageQueries(
        api,
        queries,
        enhancedAddOutput
      );

      if (result.success) {
        logSuccess(`All ${queries.length} storage queries executed successfully`);
      } else {
        logError(`Some storage queries failed: ${result.error}`);
      }

    } catch (error) {
      logError(`Multiple storage execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [api, logInfo, logError, logSuccess, enhancedAddOutput]);

  const executeTransactionBatch = useCallback(async (transactions: any[]) => {
    if (!api || !selectedAccount || transactions.length === 0) {
      logError('Cannot execute batch: Missing API, account, or transactions');
      return;
    }

    try {
      logInfo(`Executing batch of ${transactions.length} transactions...`);

      const signer = await getSigner?.();
      if (!signer) {
        logError('Unable to get wallet signer for batch execution');
        return;
      }

      const result = await executeMultipleTransactions(
        api,
        transactions,
        signer,
        enhancedAddOutput
      );

      if (result.success) {
        logSuccess(`Batch execution completed successfully`);
        // Add each transaction result
        result.results?.forEach((txResult: any) => {
          addTransactionResult({
            hash: txResult.hash,
            success: txResult.success,
            error: txResult.error,
            timestamp: Date.now(),
          });
        });
      } else {
        logError(`Batch execution failed: ${result.error}`);
      }

    } catch (error) {
      logError(`Batch execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [
    api,
    selectedAccount,
    getSigner,
    logInfo,
    logError,
    logSuccess,
    enhancedAddOutput,
    addTransactionResult
  ]);

  return {
    executeCall,
    executeStorage,
    executeMultipleStorageCall,
    executeTransactionBatch,
  };
}