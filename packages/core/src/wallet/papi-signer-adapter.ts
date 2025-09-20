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
    const startTime = Date.now();
    try {
      console.log('🔍 PAPI Signer checking availability...');
      console.log('🔍 Environment info:', {
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        location: typeof window !== 'undefined' ? window.location.href : 'server',
        isProduction: process.env.NODE_ENV === 'production',
        isDevelopment: process.env.NODE_ENV === 'development',
        timestamp: new Date().toISOString()
      });
      
      // Get available extensions using PAPI's method
      console.log('🔍 PAPI Signer calling getInjectedExtensions()...');
      const availableExtensions = getInjectedExtensions();
      console.log('🔍 PAPI Signer getInjectedExtensions() result:', {
        type: typeof availableExtensions,
        isArray: Array.isArray(availableExtensions),
        length: availableExtensions.length,
        extensions: availableExtensions,
        stringified: JSON.stringify(availableExtensions)
      });
      
      // Also check window.injectedWeb3 as fallback
      if (typeof window !== 'undefined' && window.injectedWeb3) {
        const injectedWallets = Object.keys(window.injectedWeb3);
        console.log('🔍 PAPI Signer window.injectedWeb3 check:', {
          injectedWeb3: !!window.injectedWeb3,
          injectedWallets,
          hasExtensions: availableExtensions.length > 0,
          injectedWeb3Keys: Object.keys(window.injectedWeb3)
        });
        
        // Log each wallet's details
        injectedWallets.forEach(walletName => {
          const wallet = window.injectedWeb3?.[walletName];
          if (wallet) {
            console.log(`🔍 Wallet ${walletName}:`, {
              hasEnable: typeof wallet.enable === 'function',
              walletType: typeof wallet,
              walletKeys: Object.keys(wallet)
            });
          }
        });
      } else {
        console.log('🔍 PAPI Signer: window.injectedWeb3 not available');
      }
      
      // Check if extensions might be loading asynchronously
      console.log('🔍 PAPI Signer checking for async extension loading...');
      if (typeof window !== 'undefined') {
        // Check if there are any extension-related events or promises
        const extensionChecks = {
          hasPolkadotJS: !!(window as any).polkadotJS,
          hasTalisman: !!(window as any).talismanEth,
          hasSubWallet: !!(window as any).SubWallet,
          hasInjectedWeb3: !!window.injectedWeb3,
          injectedWeb3Keys: window.injectedWeb3 ? Object.keys(window.injectedWeb3) : []
        };
        console.log('🔍 PAPI Signer extension checks:', extensionChecks);
      }
      
      const isAvailable = availableExtensions.length > 0;
      const duration = Date.now() - startTime;
      console.log('🔍 PAPI Signer availability result:', isAvailable, `(took ${duration}ms)`);
      return isAvailable;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.warn('PAPI Signer not available:', error);
      console.log('🔍 PAPI Signer error details:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : 'Unknown',
        duration: `${duration}ms`
      });
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