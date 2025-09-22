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
  chainKey?: string;
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
  chainKey,
}: UsePageExecutionProps): UsePageExecutionReturn {

  const {
    consoleOutput,
    addConsoleOutput: addExecutionOutput,
    handleClearConsole: clearOutput,
    setIsRunning,
    setConsoleOutput,
  } = useExecution();

  // Implement missing logging functions
  const logError = useCallback((message: string) => {
    addExecutionOutput(`❌ ${message}`);
  }, [addExecutionOutput]);

  const logSuccess = useCallback((message: string) => {
    addExecutionOutput(`✅ ${message}`);
  }, [addExecutionOutput]);

  const logInfo = useCallback((message: string) => {
    addExecutionOutput(`ℹ️ ${message}`);
  }, [addExecutionOutput]);

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

      await executeRealTransaction(
        selectedCall,
        formData,
        chainKey || '',
        api,
        setConsoleOutput,
        setIsRunning
      );

      // Transaction was executed - the function handles its own logging
      logSuccess(`Transaction call attempted successfully`);

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

      await executeStorageQuery(
        selectedStorage,
        storageQueryType,
        storageParams,
        chainKey || '',
        api,
        setConsoleOutput,
        setIsRunning
      );

      logSuccess('Storage query executed successfully');

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

      await executeMultipleStorageQueries(
        queries,
        chainKey || '',
        api,
        setConsoleOutput
      );

      logSuccess(`All ${queries.length} storage queries executed successfully`);

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

      await executeMultipleTransactions(
        transactions,
        chainKey || '',
        api,
        setConsoleOutput
      );

      logSuccess(`Batch execution completed successfully`);

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