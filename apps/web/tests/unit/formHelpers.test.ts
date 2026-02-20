import { describe, it, expect } from "vitest";
import {
  parseSimpleType,
  getDefaultValue,
  initializeFormData,
  hasValidFormData,
} from "../../utils/formHelpers";

describe("formHelpers", () => {
  describe("parseSimpleType", () => {
    it("delegates to getSimpleTypeCategory", () => {
      expect(parseSimpleType("Bool")).toBe("bool");
      expect(parseSimpleType("AccountId")).toBe("account");
      expect(parseSimpleType("u32")).toBe("number");
      expect(parseSimpleType("Hash")).toBe("string");
    });
  });

  describe("getDefaultValue", () => {
    it("returns false for bool types", () => {
      expect(getDefaultValue("Bool")).toBe(false);
    });

    it("returns 0 for numeric types", () => {
      expect(getDefaultValue("u128")).toBe(0);
    });

    it("returns //Alice for account types", () => {
      expect(getDefaultValue("AccountId")).toBe("//Alice");
    });

    it("returns empty string for string types", () => {
      expect(getDefaultValue("Hash")).toBe("");
    });
  });

  describe("initializeFormData", () => {
    it("creates form data with default values", () => {
      const args = [
        { name: "dest", type: "AccountId" },
        { name: "value", type: "Balance" },
        { name: "flag", type: "Bool" },
      ];

      const result = initializeFormData(args);

      expect(result).toEqual({
        dest: "//Alice",
        value: 0,
        flag: false,
      });
    });

    it("returns empty object for no args", () => {
      expect(initializeFormData([])).toEqual({});
    });
  });

  describe("hasValidFormData", () => {
    it("returns true for empty args", () => {
      expect(hasValidFormData({}, [])).toBe(true);
    });

    it("validates boolean fields", () => {
      const args = [{ name: "flag", type: "Bool" }];
      expect(hasValidFormData({ flag: true }, args)).toBe(true);
      expect(hasValidFormData({ flag: false }, args)).toBe(true);
      expect(hasValidFormData({ flag: "notbool" }, args)).toBe(false);
    });

    it("validates numeric fields", () => {
      const args = [{ name: "amount", type: "u32" }];
      expect(hasValidFormData({ amount: 100 }, args)).toBe(true);
      expect(hasValidFormData({ amount: 0 }, args)).toBe(true);
      expect(hasValidFormData({ amount: -1 }, args)).toBe(false);
    });

    it("validates account fields", () => {
      const args = [{ name: "dest", type: "AccountId" }];
      expect(hasValidFormData({ dest: "5Grw..." }, args)).toBe(true);
      expect(hasValidFormData({ dest: "" }, args)).toBe(false);
    });

    it("validates string fields", () => {
      const args = [{ name: "data", type: "Hash" }];
      expect(hasValidFormData({ data: "0xabc" }, args)).toBe(true);
      expect(hasValidFormData({ data: "" }, args)).toBe(false);
    });

    it("validates multiple fields", () => {
      const args = [
        { name: "dest", type: "AccountId" },
        { name: "value", type: "Balance" },
      ];
      expect(hasValidFormData({ dest: "5Grw...", value: 100 }, args)).toBe(true);
      expect(hasValidFormData({ dest: "", value: 100 }, args)).toBe(false);
    });
  });
});
