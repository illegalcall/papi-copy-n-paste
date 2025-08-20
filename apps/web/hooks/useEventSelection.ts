"use client";

import { useState, useCallback } from "react";
import { PalletEvent } from "@workspace/core";

export function useEventSelection() {
  const [selectedEvent, setSelectedEvent] = useState<
    { pallet: string; event: PalletEvent } | undefined
  >();

  const handleEventSelect = useCallback((pallet: string, event: PalletEvent) => {
    setSelectedEvent({ pallet, event });
  }, []);

  const clearEventSelection = useCallback(() => {
    setSelectedEvent(undefined);
  }, []);

  const resetEventState = useCallback(() => {
    setSelectedEvent(undefined);
  }, []);

  return {
    selectedEvent,
    handleEventSelect,
    clearEventSelection,
    resetEventState,
  };
}