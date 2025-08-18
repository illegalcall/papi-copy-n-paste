"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Label } from "@workspace/ui/components/label";
import { HelpCircle, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { PalletConstant } from "@workspace/core";

interface ConstantsFormProps {
  pallet: string;
  constants: PalletConstant[];
}

export function ConstantsForm({ pallet, constants }: ConstantsFormProps) {
  const [showConstants, setShowConstants] = useState(true);

  const formatConstantValue = (value: any): string => {
    if (value === null || value === undefined) return "null";
    
    // Handle different value types
    if (typeof value === "string") {
      // Try to parse JSON values for complex types
      if (value.startsWith('{"') || value.startsWith('[')) {
        try {
          const parsed = JSON.parse(value);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return value;
        }
      }
      return value;
    }
    
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    
    return String(value);
  };

  const getDisplayType = (type: string): string => {
    // Clean up complex types for display
    return type.replace(/^sp_runtime::|^frame_|^pallet_/, '');
  };

  const renderConstant = (constant: PalletConstant) => {
    const displayValue = formatConstantValue(constant.value);
    const isComplexValue = displayValue.includes('\n');
    
    return (
      <div key={constant.name} className="space-y-2 p-3 bg-muted/5 rounded-md border border-muted/30">
        {/* Constant Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-foreground">
              {constant.name}
            </Label>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 font-mono">
              {getDisplayType(constant.type)}
            </Badge>
            <div
              className="cursor-help"
              title={constant.docs.join(" ")}
            >
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Constant Documentation */}
        {constant.docs.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {constant.docs.join(" ")}
          </div>
        )}

        {/* Constant Value */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Value:</Label>
          {isComplexValue ? (
            <pre className="text-xs font-mono p-2 bg-muted/20 rounded border overflow-x-auto">
              <code>{displayValue}</code>
            </pre>
          ) : (
            <div className="text-sm font-mono p-2 bg-muted/20 rounded border">
              {displayValue}
            </div>
          )}
        </div>

        {/* Type Explanation for Common Types */}
        {constant.type === "u128" && constant.name.includes("Deposit") && (
          <div className="text-xs text-blue-600">
            💰 Amount in plancks (1 DOT = 10¹⁰ plancks)
          </div>
        )}
        {constant.type === "u32" && constant.name.includes("Period") && (
          <div className="text-xs text-green-600">
            ⏰ Time period in blocks (~6 seconds per block)
          </div>
        )}
        {constant.type === "Permill" && (
          <div className="text-xs text-purple-600">
            📊 Percentage in parts per million (1,000,000 = 100%)
          </div>
        )}
      </div>
    );
  };

  if (!constants || constants.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-6 bg-muted/10 rounded-md border border-dashed border-muted">
        This pallet has no constants
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Constants Header */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          {pallet} Constants
        </h3>
        <p className="text-sm text-muted-foreground">
          Compile-time configuration values for this pallet
        </p>
      </div>

      {/* Constants Toggle */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowConstants(!showConstants)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Code2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <div className="text-sm text-foreground">
              <span className="font-medium">Constants ({constants.length})</span>
              <span className="text-muted-foreground ml-2">
                Configuration values for {pallet}
              </span>
            </div>
          </div>
          {showConstants ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          )}
        </button>

        {showConstants && (
          <div className="space-y-3">
            {constants.map(renderConstant)}
          </div>
        )}
      </div>
    </div>
  );
}