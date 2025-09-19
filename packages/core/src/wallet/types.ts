import type { Signer as LegacyPolkadotSigner } from '@polkadot/api/types';
import type { PolkadotSigner as PapiPolkadotSigner } from 'polkadot-api/pjs-signer';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';

export interface Account {
  address: string;
  meta: {
    name?: string;
    source: string;
    genesisHash?: string;
  };
  type?: string;
}

export interface WalletState {
  isAvailable: boolean;        // Extension installed
  isConnected: boolean;        // User connected
  isConnecting: boolean;       // Connection in progress
  accounts: Account[];         // Available accounts
  selectedAccount: Account | null;
  signer: LegacyPolkadotSigner | PapiPolkadotSigner | null;
  error: string | null;
}

export interface WalletActions {
  connect: () => Promise<void>;
  disconnect: () => void;
  selectAccount: (account: Account) => void;
  getSigner: (address: string) => Promise<LegacyPolkadotSigner | PapiPolkadotSigner | null>;
}

export interface WalletAdapter {
  name: string;
  isAvailable: () => Promise<boolean>;
  connect: () => Promise<InjectedAccount[]>;
  getSigner: (address: string) => Promise<LegacyPolkadotSigner | PapiPolkadotSigner | null>;
  getExtension: () => Promise<InjectedExtension | null>;
}

export interface TransactionPreview {
  method: string;
  args: Record<string, any>;
  estimatedFee?: string;
  from: string;
  to?: string;
  value?: string;
  nonce?: number;
}

export interface WalletTransactionResult {
  txHash: string;
  blockHash?: string;
  blockNumber?: number;
  status: 'pending' | 'finalized' | 'failed';
  events?: any[];
  actualFee?: string;
  error?: string;
}