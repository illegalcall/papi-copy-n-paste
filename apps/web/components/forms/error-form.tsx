"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Label } from "@workspace/ui/components/label";
import { AlertTriangle, Code2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { PalletError } from "@workspace/core";
import { generateErrorSignature } from "@/utils/typeExtraction";
import { CallSignature } from "@/components/type-display";

interface ErrorFormProps {
  pallet: string;
  error: PalletError;
  chainKey: string;
}

export function ErrorForm({ pallet, error, chainKey }: ErrorFormProps) {
  const [showTypeInfo, setShowTypeInfo] = useState(true);
  const [showExamples, setShowExamples] = useState(false);

  // Generate TypeScript type information
  const typeInfo = generateErrorSignature(pallet, error.name);

  // Generate some context about when this error might occur
  const generateErrorContext = (palletName: string, errorName: string): string => {
    const contexts: Record<string, Record<string, string>> = {
      Balances: {
        VestingBalance: "Occurs when trying to transfer from an account that has vesting restrictions",
        LiquidityRestrictions: "Happens when account doesn't have enough free (non-reserved) balance",
        InsufficientBalance: "Triggered when trying to transfer more tokens than available",
        KeepAlive: "Occurs when a transfer would result in killing an account that must stay alive",
      },
      Staking: {
        NotController: "Happens when account is not the controller of a stash account",
        NotStash: "Occurs when account is not a stash account but is required to be",
        AlreadyBonded: "Triggered when trying to bond an already bonded account",
        AlreadyPaired: "Occurs when trying to pair accounts that are already paired",
        EmptyTargets: "Happens when no nomination targets are provided",
      },
      System: {
        InvalidSpecName: "Occurs when runtime spec name doesn't match expected value",
        NonDefaultComposite: "Happens with invalid composite key usage",
        NonZeroRefCount: "Triggered when trying to kill account with outstanding references",
        CallFiltered: "Occurs when call is filtered out by runtime filter",
      },
      Democracy: {
        ValueLow: "Happens when proposal deposit is too low",
        ProposalMissing: "Occurs when referenced proposal doesn't exist",
        BadIndex: "Triggered when referendum index is invalid",
        AlreadyVetoed: "Happens when proposal was already vetoed by council",
        NotVoter: "Occurs when account hasn't voted on referendum",
      }
    };

    return contexts[palletName]?.[errorName] ||
           "This error can occur during runtime execution when specific conditions are not met";
  };

  const errorContext = generateErrorContext(pallet, error.name);

  const generateCodeExamples = (palletName: string, errorName: string): string[] => {
    const examples = [];

    // Error handling example
    examples.push(`// Handling ${palletName}::${errorName}
try {
  const result = await transaction.signAndSubmit(signer);
  console.log('Success:', result);
} catch (error) {
  if (error.message.includes('${errorName}')) {
    console.error('${errorName}:', error.message);
    // Handle this specific error case
  }
}`);

    // Error checking example
    examples.push(`// Checking for ${palletName}::${errorName} in transaction result
const result = await transaction.signAndSubmit(signer);
if (result.type === 'txError' && result.value.type === '${palletName}' && result.value.value.type === '${errorName}') {
  console.log('Transaction failed with ${errorName}');
  // Handle error appropriately
}`);

    return examples;
  };

  const codeExamples = generateCodeExamples(pallet, error.name);

  return (
    <div className="space-y-4">
      {/* Error Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="text-lg font-semibold text-foreground">
            {pallet}.{error.name}
          </h3>
          <Badge variant="outline" className="text-xs bg-amber-50 border-amber-200">Error Type</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {error.docs?.[0] || "Runtime error that can occur during execution"}
        </p>
      </div>

      {/* Error Context */}
      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <strong>When this error occurs:</strong> {errorContext}
        </div>
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
              <span className="text-pink-600">{error.name}</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-red-600">DispatchError</span>
              <span className="text-gray-400">::</span>
              <span className="text-amber-600">Module</span>
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
              description={error.docs?.[0] || "Runtime error that can occur during execution"}
            />
          </div>
        )}
      </div>

      {/* Code Examples */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
          onClick={() => setShowExamples(!showExamples)}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">Error Handling Examples</span>
            <Badge variant="outline" className="text-xs">TypeScript</Badge>
          </div>
          {showExamples ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showExamples && (
          <div className="bg-muted/20 rounded-md p-3 border border-muted space-y-4">
            {codeExamples.map((example, index) => (
              <div key={index}>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Example {index + 1}:
                </div>
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap bg-muted/50 p-2 rounded">
                  {example}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Information */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>
          <strong>Pallet:</strong> {pallet}
        </div>
        <div>
          <strong>Error Name:</strong> {error.name}
        </div>
        <div>
          <strong>Type:</strong> {typeof error.type === 'string' ? error.type : 'unknown'}
        </div>
        <div className="text-amber-600">
          ⚠️ This error can be thrown during transaction execution
        </div>
        <div className="text-blue-500">
          💡 Handle this error in your try-catch blocks for robust error handling
        </div>
        <div className="text-green-500">
          📚 Use error information to provide meaningful feedback to users
        </div>
      </div>
    </div>
  );
}