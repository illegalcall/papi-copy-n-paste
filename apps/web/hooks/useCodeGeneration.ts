/**
 * Hook for managing code generation state and updates
 */

import { useState, useCallback } from "react";
import { PalletCall } from "@workspace/core";
import {
  generateCodeSnippet,
  generateStorageQueryCode,
  generateMultiMethodCode,
  generateMultiStorageCode,
} from "../utils/codeGenerators";

export function useCodeGeneration(
  selectedChain: string,
  selectedProvider: string,
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
        const generatedCode = generateCodeSnippet(
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
    [selectedChain, selectedProvider],
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
        const generatedCode = generateStorageQueryCode(
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
    [selectedChain, selectedProvider],
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
    [selectedChain, selectedProvider],
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
    [selectedChain, selectedProvider],
  );

  // Update generated code when dependencies change
  const updateGeneratedCode = useCallback(
    (
      selectedCall: { pallet: string; call: PalletCall } | undefined,
      selectedStorage: { pallet: string; storage: any } | undefined,
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
      // Priority: method queue > storage queue > single call > single storage
      if (methodQueue.length > 0) {
        generateMultiMethodCodeSnippet(methodQueue);
      } else if (storageQueue.length > 0) {
        // Generate code for all storage queries in the queue
        generateMultiStorageCodeSnippet(storageQueue);
      } else if (selectedCall) {
        generateTransactionCode(selectedCall, formData);
      } else if (selectedStorage) {
        generateStorageCode(selectedStorage, storageQueryType, storageParams);
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
    ],
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
    updateGeneratedCode,
    clearCode,

    // Manual setters for compatibility
    setCode,
    setCanRun,
  };
}
