/**
 * Runtime Client Access Utility
 *
 * Provides access to live PAPI clients for runtime metadata introspection
 */

// Global client registry for runtime access
let globalClientRegistry: Map<string, any> = new Map();
let globalProviderRegistry: Map<string, any> = new Map();

export interface RuntimeClientInfo {
  client: any;
  provider: any;
  status: 'connected' | 'connecting' | 'error' | 'disconnected';
  chainKey: string;
  providerId: string;
}

/**
 * Register a client for runtime access
 */
export function registerClient(chainKey: string, providerId: string, client: any, provider: any, status: string) {
  console.log(`🔗 Registering client for runtime access: ${chainKey} via ${providerId} (${status})`);

  if (status === 'connected' && client && client._request) {
    globalClientRegistry.set(chainKey, client);
    globalProviderRegistry.set(chainKey, provider);
    console.log(`✅ Client registered successfully for ${chainKey}`);
  } else {
    console.log(`⚠️ Client not ready for registration: ${chainKey} (status: ${status})`);
  }
}

/**
 * Get current client for a chain (for runtime metadata access)
 */
export function getCurrentClient(chainKey: string): any | null {
  const client = globalClientRegistry.get(chainKey);

  if (!client) {
    console.warn(`❌ No client available for runtime access: ${chainKey}`);
    console.log(`📋 Available clients: ${Array.from(globalClientRegistry.keys()).join(', ')}`);
    return null;
  }

  if (!client._request) {
    console.warn(`❌ Client for ${chainKey} is not ready (missing _request method)`);
    return null;
  }

  console.log(`✅ Runtime client ready for ${chainKey}`);
  return client;
}

/**
 * Get current provider for a chain
 */
export function getCurrentProvider(chainKey: string): any | null {
  return globalProviderRegistry.get(chainKey) || null;
}

/**
 * Check if runtime client is available and ready
 */
export function isRuntimeClientReady(chainKey: string): boolean {
  const client = globalClientRegistry.get(chainKey);
  return !!(client && client._request);
}

/**
 * Get all available chains with runtime clients
 */
export function getAvailableRuntimeChains(): string[] {
  return Array.from(globalClientRegistry.keys());
}

/**
 * Unregister a client (cleanup)
 */
export function unregisterClient(chainKey: string) {
  console.log(`🗑️ Unregistering client for ${chainKey}`);
  globalClientRegistry.delete(chainKey);
  globalProviderRegistry.delete(chainKey);
}

/**
 * Clear all registered clients (useful for testing)
 */
export function clearAllClients() {
  console.log('🗑️ Clearing all registered runtime clients');
  globalClientRegistry.clear();
  globalProviderRegistry.clear();
}

/**
 * Get client info for debugging
 */
export function getClientInfo(chainKey: string): RuntimeClientInfo | null {
  const client = globalClientRegistry.get(chainKey);
  const provider = globalProviderRegistry.get(chainKey);

  if (!client) return null;

  return {
    client,
    provider,
    status: client._request ? 'connected' : 'error',
    chainKey,
    providerId: 'unknown' // We'll enhance this later if needed
  };
}