/**
 * Hook for managing code generation state and updates
 */

import { useState, useCallback } from "../utils/reactImports";
import { PalletCall } from "@workspace/core";
import {
  generateCodeSnippet,
  generateStorageQueryCode,
  generateMultiMethodCode,
  generateMultiStorageCode,
  generateConstantCode,
  generateErrorCode,
  generateEventCode,
} from "../utils/codeGenerators";
import {
  generateWalletIntegratedCode,
  generateWalletStorageCode,
} from "../utils/walletCodeGenerators";

export function useCodeGeneration(
  selectedChain: string,
  selectedProvider: string,
  isWalletConnected: boolean = false,
) {
  const [code, setCode] = useState("");
  const [canRun, setCanRun] = useState(false);

  // Generate code for transaction
  const generateTransactionCode = useCallback(
    (
      selectedCall: { pallet: string; call: PalletCall } | undefined,
      formData: Record<string, any>,
    ) => {
      if (!selectedCall) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        console.log('🚀 Code generation path - isWalletConnected:', isWalletConnected);
        const generatedCode = isWalletConnected
          ? generateWalletIntegratedCode(
              selectedChain,
              selectedProvider,
              selectedCall.pallet,
              selectedCall.call,
              formData,
              isWalletConnected,
            )
          : generateCodeSnippet(
              selectedChain,
              selectedProvider,
              selectedCall.pallet,
              selectedCall.call,
              formData,
            );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for storage query
  const generateStorageCode = useCallback(
    (
      selectedStorage: { pallet: string; storage: any } | undefined,
      storageQueryType: string,
      storageParams: Record<string, any>,
    ) => {
      if (!selectedStorage) {
        setCode("");
        return;
      }

      try {
        const generatedCode = isWalletConnected
          ? generateWalletStorageCode(
              selectedChain,
              selectedProvider,
              selectedStorage.pallet,
              selectedStorage.storage,
              storageQueryType,
              storageParams,
              isWalletConnected,
            )
          : generateStorageQueryCode(
              selectedChain,
              selectedProvider,
              selectedStorage.pallet,
              selectedStorage.storage,
              storageQueryType,
              storageParams,
            );
        setCode(generatedCode);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for multiple methods
  const generateMultiMethodCodeSnippet = useCallback(
    (
      methodQueue: Array<{
        pallet: string;
        call: PalletCall;
        formData: Record<string, any>;
        id: string;
      }>,
    ) => {
      if (methodQueue.length === 0) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        const generatedCode = generateMultiMethodCode(
          selectedChain,
          selectedProvider,
          methodQueue,
        );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for multiple storage queries
  const generateMultiStorageCodeSnippet = useCallback(
    (
      storageQueue: Array<{
        pallet: string;
        storage: any;
        queryType: string;
        storageParams: Record<string, any>;
        id: string;
      }>,
    ) => {
      if (storageQueue.length === 0) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        const generatedCode = generateMultiStorageCode(
          selectedChain,
          selectedProvider,
          storageQueue,
        );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for constant
  const generateConstantCodeSnippet = useCallback(
    (
      selectedConstant: { pallet: string; constant: any } | undefined,
    ) => {
      if (!selectedConstant) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        const generatedCode = generateConstantCode(
          selectedChain,
          selectedProvider,
          selectedConstant.pallet,
          selectedConstant.constant,
        );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for error
  const generateErrorCodeSnippet = useCallback(
    (
      selectedError: { pallet: string; error: any } | undefined,
    ) => {
      if (!selectedError) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        const generatedCode = generateErrorCode(
          selectedChain,
          selectedProvider,
          selectedError.pallet,
          selectedError.error,
        );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Generate code for event
  const generateEventCodeSnippet = useCallback(
    (
      selectedEvent: { pallet: string; event: any } | undefined,
    ) => {
      if (!selectedEvent) {
        setCode("");
        setCanRun(false);
        return;
      }

      try {
        const generatedCode = generateEventCode(
          selectedChain,
          selectedProvider,
          selectedEvent.pallet,
          selectedEvent.event,
        );
        setCode(generatedCode);
        setCanRun(true);
      } catch (error) {
        setCode(
          `// Error generating code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
        setCanRun(false);
      }
    },
    [selectedChain, selectedProvider, isWalletConnected],
  );

  // Update generated code when dependencies change
  const updateGeneratedCode = useCallback(
    (
      selectedCall: { pallet: string; call: PalletCall } | undefined,
      selectedStorage: { pallet: string; storage: any } | undefined,
      selectedConstant: { pallet: string; constant: any } | undefined,
      selectedError: { pallet: string; error: any } | undefined,
      selectedEvent: { pallet: string; event: any } | undefined,
      formData: Record<string, any>,
      storageQueryType: string,
      storageParams: Record<string, any>,
      methodQueue: Array<{
        pallet: string;
        call: PalletCall;
        formData: Record<string, any>;
        id: string;
      }>,
      storageQueue: Array<{
        pallet: string;
        storage: any;
        queryType: string;
        storageParams: Record<string, any>;
        id: string;
      }>,
    ) => {
      // Priority: method queue > storage queue > single call > single storage > constant > error > event
      if (methodQueue.length > 0) {
        generateMultiMethodCodeSnippet(methodQueue);
      } else if (storageQueue.length > 0) {
        // Generate code for all storage queries in the queue
        generateMultiStorageCodeSnippet(storageQueue);
      } else if (selectedCall) {
        generateTransactionCode(selectedCall, formData);
      } else if (selectedStorage) {
        generateStorageCode(selectedStorage, storageQueryType, storageParams);
      } else if (selectedConstant) {
        generateConstantCodeSnippet(selectedConstant);
      } else if (selectedError) {
        generateErrorCodeSnippet(selectedError);
      } else if (selectedEvent) {
        generateEventCodeSnippet(selectedEvent);
      } else {
        setCode("");
        setCanRun(false);
      }
    },
    [
      generateTransactionCode,
      generateStorageCode,
      generateMultiMethodCodeSnippet,
      generateMultiStorageCodeSnippet,
      generateConstantCodeSnippet,
      generateErrorCodeSnippet,
      generateEventCodeSnippet,
    ],
  );

  // Generate wallet execution code (only when actually executing with wallet)
  const generateWalletExecutionCode = useCallback(
    (
      selectedCall: { pallet: string; call: PalletCall } | undefined,
      formData: Record<string, any>,
    ) => {
      if (!selectedCall) {
        return;
      }

      try {
        const generatedCode = generateWalletIntegratedCode(
          selectedChain,
          selectedProvider,
          selectedCall.pallet,
          selectedCall.call,
          formData,
          true, // isExecuting = true
        );
        setCode(generatedCode);
      } catch (error) {
        setCode(
          `// Error generating wallet code: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
    [selectedChain, selectedProvider],
  );

  // Clear all code
  const clearCode = useCallback(() => {
    setCode("");
    setCanRun(false);
  }, []);

  return {
    // State
    code,
    canRun,

    // Actions
    generateTransactionCode,
    generateStorageCode,
    generateMultiMethodCodeSnippet,
    generateMultiStorageCodeSnippet,
    generateConstantCodeSnippet,
    generateErrorCodeSnippet,
    generateEventCodeSnippet,
    updateGeneratedCode,
    generateWalletExecutionCode,
    clearCode,

    // Manual setters for compatibility
    setCode,
    setCanRun,
  };
}
