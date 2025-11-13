import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';
import type { Signer as LegacyPolkadotSigner } from '@polkadot/api/types';
import type { WalletAdapter } from './types';

export class PolkadotJsAdapter implements WalletAdapter {
  name = 'Polkadot.js Extension';
  private extension: InjectedExtension | null = null;

  async isAvailable(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && window.injectedWeb3) {
        const injectedWallets = Object.keys(window.injectedWeb3);
        if (injectedWallets.length > 0) {
          const extensions = await web3Enable('PAPI Copy-Paste');
          return extensions.length > 0;
        }
      }

      const extensions = await web3Enable('PAPI Copy-Paste');
      return extensions.length > 0;
    } catch (error) {
      console.warn('Polkadot.js extension not available:', error);
      return false;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      const extensions = await web3Enable('PAPI Copy-Paste');

      if (extensions.length === 0) {
        throw new Error('No Polkadot.js extension found. Please install the extension and refresh the page.');
      }

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