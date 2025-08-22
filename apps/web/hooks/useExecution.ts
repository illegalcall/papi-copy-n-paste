/**
 * Hook for managing execution state and console output
 */

import { useState, useCallback } from "../utils/reactImports";
import { QueryResult, ArrayResult } from "../utils/cleanLogger";

export type ConsoleItem = string | QueryResult | ArrayResult;

export function useExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<ConsoleItem[]>([]);
  const [activeTab, setActiveTab] = useState<"setup" | "code" | "console">(
    "setup",
  );
  const [hasRunCode, setHasRunCode] = useState(false);
  const [leftPaneOpen, setLeftPaneOpen] = useState(false);

  // Watch state management
  const [isWatching, setIsWatching] = useState(false);
  const [currentWatchKey, setCurrentWatchKey] = useState<string>('');

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

  // Add console output (string or result)
  const addConsoleOutput = useCallback((item: ConsoleItem) => {
    setConsoleOutput((prev) => [...prev, item]);
  }, []);

  // Add multiple console outputs
  const addConsoleOutputs = useCallback((items: ConsoleItem[]) => {
    setConsoleOutput((prev) => [...prev, ...items]);
  }, []);

  // Add result display
  const addResultDisplay = useCallback((result: QueryResult) => {
    setConsoleOutput((prev) => [...prev, result]);
  }, []);

  // Handle watch execution - returns watch state for UI
  const handleWatchClick = useCallback(
    async (executeFunction: () => Promise<any>) => {
      setIsRunning(true);
      setActiveTab("console"); // Switch to console tab when watching

      // Mark that user has run code (for future navigation behavior)
      if (!hasRunCode) {
        setHasRunCode(true);
      }

      try {
        const result = await executeFunction();
        if (result && result.isWatching) {
          setIsWatching(true);
          setCurrentWatchKey(result.watchKey);
        }
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setConsoleOutput((prev) => [
          ...prev,
          `❌ Watch error: ${errorMessage}`,
        ]);
        return { watchKey: '', isWatching: false };
      } finally {
        setIsRunning(false);
      }
    },
    [hasRunCode],
  );

  // Handle stop watching
  const handleStopWatch = useCallback(() => {
    setIsWatching(false);
    setCurrentWatchKey('');
  }, []);

  // Reset execution state (when network changes)
  const resetExecutionState = useCallback(() => {
    setConsoleOutput([]);
    setHasRunCode(false);
    setIsRunning(false);
    setIsWatching(false);
    setCurrentWatchKey('');
  }, []);

  return {
    // State
    isRunning,
    consoleOutput,
    activeTab,
    hasRunCode,
    leftPaneOpen,
    isWatching,
    currentWatchKey,

    // Actions
    handleRunClick,
    handleWatchClick,
    handleStopWatch,
    handleAbortClick,
    handleClearConsole,
    addConsoleOutput,
    addConsoleOutputs,
    addResultDisplay,
    resetExecutionState,

    // Manual setters for compatibility
    setIsRunning,
    setConsoleOutput,
    setActiveTab,
    setHasRunCode,
    setLeftPaneOpen,
  };
}
