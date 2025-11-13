import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';
import type { Signer as LegacyPolkadotSigner } from '@polkadot/api/types';
import type { WalletAdapter } from './types';

export class MultiWalletAdapter implements WalletAdapter {
  name = 'Multi-Wallet Adapter';
  private extension: InjectedExtension | null = null;

  async isAvailable(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        const walletChecks = [
          window.injectedWeb3 && Object.keys(window.injectedWeb3).length > 0,
          !!(window as any).talismanEth,
          !!(window as any).SubWallet,
          !!(window as any).polkadotJS,
        ];

        const hasAnyWallet = walletChecks.some(Boolean);

        if (hasAnyWallet) {
          try {
            const extensions = await web3Enable('PAPI Copy-Paste');
            return extensions.length > 0;
          } catch (enableError) {
            return true;
          }
        }
      }

      const extensions = await web3Enable('PAPI Copy-Paste');
      return extensions.length > 0;
    } catch (error) {
      console.warn('Multi-wallet availability check failed:', error);
      return false;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      const extensions = await web3Enable('PAPI Copy-Paste');

      if (extensions.length === 0) {
        if (typeof window !== 'undefined' && window.injectedWeb3) {
          const injectedWallets = Object.keys(window.injectedWeb3);
          if (injectedWallets.length > 0) {
            throw new Error(`Detected wallets (${injectedWallets.join(', ')}) but could not enable them. Please refresh the page and try again.`);
          }
        }
        throw new Error('No wallet extensions found. Please install Polkadot.js, Talisman, or SubWallet extension and refresh the page.');
      }

      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please add accounts to your wallet extension.');
      }

      return accounts;
    } catch (error) {
      console.error('Failed to connect to wallet extension:', error);
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