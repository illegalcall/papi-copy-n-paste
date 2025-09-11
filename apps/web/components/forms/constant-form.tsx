"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Label } from "@workspace/ui/components/label";
import { Settings, HelpCircle, Code2, ChevronDown, ChevronUp } from "lucide-react";

interface ConstantFormProps {
  pallet: string;
  constant: any;
}

export function ConstantForm({ pallet, constant }: ConstantFormProps) {
  const [showDetails, setShowDetails] = useState(true);

  const formatConstantValue = (value: any, type: string): string => {
    if (value === null || value === undefined) return "null";
    
    // Handle different value types
    if (typeof value === "string") {
      // Handle hex values - convert to decimal
      if (value.startsWith('0x')) {
        try {
          const hexValue = value;
          const decimalValue = BigInt(hexValue).toString();
          return `${decimalValue} (${hexValue})`;
        } catch {
          return value;
        }
      }
      
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

  const getDisplayType = (type: any): string => {
    // Clean up complex types for display
    const typeStr = typeof type === 'string' ? type : String(type || '');
    return typeStr.replace(/^sp_runtime::|^frame_|^pallet_/, '');
  };

  const getTypeExplanation = (type: any, name: string): string | null => {
    // Ensure type is a string
    const typeStr = typeof type === 'string' ? type : String(type || '');
    const nameStr = typeof name === 'string' ? name : String(name || '');
    
    if (typeStr === "u128" && nameStr.toLowerCase().includes("deposit")) {
      return "💰 Amount in plancks (1 DOT = 10¹⁰ plancks)";
    }
    if (typeStr === "u32" && nameStr.toLowerCase().includes("period")) {
      return "⏰ Time period in blocks (~6 seconds per block)";
    }
    if (typeStr.includes("Permill")) {
      return "📊 Percentage in parts per million (1,000,000 = 100%)";
    }
    if (typeStr.includes("Percent")) {
      return "📊 Percentage (100 = 100%)";
    }
    if (typeStr === "u32" && nameStr.toLowerCase().includes("max")) {
      return "🔢 Maximum allowed value";
    }
    if (typeStr.includes("Weight")) {
      return "⚖️ Computational weight units for block limits";
    }
    return null;
  };

  const displayValue = formatConstantValue(constant.value, constant.type);
  const isComplexValue = displayValue.includes('\n');
  const typeExplanation = getTypeExplanation(constant.type, constant.name);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          {pallet}.{constant.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          Compile-time configuration value from the {pallet} pallet
        </p>
      </div>

      {/* Constant Overview */}
      <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono">
            {getDisplayType(constant.type)}
          </Badge>
          {constant.docs && constant.docs.length > 0 && (
            <div
              className="cursor-help"
              title={constant.docs.join(" ")}
            >
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

      {/* Documentation */}
      {constant.docs && constant.docs.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm font-medium">Description:</Label>
          <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded border max-h-32 overflow-y-auto">
            {constant.docs.join(" ")}
          </div>
        </div>
      )}

      {/* Type Explanation */}
      {typeExplanation && (
        <div className="text-sm text-blue-600 bg-blue-50 dark:bg-blue-950/20 p-2 rounded border">
          {typeExplanation}
        </div>
      )}

      {/* Constant Value */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Current Value</Label>
          </div>
          {showDetails ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {showDetails && (
          <div className="space-y-1">
            {isComplexValue ? (
              <pre className="text-xs font-mono p-3 bg-muted/20 rounded border overflow-x-auto max-h-48">
                <code>{displayValue}</code>
              </pre>
            ) : (
              <div className="text-sm font-mono p-3 bg-muted/20 rounded border break-all overflow-x-auto max-h-48">
                {displayValue}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Usage Example */}
      <div className="space-y-1">
        <Label className="text-sm font-medium">Usage in Code:</Label>
        <div className="text-xs font-mono p-3 bg-muted/20 rounded border break-all overflow-x-auto">
          const {constant.name.toLowerCase()} = await typedApi.constants.{pallet}.{constant.name}()
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t">
        <div className="text-sm text-muted-foreground flex-1 break-words">
          Copy the generated code to use this constant in your project
        </div>
      </div>
    </div>
  );
}