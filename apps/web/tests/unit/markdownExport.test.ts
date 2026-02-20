import { describe, it, expect } from "vitest";
import {
  exportStorageQuery,
  exportTransaction,
  exportConstant,
  exportEvent,
  exportError,
  exportPallet,
  exportBatchCode,
} from "../../utils/markdownExport";

describe("exportStorageQuery", () => {
  const ctx = { chain: "Polkadot", pallet: "System" };
  const storage = { name: "Account", type: "AccountInfo", docs: ["The full account information for a particular account ID."] };

  it("generates markdown with chain, pallet, item, query type, and code", () => {
    const md = exportStorageQuery(ctx, storage, "getValue", { key: "5Grw..." }, "const result = await api.query.System.Account.getValue('5Grw...')");
    expect(md).toContain("## Storage Query: System.Account");
    expect(md).toContain("**Chain**: Polkadot");
    expect(md).toContain("**Pallet**: System");
    expect(md).toContain("**Storage Item**: Account");
    expect(md).toContain("**Type**: `AccountInfo`");
    expect(md).toContain("**Query Type**: getValue");
    expect(md).toContain("5Grw...");
    expect(md).toContain("```typescript");
    expect(md).toContain("const result = await api.query.System.Account.getValue");
    expect(md).toContain("> The full account information");
  });

  it("includes result when provided", () => {
    const result = { nonce: 42, data: { free: "1000" } };
    const md = exportStorageQuery(ctx, storage, "getValue", {}, "code", result);
    expect(md).toContain("### Result");
    expect(md).toContain("```json");
    expect(md).toContain('"nonce": 42');
  });

  it("omits result section when no result provided", () => {
    const md = exportStorageQuery(ctx, storage, "getValue", {}, "code");
    expect(md).not.toContain("### Result");
  });

  it("omits docs section when docs array is empty", () => {
    const noDocStorage = { name: "Account", type: "AccountInfo", docs: [] };
    const md = exportStorageQuery(ctx, noDocStorage, "getValue", {}, "code");
    expect(md).not.toContain("### Docs");
  });

  it("truncates large array results (>50 items)", () => {
    const bigResult = Array.from({ length: 75 }, (_, i) => ({ id: i }));
    const md = exportStorageQuery(ctx, storage, "getEntries", {}, "code", bigResult);
    expect(md).toContain("### Result");
    expect(md).toContain('"id": 0');
    expect(md).toContain('"id": 9');
    expect(md).not.toContain('"id": 10');
    expect(md).toContain("...and 65 more entries");
  });
});

describe("exportTransaction", () => {
  const ctx = { chain: "Polkadot", pallet: "Balances" };
  const call = {
    name: "transfer_keep_alive",
    args: [{ name: "dest", type: "MultiAddress" }, { name: "value", type: "u128" }],
    docs: ["Transfer some liquid free balance to another account."],
  };

  it("generates markdown with chain, pallet, call, params, and code", () => {
    const params = { dest: "5Grw...", value: "1000000000000" };
    const md = exportTransaction(ctx, call, params, "const tx = api.tx.Balances.transfer_keep_alive(...)");
    expect(md).toContain("## Transaction: Balances.transfer_keep_alive");
    expect(md).toContain("**Chain**: Polkadot");
    expect(md).toContain("**Call**: transfer_keep_alive");
    expect(md).toContain("- `dest`: `5Grw...`");
    expect(md).toContain("- `value`: `1000000000000`");
    expect(md).toContain("```typescript");
    expect(md).toContain("> Transfer some liquid free balance");
  });

  it("includes tx result when provided", () => {
    const md = exportTransaction(ctx, call, {}, "code", { hash: "0xabc", blockNumber: "12345", success: true });
    expect(md).toContain("### Result");
    expect(md).toContain("**Hash**: `0xabc`");
    expect(md).toContain("**Block**: `#12345`");
    expect(md).toContain("**Status**: Success");
  });

  it("shows Failure status when success is false", () => {
    const md = exportTransaction(ctx, call, {}, "code", { hash: "0xabc", success: false });
    expect(md).toContain("**Status**: Failed");
  });

  it("omits result section when no txResult provided", () => {
    const md = exportTransaction(ctx, call, {}, "code");
    expect(md).not.toContain("### Result");
  });
});

describe("exportConstant", () => {
  const ctx = { chain: "Polkadot", pallet: "Balances" };
  const constant = { name: "ExistentialDeposit", type: "u128", value: 10000000000, docs: ["The minimum amount required to keep an account open."] };

  it("generates markdown with name, type, value, code, and docs", () => {
    const md = exportConstant(ctx, constant, "const ed = await api.constants.Balances.ExistentialDeposit()");
    expect(md).toContain("## Constant: Balances.ExistentialDeposit");
    expect(md).toContain("**Type**: `u128`");
    expect(md).toContain("**Value**: `10000000000`");
    expect(md).toContain("```typescript");
    expect(md).toContain("> The minimum amount");
  });
});

describe("exportEvent", () => {
  const ctx = { chain: "Polkadot", pallet: "Balances" };
  const event = {
    name: "Transfer",
    args: [{ name: "from", type: "AccountId32" }, { name: "to", type: "AccountId32" }, { name: "amount", type: "u128" }],
    docs: ["Transfer succeeded."],
  };

  it("generates markdown with name, fields, code, and docs", () => {
    const md = exportEvent(ctx, event, "api.event.Balances.Transfer.watch()");
    expect(md).toContain("## Event: Balances.Transfer");
    expect(md).toContain("- `from`: `AccountId32`");
    expect(md).toContain("- `to`: `AccountId32`");
    expect(md).toContain("- `amount`: `u128`");
    expect(md).toContain("```typescript");
    expect(md).toContain("> Transfer succeeded.");
  });
});

describe("exportError", () => {
  const ctx = { chain: "Polkadot", pallet: "Balances" };
  const error = { name: "InsufficientBalance", type: "DispatchError", docs: ["Balance too low to send value."] };

  it("generates markdown with name, type, code, and docs", () => {
    const md = exportError(ctx, error, "// error handling code");
    expect(md).toContain("## Error: Balances.InsufficientBalance");
    expect(md).toContain("**Type**: `DispatchError`");
    expect(md).toContain("```typescript");
    expect(md).toContain("> Balance too low");
  });
});

describe("exportPallet", () => {
  const pallet: any = {
    name: "Balances",
    calls: [
      { name: "transfer_keep_alive", args: [{ name: "dest", type: "MultiAddress" }, { name: "value", type: "u128" }], docs: ["Transfer some liquid free balance."] },
      { name: "transfer_allow_death", args: [{ name: "dest", type: "MultiAddress" }, { name: "value", type: "u128" }], docs: ["Transfer the entire balance."] },
    ],
    storage: [
      { name: "TotalIssuance", type: "u128", docs: ["The total units issued."] },
    ],
    events: [
      { name: "Transfer", args: [{ name: "from", type: "AccountId32" }, { name: "to", type: "AccountId32" }, { name: "amount", type: "u128" }], docs: ["Transfer succeeded."] },
    ],
    constants: [
      { name: "ExistentialDeposit", type: "u128", value: 10000000000, docs: ["The minimum amount."] },
    ],
    errors: [
      { name: "InsufficientBalance", type: "DispatchError", docs: ["Balance too low."] },
    ],
  };

  it("generates pallet overview with all categories as tables", () => {
    const md = exportPallet("Polkadot", pallet);
    expect(md).toContain("## Pallet: Balances (Polkadot)");
    expect(md).toContain("### Calls (2)");
    expect(md).toContain("| transfer_keep_alive |");
    expect(md).toContain("### Storage (1)");
    expect(md).toContain("| TotalIssuance |");
    expect(md).toContain("### Events (1)");
    expect(md).toContain("| Transfer |");
    expect(md).toContain("### Constants (1)");
    expect(md).toContain("| ExistentialDeposit |");
    expect(md).toContain("### Errors (1)");
    expect(md).toContain("| InsufficientBalance |");
  });

  it("handles missing errors gracefully", () => {
    const noErrors = { ...pallet, errors: undefined };
    const md = exportPallet("Polkadot", noErrors);
    expect(md).not.toContain("### Errors");
  });

  it("truncates categories with more than 20 items", () => {
    const manyCalls = Array.from({ length: 25 }, (_, i) => ({
      name: `call_${i}`,
      args: [],
      docs: [],
    }));
    const bigPallet = { ...pallet, calls: manyCalls };
    const md = exportPallet("Polkadot", bigPallet);
    expect(md).toContain("| call_0 |");
    expect(md).toContain("| call_19 |");
    expect(md).not.toContain("| call_20 |");
    expect(md).toContain("...and 5 more");
  });
});

describe("exportBatchCode", () => {
  it("generates a simple code block with header and chain", () => {
    const md = exportBatchCode("Polkadot", "Batch Transaction", "const tx = api.tx.utility.batch(...)");
    expect(md).toContain("## Batch Transaction");
    expect(md).toContain("**Chain**: Polkadot");
    expect(md).toContain("```typescript");
    expect(md).toContain("api.tx.utility.batch");
  });
});
