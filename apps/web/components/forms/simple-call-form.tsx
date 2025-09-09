"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
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
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { PalletCall } from "@workspace/core";
import { HelpCircle, Info, Code2, ChevronDown, ChevronUp } from "lucide-react";

interface SimpleCallFormProps {
  pallet: string;
  call: PalletCall;
  onFormChange: (formData: Record<string, any>) => void;
  onValidChange: (isValid: boolean) => void;
}

// Generate expected transaction response structure
function generateTransactionResponseStructure(
  pallet: string,
  callName: string,
): string {
  // Get specific response examples based on pallet and call
  const getTransactionExample = (pallet: string, callName: string): string => {
    // Common transaction responses based on pallet/call combinations
    if (pallet === "Balances" && callName.includes("transfer")) {
      return `{
  success: true,
  txHash: "0x1234567890abcdef...",
  blockHash: "0xabcdef1234567890...",
  blockNumber: 12345678,
  events: [
    {
      pallet: "Balances",
      event: "Transfer",
      data: {
        from: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        to: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        amount: 1000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess",
      data: { dispatchInfo: { weight: 195000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 5000000n,
    adjustedWeightFee: 1945000n,
    total: 131945000n
  }
}`;
    }

    if (pallet === "System" && callName === "remark") {
      return `{
  success: true,
  txHash: "0x9876543210fedcba...",
  blockHash: "0xfedcba0987654321...",
  blockNumber: 12345679,
  events: [
    {
      pallet: "System",
      event: "Remarked",
      data: {
        sender: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        hash: "0x1234567890abcdef..."
      }
    },
    {
      pallet: "System", 
      event: "ExtrinsicSuccess",
      data: { dispatchInfo: { weight: 125000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 3000000n,
    adjustedWeightFee: 1250000n,
    total: 129250000n
  }
}`;
    }

    if (pallet === "Staking") {
      return `{
  success: true,
  txHash: "0xabcd1234efgh5678...",
  blockHash: "0x5678abcd1234efgh...",
  blockNumber: 12345680,
  events: [
    {
      pallet: "Staking",
      event: "${callName === "bond" ? "Bonded" : callName === "unbond" ? "Unbonded" : "StakingEvent"}",
      data: {
        stash: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        amount: 10000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess", 
      data: { dispatchInfo: { weight: 500000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 4000000n,
    adjustedWeightFee: 5000000n,
    total: 134000000n
  }
}`;
    }

    // Generic transaction response
    return `{
  success: true,
  txHash: "0x1234567890abcdef...",
  blockHash: "0xabcdef1234567890...",
  blockNumber: 12345678,
  events: [
    {
      pallet: "${pallet}",
      event: "OperationCompleted", // Event name varies by operation
      data: {
        // Operation-specific data
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess",
      data: { 
        dispatchInfo: { 
          weight: 250000000, 
          class: "Normal",
          paysFee: "Yes"
        } 
      }
    }
  ],
  fees: {
    baseFee: 125000000n,      // Base transaction fee
    lengthFee: 5000000n,      // Fee based on tx size
    adjustedWeightFee: 2500000n, // Fee based on computational weight
    total: 132500000n         // Total fees paid
  }
}`;
  };

  const example = getTransactionExample(pallet, callName);

  return `Promise<TransactionResult>\n\n// Example successful response:\n${example}\n\n// Example error response:\n{
  success: false,
  error: "InsufficientBalance",
  txHash: null,
  events: [],
  fees: null
}`;
}

export function SimpleCallForm({
  pallet,
  call,
  onFormChange,
  onValidChange,
}: SimpleCallFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [showResponseStructure, setShowResponseStructure] = useState(false);

  // Generate response structure dynamically
  const responseStructure = generateTransactionResponseStructure(
    pallet,
    call.name,
  );

  // Initialize form data when call changes
  useEffect(() => {
    const initialData: Record<string, any> = {};
    call.args.forEach((arg) => {
      initialData[arg.name] = getDefaultValue(arg.type);
    });
    setFormData(initialData);
    setInitialValues(initialData);
  }, [call]);

  // Notify parent of changes
  useEffect(() => {
    onFormChange(formData);

    // Validation logic:
    // - If call has no parameters, disable run button (no input = can't run)
    // - If call has parameters, check if user has modified any values from defaults
    const hasUserInput =
      call.args.length > 0 &&
      call.args.some((arg) => {
        const currentValue = formData[arg.name];
        const initialValue = initialValues[arg.name];
        return currentValue !== initialValue;
      });
    onValidChange(hasUserInput);
  }, [formData, initialValues, call.args, onFormChange, onValidChange]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderField = (arg: { name: string; type: string }) => {
    const fieldType = parseSimpleType(arg.type);
    const value = formData[arg.name] || "";
    const paramInfo = getParameterEducation(arg.name, arg.type);

    return (
      <div key={arg.name} className="space-y-2">
        <Label className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {arg.name}
            <div
              className="cursor-help"
              title={`${paramInfo.description}${paramInfo.tipForBeginners ? " - " + paramInfo.tipForBeginners : ""}`}
            >
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {arg.type}
            </Badge>
          </div>
        </Label>

        {/* Parameter help text */}
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {pallet}.{call.name}
        </CardTitle>
        <CardDescription>
          {call.docs.length > 0
            ? call.docs.join(" ")
            : "Configure the parameters for this call"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {call.args.map(renderField)}

          {call.args.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              This call has no parameters
            </div>
          )}

          {/* Transaction Response Structure */}
          <div className="space-y-2 border-t pt-4">
            <button
              type="button"
              className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setShowResponseStructure(!showResponseStructure)}
            >
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Expected Transaction Response
                </span>
                <Badge variant="outline" className="text-xs">
                  Dynamic
                </Badge>
              </div>
              {showResponseStructure ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showResponseStructure && (
              <div className="bg-muted/20 rounded-md p-3 border border-muted">
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {responseStructure}
                </pre>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="text-blue-600">
                    ✨ Generated based on {pallet}.{call.name} transaction type
                  </div>
                  <div>
                    Includes success/error cases, events, fees, and blockchain
                    data
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function parseSimpleType(type: string): string {
  if (type.includes("Bool") || type === "bool") return "bool";
  if (type.includes("AccountId") || type.includes("MultiAddress"))
    return "account";
  if (
    type.includes("u8") ||
    type.includes("u16") ||
    type.includes("u32") ||
    type.includes("u64") ||
    type.includes("u128") ||
    type.includes("Compact")
  )
    return "number";
  return "string";
}

function getDefaultValue(type: string): any {
  const simpleType = parseSimpleType(type);
  switch (simpleType) {
    case "bool":
      return false;
    case "number":
      return 0;
    case "account":
      return "//Alice";
    default:
      return "";
  }
}

function getParameterEducation(paramName: string, paramType: string) {
  const paramEducation: Record<
    string,
    {
      description: string;
      examples: string[];
      commonMistakes: string[];
      tipForBeginners?: string;
    }
  > = {
    dest: {
      description:
        "Destination account address - where you want to send tokens",
      examples: [
        "//Alice",
        "//Bob",
        "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      ],
      commonMistakes: ["Sending to wrong address"],
      tipForBeginners: "Always verify the destination address before sending!",
    },
    value: {
      description: "Amount in planck units (10^10 planck = 1 DOT)",
      examples: ["10000000000", "5000000000", "100000000000"],
      commonMistakes: ["Sending more than balance"],
      tipForBeginners:
        "DOT has 10 decimal places. 1 DOT = 10,000,000,000 planck",
    },
    amount: {
      description: "Quantity for the operation in planck units",
      examples: ["10000000000", "5000000000"],
      commonMistakes: ["Wrong units", "Amount exceeds balance"],
      tipForBeginners: "Check minimum requirements for this operation",
    },
    who: {
      description: "Target account to perform the action on",
      examples: ["//Alice", "//Bob"],
      commonMistakes: [
        "No permission to act on account",
        "Account doesn't exist",
      ],
    },
    target: {
      description: "Target account, value, or object for the operation",
      examples: ["//Validator", "targetAddress"],
      commonMistakes: ["Target doesn't exist", "No permission"],
    },
    remark: {
      description: "Text data to store permanently on the blockchain",
      examples: ['"Hello World"', '"Transaction memo"'],
      commonMistakes: ["Storing sensitive data", "Too much text (expensive)"],
      tipForBeginners: "Keep it short - you pay for storage!",
    },
  };

  return (
    paramEducation[paramName] || {
      description: `Parameter of type ${paramType}`,
      examples: [],
      commonMistakes: [],
    }
  );
}
