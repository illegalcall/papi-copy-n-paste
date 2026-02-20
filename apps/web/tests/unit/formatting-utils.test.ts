import { describe, it, expect } from "vitest";
import {
  formatStorageResult,
  formatTransactionResult,
  decodeStorageResult,
  generateCallParams,
  generateStorageParams,
} from "../../utils/formatting-utils";

describe("formatting-utils", () => {
  describe("formatStorageResult", () => {
    it("returns null for null/undefined", () => {
      expect(formatStorageResult(null)).toBe("null");
      expect(formatStorageResult(undefined)).toBe("null");
    });

    it("formats bigint values", () => {
      expect(formatStorageResult(42n)).toBe("42 (BigInt)");
    });

    it("formats large bigint as DOT", () => {
      const result = formatStorageResult(10_000_000_000n);
      expect(result).toContain("planck");
      expect(result).toContain("DOT");
    });

    it("formats Uint8Array", () => {
      const arr = new Uint8Array([0xab, 0xcd]);
      const result = formatStorageResult(arr);
      expect(result).toContain("Uint8Array");
      expect(result).toContain("abcd");
    });

    it("formats objects as JSON", () => {
      const result = formatStorageResult({ key: "value" });
      expect(result).toContain('"key"');
      expect(result).toContain('"value"');
    });

    it("formats strings directly", () => {
      expect(formatStorageResult("hello")).toBe("hello");
    });

    it("formats numbers", () => {
      expect(formatStorageResult(42)).toBe("42");
    });
  });

  describe("formatTransactionResult", () => {
    it("returns message for null", () => {
      expect(formatTransactionResult(null)).toBe("No result available");
    });

    it("returns string results directly", () => {
      expect(formatTransactionResult("done")).toBe("done");
    });

    it("formats success results", () => {
      const result = formatTransactionResult({ success: true, message: "OK" });
      expect(result).toContain("Success");
      expect(result).toContain("OK");
    });

    it("formats failure results", () => {
      const result = formatTransactionResult({ success: false, error: "Nope" });
      expect(result).toContain("Failed");
      expect(result).toContain("Nope");
    });

    it("formats status results", () => {
      expect(formatTransactionResult({ status: "pending" })).toBe(
        "Status: pending",
      );
    });

    it("formats hash results", () => {
      expect(formatTransactionResult({ hash: "0xabc" })).toBe(
        "Transaction Hash: 0xabc",
      );
    });
  });

  describe("decodeStorageResult", () => {
    it("formats hex with byte count", () => {
      const result = decodeStorageResult("0xabcd", "System", "Account");
      expect(result).toContain("0xabcd");
      expect(result).toContain("2 bytes");
    });

    it("handles hex without 0x prefix", () => {
      const result = decodeStorageResult("abcd", "System", "Account");
      expect(result).toContain("0xabcd");
    });
  });

  describe("generateCallParams", () => {
    it("generates account params with test accounts", () => {
      const params = { dest: "//Alice" };
      const required = [{ name: "dest", type: "AccountId", description: "", defaultValue: "" }];
      const result = generateCallParams(params, required);
      expect(result).toContain("dest:");
      expect(result).toContain("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");
    });

    it("generates balance params", () => {
      const params = { value: "1" };
      const required = [{ name: "value", type: "Balance", description: "", defaultValue: "" }];
      const result = generateCallParams(params, required);
      expect(result).toContain("value:");
      expect(result).toContain("10000000000");
    });

    it("generates numeric params", () => {
      const params = { index: "5" };
      const required = [{ name: "index", type: "Number", description: "", defaultValue: "" }];
      const result = generateCallParams(params, required);
      expect(result).toContain("index: 5");
    });
  });

  describe("generateStorageParams", () => {
    it("generates AccountId params", () => {
      const params = { accountid: "//Bob" };
      const result = generateStorageParams(params, ["AccountId"]);
      expect(result).toContain("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty");
    });

    it("generates index params", () => {
      const params = { number: "42" };
      const result = generateStorageParams(params, ["Number"]);
      expect(result).toBe("42");
    });

    it("generates hash params with default", () => {
      const params = {};
      const result = generateStorageParams(params, ["Hash"]);
      expect(result).toContain("0x0000");
    });
  });
});
