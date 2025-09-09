# {{projectName}}

A minimal Polkadot API application connected to {{chainDisplayName}}.

## Getting Started

Install dependencies:

```bash
{{packageManager}} install
```

Run in development mode:

```bash
{{packageManager}} run dev
```

Build for production:

```bash
{{packageManager}} run build
{{packageManager}} start
```

## Project Structure

- `index.ts` - Main application entry point
- `.papi/` - PAPI configuration and generated descriptors
{{#includeExamples}}- `examples/` - Example PAPI usage{{/includeExamples}}

## PAPI Configuration

This project is configured to connect to {{chainDisplayName}} using:

{{#wsUrls}}- {{url}}
{{/wsUrls}}

The PAPI descriptors are automatically generated based on the chain metadata and stored in `.papi/descriptors/`.

## Next Steps

{{#includeExamples}}
Check out the examples in the `examples/` directory:

- `balance-query.ts` - Query account balances
- `block-info.ts` - Get block information
- `storage-queries.ts` - Various storage queries

{{/includeExamples}}
Learn more about Polkadot API:

- [Documentation](https://papi.how)
- [Examples](https://papi.how/examples)
- [API Reference](https://papi.how/api)

Happy coding! 🚀