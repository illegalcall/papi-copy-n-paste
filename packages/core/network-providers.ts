export type NetworkProviderType = "smoldot" | "rpc" | "chopsticks" | "custom";

export interface NetworkProvider {
  id: string;
  name: string;
  type: NetworkProviderType;
  description: string;
  url?: string;
  isRecommended?: boolean;
  reliability?: "high" | "medium" | "low";
  latency?: "low" | "medium" | "high";
}

export interface NetworkConfig {
  chain: string;
  chainName: string;
  providers: NetworkProvider[];
  defaultProvider: string;
  icon: string;
  color: string;
  chainSpecPath?: string;
  genesisHash: string;
}

// Enhanced network configurations with multiple provider options
export const networkConfigs: NetworkConfig[] = [
  {
    chain: "polkadot",
    chainName: "Polkadot",
    icon: "/icons/polkadot.svg",
    color: "#E6007A",
    chainSpecPath: "polkadot-api/chains/polkadot",
    genesisHash:
      "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    defaultProvider: "allnodes-polkadot",
    providers: [
      {
        id: "smoldot-polkadot",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "allnodes-polkadot",
        name: "Allnodes",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://polkadot-rpc.publicnode.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "blockops-polkadot",
        name: "Blockops",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://polkadot-public-rpc.blockops.network/ws",
        reliability: "high",
        latency: "medium",
      },
      {
        id: "dwellir-polkadot",
        name: "Dwellir",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://polkadot-rpc.dwellir.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "dwellir-tunisia-polkadot",
        name: "Dwellir Tunisia",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://polkadot-rpc-tn.dwellir.com",
        reliability: "medium",
        latency: "medium",
      },
      {
        id: "chopsticks-polkadot",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8000",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "kusama",
    chainName: "Kusama",
    icon: "/icons/kusama.svg",
    color: "#000000",
    chainSpecPath: "polkadot-api/chains/ksmcc3",
    genesisHash:
      "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
    defaultProvider: "smoldot-kusama",
    providers: [
      {
        id: "smoldot-kusama",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "allnodes-kusama",
        name: "Allnodes",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://kusama-rpc.publicnode.com",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "dwellir-kusama",
        name: "Dwellir",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://kusama-rpc.dwellir.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-kusama",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8001",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "moonbeam",
    chainName: "Moonbeam",
    icon: "/icons/moonbeam.svg",
    color: "#53CBC9",
    chainSpecPath: "polkadot-api/chains/moonbeam",
    genesisHash:
      "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
    defaultProvider: "moonbeam-rpc",
    providers: [
      {
        id: "smoldot-moonbeam",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "moonbeam-rpc",
        name: "Moonbeam Foundation",
        type: "rpc",
        description: "Official Moonbeam RPC",
        url: "wss://wss.api.moonbeam.network",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-moonbeam",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8002",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "astar",
    chainName: "Astar",
    icon: "/icons/astar.svg",
    color: "#0070F3",
    chainSpecPath: "polkadot-api/chains/astar",
    genesisHash:
      "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
    defaultProvider: "astar-rpc",
    providers: [
      {
        id: "smoldot-astar",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "astar-rpc",
        name: "Astar Network",
        type: "rpc",
        description: "Official Astar RPC",
        url: "wss://rpc.astar.network",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-astar",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8003",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "acala",
    chainName: "Acala",
    icon: "/icons/acala.svg",
    color: "#FF4C4C",
    chainSpecPath: "polkadot-api/chains/acala",
    genesisHash:
      "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
    defaultProvider: "dwellir-acala",
    providers: [
      {
        id: "smoldot-acala",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "dwellir-acala",
        name: "Dwellir",
        type: "rpc",
        description: "Remote RPC node",
        url: "wss://acala-rpc.dwellir.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-acala",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8004",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "bifrost",
    chainName: "Bifrost",
    icon: "/icons/bifrost.svg",
    color: "#5A67D8",
    chainSpecPath: "polkadot-api/chains/bifrost",
    genesisHash:
      "0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed",
    defaultProvider: "bifrost-rpc",
    providers: [
      {
        id: "smoldot-bifrost",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "bifrost-rpc",
        name: "Bifrost Network",
        type: "rpc",
        description: "Official Bifrost RPC",
        url: "wss://hk.p.bifrost-rpc.liebi.com/ws",
        reliability: "medium",
        latency: "medium",
      },
      {
        id: "chopsticks-bifrost",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8005",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "hydration",
    chainName: "Hydration",
    icon: "/icons/hydration.svg",
    color: "#00D4AA",
    chainSpecPath: undefined, // Hydration is not a built-in chain, uses RPC
    genesisHash:
      "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
    defaultProvider: "hydration-rpc",
    providers: [
      {
        id: "smoldot-hydration",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "hydration-rpc",
        name: "Hydration Network",
        type: "rpc",
        description: "Official Hydration RPC",
        url: "wss://hydration-rpc.n.dwellir.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-hydration",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8006",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "paseo_asset_hub",
    chainName: "Paseo AssetHub",
    icon: "/icons/paseo.svg",
    color: "#FF6B35",
    chainSpecPath: "polkadot-api/chains/paseo_asset_hub",
    genesisHash:
      "0xd6eec26135305a8ad257a20d003357284c8aa03d0bdb2b357ab0a22371e11ef2",
    defaultProvider: "paseo-assethub-rpc",
    providers: [
      {
        id: "smoldot-paseo-assethub",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "paseo-assethub-rpc",
        name: "Dwellir",
        type: "rpc",
        description: "Paseo Asset Hub RPC",
        url: "wss://asset-hub-paseo-rpc.dwellir.com",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-paseo-assethub",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8008",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "westend",
    chainName: "Westend",
    icon: "/icons/westend.svg",
    color: "#DA68A7",
    chainSpecPath: "polkadot-api/chains/westend2",
    genesisHash:
      "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e",
    defaultProvider: "smoldot-westend",
    providers: [
      {
        id: "smoldot-westend",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "westend-rpc",
        name: "Parity Public",
        type: "rpc",
        description: "Official Westend RPC",
        url: "wss://westend-rpc.polkadot.io",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-westend",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8007",
        reliability: "high",
        latency: "low",
      },
    ],
  },
  {
    chain: "rococo",
    chainName: "Rococo",
    icon: "/icons/rococo.svg",
    color: "#6f42c1",
    chainSpecPath: "polkadot-api/chains/rococo_v2_2",
    genesisHash:
      "0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e",
    defaultProvider: "rococo-rpc",
    providers: [
      {
        id: "smoldot-rococo",
        name: "Smoldot",
        type: "smoldot",
        description: "Light client for a decentralized experience",
        isRecommended: true,
        reliability: "high",
        latency: "low",
      },
      {
        id: "rococo-rpc",
        name: "Parity Public",
        type: "rpc",
        description: "Official Rococo RPC",
        url: "wss://rococo-rpc.polkadot.io",
        reliability: "high",
        latency: "low",
      },
      {
        id: "chopsticks-rococo",
        name: "Chopsticks",
        type: "chopsticks",
        description: "Local development environment",
        url: "ws://localhost:8009",
        reliability: "high",
        latency: "low",
      },
    ],
  },
];

export function getNetworkConfig(chainKey: string): NetworkConfig | undefined {
  return networkConfigs.find((config) => config.chain === chainKey);
}

export function getProvider(
  chainKey: string,
  providerId: string,
): NetworkProvider | undefined {
  const config = getNetworkConfig(chainKey);

  // First check static providers
  const staticProvider = config?.providers.find((provider) => provider.id === providerId);
  if (staticProvider) {
    return staticProvider;
  }

  // Check custom providers from localStorage (only in browser environment)
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem('papi-custom-providers');
      if (stored) {
        const customProviders = JSON.parse(stored);
        const customProvider = customProviders.find(
          (provider: any) => provider.chainKey === chainKey && provider.id === providerId
        );

        if (customProvider) {
          // Convert custom provider format to NetworkProvider format
          return {
            id: customProvider.id,
            name: customProvider.name,
            type: "custom" as NetworkProviderType,
            description: customProvider.description || `Custom RPC for ${chainKey}`,
            url: customProvider.wsUrl,
            reliability: "medium",
            latency: "medium"
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load custom providers:', error);
    }
  }

  return undefined;
}

export function getDefaultProvider(
  chainKey: string,
): NetworkProvider | undefined {
  const config = getNetworkConfig(chainKey);
  if (!config) return undefined;

  return config.providers.find(
    (provider) => provider.id === config.defaultProvider,
  );
}
