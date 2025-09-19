import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';
import type { Signer as LegacyPolkadotSigner } from '@polkadot/api/types';
import type { WalletAdapter } from './types';

export class MultiWalletAdapter implements WalletAdapter {
  name = 'Multi-Wallet Adapter';
  private extension: InjectedExtension | null = null;

  async isAvailable(): Promise<boolean> {
    try {
      console.log('🔍 Multi-wallet checking availability...');

      // Check for any wallet-related globals
      if (typeof window !== 'undefined') {
        const walletChecks = [
          // Check injectedWeb3 (standard for most wallets)
          window.injectedWeb3 && Object.keys(window.injectedWeb3).length > 0,
          // Check for specific wallet globals
          !!(window as any).talismanEth,
          !!(window as any).SubWallet,
          !!(window as any).polkadotJS,
        ];

        const hasAnyWallet = walletChecks.some(Boolean);
        console.log('🔍 Wallet globals check:', {
          injectedWeb3: !!window.injectedWeb3,
          injectedWeb3Keys: window.injectedWeb3 ? Object.keys(window.injectedWeb3) : [],
          talismanEth: !!(window as any).talismanEth,
          subWallet: !!(window as any).SubWallet,
          polkadotJS: !!(window as any).polkadotJS,
          hasAnyWallet
        });

        if (hasAnyWallet) {
          // Try to enable extensions
          try {
            const extensions = await web3Enable('PAPI Copy-Paste');
            console.log('🔍 Enabled extensions after wallet detection:', extensions.length, extensions.map(ext => ext.name));
            return extensions.length > 0;
          } catch (enableError) {
            console.log('🔍 Extension enable failed, but wallets detected:', enableError);
            return true; // Return true if we detected wallets even if enable failed
          }
        }
      }

      // Fallback: try to enable extensions anyway
      const extensions = await web3Enable('PAPI Copy-Paste');
      console.log('🔍 Fallback extension check:', extensions.length, extensions.map(ext => ext.name));
      return extensions.length > 0;
    } catch (error) {
      console.warn('Multi-wallet availability check failed:', error);
      return false;
    }
  }

  async connect(): Promise<InjectedAccount[]> {
    try {
      console.log('🔍 Multi-wallet connecting...');

      // Enable the extension first
      const extensions = await web3Enable('PAPI Copy-Paste');
      console.log('🔍 Enabled extensions for connection:', extensions.length, extensions.map(ext => ext.name));

      if (extensions.length === 0) {
        // Check if we have detected wallets but they're not enabling properly
        if (typeof window !== 'undefined' && window.injectedWeb3) {
          const injectedWallets = Object.keys(window.injectedWeb3);
          if (injectedWallets.length > 0) {
            throw new Error(`Detected wallets (${injectedWallets.join(', ')}) but could not enable them. Please refresh the page and try again.`);
          }
        }
        throw new Error('No wallet extensions found. Please install Polkadot.js, Talisman, or SubWallet extension and refresh the page.');
      }

      // Get accounts
      const accounts = await web3Accounts();
      console.log('🔍 Retrieved accounts:', accounts.length, accounts.map(acc => ({ address: acc.address, name: acc.meta.name })));

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
      console.log('🔍 Getting signer for address:', address);
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