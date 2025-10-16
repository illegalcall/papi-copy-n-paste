import {
  connectInjectedExtension,
  getInjectedExtensions,
  InjectedExtension,
  InjectedPolkadotAccount,
  PolkadotSigner as PapiPolkadotSigner
} from 'polkadot-api/pjs-signer';
import type { WalletAdapter } from './types';
import type { InjectedAccount } from '@polkadot/extension-inject/types';

export class MultipleWalletsError extends Error {
  constructor(public readonly walletIds: string[]) {
    super(`Multiple wallets detected: ${walletIds.join(', ')}. Please select one.`);
    this.name = 'MultipleWalletsError';
  }
}

export class PapiSignerAdapter implements WalletAdapter {
  name = 'PAPI Signer Adapter';
  private extensions: Map<string, InjectedExtension> = new Map();
  private accounts: InjectedPolkadotAccount[] = [];

  async isAvailable(): Promise<boolean> {
    try {
      const availableExtensions = getInjectedExtensions();
      return availableExtensions.length > 0;
    } catch (error) {
      console.error('Error checking wallet availability:', error);
      return false;
    }
  }

  async connectToWallet(walletId: string): Promise<InjectedAccount[]> {
    try {
      const extension = await connectInjectedExtension(walletId);
      this.extensions.set(walletId, extension);

      const accounts = await new Promise<InjectedPolkadotAccount[]>((resolve) => {
        const unsubscribe = extension.subscribe((accounts) => {
          unsubscribe();
          resolve(accounts.map(account => ({ ...account, extension: walletId })));
        });
      });

      if (accounts.length === 0) {
        throw new Error(`No accounts found in ${walletId}. Please add accounts to your wallet extension.`);
      }

      this.accounts = accounts;
      return accounts.map(account => ({
        address: account.address,
        meta: {
          name: account.name,
          source: walletId,
          genesisHash: account.genesisHash || undefined,
        },
        type: account.type,
      }));
    } catch (error) {
      console.error(`Failed to connect to wallet ${walletId}:`, error);
      throw error;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      const availableExtensions = getInjectedExtensions();

      if (availableExtensions.length === 0) {
        throw new Error('No wallet extensions found. Please install Polkadot.js, Talisman, or SubWallet extension and refresh the page.');
      }

      if (availableExtensions.length === 1 && availableExtensions[0]) {
        return this.connectToWallet(availableExtensions[0]);
      }

      throw new MultipleWalletsError(availableExtensions);
    } catch (error) {
      console.error('Failed to connect to wallet extensions:', error);
      throw error;
    }
  }

  async getSigner(address: string): Promise<PapiPolkadotSigner | null> {
    try {
      const account = this.accounts.find(acc => acc.address === address);
      if (!account) {
        console.error('Account not found:', address);
        return null;
      }

      const signer = account.polkadotSigner;
      if (!signer) {
        console.error('No signer available for account:', address);
        return null;
      }

      return signer;
    } catch (error) {
      console.error('Failed to get signer for address:', address, error);
      return null;
    }
  }

  async getExtension(): Promise<any> {
    return this.extensions.values().next().value || null;
  }
}