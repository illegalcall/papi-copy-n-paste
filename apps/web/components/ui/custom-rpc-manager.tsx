"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Badge } from '@workspace/ui/components/badge';
import { Plus, Trash2, TestTube, Loader2, CheckCircle, XCircle, Globe } from 'lucide-react';
import {
  CustomProvider,
  getAllCustomProviders,
  addCustomProvider,
  removeCustomProvider,
  retestCustomProvider,
  isValidWebSocketUrl,
  testRpcConnection
} from '@/utils/customRpc';

interface CustomRPCManagerProps {
  chainKey: string;
  onRPCSelect?: (rpc: CustomProvider) => void;
  selectedRPCId?: string;
}

export function CustomRPCManager({ chainKey, onRPCSelect, selectedRPCId }: CustomRPCManagerProps) {
  const [customRPCs, setCustomRPCs] = useState<CustomProvider[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testingRPCId, setTestingRPCId] = useState<string | null>(null);

  // Form state
  const [newRPCName, setNewRPCName] = useState('');
  const [newRPCUrl, setNewRPCUrl] = useState('');
  const [newRPCDescription, setNewRPCDescription] = useState('');
  const [addError, setAddError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Load custom RPCs on component mount
  useEffect(() => {
    setCustomRPCs(getAllCustomProviders().filter(p => p.chainKey === chainKey));
  }, [chainKey]);

  const handleAddRPC = async () => {
    if (!newRPCName.trim() || !newRPCUrl.trim()) {
      setAddError('Name and URL are required');
      return;
    }

    if (!isValidWebSocketUrl(newRPCUrl)) {
      setAddError('Invalid WebSocket URL. Must start with ws:// or wss://');
      return;
    }

    setIsAdding(true);
    setAddError('');

    try {
      const result = await addCustomProvider(
        chainKey,
        newRPCName,
        newRPCUrl,
        newRPCDescription || undefined
      );

      if (result.success && result.provider) {
        const updatedRPCs = getAllCustomProviders().filter(p => p.chainKey === chainKey);
        setCustomRPCs(updatedRPCs);

        // Clear form
        setNewRPCName('');
        setNewRPCUrl('');
        setNewRPCDescription('');
        setIsAddDialogOpen(false);

        // Auto-select the new RPC
        if (onRPCSelect) {
          onRPCSelect(result.provider);
        }
      } else {
        setAddError(result.error || 'Failed to add provider');
      }
    } catch (error) {
      setAddError(error instanceof Error ? error.message : 'Failed to add provider');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveRPC = (id: string) => {
    removeCustomProvider(id);
    setCustomRPCs(getAllCustomProviders().filter(p => p.chainKey === chainKey));
  };

  const handleTestConnection = async (id: string) => {
    setTestingRPCId(id);
    const success = await retestCustomProvider(id);
    setCustomRPCs(getAllCustomProviders().filter(p => p.chainKey === chainKey));
    setTestingRPCId(null);
  };

  const handleTestNewConnection = async () => {
    if (!newRPCUrl.trim() || !isValidWebSocketUrl(newRPCUrl)) {
      setAddError('Please enter a valid WebSocket URL');
      return;
    }

    setIsTestingConnection(true);
    setAddError('');

    try {
      const result = await testRpcConnection(newRPCUrl);
      if (result.success) {
        setAddError('');
        // Show success feedback (could add a success state)
      } else {
        setAddError(`Connection test failed: ${result.error}`);
      }
    } catch (error) {
      setAddError(error instanceof Error ? error.message : 'Connection test failed');
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <h3 className="font-medium">Custom Providers for {chainKey}</h3>
          <Badge variant="secondary">{customRPCs.length}</Badge>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add RPC
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom RPC</DialogTitle>
              <DialogDescription>
                Add a custom WebSocket RPC endpoint. Connection will be tested before adding.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rpc-name">Name *</Label>
                <Input
                  id="rpc-name"
                  placeholder="My Custom Node"
                  value={newRPCName}
                  onChange={(e) => setNewRPCName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rpc-url">WebSocket URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="rpc-url"
                    placeholder="wss://my-node.example.com:9944"
                    value={newRPCUrl}
                    onChange={(e) => setNewRPCUrl(e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTestNewConnection}
                    disabled={isTestingConnection || !newRPCUrl.trim()}
                  >
                    {isTestingConnection ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <TestTube className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rpc-description">Description</Label>
                <Input
                  id="rpc-description"
                  placeholder="Optional description"
                  value={newRPCDescription}
                  onChange={(e) => setNewRPCDescription(e.target.value)}
                />
              </div>

              {addError && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {addError}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isAdding}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddRPC}
                  disabled={isAdding || !newRPCName.trim() || !newRPCUrl.trim()}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add RPC'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {customRPCs.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground">
                No custom RPCs added yet. Click "Add RPC" to get started.
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {customRPCs.map((rpc) => (
            <Card
              key={rpc.id}
              className={`cursor-pointer transition-colors ${
                selectedRPCId === rpc.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onRPCSelect?.(rpc)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{rpc.name}</h4>
                      <div className="flex items-center gap-1">
                        {rpc.isWorking === true && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {rpc.isWorking === false && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        {rpc.isWorking === undefined && (
                          <div className="h-4 w-4 rounded-full bg-gray-300" />
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 truncate">
                      {rpc.wsUrl}
                    </div>

                    {rpc.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {rpc.description}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">
                      Added: {new Date(rpc.dateAdded).toLocaleDateString()}
                      {rpc.lastTested && (
                        <span className="ml-2">
                          Tested: {new Date(rpc.lastTested).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestConnection(rpc.id);
                      }}
                      disabled={testingRPCId === rpc.id}
                    >
                      {testingRPCId === rpc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRPC(rpc.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add RPC Button at the end of the list */}
          <Card
            className="cursor-pointer border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Plus className="h-4 w-4" />
                <span>Add Custom RPC</span>
              </div>
            </CardContent>
          </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomRPCManager;