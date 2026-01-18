"use client";

import { useCallback, useState } from "react";

export function useMarkdownExport() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (markdown: string) => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const downloadAsFile = useCallback((markdown: string, filename: string) => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".md") ? filename : `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return { copyToClipboard, downloadAsFile, copied };
}
