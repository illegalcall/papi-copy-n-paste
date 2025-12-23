/**
 * Shared type definitions for contract interaction (ink! and EVM)
 */

// ── ink! Metadata Types ──

export interface InkMetadataSource {
  hash: string;
  language: string;
  compiler: string;
  wasm?: string;
}

export interface InkMetadataContract {
  name: string;
  version: string;
  authors?: string[];
}

export interface ContractMethodArg {
  label: string;
  type: InkTypeDef;
  docs?: string[];
}

export interface ContractMethod {
  label: string;
  selector: string;
  args: ContractMethodArg[];
  returnType?: InkTypeDef;
  mutates: boolean;
  payable: boolean;
  docs: string[];
  default?: boolean;
}

export interface ContractEvent {
  label: string;
  args: ContractMethodArg[];
  docs: string[];
  module_path?: string;
  signature_topic?: string;
}

export interface InkTypeDef {
  type: number;
  displayName?: string[];
}

export interface InkTypeRegistryEntry {
  id: number;
  type: {
    def:
      | { primitive: string }
      | { composite: { fields: Array<{ name?: string; type: number; typeName?: string }> } }
      | { variant: { variants: Array<{ name: string; fields: Array<{ type: number; name?: string }> }> } }
      | { sequence: { type: number } }
      | { array: { len: number; type: number } }
      | { tuple: number[] }
      | { compact: { type: number } };
    path?: string[];
    params?: Array<{ name: string; type: number }>;
  };
}

export interface ContractStorageLayout {
  root?: {
    root_key: string;
    layout: Record<string, unknown>;
  };
  struct?: {
    fields: Array<{
      name: string;
      layout: ContractStorageLayout;
    }>;
  };
  leaf?: {
    key: string;
    ty: number;
  };
}

export interface InkMetadata {
  source: InkMetadataSource;
  contract: InkMetadataContract;
  spec: {
    constructors: ContractMethod[];
    messages: ContractMethod[];
    events: ContractEvent[];
    environment?: Record<string, unknown>;
  };
  storage: ContractStorageLayout;
  types: InkTypeRegistryEntry[];
  version: string;
}

// ── EVM / ABI Types ──

export type AbiStateMutability = "pure" | "view" | "nonpayable" | "payable";

export interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
  internalType?: string;
}

export interface AbiItem {
  type: "function" | "event" | "constructor" | "fallback" | "receive" | "error";
  name?: string;
  inputs?: AbiInput[];
  outputs?: AbiInput[];
  stateMutability?: AbiStateMutability;
  anonymous?: boolean;
  constant?: boolean;
  payable?: boolean;
}

export interface EvmAbi {
  abi: AbiItem[];
  bytecode?: string;
  contractName?: string;
}

// ── Unified Contract Interface ──

export type ContractType = "ink" | "evm";

export interface UnifiedMethod {
  name: string;
  selector: string;
  args: Array<{
    name: string;
    type: string;
    description?: string;
  }>;
  returnType?: string;
  isReadOnly: boolean;
  isPayable: boolean;
  docs: string[];
  kind: "message" | "constructor" | "function" | "event";
}

export interface LoadedContract {
  type: ContractType;
  address: string;
  chainKey: string;
  name?: string;
  methods: UnifiedMethod[];
  events: UnifiedMethod[];
  constructors: UnifiedMethod[];
  rawMetadata: InkMetadata | EvmAbi;
}

export interface ContractCallResult {
  success: boolean;
  value?: unknown;
  decodedValue?: string;
  gasUsed?: bigint;
  error?: string;
  events?: Array<{
    name: string;
    args: Record<string, unknown>;
  }>;
}

export interface ContractCallOptions {
  value?: bigint;
  gasLimit?: bigint;
  storageDepositLimit?: bigint;
  caller?: string;
}
