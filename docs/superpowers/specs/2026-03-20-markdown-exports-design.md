# Markdown Exports Design Spec

## Overview

Add markdown export functionality to the PAPI Copy-n-Paste web app. Any action performed in the UI (queries, transactions, explorations) can be exported as structured markdown via a single clipboard-copy button. A session export captures all actions performed during a session.

Covers plan items 4 (Markdown exports) and 7 (AI-optimised doc pipeline) from PLAN-3-MARKDOWN-EXPORTS.md.

## Decisions

- **UX**: Single button per integration point, copies to clipboard. No download, no preview modal.
- **Format**: Clean structured markdown. No YAML frontmatter, no LLM-specific headers. Well-structured markdown is already AI-friendly.
- **Session export**: Included in initial build. Tracks all individual exports and concatenates them.
- **Architecture**: Centralized export service — pure formatting functions + one session hook + one reusable button component.

## Architecture

### New Files

```
apps/web/
├── utils/
│   └── markdownExport.ts        # Pure export functions
├── components/
│   └── export-button.tsx         # Reusable button component
└── hooks/
    └── useSessionExport.ts       # Session tracking hook
```

### Modified Files

```
apps/web/components/layout/right-pane.tsx   # Export buttons in Code + Console tabs, session export in header
apps/web/components/tree/pallet-tree.tsx     # Per-pallet export button
apps/web/app/PageContent.tsx                 # Wire useSessionExport, pass new props to RightPane
```

## Component 1: Core Export Utility

**File**: `apps/web/utils/markdownExport.ts`

Six pure functions that take existing data structures and return markdown strings:

```typescript
import {
  PalletCall, PalletStorage, PalletEvent,
  PalletConstant, PalletError, PalletInfo,
} from "@workspace/core"

interface ExportContext {
  chain: string
  pallet: string
}

// Storage query → markdown
export function exportStorageQuery(
  ctx: ExportContext,
  storage: PalletStorage,
  queryType: string,
  params: Record<string, any>,
  code: string,
  result?: any,
): string

// Transaction call → markdown
export function exportTransaction(
  ctx: ExportContext,
  call: PalletCall,
  params: Record<string, any>,
  code: string,
  txResult?: { hash: string; blockNumber?: string; success: boolean },
): string

// Constant → markdown
export function exportConstant(
  ctx: ExportContext,
  constant: PalletConstant,
  code: string,
): string

// Event → markdown
export function exportEvent(
  ctx: ExportContext,
  event: PalletEvent,
  code: string,
): string

// Error type → markdown
export function exportError(
  ctx: ExportContext,
  error: PalletError,
  code: string,
): string

// Full pallet documentation → markdown
export function exportPallet(
  chain: string,
  pallet: PalletInfo,
): string
```

### Markdown Output Format

**Storage query example:**

```markdown
## Storage Query: System.Account

**Chain**: Polkadot
**Pallet**: System
**Storage Item**: Account
**Type**: `AccountInfo`
**Query Type**: getValue
**Parameters**: `5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY`

### Result

\`\`\`json
{
  "nonce": 42,
  "consumers": 2,
  "providers": 1,
  "sufficients": 0,
  "data": { "free": "1234567890000000", "reserved": "0", "frozen": "0" }
}
\`\`\`

### TypeScript Code

\`\`\`typescript
import { createClient } from "polkadot-api"
// ... full generated code ...
\`\`\`

### Docs

> The full account information for a particular account ID.
```

**Transaction example:**

```markdown
## Transaction: Balances.transfer_keep_alive

**Chain**: Polkadot
**Pallet**: Balances
**Call**: transfer_keep_alive
**Parameters**:
- `dest`: `5GrwvaEF...`
- `value`: `1000000000000`

### Result

- **Hash**: `0xabc...`
- **Block**: `#12345678`
- **Status**: Success

### TypeScript Code

\`\`\`typescript
// ... full transaction code ...
\`\`\`

### Docs

> Transfer some liquid free balance to another account.
```

**Pallet export** uses tables for each category:

```markdown
## Pallet: Balances (Polkadot)

### Calls (8)

| Method | Parameters | Description |
|--------|-----------|-------------|
| transfer_allow_death | dest: MultiAddress, value: u128 | Transfer the entire... |
| transfer_keep_alive | dest: MultiAddress, value: u128 | Same as transfer_allow... |

### Storage (5)

| Item | Type | Description |
|------|------|-------------|
| TotalIssuance | u128 | The total units issued |
| Account | AccountData | The Balances pallet... |

### Events (6)

| Event | Fields | Description |
|-------|--------|-------------|
| Transfer | from: AccountId32, to: AccountId32, amount: u128 | Transfer succeeded |

### Constants (4)

| Name | Type | Value | Description |
|------|------|-------|-------------|
| ExistentialDeposit | u128 | 10000000000 | The minimum amount... |

### Errors (5)

| Error | Description |
|-------|-------------|
| InsufficientBalance | Balance too low to send value |
```

**Truncation**: Pallet export caps each category at 20 items. Shows "...and N more" after the table if truncated.

### Formatting Rules

- Structured headers for quick scanning
- Code blocks with language tags (`typescript`, `json`)
- Doc comments joined with newlines, rendered as blockquotes
- Parameters shown as key-value pairs
- Result data JSON-stringified with 2-space indent
- Large results (arrays >50 items) truncated: show first 10 + "...and N more entries"

## Component 2: Session Tracking Hook

**File**: `apps/web/hooks/useSessionExport.ts`

```typescript
interface SessionEntry {
  timestamp: number
  markdown: string
}

export function useSessionExport() {
  const [entries, setEntries] = useState<SessionEntry[]>([])

  const addEntry = useCallback((markdown: string) => {
    setEntries(prev => [...prev, { timestamp: Date.now(), markdown }])
  }, [])

  const exportSession = useCallback((): string => {
    const header = `# Session Export\n\n**Date**: ${new Date().toISOString()}\n**Actions**: ${entries.length}\n`
    const body = entries.map(e => e.markdown).join("\n\n---\n\n")
    return `${header}\n---\n\n${body}`
  }, [entries])

  const clearSession = useCallback(() => {
    setEntries([])
  }, [])

  return { addEntry, exportSession, clearSession, entryCount: entries.length }
}
```

- Lives in `PageContent`, wired via `onMarkdownExported` callback
- Each export button click pushes to entries via `addEntry`
- `exportSession()` concatenates with `---` separators and a header
- Session resets on page refresh (no persistence)

## Component 3: Export Button

**File**: `apps/web/components/export-button.tsx`

```typescript
interface ExportMarkdownButtonProps {
  getMarkdown: () => string
  onExported?: (markdown: string) => void
  label?: string  // tooltip, defaults to "Copy as Markdown"
}
```

- Small icon button using `FileText` from lucide-react (distinguishes from existing `Copy` icon used for code copy)
- Matches existing button styling in right-pane (ghost variant, same size)
- `getMarkdown` is a function, not a precomputed string — only generates markdown on click
- Copies to clipboard via `navigator.clipboard.writeText()`
- Shows toast on success using existing `Toast` component pattern
- Calls `onExported(markdown)` after successful copy for session tracking

## Component 4: Integration Points

### 4a. Code Output Panel (`right-pane.tsx`, Code tab)

Add `ExportMarkdownButton` next to the existing copy code button in the Code tab header.

New props added to `RightPaneProps`:

```typescript
selectedCall?: { pallet: string; call: PalletCall }
selectedStorage?: { pallet: string; storage: PalletStorage }
selectedConstant?: { pallet: string; constant: PalletConstant }
selectedEvent?: { pallet: string; event: PalletEvent }
selectedError?: { pallet: string; error: PalletError }
storageQueryType?: string
storageParams?: Record<string, any>
formData?: Record<string, any>
onMarkdownExported?: (markdown: string) => void
```

The `getMarkdown` callback determines which export function to call based on which selection is active. Priority order matches `updateGeneratedCode` in `useCodeGeneration.ts`:

1. `methodQueue` (length > 0) → export as a generic code-only markdown block (header: "Batch Transaction", includes chain name and the generated multi-method code)
2. `storageQueue` (length > 0) → export as a generic code-only markdown block (header: "Batch Storage Query", includes chain name and the generated multi-storage code)
3. `selectedCall` → `exportTransaction()`
4. `selectedStorage` → `exportStorageQuery()`
5. `selectedConstant` → `exportConstant()`
6. `selectedError` → `exportError()`
7. `selectedEvent` → `exportEvent()`

For queue cases (1 & 2), the export is simpler — just the chain name, a description of the batch, and the generated code block. The individual items in the queue don't get their own structured sections. This is consistent with how `useCodeGeneration` treats queues: it generates a single combined code snippet.

Additional props needed on `RightPaneProps` for queue support:

```typescript
methodQueue?: Array<{ pallet: string; call: PalletCall; formData: Record<string, any>; id: string }>
storageQueue?: Array<{ pallet: string; storage: any; queryType: string; storageParams: Record<string, any>; id: string }>
```

Button is hidden when no selection is active and no queue items exist (no code to export).

### 4b. Storage Query Results (Console tab)

When a storage query result appears in the console output, add an `ExportMarkdownButton` inline next to the existing copy buttons for that result.

**Data access**: The console tab export buttons need more context than `ConsoleItem` provides. The approach: `RightPane` already receives `selectedStorage`, `storageQueryType`, `storageParams`, `selectedChain`, and `code` as props. When rendering a query result in the console, the export button closes over these values to build the full markdown. The result data itself comes from the `ConsoleItem`. This means the export button captures the *current* selection context — if the user changes their selection before exporting a prior result, the context may be stale. This is acceptable: the common flow is query → see result → export immediately.

### 4c. Transaction Confirmation (Console tab)

When a transaction result appears in the console (hash, block, success/failure), add an `ExportMarkdownButton` next to it.

**Data access**: Same approach as 4b. `RightPane` receives `selectedCall`, `formData`, `selectedChain`, and `code` as props. The `TransactionResult` data (hash, blockNumber, success) comes from the console item. The export button closes over the current selection context and the result data to build the full markdown.

### 4d. Pallet Explorer (`pallet-tree.tsx`)

Add a small `ExportMarkdownButton` on each pallet's header row in the tree. Clicking exports the full pallet documentation using `exportPallet()`.

The `PalletInfo` data is already passed to `PalletTree` as props.

### 4e. Session Export (right pane header)

Add a "Session" export button in the right pane header, next to the tab list. Shows a badge with `entryCount`. Clicking copies the full session markdown via `exportSession()`.

Only visible when `entryCount > 0`.

## Data Flow

```
Individual Export:
  User clicks ExportMarkdownButton
    → getMarkdown() called (lazy generation)
    → exportXxx() from markdownExport.ts returns string
    → navigator.clipboard.writeText(markdown)
    → Toast: "Copied to clipboard"
    → onExported(markdown) fires
    → useSessionExport.addEntry(markdown)

Session Export:
  User clicks Session export button
    → useSessionExport.exportSession() concatenates all entries
    → navigator.clipboard.writeText(sessionMarkdown)
    → Toast: "Session copied to clipboard"
```

## Wiring in PageContent.tsx

```typescript
// In PageContent:
const { addEntry, exportSession, clearSession, entryCount } = useSessionExport()

// Pass to RightPane:
<RightPane
  // ...existing props
  selectedCall={selectedCall}
  selectedStorage={selectedStorage}
  selectedConstant={selectedConstant}
  selectedEvent={selectedEvent}
  selectedError={selectedError}
  storageQueryType={storageQueryType}
  storageParams={storageParams}
  formData={formData}
  onMarkdownExported={addEntry}
  sessionEntryCount={entryCount}
  onExportSession={exportSession}
/>

// Pass to PalletTree (via LeftPane):
onMarkdownExported={addEntry}
```

## Out of Scope

- File download
- Preview/render modal
- YAML frontmatter or LLM-specific formatting
- Persistent session storage (resets on refresh)
- Batch queue export (separate from session)
- Export for multi-method or multi-storage queues as distinct items (they export as their generated code context)

## Testing Strategy

- Unit tests for all six `exportXxx()` functions — verify markdown output structure
- Verify truncation behavior for large pallets
- Verify session concatenation format
- E2E: click export button → verify clipboard content (Playwright)
