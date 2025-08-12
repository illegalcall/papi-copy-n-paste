# create-papi-app

Create Polkadot API applications with zero configuration.

## Quick Start

```bash
npx create-papi-app my-app
```

## Usage

### Interactive Mode

Run without arguments for interactive project setup:

```bash
npx create-papi-app
```

### Direct Creation

Specify all options directly:

```bash
npx create-papi-app my-app --template vite-react --chain polkadot
```

## Templates

- **minimal** - Minimal setup for learning and experimentation
- **vite-react** - React + Vite with modern UI (Recommended)
- **next-app** - Next.js with App Router
- **node-cli** - Command-line application with PAPI

## Options

- `--template <template>` - Template to use
- `--chain <chain>` - Blockchain to connect to (polkadot, kusama, westend, paseo)
- `--chopsticks` / `--no-chopsticks` - Include/exclude Chopsticks setup
- `--examples` / `--no-examples` - Include/exclude example code
- `--git` / `--no-git` - Initialize/skip git repository
- `--package-manager <pm>` - Package manager (npm, pnpm, yarn)
- `--yes` - Skip prompts and use defaults
- `--list` - List available templates

## Examples

```bash
# Create a minimal learning project
npx create-papi-app my-first-papi --template minimal

# Create a React app with Chopsticks for Kusama
npx create-papi-app kusama-bounties --template vite-react --chain kusama --chopsticks

# Create a CLI tool for Westend testnet
npx create-papi-app westend-cli --template node-cli --chain westend

# Skip all prompts
npx create-papi-app my-app --yes
```

## What's Included

All templates include:

- ✅ **Latest PAPI** - Polkadot API v1.16+ with proper setup
- ✅ **TypeScript** - Full TypeScript support with proper configurations
- ✅ **Chain Configuration** - Pre-configured for multiple networks
- ✅ **PAPI Descriptors** - Automatic descriptor generation
- ✅ **Example Code** - Working examples and documentation (optional)
- ✅ **Chopsticks Integration** - Local development environment (optional)

## Development

This CLI tool is part of the PAPI Copy-Paste learning platform project.

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

## Links

- [Polkadot API Documentation](https://papi.how)
- [GitHub Repository](https://github.com/polkadot-developers/create-papi-app)
- [Report Issues](https://github.com/polkadot-developers/create-papi-app/issues)
