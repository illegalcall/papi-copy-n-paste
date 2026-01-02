/**
 * Re-export contract types from core package and add UI-specific types
 */

export type {
  InkMetadata,
  EvmAbi,
  ContractMethod,
  ContractMethodArg,
  ContractEvent,
  ContractType,
  UnifiedMethod,
  LoadedContract,
  ContractCallResult,
  ContractCallOptions,
  AbiItem,
  AbiInput,
  AbiStateMutability,
  InkTypeDef,
  InkTypeRegistryEntry,
  ContractStorageLayout,
} from "@workspace/core/contracts/types";

// ── UI-Specific Types ──

export interface ContractFormData {
  [paramName: string]: string | boolean | number | bigint;
}

export interface ContractInteractionState {
  isLoading: boolean;
  isExecuting: boolean;
  error: string | null;
  lastResult: import("@workspace/core/contracts/types").ContractCallResult | null;
}

export interface ContractUploadState {
  file: File | null;
  parsing: boolean;
  error: string | null;
}

export type MetadataSource = "upload" | "address" | "paste";
