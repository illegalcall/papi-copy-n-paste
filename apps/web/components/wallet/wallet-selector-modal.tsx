"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Loader2, ExternalLink, ChevronRight } from "lucide-react";
import type { WalletInfo } from "@workspace/core";

export type { WalletInfo };

interface WalletSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSelectWallet: (walletId: string) => Promise<void>;
  wallets: WalletInfo[];
}

export function WalletSelectorModal({
  open,
  onClose,
  onSelectWallet,
  wallets
}: WalletSelectorModalProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setConnectingWallet(null);
      setError(null);
    }
  }, [open]);

  const handleWalletClick = async (walletId: string) => {
    if (connectingWallet) return; // Prevent double-clicking

    setConnectingWallet(walletId);
    setError(null);

    try {
      await onSelectWallet(walletId);
      onClose();
    } catch (err) {
      console.error('Failed to connect to wallet:', err);

      let errorMessage = 'Failed to connect';
      if (err instanceof Error) {
        if (err.message.includes('authorised') || err.message.includes('authorized')) {
          const walletName = wallets.find(w => w.id === walletId)?.name || 'this wallet';
          errorMessage = `${walletName} blocked the connection. To fix: 1) Open ${walletName} extension → Settings → Connected Sites, 2) Remove localhost:3000 if listed, 3) Try connecting again to see the authorization popup.`;
        } else if (err.message.includes('No accounts')) {
          errorMessage = 'No accounts found. Please create or import accounts in your wallet extension first.';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setConnectingWallet(null);
    }
  };

  const installedWallets = wallets.filter(w => w.installed);
  const notInstalledWallets = wallets.filter(w => !w.installed);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose which wallet you'd like to connect with
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4 max-h-96 overflow-y-auto">
          {/* Installed Wallets */}
          {installedWallets.length > 0 && (
            <>
              <div className="text-sm font-medium text-muted-foreground px-1">
                Installed
              </div>
              {installedWallets.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  onClick={() => handleWalletClick(wallet.id)}
                  isConnecting={connectingWallet === wallet.id}
                  disabled={!!connectingWallet}
                />
              ))}
            </>
          )}

          {/* Not Installed Wallets */}
          {notInstalledWallets.length > 0 && (
            <>
              <div className="text-sm font-medium text-muted-foreground px-1 mt-2">
                Available
              </div>
              {notInstalledWallets.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  onClick={() => {}} // No-op for not installed
                  isConnecting={false}
                  disabled={true}
                  notInstalled
                />
              ))}
            </>
          )}
        </div>

        {error && (
          <div className="space-y-2">
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
            {error.includes('blocked') && installedWallets.length > 1 && (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                💡 Tip: Try connecting with a different wallet instead, or click the same wallet again after updating permissions.
              </div>
            )}
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <p className="text-xs text-muted-foreground text-center">
            Don't have a wallet?{' '}
            <a
              href="https://polkadot.network/ecosystem/wallets/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground inline-flex items-center gap-1"
            >
              Get one here
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface WalletCardProps {
  wallet: WalletInfo;
  onClick: () => void;
  isConnecting: boolean;
  disabled: boolean;
  notInstalled?: boolean;
}

function WalletCard({ wallet, onClick, isConnecting, disabled, notInstalled }: WalletCardProps) {
  return (
    <Card
      className={`p-4 transition-colors ${
        notInstalled
          ? 'opacity-50 cursor-not-allowed'
          : disabled && !isConnecting
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-accent'
      }`}
      onClick={notInstalled ? undefined : onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-2xl">
          {wallet.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{wallet.name}</h3>
          {wallet.version && (
            <p className="text-xs text-muted-foreground">v{wallet.version}</p>
          )}
          {notInstalled && (
            <p className="text-xs text-muted-foreground">Not installed</p>
          )}
        </div>
        <div>
          {isConnecting ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : notInstalled ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={getWalletInstallUrl(wallet.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs"
              >
                Install
              </a>
            </Button>
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </Card>
  );
}

function getWalletInstallUrl(walletId: string): string {
  const urls: Record<string, string> = {
    'polkadot-js': 'https://polkadot.js.org/extension/',
    'talisman': 'https://talisman.xyz/',
    'subwallet-js': 'https://subwallet.app/',
  };
  return urls[walletId] || 'https://polkadot.network/ecosystem/wallets/';
}
