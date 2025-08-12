# {{projectName}}

A modern {{chainDisplayName}} application built with Polkadot API, React, and Vite.

## Features

- ✅ **{{chainDisplayName}} Connection** - Connected to {{chainDisplayName}} network
- ✅ **Modern React** - React 19 with hooks and TypeScript  
- ✅ **PAPI Integration** - Full Polkadot API v1.16+ integration
- ✅ **Real-time Data** - Live block subscriptions with RxJS
- ✅ **Type Safety** - Complete TypeScript support with PAPI descriptors
- ✅ **Modern UI** - Tailwind CSS with shadcn/ui components
{{#includeExamples}}- ✅ **Interactive Examples** - Balance queries, block info, storage queries{{/includeExamples}}
{{#includeChopsticks}}- ✅ **Local Development** - Chopsticks integration for local testing{{/includeChopsticks}}

## Getting Started

Install dependencies:

```bash
{{packageManager}} install
```

Start the development server:

```bash
{{packageManager}} run dev
```

{{#includeChopsticks}}
### Local Development with Chopsticks

Start the Chopsticks local fork:

```bash
cd chopsticks
{{packageManager}} install
{{packageManager}} start
```

Then run the app in local mode:

```bash
{{packageManager}} run dev-local
```
{{/includeChopsticks}}

## Project Structure

```
{{projectName}}/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── chain/          # Chain-specific components
{{#includeExamples}}│   │   └── examples/      # Interactive examples{{/includeExamples}}
│   ├── lib/                # Utilities and PAPI setup
│   │   ├── chain.ts        # PAPI client configuration
│   │   ├── chains.ts       # Supported chains config
│   │   └── utils.ts        # Helper functions
│   ├── pages/              # Application pages
│   ├── App.tsx             # Main application
│   └── main.tsx            # React entry point
├── .papi/                  # PAPI generated files
│   ├── descriptors/        # Type-safe chain descriptors
│   └── metadata/           # Chain metadata cache
{{#includeChopsticks}}├── chopsticks/             # Local development setup{{/includeChopsticks}}
└── public/                 # Static assets
```

## PAPI Configuration

This app connects to {{chainDisplayName}} using these endpoints:

{{#wsUrls}}- `{{url}}`
{{/wsUrls}}

The connection automatically uses:
- **Light client** mode with Smoldot when `?smoldot=true` is added to the URL
- **WebSocket providers** for standard connections
{{#includeChopsticks}}- **Chopsticks** for local development when `VITE_WITH_CHOPSTICKS=true`{{/includeChopsticks}}

## Key Components

### Chain Client (`src/lib/chain.ts`)
- PAPI client initialization
- Provider selection (WebSocket/Smoldot{{#includeChopsticks}}/Chopsticks{{/includeChopsticks}})
- Real-time block subscriptions
- Connection state management

### Dashboard (`src/pages/Dashboard.tsx`)
- Chain information display
- Live block monitoring
- Connection status

{{#includeExamples}}
### Examples (`src/pages/ExamplePages.tsx`)
- **Balance Queries** - Query account balances and information
- **Block Information** - Real-time block data and subscriptions  
- **Storage Queries** - Advanced storage queries and metadata
{{/includeExamples}}

## Common Operations

### Querying Account Balance
```typescript
const accountInfo = await typedApi.query.System.Account(address)
console.log(accountInfo.data.free) // Free balance
```

### Subscribing to Blocks
```typescript
client.finalizedBlock$.subscribe((block) => {
  console.log(`New block: #${block.number}`)
})
```

### Querying Chain Constants
```typescript
const version = await typedApi.constants.System.Version()
console.log(version.spec_name) // Chain name
```

## Build and Deploy

Build for production:

```bash
{{packageManager}} run build
```

Preview the production build:

```bash
{{packageManager}} run preview
```

## Learn More

- [Polkadot API Documentation](https://papi.how) - Complete PAPI guide
- [Examples](https://papi.how/examples) - More PAPI examples  
- [React Documentation](https://react.dev) - Learn React
- [Vite Documentation](https://vitejs.dev) - Learn Vite
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [shadcn/ui](https://ui.shadcn.com) - UI component library

## License

This project was created with `create-papi-app`.