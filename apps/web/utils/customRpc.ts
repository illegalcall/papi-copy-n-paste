export interface CustomProvider {
  id: string;
  name: string;
  wsUrl: string;
  description?: string;
  dateAdded: string;
  lastTested?: string;
  isWorking?: boolean;
  chainKey: string; // Which chain this provider belongs to
}

const CUSTOM_PROVIDERS_STORAGE_KEY = 'papi-custom-providers';

/**
 * Test connection to a WebSocket RPC endpoint
 */
export async function testRpcConnection(wsUrl: string): Promise<{
  success: boolean;
  error?: string;
  chainName?: string;
  blockNumber?: number;
}> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({
        success: false,
        error: 'Connection timeout (10s)'
      });
    }, 10000);

    try {
      const ws = new WebSocket(wsUrl);
      let responseReceived = false;

      ws.onopen = () => {
        // Send a basic RPC request to get chain info
        const request = {
          id: 1,
          jsonrpc: '2.0',
          method: 'system_chain',
          params: []
        };
        ws.send(JSON.stringify(request));
      };

      ws.onmessage = async (event) => {
        if (responseReceived) return;
        responseReceived = true;

        try {
          const response = JSON.parse(event.data);
          if (response.result) {
            // Get block number for additional validation
            const blockRequest = {
              id: 2,
              jsonrpc: '2.0',
              method: 'chain_getHeader',
              params: []
            };
            ws.send(JSON.stringify(blockRequest));

            ws.onmessage = (blockEvent) => {
              try {
                const blockResponse = JSON.parse(blockEvent.data);
                const blockNumber = blockResponse.result?.number
                  ? parseInt(blockResponse.result.number, 16)
                  : undefined;

                clearTimeout(timeout);
                ws.close();
                resolve({
                  success: true,
                  chainName: response.result,
                  blockNumber
                });
              } catch {
                clearTimeout(timeout);
                ws.close();
                resolve({
                  success: true,
                  chainName: response.result
                });
              }
            };
          } else {
            clearTimeout(timeout);
            ws.close();
            resolve({
              success: false,
              error: response.error?.message || 'Invalid RPC response'
            });
          }
        } catch (parseError) {
          clearTimeout(timeout);
          ws.close();
          resolve({
            success: false,
            error: 'Invalid JSON response from RPC'
          });
        }
      };

      ws.onerror = () => {
        if (!responseReceived) {
          clearTimeout(timeout);
          resolve({
            success: false,
            error: 'WebSocket connection failed'
          });
        }
      };

      ws.onclose = (event) => {
        if (!responseReceived) {
          clearTimeout(timeout);
          resolve({
            success: false,
            error: `Connection closed: ${event.reason || 'Unknown reason'}`
          });
        }
      };

    } catch (error) {
      clearTimeout(timeout);
      resolve({
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      });
    }
  });
}

/**
 * Get all custom providers from localStorage
 */
export function getAllCustomProviders(): CustomProvider[] {
  try {
    const stored = localStorage.getItem(CUSTOM_PROVIDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Get custom providers for a specific chain
 */
export function getCustomProvidersForChain(chainKey: string): CustomProvider[] {
  const allProviders = getAllCustomProviders();
  return allProviders.filter(provider => provider.chainKey === chainKey);
}

/**
 * Save custom providers to localStorage
 */
export function saveCustomProviders(providers: CustomProvider[]): void {
  try {
    localStorage.setItem(CUSTOM_PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
  } catch (error) {
    console.error('Failed to save custom providers:', error);
  }
}

/**
 * Add a new custom provider after testing connection
 */
export async function addCustomProvider(
  chainKey: string,
  name: string,
  wsUrl: string,
  description?: string
): Promise<{ success: boolean; error?: string; provider?: CustomProvider }> {
  // Validate URL format
  if (!wsUrl.startsWith('ws://') && !wsUrl.startsWith('wss://')) {
    return {
      success: false,
      error: 'URL must start with ws:// or wss://'
    };
  }

  // Test connection
  const testResult = await testRpcConnection(wsUrl);

  if (!testResult.success) {
    return {
      success: false,
      error: `Connection test failed: ${testResult.error}`
    };
  }

  // Create provider entry
  const newProvider: CustomProvider = {
    id: `custom-${chainKey}-${Date.now()}`,
    name: name.trim(),
    wsUrl: wsUrl.trim(),
    description: description?.trim(),
    dateAdded: new Date().toISOString(),
    lastTested: new Date().toISOString(),
    isWorking: true,
    chainKey: chainKey
  };

  // Save to localStorage
  const existingProviders = getAllCustomProviders();

  // Check for duplicates within the same chain
  const duplicate = existingProviders.find(provider =>
    provider.chainKey === chainKey && (
      provider.wsUrl === newProvider.wsUrl || provider.name === newProvider.name
    )
  );

  if (duplicate) {
    return {
      success: false,
      error: duplicate.wsUrl === newProvider.wsUrl
        ? 'Provider URL already exists for this chain'
        : 'Provider name already exists for this chain'
    };
  }

  const updatedProviders = [...existingProviders, newProvider];
  saveCustomProviders(updatedProviders);

  return {
    success: true,
    provider: newProvider
  };
}

/**
 * Remove a custom provider
 */
export function removeCustomProvider(id: string): void {
  const providers = getAllCustomProviders();
  const filtered = providers.filter(provider => provider.id !== id);
  saveCustomProviders(filtered);
}

/**
 * Update custom provider test status
 */
export async function retestCustomProvider(id: string): Promise<boolean> {
  const providers = getAllCustomProviders();
  const provider = providers.find(p => p.id === id);

  if (!provider) return false;

  const testResult = await testRpcConnection(provider.wsUrl);

  // Update the provider
  provider.lastTested = new Date().toISOString();
  provider.isWorking = testResult.success;

  saveCustomProviders(providers);
  return testResult.success;
}

/**
 * Get provider display name with status
 */
export function getProviderDisplayName(provider: CustomProvider): string {
  const status = provider.isWorking === false ? ' ❌' : provider.isWorking === true ? ' ✅' : '';
  return `${provider.name}${status}`;
}

/**
 * Validate WebSocket URL format
 */
export function isValidWebSocketUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'ws:' || parsed.protocol === 'wss:';
  } catch {
    return false;
  }
}