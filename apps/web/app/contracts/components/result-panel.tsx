"use client";

import { memo } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Check, X, Copy, Clock } from "lucide-react";
import type { ContractCallResult } from "@workspace/core/contracts/types";

interface ResultPanelProps {
  result: ContractCallResult | null;
  generatedCode: string;
  onCopyCode: () => void;
}

export const ResultPanel = memo(function ResultPanel({
  result,
  generatedCode,
  onCopyCode,
}: ResultPanelProps) {
  return (
    <div className="space-y-4">
      {/* Call Result */}
      {result && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Result
            </h4>
            {result.success ? (
              <Badge variant="outline" className="text-green-600 border-green-600 text-[10px]">
                <Check className="h-3 w-3 mr-0.5" />
                Success
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600 text-[10px]">
                <X className="h-3 w-3 mr-0.5" />
                Error
              </Badge>
            )}
          </div>

          {result.success ? (
            <div className="bg-muted/50 rounded-md p-3 font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all">
                {result.decodedValue ?? JSON.stringify(result.value, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-destructive/10 rounded-md p-3 text-xs text-destructive">
              {result.error}
            </div>
          )}

          {result.gasUsed !== undefined && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Gas used: {result.gasUsed.toString()}
            </p>
          )}

          {result.events && result.events.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground mb-1">
                Events:
              </h5>
              {result.events.map((evt, i) => (
                <div key={i} className="bg-muted/30 rounded p-2 text-xs font-mono mb-1">
                  <span className="text-primary font-semibold">{evt.name}</span>
                  <pre className="whitespace-pre-wrap mt-1">
                    {JSON.stringify(evt.args, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Generated Code */}
      {generatedCode && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Generated Code
            </h4>
            <Button variant="ghost" size="sm" onClick={onCopyCode} className="h-6 text-xs">
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>

          <ScrollArea className="max-h-[400px]">
            <div className="bg-muted/50 rounded-md p-3 font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap">{generatedCode}</pre>
            </div>
          </ScrollArea>
        </div>
      )}

      {!result && !generatedCode && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Select a method and run a query or transaction to see results here
          </p>
        </div>
      )}
    </div>
  );
});
