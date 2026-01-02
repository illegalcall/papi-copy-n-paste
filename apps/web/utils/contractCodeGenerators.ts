/**
 * Code generation for contract interactions
 * Generates copy-paste TypeScript snippets for ink! and EVM contracts
 */

import type { UnifiedMethod, ContractType } from "@workspace/core/contracts/types";

interface CodeGenOptions {
  chainKey: string;
  chainWs: string;
  contractAddress: string;
  contractType: ContractType;
  methodName: string;
  method: UnifiedMethod;
  args: Record<string, string>;
  isWalletConnected?: boolean;
}

/**
 * Generate TypeScript code for an ink! contract query
 */
function generateInkQueryCode(opts: CodeGenOptions): string {
  const { chainWs, contractAddress, methodName, method, args } = opts;

  const argValues = method.args
    .map((a) => {
      const val = args[a.name] ?? `"<${a.name}>"`;
      return `  ${JSON.stringify(val)}, // ${a.name}: ${a.type}`;
    })
    .join("\n");

  const argsComment = method.args.length
    ? `\n// Arguments:\n${method.args.map((a) => `//   ${a.name}: ${a.type}`).join("\n")}`
    : "";

  return `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* your chain descriptor */)
${argsComment}

// Build call data: selector + SCALE-encoded args
const selector = "${method.selector}"
const inputData = selector // + encoded args

// Query contract (read-only, no transaction needed)
const result = await typedApi.apis.ContractsApi.call({
  origin: "5GrwvaEF...", // caller address
  dest: "${contractAddress}",
  value: 0n,
  gasLimit: null,
  storageDepositLimit: null,
  inputData,
})

console.log("${methodName} result:", result)
`;
}

/**
 * Generate TypeScript code for an ink! contract execution
 */
function generateInkExecuteCode(opts: CodeGenOptions): string {
  const { chainWs, contractAddress, methodName, method } = opts;

  return `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* your chain descriptor */)

// Build call data: selector + SCALE-encoded args
const selector = "${method.selector}"
const data = selector // + encoded args

// Execute contract call (state-changing, requires signing)
const tx = typedApi.tx.Contracts.call({
  dest: { type: "Id", value: "${contractAddress}" },
  value: ${method.isPayable ? "1_000_000_000_000n, // value to send" : "0n,"}
  gas_limit: { ref_time: 5_000_000_000n, proof_size: 200_000n },
  storage_deposit_limit: null,
  data,
})

// Sign and submit
const result = await tx.signAndSubmit(signer)
console.log("${methodName} tx hash:", result)
`;
}

/**
 * Generate TypeScript code for an ink! contract deployment
 */
function generateInkDeployCode(opts: CodeGenOptions): string {
  const { chainWs, method } = opts;

  return `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* your chain descriptor */)

// Deploy contract from existing code hash
const tx = typedApi.tx.Contracts.instantiate({
  value: ${method.isPayable ? "1_000_000_000_000n," : "0n,"}
  gas_limit: { ref_time: 10_000_000_000n, proof_size: 500_000n },
  storage_deposit_limit: null,
  code_hash: "0x...", // code hash from previous upload
  data: "${method.selector}", // constructor selector + encoded args
  salt: "0x", // unique salt for deterministic address
})

const result = await tx.signAndSubmit(signer)
console.log("Contract deployed:", result)
`;
}

/**
 * Generate TypeScript code for an EVM contract query
 */
function generateEvmQueryCode(opts: CodeGenOptions): string {
  const { chainWs, contractAddress, methodName, method, args } = opts;

  const argsComment = method.args.length
    ? `\n// Arguments:\n${method.args.map((a) => `//   ${a.name}: ${a.type}`).join("\n")}`
    : "";

  return `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* moonbeam/moonriver descriptor */)
${argsComment}

// ABI-encode the function call
// Function: ${methodName}(${method.args.map((a) => a.type).join(", ")})
const encodedData = "0x..." // Use ethers.js or viem to ABI-encode

// Read-only call via Ethereum RPC
const result = await typedApi.apis.EthereumRuntimeRPCApi.call({
  from: "0x0000000000000000000000000000000000000000",
  to: "${contractAddress}",
  data: encodedData,
  value: "0x0",
  gas_limit: "0x${(500_000).toString(16)}",
  max_fee_per_gas: null,
  max_priority_fee_per_gas: null,
  nonce: null,
  estimate: false,
  access_list: null,
})

console.log("${methodName} result:", result)
`;
}

/**
 * Generate TypeScript code for an EVM contract execution
 */
function generateEvmExecuteCode(opts: CodeGenOptions): string {
  const { chainWs, contractAddress, methodName, method } = opts;

  return `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* moonbeam/moonriver descriptor */)

// ABI-encode the function call
const encodedData = "0x..." // Use ethers.js or viem to ABI-encode

// Execute via Ethereum.transact (state-changing, requires signing)
const tx = typedApi.tx.Ethereum.transact({
  transaction: {
    EIP1559: {
      chain_id: 0n,
      nonce: 0n,
      max_priority_fee_per_gas: 1_000_000_000n,
      max_fee_per_gas: 25_000_000_000n,
      gas_limit: 500_000n,
      action: { Call: "${contractAddress}" },
      value: ${method.isPayable ? "1_000_000_000_000_000_000n, // 1 ETH equivalent" : "0n,"}
      input: encodedData, // as Uint8Array
      access_list: [],
    },
  },
})

const result = await tx.signAndSubmit(signer)
console.log("${methodName} tx hash:", result)
`;
}

/**
 * Main code generation function
 */
export function generateContractCode(opts: CodeGenOptions): string {
  const { contractType, method } = opts;

  if (contractType === "ink") {
    if (method.kind === "constructor") {
      return generateInkDeployCode(opts);
    }
    if (method.isReadOnly) {
      return generateInkQueryCode(opts);
    }
    return generateInkExecuteCode(opts);
  }

  // EVM
  if (method.isReadOnly) {
    return generateEvmQueryCode(opts);
  }
  return generateEvmExecuteCode(opts);
}

/**
 * Generate a complete contract interaction example
 */
export function generateContractExample(
  contractType: ContractType,
  chainWs: string,
): string {
  if (contractType === "ink") {
    return `// ink! Contract Interaction Example
import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* chain descriptor */)

// 1. Query a contract (read-only)
const queryResult = await typedApi.apis.ContractsApi.call({
  origin: "5GrwvaEF...",     // your address
  dest: "5HGjWAeF...",       // contract address
  value: 0n,
  gasLimit: null,
  storageDepositLimit: null,
  inputData: "0x...",         // selector + encoded args
})

// 2. Execute a contract call (state-changing)
const tx = typedApi.tx.Contracts.call({
  dest: { type: "Id", value: "5HGjWAeF..." },
  value: 0n,
  gas_limit: { ref_time: 5_000_000_000n, proof_size: 200_000n },
  storage_deposit_limit: null,
  data: "0x...",
})
const result = await tx.signAndSubmit(signer)
`;
  }

  return `// EVM Contract Interaction Example (Moonbeam/Moonriver)
import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"

const client = createClient(getWsProvider("${chainWs}"))
const typedApi = client.getTypedApi(/* moonbeam descriptor */)

// 1. Read-only call
const readResult = await typedApi.apis.EthereumRuntimeRPCApi.call({
  from: "0x0000000000000000000000000000000000000000",
  to: "0xContractAddress...",
  data: "0x...", // ABI-encoded function call
  value: "0x0",
  gas_limit: "0x7A120",
  max_fee_per_gas: null,
  max_priority_fee_per_gas: null,
  nonce: null,
  estimate: false,
  access_list: null,
})

// 2. State-changing call
const tx = typedApi.tx.Ethereum.transact({
  transaction: {
    EIP1559: {
      chain_id: 0n,
      nonce: 0n,
      max_priority_fee_per_gas: 1_000_000_000n,
      max_fee_per_gas: 25_000_000_000n,
      gas_limit: 500_000n,
      action: { Call: "0xContractAddress..." },
      value: 0n,
      input: new Uint8Array([/* ABI-encoded data */]),
      access_list: [],
    },
  },
})
const result = await tx.signAndSubmit(signer)
`;
}
