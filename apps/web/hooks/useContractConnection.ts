/**
 * Hook for managing WebSocket connections to contract-capable chains
 * and instantiating InkContractClient / EvmContractClient
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { findContractChain } from "@workspace/core/contracts/chains";
import { InkContractClient } from "@workspace/core/contracts/ink-client";
import { EvmContractClient } from "@workspace/core/contracts/evm-client";
import type {
  ContractType,
  InkMetadata,
  EvmAbi,
  ContractCallResult,
} from "@workspace/core/contracts/types";

interface ContractConnection {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  queryContract: (
    methodName: string,
    args: unknown[],
    caller?: string,
  ) => Promise<ContractCallResult>;
  executeContract: (
    methodName: string,
    args: unknown[],
    options?: { value?: bigint },
  ) => Promise<ContractCallResult>;
  disconnect: () => void;
}

export function useContractConnection(
  contractType: ContractType | null,
  chainKey: string | null,
  contractAddress: string | null,
  rawMetadata: InkMetadata | EvmAbi | null,
): ContractConnection {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const inkClientRef = useRef<InkContractClient | null>(null);
  const evmClientRef = useRef<EvmContractClient | null>(null);

  // Single effect: connect when params are present, disconnect + cleanup on
  // dependency change or unmount.  Merging into one effect avoids a race where
  // a separate unmount-cleanup effect calls disconnect() and clears refs
  // *after* the connection effect has already set them (React 18 Strict Mode).
  useEffect(() => {
    if (!contractType || !chainKey || !contractAddress || !rawMetadata) {
      // Params incomplete — tear down any existing connection
      if (clientRef.current) {
        clientRef.current.destroy();
        clientRef.current = null;
      }
      inkClientRef.current = null;
      evmClientRef.current = null;
      setIsConnected(false);
      setError(null);
      return;
    }

    const chain = findContractChain(chainKey);
    if (!chain) {
      setError(`Chain '${chainKey}' not found in contract chain registry`);
      return;
    }

    let cancelled = false;
    setIsConnecting(true);
    setError(null);

    // Tear down previous connection before creating a new one
    if (clientRef.current) {
      clientRef.current.destroy();
      clientRef.current = null;
    }
    inkClientRef.current = null;
    evmClientRef.current = null;

    try {
      const provider = getWsProvider(chain.ws);
      const client = createClient(provider);
      clientRef.current = client;

      // Get a generic typed API (no descriptor needed for contract calls)
      const typedApi = client.getUnsafeApi();

      if (contractType === "ink") {
        inkClientRef.current = new InkContractClient(
          typedApi as any,
          contractAddress,
          rawMetadata as InkMetadata,
        );
        evmClientRef.current = null;
      } else {
        evmClientRef.current = new EvmContractClient(
          typedApi as any,
          contractAddress,
          rawMetadata as EvmAbi,
        );
        inkClientRef.current = null;
      }

      if (!cancelled) {
        setIsConnected(true);
        setIsConnecting(false);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err instanceof Error ? err.message : String(err));
        setIsConnecting(false);
      }
    }

    return () => {
      cancelled = true;
      // Full cleanup: destroy client and clear refs so a Strict Mode
      // remount starts from a clean slate.
      if (clientRef.current) {
        clientRef.current.destroy();
        clientRef.current = null;
      }
      inkClientRef.current = null;
      evmClientRef.current = null;
      setIsConnected(false);
    };
  }, [contractType, chainKey, contractAddress, rawMetadata]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.destroy();
      clientRef.current = null;
    }
    inkClientRef.current = null;
    evmClientRef.current = null;
    setIsConnected(false);
    setError(null);
  }, []);

  const queryContract = useCallback(
    async (
      methodName: string,
      args: unknown[],
      caller?: string,
    ): Promise<ContractCallResult> => {
      if (inkClientRef.current) {
        return inkClientRef.current.query(methodName, args, { caller });
      }
      if (evmClientRef.current) {
        return evmClientRef.current.query(methodName, args, { from: caller });
      }
      return {
        success: false,
        error: "No contract client connected. Load a contract first.",
      };
    },
    [],
  );

  const executeContract = useCallback(
    async (
      methodName: string,
      args: unknown[],
      options?: { value?: bigint },
    ): Promise<ContractCallResult> => {
      try {
        if (inkClientRef.current) {
          const tx = inkClientRef.current.execute(methodName, args, options);
          return {
            success: true,
            value: tx,
            decodedValue:
              "Transaction built successfully. Connect a wallet and sign to submit.",
          };
        }
        if (evmClientRef.current) {
          const tx = evmClientRef.current.execute(methodName, args, options);
          return {
            success: true,
            value: tx,
            decodedValue:
              "Transaction built successfully. Connect a wallet and sign to submit.",
          };
        }
        return {
          success: false,
          error: "No contract client connected.",
        };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    },
    [],
  );

  return {
    isConnected,
    isConnecting,
    error,
    queryContract,
    executeContract,
    disconnect,
  };
}
