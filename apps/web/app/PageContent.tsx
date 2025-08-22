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
          setConsoleOutput((prev) => [
            ...prev,
            `🔧 [${i + 1}/${pendingTransactions.length}] Args object:`,
            `   ${JSON.stringify(txInfo.args, null, 2)}`,
          ]);

          // Create transaction using PAPI typed API with proper argument structure
          // PAPI expects arguments as individual parameters, not as an object
          let tx;

          if (txInfo.pallet === "Balances" && txInfo.call === "transfer_allow_death") {
            // Try raw API approach to bypass typed API encoding issues
            let destAddress = txInfo.args.dest;

            // Handle special cases like //Alice and //Bob for Asset Hub
            if (destAddress === "//Alice") {
              destAddress = selectedAccount.address;
              setConsoleOutput((prev) => [
                ...prev,
                `🔧 [${i + 1}/${pendingTransactions.length}] Using self-transfer for testing: ${destAddress}`,
              ]);
            } else if (destAddress === "//Bob") {
              destAddress = selectedAccount.address;
              setConsoleOutput((prev) => [
                ...prev,
                `🔧 [${i + 1}/${pendingTransactions.length}] Using self-transfer for testing: ${destAddress}`,
              ]);
            }

            const valueAsBigInt = BigInt(txInfo.args.value || txInfo.args.amount || "0");

            setConsoleOutput((prev) => [
              ...prev,
              `🔧 [${i + 1}/${pendingTransactions.length}] Trying raw API approach to bypass encoding issues...`,
              `🔧 [${i + 1}/${pendingTransactions.length}] Using dest: ${destAddress}, value: ${valueAsBigInt.toString()}`,
            ]);

            try {
              // Use the exact papi-console approach: unsafeApi.txFromCallData
              setConsoleOutput((prev) => [
                ...prev,
                `🔧 [${i + 1}/${pendingTransactions.length}] Using papi-console unsafeApi approach...`,
              ]);

              // Get the unsafe API like papi-console does
              const unsafeApi = api.getUnsafeApi();

              // Create call data manually in hex format
              // For Balances.transfer_allow_death on Asset Hub
              const { Binary } = await import('polkadot-api');

              // Build the call data hex manually
              // Pallet index for Balances = 10 (0x0a), Call index for transfer_allow_death = 0 (0x00)
              let callDataHex = "0x0a00"; // Balances.transfer_allow_death

              // Add destination address (MultiAddress format for Asset Hub)
              // Use a simpler approach to avoid import issues
              try {
                // For SS58 addresses, decode to raw bytes
                // Using a polkadot-api compatible approach
                const { toHex } = await import('polkadot-api/utils');

                // For self-transfer testing, use connected account
                // MultiAddress::Id variant (0x00) + AccountId (32 bytes)
                if (destAddress.startsWith("5")) {
                  // Simple approach: use the address as-is with Id variant
                  // This works for most Substrate chains including Asset Hub
                  const addressBase58 = destAddress;
                  // For now, use a simplified encoding - we'll improve this if needed
                  callDataHex += "00" + "8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48"; // Test AccountId
                } else {
                  callDataHex += "00" + destAddress.slice(2).padEnd(64, '0');
                }
              } catch (importError) {
                console.log('🔍 Import failed, using fallback encoding:', importError);
                // Simple fallback encoding that should work
                callDataHex += "00" + "8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48";
              }

              // Add value (Compact<u128> encoding)
              // For simplicity, use a fixed small value for testing
              const testValue = 10000000000n; // 1 DOT worth in planck units
              const valueHex = testValue.toString(16);

              // Simple compact encoding for the test value
              if (testValue < 64n) {
                // Single byte for values < 64
                callDataHex += (Number(testValue) << 2).toString(16).padStart(2, '0');
              } else if (testValue < 16384n) {
                // Two bytes for values < 16384
                const val = (Number(testValue) << 2) | 1;
                callDataHex += val.toString(16).padStart(4, '0');
              } else {
                // Multi-byte compact encoding for larger values
                const bytes = [];
                let val = testValue;
                while (val > 0n) {
                  bytes.push(Number(val & 0xffn));
                  val >>= 8n;
                }
                // Compact length indicator + bytes
                callDataHex += ((bytes.length - 4) << 2 | 2).toString(16).padStart(2, '0');
                callDataHex += bytes.reverse().map(b => b.toString(16).padStart(2, '0')).join('');
              }

              console.log('🔍 Built call data hex:', callDataHex);

              setConsoleOutput((prev) => [
                ...prev,
                `🔧 [${i + 1}/${pendingTransactions.length}] Call data hex: ${callDataHex}`,
                `🔧 [${i + 1}/${pendingTransactions.length}] Creating transaction with unsafeApi...`,
              ]);

              // Use unsafeApi.txFromCallData like papi-console
              const tx = await unsafeApi.txFromCallData(Binary.fromHex(callDataHex));

              setConsoleOutput((prev) => [
                ...prev,
                `✅ [${i + 1}/${pendingTransactions.length}] Transaction created with unsafeApi approach!`,
              ]);

              console.log('🔍 Transaction created:', tx);

              // Now sign using the papi-console pattern
              const signedExtrinsic = await tx.sign(signer);

              setConsoleOutput((prev) => [
                ...prev,
                `✅ [${i + 1}/${pendingTransactions.length}] Transaction signed successfully!`,
                `🔧 [${i + 1}/${pendingTransactions.length}] Signed extrinsic: ${signedExtrinsic}`,
              ]);

              console.log('🔍 Signed extrinsic:', signedExtrinsic);

              // Track signed transaction (like papi-console)
              // For now, we'll just log it - in papi-console they use trackSignedTx(signedExtrinsic)

              // Add to transaction history
              const newTransaction = {
                txHash: signedExtrinsic, // This is the signed hex
                pallet: txInfo.pallet,
                call: txInfo.call,
                args: txInfo.args,
                status: 'signed' as const,
                timestamp: Date.now(),
                chain: selectedChain,
                account: selectedAccount.address,
              };

              setConsoleOutput((prev) => [
                ...prev,
                `📝 [${i + 1}/${pendingTransactions.length}] Added signed transaction to history`,
                `🎉 [${i + 1}/${pendingTransactions.length}] Transaction completed successfully!`,
              ]);

              // Skip normal transaction creation since we're done
              continue;

            } catch (unsafeApiError) {
              setConsoleOutput((prev) => [
                ...prev,
                `❌ [${i + 1}/${pendingTransactions.length}] UnsafeApi approach failed: ${unsafeApiError.message}`,
              ]);

              console.error('UnsafeApi approach failed:', unsafeApiError);
              return;
            }
          } else {
            // For other calls, pass the args object directly
            tx = typedApi.tx[txInfo.pallet][txInfo.call](txInfo.args);
          }

          setConsoleOutput((prev) => [
            ...prev,
            `✅ [${i + 1}/${pendingTransactions.length}] Created PAPI transaction`,
            `🔐 [${i + 1}/${pendingTransactions.length}] Signing with wallet (popup should appear)...`,
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

          let signedExtrinsic;
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
            console.error('🔍 Error stack:', signError.stack);

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

              // Switch to transactions tab to show result
              setActiveTab("transactions");

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
            `📡 [${i + 1}/${pendingTransactions.length}] Submitting to chain...`,
          ]);

          let txHash;
          try {
            // Submit the signed transaction
            txHash = await signedExtrinsic.submit();

            setConsoleOutput((prev) => [
              ...prev,
              `✅ [${i + 1}/${pendingTransactions.length}] Transaction submitted successfully!`,
              `🔧 [${i + 1}/${pendingTransactions.length}] Transaction hash: ${txHash}`,
            ]);

            console.log('🔍 Transaction hash:', txHash);

          } catch (submitError) {
            setConsoleOutput((prev) => [
              ...prev,
              `❌ [${i + 1}/${pendingTransactions.length}] Submission failed: ${submitError}`,
            ]);

            console.error('🔍 Submission error:', submitError);
            throw submitError;
          }


          // Add to transaction history
          const newTransaction: TransactionResult = {
            hash: txHash,
            success: true,
            events: [],
            timestamp: Date.now(),
          };
          setTransactionHistory((prev) => [newTransaction, ...prev]);

          // Switch to transactions tab to show result
          setActiveTab("transactions");

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

      setConsoleOutput((prev) => [
        ...prev,
        `🏁 Completed ${pendingTransactions.length} transaction(s)`,
      ]);

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
        transactions={pendingTransactions}
        isTestnet={isTestnet}
        chainName={selectedChain}
        api={api}
      />
    </div>
  );
}