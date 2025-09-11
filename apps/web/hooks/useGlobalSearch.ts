"use client";

import { useEffect, useRef } from "react";

interface UseGlobalSearchProps {
  onSearchActivate: () => void;
  isEnabled?: boolean;
}

export function useGlobalSearch({ onSearchActivate, isEnabled = true }: UseGlobalSearchProps) {
  const handleKeyDown = useRef((event: KeyboardEvent) => {
    // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      event.stopPropagation();
      onSearchActivate();
    }
  });

  useEffect(() => {
    if (!isEnabled) return;

    const handler = handleKeyDown.current;
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [isEnabled]);

  return {
    // Helper function to check if the current platform uses Cmd or Ctrl
    getSearchShortcut: () => {
      if (typeof window !== 'undefined') {
        return navigator.platform.toLowerCase().includes('mac') ? '⌘K' : 'Ctrl+K';
      }
      return 'Cmd/Ctrl+K';
    }
  };
}