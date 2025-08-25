/**
 * Container component for transaction-related logic and state management
 * Separates transaction business logic from presentation
 */

import React, { useState, useCallback, memo } from 'react';
import { TransactionPreviewModal } from '../wallet';

// Types for transaction state
interface TransactionResult {
  hash: string;
  blockHash?: string;
  blockNumber?: string;
  success: boolean;
  error?: string;
  events?: Record<string, unknown>[];
  fee?: string;
  timestamp: number;
}

interface PendingTransaction {
  pallet: string;
  call: string;
  args: Record<string, unknown>;
  method?: unknown;
}

interface TransactionContainerProps {
  children: (props: TransactionContainerAPI) => React.ReactNode;
  selectedChain?: string;
  api?: unknown;
}

interface TransactionContainerAPI {
  transactionHistory: TransactionResult[];
  showPreviewModal: boolean;
  pendingTransactions: PendingTransaction[];
  isTestnet: boolean;
  addTransactionResult: (result: TransactionResult) => void;
  showTransactionPreview: (transactions: PendingTransaction[]) => void;
  hideTransactionPreview: () => void;
  clearTransactionHistory: () => void;
}

export const TransactionContainer = memo(({
  children,
  selectedChain,
  api,
}: TransactionContainerProps) => {
  // Transaction state
  const [transactionHistory, setTransactionHistory] = useState<TransactionResult[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);

  // Determine if current chain is a testnet
  const isTestnet = selectedChain?.toLowerCase().includes('test') ||
                   selectedChain?.toLowerCase().includes('dev') ||
                   selectedChain === 'rococo' ||
                   selectedChain === 'westend';

  // Transaction management functions
  const addTransactionResult = useCallback((result: TransactionResult) => {
    setTransactionHistory(prev => [result, ...prev].slice(0, 100)); // Keep last 100
  }, []);

  const showTransactionPreview = useCallback((transactions: PendingTransaction[]) => {
    setPendingTransactions(transactions);
    setShowPreviewModal(true);
  }, []);

  const hideTransactionPreview = useCallback(() => {
    setShowPreviewModal(false);
    setPendingTransactions([]);
  }, []);

  const clearTransactionHistory = useCallback(() => {
    setTransactionHistory([]);
  }, []);

  const api_props: TransactionContainerAPI = {
    transactionHistory,
    showPreviewModal,
    pendingTransactions,
    isTestnet,
    addTransactionResult,
    showTransactionPreview,
    hideTransactionPreview,
    clearTransactionHistory,
  };

  return (
    <>
      {children(api_props)}

      {/* Transaction Preview Modal */}
      <TransactionPreviewModal
        isOpen={showPreviewModal}
        onClose={hideTransactionPreview}
        onConfirm={async () => {
          // This will be handled by the parent component
          console.log('Transaction confirmed');
        }}
        transactions={pendingTransactions}
        isTestnet={isTestnet}
        chainName={selectedChain || 'Unknown'}
        api={api}
      />
    </>
  );
});

TransactionContainer.displayName = 'TransactionContainer';