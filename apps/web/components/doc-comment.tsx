"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface DocCommentProps {
  docs: string[] | undefined;
}

export function DocComment({ docs }: DocCommentProps) {
  const [expanded, setExpanded] = useState(false);

  if (!docs || docs.length === 0 || docs.every((d) => !d.trim())) return null;

  const firstLine = docs[0]!.replace(/^#+\s*/, "").trim();
  const hasMore = docs.length > 1 || docs[0]!.length > 200;
  const fullText = docs.join("\n").trim();

  return (
    <div className="p-3 bg-muted/30 rounded-md border border-muted">
      <div className="flex items-start gap-2">
        <BookOpen className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
          {expanded ? (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
              {fullText}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground truncate">
              {firstLine}
            </p>
          )}
        </div>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 h-6 px-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
