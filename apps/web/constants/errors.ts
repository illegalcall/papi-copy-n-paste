
import {
  ErrorCode,
  ErrorSeverity,
  ChainErrorCode,
  WalletErrorCode,
  TransactionErrorCode,
  FormErrorCode,
  NetworkErrorCode,
  SystemErrorCode,
  UserErrorCode,
} from '../types/errors';

// Error message templates
export interface ErrorMessageTemplate {
  userMessage: string;
  technicalMessage: string;
  severity: ErrorSeverity;
  recoverable: boolean;
  retryable: boolean;
  actionable: boolean;
}

// Chain error messages
export const CHAIN_ERROR_MESSAGES: Record<ChainErrorCode, ErrorMessageTemplate> = {
  CHAIN_CONNECTION_FAILED: {
    userMessage: 'Unable to connect to the blockchain network. Please check your connection and try again.',
    technicalMessage: 'Failed to establish connection to the chain provider.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  CHAIN_METADATA_LOAD_FAILED: {
    userMessage: 'Failed to load blockchain metadata. The chain may be unavailable.',
    technicalMessage: 'Metadata loading failed - chain RPC may be down or incompatible.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  CHAIN_UNSUPPORTED: {
    userMessage: 'This blockchain network is not supported.',
    technicalMessage: 'Chain ID or configuration not found in supported networks.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  CHAIN_NETWORK_ERROR: {
    userMessage: 'Network error occurred while communicating with the blockchain.',
    technicalMessage: 'Network request to chain RPC failed.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  CHAIN_RPC_ERROR: {
    userMessage: 'The blockchain node returned an error. Please try again.',
    technicalMessage: 'RPC call returned an error response.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  CHAIN_TIMEOUT: {
    userMessage: 'Request to blockchain timed out. Please check your connection.',
    technicalMessage: 'Chain RPC request exceeded timeout limit.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
};

// Wallet error messages
export const WALLET_ERROR_MESSAGES: Record<WalletErrorCode, ErrorMessageTemplate> = {
  WALLET_NOT_CONNECTED: {
    userMessage: 'Please connect your wallet to continue.',
    technicalMessage: 'No wallet connection detected.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  WALLET_CONNECTION_FAILED: {
    userMessage: 'Failed to connect to your wallet. Please try again.',
    technicalMessage: 'Wallet connection attempt failed.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  WALLET_ACCOUNT_NOT_FOUND: {
    userMessage: 'No wallet accounts found. Please check your wallet.',
    technicalMessage: 'No accounts available in connected wallet.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  WALLET_SIGNING_FAILED: {
    userMessage: 'Transaction signing failed. Please try again.',
    technicalMessage: 'Wallet failed to sign the transaction.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  WALLET_SIGNING_CANCELLED: {
    userMessage: 'Transaction signing was cancelled.',
    technicalMessage: 'User cancelled the signing process.',
    severity: 'low',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  WALLET_INSUFFICIENT_BALANCE: {
    userMessage: 'Insufficient balance to complete this transaction.',
    technicalMessage: 'Account balance is too low for transaction fees.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  WALLET_EXTENSION_NOT_FOUND: {
    userMessage: 'Wallet browser extension not found. Please install a compatible wallet.',
    technicalMessage: 'Required wallet extension is not installed.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  WALLET_PERMISSION_DENIED: {
    userMessage: 'Wallet access denied. Please grant permission and try again.',
    technicalMessage: 'User denied wallet access permission.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
};

// Transaction error messages
export const TRANSACTION_ERROR_MESSAGES: Record<TransactionErrorCode, ErrorMessageTemplate> = {
  TRANSACTION_FAILED: {
    userMessage: 'Transaction failed to execute. Please check the details and try again.',
    technicalMessage: 'Transaction execution failed on the blockchain.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  TRANSACTION_INVALID: {
    userMessage: 'Transaction parameters are invalid. Please check your inputs.',
    technicalMessage: 'Transaction validation failed - invalid parameters.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  TRANSACTION_TIMEOUT: {
    userMessage: 'Transaction timed out. It may still be processing.',
    technicalMessage: 'Transaction submission or confirmation timed out.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  TRANSACTION_FEE_ESTIMATION_FAILED: {
    userMessage: 'Unable to estimate transaction fees. You can still proceed.',
    technicalMessage: 'Fee estimation RPC call failed.',
    severity: 'low',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  TRANSACTION_BALANCE_TOO_LOW: {
    userMessage: 'Insufficient balance for this transaction including fees.',
    technicalMessage: 'Account balance insufficient for transaction amount plus fees.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  TRANSACTION_NONCE_ERROR: {
    userMessage: 'Transaction ordering error. Please try again.',
    technicalMessage: 'Nonce mismatch or sequence error.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  TRANSACTION_DECODE_ERROR: {
    userMessage: 'Unable to decode transaction data.',
    technicalMessage: 'Transaction decoding failed - incompatible format.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  TRANSACTION_SUBMISSION_FAILED: {
    userMessage: 'Failed to submit transaction to the network.',
    technicalMessage: 'Transaction submission to node failed.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
};

// Form error messages
export const FORM_ERROR_MESSAGES: Record<FormErrorCode, ErrorMessageTemplate> = {
  FORM_FIELD_REQUIRED: {
    userMessage: 'This field is required.',
    technicalMessage: 'Required form field is empty.',
    severity: 'low',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  FORM_FIELD_INVALID: {
    userMessage: 'Please enter a valid value for this field.',
    technicalMessage: 'Form field validation failed.',
    severity: 'low',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  FORM_VALIDATION_FAILED: {
    userMessage: 'Please check your inputs and try again.',
    technicalMessage: 'Form validation failed for multiple fields.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  FORM_PARAMETER_TYPE_MISMATCH: {
    userMessage: 'The value type does not match the expected format.',
    technicalMessage: 'Parameter type validation failed.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  FORM_PARAMETER_OUT_OF_RANGE: {
    userMessage: 'The value is outside the allowed range.',
    technicalMessage: 'Parameter value exceeds allowed bounds.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  FORM_PARAMETER_DECODE_FAILED: {
    userMessage: 'Unable to process the parameter value.',
    technicalMessage: 'Parameter decoding/encoding failed.',
    severity: 'medium',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
};

// Network error messages
export const NETWORK_ERROR_MESSAGES: Record<NetworkErrorCode, ErrorMessageTemplate> = {
  NETWORK_REQUEST_FAILED: {
    userMessage: 'Network request failed. Please check your connection.',
    technicalMessage: 'HTTP request failed with network error.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  NETWORK_TIMEOUT: {
    userMessage: 'Request timed out. Please try again.',
    technicalMessage: 'Network request exceeded timeout limit.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  NETWORK_CONNECTION_LOST: {
    userMessage: 'Connection lost. Please check your internet connection.',
    technicalMessage: 'Network connection interrupted.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  NETWORK_RATE_LIMITED: {
    userMessage: 'Too many requests. Please wait and try again.',
    technicalMessage: 'Rate limit exceeded for API endpoint.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
  NETWORK_UNAUTHORIZED: {
    userMessage: 'Access denied. Please check your permissions.',
    technicalMessage: 'HTTP 401 - Unauthorized access.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  NETWORK_FORBIDDEN: {
    userMessage: 'Access forbidden. You do not have permission for this action.',
    technicalMessage: 'HTTP 403 - Forbidden access.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: false,
  },
  NETWORK_NOT_FOUND: {
    userMessage: 'The requested resource was not found.',
    technicalMessage: 'HTTP 404 - Resource not found.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  NETWORK_SERVER_ERROR: {
    userMessage: 'Server error occurred. Please try again later.',
    technicalMessage: 'HTTP 5xx - Server error.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
};

// System error messages
export const SYSTEM_ERROR_MESSAGES: Record<SystemErrorCode, ErrorMessageTemplate> = {
  SYSTEM_INITIALIZATION_FAILED: {
    userMessage: 'Application failed to start properly. Please refresh the page.',
    technicalMessage: 'System initialization sequence failed.',
    severity: 'critical',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  SYSTEM_MEMORY_ERROR: {
    userMessage: 'Memory error occurred. Please refresh the page.',
    technicalMessage: 'Out of memory or memory allocation failed.',
    severity: 'high',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  SYSTEM_STORAGE_ERROR: {
    userMessage: 'Local storage error. Some features may not work properly.',
    technicalMessage: 'Browser storage access failed.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  SYSTEM_PERMISSION_ERROR: {
    userMessage: 'Permission denied. Please grant the required permissions.',
    technicalMessage: 'Browser permission required but not granted.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  SYSTEM_BROWSER_INCOMPATIBLE: {
    userMessage: 'Your browser is not compatible. Please use a modern browser.',
    technicalMessage: 'Browser does not support required features.',
    severity: 'high',
    recoverable: false,
    retryable: false,
    actionable: true,
  },
  SYSTEM_FEATURE_UNSUPPORTED: {
    userMessage: 'This feature is not supported on your device.',
    technicalMessage: 'Required browser feature is not available.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: false,
  },
};

// User error messages
export const USER_ERROR_MESSAGES: Record<UserErrorCode, ErrorMessageTemplate> = {
  USER_INPUT_INVALID: {
    userMessage: 'Please enter valid input.',
    technicalMessage: 'User input validation failed.',
    severity: 'low',
    recoverable: true,
    retryable: false,
    actionable: true,
  },
  USER_ACTION_FORBIDDEN: {
    userMessage: 'This action is not allowed.',
    technicalMessage: 'User attempted forbidden action.',
    severity: 'medium',
    recoverable: false,
    retryable: false,
    actionable: false,
  },
  USER_SESSION_EXPIRED: {
    userMessage: 'Your session has expired. Please refresh the page.',
    technicalMessage: 'User session timeout reached.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: true,
  },
  USER_QUOTA_EXCEEDED: {
    userMessage: 'You have exceeded your usage limit. Please try again later.',
    technicalMessage: 'User quota or rate limit exceeded.',
    severity: 'medium',
    recoverable: true,
    retryable: true,
    actionable: false,
  },
};

// Combined error messages lookup
export const ERROR_MESSAGES: Record<ErrorCode, ErrorMessageTemplate> = {
  ...CHAIN_ERROR_MESSAGES,
  ...WALLET_ERROR_MESSAGES,
  ...TRANSACTION_ERROR_MESSAGES,
  ...FORM_ERROR_MESSAGES,
  ...NETWORK_ERROR_MESSAGES,
  ...SYSTEM_ERROR_MESSAGES,
  ...USER_ERROR_MESSAGES,
};

// Default error configuration
export const DEFAULT_ERROR_CONFIG = {
  enableConsoleLogging: true,
  enableUserNotification: true,
  enableRemoteReporting: false,
  logLevel: 'medium' as ErrorSeverity,
  maxRetries: 3,
  retryDelay: 1000, // milliseconds
};

// Error recovery suggestions
export const ERROR_RECOVERY_SUGGESTIONS: Record<ErrorCode, string[]> = {
  // Chain errors
  CHAIN_CONNECTION_FAILED: [
    'Check your internet connection',
    'Try selecting a different network provider',
    'Refresh the page and try again',
  ],
  CHAIN_METADATA_LOAD_FAILED: [
    'Wait a moment and try again',
    'Switch to a different network provider',
    'Check if the network is experiencing issues',
  ],
  CHAIN_UNSUPPORTED: [
    'Select a supported network from the dropdown',
    'Check the network list for available options',
  ],

  // Wallet errors
  WALLET_NOT_CONNECTED: [
    'Click the Connect Wallet button',
    'Make sure your wallet extension is installed',
    'Check that your wallet is unlocked',
  ],
  WALLET_CONNECTION_FAILED: [
    'Refresh the page and try again',
    'Check that your wallet extension is running',
    'Try connecting with a different wallet',
  ],
  WALLET_INSUFFICIENT_BALANCE: [
    'Add more tokens to your wallet',
    'Try a smaller transaction amount',
    'Check your account balance',
  ],

  // Transaction errors
  TRANSACTION_FAILED: [
    'Check your transaction parameters',
    'Ensure you have sufficient balance',
    'Try again with a higher fee',
  ],
  TRANSACTION_INVALID: [
    'Review all form fields for errors',
    'Check parameter types and values',
    'Verify recipient address format',
  ],

  // Form errors
  FORM_FIELD_REQUIRED: [
    'Fill in all required fields',
    'Check for any missing information',
  ],
  FORM_FIELD_INVALID: [
    'Check the field format requirements',
    'Verify the input type matches what is expected',
  ],

  // Network errors
  NETWORK_REQUEST_FAILED: [
    'Check your internet connection',
    'Try refreshing the page',
    'Wait a moment and try again',
  ],
  NETWORK_TIMEOUT: [
    'Check your connection speed',
    'Try again with a stable connection',
    'Consider using a different network provider',
  ],

  // System errors
  SYSTEM_INITIALIZATION_FAILED: [
    'Refresh the page',
    'Clear your browser cache',
    'Try using a different browser',
  ],
  SYSTEM_BROWSER_INCOMPATIBLE: [
    'Update your browser to the latest version',
    'Try using Chrome, Firefox, or Safari',
    'Enable JavaScript if disabled',
  ],

  // User errors
  USER_INPUT_INVALID: [
    'Check the input format requirements',
    'Make sure all fields are filled correctly',
  ],
  USER_SESSION_EXPIRED: [
    'Refresh the page to start a new session',
    'Make sure cookies are enabled',
  ],

  // Default suggestions for errors not explicitly listed
  CHAIN_NETWORK_ERROR: ['Check your connection', 'Try again'],
  CHAIN_RPC_ERROR: ['Try again', 'Switch providers'],
  CHAIN_TIMEOUT: ['Wait and retry', 'Check connection'],
  WALLET_ACCOUNT_NOT_FOUND: ['Check wallet', 'Create account'],
  WALLET_SIGNING_FAILED: ['Try again', 'Check wallet'],
  WALLET_SIGNING_CANCELLED: ['Try signing again'],
  WALLET_EXTENSION_NOT_FOUND: ['Install wallet extension'],
  WALLET_PERMISSION_DENIED: ['Grant wallet permissions'],
  TRANSACTION_TIMEOUT: ['Wait for confirmation', 'Check block explorer'],
  TRANSACTION_FEE_ESTIMATION_FAILED: ['Proceed without estimate'],
  TRANSACTION_BALANCE_TOO_LOW: ['Add more balance'],
  TRANSACTION_NONCE_ERROR: ['Try again'],
  TRANSACTION_DECODE_ERROR: ['Check parameters'],
  TRANSACTION_SUBMISSION_FAILED: ['Retry submission'],
  FORM_VALIDATION_FAILED: ['Check all fields'],
  FORM_PARAMETER_TYPE_MISMATCH: ['Check parameter type'],
  FORM_PARAMETER_OUT_OF_RANGE: ['Adjust value range'],
  FORM_PARAMETER_DECODE_FAILED: ['Check parameter format'],
  NETWORK_CONNECTION_LOST: ['Check internet connection'],
  NETWORK_RATE_LIMITED: ['Wait before retrying'],
  NETWORK_UNAUTHORIZED: ['Check permissions'],
  NETWORK_FORBIDDEN: ['Contact support'],
  NETWORK_NOT_FOUND: ['Check URL'],
  NETWORK_SERVER_ERROR: ['Try again later'],
  SYSTEM_MEMORY_ERROR: ['Refresh page'],
  SYSTEM_STORAGE_ERROR: ['Clear browser data'],
  SYSTEM_PERMISSION_ERROR: ['Grant permissions'],
  SYSTEM_FEATURE_UNSUPPORTED: ['Use different browser'],
  USER_ACTION_FORBIDDEN: ['Contact support'],
  USER_QUOTA_EXCEEDED: ['Wait before retrying'],
};