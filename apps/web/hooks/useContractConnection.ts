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
import {
  deployInkContract,
  deployEvmContract,
  type DeployResult,
} from "@workspace/core/contracts/deploy";
import type {
  ContractType,
  InkMetadata,
  EvmAbi,
  ContractCallResult,
} from "@workspace/core/contracts/types";

export interface ContractEventPayload {
  name: string;
  args: Record<string, unknown>;
  blockNumber?: string;
}

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
  subscribeEvents: (
    onEvent: (event: ContractEventPayload) => void,
  ) => () => void;
  deployContract: (params: {
    constructorName: string;
    args: unknown[];
    codeHashOrWasm: string | Uint8Array;
    signer: unknown;
    value?: bigint;
    gasLimit?: bigint;
    salt?: Uint8Array;
    bytecode?: string;
  }) => Promise<DeployResult>;
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
  const typedApiRef = useRef<any>(null);
  const rawMetadataRef = useRef<InkMetadata | EvmAbi | null>(null);
  const contractTypeRef = useRef<ContractType | null>(null);

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
      typedApiRef.current = typedApi;
      rawMetadataRef.current = rawMetadata;
      contractTypeRef.current = contractType;

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
      typedApiRef.current = null;
      rawMetadataRef.current = null;
      contractTypeRef.current = null;
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

  const deployContract = useCallback(
    async (params: {
      constructorName: string;
      args: unknown[];
      codeHashOrWasm: string | Uint8Array;
      signer: unknown;
      value?: bigint;
      gasLimit?: bigint;
      salt?: Uint8Array;
      bytecode?: string;
    }): Promise<DeployResult> => {
      if (!typedApiRef.current || !rawMetadataRef.current) {
        return {
          success: false,
          error: "No active contract connection. Load a contract first.",
        };
      }
      if (contractTypeRef.current === "ink") {
        return deployInkContract({
          api: typedApiRef.current,
          metadata: rawMetadataRef.current as InkMetadata,
          constructorName: params.constructorName,
          args: params.args,
          codeHashOrWasm: params.codeHashOrWasm,
          signer: params.signer,
          options: {
            value: params.value,
            gasLimit: params.gasLimit,
            salt: params.salt,
          },
        });
      }
      if (contractTypeRef.current === "evm") {
        return deployEvmContract({
          api: typedApiRef.current,
          abi: rawMetadataRef.current as EvmAbi,
          bytecode: params.bytecode ?? "",
          args: params.args,
          signer: params.signer,
          options: {
            value: params.value,
            gasLimit: params.gasLimit,
          },
        });
      }
      return {
        success: false,
        error: "Unknown contract type",
      };
    },
    [],
  );

  const subscribeEvents = useCallback(
    (onEvent: (event: ContractEventPayload) => void): (() => void) => {
      if (inkClientRef.current) {
        return inkClientRef.current.subscribeEvents(onEvent);
      }
      if (evmClientRef.current) {
        return evmClientRef.current.subscribeEvents(onEvent);
      }
      // No client connected — return a no-op cleanup so callers can always
      // invoke it unconditionally from a useEffect cleanup.
      return () => {};
    },
    [],
  );

  return {
    isConnected,
    isConnecting,
    error,
    queryContract,
    executeContract,
    subscribeEvents,
    deployContract,
    disconnect,
  };
}
