/**
 * Safe subscription hook with automatic cleanup
 * Prevents memory leaks by cleaning up on unmount
 */

import { useEffect, useRef, useCallback } from 'react';
import { subscriptionManager } from '../utils/subscriptionManager';

export function useSubscription() {
  const subscriptionRefs = useRef<Set<string>>(new Set());

  const subscribe = useCallback((
    key: string,
    unsubscribe: () => void,
    description?: string
  ) => {
    // Add to our tracking
    subscriptionRefs.current.add(key);

    // Add to global manager
    subscriptionManager.add(key, unsubscribe, description);

    return () => {
      subscriptionRefs.current.delete(key);
      subscriptionManager.remove(key);
    };
  }, []);

  const unsubscribe = useCallback((key: string) => {
    subscriptionRefs.current.delete(key);
    return subscriptionManager.remove(key);
  }, []);

  const hasSubscription = useCallback((key: string) => {
    return subscriptionManager.has(key);
  }, []);

  // Cleanup all component subscriptions on unmount
  useEffect(() => {
    return () => {
      for (const key of subscriptionRefs.current) {
        subscriptionManager.remove(key);
      }
      subscriptionRefs.current.clear();
    };
  }, []);

  return {
    subscribe,
    unsubscribe,
    hasSubscription,
  };
}