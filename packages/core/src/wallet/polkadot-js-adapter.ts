import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';
import type { Signer as LegacyPolkadotSigner } from '@polkadot/api/types';
import type { WalletAdapter } from './types';

export class PolkadotJsAdapter implements WalletAdapter {
  name = 'Polkadot.js Extension';
  private extension: InjectedExtension | null = null;

  async isAvailable(): Promise<boolean> {
    try {
      // Check if the extension is available
      console.log('🔍 Checking wallet availability...');

      // First check if injected web3 exists
      if (typeof window !== 'undefined' && window.injectedWeb3) {
        const injectedWallets = Object.keys(window.injectedWeb3);
        console.log('🔍 Found injected wallets:', injectedWallets);

        // If we have any injected wallets, try to enable them
        if (injectedWallets.length > 0) {
          const extensions = await web3Enable('PAPI Copy-Paste');
          console.log('🔍 Enabled extensions:', extensions.length, extensions.map(ext => ext.name));
          return extensions.length > 0;
        }
      }

      // Fallback: try to enable extensions anyway
      const extensions = await web3Enable('PAPI Copy-Paste');
      console.log('🔍 Found extensions (fallback):', extensions.length, extensions.map(ext => ext.name));
      return extensions.length > 0;
    } catch (error) {
      console.warn('Polkadot.js extension not available:', error);
      return false;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      // Enable the extension
      const extensions = await web3Enable('PAPI Copy-Paste');

      if (extensions.length === 0) {
        throw new Error('No Polkadot.js extension found. Please install the extension and refresh the page.');
      }

      // Get accounts
      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please add accounts to your Polkadot.js extension.');
      }

      return accounts;
    } catch (error) {
      console.error('Failed to connect to Polkadot.js extension:', error);
      throw error;
    }
  }

  async getSigner(address: string): Promise<LegacyPolkadotSigner | null> {
    try {
      const injector = await web3FromAddress(address);
      return injector.signer;
    } catch (error) {
      console.error('Failed to get signer for address:', address, error);
      return null;
    }
  }

  async getExtension(): Promise<InjectedExtension | null> {
    if (this.extension) {
      return this.extension;
    }

    try {
      const extensions = await web3Enable('PAPI Copy-Paste');
      this.extension = extensions[0] || null;
      return this.extension;
    } catch (error) {
      console.error('Failed to get extension:', error);
      return null;
    }
  }
}