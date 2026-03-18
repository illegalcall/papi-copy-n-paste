/**
 * EVM Contract Client
 *
 * Provides EVM contract interaction via the Ethereum pallet on
 * Moonbeam/Moonriver/Astar EVM parachains, using PAPI.
 */

import { Binary } from "polkadot-api";
import type { TypedApi } from "polkadot-api";
import type { EvmAbi, AbiItem, ContractCallResult, AbiInput } from "./types";
import { hexToBytes, bytesToHex, keccak256 } from "./utils";

/**
 * Encode a bigint as a U256 value in the shape PAPI expects for
 * Moonbeam's EthereumRuntimeRPCApi: `FixedSizeArray<4, bigint>` — little-endian
 * 64-bit limbs, where limbs[0] is the least significant u64.
 */
function toU256Limbs(value: bigint): [bigint, bigint, bigint, bigint] {
  if (value < 0n) throw new Error("U256 cannot be negative");
  const mask = (1n << 64n) - 1n;
  return [
    value & mask,
    (value >> 64n) & mask,
    (value >> 128n) & mask,
    (value >> 192n) & mask,
  ];
}

function addressToBinary(address: string): Binary {
  const hex = address.startsWith("0x") ? address : `0x${address}`;
  return Binary.fromHex(hex);
}

/**
 * The EVM runtime API returns `ResultPayload<CallInfo, DispatchError>`, where
 * CallInfo is `{ exit_reason, value: Binary, used_gas, weight_info?, logs }`.
 * On success we extract the return-data hex; on failure we return null so the
 * caller can surface an error.
 *
 * Defensive: different polkadot-api versions may hand back the result in
 * slightly different shapes, and a revert is an Ok payload with a non-Succeed
 * exit_reason rather than a DispatchError.
 */
function unwrapCallInfo(raw: unknown): string | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as { success?: boolean; value?: unknown };

  if (r.success === false) return null;

  // success === true OR the runtime returned the CallInfo directly
  const callInfo = (
    r.success === true ? r.value : raw
  ) as {
    exit_reason?: { type?: string; value?: unknown };
    value?: Binary | Uint8Array | string;
  } | undefined;

  if (!callInfo) return null;

  // Reverted / errored EVM calls are reported as Ok(CallInfo) with a
  // non-"Succeed" exit_reason variant — treat them as failures.
  if (callInfo.exit_reason && callInfo.exit_reason.type && callInfo.exit_reason.type !== "Succeed") {
    return null;
  }

  const value = callInfo.value;
  if (value instanceof Binary) return value.asHex();
  if (value instanceof Uint8Array) return "0x" + bytesToHex(value).replace("0x", "");
  if (typeof value === "string") return value.startsWith("0x") ? value : `0x${value}`;
  return null;
}

function describeCallFailure(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "unknown error";
  const r = raw as { success?: boolean; value?: unknown };
  if (r.success === false) {
    return `DispatchError: ${JSON.stringify(r.value)}`;
  }
  const callInfo = (
    r.success === true ? r.value : raw
  ) as { exit_reason?: { type?: string; value?: unknown } } | undefined;
  if (callInfo?.exit_reason) {
    return `EVM ${callInfo.exit_reason.type ?? "unknown"}: ${JSON.stringify(callInfo.exit_reason.value ?? null)}`;
  }
  return "unknown error";
}

// ── ABI Encoding ──

function encodeAbiValue(type: string, value: unknown): string {
  const t = type.trim();

  if (t === "address") {
    const addr = String(value).toLowerCase().replace("0x", "");
    return addr.padStart(64, "0");
  }

  if (t === "bool") {
    return (value ? "1" : "0").padStart(64, "0");
  }

  if (t.startsWith("uint")) {
    const bigVal = BigInt(value as string | number | bigint);
    return bigVal.toString(16).padStart(64, "0");
  }

  if (t.startsWith("int")) {
    let bigVal = BigInt(value as string | number | bigint);
    if (bigVal < 0n) {
      bigVal = (1n << 256n) + bigVal;
    }
    return bigVal.toString(16).padStart(64, "0");
  }

  if (t.startsWith("bytes") && !t.endsWith("[]") && t !== "bytes") {
    const hex = String(value).replace("0x", "");
    return hex.padEnd(64, "0");
  }

  if (t === "bytes") {
    const hex = String(value).replace("0x", "");
    const byteLen = hex.length / 2;
    const lenHex = BigInt(byteLen).toString(16).padStart(64, "0");
    const paddedData = hex.padEnd(Math.ceil(hex.length / 64) * 64, "0");
    return lenHex + paddedData;
  }

  if (t === "string") {
    const strBytes = new TextEncoder().encode(String(value));
    const hex = Array.from(strBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const lenHex = BigInt(strBytes.length).toString(16).padStart(64, "0");
    const paddedData = hex.padEnd(Math.ceil(hex.length / 64) * 64, "0");
    return lenHex + paddedData;
  }

  try {
    const bigVal = BigInt(value as string | number | bigint);
    return bigVal.toString(16).padStart(64, "0");
  } catch {
    const hex = String(value).replace("0x", "");
    return hex.padStart(64, "0");
  }
}

/**
 * Compute the 4-byte function selector using keccak256
 */
function computeSelector(name: string, inputs: AbiInput[]): string {
  const sig = `${name}(${inputs.map((i) => canonicalType(i)).join(",")})`;
  const hash = keccak256(new TextEncoder().encode(sig));
  return bytesToHex(hash.slice(0, 4));
}

function canonicalType(input: AbiInput): string {
  if (input.type === "tuple" && input.components) {
    return `(${input.components.map((c) => canonicalType(c)).join(",")})`;
  }
  return input.type;
}

/**
 * Encode a function call with ABI encoding
 */
export function encodeFunction(
  abi: EvmAbi,
  methodName: string,
  args: unknown[],
): string {
  const fn = abi.abi.find(
    (item) => item.type === "function" && item.name === methodName,
  );
  if (!fn) {
    throw new Error(
      `Function '${methodName}' not found in ABI. Available: ${abi.abi
        .filter((i) => i.type === "function")
        .map((i) => i.name)
        .join(", ")}`,
    );
  }

  const inputs = fn.inputs ?? [];
  if (args.length !== inputs.length) {
    throw new Error(
      `Expected ${inputs.length} arguments for '${methodName}', got ${args.length}`,
    );
  }

  const selector = computeSelector(methodName, inputs);

  const isDynamic = (type: string): boolean =>
    type === "bytes" || type === "string" || type.endsWith("[]");

  const hasDynamic = inputs.some((inp) => isDynamic(inp.type));

  if (!hasDynamic) {
    let encoded = selector.replace("0x", "");
    for (let i = 0; i < inputs.length; i++) {
      encoded += encodeAbiValue(inputs[i]!.type, args[i]);
    }
    return "0x" + encoded;
  }

  const headParts: string[] = [];
  const tailParts: string[] = [];
  const headSize = inputs.length * 32;

  for (let i = 0; i < inputs.length; i++) {
    const inp = inputs[i]!;
    if (isDynamic(inp.type)) {
      const offset = headSize + tailParts.join("").length / 2;
      headParts.push(BigInt(offset).toString(16).padStart(64, "0"));
      tailParts.push(encodeAbiValue(inp.type, args[i]));
    } else {
      headParts.push(encodeAbiValue(inp.type, args[i]));
    }
  }

  return "0x" + selector.replace("0x", "") + headParts.join("") + tailParts.join("");
}

function decodeStaticWord(type: string, word: string): unknown {
  if (type === "bool") return BigInt("0x" + word) !== 0n;
  if (type === "address") return "0x" + word.substring(24);
  if (type.startsWith("uint") || type.startsWith("int")) {
    return BigInt("0x" + word);
  }
  return "0x" + word;
}

function readDynamicString(hex: string, offsetBytes: number): string {
  // offsetBytes is relative to the start of the return-data buffer.
  // Layout at offset: 32-byte length, then length bytes of UTF-8 data
  // (right-padded to a 32-byte boundary).
  const lenStart = offsetBytes * 2;
  const lenHex = hex.substring(lenStart, lenStart + 64);
  if (!lenHex) return "";
  const len = Number(BigInt("0x" + lenHex));
  const dataStart = lenStart + 64;
  const dataHex = hex.substring(dataStart, dataStart + len * 2);
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = parseInt(dataHex.substring(i * 2, i * 2 + 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

function readDynamicBytes(hex: string, offsetBytes: number): string {
  const lenStart = offsetBytes * 2;
  const lenHex = hex.substring(lenStart, lenStart + 64);
  if (!lenHex) return "0x";
  const len = Number(BigInt("0x" + lenHex));
  const dataStart = lenStart + 64;
  return "0x" + hex.substring(dataStart, dataStart + len * 2);
}

/**
 * Decode an ABI-encoded result. Handles the common static types plus dynamic
 * `string` and `bytes`, which are encoded as a 32-byte offset in the head
 * followed by a length + data in the tail.
 */
export function decodeResult(
  abi: EvmAbi,
  methodName: string,
  rawResult: string | Uint8Array,
): unknown {
  const fn = abi.abi.find(
    (item) => item.type === "function" && item.name === methodName,
  );
  if (!fn?.outputs?.length) return null;

  const hex =
    typeof rawResult === "string"
      ? rawResult.replace("0x", "")
      : bytesToHex(rawResult).replace("0x", "");

  if (!hex.length) return null;

  const outputs = fn.outputs;
  const results: Record<string, unknown> = {};

  let headOffset = 0;
  for (const output of outputs) {
    const word = hex.substring(headOffset, headOffset + 64);
    if (!word) break;

    const key = output.name || String(outputs.indexOf(output));
    if (output.type === "string") {
      const tailOffset = Number(BigInt("0x" + word));
      results[key] = readDynamicString(hex, tailOffset);
    } else if (output.type === "bytes") {
      const tailOffset = Number(BigInt("0x" + word));
      results[key] = readDynamicBytes(hex, tailOffset);
    } else {
      results[key] = decodeStaticWord(output.type, word);
    }
    headOffset += 64;
  }

  if (outputs.length === 1) {
    return Object.values(results)[0];
  }
  return results;
}

export class EvmContractClient {
  constructor(
    private api: TypedApi<any>,
    private address: string,
    private abi: EvmAbi,
  ) {}

  async query(
    methodName: string,
    args: unknown[],
    options?: { from?: string },
  ): Promise<ContractCallResult> {
    const encoded = encodeFunction(this.abi, methodName, args);

    try {
      // Moonbeam's EthereumRuntimeRPCApi.call takes 10 positional args.
      // See .papi/descriptors/dist/moonbeam.d.ts for the canonical signature:
      //   call(from, to, data, value, gas_limit, max_fee_per_gas?,
      //        max_priority_fee_per_gas?, nonce?, estimate, access_list?)
      // with addresses as FixedSizeBinary<20>, data as Binary, and U256 values
      // encoded as FixedSizeArray<4, bigint> (little-endian u64 limbs).
      const from = options?.from ?? "0x0000000000000000000000000000000000000000";
      const raw = await (this.api as any).apis.EthereumRuntimeRPCApi.call(
        addressToBinary(from),
        addressToBinary(this.address),
        Binary.fromHex(encoded),
        toU256Limbs(0n),
        toU256Limbs(500_000n),
        undefined,
        undefined,
        undefined,
        false,
        undefined,
      );

      const returnHex = unwrapCallInfo(raw);
      if (returnHex === null) {
        return {
          success: false,
          error: `EVM call reverted: ${describeCallFailure(raw)}`,
        };
      }

      const decoded = decodeResult(this.abi, methodName, returnHex);

      return {
        success: true,
        value: decoded,
        decodedValue: JSON.stringify(decoded, (_key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
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
    options?: { value?: bigint; gasLimit?: bigint },
  ) {
    const encoded = encodeFunction(this.abi, methodName, args);

    return (this.api as any).tx.Ethereum.transact({
      transaction: {
        EIP1559: {
          chain_id: 0n,
          nonce: 0n,
          max_priority_fee_per_gas: 1_000_000_000n,
          max_fee_per_gas: 25_000_000_000n,
          gas_limit: options?.gasLimit ?? 500_000n,
          action: { Call: this.address },
          value: options?.value ?? 0n,
          input: hexToBytes(encoded),
          access_list: [],
        },
      },
    });
  }

  getAddress(): string {
    return this.address;
  }

  getAbi(): EvmAbi {
    return this.abi;
  }

  getFunctionNames(): string[] {
    return this.abi.abi
      .filter((item) => item.type === "function")
      .map((item) => item.name!);
  }

  getViewFunctionNames(): string[] {
    return this.abi.abi
      .filter(
        (item) =>
          item.type === "function" &&
          (item.stateMutability === "view" || item.stateMutability === "pure"),
      )
      .map((item) => item.name!);
  }

  getWriteFunctionNames(): string[] {
    return this.abi.abi
      .filter(
        (item) =>
          item.type === "function" &&
          item.stateMutability !== "view" &&
          item.stateMutability !== "pure",
      )
      .map((item) => item.name!);
  }

  /**
   * Subscribe to EVM contract events by watching System.Events on the chain
   * and filtering Ethereum.Log records whose address matches this contract.
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
    const target = this.address.toLowerCase();

    try {
      const watch =
        (this.api as any)?.query?.System?.Events?.watchValue?.("best") ?? null;
      if (watch && typeof watch.subscribe === "function") {
        inner = watch.subscribe((records: any) => {
          if (disposed || !Array.isArray(records)) return;
          for (const record of records) {
            const ev = record?.event ?? record;
            const isEvmLog =
              ev?.type === "EVM" || ev?.section === "evm" || ev?.type === "Ethereum";
            if (!isEvmLog) continue;
            const logAddress =
              ev?.value?.value?.address ?? ev?.data?.address ?? null;
            if (logAddress && String(logAddress).toLowerCase() !== target) continue;
            callback({
              name: ev?.value?.type ?? "Log",
              args: (ev?.value?.value ?? {}) as Record<string, unknown>,
              blockNumber: record?.blockNumber?.toString?.(),
            });
          }
        });
      }
    } catch {
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
