"use client";

import { memo, useCallback, useState, useRef } from "react";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Textarea } from "@workspace/ui/components/textarea";
import { Upload, AlertCircle, Clipboard } from "lucide-react";
import type { ContractType } from "@workspace/core/contracts/types";

interface ContractUploadProps {
  contractType: ContractType;
  onMetadataLoaded: (file: File) => void;
  onAbiPasted?: (abiJson: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ContractUpload = memo(function ContractUpload({
  contractType,
  onMetadataLoaded,
  onAbiPasted,
  isLoading,
  error,
}: ContractUploadProps) {
  const [showPaste, setShowPaste] = useState(false);
  const [pastedAbi, setPastedAbi] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onMetadataLoaded(file);
      }
    },
    [onMetadataLoaded],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        onMetadataLoaded(file);
      }
    },
    [onMetadataLoaded],
  );

  const handlePasteSubmit = useCallback(() => {
    if (pastedAbi.trim() && onAbiPasted) {
      onAbiPasted(pastedAbi.trim());
      setPastedAbi("");
      setShowPaste(false);
    }
  }, [pastedAbi, onAbiPasted]);

  const acceptTypes = contractType === "ink" ? ".contract,.json" : ".json";
  const description =
    contractType === "ink"
      ? "Upload .contract or metadata.json from cargo-contract"
      : "Upload ABI JSON file (or Hardhat/Foundry artifact)";

  return (
    <div className="space-y-3">
      <div
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Click or drag and drop
        </p>
      </div>

      {contractType === "evm" && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPaste(!showPaste)}
            className="text-xs"
          >
            <Clipboard className="h-3 w-3 mr-1" />
            {showPaste ? "Hide" : "Paste ABI JSON"}
          </Button>

          {showPaste && (
            <div className="mt-2 space-y-2">
              <Textarea
                placeholder='[{"type":"function","name":"balanceOf",...}]'
                value={pastedAbi}
                onChange={(e) => setPastedAbi(e.target.value)}
                className="font-mono text-xs h-24"
              />
              <Button
                size="sm"
                onClick={handlePasteSubmit}
                disabled={!pastedAbi.trim()}
              >
                Parse ABI
              </Button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground">Parsing metadata...</p>
      )}

      {error && (
        <Alert className="border-destructive text-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
});
