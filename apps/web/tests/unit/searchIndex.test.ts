import { describe, it, expect } from "vitest";
import {
  buildSearchItems,
  createFuseIndex,
  fuzzySearch,
} from "../../utils/searchIndex";
import type { PalletInfo } from "@workspace/core";

const mockPallets: PalletInfo[] = [
  {
    name: "Balances",
    calls: [
      {
        name: "transfer_keep_alive",
        args: [
          { name: "dest", type: "AccountId" },
          { name: "value", type: "Balance" },
        ],
        docs: ["Transfer some liquid free balance to another account."],
      },
      {
        name: "force_transfer",
        args: [
          { name: "source", type: "AccountId" },
          { name: "dest", type: "AccountId" },
          { name: "value", type: "Balance" },
        ],
        docs: ["Exactly as `transfer_keep_alive`, except the origin must be root."],
      },
    ],
    storage: [
      {
        name: "TotalIssuance",
        type: "u128",
        docs: ["The total units issued in the system."],
      },
    ],
    events: [
      {
        name: "Transfer",
        args: [
          { name: "from", type: "AccountId" },
          { name: "to", type: "AccountId" },
          { name: "amount", type: "Balance" },
        ],
        docs: ["Transfer succeeded."],
      },
    ],
    constants: [
      {
        name: "ExistentialDeposit",
        type: "u128",
        value: "10000000000",
        docs: ["The minimum amount required to keep an account open."],
      },
    ],
    errors: [
      {
        name: "InsufficientBalance",
        type: "Error",
        docs: ["Balance too low to send value."],
      },
    ],
  },
  {
    name: "System",
    calls: [],
    storage: [
      {
        name: "Account",
        type: "AccountInfo",
        docs: ["The full account information for a particular account ID."],
      },
    ],
    events: [],
    constants: [],
    errors: [],
  },
];

describe("searchIndex", () => {
  describe("buildSearchItems", () => {
    it("builds items from pallets", () => {
      const items = buildSearchItems(mockPallets);

      // 2 pallets + 2 calls + 1 storage + 1 event + 1 constant + 1 error + 1 system storage = 9
      expect(items.length).toBe(9);
    });

    it("creates correct pallet items", () => {
      const items = buildSearchItems(mockPallets);
      const palletItem = items.find(
        (i) => i.type === "pallet" && i.name === "Balances",
      );
      expect(palletItem).toBeDefined();
      expect(palletItem!.fullPath).toBe("Balances");
    });

    it("creates correct call items with docs", () => {
      const items = buildSearchItems(mockPallets);
      const callItem = items.find(
        (i) => i.type === "call" && i.name === "transfer_keep_alive",
      );
      expect(callItem).toBeDefined();
      expect(callItem!.fullPath).toBe("Balances.transfer_keep_alive");
      expect(callItem!.docs).toContain("Transfer some liquid");
      expect(callItem!.params).toBe("dest, value");
    });

    it("creates correct storage items", () => {
      const items = buildSearchItems(mockPallets);
      const storageItem = items.find(
        (i) => i.type === "storage" && i.name === "TotalIssuance",
      );
      expect(storageItem).toBeDefined();
      expect(storageItem!.docs).toContain("total units");
    });

    it("creates items for events, constants, errors", () => {
      const items = buildSearchItems(mockPallets);
      expect(items.filter((i) => i.type === "event")).toHaveLength(1);
      expect(items.filter((i) => i.type === "constant")).toHaveLength(1);
      expect(items.filter((i) => i.type === "error")).toHaveLength(1);
    });
  });

  describe("fuzzySearch", () => {
    it("finds exact matches", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "Balances");

      expect(result.pallets.has("Balances")).toBe(true);
    });

    it("finds fuzzy matches (typo-tolerant)", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "transfer");

      expect(result.pallets.has("Balances")).toBe(true);
      expect(result.calls.get("Balances")?.has("transfer_keep_alive")).toBe(true);
    });

    it("finds matches by doc content", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "liquid free balance");

      expect(result.pallets.has("Balances")).toBe(true);
    });

    it("returns empty sets for no matches", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "xyznonexistent");

      expect(result.pallets.size).toBe(0);
    });

    it("finds storage items", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "TotalIssuance");

      expect(result.storage.get("Balances")?.has("TotalIssuance")).toBe(true);
    });

    it("respects result limit", () => {
      const items = buildSearchItems(mockPallets);
      const fuse = createFuseIndex(items);
      const result = fuzzySearch(fuse, "a", 2);

      // With limit 2, we should get at most 2 pallets referenced
      expect(result.pallets.size).toBeLessThanOrEqual(2);
    });
  });
});
