// Wallet infrastructure exports
export * from './types';
export * from './polkadot-js-adapter';
export * from './multi-wallet-adapter';
export * from './papi-signer-adapter';
export * from './wallet-manager';
export * from './wallet-detector';

// Re-export commonly used types for convenience
export type {
  WalletState,
  WalletActions,
  Account,
  TransactionPreview,
  WalletTransactionResult,
} from './types';