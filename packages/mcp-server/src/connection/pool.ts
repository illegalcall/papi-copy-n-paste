/**
 * Lightweight connection pool for live chain queries.
 * Max 3 concurrent connections, LRU eviction on idle.
 */

import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/node";
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat";
import { getChainConfig, getChainKeys } from "../metadata.js";

interface PooledConnection {
  client: any;
  chainKey: string;
  lastUsed: number;
}

const MAX_CONNECTIONS = 3;
const pool = new Map<string, PooledConnection>();
const connecting = new Map<string, Promise<PooledConnection>>();

function evictLRU(): void {
  if (pool.size < MAX_CONNECTIONS) return;

  let oldestKey: string | null = null;
  let oldestTime = Infinity;

  for (const [key, conn] of pool) {
    if (conn.lastUsed < oldestTime) {
      oldestTime = conn.lastUsed;
      oldestKey = key;
    }
  }

  if (oldestKey) {
    const conn = pool.get(oldestKey)!;
    try {
      conn.client.destroy();
    } catch {
      // ignore cleanup errors
    }
    pool.delete(oldestKey);
  }
}

async function createConnection(chainKey: string): Promise<PooledConnection> {
  const config = getChainConfig(chainKey);
  if (!config) {
    throw new Error(
      `Unknown chain: "${chainKey}". Available chains: ${getChainKeys().join(", ")}`,
    );
  }

  evictLRU();

  const provider = withPolkadotSdkCompat(getWsProvider(config.ws));
  const client = createClient(provider);

  const conn: PooledConnection = {
    client,
    chainKey,
    lastUsed: Date.now(),
  };

  pool.set(chainKey, conn);
  return conn;
}

/**
 * Get a polkadot-api client for the given chain.
 * Returns a cached connection if available, otherwise creates a new one.
 */
export async function getClient(chainKey: string): Promise<any> {
  // Return cached connection
  const existing = pool.get(chainKey);
  if (existing) {
    existing.lastUsed = Date.now();
    return existing.client;
  }

  // Deduplicate in-flight connections
  const inFlight = connecting.get(chainKey);
  if (inFlight) {
    const conn = await inFlight;
    return conn.client;
  }

  const promise = createConnection(chainKey);
  connecting.set(chainKey, promise);

  try {
    const conn = await promise;
    return conn.client;
  } finally {
    connecting.delete(chainKey);
  }
}

/** Destroy all pooled connections. */
export function destroyAll(): void {
  for (const [, conn] of pool) {
    try {
      conn.client.destroy();
    } catch {
      // ignore
    }
  }
  pool.clear();
  connecting.clear();
}
