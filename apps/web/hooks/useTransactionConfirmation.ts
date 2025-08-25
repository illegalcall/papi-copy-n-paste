/**
 * Custom hook for managing transaction confirmation workflow
 */

import { useState, useCallback, useEffect } from 'react';

interface TransactionConfirmationState {
  isExecuting: boolean;
  userConfirmed: boolean;
  isModalOpen: boolean;
}

interface UseTransactionConfirmationReturn extends TransactionConfirmationState {
  setModalOpen: (open: boolean) => void;
  setUserConfirmed: (confirmed: boolean) => void;
  handleConfirm: (
    onConfirm: () => Promise<void>,
    onTabSwitch?: (tab: string) => void,
    onClose?: () => void
  ) => Promise<void>;
  resetConfirmation: () => void;
}

export function useTransactionConfirmation(): UseTransactionConfirmationReturn {
  const [state, setState] = useState<TransactionConfirmationState>({
    isExecuting: false,
    userConfirmed: false,
    isModalOpen: false,
  });

  const setModalOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, isModalOpen: open }));
  }, []);

  const setUserConfirmed = useCallback((confirmed: boolean) => {
    setState(prev => ({ ...prev, userConfirmed: confirmed }));
  }, []);

  const resetConfirmation = useCallback(() => {
    setState(prev => ({
      ...prev,
      userConfirmed: false,
      isExecuting: false,
    }));
  }, []);

  const handleConfirm = useCallback(async (
    onConfirm: () => Promise<void>,
    onTabSwitch?: (tab: string) => void,
    onClose?: () => void
  ) => {
    if (!state.userConfirmed) return;

    setState(prev => ({ ...prev, isExecuting: true }));

    // Switch to console tab immediately when transaction starts
    if (onTabSwitch) {
      onTabSwitch("console");
    }

    try {
      await onConfirm();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Transaction execution failed:', error);
    } finally {
      setState(prev => ({ ...prev, isExecuting: false }));
    }
  }, [state.userConfirmed]);

  // Reset state when modal opens
  useEffect(() => {
    if (state.isModalOpen) {
      resetConfirmation();
    }
  }, [state.isModalOpen, resetConfirmation]);

  return {
    ...state,
    setModalOpen,
    setUserConfirmed,
    handleConfirm,
    resetConfirmation,
  };
}