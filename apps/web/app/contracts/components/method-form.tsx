"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Play, Send, Loader2, Info, Coins } from "lucide-react";
import type { UnifiedMethod } from "@workspace/core/contracts/types";

interface MethodFormProps {
  method: UnifiedMethod;
  onQuery: (args: Record<string, string>) => void;
  onExecute: (args: Record<string, string>, value?: bigint) => void;
  isRunning?: boolean;
  error?: string | null;
  previewOnly?: boolean;
}

export const MethodForm = memo(function MethodForm({
  method,
  onQuery,
  onExecute,
  isRunning,
  error,
  previewOnly,
}: MethodFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [payableValue, setPayableValue] = useState("");

  // Reset form when method changes
  useEffect(() => {
    const initial: Record<string, string> = {};
    method.args.forEach((arg) => {
      initial[arg.name] = "";
    });
    setFormData(initial);
    setPayableValue("");
  }, [method.name, method.args]);

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (method.isReadOnly) {
      onQuery(formData);
    } else {
      let value: bigint | undefined;
      try {
        value = payableValue ? BigInt(payableValue) : undefined;
      } catch {
        return; // invalid BigInt input
      }
      onExecute(formData, value);
    }
  }, [method.isReadOnly, formData, payableValue, onQuery, onExecute]);

  const isFormValid = method.args.every((arg) => {
    const value = formData[arg.name];
    return value !== undefined && value !== "";
  });

  return (
    <div className="space-y-4">
      {/* Method Header */}
      <div className="flex items-center gap-2">
        <h3 className="font-mono font-semibold text-sm">{method.name}</h3>
        <Badge
          variant="outline"
          className={
            method.isReadOnly
              ? "text-blue-600 border-blue-600"
              : "text-orange-600 border-orange-600"
          }
        >
          {method.isReadOnly ? "read" : "write"}
        </Badge>
        {method.isPayable && (
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            <Coins className="h-3 w-3 mr-1" />
            payable
          </Badge>
        )}
      </div>

      {/* Documentation */}
      {method.docs.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {method.docs.join(" ")}
        </p>
      )}

      {/* Parameters */}
      {method.args.length > 0 ? (
        <div className="space-y-3">
          {method.args.map((arg) => (
            <div key={arg.name}>
              <div className="flex items-center gap-1.5 mb-1">
                <Label className="text-xs font-medium">{arg.name}</Label>
                <Badge variant="secondary" className="text-[10px] px-1 py-0 font-mono">
                  {arg.type}
                </Badge>
                {arg.description && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{arg.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <Input
                placeholder={getPlaceholder(arg.type)}
                value={formData[arg.name] ?? ""}
                onChange={(e) => handleInputChange(arg.name, e.target.value)}
                className="font-mono text-xs"
                disabled={isRunning}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">
          No parameters required
        </p>
      )}

      {/* Payable Value */}
      {method.isPayable && (
        <div>
          <Label className="text-xs font-medium flex items-center gap-1">
            <Coins className="h-3 w-3" />
            Value (in smallest unit)
          </Label>
          <Input
            placeholder="0"
            value={payableValue}
            onChange={(e) => setPayableValue(e.target.value)}
            className="font-mono text-xs"
            disabled={isRunning}
          />
        </div>
      )}

      {/* Preview-only banner (example with no live address) */}
      {previewOnly && (
        <Alert className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <AlertDescription className="text-xs">
            Preview only — this example has no live address. Enter a deployed
            contract address above to query on-chain.
          </AlertDescription>
        </Alert>
      )}

      {/* Error */}
      {error && (
        <Alert className="border-destructive text-destructive">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      {/* Return Type */}
      {method.returnType && (
        <p className="text-xs text-muted-foreground">
          Returns: <span className="font-mono">{method.returnType}</span>
        </p>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={
          isRunning ||
          previewOnly ||
          (method.args.length > 0 && !isFormValid)
        }
        className="w-full"
        variant={method.isReadOnly ? "outline" : "default"}
      >
        {isRunning ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {method.isReadOnly ? "Querying..." : "Executing..."}
          </>
        ) : method.isReadOnly ? (
          <>
            <Play className="h-4 w-4 mr-2" />
            Query
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Execute
          </>
        )}
      </Button>
    </div>
  );
});

function getPlaceholder(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("accountid") || t === "address") return "5GrwvaEF... or 0x...";
  if (t === "bool" || t === "boolean") return "true / false";
  if (t.includes("u128") || t.includes("u256") || t.includes("balance"))
    return "1000000000000";
  if (t.startsWith("u") || t.startsWith("i") || t.startsWith("uint") || t.startsWith("int"))
    return "0";
  if (t === "bytes" || t.startsWith("bytes")) return "0x...";
  if (t === "string" || t === "str") return "Hello";
  if (t.includes("hash")) return "0x...";
  return "value";
}
