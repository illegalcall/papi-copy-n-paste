import { describe, it, expect } from "vitest";
import {
  generateContractCode,
  generateContractExample,
} from "../../utils/contractCodeGenerators";
import type { UnifiedMethod } from "@workspace/core/contracts/types";

// ── Fixtures ────────────────────────────────────────────────────────────────

const inkQueryMethod: UnifiedMethod = {
  name: "get",
  selector: "0x2f865bd9",
  args: [],
  returnType: "bool",
  isReadOnly: true,
  isPayable: false,
  docs: ["Returns the current value of the flipper."],
  kind: "message",
};

const inkReadWithArgs: UnifiedMethod = {
  name: "balance_of",
  selector: "0x0f755a56",
  args: [{ name: "owner", type: "AccountId32" }],
  returnType: "u128",
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

const inkTxPayable: UnifiedMethod = {
  name: "deposit",
  selector: "0xdeadbeef",
  args: [{ name: "amount", type: "u128" }],
  isReadOnly: false,
  isPayable: true,
  docs: [],
  kind: "message",
};

const inkConstructorMethod: UnifiedMethod = {
  name: "new",
  selector: "0x9bae9d5e",
  args: [{ name: "init_value", type: "bool" }],
  isReadOnly: false,
  isPayable: false,
  docs: [],
  kind: "constructor",
};

const inkConstructorPayable: UnifiedMethod = {
  name: "new",
  selector: "0xcafef00d",
  args: [],
  isReadOnly: false,
  isPayable: true,
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

const evmPayableMethod: UnifiedMethod = {
  name: "deposit",
  selector: "0xd0e30db0",
  args: [],
  isReadOnly: false,
  isPayable: true,
  docs: [],
  kind: "function",
};

const inkRichArgs: UnifiedMethod = {
  name: "complex",
  selector: "0xaabbccdd",
  args: [
    { name: "u32Val", type: "u32" },
    { name: "u128Val", type: "u128" },
    { name: "acct", type: "AccountId32" },
    { name: "maybe", type: "Option<u128>" },
    { name: "list", type: "Vec<u8>" },
    { name: "pair", type: "Tuple<u32, u64>" },
    { name: "flag", type: "bool" },
  ],
  isReadOnly: true,
  isPayable: false,
  docs: [],
  kind: "message",
};

const WS = "wss://rpc.example.test";
const ADDR_INK = "5HGjWAeF...";
const ADDR_EVM = "0x1234567890abcdef1234567890abcdef12345678";
const CHAIN_KEY = "polkadot";

// ── ink! Paths ───────────────────────────────────────────────────────────────

describe("generateContractCode — ink! query", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "get",
    method: inkQueryMethod,
    args: {},
  });

  it("imports PAPI (not @polkadot/api)", () => {
    expect(code).toContain('from "polkadot-api"');
    expect(code).not.toMatch(/@polkadot\/api/);
  });

  it("uses getWsProvider (not WsProvider)", () => {
    expect(code).toContain(
      'import { getWsProvider } from "polkadot-api/ws-provider/web"',
    );
    expect(code).not.toMatch(/\bWsProvider\b/);
  });

  it("uses createClient (not ApiPromise.create)", () => {
    expect(code).toContain("createClient(getWsProvider(");
    expect(code).not.toContain("ApiPromise.create");
  });

  it("queries via typedApi.apis.ContractsApi.call", () => {
    expect(code).toContain("typedApi.apis.ContractsApi.call(");
  });

  it("embeds the contract address and selector", () => {
    expect(code).toContain(ADDR_INK);
    expect(code).toContain("0x2f865bd9");
  });

  it("uses BigInt literal for value (not new BN)", () => {
    expect(code).toMatch(/value: 0n/);
    expect(code).not.toMatch(/\bnew BN\b/);
  });

  it("does not include signAndSend", () => {
    expect(code).not.toContain("signAndSend");
  });
});

describe("generateContractCode — ink! execute (tx)", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "flip",
    method: inkTxMethod,
    args: {},
  });

  it("uses typedApi.tx.Contracts.call (PascalCase pallet)", () => {
    expect(code).toContain("typedApi.tx.Contracts.call(");
  });

  it("uses signAndSubmit, never signAndSend", () => {
    expect(code).toContain(".signAndSubmit(signer)");
    expect(code).not.toContain("signAndSend");
  });

  it("uses BigInt literals for gas_limit values", () => {
    expect(code).toMatch(/ref_time: \d[\d_]*n/);
    expect(code).toMatch(/proof_size: \d[\d_]*n/);
    expect(code).not.toMatch(/\bnew BN\b/);
  });

  it("passes dest as { type: 'Id', value: ... } with the address", () => {
    expect(code).toContain(`{ type: "Id", value: "${ADDR_INK}" }`);
  });

  it("non-payable tx sends value: 0n", () => {
    expect(code).toMatch(/value: 0n/);
  });
});

describe("generateContractCode — ink! execute payable emits BigInt literal value", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "deposit",
    method: inkTxPayable,
    args: {},
  });

  it("emits 1_000_000_000_000n (not new BN)", () => {
    expect(code).toContain("1_000_000_000_000n");
    expect(code).not.toMatch(/\bnew BN\b/);
  });
});

describe("generateContractCode — ink! deploy (constructor)", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "new",
    method: inkConstructorMethod,
    args: { init_value: "true" },
  });

  it("calls typedApi.tx.Contracts.instantiate", () => {
    expect(code).toContain("typedApi.tx.Contracts.instantiate(");
  });

  it("includes the constructor selector", () => {
    expect(code).toContain("0x9bae9d5e");
  });

  it("uses BigInt literals for gas_limit", () => {
    expect(code).toMatch(/ref_time: \d[\d_]*n/);
    expect(code).toMatch(/proof_size: \d[\d_]*n/);
  });

  it("signs with signAndSubmit", () => {
    expect(code).toContain("signAndSubmit(signer)");
    expect(code).not.toContain("signAndSend");
  });
});

describe("generateContractCode — ink! deploy payable", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "new",
    method: inkConstructorPayable,
    args: {},
  });

  it("emits BigInt literal payable value", () => {
    expect(code).toContain("1_000_000_000_000n");
  });
});

describe("generateContractCode — ink! query emits arg comments", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "balance_of",
    method: inkReadWithArgs,
    args: { owner: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" },
  });

  it("documents the argument name and type", () => {
    expect(code).toContain("owner: AccountId32");
  });
});

// ── Rich param mapping ───────────────────────────────────────────────────────

describe("generateContractCode — ink! wide arg type coverage", () => {
  const code = generateContractCode({
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    contractType: "ink",
    methodName: "complex",
    method: inkRichArgs,
    args: {},
  });

  it("includes a comment for every arg type (u32/u128/AccountId32/Option/Vec/Tuple/bool)", () => {
    expect(code).toContain("u32Val: u32");
    expect(code).toContain("u128Val: u128");
    expect(code).toContain("acct: AccountId32");
    expect(code).toContain("maybe: Option<u128>");
    expect(code).toContain("list: Vec<u8>");
    expect(code).toContain("pair: Tuple<u32, u64>");
    expect(code).toContain("flag: bool");
  });
});

// ── EVM paths ────────────────────────────────────────────────────────────────

describe("generateContractCode — EVM view", () => {
  const code = generateContractCode({
    chainKey: "moonbeam",
    chainWs: WS,
    contractAddress: ADDR_EVM,
    contractType: "evm",
    methodName: "balanceOf",
    method: evmViewMethod,
    args: { owner: "0xabc" },
  });

  it("imports PAPI (not @polkadot/api)", () => {
    expect(code).toContain('from "polkadot-api"');
    expect(code).not.toMatch(/@polkadot\/api/);
  });

  it("calls typedApi.apis.EthereumRuntimeRPCApi.call", () => {
    expect(code).toContain("typedApi.apis.EthereumRuntimeRPCApi.call(");
  });

  it("embeds the contract address", () => {
    expect(code).toContain(ADDR_EVM);
  });

  it("documents argument types", () => {
    expect(code).toContain("owner: address");
  });

  it("never uses signAndSend or new BN", () => {
    expect(code).not.toContain("signAndSend");
    expect(code).not.toMatch(/\bnew BN\b/);
  });
});

describe("generateContractCode — EVM call (state-changing)", () => {
  const code = generateContractCode({
    chainKey: "moonbeam",
    chainWs: WS,
    contractAddress: ADDR_EVM,
    contractType: "evm",
    methodName: "transfer",
    method: evmWriteMethod,
    args: {},
  });

  it("builds a typedApi.tx.Ethereum.transact call", () => {
    expect(code).toContain("typedApi.tx.Ethereum.transact(");
  });

  it("uses BigInt literals for EIP1559 fields", () => {
    expect(code).toMatch(/chain_id: \d+n/);
    expect(code).toMatch(/nonce: \d+n/);
    expect(code).toMatch(/max_fee_per_gas: \d[\d_]*n/);
    expect(code).toMatch(/max_priority_fee_per_gas: \d[\d_]*n/);
    expect(code).toMatch(/gas_limit: \d[\d_]*n/);
  });

  it("uses signAndSubmit, never signAndSend", () => {
    expect(code).toContain("signAndSubmit(signer)");
    expect(code).not.toContain("signAndSend");
  });

  it("wraps target in action: { Call: ... }", () => {
    expect(code).toContain(`action: { Call: "${ADDR_EVM}" }`);
  });
});

describe("generateContractCode — EVM payable emits ETH-wei BigInt literal", () => {
  const code = generateContractCode({
    chainKey: "moonbeam",
    chainWs: WS,
    contractAddress: ADDR_EVM,
    contractType: "evm",
    methodName: "deposit",
    method: evmPayableMethod,
    args: {},
  });

  it("emits 1_000_000_000_000_000_000n", () => {
    expect(code).toContain("1_000_000_000_000_000_000n");
  });
});

// ── Dispatch logic ───────────────────────────────────────────────────────────

describe("generateContractCode — dispatch", () => {
  const base = {
    chainKey: CHAIN_KEY,
    chainWs: WS,
    contractAddress: ADDR_INK,
    args: {},
  };

  it("ink + constructor → deploy code", () => {
    const code = generateContractCode({
      ...base,
      contractType: "ink",
      methodName: "new",
      method: inkConstructorMethod,
    });
    expect(code).toContain("typedApi.tx.Contracts.instantiate(");
  });

  it("ink + read-only → query code", () => {
    const code = generateContractCode({
      ...base,
      contractType: "ink",
      methodName: "get",
      method: inkQueryMethod,
    });
    expect(code).toContain("typedApi.apis.ContractsApi.call(");
  });

  it("ink + mutating → execute code", () => {
    const code = generateContractCode({
      ...base,
      contractType: "ink",
      methodName: "flip",
      method: inkTxMethod,
    });
    expect(code).toContain("typedApi.tx.Contracts.call(");
  });

  it("evm + view → query code", () => {
    const code = generateContractCode({
      ...base,
      contractAddress: ADDR_EVM,
      contractType: "evm",
      methodName: "balanceOf",
      method: evmViewMethod,
    });
    expect(code).toContain("EthereumRuntimeRPCApi.call(");
  });

  it("evm + nonpayable → execute code", () => {
    const code = generateContractCode({
      ...base,
      contractAddress: ADDR_EVM,
      contractType: "evm",
      methodName: "transfer",
      method: evmWriteMethod,
    });
    expect(code).toContain("typedApi.tx.Ethereum.transact(");
  });
});

// ── generateContractExample ──────────────────────────────────────────────────

describe("generateContractExample", () => {
  it("ink example uses PAPI idioms", () => {
    const code = generateContractExample("ink", WS);
    expect(code).toContain('from "polkadot-api"');
    expect(code).toContain("createClient");
    expect(code).toContain("getWsProvider");
    expect(code).toContain("typedApi.apis.ContractsApi.call");
    expect(code).toContain("typedApi.tx.Contracts.call");
    expect(code).toContain("signAndSubmit(signer)");
    expect(code).not.toContain("signAndSend");
    expect(code).not.toMatch(/@polkadot\/api/);
    expect(code).not.toMatch(/\bnew BN\b/);
  });

  it("evm example uses PAPI idioms", () => {
    const code = generateContractExample("evm", WS);
    expect(code).toContain('from "polkadot-api"');
    expect(code).toContain("typedApi.apis.EthereumRuntimeRPCApi.call");
    expect(code).toContain("typedApi.tx.Ethereum.transact");
    expect(code).toContain("signAndSubmit(signer)");
    expect(code).not.toContain("signAndSend");
    expect(code).not.toMatch(/@polkadot\/api/);
    expect(code).not.toMatch(/\bnew BN\b/);
  });
});
