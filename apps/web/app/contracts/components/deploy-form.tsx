"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Loader2, Rocket } from "lucide-react";
import type { UnifiedMethod } from "@workspace/core/contracts/types";

interface DeployFormProps {
  constructors: UnifiedMethod[];
  onDeploy: (
    constructorName: string,
    args: Record<string, string>,
    codeHash: string,
    value?: bigint,
  ) => void;
  isDeploying?: boolean;
  error?: string | null;
}

export const DeployForm = memo(function DeployForm({
  constructors,
  onDeploy,
  isDeploying,
  error,
}: DeployFormProps) {
  const [selectedConstructor, setSelectedConstructor] = useState(
    constructors[0]?.name ?? "",
  );
  const [codeHash, setCodeHash] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [payableValue, setPayableValue] = useState("");

  // Re-init when constructors change (e.g. loading a different contract)
  useEffect(() => {
    setSelectedConstructor(constructors[0]?.name ?? "");
    setFormData({});
    setPayableValue("");
  }, [constructors]);

  const constructor = constructors.find((c) => c.name === selectedConstructor);

  const handleDeploy = useCallback(() => {
    if (!constructor || !codeHash) return;
    let value: bigint | undefined;
    try {
      value = payableValue ? BigInt(payableValue) : undefined;
    } catch {
      return; // invalid BigInt input, ignore
    }
    onDeploy(selectedConstructor, formData, codeHash, value);
  }, [selectedConstructor, formData, codeHash, payableValue, constructor, onDeploy]);

  if (constructors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No constructors found in the contract metadata.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Rocket className="h-4 w-4" />
        Deploy Contract
      </h3>

      {/* Constructor Selection */}
      {constructors.length > 1 && (
        <div>
          <Label className="text-xs">Constructor</Label>
          <select
            value={selectedConstructor}
            onChange={(e) => setSelectedConstructor(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm bg-background"
          >
            {constructors.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Code Hash */}
      <div>
        <Label className="text-xs">Code Hash</Label>
        <Input
          placeholder="0x..."
          value={codeHash}
          onChange={(e) => setCodeHash(e.target.value)}
          className="font-mono text-xs"
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          The code hash from a previous code upload
        </p>
      </div>

      {/* Constructor Parameters */}
      {constructor && constructor.args.length > 0 && (
        <div className="space-y-2">
          {constructor.args.map((arg) => (
            <div key={arg.name}>
              <Label className="text-xs">
                {arg.name}{" "}
                <span className="text-muted-foreground font-mono">({arg.type})</span>
              </Label>
              <Input
                placeholder={arg.type}
                value={formData[arg.name] ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [arg.name]: e.target.value }))
                }
                className="font-mono text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* Payable Value */}
      {constructor?.isPayable && (
        <div>
          <Label className="text-xs">Value (smallest unit)</Label>
          <Input
            placeholder="0"
            value={payableValue}
            onChange={(e) => setPayableValue(e.target.value)}
            className="font-mono text-xs"
          />
        </div>
      )}

      {error && (
        <Alert className="border-destructive text-destructive">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleDeploy}
        disabled={isDeploying || !codeHash}
        className="w-full"
      >
        {isDeploying ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Deploying...
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4 mr-2" />
            Deploy
          </>
        )}
      </Button>
    </div>
  );
});
