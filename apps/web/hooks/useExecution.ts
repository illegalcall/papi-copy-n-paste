/**
 * Hook for managing execution state and console output
 */

import { useState, useCallback } from "react";

export function useExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"setup" | "code" | "console">(
    "setup",
  );
  const [hasSelectedPallet, setHasSelectedPallet] = useState(false);
  const [hasRunCode, setHasRunCode] = useState(false);
  const [leftPaneOpen, setLeftPaneOpen] = useState(false);

  // Handle execution start
  const handleRunClick = useCallback(
    async (executeFunction: () => Promise<void>) => {
      setIsRunning(true);
      setActiveTab("console"); // Switch to console tab when running
      setConsoleOutput([]); // Clear previous output

      // Mark that user has run code (for future navigation behavior)
      if (!hasRunCode) {
        setHasRunCode(true);
      }

      try {
        await executeFunction();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setConsoleOutput((prev) => [
          ...prev,
          `❌ Execution error: ${errorMessage}`,
        ]);
      } finally {
        setIsRunning(false);
      }
    },
    [hasRunCode],
  );

  // Handle abort click
  const handleAbortClick = useCallback(() => {
    setIsRunning(false);
    setConsoleOutput((prev) => [...prev, `⚠️ Execution aborted by user`]);
  }, []);

  // Clear console output
  const handleClearConsole = useCallback(() => {
    setConsoleOutput([]);
  }, []);

  // Add console output
  const addConsoleOutput = useCallback((message: string) => {
    setConsoleOutput((prev) => [...prev, message]);
  }, []);

  // Add multiple console outputs
  const addConsoleOutputs = useCallback((messages: string[]) => {
    setConsoleOutput((prev) => [...prev, ...messages]);
  }, []);

  // Reset execution state (when network changes)
  const resetExecutionState = useCallback(() => {
    setConsoleOutput([]);
    setHasSelectedPallet(false);
    setHasRunCode(false);
    setIsRunning(false);
  }, []);

  return {
    // State
    isRunning,
    consoleOutput,
    activeTab,
    hasSelectedPallet,
    hasRunCode,
    leftPaneOpen,

    // Actions
    handleRunClick,
    handleAbortClick,
    handleClearConsole,
    addConsoleOutput,
    addConsoleOutputs,
    resetExecutionState,

    // Manual setters for compatibility
    setIsRunning,
    setConsoleOutput,
    setActiveTab,
    setHasSelectedPallet,
    setHasRunCode,
    setLeftPaneOpen,
  };
}
