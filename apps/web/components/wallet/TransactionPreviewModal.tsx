"use client";

import React, { useEffect } from 'react';
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
import { useBalanceFetcher } from "../../hooks/useBalanceFetcher";
import { useFeeEstimator } from "../../hooks/useFeeEstimator";
import { useTransactionConfirmation } from "../../hooks/useTransactionConfirmation";

interface TransactionInfo {
  pallet: string;
  call: string;
  args: Record<string, any>;
  method?: unknown; // The actual method object for fee estimation
}

interface TransactionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onTabSwitch?: (tab: string) => void;
  transactions: TransactionInfo[];
  isTestnet?: boolean;
  chainName: string;
  api?: unknown; // The API instance for fee estimation
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

  const { balance, isLoading: isLoadingBalance, fetchBalance } = useBalanceFetcher();
  const {
    feeEstimates,
    isEstimating: isEstimatingFees,
    estimateFees,
    getTotalFee,
    formatFee
  } = useFeeEstimator();
  const {
    isExecuting,
    userConfirmed,
    setUserConfirmed,
    handleConfirm,
    resetConfirmation
  } = useTransactionConfirmation();

  useEffect(() => {
    if (isOpen && api && selectedAccount) {
      resetConfirmation();
      estimateFees(api, selectedAccount.address, transactions);
      fetchBalance(api, selectedAccount.address, chainName);
    }
  }, [isOpen, api, selectedAccount, transactions, chainName, resetConfirmation, estimateFees, fetchBalance]);

  const totalFee = getTotalFee();

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
            onClick={() => handleConfirm(onConfirm, onTabSwitch, onClose)}
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