/**
 * Tests for the `generate_code` MCP tool. This is the highest-stakes surface
 * in the project: the code this tool returns is shipped directly to AI agents
 * (Claude, Cursor, …) who paste it into real apps. If a hallucination lands
 * here, every downstream user gets broken code.
 *
 * The tool is registered via `registerCodeGenTools(server)`; we stub a
 * minimal McpServer that captures the handler so we can invoke it directly.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { registerCodeGenTools } from "../src/tools/code-gen.js";

type ToolHandler = (input: any) => Promise<{
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}>;

interface CapturedTool {
  name: string;
  description: string;
  schema: unknown;
  handler: ToolHandler;
}

function makeFakeServer(): { server: any; tools: CapturedTool[] } {
  const tools: CapturedTool[] = [];
  const server = {
    tool(
      name: string,
      description: string,
      schema: unknown,
      handler: ToolHandler,
    ) {
      tools.push({ name, description, schema, handler });
    },
  };
  return { server, tools };
}

// ── Forbidden patterns — mirror Task C; code shipped to AI agents is the ──
// ── highest-stakes surface, so we apply the strictest blacklist here. ────
const FORBIDDEN: Array<{ name: string; re: RegExp }> = [
  { name: "@polkadot/api", re: /@polkadot\/api/ },
  { name: "signAndSend", re: /signAndSend/ },
  { name: "new BN", re: /\bnew BN\b/ },
  { name: "new Keyring", re: /new Keyring\b/ },
  { name: "ApiPromise.create", re: /ApiPromise\.create/ },
  { name: "legacy WsProvider", re: /\bnew WsProvider\b/ },
  { name: "chains/kusama", re: /chains\/kusama\b/ },
];

function assertNoHallucinations(label: string, text: string): void {
  for (const { name, re } of FORBIDDEN) {
    if (re.test(text)) {
      throw new Error(
        `[${label}] HALLUCINATION TRAP: ${name}\n--- tool output ---\n${text}`,
      );
    }
  }
}

// ── Shared handler capture ─────────────────────────────────────────────────
let handler: ToolHandler;
let toolMeta: CapturedTool;

beforeAll(() => {
  const { server, tools } = makeFakeServer();
  registerCodeGenTools(server);
  expect(tools).toHaveLength(1);
  toolMeta = tools[0]!;
  handler = toolMeta.handler;
});

// ── Schema / registration ──────────────────────────────────────────────────

describe("registerCodeGenTools", () => {
  it("registers a single `generate_code` tool", () => {
    expect(toolMeta.name).toBe("generate_code");
    expect(toolMeta.description).toMatch(/Polkadot API|PAPI/i);
  });

  it("exposes an input schema with chain/pallet/method/type/params fields", () => {
    const schema = toolMeta.schema as Record<string, unknown>;
    expect(schema).toHaveProperty("chain");
    expect(schema).toHaveProperty("pallet");
    expect(schema).toHaveProperty("method");
    expect(schema).toHaveProperty("type");
    expect(schema).toHaveProperty("params");
  });
});

// ── Happy path: known pallet + call ───────────────────────────────────────

describe("generate_code — transaction happy path", () => {
  it("returns PAPI code for polkadot Balances.transfer_keep_alive", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "Balances",
      method: "transfer_keep_alive",
      type: "transaction",
    });

    expect(result.isError).not.toBe(true);
    const text = result.content[0]!.text;
    expect(text).toContain("Transaction:");
    expect(text).toContain("Balances.transfer_keep_alive");
    expect(text).toContain("```typescript");
    expect(text).toContain('import { createClient } from "polkadot-api"');
    expect(text).toContain("getWsProvider");
    assertNoHallucinations("polkadot Balances.transfer_keep_alive", text);
  });

  it("uses signAndSubmit in transaction code, never signAndSend", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "System",
      method: "remark",
      type: "transaction",
    });
    const text = result.content[0]!.text;
    expect(text).toContain("signAndSubmit");
    assertNoHallucinations("polkadot System.remark", text);
  });

  it("emits BigInt literals (not new BN) for default param examples", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "Balances",
      method: "transfer_keep_alive",
      type: "transaction",
    });
    const text = result.content[0]!.text;
    // Default example for Balance type is 1_000_000_000_000n
    expect(text).toMatch(/1_000_000_000_000n/);
    assertNoHallucinations("polkadot Balances.transfer_keep_alive", text);
  });
});

describe("generate_code — query happy path", () => {
  it("returns PAPI code for polkadot System.Account query", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "System",
      method: "Account",
      type: "query",
    });
    expect(result.isError).not.toBe(true);
    const text = result.content[0]!.text;
    expect(text).toContain("Query:");
    expect(text).toContain("typedApi.query.System.Account.getValue");
    assertNoHallucinations("polkadot System.Account query", text);
  });

  it("returns PAPI code for polkadot Balances.TotalIssuance", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "Balances",
      method: "TotalIssuance",
      type: "query",
    });
    const text = result.content[0]!.text;
    expect(text).toContain("typedApi.query.Balances.TotalIssuance.getValue");
    assertNoHallucinations("polkadot Balances.TotalIssuance", text);
  });
});

describe("generate_code — subscription happy path", () => {
  it("returns watchValue-based subscription code", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "System",
      method: "Account",
      type: "subscription",
    });
    expect(result.isError).not.toBe(true);
    const text = result.content[0]!.text;
    expect(text).toContain("Subscription:");
    expect(text).toContain("watchValue");
    expect(text).toContain(".subscribe(");
    assertNoHallucinations("polkadot System.Account subscription", text);
  });
});

// ── Error paths ────────────────────────────────────────────────────────────

describe("generate_code — error paths", () => {
  it("errors on unknown chain", async () => {
    const result = await handler({
      chain: "notachain",
      pallet: "System",
      method: "remark",
      type: "transaction",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/Unknown chain/i);
  });

  it("errors on unknown pallet", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "NotAPallet",
      method: "foo",
      type: "transaction",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/Pallet .* not found/);
  });

  it("errors on unknown call in transaction mode", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "Balances",
      method: "not_a_real_call",
      type: "transaction",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/Call .* not found/);
  });

  it("errors on unknown storage item in query mode", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "System",
      method: "NotAStorageItem",
      type: "query",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/Storage item .* not found/);
  });

  it("errors on invalid type", async () => {
    const result = await handler({
      chain: "polkadot",
      pallet: "System",
      method: "remark",
      type: "bogus",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/Invalid type/);
  });
});

// ── Multi-chain hallucination sweep ────────────────────────────────────────

describe("generate_code — hallucination sweep across chains", () => {
  const chains = ["polkadot", "kusama", "moonbeam"];

  for (const chain of chains) {
    it(`${chain} System.remark tx is clean`, async () => {
      const result = await handler({
        chain,
        pallet: "System",
        method: "remark",
        type: "transaction",
      });
      const text = result.content[0]!.text;
      assertNoHallucinations(`${chain} System.remark`, text);
      // Every tx output should mention signAndSubmit
      expect(text).toContain("signAndSubmit");
    });
  }
});
