/**
 * Hook for managing transaction and storage query queues
 */

import { useState, useCallback } from "react";
import { PalletCall } from "@workspace/core";

interface MethodQueueItem {
  pallet: string;
  call: PalletCall;
  formData: Record<string, any>;
  id: string;
}

interface StorageQueueItem {
  pallet: string;
  storage: any;
  queryType: string;
  storageParams: Record<string, any>;
  id: string;
}

export function useTransactionQueue() {
  // Method queue state
  const [methodQueue, setMethodQueue] = useState<MethodQueueItem[]>([]);

  // Storage query queue state
  const [storageQueue, setStorageQueue] = useState<StorageQueueItem[]>([]);

  // Add current call to method queue
  const addToMethodQueue = useCallback(
    (
      selectedCall: { pallet: string; call: PalletCall } | undefined,
      formData: Record<string, any>,
    ) => {
      if (!selectedCall) return;

      const queueItem: MethodQueueItem = {
        pallet: selectedCall.pallet,
        call: selectedCall.call,
        formData: { ...formData },
        id: Math.random().toString(36).substr(2, 9),
      };

      setMethodQueue((prev) => [...prev, queueItem]);
    },
    [],
  );

  // Add current storage query to queue
  const addToStorageQueue = useCallback(
    (
      selectedStorage: { pallet: string; storage: any } | undefined,
      storageQueryType: string,
      storageParams: Record<string, any>,
    ) => {
      if (!selectedStorage) return;

      const queueItem: StorageQueueItem = {
        pallet: selectedStorage.pallet,
        storage: selectedStorage.storage,
        queryType: storageQueryType,
        storageParams: { ...storageParams },
        id: Math.random().toString(36).substr(2, 9),
      };

      setStorageQueue((prev) => [...prev, queueItem]);
    },
    [],
  );

  // Remove method from queue
  const removeFromMethodQueue = useCallback((id: string) => {
    setMethodQueue((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Remove storage query from queue
  const removeFromStorageQueue = useCallback((id: string) => {
    setStorageQueue((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear method queue
  const clearMethodQueue = useCallback(() => {
    setMethodQueue([]);
  }, []);

  // Clear storage queue
  const clearStorageQueue = useCallback(() => {
    setStorageQueue([]);
  }, []);

  // Clear all queues
  const clearAllQueues = useCallback(() => {
    setMethodQueue([]);
    setStorageQueue([]);
  }, []);

  return {
    // State
    methodQueue,
    storageQueue,

    // Actions
    addToMethodQueue,
    addToStorageQueue,
    removeFromMethodQueue,
    removeFromStorageQueue,
    clearMethodQueue,
    clearStorageQueue,
    clearAllQueues,
  };
}
