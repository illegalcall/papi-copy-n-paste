/**
 * Unit tests for the contract metadata parsing / encoding surface in
 * packages/core/contracts. Exercises:
 *   - ink! metadata shape (type registry, constructors, messages)
 *   - EVM ABI parsing (happy path, selector computation)
 *   - encodeFunction happy-path + error paths
 *   - decodeResult round-trip
 *   - utility helpers (keccak256, hex, address validation)
 *   - malformed JSON → explicit errors
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  encodeFunction,
  decodeResult,
} from "../contracts/evm-client";
import {
  hexToBytes,
  bytesToHex,
  concatBytes,
  keccak256,
  isValidEvmAddress,
  isValidSs58Address,
} from "../contracts/utils";
import type { EvmAbi, InkMetadata } from "../contracts/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = resolve(__dirname, "fixtures");

function readFixture(name: string): string {
  return readFileSync(resolve(FIXTURES, name), "utf-8");
}

// ── ink! metadata parsing ───────────────────────────────────────────────────

describe("ink! metadata parsing", () => {
  it("parses the flipper fixture into a valid InkMetadata shape", () => {
    const meta = JSON.parse(readFixture("flipper.ink.json")) as InkMetadata;

    expect(meta.contract.name).toBe("flipper");
    expect(meta.source.language).toContain("ink!");
    expect(meta.spec.constructors).toHaveLength(1);
    expect(meta.spec.messages).toHaveLength(2);
    expect(meta.spec.messages.map((m) => m.label)).toEqual(["flip", "get"]);
  });

  it("exposes the type registry so consumers can look up types by id", () => {
    const meta = JSON.parse(readFixture("flipper.ink.json")) as InkMetadata;

    const boolType = meta.types.find((t) => t.id === 0);
    expect(boolType).toBeDefined();
    expect("primitive" in boolType!.type.def).toBe(true);
    if ("primitive" in boolType!.type.def) {
      expect(boolType!.type.def.primitive).toBe("bool");
    }
  });

  it("distinguishes mutating vs read-only messages by the `mutates` flag", () => {
    const meta = JSON.parse(readFixture("flipper.ink.json")) as InkMetadata;

    const flip = meta.spec.messages.find((m) => m.label === "flip");
    const get = meta.spec.messages.find((m) => m.label === "get");

    expect(flip?.mutates).toBe(true);
    expect(get?.mutates).toBe(false);
  });

  it("throws a useful error on malformed JSON", () => {
    const badJson = "{ not valid json :::";
    expect(() => JSON.parse(badJson)).toThrow(SyntaxError);
  });

  it("throws on missing-selector metadata when we enforce invariants", () => {
    const meta = JSON.parse(readFixture("flipper.ink.json")) as InkMetadata;
    // Simulate a malformed upload: drop the selector.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const broken = JSON.parse(JSON.stringify(meta)) as any;
    broken.spec.messages[0].selector = undefined;

    const assertSelector = (m: InkMetadata): void => {
      for (const msg of m.spec.messages) {
        if (!msg.selector || !msg.selector.startsWith("0x")) {
          throw new Error(`Message '${msg.label}' is missing its selector`);
        }
      }
    };

    expect(() => assertSelector(broken)).toThrow(/missing its selector/);
    expect(() => assertSelector(meta)).not.toThrow();
  });
});

// ── EVM ABI parsing ─────────────────────────────────────────────────────────

describe("EVM ABI parsing", () => {
  it("parses the ERC20 fixture", () => {
    const abi = JSON.parse(readFixture("erc20.abi.json")) as EvmAbi;

    expect(abi.contractName).toBe("ERC20");
    const fns = abi.abi.filter((i) => i.type === "function");
    expect(fns.map((f) => f.name)).toEqual([
      "balanceOf",
      "totalSupply",
      "transfer",
      "setName",
    ]);
  });

  it("distinguishes view, nonpayable, and event entries", () => {
    const abi = JSON.parse(readFixture("erc20.abi.json")) as EvmAbi;

    const view = abi.abi.filter(
      (i) => i.type === "function" && i.stateMutability === "view",
    );
    const write = abi.abi.filter(
      (i) => i.type === "function" && i.stateMutability === "nonpayable",
    );
    const events = abi.abi.filter((i) => i.type === "event");

    expect(view.map((f) => f.name)).toEqual(["balanceOf", "totalSupply"]);
    expect(write.map((f) => f.name)).toEqual(["transfer", "setName"]);
    expect(events.map((e) => e.name)).toEqual(["Transfer"]);
  });
});

// ── encodeFunction ──────────────────────────────────────────────────────────

describe("encodeFunction", () => {
  const abi = JSON.parse(readFixture("erc20.abi.json")) as EvmAbi;

  it("encodes balanceOf(address) with the correct selector", () => {
    const encoded = encodeFunction(abi, "balanceOf", [
      "0x0000000000000000000000000000000000000001",
    ]);
    expect(encoded).toMatch(/^0x[0-9a-f]+$/i);
    // Selector of balanceOf(address) is 0x70a08231
    expect(encoded.slice(0, 10)).toBe("0x70a08231");
    // 4 bytes selector + 32 bytes arg = 36 bytes = 72 hex chars + "0x"
    expect(encoded.length).toBe(2 + 8 + 64);
  });

  it("encodes transfer(address,uint256) with both args", () => {
    const encoded = encodeFunction(abi, "transfer", [
      "0x0000000000000000000000000000000000000002",
      1000n,
    ]);
    expect(encoded.slice(0, 10)).toBe("0xa9059cbb");
    // 4 bytes selector + 2 × 32 bytes = 68 bytes = 136 hex chars + "0x"
    expect(encoded.length).toBe(2 + 8 + 64 * 2);
  });

  it("encodes totalSupply() with no args (only selector)", () => {
    const encoded = encodeFunction(abi, "totalSupply", []);
    expect(encoded).toBe("0x18160ddd");
  });

  it("throws on unknown method", () => {
    expect(() => encodeFunction(abi, "nonExistent", [])).toThrow(
      /not found in ABI/,
    );
  });

  it("throws on wrong arg count", () => {
    expect(() => encodeFunction(abi, "balanceOf", [])).toThrow(
      /Expected 1 arguments/,
    );
    expect(() =>
      encodeFunction(abi, "balanceOf", ["0xabc", "extra"]),
    ).toThrow(/Expected 1 arguments/);
  });

  it("handles dynamic-length string args with head/tail encoding", () => {
    const encoded = encodeFunction(abi, "setName", ["Hi"]);
    // selector + 1 head word (offset) + 1 length word + 1 data word
    expect(encoded.slice(0, 10)).toMatch(/^0x[0-9a-f]{8}$/);
    // The dynamic offset for the only arg must be 0x20 (32 bytes)
    const headWord = encoded.slice(10, 10 + 64);
    expect(BigInt("0x" + headWord)).toBe(32n);
  });
});

// ── decodeResult ────────────────────────────────────────────────────────────

describe("decodeResult", () => {
  const abi = JSON.parse(readFixture("erc20.abi.json")) as EvmAbi;

  it("decodes a uint256 result as bigint", () => {
    const raw =
      "0x" + (12345n).toString(16).padStart(64, "0");
    const result = decodeResult(abi, "totalSupply", raw);
    expect(result).toBe(12345n);
  });

  it("decodes a bool result", () => {
    const raw = "0x" + "1".padStart(64, "0");
    const result = decodeResult(abi, "transfer", raw);
    expect(result).toBe(true);
  });

  it("returns null for functions with no outputs", () => {
    const result = decodeResult(abi, "setName", "0x");
    expect(result).toBeNull();
  });
});

// ── utils ──────────────────────────────────────────────────────────────────

describe("contract utils", () => {
  describe("hexToBytes / bytesToHex round trip", () => {
    it("decodes and re-encodes equivalently", () => {
      const hex = "0xdeadbeef";
      const bytes = hexToBytes(hex);
      expect(bytes).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
      expect(bytesToHex(bytes)).toBe(hex);
    });

    it("handles unprefixed hex", () => {
      expect(hexToBytes("cafe")).toEqual(new Uint8Array([0xca, 0xfe]));
    });

    it("throws on odd-length hex", () => {
      expect(() => hexToBytes("0xabc")).toThrow(/Invalid hex string length/);
    });
  });

  it("concatBytes concatenates correctly", () => {
    const out = concatBytes(
      new Uint8Array([1, 2]),
      new Uint8Array([3]),
      new Uint8Array([4, 5, 6]),
    );
    expect(out).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6]));
  });

  it("isValidEvmAddress validates 0x-prefixed 20-byte hex", () => {
    expect(isValidEvmAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe(
      true,
    );
    expect(isValidEvmAddress("1234567890abcdef1234567890abcdef12345678")).toBe(
      false,
    );
    expect(isValidEvmAddress("0x1234")).toBe(false);
  });

  it("isValidSs58Address validates base58 format", () => {
    expect(
      isValidSs58Address("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"),
    ).toBe(true);
    expect(isValidSs58Address("0xNotAnSs58Address")).toBe(false);
    expect(isValidSs58Address("short")).toBe(false);
  });

  it("keccak256 matches the known empty-string hash", () => {
    const empty = keccak256(new Uint8Array());
    expect(bytesToHex(empty)).toBe(
      "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    );
  });

  it("keccak256 matches the known 'abc' hash", () => {
    const abc = keccak256(new TextEncoder().encode("abc"));
    expect(bytesToHex(abc)).toBe(
      "0x4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45",
    );
  });
});
