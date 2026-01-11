/**
 * LLM-friendly formatting utilities for MCP tool responses.
 * Outputs concise, structured text optimized for AI consumption.
 */

export function toolResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

export function toolError(message: string) {
  return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true as const };
}

export function truncateList<T>(
  items: T[],
  maxItems: number,
  formatter: (item: T) => string,
): string {
  if (items.length <= maxItems) {
    return items.map(formatter).join("\n");
  }
  const shown = items.slice(0, maxItems).map(formatter).join("\n");
  return `${shown}\n... and ${items.length - maxItems} more`;
}

export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "object") {
    try {
      return JSON.stringify(
        value,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        2,
      );
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export function formatTable(
  headers: string[],
  rows: string[][],
  maxRows = 50,
): string {
  if (rows.length === 0) return "(none)";

  const display = rows.length > maxRows ? rows.slice(0, maxRows) : rows;
  const lines = [
    headers.join(" | "),
    headers.map(() => "---").join(" | "),
    ...display.map((row) => row.join(" | ")),
  ];

  if (rows.length > maxRows) {
    lines.push(`... and ${rows.length - maxRows} more`);
  }

  return lines.join("\n");
}
