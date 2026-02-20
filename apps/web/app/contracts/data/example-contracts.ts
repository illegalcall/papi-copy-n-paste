/**
 * Pre-built example contracts for the Contract IDE.
 * Users can load these directly without uploading metadata files.
 */

import type { InkMetadata, EvmAbi, ContractType } from "@workspace/core/contracts/types";

export interface ExampleContract {
  id: string;
  name: string;
  description: string;
  contractType: ContractType;
  chainKey: string;
  /** Pre-filled address (empty string if user must provide) */
  address: string;
  metadata: InkMetadata | EvmAbi;
  tags: string[];
}

// ── ink! Type Registry Helpers ──

const INK_TYPES_BOOL = [
  { id: 0, type: { def: { primitive: "bool" as const }, path: [] as string[] } },
];

const INK_TYPES_PSP22 = [
  { id: 0, type: { def: { primitive: "bool" as const }, path: [] as string[] } },
  { id: 1, type: { def: { primitive: "u128" as const }, path: [] as string[] } },
  {
    id: 2,
    type: {
      def: {
        composite: {
          fields: [{ name: "0", type: 7, typeName: "[u8; 32]" }],
        },
      },
      path: ["ink_primitives", "types", "AccountId"],
    },
  },
  {
    id: 3,
    type: {
      def: {
        variant: {
          variants: [
            { name: "Ok", fields: [{ type: 0, name: undefined }] },
            { name: "Err", fields: [{ type: 4, name: undefined }] },
          ],
        },
      },
      path: ["Result"],
    },
  },
  {
    id: 4,
    type: {
      def: {
        variant: {
          variants: [
            { name: "InsufficientBalance", fields: [] },
            { name: "InsufficientAllowance", fields: [] },
            { name: "ZeroRecipientAddress", fields: [] },
            { name: "ZeroSenderAddress", fields: [] },
          ],
        },
      },
      path: ["PSP22Error"],
    },
  },
  { id: 5, type: { def: { primitive: "u8" as const }, path: [] as string[] } },
  { id: 6, type: { def: { primitive: "str" as const }, path: [] as string[] } },
  { id: 7, type: { def: { array: { len: 32, type: 5 } }, path: [] as string[] } },
];

const INK_TYPES_INCREMENTER = [
  { id: 0, type: { def: { primitive: "i32" as const }, path: [] as string[] } },
];

// ── ink! Example Contracts ──

const FLIPPER_METADATA: InkMetadata = {
  source: { hash: "0x...", language: "ink! 5.0.0", compiler: "rustc 1.75.0" },
  contract: { name: "flipper", version: "0.1.0", authors: ["ink! examples"] },
  spec: {
    constructors: [
      {
        label: "new",
        selector: "0x9bae9d5e",
        args: [{ label: "init_value", type: { type: 0, displayName: ["bool"] } }],
        mutates: false,
        payable: false,
        docs: ["Creates a new Flipper contract initialized with the given value."],
      },
      {
        label: "default",
        selector: "0xed4b9d1b",
        args: [],
        mutates: false,
        payable: false,
        docs: ["Creates a new Flipper contract initialized to `false`."],
      },
    ],
    messages: [
      {
        label: "flip",
        selector: "0xcde4ebb9",
        args: [],
        mutates: true,
        payable: false,
        docs: ["Flips the current value of the Flipper's boolean."],
      },
      {
        label: "get",
        selector: "0x2f865bd9",
        args: [],
        returnType: { type: 0, displayName: ["bool"] },
        mutates: false,
        payable: false,
        docs: ["Returns the current value of the Flipper's boolean."],
      },
    ],
    events: [
      {
        label: "Flipped",
        args: [{ label: "new_value", type: { type: 0, displayName: ["bool"] } }],
        docs: ["Emitted when the value is flipped."],
      },
    ],
  },
  storage: {},
  types: INK_TYPES_BOOL,
  version: "5",
};

const PSP22_TOKEN_METADATA: InkMetadata = {
  source: { hash: "0x...", language: "ink! 5.0.0", compiler: "rustc 1.75.0" },
  contract: { name: "psp22_token", version: "1.0.0", authors: ["OpenBrush"] },
  spec: {
    constructors: [
      {
        label: "new",
        selector: "0x9bae9d5e",
        args: [
          { label: "total_supply", type: { type: 1, displayName: ["Balance"] } },
          { label: "name", type: { type: 6, displayName: ["String"] } },
          { label: "symbol", type: { type: 6, displayName: ["String"] } },
          { label: "decimals", type: { type: 5, displayName: ["u8"] } },
        ],
        mutates: false,
        payable: false,
        docs: ["Creates a new PSP22 token with the given total supply."],
      },
    ],
    messages: [
      {
        label: "PSP22::total_supply",
        selector: "0x162df8c2",
        args: [],
        returnType: { type: 1, displayName: ["Balance"] },
        mutates: false,
        payable: false,
        docs: ["Returns the total token supply."],
      },
      {
        label: "PSP22::balance_of",
        selector: "0x6568382f",
        args: [{ label: "owner", type: { type: 2, displayName: ["AccountId"] } }],
        returnType: { type: 1, displayName: ["Balance"] },
        mutates: false,
        payable: false,
        docs: ["Returns the account balance for the specified `owner`."],
      },
      {
        label: "PSP22::allowance",
        selector: "0x4d47d921",
        args: [
          { label: "owner", type: { type: 2, displayName: ["AccountId"] } },
          { label: "spender", type: { type: 2, displayName: ["AccountId"] } },
        ],
        returnType: { type: 1, displayName: ["Balance"] },
        mutates: false,
        payable: false,
        docs: ["Returns the amount which `spender` is allowed to withdraw from `owner`."],
      },
      {
        label: "PSP22::transfer",
        selector: "0xdb20f9f5",
        args: [
          { label: "to", type: { type: 2, displayName: ["AccountId"] } },
          { label: "value", type: { type: 1, displayName: ["Balance"] } },
          { label: "data", type: { type: 7, displayName: ["Vec"] } },
        ],
        returnType: { type: 3, displayName: ["Result"] },
        mutates: true,
        payable: false,
        docs: ["Transfers `value` tokens from the caller to `to`."],
      },
      {
        label: "PSP22::approve",
        selector: "0xb20f1bbd",
        args: [
          { label: "spender", type: { type: 2, displayName: ["AccountId"] } },
          { label: "value", type: { type: 1, displayName: ["Balance"] } },
        ],
        returnType: { type: 3, displayName: ["Result"] },
        mutates: true,
        payable: false,
        docs: ["Allows `spender` to withdraw from the caller's account multiple times, up to `value`."],
      },
      {
        label: "PSP22::transfer_from",
        selector: "0x54b3c76e",
        args: [
          { label: "from", type: { type: 2, displayName: ["AccountId"] } },
          { label: "to", type: { type: 2, displayName: ["AccountId"] } },
          { label: "value", type: { type: 1, displayName: ["Balance"] } },
          { label: "data", type: { type: 7, displayName: ["Vec"] } },
        ],
        returnType: { type: 3, displayName: ["Result"] },
        mutates: true,
        payable: false,
        docs: ["Transfers `value` tokens from `from` to `to` using the allowance mechanism."],
      },
      {
        label: "PSP22Metadata::token_name",
        selector: "0x3d261bd4",
        args: [],
        returnType: { type: 6, displayName: ["String"] },
        mutates: false,
        payable: false,
        docs: ["Returns the token name."],
      },
      {
        label: "PSP22Metadata::token_symbol",
        selector: "0x34205be5",
        args: [],
        returnType: { type: 6, displayName: ["String"] },
        mutates: false,
        payable: false,
        docs: ["Returns the token symbol."],
      },
      {
        label: "PSP22Metadata::token_decimals",
        selector: "0x7271b782",
        args: [],
        returnType: { type: 5, displayName: ["u8"] },
        mutates: false,
        payable: false,
        docs: ["Returns the token decimals."],
      },
    ],
    events: [
      {
        label: "Transfer",
        args: [
          { label: "from", type: { type: 2, displayName: ["AccountId"] } },
          { label: "to", type: { type: 2, displayName: ["AccountId"] } },
          { label: "value", type: { type: 1, displayName: ["Balance"] } },
        ],
        docs: ["Emitted when tokens are transferred."],
      },
      {
        label: "Approval",
        args: [
          { label: "owner", type: { type: 2, displayName: ["AccountId"] } },
          { label: "spender", type: { type: 2, displayName: ["AccountId"] } },
          { label: "value", type: { type: 1, displayName: ["Balance"] } },
        ],
        docs: ["Emitted when an allowance is set."],
      },
    ],
  },
  storage: {},
  types: INK_TYPES_PSP22,
  version: "5",
};

const INCREMENTER_METADATA: InkMetadata = {
  source: { hash: "0x...", language: "ink! 5.0.0", compiler: "rustc 1.75.0" },
  contract: { name: "incrementer", version: "0.1.0", authors: ["ink! examples"] },
  spec: {
    constructors: [
      {
        label: "new",
        selector: "0x9bae9d5e",
        args: [{ label: "init_value", type: { type: 0, displayName: ["i32"] } }],
        mutates: false,
        payable: false,
        docs: ["Creates a new counter contract initialized to the given value."],
      },
    ],
    messages: [
      {
        label: "increment",
        selector: "0xe7d0590f",
        args: [],
        mutates: true,
        payable: false,
        docs: ["Increments the counter by one."],
      },
      {
        label: "increment_by",
        selector: "0x2b455e2e",
        args: [{ label: "delta", type: { type: 0, displayName: ["i32"] } }],
        mutates: true,
        payable: false,
        docs: ["Increments the counter by the given delta."],
      },
      {
        label: "get",
        selector: "0x2f865bd9",
        args: [],
        returnType: { type: 0, displayName: ["i32"] },
        mutates: false,
        payable: false,
        docs: ["Returns the current counter value."],
      },
      {
        label: "reset",
        selector: "0xd826f88f",
        args: [],
        mutates: true,
        payable: false,
        docs: ["Resets the counter to zero."],
      },
    ],
    events: [
      {
        label: "Incremented",
        args: [{ label: "new_value", type: { type: 0, displayName: ["i32"] } }],
        docs: ["Emitted when the counter is incremented."],
      },
    ],
  },
  storage: {},
  types: INK_TYPES_INCREMENTER,
  version: "5",
};

// ── EVM Example ABIs ──

const ERC20_ABI: EvmAbi = {
  contractName: "ERC20 Token",
  abi: [
    { type: "function", name: "name", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "symbol", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "decimals", inputs: [], outputs: [{ name: "", type: "uint8" }], stateMutability: "view" },
    { type: "function", name: "totalSupply", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "transfer", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "function", name: "allowance", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "approve", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "function", name: "transferFrom", inputs: [{ name: "from", type: "address" }, { name: "to", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "event", name: "Transfer", inputs: [{ name: "from", type: "address", indexed: true }, { name: "to", type: "address", indexed: true }, { name: "value", type: "uint256", indexed: false }] },
    { type: "event", name: "Approval", inputs: [{ name: "owner", type: "address", indexed: true }, { name: "spender", type: "address", indexed: true }, { name: "value", type: "uint256", indexed: false }] },
  ],
};

const ERC721_ABI: EvmAbi = {
  contractName: "ERC721 NFT",
  abi: [
    { type: "function", name: "name", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "symbol", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "tokenURI", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "balanceOf", inputs: [{ name: "owner", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "ownerOf", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ name: "", type: "address" }], stateMutability: "view" },
    { type: "function", name: "totalSupply", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "approve", inputs: [{ name: "to", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
    { type: "function", name: "getApproved", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ name: "", type: "address" }], stateMutability: "view" },
    { type: "function", name: "setApprovalForAll", inputs: [{ name: "operator", type: "address" }, { name: "approved", type: "bool" }], outputs: [], stateMutability: "nonpayable" },
    { type: "function", name: "isApprovedForAll", inputs: [{ name: "owner", type: "address" }, { name: "operator", type: "address" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
    { type: "function", name: "transferFrom", inputs: [{ name: "from", type: "address" }, { name: "to", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
    { type: "function", name: "safeTransferFrom", inputs: [{ name: "from", type: "address" }, { name: "to", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
    { type: "event", name: "Transfer", inputs: [{ name: "from", type: "address", indexed: true }, { name: "to", type: "address", indexed: true }, { name: "tokenId", type: "uint256", indexed: true }] },
    { type: "event", name: "Approval", inputs: [{ name: "owner", type: "address", indexed: true }, { name: "approved", type: "address", indexed: true }, { name: "tokenId", type: "uint256", indexed: true }] },
    { type: "event", name: "ApprovalForAll", inputs: [{ name: "owner", type: "address", indexed: true }, { name: "operator", type: "address", indexed: true }, { name: "approved", type: "bool", indexed: false }] },
  ],
};

const WETH_ABI: EvmAbi = {
  contractName: "Wrapped Native Token (WETH/WGLMR)",
  abi: [
    { type: "function", name: "name", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "symbol", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
    { type: "function", name: "decimals", inputs: [], outputs: [{ name: "", type: "uint8" }], stateMutability: "view" },
    { type: "function", name: "totalSupply", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "deposit", inputs: [], outputs: [], stateMutability: "payable" },
    { type: "function", name: "withdraw", inputs: [{ name: "amount", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
    { type: "function", name: "transfer", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "function", name: "approve", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "function", name: "allowance", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
    { type: "function", name: "transferFrom", inputs: [{ name: "from", type: "address" }, { name: "to", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
    { type: "event", name: "Deposit", inputs: [{ name: "dst", type: "address", indexed: true }, { name: "wad", type: "uint256", indexed: false }] },
    { type: "event", name: "Withdrawal", inputs: [{ name: "src", type: "address", indexed: true }, { name: "wad", type: "uint256", indexed: false }] },
    { type: "event", name: "Transfer", inputs: [{ name: "from", type: "address", indexed: true }, { name: "to", type: "address", indexed: true }, { name: "value", type: "uint256", indexed: false }] },
    { type: "event", name: "Approval", inputs: [{ name: "owner", type: "address", indexed: true }, { name: "spender", type: "address", indexed: true }, { name: "value", type: "uint256", indexed: false }] },
  ],
};

// ── Example Contract Registry ──

export const EXAMPLE_CONTRACTS: ExampleContract[] = [
  // ink! Examples
  {
    id: "ink-flipper",
    name: "Flipper",
    description: "The \"Hello World\" of ink! — a boolean that flips between true/false",
    contractType: "ink",
    chainKey: "shibuya",
    address: "",
    metadata: FLIPPER_METADATA,
    tags: ["beginner", "ink!"],
  },
  {
    id: "ink-psp22",
    name: "PSP22 Token",
    description: "Polkadot's ERC-20 equivalent — fungible token with transfers and allowances",
    contractType: "ink",
    chainKey: "shibuya",
    address: "",
    metadata: PSP22_TOKEN_METADATA,
    tags: ["token", "ink!", "defi"],
  },
  {
    id: "ink-incrementer",
    name: "Incrementer",
    description: "A simple counter contract — increment, decrement, and read a value",
    contractType: "ink",
    chainKey: "shibuya",
    address: "",
    metadata: INCREMENTER_METADATA,
    tags: ["beginner", "ink!"],
  },

  // EVM Examples — real deployed contracts on Moonbeam mainnet
  {
    id: "evm-weth",
    name: "WGLMR",
    description: "Wrapped GLMR — deposit native GLMR, get ERC-20 WGLMR. The most-used DeFi primitive on Moonbeam.",
    contractType: "evm",
    chainKey: "moonbeam",
    address: "0xAcc15dC74880C9944775448304B263D191c6077F",
    metadata: WETH_ABI,
    tags: ["live", "defi", "popular"],
  },
  {
    id: "evm-erc20",
    name: "ERC-20 Token",
    description: "Standard fungible token — balances, transfers, approvals. Load with any ERC-20 address.",
    contractType: "evm",
    chainKey: "moonbeam",
    address: "",
    metadata: ERC20_ABI,
    tags: ["token", "evm"],
  },
  {
    id: "evm-erc721",
    name: "ERC-721 NFT",
    description: "Non-fungible token — ownership, transfers, metadata URIs. Load with any NFT address.",
    contractType: "evm",
    chainKey: "moonbeam",
    address: "",
    metadata: ERC721_ABI,
    tags: ["nft", "evm"],
  },
];

/** Get examples filtered by contract type */
export function getExamplesForType(type: ContractType): ExampleContract[] {
  return EXAMPLE_CONTRACTS.filter((e) => e.contractType === type);
}
