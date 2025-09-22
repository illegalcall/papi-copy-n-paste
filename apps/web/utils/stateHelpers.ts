
export function createStateClearer<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  initialValue: T
) {
  return () => setState(initialValue);
}

/**
 * Generic reset all state function factory for multiple state setters
 */
export function createMultiStateClearer(clearFunctions: Array<() => void>) {
  return () => {
    clearFunctions.forEach(clearFn => clearFn());
  };
}

/**
 * Tab switching helper with state management
 */
export function createTabSwitchHandler(
  setActiveTab: (tab: string) => void,
  targetTab: string = "code"
) {
  return (callback?: () => void) => {
    setActiveTab(targetTab);
    callback?.();
  };
}

/**
 * Enhanced callback wrapper that switches tabs and executes callback
 */
export function withTabSwitch<T extends any[]>(
  originalCallback: (...args: T) => void,
  setActiveTab: (tab: string) => void,
  targetTab: string = "code"
) {
  return (...args: T) => {
    originalCallback(...args);
    setActiveTab(targetTab);
  };
}