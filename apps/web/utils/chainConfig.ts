import { getAllCustomProviders } from "./customRpc";

const DESCRIPTOR_MAP = {
  polkadot: "polkadot",
  kusama: "kusama",
  moonbeam: "moonbeam",
  bifrost: "bifrost",
  astar: "astar",
  paseo: "paseo",
  paseo_asset_hub: "paseo_asset_hub",
  westend: "westend",
  rococo: "rococo",
  hydration: "hydration",
  acala: null,
} as const;

const BUILT_IN_CHAIN_SPECS = {
  polkadot: "polkadot",
  kusama: "ksmcc3",
} as const;

export function getChainSpecImport(chainKey: string): string {
  const specName = BUILT_IN_CHAIN_SPECS[chainKey as keyof typeof BUILT_IN_CHAIN_SPECS];
  if (specName) {
    return `import { chainSpec } from "polkadot-api/chains/${specName}"`;
  }
  return `// ${chainKey} connects via RPC endpoint`;
}

export function getDescriptorImport(chainKey: string): string {
  const descriptorName = DESCRIPTOR_MAP[chainKey as keyof typeof DESCRIPTOR_MAP];
  if (!descriptorName) {
    throw new Error(`No descriptor available for chain: ${chainKey}`);
  }
  return `import { ${descriptorName} } from "@polkadot-api/descriptors"`;
}

export function getDescriptorName(chainKey: string): string | null {
  return DESCRIPTOR_MAP[chainKey as keyof typeof DESCRIPTOR_MAP] || null;
}

export function getCustomRPCConnection(rpcId: string): {
  imports: string;
  connection: string;
  cleanup?: string;
} | null {
  const customRPCs = getAllCustomProviders();
  const rpc = customRPCs.find(r => r.id === rpcId);

  if (!rpc) {
    return null;
  }

  return {
    imports: `import { getWsProvider } from "polkadot-api/ws-provider/web"`,
    connection: `  // Using custom RPC: ${rpc.name}
  const wsProvider = getWsProvider("${rpc.wsUrl}")
  const client = createClient(wsProvider)`,
    cleanup: `
  // Cleanup WebSocket connection
  client.destroy()`,
  };
}

const SMOLDOT_CHAINS = ["polkadot", "kusama", "paseo", "westend"];

const CHAIN_CONFIGS = {
  polkadot: { chainSpec: "polkadot" },
  kusama: { chainSpec: "ksmcc3" },
  paseo: { chainSpec: "paseo" },
  westend: { chainSpec: "westend" },
} as const;

const RPC_URLS = {
  moonbeam: "wss://wss.api.moonbeam.network",
  bifrost: "wss://hk.p.bifrost-rpc.liebi.com/ws",
  astar: "wss://rpc.astar.network",
  acala: "wss://acala-rpc.dwellir.com",
  hydration: "wss://hydration-rpc.n.dwellir.com",
  paseo_asset_hub: "wss://asset-hub-paseo-rpc.dwellir.com",
  westend: "wss://westend-rpc.polkadot.io",
  rococo: "wss://rococo-rpc.polkadot.io",
} as const;

export function getChainConnection(chainKey: string, providerId?: string): {
  imports: string;
  connection: string;
  cleanup?: string;
} {
  if (chainKey === "custom" && providerId) {
    const customConnection = getCustomRPCConnection(providerId);
    if (customConnection) {
      return customConnection;
    }
  }

  if (SMOLDOT_CHAINS.includes(chainKey)) {
    const config = CHAIN_CONFIGS[chainKey as keyof typeof CHAIN_CONFIGS] || CHAIN_CONFIGS.polkadot;

    return {
      imports: `import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/${config.chainSpec}"`,
      connection: `  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))`,
      cleanup: `
  smoldot.terminate()`,
    };
  }

  const rpcUrl = RPC_URLS[chainKey as keyof typeof RPC_URLS];
  if (!rpcUrl) {
    throw new Error(`No RPC URL configured for chain: ${chainKey}`);
  }

  return {
    imports: `import { getWsProvider } from "polkadot-api/ws-provider/web"`,
    connection: `  const wsProvider = getWsProvider("${rpcUrl}")
  const client = createClient(wsProvider)`,
    cleanup: `
  client.destroy()`,
  };
}

export function getParameterDescription(
  paramName: string,
  paramType: string,
): string {
  const descriptions: Record<string, string> = {
    dest: "destination account address",
    value: "amount in planck units (10^10 planck = 1 DOT)",
    who: "target account to perform action on",
    amount: "quantity for the operation",
    target: "target account or value",
    index: "position or identifier",
    id: "unique identifier",
    owner: "account that owns the resource",
    beneficiary: "account that receives benefits",
    validator: "validator account for staking",
    nominator: "nominator account for staking",
    remark: "text data to store on-chain",
  };

  return descriptions[paramName] || `parameter of type ${paramType}`;
}
