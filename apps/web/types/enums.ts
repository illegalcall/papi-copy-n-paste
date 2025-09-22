/**
 * Centralized enums for type safety and magic string elimination
 * This file contains all enums used throughout the application
 */

/**
 * Storage query operation types
 * Used for PAPI storage queries
 */
export enum StorageQueryType {
  GET_VALUE = 'getValue',
  GET_VALUE_AT = 'getValueAt',
  GET_VALUES = 'getValues',
  GET_ENTRIES = 'getEntries',
  GET_ENTRIES_PAGED = 'getEntriesPaged',
  WATCH_VALUE = 'watchValue',
  WATCH_VALUE_FINALIZED = 'watchValueFinalized',
  WATCH_VALUE_BEST = 'watchValueBest',
  WATCH_ENTRIES = 'watchEntries',
  WATCH_ENTRIES_PARTIAL = 'watchEntriesPartial',
  MULTI_WATCH = 'multiWatch',
  CONDITIONAL_WATCH = 'conditionalWatch',
  THROTTLED_WATCH = 'throttledWatch',
  COMPREHENSIVE = 'comprehensive',
  COMBINE_MULTIPLE = 'combineMultiple',
  DEBOUNCED_WATCH = 'debouncedWatch',
  MAP_VALUES = 'mapValues',
  FILTER_CHANGES = 'filterChanges',
  TAKE_UNTIL_CHANGE = 'takeUntilChange',
  RESILIENT_WATCH = 'resilientWatch',
  COMPREHENSIVE_WATCH = 'comprehensiveWatch'
}

/**
 * Supported blockchain networks
 * Used for chain configuration and routing
 */
export enum ChainKey {
  POLKADOT = 'polkadot',
  KUSAMA = 'kusama',
  MOONBEAM = 'moonbeam',
  BIFROST = 'bifrost',
  ASTAR = 'astar',
  ACALA = 'acala',
  HYDRATION = 'hydration',
  WESTEND = 'westend',
  ROCOCO = 'rococo',
  PASEO_ASSET_HUB = 'paseo_asset_hub'
}

/**
 * Task execution states
 * Used for progress tracking and workflow management
 */
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
  FAILED = 'failed'
}

/**
 * Transaction execution states
 * Used for tracking transaction lifecycle
 */
export enum TransactionStatus {
  IDLE = 'idle',
  PREPARING = 'preparing',
  SIGNING = 'signing',
  BROADCASTING = 'broadcasting',
  FINALIZING = 'finalizing',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

/**
 * Connection states for blockchain networks
 * Used for network status management
 */
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error'
}

/**
 * Validation states for forms and inputs
 * Used for form validation feedback
 */
export enum ValidationStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  PENDING = 'pending',
  UNKNOWN = 'unknown'
}

/**
 * Log message types for consistent logging
 * Used throughout the application for structured logging
 */
export enum LogLevel {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug'
}

/**
 * Component complexity indicators
 * Used for educational and development guidance
 */
export enum ComplexityLevel {
  SIMPLE = 'simple',
  MEDIUM = 'medium',
  COMPLEX = 'complex'
}

/**
 * Parameter types for PAPI operations
 * Used for type-safe parameter handling
 */
export enum ParameterType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  BYTES = 'bytes',
  ACCOUNT_ID = 'AccountId',
  BALANCE = 'Balance',
  HASH = 'Hash',
  BLOCK_NUMBER = 'BlockNumber',
  ENUM = 'enum',
  ARRAY = 'array',
  OBJECT = 'object'
}

/**
 * Provider types for different connection methods
 * Used for network provider configuration
 */
export enum ProviderType {
  WS = 'ws',
  HTTP = 'http',
  SMOLDOT = 'smoldot',
  EXTENSION = 'extension'
}

/**
 * UI themes and display modes
 * Used for consistent theming
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

/**
 * Network environment types
 * Used for deployment and configuration
 */
export enum NetworkEnvironment {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  LOCAL = 'local',
  DEVELOPMENT = 'development'
}


/**
 * Boolean string representations
 * Used for consistent boolean string handling
 */
export enum BooleanString {
  TRUE = 'true',
  FALSE = 'false'
}

