/**
 * Shared utilities for contract clients
 */

/** Encode a hex string to Uint8Array */
export function hexToBytes(hex: string): Uint8Array {
  const cleaned = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (cleaned.length % 2 !== 0) {
    throw new Error(`Invalid hex string length: ${cleaned.length}`);
  }
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.substring(i, i + 2), 16);
  }
  return bytes;
}

/** Encode bytes to hex string */
export function bytesToHex(bytes: Uint8Array): string {
  return (
    "0x" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Concatenate multiple Uint8Arrays */
export function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/** Validate an EVM address (0x + 40 hex chars) */
export function isValidEvmAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/** Validate an SS58 address (basic check: starts with valid char, 46-48 chars) */
export function isValidSs58Address(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{46,48}$/.test(address);
}

/** Max file size for metadata uploads (5MB) */
export const MAX_METADATA_FILE_SIZE = 5 * 1024 * 1024;

// ── Keccak-256 implementation (FIPS 202 / SHA-3) ──

const KECCAK_ROUNDS = 24;
const RC = [
  0x0000000000000001n, 0x0000000000008082n, 0x800000000000808an, 0x8000000080008000n,
  0x000000000000808bn, 0x0000000080000001n, 0x8000000080008081n, 0x8000000000008009n,
  0x000000000000008an, 0x0000000000000088n, 0x0000000080008009n, 0x000000008000000an,
  0x000000008000808bn, 0x800000000000008bn, 0x8000000000008089n, 0x8000000000008003n,
  0x8000000000008002n, 0x8000000000000080n, 0x000000000000800an, 0x800000008000000an,
  0x8000000080008081n, 0x8000000000008080n, 0x0000000080000001n, 0x8000000080008008n,
];
const ROTC = [
  1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 2, 14, 27, 41, 56, 8, 25, 43, 62, 18, 39, 61, 20, 44,
];
const PI = [
  10, 7, 11, 17, 18, 3, 5, 16, 8, 21, 24, 4, 15, 23, 19, 13, 12, 2, 20, 14, 22, 9, 6, 1,
];
const MASK64 = 0xffffffffffffffffn;

function rotl64(x: bigint, n: number): bigint {
  return ((x << BigInt(n)) | (x >> BigInt(64 - n))) & MASK64;
}

function keccakF(state: bigint[]): void {
  const B = new Array<bigint>(25);
  const C = new Array<bigint>(5);
  const D = new Array<bigint>(5);

  for (let round = 0; round < KECCAK_ROUNDS; round++) {
    // θ
    for (let x = 0; x < 5; x++) {
      C[x] = state[x]! ^ state[x + 5]! ^ state[x + 10]! ^ state[x + 15]! ^ state[x + 20]!;
    }
    for (let x = 0; x < 5; x++) {
      D[x] = C[(x + 4) % 5]! ^ rotl64(C[(x + 1) % 5]!, 1);
      for (let y = 0; y < 25; y += 5) {
        state[y + x] = (state[y + x]! ^ D[x]!) & MASK64;
      }
    }
    // ρ and π
    let last = state[1]!;
    for (let i = 0; i < 24; i++) {
      const j = PI[i]!;
      B[0] = state[j]!;
      state[j] = rotl64(last, ROTC[i]!);
      last = B[0]!;
    }
    // χ
    for (let y = 0; y < 25; y += 5) {
      for (let x = 0; x < 5; x++) B[x] = state[y + x]!;
      for (let x = 0; x < 5; x++) {
        state[y + x] = (B[x]! ^ (~B[(x + 1) % 5]! & B[(x + 2) % 5]!)) & MASK64;
      }
    }
    // ι
    state[0] = (state[0]! ^ RC[round]!) & MASK64;
  }
}

/**
 * Keccak-256 hash function
 * Returns a 32-byte Uint8Array hash of the input
 */
export function keccak256(input: Uint8Array): Uint8Array {
  const rate = 136; // (1600 - 256*2) / 8
  const state = new Array<bigint>(25).fill(0n);

  // Absorb
  const padded = new Uint8Array(Math.ceil((input.length + 1) / rate) * rate);
  padded.set(input);
  padded[input.length] = 0x01;
  padded[padded.length - 1] = (padded[padded.length - 1]! | 0x80);

  for (let offset = 0; offset < padded.length; offset += rate) {
    for (let i = 0; i < rate; i += 8) {
      const idx = (i >> 3);
      let val = 0n;
      for (let b = 0; b < 8; b++) {
        val |= BigInt(padded[offset + i + b]!) << BigInt(b * 8);
      }
      state[idx] = (state[idx]! ^ val) & MASK64;
    }
    keccakF(state);
  }

  // Squeeze
  const output = new Uint8Array(32);
  for (let i = 0; i < 4; i++) {
    const val = state[i]!;
    for (let b = 0; b < 8; b++) {
      output[i * 8 + b] = Number((val >> BigInt(b * 8)) & 0xffn);
    }
  }
  return output;
}
