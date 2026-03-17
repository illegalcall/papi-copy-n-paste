/**
 * The most important test in this repo: for every code-generation function we
 * ship, feed its output through the TypeScript compiler to ensure it parses,
 * and scan it for PAPI hallucination-trap patterns (legacy @polkadot/api API,
 * signAndSend, new BN, etc). If this test fails, some code-gen path is
 * shipping broken or wrong code to users/AI agents.
 */
import { describe, it, expect } from "vitest";
import ts from "typescript";
import type { PalletCall } from "@workspace/core";
import {
  generateContractCode,
  generateContractExample,
} from "../../utils/contractCodeGenerators";
import {
  generateCodeSnippet,
  generateStorageQueryByType,
  generateConstantCode,
  generateErrorCode,
  generateEventCode,
} from "../../utils/codeGenerators";
import {
  generateWalletIntegratedCode,
  generateWalletStorageCode,
} from "../../utils/walletCodeGenerators";
import type { UnifiedMethod } from "@workspace/core/contracts/types";
import { StorageQueryType } from "../../types/enums";

// ── Forbidden patterns (PAPI v1.14+ hallucination traps from CLAUDE.md) ──
const FORBIDDEN_PATTERNS: Array<{ name: string; re: RegExp; fix: string }> = [
  {
    name: "@polkadot/api import (legacy, deprecated)",
    re: /@polkadot\/api/,
    fix: "use polkadot-api",
  },
  {
    name: "signAndSend (legacy method)",
    re: /signAndSend/,
    fix: "use .signAndSubmit(signer)",
  },
  {
    name: "new BN(...) (BN.js, not PAPI)",
    re: /\bnew BN\b/,
    fix: "use BigInt literal like 1_000_000_000_000n",
  },
  {
    name: "new Keyring (not in PAPI)",
    re: /new Keyring\b/,
    fix: "use sr25519CreateDerive from @polkadot-labs/hdkd",
  },
  {
    name: "ApiPromise.create (legacy client API)",
    re: /ApiPromise\.create/,
    fix: "use createClient from polkadot-api",
  },
  {
    name: "WsProvider (legacy provider name)",
    re: /\bnew WsProvider\b|from "@polkadot\/api"|import\s*\{\s*WsProvider\s*\}/,
    fix: "use getWsProvider from polkadot-api/ws-provider/web",
  },
  {
    name: "chains/kusama (wrong chain spec path)",
    re: /chains\/kusama\b/,
    fix: "use chains/ksmcc3",
  },
];

function assertNoHallucinations(label: string, code: string): void {
  for (const { name, re, fix } of FORBIDDEN_PATTERNS) {
    if (re.test(code)) {
      throw new Error(
        `[${label}] HALLUCINATION TRAP: ${name}. Fix: ${fix}.\n--- generated code ---\n${code}`,
      );
    }
  }
}

function assertParses(label: string, code: string): void {
  const result = ts.transpileModule(code, {
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      strict: false,
      skipLibCheck: true,
      noEmit: true,
      allowJs: true,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  });

  // Only syntax-level diagnostics matter — type-resolution errors are
  // expected because we never resolve external modules like
  // @polkadot-api/descriptors in this test sandbox.
  const syntaxErrors = (result.diagnostics ?? []).filter((d) => {
    // category 1 = Error, but we need to filter out type/resolution errors.
    // TS syntax diagnostic codes are in the 1xxx range; type errors are 2xxx+.
    return d.category === ts.DiagnosticCategory.Error && d.code < 2000;
  });

  if (syntaxErrors.length > 0) {
    const messages = syntaxErrors
      .map((d) => {
        const msg =
          typeof d.messageText === "string"
            ? d.messageText
            : d.messageText.messageText;
        const pos =
          typeof d.start === "number" && d.file
            ? d.file.getLineAndCharacterOfPosition(d.start)
            : { line: 0, character: 0 };
        return `  line ${pos.line + 1}:${pos.character + 1} TS${d.code}: ${msg}`;
      })
      .join("\n");
    throw new Error(
      `[${label}] failed to parse:\n${messages}\n--- generated code ---\n${code}`,
    );
  }
}

function assertClean(label: string, code: string): void {
  assertParses(label, code);
  assertNoHallucinations(label, code);
}

// ── Fixtures ────────────────────────────────────────────────────────────────

const balancesTransferCall: PalletCall = {
  name: "transfer_keep_alive",
  args: [
    { name: "dest", type: "MultiAddress" },
    { name: "value", type: "u128" },
  ],
  docs: ["Transfer some balance from one account to another."],
};

const systemRemarkCall: PalletCall = {
  name: "remark",
  args: [{ name: "remark", type: "Vec<u8>" }],
  docs: [],
};

const inkQueryMethod: UnifiedMethod = {
  name: "get",
  selector: "0x2f865bd9",
  args: [],
  returnType: "bool",
  isReadOnly: true,
  isPayable: false,
  docs: [],
  kind: "message",
};

const inkTxMethod: UnifiedMethod = {
  name: "flip",
  selector: "0x633aa551",
  args: [],
  isReadOnly: false,
  isPayable: false,
  docs: [],
  kind: "message",
};

const inkConstructor: UnifiedMethod = {
  name: "new",
  selector: "0x9bae9d5e",
  args: [{ name: "init_value", type: "bool" }],
  isReadOnly: false,
  isPayable: false,
  docs: [],
  kind: "constructor",
};

const evmViewMethod: UnifiedMethod = {
  name: "balanceOf",
  selector: "0x70a08231",
  args: [{ name: "owner", type: "address" }],
  returnType: "uint256",
  isReadOnly: true,
  isPayable: false,
  docs: [],
  kind: "function",
};

const evmWriteMethod: UnifiedMethod = {
  name: "transfer",
  selector: "0xa9059cbb",
  args: [
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  isReadOnly: false,
  isPayable: false,
  docs: [],
  kind: "function",
};

// ── codeGenerators.ts — generateCodeSnippet (tx) ─────────────────────────────

describe("generated-code compile check: codeGenerators.generateCodeSnippet", () => {
  it("Balances.transfer_keep_alive on polkadot is clean", () => {
    const code = generateCodeSnippet(
      "polkadot",
      "smoldot",
      "Balances",
      balancesTransferCall,
      { dest: "//Alice", value: "1000000000000" },
    );
    assertClean("polkadot Balances.transfer_keep_alive", code);
    expect(code).toContain("signAndSubmit");
  });

  it("System.remark on kusama is clean (and never uses chains/kusama path)", () => {
    const code = generateCodeSnippet("kusama", "smoldot", "System", systemRemarkCall, {
      remark: "0x1234",
    });
    assertClean("kusama System.remark", code);
  });

  it("Balances.transfer_keep_alive on moonbeam (WS provider path) is clean", () => {
    const code = generateCodeSnippet(
      "moonbeam",
      "wss",
      "Balances",
      balancesTransferCall,
      { dest: "//Bob", value: "500" },
    );
    assertClean("moonbeam Balances.transfer_keep_alive", code);
  });
});

// ── codeGenerators.ts — storage query by type ────────────────────────────────

describe("generated-code compile check: generateStorageQueryByType", () => {
  const types: Array<StorageQueryType | string> = [
    StorageQueryType.GET_VALUE,
    StorageQueryType.GET_ENTRIES,
    StorageQueryType.WATCH_VALUE,
    StorageQueryType.WATCH_ENTRIES,
    StorageQueryType.GET_VALUES,
  ];

  for (const t of types) {
    it(`${t} on System.Account is clean`, () => {
      const code = generateStorageQueryByType(
        t,
        "System",
        "Account",
        '"5GrwvaEF..."',
        true,
        false,
      );
      assertClean(`storage query ${t}`, code);
    });
  }
});

// ── codeGenerators.ts — constant / error / event ─────────────────────────────

describe("generated-code compile check: generateConstantCode", () => {
  it("polkadot Balances.ExistentialDeposit is clean", () => {
    const code = generateConstantCode(
      "polkadot",
      "smoldot",
      "Balances",
      { name: "ExistentialDeposit", type: "u128", value: "10000000000", docs: [] },
    );
    assertClean("polkadot Balances.ExistentialDeposit", code);
  });
});

describe("generated-code compile check: generateErrorCode", () => {
  it("polkadot System.InvalidSpecName is clean", () => {
    const code = generateErrorCode(
      "polkadot",
      "smoldot",
      "System",
      { name: "InvalidSpecName", type: "InvalidSpecName", docs: [] },
    );
    assertClean("polkadot System.InvalidSpecName", code);
  });
});

describe("generated-code compile check: generateEventCode", () => {
  it("polkadot Balances.Transfer is clean", () => {
    const code = generateEventCode(
      "polkadot",
      "smoldot",
      "Balances",
      {
        name: "Transfer",
        args: [
          { name: "from", type: "AccountId32" },
          { name: "to", type: "AccountId32" },
          { name: "amount", type: "u128" },
        ],
        docs: [],
      },
    );
    assertClean("polkadot Balances.Transfer", code);
    assertNoHallucinations("generateEventCode Balances.Transfer", code);
  });
});

// ── walletCodeGenerators.ts ─────────────────────────────────────────────────

describe("generated-code compile check: walletCodeGenerators", () => {
  it("generateWalletIntegratedCode for Balances.transfer_keep_alive is clean", () => {
    const code = generateWalletIntegratedCode(
      "polkadot",
      "smoldot",
      "Balances",
      balancesTransferCall,
      { dest: "//Alice", value: "1000000000000" },
      true,
    );
    assertClean("wallet Balances.transfer_keep_alive", code);
    expect(code).toContain("signAndSubmit");
  });

  it("generateWalletStorageCode for System.Account is clean", () => {
    const code = generateWalletStorageCode(
      "polkadot",
      "smoldot",
      "System",
      { name: "Account", type: "AccountInfo", docs: [] },
      "getValue",
      { key: "5GrwvaEF..." },
      true,
    );
    assertClean("wallet System.Account", code);
  });
});

// ── contractCodeGenerators.ts ───────────────────────────────────────────────

describe("generated-code compile check: contractCodeGenerators", () => {
  const cases = [
    { label: "ink query", type: "ink" as const, method: inkQueryMethod, addr: "5HGj..." },
    { label: "ink execute", type: "ink" as const, method: inkTxMethod, addr: "5HGj..." },
    { label: "ink deploy", type: "ink" as const, method: inkConstructor, addr: "5HGj..." },
    { label: "evm view", type: "evm" as const, method: evmViewMethod, addr: "0xAbc" },
    { label: "evm execute", type: "evm" as const, method: evmWriteMethod, addr: "0xAbc" },
  ];

  for (const c of cases) {
    it(`${c.label} is clean`, () => {
      const code = generateContractCode({
        chainKey: "moonbeam",
        chainWs: "wss://moonbeam.test",
        contractAddress: c.addr,
        contractType: c.type,
        methodName: c.method.name,
        method: c.method,
        args: {},
      });
      assertClean(c.label, code);
    });
  }

  it("ink example is clean", () => {
    const code = generateContractExample("ink", "wss://contracts.test");
    assertClean("ink example", code);
  });

  it("evm example is clean", () => {
    const code = generateContractExample("evm", "wss://moonbeam.test");
    assertClean("evm example", code);
  });
});

// ── Named guards: each trap pattern fires on the right offender ─────────────

describe("forbidden-pattern matcher", () => {
  it("matches @polkadot/api", () => {
    expect(() =>
      assertNoHallucinations("t", `import { ApiPromise } from "@polkadot/api"`),
    ).toThrow(/@polkadot\/api import/);
  });

  it("matches signAndSend", () => {
    expect(() => assertNoHallucinations("t", `tx.signAndSend(pair)`)).toThrow(
      /signAndSend/,
    );
  });

  it("matches new BN", () => {
    expect(() =>
      assertNoHallucinations("t", `const v = new BN("1000")`),
    ).toThrow(/new BN/);
  });

  it("matches new Keyring", () => {
    expect(() =>
      assertNoHallucinations("t", `const k = new Keyring({ type: "sr25519" })`),
    ).toThrow(/new Keyring/);
  });

  it("matches ApiPromise.create", () => {
    expect(() =>
      assertNoHallucinations("t", `const api = await ApiPromise.create({ provider })`),
    ).toThrow(/ApiPromise\.create/);
  });

  it("matches legacy WsProvider import", () => {
    expect(() =>
      assertNoHallucinations(
        "t",
        `import { WsProvider } from "@polkadot/api"`,
      ),
    ).toThrow(/WsProvider|@polkadot\/api/);
  });

  it("matches chains/kusama spec path", () => {
    expect(() =>
      assertNoHallucinations(
        "t",
        `import { chainSpec } from "polkadot-api/chains/kusama"`,
      ),
    ).toThrow(/chains\/kusama/);
  });
});
