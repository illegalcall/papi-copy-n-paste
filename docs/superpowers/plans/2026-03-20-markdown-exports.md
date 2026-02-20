# Markdown Exports Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clipboard-copy markdown export buttons to the web app so any action (query, transaction, exploration) can be exported as structured markdown.

**Architecture:** Centralized pure-function export utility (`markdownExport.ts`) generates markdown strings. A `useSessionExport` hook tracks all exports. A reusable `ExportMarkdownButton` component is added to the code panel, console results, pallet tree, and right-pane header.

**Tech Stack:** React 19, Next.js 15, TypeScript, Vitest, shadcn/ui, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-20-markdown-exports-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `apps/web/utils/markdownExport.ts` | Pure functions: 6 export formatters + 1 batch helper |
| `apps/web/tests/unit/markdownExport.test.ts` | Unit tests for all export functions |
| `apps/web/hooks/useSessionExport.ts` | Session tracking: accumulate exports, concatenate for session export |
| `apps/web/components/export-button.tsx` | Reusable button: calls getMarkdown(), copies to clipboard, fires onExported |

### Modified Files
| File | Change |
|------|--------|
| `apps/web/components/layout/right-pane.tsx` | Add export button to Code tab, session export button in header, new props |
| `apps/web/components/tree/pallet-tree.tsx` | Add per-pallet export button on pallet header rows |
| `apps/web/app/PageContent.tsx` | Wire `useSessionExport`, pass new props to RightPane and LeftPane/PalletTree |
| `apps/web/components/layout/left-pane.tsx` | Pass through `onPalletExport` prop to PalletTree |

---

## Task 1: Core Export Utility — Storage Query & Transaction

**Files:**
- Create: `apps/web/utils/markdownExport.ts`
- Create: `apps/web/tests/unit/markdownExport.test.ts`

- [ ] **Step 1: Write failing tests for `exportStorageQuery`**

```typescript
// apps/web/tests/unit/markdownExport.test.ts
import { describe, it, expect } from "vitest";
import { exportStorageQuery } from "../../utils/markdownExport";

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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: FAIL — module `../../utils/markdownExport` not found

- [ ] **Step 3: Write failing tests for `exportTransaction`**

Add to the same test file:

```typescript
import { exportTransaction } from "../../utils/markdownExport";

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
```

- [ ] **Step 4: Implement `exportStorageQuery` and `exportTransaction`**

```typescript
// apps/web/utils/markdownExport.ts
import type { PalletCall, PalletStorage, PalletEvent, PalletConstant, PalletError, PalletInfo } from "@workspace/core";

export interface ExportContext {
  chain: string;
  pallet: string;
}

function formatDocs(docs: string[]): string {
  if (docs.length === 0) return "";
  const text = docs.join("\n");
  return `\n### Docs\n\n> ${text.replace(/\n/g, "\n> ")}\n`;
}

function formatParams(params: Record<string, any>): string {
  const entries = Object.entries(params);
  if (entries.length === 0) return "";
  const lines = entries.map(([k, v]) => `- \`${k}\`: \`${String(v)}\``);
  return `**Parameters**:\n${lines.join("\n")}`;
}

const MAX_RESULT_ITEMS = 50;
const TRUNCATED_DISPLAY = 10;

function formatResult(result: any): string {
  if (Array.isArray(result) && result.length > MAX_RESULT_ITEMS) {
    const truncated = result.slice(0, TRUNCATED_DISPLAY);
    const json = JSON.stringify(truncated, null, 2);
    return `\n### Result\n\n\`\`\`json\n${json}\n\`\`\`\n\n*...and ${result.length - TRUNCATED_DISPLAY} more entries*\n`;
  }
  const json = JSON.stringify(result, null, 2);
  return `\n### Result\n\n\`\`\`json\n${json}\n\`\`\`\n`;
}

export function exportStorageQuery(
  ctx: ExportContext,
  storage: PalletStorage,
  queryType: string,
  params: Record<string, any>,
  code: string,
  result?: any,
): string {
  let md = `## Storage Query: ${ctx.pallet}.${storage.name}\n\n`;
  md += `**Chain**: ${ctx.chain}\n`;
  md += `**Pallet**: ${ctx.pallet}\n`;
  md += `**Storage Item**: ${storage.name}\n`;
  md += `**Type**: \`${storage.type}\`\n`;
  md += `**Query Type**: ${queryType}\n`;

  const paramStr = formatParams(params);
  if (paramStr) md += `${paramStr}\n`;

  if (result !== undefined) {
    md += formatResult(result);
  }

  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  md += formatDocs(storage.docs);

  return md;
}

export function exportTransaction(
  ctx: ExportContext,
  call: PalletCall,
  params: Record<string, any>,
  code: string,
  txResult?: { hash: string; blockNumber?: string; success: boolean },
): string {
  let md = `## Transaction: ${ctx.pallet}.${call.name}\n\n`;
  md += `**Chain**: ${ctx.chain}\n`;
  md += `**Pallet**: ${ctx.pallet}\n`;
  md += `**Call**: ${call.name}\n`;

  const paramStr = formatParams(params);
  if (paramStr) md += `${paramStr}\n`;

  if (txResult) {
    md += `\n### Result\n\n`;
    md += `- **Hash**: \`${txResult.hash}\`\n`;
    if (txResult.blockNumber) md += `- **Block**: \`#${txResult.blockNumber}\`\n`;
    md += `- **Status**: ${txResult.success ? "Success" : "Failed"}\n`;
  }

  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  md += formatDocs(call.docs);

  return md;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add apps/web/utils/markdownExport.ts apps/web/tests/unit/markdownExport.test.ts
git commit -m "feat: add markdown export for storage queries and transactions"
```

---

## Task 2: Core Export Utility — Constant, Event, Error

**Files:**
- Modify: `apps/web/utils/markdownExport.ts`
- Modify: `apps/web/tests/unit/markdownExport.test.ts`

- [ ] **Step 1: Write failing tests for `exportConstant`, `exportEvent`, `exportError`**

Add to `apps/web/tests/unit/markdownExport.test.ts`:

```typescript
import { exportConstant, exportEvent, exportError } from "../../utils/markdownExport";

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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: FAIL — functions not exported

- [ ] **Step 3: Implement `exportConstant`, `exportEvent`, `exportError`**

Add to `apps/web/utils/markdownExport.ts`:

```typescript
export function exportConstant(
  ctx: ExportContext,
  constant: PalletConstant,
  code: string,
): string {
  let md = `## Constant: ${ctx.pallet}.${constant.name}\n\n`;
  md += `**Chain**: ${ctx.chain}\n`;
  md += `**Pallet**: ${ctx.pallet}\n`;
  md += `**Name**: ${constant.name}\n`;
  md += `**Type**: \`${constant.type}\`\n`;
  md += `**Value**: \`${JSON.stringify(constant.value)}\`\n`;
  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  md += formatDocs(constant.docs);
  return md;
}

export function exportEvent(
  ctx: ExportContext,
  event: PalletEvent,
  code: string,
): string {
  let md = `## Event: ${ctx.pallet}.${event.name}\n\n`;
  md += `**Chain**: ${ctx.chain}\n`;
  md += `**Pallet**: ${ctx.pallet}\n`;
  md += `**Event**: ${event.name}\n`;
  if (event.args.length > 0) {
    md += `**Fields**:\n`;
    md += event.args.map(a => `- \`${a.name}\`: \`${a.type}\``).join("\n") + "\n";
  }
  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  md += formatDocs(event.docs);
  return md;
}

export function exportError(
  ctx: ExportContext,
  error: PalletError,
  code: string,
): string {
  let md = `## Error: ${ctx.pallet}.${error.name}\n\n`;
  md += `**Chain**: ${ctx.chain}\n`;
  md += `**Pallet**: ${ctx.pallet}\n`;
  md += `**Error**: ${error.name}\n`;
  md += `**Type**: \`${error.type}\`\n`;
  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  md += formatDocs(error.docs);
  return md;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/utils/markdownExport.ts apps/web/tests/unit/markdownExport.test.ts
git commit -m "feat: add markdown export for constants, events, and errors"
```

---

## Task 3: Core Export Utility — Pallet Export & Batch Helper

**Files:**
- Modify: `apps/web/utils/markdownExport.ts`
- Modify: `apps/web/tests/unit/markdownExport.test.ts`

- [ ] **Step 1: Write failing tests for `exportPallet`**

Add to `apps/web/tests/unit/markdownExport.test.ts`:

```typescript
import { exportPallet } from "../../utils/markdownExport";

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
```

- [ ] **Step 2: Write failing test for `exportBatchCode`**

```typescript
import { exportBatchCode } from "../../utils/markdownExport";

describe("exportBatchCode", () => {
  it("generates a simple code block with header and chain", () => {
    const md = exportBatchCode("Polkadot", "Batch Transaction", "const tx = api.tx.utility.batch(...)");
    expect(md).toContain("## Batch Transaction");
    expect(md).toContain("**Chain**: Polkadot");
    expect(md).toContain("```typescript");
    expect(md).toContain("api.tx.utility.batch");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: FAIL — functions not exported

- [ ] **Step 4: Implement `exportPallet` and `exportBatchCode`**

Add to `apps/web/utils/markdownExport.ts`:

```typescript
const MAX_TABLE_ROWS = 20;

function truncateNote(total: number): string {
  return total > MAX_TABLE_ROWS ? `\n*...and ${total - MAX_TABLE_ROWS} more*\n` : "";
}

function firstLine(docs: string[]): string {
  const text = docs.join(" ").trim();
  if (text.length <= 80) return text;
  return text.slice(0, 77) + "...";
}

export function exportPallet(chain: string, pallet: PalletInfo): string {
  let md = `## Pallet: ${pallet.name} (${chain})\n\n`;

  // Calls
  if (pallet.calls.length > 0) {
    md += `### Calls (${pallet.calls.length})\n\n`;
    md += `| Method | Parameters | Description |\n`;
    md += `|--------|-----------|-------------|\n`;
    const rows = pallet.calls.slice(0, MAX_TABLE_ROWS);
    for (const call of rows) {
      const params = call.args.map(a => `${a.name}: ${a.type}`).join(", ");
      md += `| ${call.name} | ${params} | ${firstLine(call.docs)} |\n`;
    }
    md += truncateNote(pallet.calls.length);
    md += "\n";
  }

  // Storage
  if (pallet.storage.length > 0) {
    md += `### Storage (${pallet.storage.length})\n\n`;
    md += `| Item | Type | Description |\n`;
    md += `|------|------|-------------|\n`;
    const rows = pallet.storage.slice(0, MAX_TABLE_ROWS);
    for (const s of rows) {
      md += `| ${s.name} | ${s.type} | ${firstLine(s.docs)} |\n`;
    }
    md += truncateNote(pallet.storage.length);
    md += "\n";
  }

  // Events
  if (pallet.events.length > 0) {
    md += `### Events (${pallet.events.length})\n\n`;
    md += `| Event | Fields | Description |\n`;
    md += `|-------|--------|-------------|\n`;
    const rows = pallet.events.slice(0, MAX_TABLE_ROWS);
    for (const e of rows) {
      const fields = e.args.map(a => `${a.name}: ${a.type}`).join(", ");
      md += `| ${e.name} | ${fields} | ${firstLine(e.docs)} |\n`;
    }
    md += truncateNote(pallet.events.length);
    md += "\n";
  }

  // Constants
  const constants = pallet.constants || [];
  if (constants.length > 0) {
    md += `### Constants (${constants.length})\n\n`;
    md += `| Name | Type | Value | Description |\n`;
    md += `|------|------|-------|-------------|\n`;
    const rows = constants.slice(0, MAX_TABLE_ROWS);
    for (const c of rows) {
      md += `| ${c.name} | ${c.type} | ${JSON.stringify(c.value)} | ${firstLine(c.docs)} |\n`;
    }
    md += truncateNote(constants.length);
    md += "\n";
  }

  // Errors
  const errors = pallet.errors || [];
  if (errors.length > 0) {
    md += `### Errors (${errors.length})\n\n`;
    md += `| Error | Description |\n`;
    md += `|-------|-------------|\n`;
    const rows = errors.slice(0, MAX_TABLE_ROWS);
    for (const e of rows) {
      md += `| ${e.name} | ${firstLine(e.docs)} |\n`;
    }
    md += truncateNote(errors.length);
    md += "\n";
  }

  return md;
}

export function exportBatchCode(chain: string, title: string, code: string): string {
  let md = `## ${title}\n\n`;
  md += `**Chain**: ${chain}\n`;
  md += `\n### TypeScript Code\n\n\`\`\`typescript\n${code}\n\`\`\`\n`;
  return md;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd apps/web && npx vitest run tests/unit/markdownExport.test.ts`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add apps/web/utils/markdownExport.ts apps/web/tests/unit/markdownExport.test.ts
git commit -m "feat: add pallet export and batch code markdown helpers"
```

---

## Task 4: Session Export Hook

**Files:**
- Create: `apps/web/hooks/useSessionExport.ts`

- [ ] **Step 1: Create `useSessionExport` hook**

```typescript
// apps/web/hooks/useSessionExport.ts
import { useState, useCallback } from "react";

interface SessionEntry {
  timestamp: number;
  markdown: string;
}

export function useSessionExport() {
  const [entries, setEntries] = useState<SessionEntry[]>([]);

  const addEntry = useCallback((markdown: string) => {
    setEntries((prev) => [...prev, { timestamp: Date.now(), markdown }]);
  }, []);

  const exportSession = useCallback((): string => {
    const date = new Date().toISOString().split("T")[0];
    const header = `# Session Export\n\n**Date**: ${date}\n**Actions**: ${entries.length}\n`;
    const body = entries.map((e) => e.markdown).join("\n\n---\n\n");
    return `${header}\n---\n\n${body}`;
  }, [entries]);

  const clearSession = useCallback(() => {
    setEntries([]);
  }, []);

  return {
    addEntry,
    exportSession,
    clearSession,
    entryCount: entries.length,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/hooks/useSessionExport.ts
git commit -m "feat: add useSessionExport hook for session tracking"
```

---

## Task 5: Export Button Component

**Files:**
- Create: `apps/web/components/export-button.tsx`

- [ ] **Step 1: Create `ExportMarkdownButton` component**

```typescript
// apps/web/components/export-button.tsx
"use client";

import { useState, useCallback } from "react";
import { FileText } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Toast } from "@workspace/ui/components/toast";

interface ExportMarkdownButtonProps {
  getMarkdown: () => string;
  onExported?: (markdown: string) => void;
  label?: string;
}

export function ExportMarkdownButton({
  getMarkdown,
  onExported,
  label = "Copy as Markdown",
}: ExportMarkdownButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      const markdown = getMarkdown();
      await navigator.clipboard.writeText(markdown);
      setShowToast(true);
      onExported?.(markdown);
    } catch (err) {
      console.error("Failed to copy markdown:", err);
      setShowToast(true);
    }
  }, [getMarkdown, onExported]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        title={label}
      >
        <FileText className="w-3 h-3 mr-1" />
        Markdown
      </Button>
      <Toast
        message="Markdown copied to clipboard!"
        show={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}
```

Note: The `Toast` component from `@workspace/ui/components/toast` uses props: `message: string`, `show: boolean`, `onHide?: () => void`. See `right-pane.tsx:681-685` for the existing pattern.

- [ ] **Step 2: Commit**

```bash
git add apps/web/components/export-button.tsx
git commit -m "feat: add ExportMarkdownButton component"
```

---

## Task 6: Integrate into Code Output Panel (right-pane.tsx)

**Files:**
- Modify: `apps/web/components/layout/right-pane.tsx`

This is the main integration point — adding the export button next to the existing Copy button in the Code tab.

- [ ] **Step 1: Add new imports to `right-pane.tsx`**

At the top of `apps/web/components/layout/right-pane.tsx`, add:

```typescript
import { FileText } from "lucide-react";
import { ExportMarkdownButton } from "@/components/export-button";
import { PalletCall, PalletStorage, PalletConstant, PalletError as PalletErrorType, PalletEvent } from "@workspace/core";
import {
  exportStorageQuery,
  exportTransaction,
  exportConstant,
  exportEvent,
  exportError,
  exportBatchCode,
  ExportContext,
} from "@/utils/markdownExport";
```

- [ ] **Step 2: Extend `RightPaneProps` interface**

Add new optional props to `RightPaneProps` at `right-pane.tsx:35-43`:

```typescript
interface RightPaneProps {
  code: string;
  consoleOutput: ConsoleItem[];
  onClearConsole?: () => void;
  activeTab?: "setup" | "code" | "console" | "transactions";
  selectedChain?: string;
  transactionHistory?: TransactionResult[];
  onClearTransactionHistory?: () => void;
  // Markdown export props
  selectedCall?: { pallet: string; call: PalletCall };
  selectedStorage?: { pallet: string; storage: PalletStorage };
  selectedConstant?: { pallet: string; constant: PalletConstant };
  selectedEvent?: { pallet: string; event: PalletEvent };
  selectedError?: { pallet: string; error: PalletErrorType };
  storageQueryType?: string;
  storageParams?: Record<string, any>;
  formData?: Record<string, any>;
  methodQueue?: Array<{ pallet: string; call: PalletCall; formData: Record<string, any>; id: string }>;
  storageQueue?: Array<{ pallet: string; storage: any; queryType: string; storageParams: Record<string, any>; id: string }>;
  onMarkdownExported?: (markdown: string) => void;
  sessionEntryCount?: number;
  onExportSession?: () => string;
}
```

- [ ] **Step 3: Destructure new props in component**

Update the destructuring at `right-pane.tsx:45-51` to include the new props:

```typescript
export const RightPane = memo(function RightPane({
  code,
  consoleOutput,
  onClearConsole,
  activeTab,
  selectedChain,
  selectedCall,
  selectedStorage,
  selectedConstant,
  selectedEvent,
  selectedError,
  storageQueryType,
  storageParams,
  formData,
  methodQueue,
  storageQueue,
  onMarkdownExported,
  sessionEntryCount,
  onExportSession,
}: RightPaneProps) {
```

- [ ] **Step 4: Add `getMarkdown` callback**

After the existing `handleCopyCode` callback (~line 171), add:

```typescript
  const getMarkdown = useCallback(() => {
    const chain = selectedChain || "Unknown";

    // Priority order matches useCodeGeneration
    if (methodQueue && methodQueue.length > 0) {
      return exportBatchCode(chain, "Batch Transaction", code);
    }
    if (storageQueue && storageQueue.length > 0) {
      return exportBatchCode(chain, "Batch Storage Query", code);
    }
    if (selectedCall) {
      const ctx: ExportContext = { chain, pallet: selectedCall.pallet };
      return exportTransaction(ctx, selectedCall.call, formData || {}, code);
    }
    if (selectedStorage) {
      const ctx: ExportContext = { chain, pallet: selectedStorage.pallet };
      return exportStorageQuery(ctx, selectedStorage.storage, storageQueryType || "getValue", storageParams || {}, code);
    }
    if (selectedConstant) {
      const ctx: ExportContext = { chain, pallet: selectedConstant.pallet };
      return exportConstant(ctx, selectedConstant.constant, code);
    }
    if (selectedError) {
      const ctx: ExportContext = { chain, pallet: selectedError.pallet };
      return exportError(ctx, selectedError.error, code);
    }
    if (selectedEvent) {
      const ctx: ExportContext = { chain, pallet: selectedEvent.pallet };
      return exportEvent(ctx, selectedEvent.event, code);
    }
    return "";
  }, [selectedChain, selectedCall, selectedStorage, selectedConstant, selectedError, selectedEvent, methodQueue, storageQueue, code, formData, storageQueryType, storageParams]);

  const hasExportableContent = !!(selectedCall || selectedStorage || selectedConstant || selectedError || selectedEvent || (methodQueue && methodQueue.length > 0) || (storageQueue && storageQueue.length > 0));
```

- [ ] **Step 5: Add ExportMarkdownButton next to Copy button in Code tab**

At `right-pane.tsx:521-531` (the Code tab header), add the export button next to the existing Copy button. Change from:

```tsx
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Generated Code</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  disabled={!code}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
```

To:

```tsx
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Generated Code</CardTitle>
                <div className="flex items-center gap-2">
                  {hasExportableContent && (
                    <ExportMarkdownButton
                      getMarkdown={getMarkdown}
                      onExported={onMarkdownExported}
                    />
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCode}
                    disabled={!code}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
```

- [ ] **Step 6: Add Session export button in the tab header area**

At `right-pane.tsx:382-388` (the tabs header), add the session export button after the TabsList. Change from:

```tsx
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
        </div>
```

To:

```tsx
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
            </TabsList>
            {sessionEntryCount && sessionEntryCount > 0 && onExportSession && (
              <ExportMarkdownButton
                getMarkdown={onExportSession}
                label="Export session"
              />
            )}
          </div>
        </div>
```

- [ ] **Step 7: Verify the app builds**

Run: `cd apps/web && npx next build`
Expected: Build succeeds (the new props are all optional, so existing callers won't break)

- [ ] **Step 8: Commit**

```bash
git add apps/web/components/layout/right-pane.tsx
git commit -m "feat: add markdown export button to code panel and session export to header"
```

---

## Task 7: Integrate into Console Tab (Query Results & Transaction Confirmations)

**Files:**
- Modify: `apps/web/components/layout/right-pane.tsx`

The console tab shows results in two forms: (1) string lines matching `Result: <value>` pattern, and (2) `ArrayResult` objects with raw data. Both need an export-as-markdown button next to their existing copy buttons. The export closes over the current selection context (which props like `selectedStorage`, `selectedCall`, etc. provide).

- [ ] **Step 1: Add markdown export button to `Result:` string lines**

At `right-pane.tsx:632-656` (the `resultMatch` block), add a FileText button next to the existing Copy button. After the existing copy `<Button>` and "Copied!" indicator, add:

```tsx
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => {
                                const md = getMarkdown();
                                if (md) {
                                  navigator.clipboard.writeText(md);
                                  onMarkdownExported?.(md);
                                  setShowToast(true);
                                }
                              }}
                              title="Copy as Markdown"
                            >
                              <FileText className="w-3 h-3" />
                            </Button>
```

This reuses the `getMarkdown` callback from Task 6 Step 4 — at the time a result appears, the selection context is still active, so the markdown will include the current query/transaction context plus the code.

- [ ] **Step 2: Add markdown export button to `ArrayResult` entries**

At `right-pane.tsx:598-626` (the `array-result` block), add the same FileText button after the existing Copy button:

```tsx
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => {
                                const md = getMarkdown();
                                if (md) {
                                  navigator.clipboard.writeText(md);
                                  onMarkdownExported?.(md);
                                  setShowToast(true);
                                }
                              }}
                              title="Copy as Markdown"
                            >
                              <FileText className="w-3 h-3" />
                            </Button>
```

- [ ] **Step 3: Add `FileText` to the existing lucide-react import**

At `right-pane.tsx:19`, update the import:

```typescript
import { Copy, Terminal, Trash2, Settings, Code, Eye, FileText } from "lucide-react";
```

(This may already be present from Task 6 imports — if so, skip.)

- [ ] **Step 4: Verify the app builds**

Run: `cd apps/web && npx next build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/layout/right-pane.tsx
git commit -m "feat: add markdown export buttons to console tab results"
```

---

## Task 8: Integrate into Pallet Tree

**Files:**
- Modify: `apps/web/components/tree/pallet-tree.tsx`
- Modify: `apps/web/components/layout/left-pane.tsx`

- [ ] **Step 1: Add export button to pallet tree**

In `apps/web/components/tree/pallet-tree.tsx`, add imports:

```typescript
import { FileText } from "lucide-react";
import { exportPallet } from "@/utils/markdownExport";
```

Add new optional props to `PalletTreeProps` (line 17-30):

```typescript
  selectedChain?: string;
  onPalletExport?: (markdown: string) => void;
```

Destructure them in the component (line 32-44).

- [ ] **Step 2: Add export button to each pallet header row**

At `pallet-tree.tsx:233` (the pallet `<div key={pallet.name}>`), wrap the pallet row in a group container and add an `ExportMarkdownButton` next to the toggle button.

Add `ExportMarkdownButton` import at top:
```typescript
import { ExportMarkdownButton } from "@/components/export-button";
```

Change the pallet header from:
```tsx
          <div key={pallet.name} data-testid="pallet-item">
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 font-normal"
              onClick={() => togglePallet(pallet.name)}
            >
```

To:
```tsx
          <div key={pallet.name} data-testid="pallet-item" className="group">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 font-normal"
                onClick={() => togglePallet(pallet.name)}
              >
```

After the closing `</Button>` for the pallet toggle (~line 250), before the expanded sections, add:

```tsx
              {selectedChain && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExportMarkdownButton
                    getMarkdown={() => exportPallet(selectedChain, pallet)}
                    onExported={onPalletExport}
                    label={`Export ${pallet.name} as Markdown`}
                  />
                </div>
              )}
            </div>
```

This uses the shared `ExportMarkdownButton` component, which handles clipboard copy, toast, and the `onExported` callback consistently.

- [ ] **Step 3: Pass through props from LeftPane**

In `apps/web/components/layout/left-pane.tsx`, add `selectedChain` and `onPalletExport` to `LeftPaneProps` (optional) and pass them through to `<PalletTree>`.

- [ ] **Step 4: Verify the app builds**

Run: `cd apps/web && npx next build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/tree/pallet-tree.tsx apps/web/components/layout/left-pane.tsx
git commit -m "feat: add per-pallet markdown export button to pallet tree"
```

---

## Task 9: Wire Everything in PageContent

**Files:**
- Modify: `apps/web/app/PageContent.tsx`

This task connects all the pieces: the session hook, the new props to RightPane, and the new props to LeftPane/PalletTree.

- [ ] **Step 1: Add imports**

At the top of `PageContent.tsx`, add:

```typescript
import { useSessionExport } from "../hooks/useSessionExport";
```

- [ ] **Step 2: Initialize session hook**

After the existing hook calls (~line 159, after `useExecution`), add:

```typescript
  const { addEntry, exportSession, clearSession, entryCount } = useSessionExport();
```

- [ ] **Step 3: Pass new props to RightPane**

Update the `<RightPane>` call at `PageContent.tsx:1149-1157`. Change from:

```tsx
          <RightPane
            code={code}
            consoleOutput={consoleOutput}
            activeTab={activeTab}
            onClearConsole={handleClearConsole}
            selectedChain={selectedChain}
            transactionHistory={transactionHistory}
            onClearTransactionHistory={clearTransactionHistory}
          />
```

To:

```tsx
          <RightPane
            code={code}
            consoleOutput={consoleOutput}
            activeTab={activeTab}
            onClearConsole={handleClearConsole}
            selectedChain={selectedChain}
            transactionHistory={transactionHistory}
            onClearTransactionHistory={clearTransactionHistory}
            selectedCall={selectedCall}
            selectedStorage={selectedStorage}
            selectedConstant={selectedConstant}
            selectedEvent={selectedEvent}
            selectedError={selectedError}
            storageQueryType={storageQueryType}
            storageParams={storageParams}
            formData={formData}
            methodQueue={methodQueue}
            storageQueue={storageQueue}
            onMarkdownExported={addEntry}
            sessionEntryCount={entryCount}
            onExportSession={exportSession}
          />
```

- [ ] **Step 4: Pass new props to both LeftPane instances**

Update both `<LeftPane>` calls (desktop at ~line 985 and mobile at ~line 1040) to add:

```tsx
            selectedChain={selectedChain}
            onPalletExport={addEntry}
```

- [ ] **Step 5: Verify the app builds**

Run: `cd apps/web && npx next build`
Expected: Build succeeds

- [ ] **Step 6: Run all existing tests**

Run: `cd apps/web && npx vitest run`
Expected: All tests pass (including the new markdownExport tests)

- [ ] **Step 7: Commit**

```bash
git add apps/web/app/PageContent.tsx
git commit -m "feat: wire markdown export and session tracking into PageContent"
```

---

## Task 10: Manual Smoke Test

**Files:** None (testing only)

- [ ] **Step 1: Start dev server**

Run: `cd apps/web && npm run dev`

- [ ] **Step 2: Test code panel export**

1. Select a chain (e.g., Polkadot)
2. Expand a pallet (e.g., System)
3. Click a storage item (e.g., Account)
4. Verify the "Markdown" button appears next to "Copy" in the Code tab
5. Click "Markdown" — verify clipboard contains structured markdown with chain, pallet, storage item, query type, and code

- [ ] **Step 3: Test pallet tree export**

1. Hover over a pallet name in the left tree
2. Verify a small FileText icon appears
3. Click it — verify clipboard contains pallet documentation with tables

- [ ] **Step 4: Test session export**

1. Export 2-3 different items via the Markdown button
2. Verify the session button appears in the right pane header with a count
3. Click it — verify clipboard contains all exports separated by `---`

- [ ] **Step 5: Test transaction export**

1. Select a call (e.g., Balances.transfer_keep_alive)
2. Fill in parameters
3. Verify the Markdown button works and includes call name, params, and code

- [ ] **Step 6: Commit final state if any fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found during smoke test"
```
