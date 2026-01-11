import { z } from "zod";

export const ChainKeySchema = z
  .string()
  .min(1)
  .describe("Chain identifier (e.g., 'polkadot', 'kusama', 'moonbeam')");

export const PalletNameSchema = z
  .string()
  .min(1)
  .describe("Pallet name (e.g., 'System', 'Balances', 'Staking')");

export const ListChainsInput = {};

export const GetChainInfoInput = {
  chain: ChainKeySchema,
};

export const ListPalletsInput = {
  chain: ChainKeySchema,
};

export const GetPalletInfoInput = {
  chain: ChainKeySchema,
  pallet: PalletNameSchema,
};

export const QueryStorageInput = {
  chain: ChainKeySchema,
  pallet: PalletNameSchema,
  item: z.string().min(1).describe("Storage item name (e.g., 'Account', 'TotalIssuance')"),
  params: z
    .array(z.string())
    .optional()
    .describe("Storage query parameters (e.g., an account address)"),
};

export const GetConstantValueInput = {
  chain: ChainKeySchema,
  pallet: PalletNameSchema,
  constant: z.string().min(1).describe("Constant name (e.g., 'ExistentialDeposit', 'BlockHashCount')"),
};

export const GetBalanceInput = {
  chain: ChainKeySchema,
  address: z.string().min(1).describe("SS58 encoded account address"),
};

export const ValidateAddressInput = {
  address: z.string().min(1).describe("SS58 address to validate"),
  chain: ChainKeySchema.optional().describe("Optional chain to check SS58 prefix against"),
};

export const GenerateCodeInput = {
  chain: ChainKeySchema,
  pallet: PalletNameSchema,
  method: z.string().min(1).describe("Method/call/storage name"),
  type: z.enum(["transaction", "query", "subscription"]).describe("Type of code to generate"),
  params: z
    .record(z.string(), z.any())
    .optional()
    .describe("Optional parameters to include in generated code"),
};
