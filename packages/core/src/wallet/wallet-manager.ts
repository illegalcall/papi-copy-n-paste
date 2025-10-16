import type { WalletAdapter, Account, WalletState, TransactionPreview } from './types';
import { PapiSignerAdapter, MultipleWalletsError } from './papi-signer-adapter';

export class WalletManager {
  private adapter: WalletAdapter;
  private state: WalletState = {
    isAvailable: false,
    isConnected: false,
    isConnecting: false,
    accounts: [],
    selectedAccount: null,
    signer: null,
    error: null,
  };

  private listeners: Set<(state: WalletState) => void> = new Set();

  constructor(adapter?: WalletAdapter) {
    this.adapter = adapter || new PapiSignerAdapter();
    this.checkAvailability();
  }

  private async checkAvailability() {
    try {
      const isAvailable = await this.adapter.isAvailable();
      this.updateState({ isAvailable });
    } catch (error) {
      console.error('Wallet availability check failed:', error);
      this.updateState({
        isAvailable: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private updateState(updates: Partial<WalletState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  getState(): WalletState {
    return this.state;
  }

  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async connect(): Promise<void> {
    if (this.state.isConnecting || this.state.isConnected) {
      return;
    }

    this.updateState({ isConnecting: true, error: null });

    try {
      const injectedAccounts = await this.adapter.connect();

      const accounts: Account[] = injectedAccounts.map(account => ({
        address: account.address,
        meta: {
          name: account.name,
          source: (account as any).source || 'polkadot-js',
          genesisHash: account.genesisHash || undefined,
        },
        type: account.type,
      }));

      this.updateState({
        isConnected: true,
        isConnecting: false,
        accounts,
        selectedAccount: accounts[0] || null,
        error: null,
      });

      if (accounts.length > 0 && accounts[0]) {
        await this.selectAccount(accounts[0]);
      }
    } catch (error) {
      // If it's a MultipleWalletsError, re-throw it for the UI to handle
      if (error instanceof MultipleWalletsError) {
        this.updateState({ isConnecting: false });
        throw error;
      }

      this.updateState({
        isConnecting: false,
        isConnected: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      });
      throw error;
    }
  }

  async connectToWallet(walletId: string): Promise<void> {
    if (this.state.isConnecting || this.state.isConnected) {
      return;
    }

    this.updateState({ isConnecting: true, error: null });

    try {
      if (this.adapter instanceof PapiSignerAdapter) {
        const injectedAccounts = await this.adapter.connectToWallet(walletId);

        const accounts: Account[] = injectedAccounts.map(account => ({
          address: account.address,
          meta: {
            name: account.name,
            source: walletId,
            genesisHash: account.genesisHash || undefined,
          },
          type: account.type,
        }));

        this.updateState({
          isConnected: true,
          isConnecting: false,
          accounts,
          selectedAccount: accounts[0] || null,
          error: null,
        });

        if (accounts.length > 0 && accounts[0]) {
          await this.selectAccount(accounts[0]);
        }
      } else {
        throw new Error('Current adapter does not support wallet selection');
      }
    } catch (error) {
      this.updateState({
        isConnecting: false,
        isConnected: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      });
      throw error;
    }
  }

  async selectAccount(account: Account): Promise<void> {
    try {
      const signer = await this.adapter.getSigner(account.address);
      this.updateState({
        selectedAccount: account,
        signer,
        error: null,
      });
    } catch (error) {
      this.updateState({
        error: error instanceof Error ? error.message : 'Failed to select account',
      });
      throw error;
    }
  }

  disconnect(): void {
    this.updateState({
      isConnected: false,
      accounts: [],
      selectedAccount: null,
      signer: null,
      error: null,
    });
  }

  async getSigner(address?: string) {
    const targetAddress = address || this.state.selectedAccount?.address;
    if (!targetAddress) {
      throw new Error('No account selected');
    }

    return this.adapter.getSigner(targetAddress);
  }

  isAccountConnected(address: string): boolean {
    return this.state.accounts.some(account => account.address === address);
  }

  getAccount(address: string): Account | undefined {
    return this.state.accounts.find(account => account.address === address);
  }

  validateTransaction(preview: TransactionPreview): { isValid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    if (!this.isAccountConnected(preview.from)) {
      return { isValid: false, warnings: ['Account not connected'] };
    }

    if (preview.estimatedFee) {
      const feeAmount = parseFloat(preview.estimatedFee);
      if (feeAmount > 1) {
        warnings.push(`High transaction fee: ${preview.estimatedFee}`);
      }
    }

    if (preview.value) {
      const value = parseFloat(preview.value);
      if (value > 100) {
        warnings.push(`Large transfer amount: ${preview.value}`);
      }
    }

    return { isValid: true, warnings };
  }
}