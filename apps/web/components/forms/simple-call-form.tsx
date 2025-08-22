"use client";

import { useState, useEffect } from "react";
import { parseSimpleType, getDefaultValue, createFieldChangeHandler, initializeFormData, hasValidFormData } from "../../utils/formHelpers";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Badge } from "@workspace/ui/components/badge";
import { Label } from "@workspace/ui/components/label";
import { PalletCall } from "@workspace/core";
import { HelpCircle, Code2, ChevronDown, ChevronUp } from "lucide-react";
import type { FormData, FormChangeHandler, ValidChangeHandler } from "../../types/forms";
import { getParameterEducation } from "../../data/parameter-education";
import { generateCallSignature } from "@/utils/typeExtraction";
import { CallSignature } from "@/components/type-display";
import { useChainProperties, formatTokenAmount } from "../../hooks/useChainProperties";

interface SimpleCallFormProps {
  pallet: string;
  call: PalletCall;
  onFormChange: FormChangeHandler;
  onValidChange: ValidChangeHandler;
  chainKey: string;
}

// This function is now replaced by external data source
// See: data/transaction-templates/index.ts

export function SimpleCallForm({
  pallet,
  call,
  onFormChange,
  onValidChange,
  chainKey,
}: SimpleCallFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [showTypeInfo, setShowTypeInfo] = useState(true);
  const chainProperties = useChainProperties(chainKey);

  // Generate TypeScript type information
  const typeInfo = generateCallSignature(pallet, call.name, call.args);

  // Initialize form data when call changes
  useEffect(() => {
    const initialData = initializeFormData(call.args);
    setFormData(initialData);
  }, [call]);

  // Notify parent of changes
  useEffect(() => {
    onFormChange(formData);

    // Validation logic: Check if form has valid values (default or user-entered)
    const isValid = hasValidFormData(formData, call.args);
    onValidChange(isValid);
  }, [formData, call.args, onFormChange, onValidChange]);

  const handleFieldChange = createFieldChangeHandler(setFormData);

  const renderField = (arg: { name: string; type: string }) => {
    const fieldType = parseSimpleType(arg.type);
    const value = formData[arg.name] || "";
    const paramInfo = getParameterEducation(arg.name, arg.type);

    return (
      <div key={arg.name} className="space-y-2 p-3 bg-muted/5 rounded-md border border-muted/30">
        {/* Inline Parameter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-foreground">
              {arg.name}
            </Label>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              {arg.type}
            </Badge>
            <div
              className="cursor-help"
              title={`${paramInfo.description}${paramInfo.tipForBeginners ? " - " + paramInfo.tipForBeginners : ""}`}
            >
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Compact help text */}
        <div className="text-xs text-muted-foreground">
          {paramInfo.description}
        </div>

        {fieldType === "bool" && (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) =>
                handleFieldChange(arg.name, checked)
              }
            />
            <Label>Enable</Label>
          </div>
        )}

        {fieldType === "number" && (
          <div className="space-y-1">
            <Input
              type="number"
              step="0.0001"
              value={arg.name === "value" || arg.name === "amount" ?
                (value / Math.pow(10, chainProperties.tokenDecimals)).toString() : value}
              onChange={(e) => {
                if (arg.name === "value" || arg.name === "amount") {
                  // Convert from token units to planck units
                  const tokenAmount = Number(e.target.value) || 0;
                  const planckAmount = Math.floor(tokenAmount * Math.pow(10, chainProperties.tokenDecimals));
                  handleFieldChange(arg.name, planckAmount);
                } else {
                  handleFieldChange(arg.name, Number(e.target.value) || 0);
                }
              }}
              placeholder={arg.name === "value" || arg.name === "amount" ?
                `Enter amount in ${chainProperties.tokenSymbol} (e.g., 1.0)` :
                `Enter ${arg.name}${paramInfo.examples[0] ? ` (e.g., ${paramInfo.examples[0]})` : ""}`}
            />
            {arg.name === "value" || arg.name === "amount" ? (
              <div className="text-xs text-muted-foreground">
                <p>Enter amount in {chainProperties.tokenSymbol} (will be converted to planck units automatically)</p>
                {value > 0 && (
                  <p className="font-mono">
                    = {value.toLocaleString()} planck units
                  </p>
                )}
              </div>
            ) : null}
          </div>
        )}

        {fieldType === "account" && (
          <div className="space-y-2">
            <div className="relative">
              <Input
                value={value}
                onChange={(e) => handleFieldChange(arg.name, e.target.value)}
                placeholder="Enter account address (e.g., 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY)"
                className={`font-mono text-sm pr-8 ${
                  value && !value.startsWith('//') && value.length > 0
                    ? (value.length >= 47 && value.length <= 48 && value.match(/^[1-9A-HJ-NP-Za-km-z]+$/))
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-red-500 focus:border-red-500'
                    : ''
                }`}
              />
              {value && !value.startsWith('//') && value.length > 0 && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {(value.length >= 47 && value.length <= 48 && value.match(/^[1-9A-HJ-NP-Za-km-z]+$/)) ? (
                    <span className="text-green-500 text-xs">✓</span>
                  ) : (
                    <span className="text-red-500 text-xs">✗</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground">Quick select:</span>
              <button
                type="button"
                onClick={() => handleFieldChange(arg.name, "//Alice")}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
              >
                Alice
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(arg.name, "//Bob")}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
              >
                Bob
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(arg.name, "//Charlie")}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
              >
                Charlie
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(arg.name, "//Dave")}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
              >
                Dave
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(arg.name, "//Eve")}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
              >
                Eve
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Enter any valid Substrate address or use quick select for test accounts
            </p>
          </div>
        )}

        {fieldType === "string" && (
          <div className="space-y-1">
            <Input
              value={value}
              onChange={(e) => handleFieldChange(arg.name, e.target.value)}
              placeholder={`Enter ${arg.name}${paramInfo.examples[0] ? ` (e.g., ${paramInfo.examples[0]})` : ""}`}
            />
            {arg.name === "remark" && (
              <p className="text-xs text-muted-foreground">
                💡 Text stored permanently on-chain. Keep it concise to save
                fees.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Call Header - No Card */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          {pallet}.{call.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {call.docs.length > 0
            ? call.docs.join(" ")
            : "Configure the parameters for this call"}
        </p>
      </div>

      {/* TypeScript Type Information - Inline Compact */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-start justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowTypeInfo(!showTypeInfo)}
        >
          <div className="flex items-start space-x-2 flex-1 min-w-0">
            <Code2 className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="font-mono text-xs text-foreground overflow-hidden text-left">
              <div className="break-words leading-relaxed text-xs">
                <span className="text-pink-600">{call.name}</span>
                <span className="text-muted-foreground">: </span>
                <span className="text-purple-600">TxDescriptor</span>
                <span className="text-gray-400">&lt;</span>
                <span className="text-gray-500 whitespace-nowrap">&#123;</span>
                {typeInfo.parameters.map((param, index) => (
                  <span key={index} className="inline-block">
                    <span className="text-foreground">{param.name}</span>
                    <span className="text-gray-400">: </span>
                    <span className="text-purple-600">{param.type}</span>
                    {index < typeInfo.parameters.length - 1 && <span className="text-gray-400">; </span>}
                  </span>
                ))}
                <span className="text-gray-500 whitespace-nowrap">&#125;</span>
                <span className="text-gray-400">&gt;</span>
              </div>
            </div>
          </div>
          {showTypeInfo ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
          )}
        </button>

        {showTypeInfo && (
          <div className="max-h-48 overflow-y-auto p-3 bg-muted/10 rounded-md border border-muted/50">
            <CallSignature 
              typeInfo={typeInfo}
              description={call.docs.length > 0 ? call.docs.join(" ") : undefined}
            />
          </div>
        )}
      </div>

      {/* Parameters - Direct Layout */}
      <div className="space-y-3">
        {call.args.length > 0 && (
          <h4 className="text-sm font-medium text-foreground border-b border-muted pb-1">
            Parameters ({call.args.length})
          </h4>
        )}
        
        {call.args.map(renderField)}

        {call.args.length === 0 && (
          <div className="text-center text-muted-foreground py-6 bg-muted/10 rounded-md border border-dashed border-muted">
            This call has no parameters
          </div>
        )}
      </div>
    </div>
  );
}

// Form helper functions moved to utils/formHelpers.ts
// Parameter education functions moved to data/parameter-education/index.ts
