"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Play, Square, Plus, X, List, Eye, EyeOff, Wallet } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { EnhancedCallForm } from "@/components/forms/enhanced-call-form";
import { StorageForm } from "@/components/forms/storage-form";
import { ConstantForm } from "@/components/forms/constant-form";
import { ErrorForm } from "@/components/forms/error-form";
import { EventForm } from "@/components/forms/event-form";
import { PalletCall, PalletConstant, PalletError, PalletEvent } from "@workspace/core";

interface CenterPaneProps {
  chainStatus: "connecting" | "ready" | "error";
  selectedChain: string;
  selectedCall?: { pallet: string; call: PalletCall };
  selectedStorage?: { pallet: string; storage: any };
  selectedConstant?: { pallet: string; constant: PalletConstant };
  selectedError?: { pallet: string; error: PalletError };
  selectedEvent?: { pallet: string; event: PalletEvent };
  methodQueue: Array<{
    pallet: string;
    call: PalletCall;
    formData: Record<string, any>;
    id: string;
  }>;
  storageQueue: Array<{
    pallet: string;
    storage: any;
    queryType: string;
    storageParams: Record<string, any>;
    id: string;
  }>;
  onFormChange: (formData: Record<string, any>) => void;
  onValidChange: (isValid: boolean) => void;
  onRunClick: () => void;
  onWalletSignAndExecute?: () => void;
  onStopWatch?: () => void;
  onAbortClick: () => void;
  onAddToQueue: () => void;
  onRemoveFromQueue: (id: string) => void;
  onClearQueue: () => void;
  onAddStorageToQueue: () => void;
  onRemoveStorageFromQueue: (id: string) => void;
  onClearStorageQueue: () => void;
  isRunning: boolean;
  isWatching?: boolean;
  canRun: boolean;
  canRunStorage: boolean;
  // Storage query props
  storageQueryType?: string;
  storageParams?: Record<string, any>;
  onStorageQueryTypeChange?: (queryType: string) => void;
  onStorageParamsChange?: (params: Record<string, any>) => void;
  onStorageValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}


export function CenterPane({
  chainStatus,
  selectedChain,
  selectedCall,
  selectedStorage,
  selectedConstant,
  selectedError,
  selectedEvent,
  methodQueue,
  storageQueue,
  onFormChange,
  onValidChange,
  onRunClick,
  onWalletSignAndExecute,
  onStopWatch,
  onAbortClick,
  onAddToQueue,
  onRemoveFromQueue,
  onClearQueue,
  onAddStorageToQueue,
  onRemoveStorageFromQueue,
  onClearStorageQueue,
  isRunning,
  isWatching = false,
  canRun,
  canRunStorage,
  storageQueryType = "getValue",
  storageParams = {},
  onStorageQueryTypeChange,
  onStorageParamsChange,
  onStorageValidationChange,
}: CenterPaneProps) {
  const { isConnected: isWalletConnected } = useWallet();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connecting":
        return "bg-yellow-500";
      case "ready":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${getStatusColor(chainStatus)}`}
          />
          <span className="text-sm text-muted-foreground">
            {chainStatus === "connecting" && "Connecting to chain..."}
            {chainStatus === "ready" && `Connected to ${selectedChain}`}
            {chainStatus === "error" && "Connection failed"}
          </span>
        </div>
      </div>

      {/* Method Queue Display */}
      {methodQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Method Queue ({methodQueue.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearQueue}
                disabled={isRunning}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Methods will be executed sequentially. If any method fails,
              execution will stop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {methodQueue.map((method, index) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <div className="font-medium">
                        {method.pallet}.{method.call.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {method.call.args.length} argument
                        {method.call.args.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromQueue(method.id)}
                    disabled={isRunning}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Storage Queue Display */}
      {storageQueue.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Storage Queue ({storageQueue.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearStorageQueue}
                disabled={isRunning}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Storage queries will be executed sequentially. If any query fails,
              execution will continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {storageQueue.map((query, index) => (
                <div
                  key={query.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <div className="font-medium">
                        {query.pallet}.{query.storage.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Query Type: {query.queryType}
                      </div>
                      {Object.keys(query.storageParams).length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Params: {JSON.stringify(query.storageParams)}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveStorageFromQueue(query.id)}
                    disabled={isRunning}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCall ? (
        <EnhancedCallForm
          key={`${selectedCall.pallet}-${selectedCall.call.name}`}
          pallet={selectedCall.pallet}
          callName={selectedCall.call.name}
          onFormChange={onFormChange}
          onValidChange={onValidChange}
          chainKey={selectedChain}
        />
      ) : selectedStorage ? (
        <StorageForm
          pallet={selectedStorage.pallet}
          storage={selectedStorage.storage}
          chainKey={selectedChain}
          queryType={storageQueryType || "getValue"}
          storageParams={storageParams || {}}
          onQueryTypeChange={onStorageQueryTypeChange || (() => {})}
          onParamsChange={onStorageParamsChange || (() => {})}
          onValidationChange={onStorageValidationChange}
        />
      ) : selectedConstant ? (
        <ConstantForm
          key={`${selectedConstant.pallet}-${selectedConstant.constant.name}`}
          pallet={selectedConstant.pallet}
          constant={selectedConstant.constant}
          chainKey={selectedChain}
        />
      ) : selectedError ? (
        <ErrorForm
          key={`${selectedError.pallet}-${selectedError.error.name}`}
          pallet={selectedError.pallet}
          error={selectedError.error}
          chainKey={selectedChain}
        />
      ) : selectedEvent ? (
        <EventForm
          key={`${selectedEvent.pallet}-${selectedEvent.event.name}`}
          pallet={selectedEvent.pallet}
          event={selectedEvent.event}
          chainKey={selectedChain}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select a Pallet Item</CardTitle>
            <CardDescription>
              Choose a call (to execute transactions), storage item (to query
              data), constant (to get fixed values), or error (to see error details) from the left panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              {chainStatus === "ready"
                ? "Select a chain and explore the available pallets"
                : "Connecting to chain..."}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-4 inset-x-4 lg:relative lg:bottom-auto lg:inset-x-auto lg:mt-6">
        <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
          {/* Single method run */}
          {selectedCall && methodQueue.length === 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>

              {/* Wallet Sign & Execute - Only show when wallet connected */}
              {isWalletConnected && onWalletSignAndExecute && (
                <Button
                  variant="default"
                  size={isRunning ? "default" : "lg"}
                  disabled={!canRun || isRunning}
                  onClick={onWalletSignAndExecute}
                  className="min-w-0 flex-shrink bg-green-600 hover:bg-green-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isRunning ? "Signing..." : "Sign & Execute"}
                </Button>
              )}

              <Button
                variant="outline"
                size={isRunning ? "default" : "lg"}
                disabled={!canRun || isRunning}
                onClick={onAddToQueue}
                className="min-w-0 flex-shrink"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isRunning ? "Queue" : "Add to Queue"}
              </Button>
            </>
          )}

          {/* Storage query run */}
          {selectedStorage &&
            !selectedCall &&
            methodQueue.length === 0 &&
            storageQueue.length === 0 && (
              <>
                {/* Watch Value - Special handling */}
                {storageQueryType === 'watchValue' && (
                  <>
                    {!isWatching ? (
                      <Button
                        size={isRunning ? "default" : "lg"}
                        disabled={isRunning || !canRunStorage}
                        onClick={onRunClick}
                        className="min-w-0 flex-shrink"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {isRunning ? "Starting..." : "Start Watching"}
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={onStopWatch}
                        className="min-w-0 flex-shrink"
                      >
                        <EyeOff className="w-4 h-4 mr-2" />
                        Stop Watching
                      </Button>
                    )}
                  </>
                )}

                {/* Regular queries */}
                {storageQueryType !== 'watchValue' && (
                  <Button
                    size={isRunning ? "default" : "lg"}
                    disabled={isRunning || !canRunStorage}
                    onClick={onRunClick}
                    className="min-w-0 flex-shrink"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Querying..." : "Run Query"}
                  </Button>
                )}

                {/* Add to Queue button - Available for all query types */}
                <Button
                  variant="outline"
                  size={isRunning || isWatching ? "default" : "lg"}
                  disabled={(isRunning || isWatching) || !canRunStorage}
                  onClick={onAddStorageToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {(isRunning || isWatching) ? "Queue" : "Add to Queue"}
                </Button>
              </>
            )}

          {/* Multi-method run */}
          {methodQueue.length > 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : `Run Queue (${methodQueue.length})`}
              </Button>

              {/* Wallet Sign & Execute Queue - Only show when wallet connected */}
              {isWalletConnected && onWalletSignAndExecute && (
                <Button
                  variant="default"
                  size={isRunning ? "default" : "lg"}
                  disabled={isRunning}
                  onClick={onWalletSignAndExecute}
                  className="min-w-0 flex-shrink bg-green-600 hover:bg-green-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isRunning ? "Signing..." : `Sign & Execute Queue (${methodQueue.length})`}
                </Button>
              )}

              {selectedCall && (
                <Button
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={!canRun || isRunning}
                  onClick={onAddToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? "Add" : "Add More"}
                </Button>
              )}
            </>
          )}

          {/* Multi-storage run */}
          {storageQueue.length > 0 && (
            <>
              <Button
                size={isRunning ? "default" : "lg"}
                disabled={isRunning}
                onClick={onRunClick}
                className="min-w-0 flex-shrink"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning
                  ? "Querying..."
                  : `Run Storage Queue (${storageQueue.length})`}
              </Button>
              {selectedStorage && (
                <Button
                  variant="outline"
                  size={isRunning ? "default" : "lg"}
                  disabled={isRunning || !canRunStorage}
                  onClick={onAddStorageToQueue}
                  className="min-w-0 flex-shrink"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRunning ? "Add" : "Add More"}
                </Button>
              )}
            </>
          )}

          {/* Abort button - always available when running */}
          {isRunning && (
            <Button
              variant="destructive"
              size="default"
              onClick={onAbortClick}
              className="min-w-0 flex-shrink"
            >
              <Square className="w-4 h-4 mr-2" />
              Abort
            </Button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
