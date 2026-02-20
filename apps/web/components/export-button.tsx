"use client";

import { useState, useCallback } from "react";
import { FileText } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Toast } from "@workspace/ui/components/toast";

interface ExportMarkdownButtonProps {
  getMarkdown: () => string;
  onExported?: (markdown: string) => void;
  label?: string;
}

export function ExportMarkdownButton({
  getMarkdown,
  onExported,
  label = "Copy as Markdown",
}: ExportMarkdownButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      const markdown = getMarkdown();
      await navigator.clipboard.writeText(markdown);
      setShowToast(true);
      onExported?.(markdown);
    } catch (err) {
      console.error("Failed to copy markdown:", err);
      setShowToast(true);
    }
  }, [getMarkdown, onExported]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        title={label}
      >
        <FileText className="w-3 h-3 mr-1" />
        Markdown
      </Button>
      <Toast
        message="Markdown copied to clipboard!"
        show={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}
