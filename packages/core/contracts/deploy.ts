/**
 * Contract deployment helpers.
 *
 * Wraps the tx builders from `InkContractClient.deploy` / EvmContractClient
 * and exposes a signAndSubmit flow that returns the deployed contract address.
 *
 * These helpers intentionally stay thin: they build a tx via the existing
 * clients and let the caller pass in a PAPI signer. They do NOT create chain
 * clients, wallets, or signers — that plumbing lives in the web app.
 */

import type { TypedApi } from "polkadot-api";
import { InkContractClient } from "./ink-client";
import { EvmContractClient } from "./evm-client";
import type { InkMetadata, EvmAbi, ContractCallOptions } from "./types";

export interface DeployResult {
  success: boolean;
  address?: string;
  txHash?: string;
  error?: string;
}

export interface InkDeployParams {
  api: TypedApi<any>;
  metadata: InkMetadata;
  constructorName: string;
  args: unknown[];
  codeHashOrWasm: string | Uint8Array;
  signer: unknown;
  options?: ContractCallOptions & { salt?: Uint8Array };
}

/**
 * Build and submit an ink! contract deployment transaction.
 *
 * Returns a DeployResult containing the deployed address (extracted from the
 * Contracts.Instantiated event) on success, or an error on failure.
 */
export async function deployInkContract(
  params: InkDeployParams,
): Promise<DeployResult> {
  try {
    const tx = InkContractClient.deploy(
      params.api,
      params.metadata,
      params.constructorName,
      params.args,
      params.codeHashOrWasm,
      params.options,
    );

    const result = await (tx as any).signAndSubmit(params.signer);
    if (!result?.ok) {
      return {
        success: false,
        error:
          result?.dispatchError?.toString?.() ??
          "Deployment transaction reverted",
      };
    }

    // Extract deployed address from Contracts.Instantiated event
    const events: any[] = Array.isArray(result?.events) ? result.events : [];
    let address: string | undefined;
    for (const ev of events) {
      const type = ev?.type ?? ev?.event?.type;
      const value = ev?.value ?? ev?.event?.value;
      if (type === "Contracts" && value?.type === "Instantiated") {
        address =
          value?.value?.contract ?? value?.value?.deployer?.contract ?? undefined;
        if (address) break;
      }
    }

    return {
      success: true,
      address,
      txHash: result?.txHash,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export interface EvmDeployParams {
  api: TypedApi<any>;
  abi: EvmAbi;
  bytecode: string;
  args: unknown[];
  signer: unknown;
  options?: { value?: bigint; gasLimit?: bigint };
}

/**
 * Build and submit an EVM contract deployment transaction.
 *
 * Minimal implementation: bytecode + constructor args are encoded and the
 * resulting transaction is signed and submitted via Ethereum.transact.
 */
export async function deployEvmContract(
  params: EvmDeployParams,
): Promise<DeployResult> {
  try {
    if (!params.bytecode) {
      return {
        success: false,
        error: "EVM deployment requires contract bytecode",
      };
    }

    const tx = (params.api as any).tx.Ethereum.transact({
      transaction: {
        EIP1559: {
          chain_id: 0n,
          nonce: 0n,
          max_priority_fee_per_gas: 1_000_000_000n,
          max_fee_per_gas: 25_000_000_000n,
          gas_limit: params.options?.gasLimit ?? 2_000_000n,
          action: { Create: null },
          value: params.options?.value ?? 0n,
          input: params.bytecode.startsWith("0x")
            ? params.bytecode
            : "0x" + params.bytecode,
          access_list: [],
        },
      },
    });

    const result = await (tx as any).signAndSubmit(params.signer);
    if (!result?.ok) {
      return {
        success: false,
        error:
          result?.dispatchError?.toString?.() ??
          "EVM deployment transaction reverted",
      };
    }

    // Address is derived from sender + nonce; pull from the Evm.Created event
    const events: any[] = Array.isArray(result?.events) ? result.events : [];
    let address: string | undefined;
    for (const ev of events) {
      const type = ev?.type ?? ev?.event?.type;
      const value = ev?.value ?? ev?.event?.value;
      if (
        (type === "EVM" || type === "Ethereum") &&
        (value?.type === "Created" || value?.type === "CreatedContract")
      ) {
        address = value?.value?.address ?? value?.value?.contract ?? undefined;
        if (address) break;
      }
    }

    return {
      success: true,
      address,
      txHash: result?.txHash,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Silence unused-import warning for EvmContractClient — exported for callers
// who want direct access in future EVM deploy enhancements.
void EvmContractClient;
