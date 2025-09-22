/**
 * API and blockchain interaction types
 * Strongly typed interfaces for PAPI operations
 */

import { ChainKey, StorageQueryType, TransactionStatus, ConnectionStatus, ParameterType, ComplexityLevel } from './enums';

/**
 * Chain configuration interface
 * Defines the structure for blockchain network configuration
 */
export interface ChainConfig {
  readonly chainKey: ChainKey;
  readonly wsUrl: string;
  readonly name: string;
  readonly description?: string;
  readonly environment?: 'mainnet' | 'testnet' | 'local';
  readonly explorerUrl?: string;
  readonly tokenSymbol?: string;
  readonly tokenDecimals?: number;
}

/**
 * Storage parameter information
 * Structured data for storage query parameters
 */
export interface StorageParameter {
  readonly name: string;
  readonly type: ParameterType | string;
  readonly required: boolean;
  readonly description?: string;
  readonly defaultValue?: unknown;
  readonly validator?: (value: unknown) => boolean;
}

/**
 * Storage query configuration
 * Complete specification for storage operations
 */
export interface StorageQueryConfig {
  readonly pallet: string;
  readonly storage: string;
  readonly queryType: StorageQueryType;
  readonly parameters: readonly StorageParameter[];
  readonly description?: string;
  readonly complexity: ComplexityLevel;
}

/**
 * Transaction parameter information
 * Structured data for transaction call parameters
 */
export interface TransactionParameter {
  readonly name: string;
  readonly type: ParameterType | string;
  readonly required: boolean;
  readonly description?: string;
  readonly defaultValue?: unknown;
  readonly enumVariants?: readonly string[];
  readonly validator?: (value: unknown) => boolean;
}

/**
 * Transaction call configuration
 * Complete specification for transaction operations
 */
export interface TransactionCallConfig {
  readonly pallet: string;
  readonly call: string;
  readonly parameters: readonly TransactionParameter[];
  readonly description?: string;
  readonly complexity: ComplexityLevel;
  readonly estimatedFee?: string;
  readonly warningMessage?: string;
}

/**
 * Connection state information
 * Runtime state for blockchain connections
 */
export interface ConnectionState {
  readonly status: ConnectionStatus;
  readonly chainKey: ChainKey | null;
  readonly blockNumber?: number;
  readonly lastUpdated: Date;
  readonly error?: Error;
  readonly latency?: number;
}

/**
 * Transaction execution result
 * Standardized result format for all transactions
 */
export interface ApiTransactionResult {
  readonly status: TransactionStatus;
  readonly hash?: string;
  readonly blockNumber?: number;
  readonly blockHash?: string;
  readonly error?: string;
  readonly timestamp: Date;
  readonly gasUsed?: string;
  readonly fee?: string;
}

/**
 * Storage query result
 * Standardized result format for storage queries
 */
export interface StorageQueryResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: Date;
  readonly queryType: StorageQueryType;
  readonly pallet: string;
  readonly storage: string;
}

/**
 * Pallet metadata information
 * Structured metadata for blockchain pallets
 */
export interface PalletMetadata {
  readonly name: string;
  readonly calls: readonly string[];
  readonly storage: readonly string[];
  readonly events: readonly string[];
  readonly errors: readonly string[];
  readonly constants: readonly string[];
  readonly description?: string;
  readonly version?: string;
}

/**
 * Watch subscription information
 * State tracking for active storage watches
 */
export interface WatchSubscription {
  readonly watchKey: string;
  readonly pallet: string;
  readonly storage: string;
  readonly parameters: Record<string, unknown>;
  readonly startTime: Date;
  readonly updateCount: number;
  readonly isActive: boolean;
}

/**
 * Account information interface
 * Standardized account data structure
 */
export interface AccountInfo {
  readonly address: string;
  readonly name?: string;
  readonly source?: 'extension' | 'local' | 'imported';
  readonly balance?: {
    readonly free: string;
    readonly reserved: string;
    readonly frozen: string;
  };
  readonly nonce?: number;
}

/**
 * API client interface
 * Standardized interface for blockchain API clients
 */
export interface ApiClient {
  readonly isConnected: boolean;
  readonly chainKey: ChainKey;

  // Connection management
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getConnectionState(): ConnectionState;

  // Query operations
  getStorageValue<T = unknown>(config: StorageQueryConfig, parameters?: Record<string, unknown>): Promise<StorageQueryResult<T>>;
  watchStorageValue<T = unknown>(config: StorageQueryConfig, callback: (result: StorageQueryResult<T>) => void, parameters?: Record<string, unknown>): Promise<WatchSubscription>;

  // Transaction operations
  executeTransaction(config: TransactionCallConfig, parameters: Record<string, unknown>, signer: AccountInfo): Promise<ApiTransactionResult>;

  // Metadata operations
  getPalletMetadata(palletName: string): Promise<PalletMetadata>;
  getChainMetadata(): Promise<readonly PalletMetadata[]>;
}

/**
 * Type guards for runtime type checking
 */
export namespace TypeGuards {
  export function isChainKey(value: string): value is ChainKey {
    return Object.values(ChainKey).includes(value as ChainKey);
  }

  export function isStorageQueryType(value: string): value is StorageQueryType {
    return Object.values(StorageQueryType).includes(value as StorageQueryType);
  }

  export function isTransactionStatus(value: string): value is TransactionStatus {
    return Object.values(TransactionStatus).includes(value as TransactionStatus);
  }

  export function isConnectionStatus(value: string): value is ConnectionStatus {
    return Object.values(ConnectionStatus).includes(value as ConnectionStatus);
  }
}