# PAPI Copy-n-Paste

A web-based tool for generating ready-to-use PAPI (Polkadot API) code snippets with integrated learning features. This tool helps developers quickly create TypeScript code for interacting with Substrate-based blockchains in the Polkadot ecosystem.

## ✨ Features

### Core Functionality

- **🔗 Multi-Chain Support**: Connect to Polkadot, Kusama, Moonbeam, Bifrost, Astar, Acala, and Hydration
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Real-time Code Generation**: Generate TypeScript code as you configure parameters
- **📋 Copy-to-Clipboard**: One-click copying of generated code with setup instructions
- **🔄 Live Provider Switching**: Switch between different RPC providers for each chain

### Transaction Support

- **💰 Balance Transfers**: Generate code for token transfers with proper validation
- **🏛️ Governance**: Create proposals and voting transactions
- **💎 Staking**: Bond, nominate, and manage staking operations
- **🔧 System Operations**: Remark calls and other system functions

### Storage Queries

- **📊 Account Information**: Query balances, nonces, and account data
- **🗳️ Democracy Data**: Access referendum and proposal information
- **⚖️ Staking Details**: Retrieve validator, nominator, and era information
- **🏗️ System State**: Query block numbers, hashes, and runtime versions

### Developer Experience

- **🎓 Interactive Interface**: Clean, intuitive interface for parameter input
- **📚 Parameter Help**: Detailed explanations for each PAPI parameter
- **🛠️ Type Safety**: Full TypeScript support with proper type definitions
- **📖 Code Templates**: Production-ready code with best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/illegalcall/papi-copy-paste-setup.git
cd papi-copy-paste

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

This project uses a monorepo structure with the following packages:

### Applications

- **`apps/web`**: Next.js web application with the main UI

### Core Packages

- **`packages/core`**: Core PAPI functionality and chain configurations
- **`packages/ui`**: Shared UI components using shadcn/ui
- **`packages/eslint-config`**: Shared ESLint configuration
- **`packages/typescript-config`**: Shared TypeScript configuration

### Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **PAPI (Polkadot API)**: Blockchain interaction library
- **Turbo**: Monorepo build system

## 📖 Usage Guide

### Generating Transaction Code

1. **Select Network**: Choose your target blockchain and RPC provider
2. **Choose Pallet**: Select the pallet containing your desired functionality
3. **Pick Method**: Choose the specific call you want to execute
4. **Configure Parameters**: Fill in the required parameters using the form
5. **Copy Code**: Click the copy button to get complete, ready-to-use TypeScript code

### Generating Storage Query Code

1. **Select Network**: Choose your blockchain network
2. **Choose Pallet**: Select the pallet containing the storage you want to query
3. **Pick Storage**: Choose the specific storage item
4. **Set Query Type**: Select between `getValue`, `getEntries`, or `getKeys`
5. **Configure Parameters**: Provide any required storage parameters
6. **Copy Code**: Get the complete storage query code

### Using the Interface

1. **Select Network**: Choose your target blockchain from supported networks
2. **Browse Pallets**: Explore available pallets and their functionality
3. **Configure Parameters**: Use the interactive forms to set parameters
4. **Generate Code**: Get production-ready TypeScript code instantly
5. **Copy & Use**: One-click copying with setup instructions included

## 🛠️ Development

### Project Structure

```
papi-copy-paste/
├── apps/
│   └── web/                 # Main web application
│       ├── app/             # Next.js App Router pages
│       ├── components/      # React components
│       ├── hooks/           # Custom React hooks
│       └── utils/           # Utility functions
├── packages/
│   ├── core/                # Core PAPI functionality
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
└── turbo.json               # Turbo monorepo configuration
```

### Available Scripts

```bash
# Development
pnpm dev                     # Start development server
pnpm build                   # Build all packages
pnpm lint                    # Run linting
pnpm format                  # Format code with Prettier

# Additional scripts
pnpm extract-storage-metadata # Extract storage metadata for chain analysis
pnpm constants               # Extract all constants from chain metadata
```

### Adding New Chains

To add support for a new blockchain:

1. **Update Core Package**: Add chain configuration in `packages/core/src/`
2. **Add Providers**: Configure RPC providers in the network configuration
3. **Update Metadata**: Run `pnpm extract-storage-metadata` to update chain metadata
4. **Test Integration**: Verify the chain works with both transactions and storage queries

### Contributing

This project follows standard open-source contribution practices:

1. **Fork** the repository
2. **Create** a feature branch from `main`
3. **Make** your changes with proper testing
4. **Follow** the existing code style and conventions
5. **Submit** a pull request with a clear description

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

### Testing Guidelines

- Unit tests for utility functions and hooks
- Integration tests for component interactions
- E2E tests for complete user workflows
- Mock external dependencies for reliable testing

## 📚 Learning Resources

### PAPI Documentation

- [PAPI Official Docs](https://papi.how/)
- [Polkadot Developer Hub](https://developers.polkadot.network/)
- [Substrate Documentation](https://docs.substrate.io/)

### Developer Resources

- **Parameter Documentation**: Comprehensive guides for each PAPI parameter type
- **Code Examples**: Real-world examples and best practices
- **Type Definitions**: Full TypeScript support with auto-completion
- **Testing Tools**: Built-in validation and error checking

## 🤝 Contributing

We welcome contributions! This project is designed to be maintainable and contributor-friendly.

### Getting Started

1. **Read** the full README and explore the codebase
2. **Check** existing issues and discussions
3. **Start** with good first issues labeled `good-first-issue`
4. **Ask** questions in discussions if you need guidance

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage for new features
- Use the existing component patterns
- Document complex logic and architectural decisions
- Follow the established code formatting (Prettier + ESLint)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Polkadot Team**: For creating the PAPI library and Substrate framework
- **shadcn/ui**: For the excellent component library and design system
- **Next.js Team**: For the powerful React framework
- **Community Contributors**: For feedback, testing, and improvements

## 🆘 Support

- **Documentation**: Check the inline help and parameter explanations
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions for questions and ideas

---

**Happy coding with PAPI!** 🚀
