import { getInjectedExtensions } from 'polkadot-api/pjs-signer';

export interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  installed: boolean;
  version?: string;
}

/**
 * Wallet metadata for known Polkadot wallets
 */
const KNOWN_WALLETS: Record<string, { name: string; icon: string; installUrl: string }> = {
  'polkadot-js': {
    name: 'Polkadot.js Extension',
    icon: '🟣',
    installUrl: 'https://polkadot.js.org/extension/'
  },
  'talisman': {
    name: 'Talisman',
    icon: '🔮',
    installUrl: 'https://talisman.xyz/'
  },
  'subwallet-js': {
    name: 'SubWallet',
    icon: '🌊',
    installUrl: 'https://subwallet.app/'
  },
  'enkrypt': {
    name: 'Enkrypt',
    icon: '🔷',
    installUrl: 'https://www.enkrypt.com/'
  },
  'polkagate': {
    name: 'PolkaGate',
    icon: '🚪',
    installUrl: 'https://polkagate.xyz/'
  }
};

/**
 * Detects all installed Polkadot wallet extensions
 */
export class WalletDetector {
  async detectWallets(): Promise<WalletInfo[]> {
    try {
      const installedExtensions = await getInjectedExtensions();

      const installedWallets = installedExtensions.map(id => ({
        id,
        name: this.getWalletName(id),
        icon: this.getWalletIcon(id),
        installed: true,
        version: this.getWalletVersion(id)
      }));

      const notInstalledWallets = Object.keys(KNOWN_WALLETS)
        .filter(id => !installedExtensions.includes(id))
        .map(id => ({
          id,
          name: this.getWalletName(id),
          icon: this.getWalletIcon(id),
          installed: false
        }));

      return [...installedWallets, ...notInstalledWallets];
    } catch (error) {
      console.error('Failed to detect wallets:', error);
      return [];
    }
  }

  private getWalletName(id: string): string {
    return KNOWN_WALLETS[id]?.name || this.formatWalletId(id);
  }

  private formatWalletId(id: string): string {
    return id
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getWalletIcon(id: string): string {
    return KNOWN_WALLETS[id]?.icon || '💼';
  }

  private getWalletVersion(id: string): string | undefined {
    try {
      const injectedWindow = window as any;
      const injectedExtension = injectedWindow?.injectedWeb3?.[id];
      return injectedExtension?.version;
    } catch {
      return undefined;
    }
  }

  async isWalletInstalled(walletId: string): Promise<boolean> {
    try {
      const extensions = await getInjectedExtensions();
      return extensions.includes(walletId);
    } catch {
      return false;
    }
  }

  getInstallUrl(walletId: string): string {
    return KNOWN_WALLETS[walletId]?.installUrl || 'https://polkadot.network/ecosystem/wallets/';
  }
}
