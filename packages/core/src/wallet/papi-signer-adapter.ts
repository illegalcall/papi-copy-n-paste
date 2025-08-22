import {
  connectInjectedExtension,
  getInjectedExtensions,
  InjectedExtension,
  InjectedPolkadotAccount,
  PolkadotSigner as PapiPolkadotSigner
} from 'polkadot-api/pjs-signer';
import type { WalletAdapter } from './types';
import type { InjectedAccount } from '@polkadot/extension-inject/types';

export class PapiSignerAdapter implements WalletAdapter {
  name = 'PAPI Signer Adapter';
  private extensions: Map<string, InjectedExtension> = new Map();
  private accounts: InjectedPolkadotAccount[] = [];

  async isAvailable(): Promise<boolean> {
    try {
      // Get available extensions using PAPI's method
      const availableExtensions = getInjectedExtensions();
      return availableExtensions.length > 0;
    } catch (error) {
      console.warn('PAPI Signer not available:', error);
      return false;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      // Get available extensions
      const availableExtensions = getInjectedExtensions();

      if (availableExtensions.length === 0) {
        throw new Error('No wallet extensions found. Please install Polkadot.js, Talisman, or SubWallet extension and refresh the page.');
      }

      // Connect to all available extensions
      const connectionPromises = availableExtensions.map(async (extensionName) => {
        try {
          const extension = await connectInjectedExtension(extensionName);
          this.extensions.set(extensionName, extension);

          // Get accounts from this extension
          return new Promise<InjectedPolkadotAccount[]>((resolve) => {
            const unsubscribe = extension.subscribe((accounts) => {
              unsubscribe();
              resolve(accounts.map(account => ({ ...account, extension: extensionName })));
            });
          });
        } catch (error) {
          console.warn(`Failed to connect to ${extensionName}:`, error);
          return [];
        }
      });

      // Wait for all connections and collect accounts
      const accountArrays = await Promise.all(connectionPromises);
      const allAccounts = accountArrays.flat();

      if (allAccounts.length === 0) {
        throw new Error('No accounts found. Please add accounts to your wallet extension.');
      }

      // Store accounts and convert to legacy format for compatibility
      this.accounts = allAccounts;
      return allAccounts.map(account => ({
        address: account.address,
        meta: {
          name: account.name,
          source: (account as any).extension || 'unknown',
          genesisHash: account.genesisHash || undefined,
        },
        type: account.type,
      }));
    } catch (error) {
      console.error('Failed to connect to wallet extensions:', error);
      throw error;
    }
  }

  async getSigner(address: string): Promise<PapiPolkadotSigner | null> {
    try {
      // Find the account
      const account = this.accounts.find(acc => acc.address === address);
      if (!account) {
        console.error('Account not found:', address);
        return null;
      }

      // Get the signer from the account directly (PAPI provides this)
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
    // Return the first connected extension
    return this.extensions.values().next().value || null;
  }
}