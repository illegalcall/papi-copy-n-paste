export interface CreateOptions {
  projectName: string;
  template: TemplateType;
  targetPath: string;
  chain: ChainType;
  provider?: string;
  includeChopsticks: boolean;
  includeExamples: boolean;
  packageManager: PackageManager;
  git: boolean;
  interactive: boolean;
}

export type TemplateType = "minimal" | "vite-react" | "next-app" | "node-cli";

export type ChainType = "polkadot" | "kusama" | "westend" | "paseo";

export type PackageManager = "npm" | "pnpm" | "yarn";

export interface TemplateConfig {
  name: string;
  description: string;
  type: "web" | "cli" | "minimal";
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  features: {
    smoldot?: boolean;
    chopsticks?: boolean;
    ui?: boolean;
    examples?: boolean;
  };
  supportedChains: ChainType[];
}

export interface ChainConfig {
  name: string;
  displayName: string;
  wsUrls: string[];
  chainSpecImport: string;
  descriptorName: string;
}

export interface TemplateVariables {
  projectName: string;
  chainName: string;
  chainDisplayName: string;
  chainSpecImport: string;
  descriptorName: string;
  descriptorImport: string;
  includeChopsticks: boolean;
  includeExamples: boolean;
  packageManager: string;
  wsUrls: string[];
}

export interface CommandOptions {
  template?: TemplateType;
  chain?: ChainType;
  chopsticks?: boolean;
  examples?: boolean;
  git?: boolean;
  packageManager?: PackageManager;
  yes?: boolean;
  list?: boolean;
}
