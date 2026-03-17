/**
 * ink! Contract Client
 *
 * Provides contract interaction via the Contracts pallet in PAPI.
 * Handles SCALE encoding of arguments based on ink! metadata types.
 */

import type { TypedApi } from "polkadot-api";
import { getSs58AddressInfo } from "@polkadot-api/substrate-bindings";
import type {
  InkMetadata,
  ContractMethod,
  ContractCallResult,
  ContractCallOptions,
  InkTypeRegistryEntry,
} from "./types";
import { hexToBytes, bytesToHex, concatBytes } from "./utils";

/**
 * SCALE compact encoding for unsigned integers
 */
function compactEncode(value: number): Uint8Array {
  if (value <= 0x3f) {
    return new Uint8Array([value << 2]);
  }
  if (value <= 0x3fff) {
    const v = (value << 2) | 0x01;
    return new Uint8Array([v & 0xff, (v >> 8) & 0xff]);
  }
  if (value <= 0x3fffffff) {
    const v = (value << 2) | 0x02;
    return new Uint8Array([v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff]);
  }
  // Big integer mode (for values that fit in a u64)
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, BigInt(value), true);
  const bytes = new Uint8Array(buf);
  let len = 8;
  while (len > 1 && bytes[len - 1] === 0) len--;
  const result = new Uint8Array(1 + len);
  result[0] = ((len - 4) << 2) | 0x03;
  result.set(bytes.subarray(0, len), 1);
  return result;
}

/**
 * Encode a signed integer in little-endian two's complement
 */
function encodeSignedInt(value: bigint, byteLength: number): Uint8Array {
  let v = value;
  if (v < 0n) {
    // Two's complement: add 2^(byteLength*8)
    v = (1n << BigInt(byteLength * 8)) + v;
  }
  const bytes = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i++) {
    bytes[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return bytes;
}

/**
 * Encode an unsigned integer in little-endian
 */
function encodeUnsignedInt(value: bigint, byteLength: number): Uint8Array {
  const bytes = new Uint8Array(byteLength);
  let v = value;
  for (let i = 0; i < byteLength; i++) {
    bytes[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return bytes;
}

/**
 * Decode an SS58 address to its 32-byte public key
 */
function decodeSs58Address(address: string): Uint8Array {
  const info = getSs58AddressInfo(address as any);
  if (!info.isValid) {
    throw new Error(`Invalid SS58 address: ${address}`);
  }
  return info.publicKey;
}

/**
 * SCALE encoder for ink! argument types.
 */
function scaleEncode(
  value: unknown,
  typeId: number,
  typeRegistry: InkTypeRegistryEntry[],
): Uint8Array {
  const typeEntry = typeRegistry.find((t) => t.id === typeId);
  if (!typeEntry) {
    return new TextEncoder().encode(String(value));
  }

  const def = typeEntry.type.def;

  // Primitive types
  if ("primitive" in def) {
    const prim = def.primitive.toLowerCase();
    switch (prim) {
      case "bool":
        return new Uint8Array([value ? 1 : 0]);
      case "u8":
        return new Uint8Array([Number(value) & 0xff]);
      case "u16":
        return encodeUnsignedInt(BigInt(value as string | number | bigint), 2);
      case "u32":
        return encodeUnsignedInt(BigInt(value as string | number | bigint), 4);
      case "u64":
        return encodeUnsignedInt(BigInt(value as string | number | bigint), 8);
      case "u128":
        return encodeUnsignedInt(BigInt(value as string | number | bigint), 16);
      case "u256":
        return encodeUnsignedInt(BigInt(value as string | number | bigint), 32);
      case "i8":
        return encodeSignedInt(BigInt(value as string | number | bigint), 1);
      case "i16":
        return encodeSignedInt(BigInt(value as string | number | bigint), 2);
      case "i32":
        return encodeSignedInt(BigInt(value as string | number | bigint), 4);
      case "i64":
        return encodeSignedInt(BigInt(value as string | number | bigint), 8);
      case "i128":
        return encodeSignedInt(BigInt(value as string | number | bigint), 16);
      case "i256":
        return encodeSignedInt(BigInt(value as string | number | bigint), 32);
      case "str": {
        const strBytes = new TextEncoder().encode(String(value));
        const lenBytes = compactEncode(strBytes.length);
        return concatBytes(lenBytes, strBytes);
      }
      default:
        return new TextEncoder().encode(String(value));
    }
  }

  // AccountId (32 bytes) — detected by path
  if (typeEntry.type.path?.includes("AccountId")) {
    const strVal = String(value);
    // Hex-encoded public key
    if (strVal.startsWith("0x")) {
      const bytes = hexToBytes(strVal);
      if (bytes.length === 32) return bytes;
      // Pad or truncate to 32 bytes
      const result = new Uint8Array(32);
      result.set(bytes.subarray(0, 32));
      return result;
    }
    // SS58 address — decode to 32-byte public key
    try {
      return decodeSs58Address(strVal);
    } catch {
      throw new Error(
        `Invalid AccountId value: '${strVal}'. Provide a hex public key (0x...) or SS58 address.`,
      );
    }
  }

  // Compact type
  if ("compact" in def) {
    return compactEncode(Number(value));
  }

  // Sequence (Vec<T>)
  if ("sequence" in def) {
    if (typeof value === "string" && value.startsWith("0x")) {
      const bytes = hexToBytes(value);
      const lenBytes = compactEncode(bytes.length);
      return concatBytes(lenBytes, bytes);
    }
    return new TextEncoder().encode(String(value));
  }

  // Fallback: treat as raw bytes or string
  if (typeof value === "string" && value.startsWith("0x")) {
    return hexToBytes(value);
  }
  return new TextEncoder().encode(String(value));
}

export class InkContractClient {
  constructor(
    private api: TypedApi<any>,
    private address: string,
    private metadata: InkMetadata,
  ) {}

  private findMessage(methodName: string): ContractMethod {
    const message = this.metadata.spec.messages.find((m) => m.label === methodName);
    if (!message) {
      throw new Error(
        `Method '${methodName}' not found in contract. Available: ${this.metadata.spec.messages.map((m) => m.label).join(", ")}`,
      );
    }
    return message;
  }

  private encodeArgs(method: ContractMethod, args: unknown[]): Uint8Array {
    if (args.length !== method.args.length) {
      throw new Error(
        `Expected ${method.args.length} arguments for '${method.label}', got ${args.length}`,
      );
    }

    const encodedParts: Uint8Array[] = [];
    for (let i = 0; i < method.args.length; i++) {
      const encoded = scaleEncode(args[i], method.args[i]!.type.type, this.metadata.types);
      encodedParts.push(encoded);
    }

    return concatBytes(...encodedParts);
  }

  private buildCallData(method: ContractMethod, args: unknown[]): string {
    const selectorBytes = hexToBytes(method.selector);
    const encodedArgs = this.encodeArgs(method, args);
    return bytesToHex(concatBytes(selectorBytes, encodedArgs));
  }

  async query(
    methodName: string,
    args: unknown[],
    options?: ContractCallOptions,
  ): Promise<ContractCallResult> {
    const message = this.findMessage(methodName);
    const inputData = this.buildCallData(message, args);
    const caller = options?.caller ?? this.address;

    try {
      const result = await (this.api as any).apis.ContractsApi.call({
        origin: caller,
        dest: this.address,
        value: options?.value ?? 0n,
        gasLimit: options?.gasLimit ?? null,
        storageDepositLimit: options?.storageDepositLimit ?? null,
        inputData,
      });

      return {
        success: true,
        value: result,
        decodedValue: JSON.stringify(result, (_key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
        gasUsed: result?.gasConsumed ?? result?.gas_consumed,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  execute(
    methodName: string,
    args: unknown[],
    options?: ContractCallOptions,
  ) {
    const message = this.findMessage(methodName);
    const data = this.buildCallData(message, args);

    return (this.api as any).tx.Contracts.call({
      dest: { type: "Id", value: this.address },
      value: options?.value ?? 0n,
      gas_limit: options?.gasLimit
        ? { ref_time: options.gasLimit, proof_size: 0n }
        : { ref_time: 5_000_000_000n, proof_size: 200_000n },
      storage_deposit_limit: options?.storageDepositLimit ?? null,
      data,
    });
  }

  async estimateGas(
    methodName: string,
    args: unknown[],
    options?: ContractCallOptions,
  ): Promise<{ refTime: bigint; proofSize: bigint } | null> {
    const message = this.findMessage(methodName);
    const inputData = this.buildCallData(message, args);
    const caller = options?.caller ?? this.address;

    try {
      const result = await (this.api as any).apis.ContractsApi.call({
        origin: caller,
        dest: this.address,
        value: options?.value ?? 0n,
        gasLimit: null,
        storageDepositLimit: null,
        inputData,
      });

      const gasConsumed = result?.gasConsumed ?? result?.gas_consumed;
      if (gasConsumed) {
        return {
          refTime: gasConsumed.ref_time ?? gasConsumed.refTime ?? 0n,
          proofSize: gasConsumed.proof_size ?? gasConsumed.proofSize ?? 0n,
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  static deploy(
    api: TypedApi<any>,
    metadata: InkMetadata,
    constructorName: string,
    args: unknown[],
    codeHashOrWasm: string | Uint8Array,
    options?: ContractCallOptions & { salt?: Uint8Array },
  ) {
    const constructor = metadata.spec.constructors.find(
      (c) => c.label === constructorName,
    );
    if (!constructor) {
      throw new Error(
        `Constructor '${constructorName}' not found. Available: ${metadata.spec.constructors.map((c) => c.label).join(", ")}`,
      );
    }

    const selectorBytes = hexToBytes(constructor.selector);
    const client = new InkContractClient(api, "", metadata);
    const encodedArgs = client.encodeArgs(constructor, args);
    const data = bytesToHex(concatBytes(selectorBytes, encodedArgs));

    if (typeof codeHashOrWasm === "string") {
      return (api as any).tx.Contracts.instantiate({
        value: options?.value ?? 0n,
        gas_limit: options?.gasLimit
          ? { ref_time: options.gasLimit, proof_size: 0n }
          : { ref_time: 10_000_000_000n, proof_size: 500_000n },
        storage_deposit_limit: options?.storageDepositLimit ?? null,
        code_hash: codeHashOrWasm,
        data,
        salt: options?.salt ? bytesToHex(options.salt) : "0x",
      });
    }

    return (api as any).tx.Contracts.instantiate_with_code({
      value: options?.value ?? 0n,
      gas_limit: options?.gasLimit
        ? { ref_time: options.gasLimit, proof_size: 0n }
        : { ref_time: 10_000_000_000n, proof_size: 500_000n },
      storage_deposit_limit: options?.storageDepositLimit ?? null,
      code: bytesToHex(codeHashOrWasm),
      data,
      salt: options?.salt ? bytesToHex(options.salt) : "0x",
    });
  }

  getAddress(): string {
    return this.address;
  }

  getMetadata(): InkMetadata {
    return this.metadata;
  }

  getMessageNames(): string[] {
    return this.metadata.spec.messages.map((m) => m.label);
  }

  getQueryMethodNames(): string[] {
    return this.metadata.spec.messages
      .filter((m) => !m.mutates)
      .map((m) => m.label);
  }

  getTxMethodNames(): string[] {
    return this.metadata.spec.messages
      .filter((m) => m.mutates)
      .map((m) => m.label);
  }

  /**
   * Subscribe to contract events by watching System.Events on the chain and
   * filtering records that belong to this contract (Contracts.ContractEmitted).
   *
   * Returns an unsubscribe function. Callers MUST invoke it on unmount / dep
   * change to avoid a subscription leak.
   */
  subscribeEvents(
    callback: (event: {
      name: string;
      args: Record<string, unknown>;
      blockNumber?: string;
    }) => void,
  ): () => void {
    let disposed = false;
    let inner: { unsubscribe: () => void } | null = null;

    try {
      const watch =
        (this.api as any)?.query?.System?.Events?.watchValue?.("best") ?? null;
      if (watch && typeof watch.subscribe === "function") {
        inner = watch.subscribe((records: any) => {
          if (disposed || !Array.isArray(records)) return;
          for (const record of records) {
            const ev = record?.event ?? record;
            // Filter for events emitted by this contract address
            const isContractEmitted =
              (ev?.type === "Contracts" && ev?.value?.type === "ContractEmitted") ||
              ev?.section === "contracts";
            if (!isContractEmitted) continue;
            const contract =
              ev?.value?.value?.contract ?? ev?.data?.contract ?? null;
            if (contract && String(contract) !== this.address) continue;
            callback({
              name: ev?.value?.type ?? "ContractEmitted",
              args: (ev?.value?.value ?? {}) as Record<string, unknown>,
              blockNumber: record?.blockNumber?.toString?.(),
            });
          }
        });
      }
    } catch {
      // Subscription failed — caller still gets a no-op unsubscribe
      inner = null;
    }

    return () => {
      disposed = true;
      try {
        inner?.unsubscribe();
      } catch {
        // swallow — cleanup must never throw
      }
      inner = null;
    };
  }
}
