"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { Header } from "@/components/layout/header";
import { LeftPane, LeftPaneRef } from "@/components/layout/left-pane";
import { CenterPane } from "@/components/layout/center-pane";
import { RightPane } from "@/components/layout/right-pane";
import { Sheet, SheetContent } from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Menu } from "lucide-react";
import { Binary } from "polkadot-api";

// Import our refactored hooks
import { useChainConnection } from "../hooks/useChainConnection";
import { useCallSelection } from "../hooks/useCallSelection";
import { useStorageQuery } from "../hooks/useStorageQuery";
import { useConstantSelection } from "../hooks/useConstantSelection";
import { useErrorSelection } from "../hooks/useErrorSelection";
import { useEventSelection } from "../hooks/useEventSelection";
import { useTransactionQueue } from "../hooks/useTransactionQueue";
import { useCodeGeneration } from "../hooks/useCodeGeneration";
import { useExecution } from "../hooks/useExecution";
import { useDebounce } from "../hooks/useDebounce";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import { useWallet } from "../hooks/useWallet";
import { TransactionPreviewModal } from "../components/wallet";

// Import execution helpers
import {
  executeRealTransaction,
  executeMultipleTransactions,
  executeMultipleStorageQueries,
  executeStorageQuery,
  stopWatchValue,
} from "../utils/transactionHelpers";
import { getDescriptorName } from "../utils/chainConfig";

// Types for transaction history
interface TransactionResult {
  hash: string;
  blockHash?: string;
  blockNumber?: string;
  success: boolean;
  error?: string;
  events?: any[];
  fee?: string;
  timestamp: number;
}

export default function PageContent() {
  // Chain connection and metadata
  const {
    selectedChain,
    selectedProvider,
    pallets,
    isLoadingMetadata,
    metadataError,
    chainStatus,
    api,
    handleNetworkChange,
  } = useChainConnection();

  // Wallet connection
  const {
    isConnected: isWalletConnected,
    selectedAccount,
    getSigner,
  } = useWallet();

  // Transaction history and preview modal state
  const [transactionHistory, setTransactionHistory] = useState<TransactionResult[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);

  // Determine if current chain is a testnet
  const isTestnet = selectedChain?.toLowerCase().includes('test') ||
                   selectedChain?.toLowerCase().includes('dev') ||
                   selectedChain === 'rococo' ||
                   selectedChain === 'westend';


  // Call selection and form handling
  const {
    selectedCall,
    formData,
    canRun: canRunCall,
    handleCallSelect,
    handleFormChange,
    handleValidChange,
    clearCallSelection,
    resetCallState,
  } = useCallSelection();

  // Storage query handling
  const {
    selectedStorage,
    storageQueryType,
    storageParams,
    canRunStorage,
    handleStorageSelect,
    handleStorageQueryTypeChange,
    handleStorageParamsChange,
    handleStorageValidationChange,
    clearStorageSelection,
    resetStorageState,
  } = useStorageQuery(selectedChain);

  // Constant selection handling
  const {
    selectedConstant,
    handleConstantSelect,
    clearConstantSelection,
    resetConstantState,
  } = useConstantSelection();

  // Error selection handling
  const {
    selectedError,
    handleErrorSelect,
    clearErrorSelection,
    resetErrorState,
  } = useErrorSelection();

  // Event selection handling
  const {
    selectedEvent,
    handleEventSelect,
    clearEventSelection,
    resetEventState,
  } = useEventSelection();

  // Queue management
  const {
    methodQueue,
    storageQueue,
    addToMethodQueue,
    addToStorageQueue,
    removeFromMethodQueue,
    removeFromStorageQueue,
    clearMethodQueue,
    clearStorageQueue,
    clearAllQueues,
  } = useTransactionQueue();

  // Code generation
  const { code, updateGeneratedCode, clearCode } = useCodeGeneration(
    selectedChain,
    selectedProvider,
    isWalletConnected,
  );

  // Execution state
  const {
    isRunning,
    consoleOutput,
    activeTab,
    leftPaneOpen,
    isWatching,
    currentWatchKey,
    handleRunClick,
    handleWatchClick,
    handleStopWatch,
    handleAbortClick,
    handleClearConsole,
    resetExecutionState,
    setConsoleOutput,
    setLeftPaneOpen,
    setActiveTab,
  } = useExecution();

  // Refs for left pane to enable global search functionality
  const leftPaneRef = useRef<LeftPaneRef>(null);
  const leftPaneMobileRef = useRef<LeftPaneRef>(null);

  // Global search functionality
  const {} = useGlobalSearch({
    onSearchActivate: () => {
      // Only run on client side
      if (typeof window === 'undefined') return;

      // Check if we're on mobile or desktop
      const isMobile = window.innerWidth < 1024; // lg breakpoint

      if (isMobile) {
        // Open left pane if it's closed on mobile
        if (!leftPaneOpen) {
          setLeftPaneOpen(true);
        }
        // Focus the mobile search input after a small delay to ensure sheet is open
        setTimeout(() => {
          leftPaneMobileRef.current?.focusSearch();
        }, 100);
      } else {
        // Focus the desktop search input
        leftPaneRef.current?.focusSearch();
      }
    },
    isEnabled: true
  });

  // Debounce form data to prevent expensive code generation on every keystroke
  const debouncedFormData = useDebounce(formData, 300);
  const debouncedStorageParams = useDebounce(storageParams, 300);

  // Enhanced form change handler that switches to code tab
  const enhancedHandleFormChange = useCallback(
    (formData: Record<string, any>) => {
      handleFormChange(formData);
      // Switch to code tab when user starts typing/changing form values
      setActiveTab("code");
    },
    [handleFormChange, setActiveTab],
  );

  // Enhanced storage params change handler that switches to code tab
  const enhancedHandleStorageParamsChange = useCallback(
    (params: Record<string, any>) => {
      handleStorageParamsChange(params);
      // Switch to code tab when user changes storage parameters
      setActiveTab("code");
    },
    [handleStorageParamsChange, setActiveTab],
  );

  // Update generated code when dependencies change (with debounced form data)
  useEffect(() => {
    updateGeneratedCode(
      selectedCall,
      selectedStorage,
      selectedConstant,
      selectedError,
      selectedEvent,
      debouncedFormData,
      storageQueryType,
      debouncedStorageParams,
      methodQueue,
      storageQueue,
    );
  }, [
    selectedCall,
    selectedStorage,
    selectedConstant,
    selectedError,
    selectedEvent,
    debouncedFormData,
    storageQueryType,
    debouncedStorageParams,
    methodQueue,
    storageQueue,
    updateGeneratedCode,
  ]);


  // Handle network changes - reset all state
  const onNetworkChange = useCallback(
    (chainKey: string, providerId: string) => {
      handleNetworkChange(chainKey, providerId);
      // Reset all dependent state
      resetCallState();
      resetStorageState();
      resetConstantState();
      resetErrorState();
      resetEventState();
      clearAllQueues();
      clearCode();
      resetExecutionState();
    },
    [
      handleNetworkChange,
      resetCallState,
      resetStorageState,
      resetConstantState,
      resetErrorState,
      resetEventState,
      clearAllQueues,
      clearCode,
      resetExecutionState,
    ],
  );


  // Queue management handlers
  const handleAddToQueue = useCallback(() => {
    addToMethodQueue(selectedCall, formData);
    // Clear current selection after adding
    clearCallSelection();
    clearCode();
  }, [selectedCall, formData, addToMethodQueue, clearCallSelection, clearCode]);

  const handleAddStorageToQueue = useCallback(() => {
    addToStorageQueue(selectedStorage, storageQueryType, storageParams);
    // Clear current selection after adding
    clearStorageSelection();
    clearCode();
  }, [
    selectedStorage,
    storageQueryType,
    storageParams,
    addToStorageQueue,
    clearStorageSelection,
    clearCode,
  ]);

  // Create wrapped handlers that clear conflicting selections and switch to code tab
  const wrappedHandleCallSelect = useCallback(
    (pallet: string, call: any) => {
      handleCallSelect(pallet, call);
      clearStorageSelection(); // Clear storage when call is selected
      clearConstantSelection(); // Clear constant when call is selected
      clearErrorSelection(); // Clear error when call is selected
      clearEventSelection(); // Clear event when call is selected
      setActiveTab("code"); // Switch to code tab when pallet/call is selected
    },
    [handleCallSelect, clearStorageSelection, clearConstantSelection, clearErrorSelection, clearEventSelection, setActiveTab],
  );

  const wrappedHandleStorageSelect = useCallback(
    (pallet: string, storage: any) => {
      handleStorageSelect(pallet, storage);
      clearCallSelection(); // Clear call when storage is selected
      clearConstantSelection(); // Clear constant when storage is selected
      clearErrorSelection(); // Clear error when storage is selected
      clearEventSelection(); // Clear event when storage is selected
      setActiveTab("code"); // Switch to code tab when pallet/storage is selected
    },
    [handleStorageSelect, clearCallSelection, clearConstantSelection, clearErrorSelection, clearEventSelection, setActiveTab],
  );

  const wrappedHandleConstantSelect = useCallback(
    (pallet: string, constant: any) => {
      handleConstantSelect(pallet, constant);
      clearCallSelection(); // Clear call when constant is selected
      clearStorageSelection(); // Clear storage when constant is selected
      clearErrorSelection(); // Clear error when constant is selected
      clearEventSelection(); // Clear event when constant is selected
      setActiveTab("code"); // Switch to code tab when pallet/constant is selected
    },
    [handleConstantSelect, clearCallSelection, clearStorageSelection, clearErrorSelection, clearEventSelection, setActiveTab],
  );

  const wrappedHandleErrorSelect = useCallback(
    (pallet: string, error: any) => {
      handleErrorSelect(pallet, error);
      clearCallSelection(); // Clear call when error is selected
      clearStorageSelection(); // Clear storage when error is selected
      clearConstantSelection(); // Clear constant when error is selected
      clearEventSelection(); // Clear event when error is selected
      setActiveTab("code"); // Switch to code tab when pallet/error is selected
    },
    [handleErrorSelect, clearCallSelection, clearStorageSelection, clearConstantSelection, clearEventSelection, setActiveTab],
  );

  const wrappedHandleEventSelect = useCallback(
    (pallet: string, event: any) => {
      handleEventSelect(pallet, event);
      clearCallSelection(); // Clear call when event is selected
      clearStorageSelection(); // Clear storage when event is selected
      clearConstantSelection(); // Clear constant when event is selected
      clearErrorSelection(); // Clear error when event is selected
      setActiveTab("code"); // Switch to code tab when pallet/event is selected
    },
    [handleEventSelect, clearCallSelection, clearStorageSelection, clearConstantSelection, clearErrorSelection, setActiveTab],
  );

  // Prepare transactions for preview
  const prepareTransactionsForPreview = useCallback(() => {
    const transactions: any[] = [];

    if (selectedCall) {
      // Single transaction
      transactions.push({
        pallet: selectedCall.pallet,
        call: selectedCall.call.name,
        args: formData,
      });
    } else if (methodQueue.length > 0) {
      // Multiple transactions
      methodQueue.forEach((queuedCall) => {
        transactions.push({
          pallet: queuedCall.pallet,
          call: queuedCall.call.name,
          args: queuedCall.formData,
        });
      });
    }

    return transactions;
  }, [selectedCall, formData, methodQueue]);

  // Show preview modal for wallet transactions
  const showWalletPreview = useCallback(() => {
    if (!isWalletConnected || !selectedAccount) {
      setConsoleOutput((prev) => [
        ...prev,
        "❌ Wallet not connected or no account selected",
      ]);
      return;
    }

    const transactions = prepareTransactionsForPreview();
    if (transactions.length === 0) {
      setConsoleOutput((prev) => [
        ...prev,
        "❌ No transactions to execute",
      ]);
      return;
    }

    setPendingTransactions(transactions);
    setShowPreviewModal(true);
  }, [isWalletConnected, selectedAccount, prepareTransactionsForPreview, setConsoleOutput]);

  // Execute wallet transactions after preview confirmation
  const executeWalletTransaction = useCallback(async () => {
    if (!api || !isWalletConnected || !selectedAccount || pendingTransactions.length === 0) {
      setConsoleOutput((prev) => [
        ...prev,
        "❌ Missing requirements for wallet execution",
        `   api: ${!!api}`,
        `   isWalletConnected: ${isWalletConnected}`,
        `   selectedAccount: ${!!selectedAccount}`,
        `   pendingTransactions: ${pendingTransactions.length}`,
      ]);
      return;
    }

    try {
      setConsoleOutput((prev) => [
        ...prev,
        `🔐 Starting PAPI wallet execution for account: ${selectedAccount.address}`,
        `🔧 Getting typed API and signer...`,
      ]);

      // Import descriptor helper at runtime
      const { getTypedApiForChain } = await import('@workspace/core/descriptors');

      // Get typed API for the current chain (no switching)
      const typedApi = getTypedApiForChain(api, selectedChain.toLowerCase());
      console.log('🔍 Created typed API for chain:', selectedChain.toLowerCase());

      const signer = await getSigner();
      if (!signer) {
        setConsoleOutput((prev) => [
          ...prev,
          "❌ Failed to get wallet signer",
        ]);
        return;
      }

      setConsoleOutput((prev) => [
        ...prev,
        `✅ Got PAPI typed API and signer`,
        `🔐 Executing ${pendingTransactions.length} transaction(s)...`,
      ]);

      // Execute all pending transactions using PAPI pattern
      for (let i = 0; i < pendingTransactions.length; i++) {
        const txInfo = pendingTransactions[i];

        setConsoleOutput((prev) => [
          ...prev,
          `📝 [${i + 1}/${pendingTransactions.length}] Creating PAPI transaction: ${txInfo.pallet}.${txInfo.call}`,
        ]);

        try {
          // Args prepared for transaction

          // Create transaction using PAPI typed API with proper argument structure
          // PAPI expects arguments as individual parameters, not as an object
          let tx;

          if (txInfo.pallet === "Balances" && txInfo.call === "transfer_allow_death") {
            // Use proper PAPI typed API instead of manual encoding
            let destAddressRaw = txInfo.args.dest;

            // Extract the actual address string from the form object
            let destAddress: string;
            if (typeof destAddressRaw === 'object' && destAddressRaw?.type === 'Id' && destAddressRaw?.value) {
              destAddress = destAddressRaw.value;
            } else if (typeof destAddressRaw === 'string') {
              destAddress = destAddressRaw;
            } else {
              throw new Error(`Invalid destination format: ${JSON.stringify(destAddressRaw)}`);
            }

            console.log('🔍 Original destination from form:', destAddressRaw);
            console.log('🔍 Extracted address string:', destAddress);

            // Handle special cases like //Alice and //Bob for testing
            if (destAddress === "//Alice" || destAddress === "//Bob") {
              destAddress = selectedAccount.address;
              setConsoleOutput((prev) => [
                ...prev,
                `ℹ️ [${i + 1}/${pendingTransactions.length}] Converting test account to real address: ${destAddress}`,
              ]);
            }

            console.log('🔍 Final destination for transaction:', destAddress);

            // Use SS58 address directly - PAPI handles the conversion internally
            console.log('🔍 Using SS58 address directly for PAPI transaction:', destAddress);

            const valueAsBigInt = BigInt(txInfo.args.value || txInfo.args.amount || "0");
            console.log('🔍 Using BigInt value for transaction:', valueAsBigInt.toString());

            setConsoleOutput((prev) => [
              ...prev,
              `🔄 [${i + 1}/${pendingTransactions.length}] Creating PAPI typed transaction...`,
            ]);

            // Use PAPI typed API to create transaction with MultiAddress format
            // The dest parameter expects a MultiAddress Id variant - PAPI handles SS58 conversion
            tx = typedApi.tx.Balances.transfer_allow_death({
              dest: { type: "Id", value: destAddress }, // Use SS58 string directly
              value: valueAsBigInt
            });

            setConsoleOutput((prev) => [
              ...prev,
              `✅ [${i + 1}/${pendingTransactions.length}] PAPI typed transaction created successfully!`,
            ]);

            console.log('🔍 PAPI typed transaction created:', tx);
            console.log('🔍 Destination address:', destAddress);
            console.log('🔍 Transaction value:', valueAsBigInt.toString())
          } else {
            // For other calls, pass the args object directly
            tx = typedApi.tx[txInfo.pallet][txInfo.call](txInfo.args);
          }

          setConsoleOutput((prev) => [
            ...prev,
            `✅ [${i + 1}/${pendingTransactions.length}] Created PAPI transaction`,
            `🔄 [${i + 1}/${pendingTransactions.length}] Signing with wallet (popup should appear)...`,
          ]);

          // Debug signer and transaction before signing
          console.log('🔍 Signer object:', signer);
          console.log('🔍 Signer type:', typeof signer);
          console.log('🔍 Transaction sign method:', tx.sign);
          console.log('🔍 Transaction sign method type:', typeof tx.sign);

          setConsoleOutput((prev) => [
            ...prev,
            `🔧 [${i + 1}/${pendingTransactions.length}] About to call tx.sign(signer)...`,
          ]);

          let signedExtrinsic: any;
          try {
            // Try different signing approaches based on the error
            setConsoleOutput((prev) => [
              ...prev,
              `🔧 [${i + 1}/${pendingTransactions.length}] Attempting PAPI tx.sign(signer)...`,
            ]);

            // Use PAPI wallet signing pattern: tx.sign(signer)
            signedExtrinsic = await tx.sign(signer);

            setConsoleOutput((prev) => [
              ...prev,
              `✅ [${i + 1}/${pendingTransactions.length}] Transaction signed successfully!`,
              `🔧 [${i + 1}/${pendingTransactions.length}] Signed extrinsic type: ${typeof signedExtrinsic}`,
            ]);

            console.log('🔍 Signed extrinsic:', signedExtrinsic);

          } catch (signError) {
            setConsoleOutput((prev) => [
              ...prev,
              `❌ [${i + 1}/${pendingTransactions.length}] PAPI signing failed: ${signError}`,
              `🔧 [${i + 1}/${pendingTransactions.length}] Trying alternative approach with signAndSubmit...`,
            ]);

            console.error('🔍 Full signing error:', signError);
            console.error('🔍 Error stack:', (signError as Error)?.stack);

            try {
              // Try using signAndSubmit directly (this bypasses the problematic signing step)
              setConsoleOutput((prev) => [
                ...prev,
                `🔧 [${i + 1}/${pendingTransactions.length}] Trying tx.signAndSubmit(from, signer)...`,
              ]);

              const txHash = await tx.signAndSubmit(selectedAccount.address, { signer });

              setConsoleOutput((prev) => [
                ...prev,
                `✅ [${i + 1}/${pendingTransactions.length}] Transaction signed and submitted directly!`,
                `🔧 [${i + 1}/${pendingTransactions.length}] Transaction hash: ${txHash}`,
              ]);

              // Add to transaction history
              const newTransaction: TransactionResult = {
                hash: txHash,
                success: true,
                events: [],
                timestamp: Date.now(),
              };
              setTransactionHistory((prev) => [newTransaction, ...prev]);

              // Results are visible in console output

              // Skip the normal submission process since we already submitted
              continue;

            } catch (signAndSubmitError) {
              setConsoleOutput((prev) => [
                ...prev,
                `❌ [${i + 1}/${pendingTransactions.length}] signAndSubmit also failed: ${signAndSubmitError}`,
              ]);

              console.error('🔍 signAndSubmit error:', signAndSubmitError);
              throw signAndSubmitError;
            }
          }

          setConsoleOutput((prev) => [
            ...prev,
            `🔄 [${i + 1}/${pendingTransactions.length}] Submitting to blockchain...`,
          ]);

          try {
            // Submit the signed transaction using PAPI's submitAndWatch
            setConsoleOutput((prev) => [
              ...prev,
              `🌐 [${i + 1}/${pendingTransactions.length}] Submitting signed transaction to blockchain...`,
            ]);

            const submissionResult = await api.submitAndWatch(signedExtrinsic);

            setConsoleOutput((prev) => [
              ...prev,
              `✅ [${i + 1}/${pendingTransactions.length}] Transaction submitted successfully!`,
            ]);

            // Watch for transaction events
            submissionResult.subscribe({
              next: (event: any) => {
                console.log('🔍 Transaction event:', event);
                setConsoleOutput((prev) => [
                  ...prev,
                  `📡 [${i + 1}/${pendingTransactions.length}] ${event.type}: ${event.txHash || 'Processing...'}`,
                ]);

                // Add loading message after broadcast
                if (event.type === 'broadcasted') {
                  setTimeout(() => {
                    setConsoleOutput((prev) => [
                      ...prev,
                      `🔄 [${i + 1}/${pendingTransactions.length}] Waiting for best block state...`,
                    ]);

                    // Add animated dots for best block state waiting
                    let dotCount = 0;
                    const bestBlockInterval = setInterval(() => {
                      setConsoleOutput((prev) => {
                        const lastIndex = prev.length - 1;
                        const lastMessage = prev[lastIndex];
                        if (lastIndex >= 0 && typeof lastMessage === 'string' && lastMessage.includes('Waiting for best block state')) {
                          dotCount = (dotCount + 1) % 4; // Cycle through 0, 1, 2, 3 dots
                          const dots = '.'.repeat(dotCount);
                          const spaces = ' '.repeat(3 - dotCount); // Keep consistent spacing
                          const baseMessage = `🔄 [${i + 1}/${pendingTransactions.length}] Waiting for best block state`;
                          return [...prev.slice(0, -1), `${baseMessage}${dots}${spaces}`];
                        }
                        return prev;
                      });
                    }, 500);

                    // Store interval reference to clear it later
                    (window as any).bestBlockInterval = bestBlockInterval;
                  }, 100); // Small delay to ensure proper order
                }

                // Clear best block animation when we get txBestBlocksState and add finalization loading
                if (event.type === 'txBestBlocksState') {
                  if ((window as any).bestBlockInterval) {
                    clearInterval((window as any).bestBlockInterval);
                    (window as any).bestBlockInterval = null;
                  }

                  // Add loading message after txBestBlocksState
                  setTimeout(() => {
                    setConsoleOutput((prev) => [
                      ...prev,
                      `🔄 [${i + 1}/${pendingTransactions.length}] Waiting for finalization...`,
                    ]);

                    // Add animated dots for finalization waiting
                    let dotCount = 0;
                    const finalizationInterval = setInterval(() => {
                      setConsoleOutput((prev) => {
                        const lastIndex = prev.length - 1;
                        const lastMessage = prev[lastIndex];
                        if (lastIndex >= 0 && typeof lastMessage === 'string' && lastMessage.includes('Waiting for finalization')) {
                          dotCount = (dotCount + 1) % 4; // Cycle through 0, 1, 2, 3 dots
                          const dots = '.'.repeat(dotCount);
                          const spaces = ' '.repeat(3 - dotCount); // Keep consistent spacing
                          const baseMessage = `🔄 [${i + 1}/${pendingTransactions.length}] Waiting for finalization`;
                          return [...prev.slice(0, -1), `${baseMessage}${dots}${spaces}`];
                        }
                        return prev;
                      });
                    }, 500);

                    // Store interval reference to clear it later
                    (window as any).finalizationInterval = finalizationInterval;
                  }, 100); // Small delay to ensure proper order
                }

                if (event.type === 'finalized') {
                  // Clear best block animation if still running
                  if ((window as any).bestBlockInterval) {
                    clearInterval((window as any).bestBlockInterval);
                    (window as any).bestBlockInterval = null;
                  }

                  // Clear finalization animation
                  if ((window as any).finalizationInterval) {
                    clearInterval((window as any).finalizationInterval);
                    (window as any).finalizationInterval = null;
                  }

                  // Create explorer link based on chain
                  const getExplorerLink = (chain: string, txHash: string) => {
                    const cleanHash = txHash.startsWith('0x') ? txHash : `0x${txHash}`;
                    switch (chain.toLowerCase()) {
                      case 'paseo_asset_hub':
                      case 'paseo':
                        return `https://assethub-paseo.subscan.io/extrinsic/${cleanHash}`;
                      case 'polkadot':
                        return `https://polkadot.subscan.io/extrinsic/${cleanHash}`;
                      case 'kusama':
                        return `https://kusama.subscan.io/extrinsic/${cleanHash}`;
                      default:
                        return null;
                    }
                  };

                  const explorerLink = getExplorerLink(selectedChain, event.txHash);

                  setConsoleOutput((prev) => [
                    ...prev,
                    `🎉 [${i + 1}/${pendingTransactions.length}] Transaction finalized! Hash: ${event.txHash}`,
                    explorerLink ? `🔗 [${i + 1}/${pendingTransactions.length}] View on explorer: ${explorerLink}` : '',
                  ].filter(Boolean));

                  // Add to transaction history
                  const newTransaction: TransactionResult = {
                    hash: event.txHash,
                    success: true,
                    events: [],
                    timestamp: Date.now(),
                  };
                  setTransactionHistory((prev) => [newTransaction, ...prev]);
                }
              },
              error: (error: any) => {
                console.error('🔍 Transaction submission error:', error);
                setConsoleOutput((prev) => [
                  ...prev,
                  `❌ [${i + 1}/${pendingTransactions.length}] Transaction submission failed: ${error.message}`,
                ]);
              }
            });

          } catch (submitError) {
            setConsoleOutput((prev) => [
              ...prev,
              `❌ [${i + 1}/${pendingTransactions.length}] Submission failed: ${submitError}`,
            ]);

            console.error('🔍 Submission error:', submitError);
            throw submitError;
          }

          // Wait a moment between transactions
          if (i < pendingTransactions.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

        } catch (txError) {
          const errorMessage = txError instanceof Error ? txError.message : "Unknown error";

          setConsoleOutput((prev) => [
            ...prev,
            `❌ [${i + 1}/${pendingTransactions.length}] Transaction failed: ${errorMessage}`,
          ]);

          // Add failed transaction to history
          const txResult: TransactionResult = {
            hash: `failed-${Date.now()}`,
            success: false,
            error: errorMessage,
            timestamp: Date.now(),
          };

          setTransactionHistory((prev) => [txResult, ...prev]);
        }
      }

      // All transactions processed

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setConsoleOutput((prev) => [
        ...prev,
        `❌ Wallet execution failed: ${errorMessage}`,
      ]);
    } finally {
      setPendingTransactions([]);
    }
  }, [
    api,
    selectedChain,
    isWalletConnected,
    selectedAccount,
    getSigner,
    pendingTransactions,
    setConsoleOutput,
    setActiveTab,
  ]);

  // Clear transaction history
  const clearTransactionHistory = useCallback(() => {
    setTransactionHistory([]);
  }, []);

  // Execution handlers
  const executeCurrentOperation = useCallback(async () => {
    if (!api) return;

    // Check if we have either a single call, storage query, method queue, or storage queue
    if (
      !selectedCall &&
      !selectedStorage &&
      methodQueue.length === 0 &&
      storageQueue.length === 0
    )
      return;

    try {
      if (methodQueue.length > 0) {
        // Execute multiple methods sequentially
        await executeMultipleTransactions(
          methodQueue,
          selectedChain,
          api,
          setConsoleOutput,
        );
      } else if (storageQueue.length > 0) {
        // Execute multiple storage queries sequentially
        await executeMultipleStorageQueries(
          storageQueue,
          selectedChain,
          api,
          setConsoleOutput,
        );
      } else if (selectedCall) {
        // Execute single transaction
        await executeRealTransaction(
          selectedCall,
          formData,
          selectedChain,
          api,
          setConsoleOutput,
          () => {},
        );
      } else if (selectedStorage) {
        // Execute single storage query
        await executeStorageQuery(
          selectedStorage,
          storageQueryType,
          storageParams,
          selectedChain,
          api,
          setConsoleOutput,
          () => {},
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setConsoleOutput((prev) => [
        ...prev,
        `❌ Execution error: ${errorMessage}`,
      ]);
    }
  }, [
    api,
    selectedCall,
    selectedStorage,
    methodQueue,
    storageQueue,
    formData,
    storageQueryType,
    storageParams,
    selectedChain,
    setConsoleOutput,
  ]);

  // Special handling for watch operations
  const executeWatchOperation = useCallback(async () => {
    if (!api || !selectedStorage) return { watchKey: '', isWatching: false };

    try {
      const result = await executeStorageQuery(
        selectedStorage,
        storageQueryType,
        storageParams,
        selectedChain,
        api,
        setConsoleOutput,
        () => {},
      );

      // Ensure we return a proper watch result
      if (result && typeof result === 'object' && 'watchKey' in result) {
        return result;
      }

      // If no result returned, assume watch started successfully
      return { watchKey: `${selectedChain}-${selectedStorage.pallet}-${selectedStorage.storage.name}`, isWatching: true };
    } catch (error) {
      console.error('Watch operation failed:', error);
      return { watchKey: '', isWatching: false };
    }
  }, [selectedStorage, storageQueryType, storageParams, selectedChain, api, setConsoleOutput]);

  // Handle stop watching
  const onStopWatch = useCallback(() => {
    if (currentWatchKey) {
      const logger = {
        success: (msg: string) => setConsoleOutput(prev => [...prev, msg]),
        info: (msg: string) => setConsoleOutput(prev => [...prev, msg])
      };
      const stopped = stopWatchValue(currentWatchKey, logger);
      if (stopped) {
        handleStopWatch();
      }
    }
  }, [currentWatchKey, setConsoleOutput, handleStopWatch]);

  const onRunClick = useCallback(() => {
    // Check if this is a watchValue operation
    if (selectedStorage && storageQueryType === 'watchValue') {
      handleWatchClick(executeWatchOperation);
    } else {
      handleRunClick(executeCurrentOperation);
    }
  }, [selectedStorage, storageQueryType, handleWatchClick, executeWatchOperation, handleRunClick, executeCurrentOperation]);

  // Determine if we can run anything
  const canRunAny =
    canRunCall ||
    canRunStorage ||
    methodQueue.length > 0 ||
    storageQueue.length > 0;

  return (
    <div className="h-screen flex flex-col">
      <Header
        selectedChain={selectedChain}
        selectedProvider={selectedProvider}
        onNetworkChange={onNetworkChange}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftPaneOpen(true)}
            className="fixed top-4 left-4 z-10 bg-background/80 backdrop-blur-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Left pane - always visible on desktop, sheet on mobile */}
        <div className="hidden lg:block lg:w-[25%] lg:flex-shrink-0">
          <LeftPane
            ref={leftPaneRef}
            isOpen={true}
            onClose={() => {}}
            pallets={pallets}
            selectedCall={
              selectedCall
                ? { pallet: selectedCall.pallet, call: selectedCall.call.name }
                : undefined
            }
            selectedStorage={
              selectedStorage
                ? {
                    pallet: selectedStorage.pallet,
                    storage: selectedStorage.storage.name,
                  }
                : undefined
            }
            selectedConstant={
              selectedConstant
                ? {
                    pallet: selectedConstant.pallet,
                    constant: selectedConstant.constant.name,
                  }
                : undefined
            }
            selectedError={
              selectedError
                ? {
                    pallet: selectedError.pallet,
                    error: selectedError.error.name,
                  }
                : undefined
            }
            selectedEvent={
              selectedEvent
                ? {
                    pallet: selectedEvent.pallet,
                    event: selectedEvent.event.name,
                  }
                : undefined
            }
            onCallSelect={wrappedHandleCallSelect}
            onStorageSelect={wrappedHandleStorageSelect}
            onConstantSelect={wrappedHandleConstantSelect}
            onErrorSelect={wrappedHandleErrorSelect}
            onEventSelect={wrappedHandleEventSelect}
            isLoading={isLoadingMetadata}
            error={metadataError}
          />
        </div>

        {/* Mobile sheet for left pane */}
        <Sheet open={leftPaneOpen} onOpenChange={setLeftPaneOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <LeftPane
              ref={leftPaneMobileRef}
              isOpen={leftPaneOpen}
              onClose={() => setLeftPaneOpen(false)}
              pallets={pallets}
              selectedCall={
                selectedCall
                  ? {
                      pallet: selectedCall.pallet,
                      call: selectedCall.call.name,
                    }
                  : undefined
              }
              selectedStorage={
                selectedStorage
                  ? {
                      pallet: selectedStorage.pallet,
                      storage: selectedStorage.storage.name,
                    }
                  : undefined
              }
              selectedConstant={
                selectedConstant
                  ? {
                      pallet: selectedConstant.pallet,
                      constant: selectedConstant.constant.name,
                    }
                  : undefined
              }
              selectedError={
                selectedError
                  ? {
                      pallet: selectedError.pallet,
                      error: selectedError.error.name,
                    }
                  : undefined
              }
              selectedEvent={
                selectedEvent
                  ? {
                      pallet: selectedEvent.pallet,
                      event: selectedEvent.event.name,
                    }
                  : undefined
              }
              onCallSelect={(pallet, call) => {
                wrappedHandleCallSelect(pallet, call);
                setLeftPaneOpen(false);
              }}
              onStorageSelect={(pallet, storage) => {
                wrappedHandleStorageSelect(pallet, storage);
                setLeftPaneOpen(false);
              }}
              onConstantSelect={(pallet, constant) => {
                wrappedHandleConstantSelect(pallet, constant);
                setLeftPaneOpen(false);
              }}
              onErrorSelect={(pallet, error) => {
                wrappedHandleErrorSelect(pallet, error);
                setLeftPaneOpen(false);
              }}
              onEventSelect={(pallet, event) => {
                wrappedHandleEventSelect(pallet, event);
                setLeftPaneOpen(false);
              }}
              isLoading={isLoadingMetadata}
              error={metadataError}
            />
          </SheetContent>
        </Sheet>

        {/* Center pane */}
        <div className="w-full lg:w-[25%] lg:flex-shrink-0 h-full">
          <CenterPane
            chainStatus={chainStatus}
            selectedChain={selectedChain}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            selectedConstant={selectedConstant}
            selectedError={selectedError}
            selectedEvent={selectedEvent}
            onFormChange={enhancedHandleFormChange}
            onValidChange={handleValidChange}
            onStorageQueryTypeChange={handleStorageQueryTypeChange}
            onStorageParamsChange={enhancedHandleStorageParamsChange}
            onStorageValidationChange={handleStorageValidationChange}
            onAddToQueue={handleAddToQueue}
            onAddStorageToQueue={handleAddStorageToQueue}
            onRemoveFromQueue={removeFromMethodQueue}
            onRemoveStorageFromQueue={removeFromStorageQueue}
            onClearQueue={clearMethodQueue}
            onClearStorageQueue={clearStorageQueue}
            canRun={canRunAny}
            canRunStorage={canRunStorage}
            isRunning={isRunning}
            isWatching={isWatching}
            onRunClick={onRunClick}
            onWalletSignAndExecute={showWalletPreview}
            onStopWatch={onStopWatch}
            onAbortClick={handleAbortClick}
            methodQueue={methodQueue}
            storageQueue={storageQueue}
            storageQueryType={storageQueryType}
            storageParams={storageParams}
          />
        </div>

        {/* Right pane */}
        <div className="w-full lg:w-[50%] lg:flex-shrink-0">
          <RightPane
            code={code}
            consoleOutput={consoleOutput}
            activeTab={activeTab}
            onClearConsole={handleClearConsole}
            selectedChain={selectedChain}
            transactionHistory={transactionHistory}
            onClearTransactionHistory={clearTransactionHistory}
          />
        </div>
      </div>

      {/* Transaction Preview Modal */}
      <TransactionPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onConfirm={executeWalletTransaction}
        onTabSwitch={(tab) => setActiveTab(tab as "code" | "setup" | "console")}
        transactions={pendingTransactions}
        isTestnet={isTestnet}
        chainName={selectedChain}
        api={api}
      />
    </div>
  );
}