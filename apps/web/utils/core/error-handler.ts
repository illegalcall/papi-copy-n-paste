/**
 * Central error handling utilities for PAPI Copy-Paste application
 * Provides standardized error creation, formatting, and handling
 */

import {
  AppError,
  BaseError,
  ErrorCode,
  ErrorCategory,
  ErrorSeverity,
  ErrorContext,
  ErrorResult,
  ErrorReportingConfig,
  ChainError,
  WalletError,
  TransactionError,
  FormError,
  NetworkError,
  SystemError,
  UserError,
} from '../../types/errors';
import {
  ERROR_MESSAGES,
  DEFAULT_ERROR_CONFIG,
  ERROR_RECOVERY_SUGGESTIONS,
} from '../../constants/errors';

/**
 * Core error handler class that manages error creation, formatting, and reporting
 */
export class ErrorHandler {
  private config: ErrorReportingConfig;
  private errorHistory: AppError[] = [];
  private readonly maxHistorySize = 100;

  constructor(config: Partial<ErrorReportingConfig> = {}) {
    this.config = { ...DEFAULT_ERROR_CONFIG, ...config };
  }

  /**
   * Create a standardized error from an error code
   */
  createError(
    code: ErrorCode,
    context?: Partial<ErrorContext>,
    overrides?: Partial<AppError>
  ): AppError {
    const template = ERROR_MESSAGES[code];
    if (!template) {
      return this.createUnknownError(code, context);
    }

    const category = this.getErrorCategory(code);
    const baseError: AppError = {
      code,
      message: template.technicalMessage,
      userMessage: template.userMessage,
      severity: template.severity,
      category,
      timestamp: Date.now(),
      context: context || {},
      recoverable: template.recoverable,
      retryable: template.retryable,
      actionable: template.actionable,
      technicalDetails: template.technicalMessage,
    };

    // Apply any overrides
    const finalError = { ...baseError, ...overrides };

    // Add to history
    this.addToHistory(finalError);

    return finalError;
  }

  /**
   * Create error from JavaScript Error object
   */
  createErrorFromException(
    error: Error | unknown,
    category: ErrorCategory,
    context?: Partial<ErrorContext>
  ): AppError {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    const appError: AppError = {
      code: 'SYSTEM_INITIALIZATION_FAILED', // Default code, should be overridden
      message: errorMessage,
      userMessage: 'An unexpected error occurred. Please try again.',
      severity: 'high',
      category,
      timestamp: Date.now(),
      context: context || {},
      recoverable: true,
      retryable: true,
      actionable: true,
      technicalDetails: errorStack,
    };

    this.addToHistory(appError);
    return appError;
  }

  /**
   * Create chain-specific error
   */
  createChainError(
    code: Extract<ErrorCode, `CHAIN_${string}`>,
    chainId?: string,
    provider?: string,
    context?: Partial<ErrorContext>
  ): ChainError {
    const baseError = this.createError(code, context);
    return {
      ...baseError,
      category: 'chain',
      chainId,
      provider,
    } as ChainError;
  }

  /**
   * Create wallet-specific error
   */
  createWalletError(
    code: Extract<ErrorCode, `WALLET_${string}`>,
    accountAddress?: string,
    walletType?: string,
    context?: Partial<ErrorContext>
  ): WalletError {
    const baseError = this.createError(code, context);
    return {
      ...baseError,
      category: 'wallet',
      accountAddress,
      walletType,
    } as WalletError;
  }

  /**
   * Create transaction-specific error
   */
  createTransactionError(
    code: Extract<ErrorCode, `TRANSACTION_${string}`>,
    txHash?: string,
    palletName?: string,
    callName?: string,
    context?: Partial<ErrorContext>
  ): TransactionError {
    const baseError = this.createError(code, context);
    return {
      ...baseError,
      category: 'transaction',
      txHash,
      palletName,
      callName,
    } as TransactionError;
  }

  /**
   * Create form validation error
   */
  createFormError(
    code: Extract<ErrorCode, `FORM_${string}`>,
    fieldName?: string,
    fieldValue?: unknown,
    context?: Partial<ErrorContext>
  ): FormError {
    const baseError = this.createError(code, context);
    return {
      ...baseError,
      category: 'form',
      fieldName,
      fieldValue,
    } as FormError;
  }

  /**
   * Create network-specific error
   */
  createNetworkError(
    code: Extract<ErrorCode, `NETWORK_${string}`>,
    url?: string,
    statusCode?: number,
    method?: string,
    context?: Partial<ErrorContext>
  ): NetworkError {
    const baseError = this.createError(code, context);
    return {
      ...baseError,
      category: 'network',
      url,
      statusCode,
      method,
    } as NetworkError;
  }

  /**
   * Handle an error with the configured reporting strategy
   */
  handleError(error: AppError | Error | unknown): AppError {
    let appError: AppError;

    if (this.isAppError(error)) {
      appError = error;
    } else {
      appError = this.createErrorFromException(error, 'system');
    }

    // Apply severity filtering
    if (this.shouldLogError(appError)) {
      this.reportError(appError);
    }

    return appError;
  }

  /**
   * Wrap async operations with error handling
   */
  async wrapAsync<T>(
    operation: () => Promise<T>,
    errorCategory: ErrorCategory = 'system'
  ): Promise<ErrorResult<T>> {
    try {
      const data = await operation();
      return { success: true, data };
    } catch (error) {
      const appError = this.handleError(error);
      appError.category = errorCategory;
      return { success: false, error: appError };
    }
  }

  /**
   * Wrap sync operations with error handling
   */
  wrapSync<T>(
    operation: () => T,
    errorCategory: ErrorCategory = 'system'
  ): ErrorResult<T> {
    try {
      const data = operation();
      return { success: true, data };
    } catch (error) {
      const appError = this.handleError(error);
      appError.category = errorCategory;
      return { success: false, error: appError };
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: AppError): string {
    return error.userMessage || error.message;
  }

  /**
   * Get technical error details
   */
  getTechnicalDetails(error: AppError): string {
    return error.technicalDetails || error.message;
  }

  /**
   * Get recovery suggestions for an error
   */
  getRecoverySuggestions(error: AppError): string[] {
    return ERROR_RECOVERY_SUGGESTIONS[error.code as keyof typeof ERROR_RECOVERY_SUGGESTIONS] || [
      'Try refreshing the page',
      'Check your internet connection',
      'Contact support if the problem persists',
    ];
  }

  /**
   * Check if error is retryable
   */
  isRetryable(error: AppError): boolean {
    return error.retryable && error.recoverable;
  }

  /**
   * Check if user can take action to fix the error
   */
  isActionable(error: AppError): boolean {
    return error.actionable;
  }

  /**
   * Get error history (for debugging)
   */
  getErrorHistory(): AppError[] {
    return [...this.errorHistory];
  }

  /**
   * Clear error history
   */
  clearErrorHistory(): void {
    this.errorHistory = [];
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errorHistory.length,
      byCategory: {} as Record<ErrorCategory, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      recentErrors: this.errorHistory.slice(-10),
    };

    this.errorHistory.forEach(error => {
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }

  /**
   * Update error handling configuration
   */
  updateConfig(newConfig: Partial<ErrorReportingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Private helper methods

  private createUnknownError(code: string, context?: Partial<ErrorContext>): AppError {
    return {
      code: code as ErrorCode,
      message: `Unknown error: ${code}`,
      userMessage: 'An unexpected error occurred. Please try again.',
      severity: 'medium',
      category: 'system',
      timestamp: Date.now(),
      context: context || {},
      recoverable: true,
      retryable: true,
      actionable: true,
    };
  }

  private getErrorCategory(code: ErrorCode): ErrorCategory {
    if (code.startsWith('CHAIN_')) return 'chain';
    if (code.startsWith('WALLET_')) return 'wallet';
    if (code.startsWith('TRANSACTION_')) return 'transaction';
    if (code.startsWith('FORM_')) return 'form';
    if (code.startsWith('NETWORK_')) return 'network';
    if (code.startsWith('SYSTEM_')) return 'system';
    if (code.startsWith('USER_')) return 'user';
    return 'system';
  }

  private isAppError(error: unknown): error is AppError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error &&
      'severity' in error &&
      'category' in error
    );
  }

  private shouldLogError(error: AppError): boolean {
    const severityLevels: Record<ErrorSeverity, number> = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    };

    return severityLevels[error.severity] >= severityLevels[this.config.logLevel];
  }

  private reportError(error: AppError): void {
    if (this.config.enableConsoleLogging) {
      this.logToConsole(error);
    }

    if (this.config.enableUserNotification) {
      // This could trigger a toast notification or other UI feedback
      // Implementation would depend on the UI notification system
    }

    if (this.config.enableRemoteReporting) {
      // This could send errors to a remote logging service
      // Implementation would depend on the logging service used
      this.reportToRemoteService(error);
    }
  }

  private logToConsole(error: AppError): void {
    const logMethod = this.getConsoleMethod(error.severity);
    const prefix = `[${error.category.toUpperCase()}:${error.severity.toUpperCase()}]`;

    logMethod(`${prefix} ${error.code}: ${error.message}`, {
      userMessage: error.userMessage,
      context: error.context,
      timestamp: new Date(error.timestamp).toISOString(),
      technicalDetails: error.technicalDetails,
      recoverable: error.recoverable,
      retryable: error.retryable,
    });
  }

  private getConsoleMethod(severity: ErrorSeverity) {
    switch (severity) {
      case 'low':
        return console.info;
      case 'medium':
        return console.warn;
      case 'high':
      case 'critical':
        return console.error;
      default:
        return console.log;
    }
  }

  private reportToRemoteService(error: AppError): void {
    // Placeholder for remote error reporting
    // Could integrate with services like Sentry, LogRocket, etc.
    console.debug('Would report to remote service:', error);
  }

  private addToHistory(error: AppError): void {
    this.errorHistory.push(error);

    // Keep history size manageable
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(-this.maxHistorySize);
    }
  }
}

// Export a default instance for convenience
export const errorHandler = new ErrorHandler();

// Export utility functions for common operations
export const createError = (code: ErrorCode, context?: Partial<ErrorContext>) =>
  errorHandler.createError(code, context);

export const createChainError = (
  code: Extract<ErrorCode, `CHAIN_${string}`>,
  chainId?: string,
  provider?: string,
  context?: Partial<ErrorContext>
) => errorHandler.createChainError(code, chainId, provider, context);

export const createWalletError = (
  code: Extract<ErrorCode, `WALLET_${string}`>,
  accountAddress?: string,
  walletType?: string,
  context?: Partial<ErrorContext>
) => errorHandler.createWalletError(code, accountAddress, walletType, context);

export const createTransactionError = (
  code: Extract<ErrorCode, `TRANSACTION_${string}`>,
  txHash?: string,
  palletName?: string,
  callName?: string,
  context?: Partial<ErrorContext>
) => errorHandler.createTransactionError(code, txHash, palletName, callName, context);

export const createFormError = (
  code: Extract<ErrorCode, `FORM_${string}`>,
  fieldName?: string,
  fieldValue?: unknown,
  context?: Partial<ErrorContext>
) => errorHandler.createFormError(code, fieldName, fieldValue, context);

export const createNetworkError = (
  code: Extract<ErrorCode, `NETWORK_${string}`>,
  url?: string,
  statusCode?: number,
  method?: string,
  context?: Partial<ErrorContext>
) => errorHandler.createNetworkError(code, url, statusCode, method, context);

export const handleError = (error: AppError | Error | unknown) =>
  errorHandler.handleError(error);

export const wrapAsync = <T>(
  operation: () => Promise<T>,
  errorCategory?: ErrorCategory
) => errorHandler.wrapAsync(operation, errorCategory);

export const wrapSync = <T>(
  operation: () => T,
  errorCategory?: ErrorCategory
) => errorHandler.wrapSync(operation, errorCategory);