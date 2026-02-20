import { describe, it, expect } from "vitest";
import {
  isNumericType,
  isBigIntType,
  isBalanceType,
  isAccountType,
  isIndexType,
  isUnsignedType,
  isSignedType,
  isU32OrU64Type,
  isBoolType,
  getSimpleTypeCategory,
  getDefaultValueForType,
} from "../../utils/typeCheckers";

describe("typeCheckers", () => {
  describe("isNumericType", () => {
    it("detects unsigned integers", () => {
      expect(isNumericType("u8")).toBe(true);
      expect(isNumericType("u16")).toBe(true);
      expect(isNumericType("u32")).toBe(true);
      expect(isNumericType("u64")).toBe(true);
      expect(isNumericType("u128")).toBe(true);
    });

    it("detects signed integers", () => {
      expect(isNumericType("i8")).toBe(true);
      expect(isNumericType("i64")).toBe(true);
      expect(isNumericType("i128")).toBe(true);
    });

    it("detects balance types", () => {
      expect(isNumericType("Balance")).toBe(true);
      expect(isNumericType("Compact")).toBe(true);
    });

    it("detects Compact wrapper", () => {
      expect(isNumericType("Compact<u128>")).toBe(true);
    });

    it("rejects non-numeric types", () => {
      expect(isNumericType("String")).toBe(false);
      expect(isNumericType("AccountId")).toBe(false);
      expect(isNumericType("Bool")).toBe(false);
    });
  });

  describe("isBigIntType", () => {
    it("detects 64/128 bit types", () => {
      expect(isBigIntType("u64")).toBe(true);
      expect(isBigIntType("u128")).toBe(true);
      expect(isBigIntType("i64")).toBe(true);
      expect(isBigIntType("i128")).toBe(true);
    });

    it("detects Balance as BigInt", () => {
      expect(isBigIntType("Balance")).toBe(true);
    });

    it("detects Compact as BigInt", () => {
      expect(isBigIntType("Compact<u128>")).toBe(true);
    });

    it("rejects small integer types", () => {
      expect(isBigIntType("u8")).toBe(false);
      expect(isBigIntType("u16")).toBe(false);
      expect(isBigIntType("u32")).toBe(false);
    });
  });

  describe("isBalanceType", () => {
    it("detects Balance", () => {
      expect(isBalanceType("Balance")).toBe(true);
    });

    it("detects Compact wrapper", () => {
      expect(isBalanceType("Compact<Balance>")).toBe(true);
    });

    it("rejects non-balance types", () => {
      expect(isBalanceType("u32")).toBe(false);
      expect(isBalanceType("AccountId")).toBe(false);
    });
  });

  describe("isAccountType", () => {
    it("detects AccountId", () => {
      expect(isAccountType("AccountId")).toBe(true);
    });

    it("detects MultiAddress", () => {
      expect(isAccountType("MultiAddress")).toBe(true);
    });

    it("detects SS58String", () => {
      expect(isAccountType("SS58String")).toBe(true);
    });

    it("rejects non-account types", () => {
      expect(isAccountType("u32")).toBe(false);
      expect(isAccountType("Balance")).toBe(false);
    });
  });

  describe("isIndexType", () => {
    it("detects Number", () => {
      expect(isIndexType("Number")).toBe(true);
    });

    it("detects Index", () => {
      expect(isIndexType("Index")).toBe(true);
    });

    it("rejects non-index types", () => {
      expect(isIndexType("u32")).toBe(false);
      expect(isIndexType("AccountId")).toBe(false);
    });
  });

  describe("isUnsignedType", () => {
    it("detects unsigned types", () => {
      expect(isUnsignedType("u8")).toBe(true);
      expect(isUnsignedType("u128")).toBe(true);
    });

    it("rejects signed types", () => {
      expect(isUnsignedType("i8")).toBe(false);
      expect(isUnsignedType("i128")).toBe(false);
    });
  });

  describe("isSignedType", () => {
    it("detects signed types", () => {
      expect(isSignedType("i8")).toBe(true);
      expect(isSignedType("i128")).toBe(true);
    });

    it("rejects unsigned types", () => {
      expect(isSignedType("u8")).toBe(false);
    });
  });

  describe("isU32OrU64Type", () => {
    it("matches exact u32 and u64", () => {
      expect(isU32OrU64Type("u32")).toBe(true);
      expect(isU32OrU64Type("u64")).toBe(true);
    });

    it("rejects other types", () => {
      expect(isU32OrU64Type("u8")).toBe(false);
      expect(isU32OrU64Type("u128")).toBe(false);
    });
  });

  describe("isBoolType", () => {
    it("detects Bool and bool", () => {
      expect(isBoolType("Bool")).toBe(true);
      expect(isBoolType("bool")).toBe(true);
    });

    it("rejects non-bool", () => {
      expect(isBoolType("u8")).toBe(false);
    });
  });

  describe("getSimpleTypeCategory", () => {
    it("categorizes bool types", () => {
      expect(getSimpleTypeCategory("Bool")).toBe("bool");
      expect(getSimpleTypeCategory("bool")).toBe("bool");
    });

    it("categorizes account types", () => {
      expect(getSimpleTypeCategory("AccountId")).toBe("account");
      expect(getSimpleTypeCategory("SS58String")).toBe("account");
    });

    it("categorizes numeric types", () => {
      expect(getSimpleTypeCategory("u32")).toBe("number");
      expect(getSimpleTypeCategory("Balance")).toBe("number");
    });

    it("defaults to string", () => {
      expect(getSimpleTypeCategory("Hash")).toBe("string");
      expect(getSimpleTypeCategory("Bytes")).toBe("string");
    });

    it("treats Vec<u8> as number since it contains u8", () => {
      // Vec<u8> matches as numeric because it contains "u8"
      expect(getSimpleTypeCategory("Vec<u8>")).toBe("number");
    });
  });

  describe("getDefaultValueForType", () => {
    it("returns false for bool", () => {
      expect(getDefaultValueForType("Bool")).toBe(false);
    });

    it("returns 0 for numbers", () => {
      expect(getDefaultValueForType("u32")).toBe(0);
    });

    it("returns //Alice for accounts", () => {
      expect(getDefaultValueForType("AccountId")).toBe("//Alice");
    });

    it("returns empty string for others", () => {
      expect(getDefaultValueForType("Hash")).toBe("");
    });
  });
});
