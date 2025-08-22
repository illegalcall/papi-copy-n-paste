import type { WalletAdapter, Account, WalletState, TransactionPreview } from './types';
import { PapiSignerAdapter } from './papi-signer-adapter';

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
      console.error('WalletManager availability check failed:', error);
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

      // Get signer for the first account
      if (accounts.length > 0 && accounts[0]) {
        await this.selectAccount(accounts[0]);
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

  // Utility method to check if a specific account is connected
  isAccountConnected(address: string): boolean {
    return this.state.accounts.some(account => account.address === address);
  }

  // Get account by address
  getAccount(address: string): Account | undefined {
    return this.state.accounts.find(account => account.address === address);
  }

  // Validate transaction before signing
  validateTransaction(preview: TransactionPreview): { isValid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check if account is connected
    if (!this.isAccountConnected(preview.from)) {
      return { isValid: false, warnings: ['Account not connected'] };
    }

    // Add fee warning for large transactions
    if (preview.estimatedFee) {
      const feeAmount = parseFloat(preview.estimatedFee);
      if (feeAmount > 1) { // More than 1 token in fees
        warnings.push(`High transaction fee: ${preview.estimatedFee}`);
      }
    }

    // Add warning for large transfers
    if (preview.value) {
      const value = parseFloat(preview.value);
      if (value > 100) { // More than 100 tokens
        warnings.push(`Large transfer amount: ${preview.value}`);
      }
    }

    return { isValid: true, warnings };
  }
}