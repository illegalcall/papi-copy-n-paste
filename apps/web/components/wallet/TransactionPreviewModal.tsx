"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Separator } from "@workspace/ui/components/separator";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Loader2, AlertTriangle, Shield, DollarSign, Clock, CheckCircle, Wallet } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { getDescriptorName } from "../../utils/chainConfig";

interface TransactionInfo {
  pallet: string;
  call: string;
  args: Record<string, any>;
  method?: any; // The actual method object for fee estimation
}

interface TransactionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onTabSwitch?: (tab: string) => void;
  transactions: TransactionInfo[];
  isTestnet?: boolean;
  chainName: string;
  api?: any; // The API instance for fee estimation
}

interface FeeEstimate {
  partialFee: string;
  weight: string;
  class: string;
  error?: string;
}

export function TransactionPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  onTabSwitch,
  transactions,
  isTestnet = false,
  chainName,
  api
}: TransactionPreviewModalProps) {
  const { selectedAccount } = useWallet();
  const [isExecuting, setIsExecuting] = useState(false);
  const [feeEstimates, setFeeEstimates] = useState<FeeEstimate[]>([]);
  const [isEstimatingFees, setIsEstimatingFees] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setUserConfirmed(false);
      setFeeEstimates([]);
      setBalance(null);
      estimateFees();
      fetchBalance();
    }
  }, [isOpen]);

  const fetchBalance = async () => {
    if (!api || !selectedAccount) return;

    setIsLoadingBalance(true);
    try {
      console.log('🔍 Fetching balance using PAPI typed API for:', selectedAccount.address);

      // Import descriptor helper at runtime
      const { getTypedApiForChain } = await import('@workspace/core/descriptors');

      // Get typed API for the current chain (no switching)
      const typedApi = getTypedApiForChain(api, chainName.toLowerCase());
      console.log('🔍 Created typed API for chain:', chainName.toLowerCase());

      // Use PAPI pattern: typedApi.query.System.Account.getValue()
      const accountData = await typedApi.query.System.Account.getValue(selectedAccount.address);
      console.log('🔍 Account data from typed API:', accountData);

      if (!accountData) {
        setBalance("Account not found");
        setIsLoadingBalance(false);
        return;
      }

      // Extract balance using PAPI account structure
      const { data } = accountData;
      const freeBalance = data.free;
      const reserved = data.reserved;
      const total = freeBalance + reserved;

      console.log('🔍 Balance details:', {
        free: freeBalance.toString(),
        reserved: reserved.toString(),
        total: total.toString()
      });

      // Get decimals from chain spec data (papi-console-main approach)
      const chainSpecData = await api.getChainSpecData();
      const properties = chainSpecData.properties;

      let decimals = 10; // Default for Paseo Asset Hub

      if (properties && typeof properties === 'object' && 'tokenDecimals' in properties) {
        decimals = Number(properties.tokenDecimals);
        console.log('🔍 Got decimals from chain spec:', decimals);
      } else {
        console.log('🔍 Using default decimals for Paseo Asset Hub:', decimals);
      }

      const divisor = BigInt(10 ** decimals);

      // Convert to readable format with chain spec decimals
      const balanceFormatted = (Number(freeBalance) / Number(divisor)).toFixed(4);

      console.log('🔍 Chain:', chainName);
      console.log('🔍 Decimals from chain spec:', decimals);
      console.log('🔍 Raw balance:', freeBalance.toString());
      console.log('🔍 Divisor:', divisor.toString());
      console.log('🔍 Formatted balance:', balanceFormatted);
      setBalance(balanceFormatted);

    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance("Error fetching balance");
    }
    setIsLoadingBalance(false);
  };

  const estimateFees = async () => {
    if (!api || !selectedAccount || transactions.length === 0) return;

    setIsEstimatingFees(true);
    const estimates: FeeEstimate[] = [];

    try {
      console.log('🔍 Estimating fees using PAPI typed API...');

      // Import descriptor helper at runtime
      const { getTypedApiForChain } = await import('@workspace/core/descriptors');

      // Get typed API for the current chain (no switching)
      const typedApi = getTypedApiForChain(api, chainName.toLowerCase());

      for (const tx of transactions) {
        try {
          if (tx.method) {
            // Temporarily disable fee estimation to avoid paseo_asset_hub encoding issues
            // const paymentInfo = await tx.method.getEstimatedFees(selectedAccount.address);
            estimates.push({
              partialFee: "0", // Set to 0 temporarily
              weight: "0",
              class: "normal",
              error: "Fee estimation disabled for paseo_asset_hub compatibility"
            });
          } else {
            // Create transaction using PAPI typed API with proper argument structure
            let method;

            if (tx.pallet === "Balances" && tx.call === "transfer_allow_death") {
              // For balance transfers, PAPI expects { dest, value }
              let destAddress = tx.args.dest;

              // Handle special cases like //Alice and //Bob for Asset Hub
              if (destAddress === "//Alice") {
                // For Asset Hub testing, use connected account for self-transfer
                destAddress = selectedAccount.address;
              } else if (destAddress === "//Bob") {
                // For Asset Hub testing, also use connected account
                destAddress = selectedAccount.address;
              }

              const valueAsBigInt = BigInt(tx.args.value || tx.args.amount || "0");

              // Use papi-console approach for fee estimation too
              const callData = typedApi.tx.Balances.transfer_allow_death({
                dest: destAddress,
                value: valueAsBigInt
              });

              // Use getEstimatedFees method instead of creating full transaction
              method = callData;
            } else {
              // For other calls, pass the args object directly
              method = typedApi.tx[tx.pallet][tx.call](tx.args);
            }

            // Temporarily disable fee estimation to avoid paseo_asset_hub encoding issues
            // const paymentInfo = await method.getEstimatedFees(selectedAccount.address);
            estimates.push({
              partialFee: "0", // Set to 0 temporarily
              weight: "0",
              class: "normal",
              error: "Fee estimation disabled for paseo_asset_hub compatibility"
            });
          }
        } catch (error) {
          console.warn(`Fee estimation failed for ${tx.pallet}.${tx.call}:`, error);
          estimates.push({
            partialFee: "0",
            weight: "0",
            class: "unknown",
            error: error instanceof Error ? error.message : "Fee estimation failed"
          });
        }
      }
    } catch (error) {
      console.error('Fee estimation error:', error);
    }

    setFeeEstimates(estimates);
    setIsEstimatingFees(false);
  };

  const handleConfirm = async () => {
    if (!userConfirmed) return;

    setIsExecuting(true);

    // Switch to console tab immediately when transaction starts
    if (onTabSwitch) {
      onTabSwitch("console");
    }

    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Transaction execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const totalFee = feeEstimates.reduce((sum, estimate) => {
    return sum + (estimate.error ? 0 : parseInt(estimate.partialFee) || 0);
  }, 0);

  const formatFee = (fee: string) => {
    const num = parseInt(fee);
    if (num === 0) return "0";
    // Convert from planck to decimal (assuming 12 decimal places for most chains)
    return (num / Math.pow(10, 12)).toFixed(6);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Transaction Preview
          </DialogTitle>
          <DialogDescription>
            Review transaction details before signing and executing
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            {/* Network Warning for Mainnet */}
            {!isTestnet && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Mainnet Transaction:</strong> You are about to execute a real transaction on {chainName}.
                  This will consume real tokens and cannot be reversed.
                </AlertDescription>
              </Alert>
            )}

            {/* Testnet Information */}
            {isTestnet && (
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Testnet Transaction:</strong> You are executing on {chainName} testnet.
                  Tokens used are for testing purposes only.
                </AlertDescription>
              </Alert>
            )}

            {/* Account Information */}
            {selectedAccount && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Signing Account
                </h4>
                <div className="text-sm space-y-1">
                  <div><strong>Name:</strong> {selectedAccount.meta.name || 'Unnamed Account'}</div>
                  <div><strong>Address:</strong> {selectedAccount.address}</div>
                  <div className="flex items-center gap-2">
                    <strong>Balance:</strong>
                    {isLoadingBalance ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : balance ? (
                      <span className="font-mono">{balance} {chainName.toUpperCase()}</span>
                    ) : (
                      <span className="text-muted-foreground">Loading...</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Transaction{transactions.length > 1 ? 's' : ''} ({transactions.length})
              </h4>

              {transactions.map((tx, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{tx.pallet}.{tx.call}</span>
                    </div>
                    {isEstimatingFees ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : feeEstimates[index] ? (
                      <div className="text-sm text-muted-foreground">
                        {feeEstimates[index].error ? (
                          <span className="text-red-600">Fee estimation failed</span>
                        ) : (
                          <span>Fee: {formatFee(feeEstimates[index].partialFee)} tokens</span>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-sm space-y-1">
                    <div><strong>Arguments:</strong></div>
                    <div className="bg-muted/30 p-2 rounded text-xs font-mono">
                      {Object.entries(tx.args).length > 0 ? (
                        Object.entries(tx.args).map(([key, value], argIndex) => (
                          <div key={argIndex}>
                            <span className="text-blue-600">{key}:</span> {JSON.stringify(value)}
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground">No arguments</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fee Summary */}
            {!isEstimatingFees && feeEstimates.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  Fee Summary
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Total Estimated Fee:</span>
                    <span className="font-mono">{formatFee(totalFee.toString())} tokens</span>
                  </div>
                  {feeEstimates.some(f => f.error) && (
                    <div className="text-amber-600 text-xs">
                      * Some fees could not be estimated
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Confirmation Checkbox */}
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <input
                type="checkbox"
                id="confirm-transaction"
                checked={userConfirmed}
                onChange={(e) => setUserConfirmed(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="confirm-transaction" className="text-sm cursor-pointer">
                I understand that this transaction will be signed with my wallet and executed on the blockchain.
                {!isTestnet && " This will consume real tokens and cannot be reversed."}
              </label>
            </div>
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExecuting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!userConfirmed || isExecuting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isExecuting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              'Sign & Execute'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}