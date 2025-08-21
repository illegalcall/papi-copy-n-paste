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

interface SimpleCallFormProps {
  pallet: string;
  call: PalletCall;
  onFormChange: FormChangeHandler;
  onValidChange: ValidChangeHandler;
}

// This function is now replaced by external data source
// See: data/transaction-templates/index.ts

export function SimpleCallForm({
  pallet,
  call,
  onFormChange,
  onValidChange,
}: SimpleCallFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [showTypeInfo, setShowTypeInfo] = useState(true);

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
              value={value}
              onChange={(e) =>
                handleFieldChange(arg.name, Number(e.target.value) || 0)
              }
              placeholder={`Enter ${arg.name}${paramInfo.examples[0] ? ` (e.g., ${paramInfo.examples[0]})` : ""}`}
            />
            {arg.name === "value" || arg.name === "amount" ? (
              <p className="text-xs text-muted-foreground">
                {value > 0 &&
                  `≈ ${(Number(value) / 10000000000).toFixed(4)} DOT`}
              </p>
            ) : null}
          </div>
        )}

        {fieldType === "account" && (
          <div className="space-y-1">
            <Select
              value={value}
              onValueChange={(val) => handleFieldChange(arg.name, val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select test account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="//Alice">Alice (5GrwvaEF...)</SelectItem>
                <SelectItem value="//Bob">Bob (5FHneW46...)</SelectItem>
                <SelectItem value="//Charlie">Charlie (5FLSigC9...)</SelectItem>
                <SelectItem value="//Dave">Dave (5DAAnrj7...)</SelectItem>
                <SelectItem value="//Eve">Eve (5HGjWAeF...)</SelectItem>
              </SelectContent>
            </Select>
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
