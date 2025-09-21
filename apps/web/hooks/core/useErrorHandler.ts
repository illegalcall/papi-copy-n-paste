/**
 * React hook for standardized error handling in PAPI Copy-Paste application
 * Provides consistent error management across components
 */

"use client";

import { useCallback, useState, useRef, useEffect } from 'react';
import {
  AppError,
  ErrorCode,
  ErrorCategory,
  ErrorContext,
  ErrorResult,
} from '../../types/errors';
import {
  errorHandler,
  createError,
  createChainError,
  createWalletError,
  createTransactionError,
  createFormError,
  createNetworkError,
  wrapAsync,
  handleError,
} from '../../utils/core/error-handler';

interface UseErrorHandlerOptions {
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: AppError) => void;
  category?: ErrorCategory;
}

interface UseErrorHandlerReturn {
  // Current error state
  error: AppError | null;
  hasError: boolean;
  isRetrying: boolean;

  // Error creation utilities
  createError: (code: ErrorCode, context?: Partial<ErrorContext>) => AppError;
  createChainError: (
    code: Extract<ErrorCode, `CHAIN_${string}`>,
    chainId?: string,
    provider?: string,
    context?: Partial<ErrorContext>
  ) => AppError;
  createWalletError: (
    code: Extract<ErrorCode, `WALLET_${string}`>,
    accountAddress?: string,
    walletType?: string,
    context?: Partial<ErrorContext>
  ) => AppError;
  createTransactionError: (
    code: Extract<ErrorCode, `TRANSACTION_${string}`>,
    txHash?: string,
    palletName?: string,
    callName?: string,
    context?: Partial<ErrorContext>
  ) => AppError;
  createFormError: (
    code: Extract<ErrorCode, `FORM_${string}`>,
    fieldName?: string,
    fieldValue?: unknown,
    context?: Partial<ErrorContext>
  ) => AppError;
  createNetworkError: (
    code: Extract<ErrorCode, `NETWORK_${string}`>,
    url?: string,
    statusCode?: number,
    method?: string,
    context?: Partial<ErrorContext>
  ) => AppError;

  // Error handling utilities
  handleError: (error: AppError | Error | unknown) => AppError;
  setError: (error: AppError | null) => void;
  clearError: () => void;

  // Operation wrappers
  wrapAsync: <T>(operation: () => Promise<T>) => Promise<ErrorResult<T>>;
  wrapSync: <T>(operation: () => T) => ErrorResult<T>;

  // Retry functionality
  retry: () => Promise<void>;
  canRetry: boolean;
  retryCount: number;

  // Error utilities
  getUserMessage: (error?: AppError) => string;
  getTechnicalDetails: (error?: AppError) => string;
  getRecoverySuggestions: (error?: AppError) => string[];
  isRetryable: (error?: AppError) => boolean;
  isActionable: (error?: AppError) => boolean;
}

/**
 * Hook for managing errors in React components
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn {
  const {
    enableRetry = true,
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    category = 'system',
  } = options;

  const [error, setErrorState] = useState<AppError | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const lastOperationRef = useRef<(() => Promise<void>) | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Handle error with callback and state update
  const handleErrorWithCallback = useCallback((errorToHandle: AppError | Error | unknown): AppError => {
    const appError = handleError(errorToHandle);

    // Set category if not already set
    if (appError.category === 'system' && category !== 'system') {
      appError.category = category;
    }

    setErrorState(appError);
    setRetryCount(0); // Reset retry count on new error

    // Call onError callback
    if (onError) {
      onError(appError);
    }

    return appError;
  }, [onError, category]);

  // Clear error state
  const clearError = useCallback(() => {
    setErrorState(null);
    setRetryCount(0);
    setIsRetrying(false);
    lastOperationRef.current = null;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  // Set error manually
  const setError = useCallback((newError: AppError | null) => {
    if (newError) {
      handleErrorWithCallback(newError);
    } else {
      clearError();
    }
  }, [handleErrorWithCallback, clearError]);

  // Retry the last operation
  const retry = useCallback(async () => {
    if (!lastOperationRef.current || !enableRetry || retryCount >= maxRetries) {
      return;
    }

    setIsRetrying(true);
    setRetryCount(prev => prev + 1);

    try {
      // Add delay before retry
      if (retryDelay > 0) {
        await new Promise(resolve => {
          retryTimeoutRef.current = setTimeout(resolve, retryDelay);
        });
      }

      await lastOperationRef.current();
      clearError(); // Clear error on successful retry
    } catch (retryError) {
      handleErrorWithCallback(retryError);
    } finally {
      setIsRetrying(false);
    }
  }, [enableRetry, maxRetries, retryCount, retryDelay, handleErrorWithCallback, clearError]);

  // Wrap async operations with error handling and retry capability
  const wrapAsyncWithRetry = useCallback(<T>(operation: () => Promise<T>): Promise<ErrorResult<T>> => {
    const wrappedOperation = async () => {
      try {
        const result = await operation();
        clearError(); // Clear any previous errors on success
        return result;
      } catch (operationError) {
        const appError = handleErrorWithCallback(operationError);
        throw appError;
      }
    };

    // Store operation for retry
    lastOperationRef.current = async () => {
      await wrappedOperation();
    };

    return wrapAsync(wrappedOperation, category);
  }, [category, handleErrorWithCallback, clearError]);

  // Wrap sync operations with error handling
  const wrapSyncOperation = useCallback(<T>(operation: () => T): ErrorResult<T> => {
    try {
      const result = operation();
      clearError(); // Clear any previous errors on success
      return { success: true, data: result };
    } catch (operationError) {
      const appError = handleErrorWithCallback(operationError);
      return { success: false, error: appError };
    }
  }, [handleErrorWithCallback, clearError]);

  // Error creation utilities with automatic error setting
  const createErrorWithSet = useCallback((code: ErrorCode, context?: Partial<ErrorContext>): AppError => {
    const newError = createError(code, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  const createChainErrorWithSet = useCallback((
    code: Extract<ErrorCode, `CHAIN_${string}`>,
    chainId?: string,
    provider?: string,
    context?: Partial<ErrorContext>
  ): AppError => {
    const newError = createChainError(code, chainId, provider, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  const createWalletErrorWithSet = useCallback((
    code: Extract<ErrorCode, `WALLET_${string}`>,
    accountAddress?: string,
    walletType?: string,
    context?: Partial<ErrorContext>
  ): AppError => {
    const newError = createWalletError(code, accountAddress, walletType, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  const createTransactionErrorWithSet = useCallback((
    code: Extract<ErrorCode, `TRANSACTION_${string}`>,
    txHash?: string,
    palletName?: string,
    callName?: string,
    context?: Partial<ErrorContext>
  ): AppError => {
    const newError = createTransactionError(code, txHash, palletName, callName, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  const createFormErrorWithSet = useCallback((
    code: Extract<ErrorCode, `FORM_${string}`>,
    fieldName?: string,
    fieldValue?: unknown,
    context?: Partial<ErrorContext>
  ): AppError => {
    const newError = createFormError(code, fieldName, fieldValue, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  const createNetworkErrorWithSet = useCallback((
    code: Extract<ErrorCode, `NETWORK_${string}`>,
    url?: string,
    statusCode?: number,
    method?: string,
    context?: Partial<ErrorContext>
  ): AppError => {
    const newError = createNetworkError(code, url, statusCode, method, context);
    setErrorState(newError);
    if (onError) {
      onError(newError);
    }
    return newError;
  }, [onError]);

  // Error utility functions
  const getUserMessage = useCallback((targetError?: AppError): string => {
    const errorToUse = targetError || error;
    return errorToUse ? errorHandler.getUserMessage(errorToUse) : '';
  }, [error]);

  const getTechnicalDetails = useCallback((targetError?: AppError): string => {
    const errorToUse = targetError || error;
    return errorToUse ? errorHandler.getTechnicalDetails(errorToUse) : '';
  }, [error]);

  const getRecoverySuggestions = useCallback((targetError?: AppError): string[] => {
    const errorToUse = targetError || error;
    return errorToUse ? errorHandler.getRecoverySuggestions(errorToUse) : [];
  }, [error]);

  const isRetryable = useCallback((targetError?: AppError): boolean => {
    const errorToUse = targetError || error;
    return errorToUse ? errorHandler.isRetryable(errorToUse) : false;
  }, [error]);

  const isActionable = useCallback((targetError?: AppError): boolean => {
    const errorToUse = targetError || error;
    return errorToUse ? errorHandler.isActionable(errorToUse) : false;
  }, [error]);

  return {
    // Current error state
    error,
    hasError: error !== null,
    isRetrying,

    // Error creation utilities
    createError: createErrorWithSet,
    createChainError: createChainErrorWithSet,
    createWalletError: createWalletErrorWithSet,
    createTransactionError: createTransactionErrorWithSet,
    createFormError: createFormErrorWithSet,
    createNetworkError: createNetworkErrorWithSet,

    // Error handling utilities
    handleError: handleErrorWithCallback,
    setError,
    clearError,

    // Operation wrappers
    wrapAsync: wrapAsyncWithRetry,
    wrapSync: wrapSyncOperation,

    // Retry functionality
    retry,
    canRetry: enableRetry && retryCount < maxRetries && error !== null && isRetryable(error) && !isRetrying,
    retryCount,

    // Error utilities
    getUserMessage,
    getTechnicalDetails,
    getRecoverySuggestions,
    isRetryable,
    isActionable,
  };
}

/**
 * Simplified hook for basic error handling without retry functionality
 */
export function useSimpleErrorHandler(category: ErrorCategory = 'system') {
  return useErrorHandler({
    enableRetry: false,
    category,
  });
}

/**
 * Hook specifically for form error handling
 */
export function useFormErrorHandler() {
  return useErrorHandler({
    category: 'form',
    enableRetry: false,
  });
}

/**
 * Hook specifically for network operation error handling
 */
export function useNetworkErrorHandler() {
  return useErrorHandler({
    category: 'network',
    enableRetry: true,
    maxRetries: 3,
    retryDelay: 2000,
  });
}

/**
 * Hook specifically for transaction error handling
 */
export function useTransactionErrorHandler() {
  return useErrorHandler({
    category: 'transaction',
    enableRetry: true,
    maxRetries: 2,
    retryDelay: 3000,
  });
}