import type { TemplateConfig, TemplateType } from "../types.js";

export const templateConfigs: Record<TemplateType, TemplateConfig> = {
  minimal: {
    name: "minimal",
    description: "Minimal setup for learning and experimentation",
    type: "minimal",
    dependencies: {
      "polkadot-api": "^1.16.3",
      "@polkadot-api/descriptors": "file:.papi/descriptors",
    },
    devDependencies: {
      "@types/node": "^20",
      typescript: "^5.7.3",
      tsx: "^4.7.0",
    },
    scripts: {
      dev: "tsx watch index.ts",
      build: "tsc",
      start: "node dist/index.js",
      postinstall: "papi add {{chainName}} --wsUrl {{wsUrl}} && papi",
    },
    features: {},
    supportedChains: ["polkadot", "kusama", "westend", "paseo"],
  },

  "vite-react": {
    name: "vite-react",
    description: "React + Vite with modern UI (Recommended)",
    type: "web",
    dependencies: {
      "polkadot-api": "^1.16.3",
      "@polkadot-api/descriptors": "file:.papi/descriptors",
      "@polkadot-api/sdk-accounts": "^0.4.0",
      "@polkadot-api/utils": "^0.2.0",
      react: "^19.1.1",
      "react-dom": "^19.1.1",
      "@react-rxjs/core": "^0.10.8",
      "@react-rxjs/utils": "^0.9.7",
      rxjs: "^7.8.2",
      "lucide-react": "^0.542.0",
      clsx: "^2.1.1",
      "tailwind-merge": "^3.3.1",
      "class-variance-authority": "^0.7.1",
      "@radix-ui/react-slot": "^1.1.1",
      "tailwindcss-animate": "^1.0.7",
    },
    devDependencies: {
      "@types/react": "^19.1.12",
      "@types/react-dom": "^19.1.9",
      "@types/node": "^20",
      "@vitejs/plugin-react": "^5.0.2",
      vite: "^7.1.3",
      typescript: "^5.7.3",
      tailwindcss: "^4.1.12",
      "@tailwindcss/vite": "^4.1.12",
      "@acala-network/chopsticks": "^1.0.2",
    },
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      preview: "vite preview",
      postinstall: "papi add {{chainName}} --wsUrl {{wsUrl}} && papi",
      "dev-local": "VITE_WITH_CHOPSTICKS=true vite",
    },
    features: {
      smoldot: true,
      ui: true,
      examples: true,
    },
    supportedChains: ["polkadot", "kusama", "westend", "paseo"],
  },

  "next-app": {
    name: "next-app",
    description: "Next.js with App Router",
    type: "web",
    dependencies: {
      "polkadot-api": "^1.16.3",
      "@polkadot-api/descriptors": "file:.papi/descriptors",
      "@polkadot-api/sdk-accounts": "^0.4.0",
      next: "^15.2.3",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^0.542.0",
    },
    devDependencies: {
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      typescript: "^5.7.3",
      tailwindcss: "^4.1.12",
    },
    scripts: {
      dev: "next dev",
      build: "papi && next build",
      start: "next start",
      lint: "next lint",
      postinstall: "papi add {{chainName}} --wsUrl {{wsUrl}} && papi",
    },
    features: {
      smoldot: true,
      ui: true,
      examples: true,
    },
    supportedChains: ["polkadot", "kusama", "westend", "paseo"],
  },

  "node-cli": {
    name: "node-cli",
    description: "Command-line application with PAPI",
    type: "cli",
    dependencies: {
      "polkadot-api": "^1.16.3",
      "@polkadot-api/descriptors": "file:.papi/descriptors",
      "@polkadot-api/sdk-accounts": "^0.4.0",
      commander: "^12.0.0",
      chalk: "^5.3.0",
      ora: "^8.0.0",
    },
    devDependencies: {
      "@types/node": "^20",
      typescript: "^5.7.3",
      tsx: "^4.7.0",
    },
    scripts: {
      dev: "tsx watch src/index.ts",
      build: "tsc",
      start: "node dist/index.js",
      postinstall: "papi add {{chainName}} --wsUrl {{wsUrl}} && papi",
    },
    features: {
      examples: true,
    },
    supportedChains: ["polkadot", "kusama", "westend", "paseo"],
  },
};

export function getTemplateConfig(template: TemplateType): TemplateConfig {
  return templateConfigs[template];
}

export function getTemplateList() {
  return Object.values(templateConfigs).map((config) => ({
    name: config.name,
    description: config.description,
    type: config.type,
    features: Object.entries(config.features)
      .filter(([_, enabled]) => enabled)
      .map(([feature]) => feature),
  }));
}
