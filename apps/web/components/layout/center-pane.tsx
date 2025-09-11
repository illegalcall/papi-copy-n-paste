"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Play, Square, Plus, X, List } from "lucide-react";
import { SimpleCallForm } from "@/components/forms/simple-call-form";
import { StorageForm } from "@/components/forms/storage-form";
import { PalletCall } from "@workspace/core";
import { SyntaxHighlighter } from "@/components/code/syntax-highlighter";

interface CenterPaneProps {
  chainStatus: "connecting" | "ready" | "error";
  selectedChain: string;
  selectedCall?: { pallet: string; call: PalletCall };
  selectedStorage?: { pallet: string; storage: any };
  methodQueue: Array<{
    pallet: string;
    call: PalletCall;
    formData: Record<string, any>;
    id: string;
  }>;
  storageQueue: Array<{
    pallet: string;
    storage: any;
    queryType: string;
    storageParams: Record<string, any>;
    id: string;
  }>;
  onFormChange: (formData: Record<string, any>) => void;
  onValidChange: (isValid: boolean) => void;
  onRunClick: () => void;
  onAbortClick: () => void;
  onAddToQueue: () => void;
  onRemoveFromQueue: (id: string) => void;
  onClearQueue: () => void;
  onAddStorageToQueue: () => void;
  onRemoveStorageFromQueue: (id: string) => void;
  onClearStorageQueue: () => void;
  isRunning: boolean;
  canRun: boolean;
  canRunStorage: boolean;
  // Storage query props
  storageQueryType?: string;
  storageParams?: Record<string, any>;
  onStorageQueryTypeChange?: (queryType: string) => void;
  onStorageParamsChange?: (params: Record<string, any>) => void;
}

// Enhanced documentation renderer with better formatting and merged code blocks
function renderDocumentation(docs: string[]) {
  const docText = docs.join("\n\n");

  // Split into paragraphs for better structure
  const paragraphs = docText.split(/\n\s*\n/);

  // Helper function to detect if content is actually code vs text with technical terms
  const isActuallyCode = (text: string): boolean => {
    const lines = text.split("\n");
    const codeLines = lines.filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed.length > 0 &&
        // Actual Rust syntax patterns
        (/^(impl|type|struct|enum|fn|use|mod|const|static|trait|pub|let|mut)\s+/.test(
          trimmed,
        ) ||
          /^[A-Za-z_][A-Za-z0-9_]*\s*[,:;]/.test(trimmed) || // Field declarations
          /[;,]\s*$/.test(trimmed) || // Lines ending with code punctuation
          /<[A-Za-z_][A-Za-z0-9_]*>/.test(trimmed) || // Generic types
          /where\s+[A-Za-z_][A-Za-z0-9_]*\s*:/.test(trimmed) || // Trait bounds
          /^#\[[^\]]+\]/.test(trimmed) || // Attributes
          /^(crate|super|self)::/.test(trimmed) || // Module paths
          /[A-Za-z_][A-Za-z0-9_]*!\s*\(/.test(trimmed) || // Macro calls
          /:\s*[A-Za-z_][A-Za-z0-9_]*(\s*[<>()[\]{},;]|\s*$)/.test(trimmed) || // Type annotations
          /[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z_][A-Za-z0-9_]*\s*\(/.test(trimmed) || // Method calls
          /^\s*(let|return|break|continue)\s+/.test(trimmed) || // Statements
          /^\s*(if|else|match|for|while|loop)\s+/.test(trimmed) || // Control flow
          /^\s*[})\]]\s*$/.test(trimmed) || // Structural elements
          /^\s*[{(\[]\s*$/.test(trimmed)) // Structural elements
      );
    });

    const textLines = lines.filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed.length > 0 &&
        // Text patterns (sentences, documentation)
        (/^[A-Z][a-z]+\s+[a-z]+\s+/.test(trimmed) || // Sentences starting with capital
          /^The\s+/.test(trimmed) || // Documentation starting with "The"
          /^You\s+can\s+/.test(trimmed) || // Documentation starting with "You can"
          /^But\s+this\s+/.test(trimmed) || // Documentation starting with "But this"
          /^This\s+comes\s+/.test(trimmed) || // Documentation patterns
          (/^[a-z]+\s+[a-z]+\s+/.test(trimmed) &&
            !trimmed.includes("::") &&
            !trimmed.includes("{") &&
            !trimmed.includes("}"))) // Lowercase sentences
      );
    });

    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
    const codeRatio = codeLines.length / nonEmptyLines.length;
    const textRatio = textLines.length / nonEmptyLines.length;

    // If more than 60% looks like actual code syntax, it's code
    // If more than 60% looks like text, it's text
    return codeRatio > 0.6 && textRatio < 0.4;
  };

  // Merge continuous code blocks
  const mergedContent: Array<{ type: "code" | "text"; content: string }> = [];

  paragraphs.forEach((paragraph) => {
    const trimmedParagraph = paragraph.trim();

    // Skip empty paragraphs
    if (!trimmedParagraph) return;

    // Enhanced code detection with precise patterns
    const isCodeBlock = (() => {
      // Explicit code markers
      if (
        /^(impl|type|struct|enum|fn|use|mod|const|static|trait|pub|let|mut|#\[|\/\/|\/\*|```|nocompile)/.test(
          trimmedParagraph,
        )
      ) {
        return true;
      }

      // Code block markers
      if (paragraph.includes("nocompile") || paragraph.includes("```")) {
        return true;
      }

      // Multi-line content with specific Rust syntax patterns
      if (
        paragraph.split("\n").length > 2 &&
        (/::[A-Za-z_][A-Za-z0-9_]*/.test(paragraph) || // Qualified names like pallet_balances::Config
          /where\s+[A-Za-z_][A-Za-z0-9_]*\s*:/.test(paragraph) || // Trait bounds
          /for<[A-Za-z_][A-Za-z0-9_]*>/.test(paragraph) || // Generic for loops
          /macro_rules!/.test(paragraph) || // Macro definitions
          /<[A-Za-z_][A-Za-z0-9_]*>/.test(paragraph) || // Generic type parameters
          /[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z_][A-Za-z0-9_]*\s*\(/.test(
            paragraph,
          ) || // Method calls
          /[A-Za-z_][A-Za-z0-9_]*!\s*\(/.test(paragraph) || // Macro calls
          isActuallyCode(paragraph)) // Use helper function for better detection
      ) {
        return true;
      }

      // Structural elements (braces, brackets, parentheses)
      if (
        /^\s*[})\]]\s*$/.test(trimmedParagraph) || // Closing braces/brackets
        /^\s*[{(\[]\s*$/.test(trimmedParagraph)
      ) {
        // Opening braces/brackets
        return true;
      }

      // Lines ending with code punctuation
      if (/[;,]\s*$/.test(trimmedParagraph)) {
        return true;
      }

      // Type definitions and field declarations (must be at start of line)
      if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*[,:;]/.test(trimmedParagraph)) {
        return true;
      }

      // Attribute macros
      if (/^#\[[^\]]+\]/.test(trimmedParagraph)) {
        return true;
      }

      // Module paths and qualified names (must be at start)
      if (/^(crate|super|self)::/.test(trimmedParagraph)) {
        return true;
      }

      // Type annotations and patterns
      if (
        /:\s*[A-Za-z_][A-Za-z0-9_]*(\s*[<>()[\]{},;]|\s*$)/.test(
          trimmedParagraph,
        )
      ) {
        return true;
      }

      // Assignment and return statements
      if (/^\s*(let|return|break|continue)\s+/.test(trimmedParagraph)) {
        return true;
      }

      // Match expressions and control flow
      if (/^\s*(if|else|match|for|while|loop)\s+/.test(trimmedParagraph)) {
        return true;
      }

      return false;
    })();

    if (isCodeBlock) {
      // Clean up the code block
      const cleanedCode = paragraph
        .trim()
        .replace(/^```\w*\n?/, "")
        .replace(/\n?```$/, "")
        .replace(/^\s*nocompile\s*\n?/, "")
        .replace(/^# Example\s*\n?/, "")
        .replace(/^\s*```\s*$/, "") // Remove standalone backticks
        .trim();

      // Skip if cleaned code is empty
      if (!cleanedCode) return;

      // Check if the last item was also a code block
      const lastItem = mergedContent[mergedContent.length - 1];
      if (lastItem && lastItem.type === "code") {
        // Merge with previous code block
        lastItem.content += "\n\n" + cleanedCode;
      } else {
        // Add new code block
        mergedContent.push({ type: "code", content: cleanedCode });
      }
    } else {
      // Skip headers like "# Example" that are standalone
      if (trimmedParagraph.match(/^# Example\s*$/)) return;

      // Skip standalone technical terms that aren't code
      if (
        trimmedParagraph.match(
          /^(Storage|Runtime|Account|Balance|Provider|System|pallet|frame_system)\s*$/,
        )
      )
        return;

      // Skip lines that are just punctuation or structural elements
      if (/^[{}()[\].,;:]\s*$/.test(trimmedParagraph)) return;

      // Skip lines that look like they might be code but are actually text
      if (
        /^[A-Z][a-z]+\s+[a-z]+\s+/.test(trimmedParagraph) &&
        !trimmedParagraph.includes("::") &&
        !trimmedParagraph.includes("{") &&
        !trimmedParagraph.includes("}")
      ) {
        // This looks like a sentence starting with a capital letter, not code
        mergedContent.push({ type: "text", content: trimmedParagraph });
        return;
      }

      // Add text content
      mergedContent.push({ type: "text", content: trimmedParagraph });
    }
  });

  // Filter out any remaining empty items
  const filteredContent = mergedContent.filter(
    (item) => item.content.trim().length > 0,
  );

  return (
    <div className="space-y-3">
      {filteredContent.map((item, index) => {
        if (item.type === "code") {
          return (
            <div key={index} className="bg-muted/30 border rounded-lg p-3">
              <pre className="font-mono text-xs text-foreground whitespace-pre-wrap overflow-x-auto leading-5 m-0">
                {item.content}
              </pre>
            </div>
          );
        }

        // Check if this is a section header (starts with #)
        if (item.content.startsWith("#")) {
          return (
            <h4
              key={index}
              className="text-sm font-medium text-foreground mt-4 mb-2"
            >
              {item.content.replace(/^#+\s*/, "")}
            </h4>
          );
        }

        // Handle text with inline code
        const codePattern = /`([^`]+)`/g;
        const hasInlineCode = codePattern.test(item.content);

        if (hasInlineCode) {
          const parts = item.content.split(codePattern);

          return (
            <div
              key={index}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {parts.map((part, partIndex) => {
                if (partIndex % 2 === 1) {
                  return (
                    <code
                      key={partIndex}
                      className="px-2 py-1 mx-1 bg-muted/70 text-foreground font-mono text-xs rounded border"
                    >
                      {part}
                    </code>
                  );
                } else {
                  return <span key={partIndex}>{part}</span>;
                }
              })}
            </div>
          );
        }

        // Regular paragraph
        return (
          <p
            key={index}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {item.content}
          </p>
        );
      })}
    </div>
  );
}

export function CenterPane({
  chainStatus,
  selectedChain,
  selectedCall,
  selectedStorage,
  methodQueue,
  storageQueue,
  onFormChange,
  onValidChange,
  onRunClick,
  onAbortClick,
  onAddToQueue,
  onRemoveFromQueue,
  onClearQueue,
  onAddStorageToQueue,
  onRemoveStorageFromQueue,
  onClearStorageQueue,
  isRunning,
  canRun,
  canRunStorage,
  storageQueryType = "getValue",
  storageParams = {},
  onStorageQueryTypeChange,
  onStorageParamsChange,
}: CenterPaneProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connecting":
        return "bg-yellow-500";
      case "ready":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${getStatusColor(chainStatus)}`}
          />
          <span className="text-sm text-muted-foreground">
            {chainStatus === "connecting" && "Connecting to chain..."}
            {chainStatus === "ready" && `Connected to ${selectedChain}`}
            {chainStatus === "error" && "Connection failed"}
          </span>
        </div>
      </div>

      {/* Method Queue Display */}
      {methodQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Method Queue ({methodQueue.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearQueue}
                disabled={isRunning}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Methods will be executed sequentially. If any method fails,
              execution will stop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {methodQueue.map((method, index) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <div className="font-medium">
                        {method.pallet}.{method.call.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {method.call.args.length} argument
                        {method.call.args.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromQueue(method.id)}
                    disabled={isRunning}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Storage Queue Display */}
      {storageQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Storage Queue ({storageQueue.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearStorageQueue}
                disabled={isRunning}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Storage queries will be executed sequentially. If any query fails,
              execution will continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {storageQueue.map((query, index) => (
                <div
                  key={query.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <div className="font-medium">
                        {query.pallet}.{query.storage.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Query Type: {query.queryType}
                      </div>
                      {Object.keys(query.storageParams).length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Params: {JSON.stringify(query.storageParams)}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveStorageFromQueue(query.id)}
                    disabled={isRunning}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCall ? (
        <SimpleCallForm
          key={`${selectedCall.pallet}-${selectedCall.call.name}`}
          pallet={selectedCall.pallet}
          call={selectedCall.call}
          onFormChange={onFormChange}
          onValidChange={onValidChange}
        />
      ) : selectedStorage ? (
        <StorageForm
          pallet={selectedStorage.pallet}
          storage={selectedStorage.storage}
          chainKey={selectedChain}
          queryType={storageQueryType || "getValue"}
          storageParams={storageParams || {}}
          onQueryTypeChange={onStorageQueryTypeChange || (() => {})}
          onParamsChange={onStorageParamsChange || (() => {})}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select a Pallet Call or Storage</CardTitle>
            <CardDescription>
              Choose a call (to execute transactions) or storage item (to query
              data) from the left panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              {chainStatus === "ready"
                ? "Select a chain and explore the available pallets"
                : "Connecting to chain..."}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-4 inset-x-4 lg:relative lg:bottom-auto lg:inset-x-auto lg:mt-6">
        <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
          {/* Single method run */}
          {selectedCall && methodQueue.length === 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
              <Button
                variant="outline"
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onAddToQueue}
                className="min-w-0 flex-shrink"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isRunning ? "Queue" : "Add to Queue"}
              </Button>
            </>
          )}

          {/* Storage query run */}
          {selectedStorage &&
            !selectedCall &&
            methodQueue.length === 0 &&
            storageQueue.length === 0 && (
              <>
                <Button
                  size={isRunning ? "default" : "lg"}
                  disabled={isRunning || !canRunStorage}
                  onClick={onRunClick}
                  className="min-w-0 flex-shrink"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? "Querying..." : "Run Query"}
                </Button>
                <Button
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={isRunning || !canRunStorage}
                  onClick={onAddStorageToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? "Queue" : "Add to Queue"}
                </Button>
              </>
            )}

          {/* Multi-method run */}
          {methodQueue.length > 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : `Run Queue (${methodQueue.length})`}
              </Button>
              {selectedCall && (
                <Button
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={!canRun || isRunning}
                  onClick={onAddToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? "Add" : "Add More"}
                </Button>
              )}
            </>
          )}

          {/* Multi-storage run */}
          {storageQueue.length > 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning
                  ? "Querying..."
                  : `Run Storage Queue (${storageQueue.length})`}
              </Button>
              {selectedStorage && (
                <Button
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={isRunning || !canRunStorage}
                  onClick={onAddStorageToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? "Add" : "Add More"}
                </Button>
              )}
            </>
          )}

          {/* Abort button - always available when running */}
          {isRunning && (
            <Button
              variant="destructive"
              size="default"
              onClick={onAbortClick}
              className="min-w-0 flex-shrink"
            >
              <Square className="w-4 h-4 mr-2" />
              Abort
            </Button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
