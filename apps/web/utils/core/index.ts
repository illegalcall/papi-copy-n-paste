/**
 * Core utilities barrel exports
 * Provides centralized access to core utility functions
 */

export * from './error-handler';

// Re-export commonly used types for convenience
export type {
  AppError,
  ErrorCode,
  ErrorCategory,
  ErrorSeverity,
  ErrorResult,
  ChainError,
  WalletError,
  TransactionError,
  FormError,
  NetworkError,
  SystemError,
  UserError,
} from '../../types/errors';