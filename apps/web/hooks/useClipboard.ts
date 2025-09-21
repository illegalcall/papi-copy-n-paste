/**
 * Custom hook for clipboard operations with toast feedback
 */

import { useState, useCallback } from 'react';

interface UseClipboardReturn {
  copiedText: string | null;
  isLoading: boolean;
  error: string | null;
  copyToClipboard: (text: string, successMessage?: string) => Promise<boolean>;
  clearCopied: () => void;
}

export function useClipboard(): UseClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (
    text: string,
    successMessage: string = 'Copied to clipboard!'
  ): Promise<boolean> => {
    if (!text) {
      setError('No text to copy');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      // Optional: You could integrate with a toast system here
      // For now, just log success
      console.info(successMessage);

      // Clear the copied text after a delay
      setTimeout(() => {
        setCopiedText(null);
      }, 2000);

      setIsLoading(false);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to copy to clipboard';
      setError(errorMessage);
      console.error('Clipboard copy failed:', err);
      setIsLoading(false);
      return false;
    }
  }, []);

  const clearCopied = useCallback(() => {
    setCopiedText(null);
    setError(null);
  }, []);

  return {
    copiedText,
    isLoading,
    error,
    copyToClipboard,
    clearCopied,
  };
}