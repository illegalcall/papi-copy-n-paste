/**
 * LocalStorage utilities for persisting chain and network preferences
 */

interface ChainPreferences {
  selectedChain: string;
  selectedProvider: string;
}

const STORAGE_KEYS = {
  CHAIN_PREFERENCES: 'papi-copy-paste-chain-preferences',
} as const;

/**
 * Save chain and provider selection to localStorage
 */
export function saveChainPreferences(chainKey: string, providerId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const preferences: ChainPreferences = {
      selectedChain: chainKey,
      selectedProvider: providerId,
    };

    localStorage.setItem(
      STORAGE_KEYS.CHAIN_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.warn('Failed to save chain preferences to localStorage:', error);
  }
}

/**
 * Load chain and provider selection from localStorage
 * Returns null if no preferences are saved or if there's an error
 */
export function loadChainPreferences(): ChainPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAIN_PREFERENCES);
    if (!saved) return null;

    const preferences = JSON.parse(saved) as ChainPreferences;

    // Validate that the loaded data has the required fields
    if (
      typeof preferences.selectedChain === 'string' &&
      typeof preferences.selectedProvider === 'string' &&
      preferences.selectedChain.length > 0 &&
      preferences.selectedProvider.length > 0
    ) {
      return preferences;
    }

    return null;
  } catch (error) {
    console.warn('Failed to load chain preferences from localStorage:', error);
    return null;
  }
}

/**
 * Clear saved chain preferences
 */
export function clearChainPreferences(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEYS.CHAIN_PREFERENCES);
  } catch (error) {
    console.warn('Failed to clear chain preferences from localStorage:', error);
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = 'localStorage-test';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}