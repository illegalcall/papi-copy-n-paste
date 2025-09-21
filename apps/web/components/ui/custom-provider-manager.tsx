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
  getCustomProvidersForChain,
  addCustomProvider,
  removeCustomProvider,
  retestCustomProvider,
  isValidWebSocketUrl,
  testRpcConnection
} from '@/utils/customRpc';

interface CustomProviderManagerProps {
  chainKey: string;
  onProviderSelect?: (provider: CustomProvider) => void;
  selectedProviderId?: string;
}

export function CustomProviderManager({ chainKey, onProviderSelect, selectedProviderId }: CustomProviderManagerProps) {
  const [customProviders, setCustomProviders] = useState<CustomProvider[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testingProviderId, setTestingProviderId] = useState<string | null>(null);

  // Form state
  const [newProviderName, setNewProviderName] = useState('');
  const [newProviderUrl, setNewProviderUrl] = useState('');
  const [newProviderDescription, setNewProviderDescription] = useState('');
  const [addError, setAddError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [connectionTestPassed, setConnectionTestPassed] = useState(false);
  const [lastTestedUrl, setLastTestedUrl] = useState('');

  // Load custom providers for this chain on component mount
  useEffect(() => {
    setCustomProviders(getCustomProvidersForChain(chainKey));
  }, [chainKey]);

  // Reset connection test state when URL changes
  useEffect(() => {
    if (newProviderUrl.trim() !== lastTestedUrl) {
      setConnectionTestPassed(false);
      setAddError('');
    }
  }, [newProviderUrl, lastTestedUrl]);

  const handleAddProvider = async () => {
    if (!newProviderName.trim() || !newProviderUrl.trim()) {
      setAddError('Name and URL are required');
      return;
    }

    if (!isValidWebSocketUrl(newProviderUrl)) {
      setAddError('Invalid WebSocket URL. Must start with ws:// or wss://');
      return;
    }

    // Require successful connection test before adding
    if (!connectionTestPassed || lastTestedUrl !== newProviderUrl.trim()) {
      setAddError('Please test the connection first by clicking the test button');
      return;
    }

    setIsAdding(true);
    setAddError('');

    try {
      const result = await addCustomProvider(
        chainKey,
        newProviderName,
        newProviderUrl,
        newProviderDescription || undefined
      );

      if (result.success && result.provider) {
        const updatedProviders = getCustomProvidersForChain(chainKey);
        setCustomProviders(updatedProviders);

        // Clear form
        setNewProviderName('');
        setNewProviderUrl('');
        setNewProviderDescription('');
        setConnectionTestPassed(false);
        setLastTestedUrl('');
        setIsAddDialogOpen(false);

        // Auto-select the new provider
        if (onProviderSelect) {
          onProviderSelect(result.provider);
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

  const handleRemoveProvider = (id: string) => {
    removeCustomProvider(id);
    setCustomProviders(getCustomProvidersForChain(chainKey));
  };

  const handleTestConnection = async (id: string) => {
    setTestingProviderId(id);
    await retestCustomProvider(id);
    setCustomProviders(getCustomProvidersForChain(chainKey));
    setTestingProviderId(null);
  };

  const handleTestNewConnection = async () => {
    if (!newProviderUrl.trim() || !isValidWebSocketUrl(newProviderUrl)) {
      setAddError('Please enter a valid WebSocket URL');
      return;
    }

    setIsTestingConnection(true);
    setAddError('');
    setConnectionTestPassed(false);

    try {
      const result = await testRpcConnection(newProviderUrl);
      if (result.success) {
        setConnectionTestPassed(true);
        setLastTestedUrl(newProviderUrl.trim());
        setAddError('');
      } else {
        setConnectionTestPassed(false);
        setLastTestedUrl('');
        setAddError(`Connection test failed: ${result.error}`);
      }
    } catch (error) {
      setConnectionTestPassed(false);
      setLastTestedUrl('');
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
          <Badge variant="secondary">{customProviders.length}</Badge>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom Provider for {chainKey}</DialogTitle>
              <DialogDescription>
                Add a custom WebSocket RPC provider for this chain. Connection will be tested before adding.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider-name">Name *</Label>
                <Input
                  id="provider-name"
                  placeholder={`My ${chainKey} Node`}
                  value={newProviderName}
                  onChange={(e) => setNewProviderName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-url">WebSocket URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="provider-url"
                    placeholder="wss://my-node.example.com:9944"
                    value={newProviderUrl}
                    onChange={(e) => setNewProviderUrl(e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant={connectionTestPassed && lastTestedUrl === newProviderUrl.trim() ? "default" : "outline"}
                    onClick={handleTestNewConnection}
                    disabled={isTestingConnection || !newProviderUrl.trim()}
                    className={connectionTestPassed && lastTestedUrl === newProviderUrl.trim() ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {isTestingConnection ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : connectionTestPassed && lastTestedUrl === newProviderUrl.trim() ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <TestTube className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-description">Description</Label>
                <Input
                  id="provider-description"
                  placeholder="Optional description"
                  value={newProviderDescription}
                  onChange={(e) => setNewProviderDescription(e.target.value)}
                />
              </div>

              {addError && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {addError}
                </div>
              )}

              {connectionTestPassed && lastTestedUrl === newProviderUrl.trim() && !addError && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Connection test successful! You can now add this provider.
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
                  onClick={handleAddProvider}
                  disabled={isAdding || !newProviderName.trim() || !newProviderUrl.trim() || !connectionTestPassed || lastTestedUrl !== newProviderUrl.trim()}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Provider'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {customProviders.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground">
                No custom providers added for {chainKey} yet. Click &quot;Add Provider&quot; to get started.
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {customProviders.map((provider) => (
            <Card
              key={provider.id}
              className={`cursor-pointer transition-colors ${
                selectedProviderId === provider.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onProviderSelect?.(provider)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{provider.name}</h4>
                      <div className="flex items-center gap-1">
                        {provider.isWorking === true && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {provider.isWorking === false && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        {provider.isWorking === undefined && (
                          <div className="h-4 w-4 rounded-full bg-gray-300" />
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 truncate">
                      {provider.wsUrl}
                    </div>

                    {provider.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {provider.description}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">
                      Added: {new Date(provider.dateAdded).toLocaleDateString()}
                      {provider.lastTested && (
                        <span className="ml-2">
                          Tested: {new Date(provider.lastTested).toLocaleDateString()}
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
                        handleTestConnection(provider.id);
                      }}
                      disabled={testingProviderId === provider.id}
                    >
                      {testingProviderId === provider.id ? (
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
                        handleRemoveProvider(provider.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Provider Button at the end of the list */}
          <Card
            className="cursor-pointer border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Plus className="h-4 w-4" />
                <span>Add Custom Provider</span>
              </div>
            </CardContent>
          </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomProviderManager;