"use client";

import { useState } from 'react';
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Wallet, ChevronDown, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { WalletSelectorModal, type WalletInfo } from "./wallet-selector-modal";
import { WalletDetector, MultipleWalletsError } from "@workspace/core";

export function WalletConnector() {
  const {
    isAvailable,
    isConnected,
    isConnecting,
    accounts,
    selectedAccount,
    error,
    connect,
    connectToWallet,
    disconnect,
    selectAccount,
  } = useWallet();

  const [showError, setShowError] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);

  const handleConnect = async () => {
    try {
      setShowError(false);
      await connect();
    } catch (error) {
      if (error instanceof MultipleWalletsError) {
        const detector = new WalletDetector();
        const wallets = await detector.detectWallets();
        setAvailableWallets(wallets);
        setShowWalletSelector(true);
      } else {
        setShowError(true);
      }
    }
  };

  const handleWalletSelect = async (walletId: string) => {
    await connectToWallet(walletId);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowError(false);
  };

  const formatAddress = (address: string) => {
    if (address.length <= 16) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const walletSelectorModal = (
    <WalletSelectorModal
      open={showWalletSelector}
      onClose={() => setShowWalletSelector(false)}
      onSelectWallet={handleWalletSelect}
      wallets={availableWallets}
    />
  );

  if (!isAvailable) {
    const errorMessage = error || 'Install Polkadot.js extension to connect wallet';
    return (
      <>
        {walletSelectorModal}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" disabled>
                <Wallet className="h-4 w-4 mr-2" />
                No Wallet
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{errorMessage}</p>
              {error && (
                <p className="text-xs text-muted-foreground mt-1">
                  Check browser console for more details
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
  }

  if (isConnecting) {
    return (
      <>
        {walletSelectorModal}
        <Button variant="outline" size="sm" disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Connecting...
        </Button>
      </>
    );
  }

  if (!isConnected) {
    return (
      <>
        {walletSelectorModal}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleConnect}>
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
          {showError && error && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{error}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {walletSelectorModal}
      <div className="flex items-center gap-2">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="min-w-0">
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            <span className="truncate max-w-24">
              {selectedAccount?.meta.name || formatAddress(selectedAccount?.address || '')}
            </span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-64">
          <DropdownMenuLabel>Connected Accounts</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.address}
              onClick={() => selectAccount(account)}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {account.meta.name || 'Unnamed Account'}
                  </span>
                  {selectedAccount?.address === account.address && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {formatAddress(account.address)}
                </span>
              </div>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-destructive">
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{error}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      </div>
    </>
  );
}