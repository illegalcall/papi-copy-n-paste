/**
 * Comprehensive error type system for PAPI Copy-Paste application
 * Provides standardized error handling across all domains
 */

// Base error interface that all errors extend
export interface BaseError {
  code: string;
  message: string;
  timestamp: number;
  context?: Record<string, unknown>;
  recoverable: boolean;
}

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Error categories for better organization
export type ErrorCategory =
  | 'chain'
  | 'wallet'
  | 'transaction'
  | 'form'
  | 'network'
  | 'validation'
  | 'system'
  | 'user';

// Enhanced error interface with categorization
export interface AppError extends BaseError {
  severity: ErrorSeverity;
  category: ErrorCategory;
  userMessage: string; // User-friendly message
  technicalDetails?: string; // Technical details for debugging
  retryable: boolean;
  actionable: boolean; // Whether user can take action to fix
}

// Chain-related errors
export interface ChainError extends AppError {
  category: 'chain';
  chainId?: string;
  provider?: string;
}

export type ChainErrorCode =
  | 'CHAIN_CONNECTION_FAILED'
  | 'CHAIN_METADATA_LOAD_FAILED'
  | 'CHAIN_UNSUPPORTED'
  | 'CHAIN_NETWORK_ERROR'
  | 'CHAIN_RPC_ERROR'
  | 'CHAIN_TIMEOUT';

// Wallet-related errors
export interface WalletError extends AppError {
  category: 'wallet';
  accountAddress?: string;
  walletType?: string;
}

export type WalletErrorCode =
  | 'WALLET_NOT_CONNECTED'
  | 'WALLET_CONNECTION_FAILED'
  | 'WALLET_ACCOUNT_NOT_FOUND'
  | 'WALLET_SIGNING_FAILED'
  | 'WALLET_SIGNING_CANCELLED'
  | 'WALLET_INSUFFICIENT_BALANCE'
  | 'WALLET_EXTENSION_NOT_FOUND'
  | 'WALLET_PERMISSION_DENIED';

// Transaction-related errors
export interface TransactionError extends AppError {
  category: 'transaction';
  txHash?: string;
  blockHash?: string;
  extrinsicIndex?: number;
  palletName?: string;
  callName?: string;
}

export type TransactionErrorCode =
  | 'TRANSACTION_FAILED'
  | 'TRANSACTION_INVALID'
  | 'TRANSACTION_TIMEOUT'
  | 'TRANSACTION_FEE_ESTIMATION_FAILED'
  | 'TRANSACTION_BALANCE_TOO_LOW'
  | 'TRANSACTION_NONCE_ERROR'
  | 'TRANSACTION_DECODE_ERROR'
  | 'TRANSACTION_SUBMISSION_FAILED';

// Form validation errors
export interface FormError extends AppError {
  category: 'form';
  fieldName?: string;
  fieldValue?: unknown;
}

export type FormErrorCode =
  | 'FORM_FIELD_REQUIRED'
  | 'FORM_FIELD_INVALID'
  | 'FORM_VALIDATION_FAILED'
  | 'FORM_PARAMETER_TYPE_MISMATCH'
  | 'FORM_PARAMETER_OUT_OF_RANGE'
  | 'FORM_PARAMETER_DECODE_FAILED';

// Network-related errors
export interface NetworkError extends AppError {
  category: 'network';
  url?: string;
  statusCode?: number;
  method?: string;
}

export type NetworkErrorCode =
  | 'NETWORK_REQUEST_FAILED'
  | 'NETWORK_TIMEOUT'
  | 'NETWORK_CONNECTION_LOST'
  | 'NETWORK_RATE_LIMITED'
  | 'NETWORK_UNAUTHORIZED'
  | 'NETWORK_FORBIDDEN'
  | 'NETWORK_NOT_FOUND'
  | 'NETWORK_SERVER_ERROR';

// System-level errors
export interface SystemError extends AppError {
  category: 'system';
  component?: string;
  operation?: string;
}

export type SystemErrorCode =
  | 'SYSTEM_INITIALIZATION_FAILED'
  | 'SYSTEM_MEMORY_ERROR'
  | 'SYSTEM_STORAGE_ERROR'
  | 'SYSTEM_PERMISSION_ERROR'
  | 'SYSTEM_BROWSER_INCOMPATIBLE'
  | 'SYSTEM_FEATURE_UNSUPPORTED';

// User input errors
export interface UserError extends AppError {
  category: 'user';
  inputType?: string;
}

export type UserErrorCode =
  | 'USER_INPUT_INVALID'
  | 'USER_ACTION_FORBIDDEN'
  | 'USER_SESSION_EXPIRED'
  | 'USER_QUOTA_EXCEEDED';

// Union types for all error codes
export type ErrorCode =
  | ChainErrorCode
  | WalletErrorCode
  | TransactionErrorCode
  | FormErrorCode
  | NetworkErrorCode
  | SystemErrorCode
  | UserErrorCode;

// Union type for all specific error types
export type SpecificError =
  | ChainError
  | WalletError
  | TransactionError
  | FormError
  | NetworkError
  | SystemError
  | UserError;

// Error context interfaces for additional metadata
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  chainId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

// Error result type for operations that can fail
export type ErrorResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: AppError };

// Error handler function type
export type ErrorHandler = (error: AppError) => void;

// Error recovery function type
export type ErrorRecoveryFn = (error: AppError) => Promise<boolean>;

// Error reporting configuration
export interface ErrorReportingConfig {
  enableConsoleLogging: boolean;
  enableUserNotification: boolean;
  enableRemoteReporting: boolean;
  logLevel: ErrorSeverity;
  maxRetries: number;
  retryDelay: number;
}