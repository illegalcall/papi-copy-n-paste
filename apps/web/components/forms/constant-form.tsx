"use client";

import { useState, useEffect } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Settings, Code2, ChevronDown, ChevronUp, Copy, Check, Loader2 } from "lucide-react";
import { PalletConstant } from "@workspace/core";
import { Button } from "@workspace/ui/components/button";
import { generateConstantSignature } from "@/utils/typeExtraction";
import { CallSignature } from "@/components/type-display";
import { preDecodedConstantsService } from "@/services/preDecodedConstants";

interface ConstantFormProps {
  pallet: string;
  constant: PalletConstant;
  chainKey: string;
}

export function ConstantForm({ pallet, constant, chainKey }: ConstantFormProps) {
  const [showTypeInfo, setShowTypeInfo] = useState(true);
  const [showValue, setShowValue] = useState(true);
  const [copied, setCopied] = useState(false);
  const [decodedValue, setDecodedValue] = useState<unknown>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodingError, setDecodingError] = useState<string | null>(null);

  // Use pre-decoded constants service for instant results

  // Generate TypeScript type information
  const constantType = typeof constant.type === 'string' ? constant.type : 'unknown';
  const typeInfo = generateConstantSignature(pallet, constant.name, constantType);

  // Load decoded constant value instantly from pre-decoded JSON
  useEffect(() => {
    if (!constant.value || !constant.type) {
      setDecodedValue(null);
      setDecodingError(null);
      setIsDecoding(false);
      return;
    }

    // Get pre-decoded constant instantly
    const preDecodedConstant = preDecodedConstantsService.getDecodedConstant(chainKey, pallet, constant.name);

    if (preDecodedConstant && preDecodedConstant.decodedValue !== null) {
      setDecodedValue(preDecodedConstant.decodedValue);
      setDecodingError(null);
      setIsDecoding(false);
    } else {
      setDecodedValue(null);
      setDecodingError('Constant not found in pre-decoded data. Run "npm run constants" to extract and decode constants.');
      setIsDecoding(false);
    }
  }, [constant.value, constant.type, pallet, constant.name, chainKey]);

  const handleCopyValue = async () => {
    if (constant.value) {
      await navigator.clipboard.writeText(constant.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  // Get helpful context for specific constant types
  const getConstantContext = (constantName: string): string => {
    if (constantName === 'PalletId') {
      return 'This constant contains an 8-byte pallet identifier (like "py/trsry" for Treasury). PAPI could not decode this complex SCALE type. This constant has a real value but requires specialized decoding.';
    }
    if (constantName === 'Environment') {
      return 'This constant contains the runtime environment configuration for smart contracts. PAPI could not decode this complex SCALE type. This constant has a real value but requires specialized decoding.';
    }
    if (constantName === 'Prefix') {
      return 'This constant contains a prefix value for the pallet. PAPI could not decode this complex SCALE type. This constant has a real value but requires specialized decoding.';
    }
    if (constantName.includes('Source')) {
      return 'This constant contains source configuration data. PAPI could not decode this complex SCALE type. This constant has a real value but requires specialized decoding.';
    }
    return 'PAPI could not decode this complex SCALE type. This constant has a real value but requires specialized decoding.';
  };

  // Format the decoded value for display
  const formatDecodedValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return 'Not available';
    }

    // Handle BigInt values
    if (typeof value === 'bigint') {
      return value.toString();
    }

    // Handle string values that might be JSON
    if (typeof value === 'string') {
      // Check for empty object string
      if (value === '{}') {
        return getConstantContext(constant.name);
      }

      try {
        // Try to parse as JSON for better formatting
        const parsed = JSON.parse(value);

        // Check if parsed result is an empty object
        if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length === 0) {
          return getConstantContext(constant.name);
        }

        return JSON.stringify(parsed, null, 2);
      } catch {
        // If not valid JSON, return as-is
        return value;
      }
    }

    // Handle objects with toNumber method (PAPI Codec types)
    if (value && typeof value === 'object' && 'toNumber' in value && typeof (value as any).toNumber === 'function') {
      try {
        return (value as any).toNumber().toString();
      } catch {
        // If toNumber fails (value too large), try toString
        return value.toString();
      }
    }

    // Handle objects with toString method
    if (value && typeof value === 'object' && typeof value.toString === 'function') {
      const stringValue = value.toString();
      // Check if toString returns [object Object], if so use JSON.stringify
      if (stringValue === '[object Object]') {
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return stringValue;
        }
      }
      return stringValue;
    }

    // Handle primitive values
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }

    // Fallback to JSON stringify for objects
    try {
      const stringified = JSON.stringify(value, null, 2);
      // Check if it's an empty object
      if (stringified === '{}') {
        return getConstantContext(constant.name);
      }
      return stringified;
    } catch {
      return String(value);
    }
  };

  return (
    <div className="space-y-4">
      {/* Constant Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            {pallet}.{constant.name}
          </h3>
          <Badge variant="outline" className="text-xs">Constant</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {constant.docs?.[0] || "Runtime constant value"}
        </p>
      </div>

      {/* TypeScript Type Information */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowTypeInfo(!showTypeInfo)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Code2 className="w-3 h-3 text-muted-foreground" />
            <div className="font-mono text-xs text-foreground truncate">
              <span className="text-pink-600">{constant.name}</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-purple-600">Constant</span>
              <span className="text-gray-400">&lt;</span>
              <span className="text-foreground">{constantType}</span>
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>
          {showTypeInfo ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {showTypeInfo && (
          <div className="max-h-48 overflow-y-auto p-3 bg-muted/10 rounded-md border border-muted/50">
            <CallSignature
              typeInfo={typeInfo}
              description={constant.docs?.[0] || "Runtime constant value"}
            />
          </div>
        )}
      </div>

      {/* Constant Value */}
      {constant.value && (
        <div className="space-y-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setShowValue(!showValue)}
          >
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Constant Value</span>
              <Badge variant="outline" className="text-xs">Read-only</Badge>
            </div>
            {showValue ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showValue && (
            <div className="bg-muted/20 rounded-md p-3 border border-muted">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Value:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyValue}
                  className="h-6 w-6 p-0"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                {/* Raw hex value from metadata */}
                <div>
                  <span className="text-xs font-medium text-muted-foreground block mb-1">Raw value (from metadata):</span>
                  <pre className="text-xs font-mono text-orange-600 dark:text-orange-400 overflow-x-auto whitespace-pre-wrap">
                    {constant.value || 'Not available'}
                  </pre>
                </div>

                {/* PAPI-decoded value */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Decoded value (via PAPI):</span>
                    {isDecoding && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                  </div>
                  <pre className="text-xs font-mono text-green-600 dark:text-green-400 overflow-x-auto whitespace-pre-wrap">
                    {isDecoding
                      ? 'Decoding...'
                      : decodingError
                        ? `Error: ${decodingError}`
                        : decodedValue !== null
                          ? formatDecodedValue(decodedValue)
                          : chainKey === 'custom'
                            ? 'Not available for custom chains'
                            : 'Decoding not supported for this chain'
                    }
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Constant Information */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>
          <strong>Type:</strong> {constantType}
        </div>
        <div>
          <strong>Access:</strong> Read-only constant value from runtime
        </div>
        <div className="text-blue-500">
          Constants are fixed values defined in the runtime and never change during execution
        </div>
        <div className="text-green-500">
          No parameters required - constants are directly accessible values
        </div>
      </div>
    </div>
  );
}