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
