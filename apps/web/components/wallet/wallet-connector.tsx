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

export function WalletConnector() {
  const {
    isAvailable,
    isConnected,
    isConnecting,
    accounts,
    selectedAccount,
    error,
    connect,
    disconnect,
    selectAccount,
  } = useWallet();

  // Debug logging for wallet state
  console.log('🔍 WalletConnector state:', {
    isAvailable,
    isConnected,
    isConnecting,
    accountsCount: accounts.length,
    selectedAccount: selectedAccount?.address,
    error
  });

  const [showError, setShowError] = useState(false);

  const handleConnect = async () => {
    try {
      setShowError(false);
      console.log('🔍 WalletConnector attempting to connect...');
      await connect();
      console.log('🔍 WalletConnector connection successful');
    } catch (error) {
      console.error('🔍 WalletConnector connection failed:', error);
      setShowError(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowError(false);
  };

  // Format address for display (show first 6 and last 4 characters)
  const formatAddress = (address: string) => {
    if (address.length <= 16) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // If extension is not available, show install prompt
  if (!isAvailable) {
    const errorMessage = error || 'Install Polkadot.js extension to connect wallet';
    return (
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
    );
  }

  // If connecting, show loading state
  if (isConnecting) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Connecting...
      </Button>
    );
  }

  // If not connected, show connect button
  if (!isConnected) {
    return (
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
    );
  }

  // If connected, show account dropdown
  return (
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
  );
}