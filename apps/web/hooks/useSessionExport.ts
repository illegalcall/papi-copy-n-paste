import { useState, useCallback } from "react";

interface SessionEntry {
  timestamp: number;
  markdown: string;
}

export function useSessionExport() {
  const [entries, setEntries] = useState<SessionEntry[]>([]);

  const addEntry = useCallback((markdown: string) => {
    setEntries((prev) => [...prev, { timestamp: Date.now(), markdown }]);
  }, []);

  const exportSession = useCallback((): string => {
    const date = new Date().toISOString().split("T")[0];
    const header = `# Session Export\n\n**Date**: ${date}\n**Actions**: ${entries.length}\n`;
    const body = entries.map((e) => e.markdown).join("\n\n---\n\n");
    return `${header}\n---\n\n${body}`;
  }, [entries]);

  const clearSession = useCallback(() => {
    setEntries([]);
  }, []);

  return {
    addEntry,
    exportSession,
    clearSession,
    entryCount: entries.length,
  };
}
