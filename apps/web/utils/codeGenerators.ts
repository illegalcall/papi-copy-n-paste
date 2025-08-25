
import { PalletCall } from "@workspace/core";
import { StorageQueryType } from "../types/enums";
import {
  getDescriptorImport,
  getDescriptorName,
  getChainConnection,
  getParameterDescription,
} from "./chainConfig";
import { isBigIntType, isAccountType, isBoolType } from "./typeCheckers";
import { getStorageParameterInfo } from "./dynamicStorageDetection";
import {
  generateStorageParams,
  getCallDescription,
} from "./formatting-utils";

export function generateStorageQueryByType(
  queryType: StorageQueryType | string,
  pallet: string,
  storageName: string,
  paramString: string,
  hasParams: boolean,
  isSimpleValue: boolean = false,
): string {
  const baseQuery = `typedApi.query.${pallet}.${storageName}`;
  const params = hasParams ? `(${paramString})` : "()";

  const normalizedQueryType = typeof queryType === 'string'
    ? Object.values(StorageQueryType).find(enumValue => enumValue === queryType) || StorageQueryType.GET_VALUE
    : queryType;

  const needsRxJS = [
    StorageQueryType.WATCH_VALUE,
    StorageQueryType.WATCH_VALUE_FINALIZED,
    StorageQueryType.WATCH_VALUE_BEST,
    StorageQueryType.WATCH_ENTRIES,
    StorageQueryType.WATCH_ENTRIES_PARTIAL,
    StorageQueryType.COMBINE_MULTIPLE,
    StorageQueryType.THROTTLED_WATCH,
    StorageQueryType.DEBOUNCED_WATCH,
    StorageQueryType.MAP_VALUES,
    StorageQueryType.FILTER_CHANGES,
    StorageQueryType.TAKE_UNTIL_CHANGE,
    StorageQueryType.RESILIENT_WATCH,
    StorageQueryType.COMPREHENSIVE_WATCH,
  ].includes(normalizedQueryType);

  const rxjsImports = needsRxJS
    ? `
import { combineLatest, throttleTime, debounceTime, map, filter, takeUntil, distinctUntilChanged, retry, startWith } from 'rxjs'`
    : "";

  switch (normalizedQueryType) {
    case StorageQueryType.GET_VALUE:
      if (isSimpleValue) {
        return `${rxjsImports}

const result = await ${baseQuery}.getValue()
console.log('Storage value:', result)`;
      } else if (hasParams) {
        return `${rxjsImports}

const result = await ${baseQuery}.getValue${params}
console.log('Specific entry:', result)`;
      } else {
        return `${rxjsImports}

const entries = await ${baseQuery}.getEntries()
console.log('All entries:', entries)

// To get a specific entry, provide parameters:
// const result = await ${baseQuery}.getValue(accountId)
`;
      }

    case StorageQueryType.GET_VALUE_AT:
      return `${rxjsImports}

const resultFinalized = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ", " : ""}{ at: "finalized" })
const resultBest = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ", " : ""}{ at: "best" })
console.log('At finalized block:', resultFinalized)
console.log('At best block:', resultBest)`;

    case StorageQueryType.GET_ENTRIES:
      if (hasParams) {
        return `${rxjsImports}

const entries = await ${baseQuery}.getEntries()
console.log('All entries:', entries)

// Alternative: Get specific entry with parameters
// const specificResult = await ${baseQuery}.getValue${params}
`;
      } else {
        return `${rxjsImports}

const entries = await ${baseQuery}.getEntries()
console.log('All entries:', entries)`;
      }

    case StorageQueryType.GET_VALUES:
      return `${rxjsImports}

const keys = [${paramString}, "//Bob", "//Charlie"] // Add more keys as needed
const results = await ${baseQuery}.getValues(keys)
console.log('Multiple values:', results)`;

    case StorageQueryType.GET_ENTRIES_PAGED:
      if (hasParams) {
        return `${rxjsImports}

const entries = await ${baseQuery}.getEntries()
console.log('Storage entries:', entries)`;
      } else {
        return `${rxjsImports}

const entries = await ${baseQuery}.getEntries()
console.log('Paged entries:', entries)`;
      }

    case StorageQueryType.WATCH_VALUE:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.subscribe({
  next: (value) => {
    console.log('Value changed:', value)
    // Handle the new value here
  },
  error: (error) => {
    console.error('Watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.WATCH_VALUE_FINALIZED:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params.slice(0, -1)}${hasParams ? ", " : ""}"finalized").subscribe({
  next: (value) => {
    console.log('Finalized value changed:', value)
    // Handle the finalized value here
  },
  error: (error) => {
    console.error('Watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.WATCH_VALUE_BEST:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params.slice(0, -1)}${hasParams ? ", " : ""}"best").subscribe({
  next: (value) => {
    console.log('Best block value changed:', value)
    // Handle the best value here
  },
  error: (error) => {
    console.error('Watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.WATCH_ENTRIES:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchEntries().subscribe({
  next: (entries) => {
    console.log('Entries changed:', entries)
    // Handle the changed entries here
  },
  error: (error) => {
    console.error('Watch entries error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.WATCH_ENTRIES_PARTIAL:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchEntries().subscribe({
  next: (entries) => {
    console.log('Partial entries changed:', entries)
    // Process only the changed entries
  },
  error: (error) => {
    console.error('Watch partial entries error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.COMBINE_MULTIPLE:
      return `${rxjsImports}

// Combine multiple storage queries
const combined$ = combineLatest([
  ${baseQuery}.watchValue${params},
  // Add more queries here as needed
  // otherQuery.watchValue(),
]).pipe(
  map(([mainValue /*, otherValue */]) => ({
    main: mainValue,
    // other: otherValue
  }))
)

const subscription = combined$.subscribe({
  next: (combined) => {
    console.log('Combined values:', combined)
    // Handle combined data here
  },
  error: (error) => {
    console.error('Combined watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.THROTTLED_WATCH:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.pipe(
  throttleTime(1000) // Throttle to at most once per second
).subscribe({
  next: (value) => {
    console.log('Throttled value update:', value)
    // Handle throttled updates here
  },
  error: (error) => {
    console.error('Throttled watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.DEBOUNCED_WATCH:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.pipe(
  debounceTime(500) // Wait 500ms after last change
).subscribe({
  next: (value) => {
    console.log('Debounced value update:', value)
    // Handle debounced updates here
  },
  error: (error) => {
    console.error('Debounced watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.MAP_VALUES:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.pipe(
  map(value => {
    // Transform the value here
    if (typeof value === 'bigint') {
      return { 
        raw: value,
        formatted: (Number(value) / 10**10).toFixed(4) + ' DOT'
      }
    }
    return { raw: value, formatted: String(value) }
  })
).subscribe({
  next: (transformed) => {
    console.log('Transformed value:', transformed)
    // Handle transformed values here
  },
  error: (error) => {
    console.error('Map values error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.FILTER_CHANGES:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.pipe(
  filter(value => {
    // Add your filter condition here
    if (typeof value === 'bigint') {
      return value > 0n // Only emit when value is greater than 0
    }
    return value != null // Only emit non-null values
  }),
  distinctUntilChanged() // Only emit when value actually changes
).subscribe({
  next: (filteredValue) => {
    console.log('Filtered value change:', filteredValue)
    // Handle filtered changes here
  },
  error: (error) => {
    console.error('Filter changes error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.TAKE_UNTIL_CHANGE:
      return `${rxjsImports}

const subscription = ${baseQuery}.watchValue${params}.pipe(
  takeUntil(
    // Define your termination condition here
    ${baseQuery}.watchValue${params}.pipe(
      filter(value => {
        // Stop watching when this condition is true
        if (typeof value === 'bigint') {
          return value > 1000000000000n // Stop when over 100 DOT
        }
        return false
      })
    )
  )
).subscribe({
  next: (value) => {
    console.log('Value before condition:', value)
    // Handle values until condition is met
  },
  complete: () => {
    console.log('Watching stopped due to condition')
  },
  error: (error) => {
    console.error('Take until error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.RESILIENT_WATCH:
      return `${rxjsImports}

const resilientWatch$ = ${baseQuery}.watchValue${params}.pipe(
  retry({ count: 3, delay: 1000 }), // Retry up to 3 times with 1s delay
  startWith(null) // Start with null value
)

const subscription = resilientWatch$.subscribe({
  next: (value) => {
    console.log('Resilient value update:', value)
    // Handle resilient updates here
  },
  error: (error) => {
    console.error('Resilient watch failed after retries:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    case StorageQueryType.COMPREHENSIVE_WATCH:
      return `${rxjsImports}

// Comprehensive watching with multiple strategies
const comprehensive$ = combineLatest([
  ${baseQuery}.watchValue${params},
  ${baseQuery}.watchValue${params.slice(0, -1)}${hasParams ? ", " : ""}"finalized"),
  ${baseQuery}.watchValue${params.slice(0, -1)}${hasParams ? ", " : ""}"best")
]).pipe(
  map(([current, finalized, best]) => ({
    current,
    finalized,
    best,
    timestamp: Date.now()
  })),
  throttleTime(100) // Limit to 10 updates per second
)

const subscription = comprehensive$.subscribe({
  next: (data) => {
    console.log('Comprehensive data:', data)
    // Handle comprehensive blockchain state here
  },
  error: (error) => {
    console.error('Comprehensive watch error:', error)
  }
})

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`;

    default:
      return `${rxjsImports}

// Basic storage query
const result = await ${baseQuery}.getValue${params}
console.log('Result:', result)`;
  }
}

export function generateStorageQueryCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  storage: any,
  queryType: string,
  storageParams: Record<string, any>,
): string {
  const template = getCodeTemplate();

  if (template === "function") {
    return generateFunctionStorageCode(
      chainKey,
      providerId,
      pallet,
      storage,
      storageParams,
    );
  } else {
    return generateInlineStorageCode(
      chainKey,
      providerId,
      pallet,
      storage,
      queryType,
      storageParams,
    );
  }
}

function getCodeTemplate(): "function" | "inline" {
  // This could be made configurable in the future
  return "inline";
}

function generateInlineStorageCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  storage: any,
  queryType: string,
  storageParams: Record<string, any>,
): string {
  try {
    // Handle custom RPC connections
    if (chainKey === "custom") {
      const connectionInfo = getChainConnection(chainKey, providerId);

      return `import { createClient } from "polkadot-api"
${connectionInfo.imports}

async function queryStorage() {
${connectionInfo.connection}

  try {
    // Custom RPC using raw API calls
    // For storage queries on custom chains, you may need to:
    // 1. Generate proper descriptors with 'papi add <chain>'
    // 2. Or use raw RPC calls like client.getApi()._request()

    console.log('Connected to custom RPC')
    console.log('Available pallets and storage items depend on the chain')

    // Example raw storage query (uncomment and modify as needed):
    // const storageKey = "0x..." // Calculate proper storage key
    // const result = await client.getApi()._request("state_getStorage", [storageKey])

    return { success: true, message: 'Connected to custom RPC successfully' }
  } catch (error) {${connectionInfo.cleanup || ''}
    console.error('Storage query failed:', error)
    return { success: false, error: error.message }
  }
}

queryStorage().then(result => {
  console.log('Query result:', result)
})`;
    }

    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

        const detectedParams = getStorageParameterInfo(chainKey, pallet, storage.name);
    const paramInfo = {
      required: detectedParams.required,
      optional: detectedParams.optional || []
    };
    const allPossibleParams = [...paramInfo.required, ...paramInfo.optional];

    // Check if user provided any parameters
    const userProvidedParams = Object.keys(storageParams).filter(key =>
      storageParams[key] && String(storageParams[key]).trim() !== ""
    );

    const hasParams = Boolean(
      allPossibleParams.length > 0 && userProvidedParams.length > 0
    );

    // Generate parameter string for the query (only if user provided parameters)
    const paramString = hasParams && allPossibleParams.length > 0
      ? generateStorageParams(storageParams, allPossibleParams)
      : "";

        let queryCode;
    if (hasParams) {
      queryCode = `const result = await typedApi.query.${pallet}.${storage.name}.getValue(${paramString})
console.log('${pallet}.${storage.name}:', result)`;
    } else if (allPossibleParams.length === 0) {
            queryCode = `const result = await typedApi.query.${pallet}.${storage.name}.getValue()
console.log('${pallet}.${storage.name}:', result)`;
    } else {
      // Storage map without parameters - show all entries
      queryCode = `const entries = await typedApi.query.${pallet}.${storage.name}.getEntries()
console.log('All entries:', entries)`;
    }

    return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

${connectionInfo.connection}
const typedApi = client.getTypedApi(${descriptorName})

${queryCode}`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

function generateFunctionStorageCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  storage: any,
  storageParams: Record<string, any>,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

  return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

export async function query${pallet}${storage.name}(${Object.keys(storageParams).length > 0 ? "params: any" : ""}) {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  try {
    const result = await typedApi.query.${pallet}.${storage.name}${Object.keys(storageParams).length > 0 ? "(params)" : ".getValue()"}${connectionInfo.cleanup || ''}
    return { success: true, result }
  } catch (error) {${connectionInfo.cleanup || ''}
    return { success: false, error: error.message }
  }
}`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateCodeSnippet(
  chainKey: string,
  providerId: string,
  pallet: string,
  call: PalletCall,
  formData: Record<string, any>,
): string {
  const template = getCodeTemplate();

  if (template === "function") {
    return generateFunctionCode(chainKey, providerId, pallet, call, formData);
  } else {
    return generateInlineCode(chainKey, providerId, pallet, call, formData);
  }
}

function generateInlineCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  call: PalletCall,
  formData: Record<string, any>,
): string {
  // Handle custom RPC connections
  if (chainKey === "custom") {
    const connectionInfo = getChainConnection(chainKey, providerId);

    return `import { createClient } from "polkadot-api"
${connectionInfo.imports}

${connectionInfo.connection}

// Custom RPC may need proper descriptors
// Use 'papi add <chain>' to generate descriptors
console.log('Connected to custom RPC')`;
  }

  const paramInfo = { required: call.args.map(arg => arg.name), optional: [] };
  const description = `Call ${pallet}.${call.name}`;

    const paramTypeMap = new Map<string, string>();
  call.args.forEach(arg => {
    paramTypeMap.set(arg.name, arg.type);
  });

  // Generate arguments from form data keys with proper type handling
  const args = Object.entries(formData)
    .map(([paramName, value]) => {
            const paramType = paramTypeMap.get(paramName) || 'unknown';

      // Extract actual value from form object structure if needed
      if (typeof value === 'object' && value?.type === 'Id' && value?.value) {
        value = value.value; // Extract the actual address string
      }

      // Handle MultiAddress types based on actual parameter type
      if (isAccountType(paramType)) {
        if (typeof value === "string" && value.startsWith("//")) {
          const accountMap: Record<string, string> = {
            "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
            "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
          };
          const address = accountMap[value] || accountMap["//Alice"];
          return `  ${paramName}: MultiAddress.Id("${address}"), // ${value}`;
        } else if (typeof value === "string" && value.length > 40) {
          return `  ${paramName}: MultiAddress.Id("${value}")`;
        } else {
          return `  ${paramName}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`;
        }
      }

      // Handle numeric types based on actual parameter type
      if (isBigIntType(paramType)) {
        const numValue =
          typeof value === "string" ? value : String(value || "0");
        // Ensure we have a valid number before adding 'n'
        const cleanValue = numValue.trim() || "0";
        return `  ${paramName}: ${cleanValue}n`;
      }

      // Handle boolean types
      if (isBoolType(paramType)) {
        return `  ${paramName}: ${Boolean(value)}`;
      }

      // Default: use JSON stringify
      return `  ${paramName}: ${JSON.stringify(value)}`;
    })
    .join(",\n");

  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

    // Add metadata comments
    const metadataComment = description !== `Call ${pallet}.${call.name}`
      ? `// ${description}\n`
      : '';

    const paramComment = paramInfo.required.length > 0
      ? `// Required parameters: ${paramInfo.required.join(', ')}\n`
      : '';

    return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

${connectionInfo.connection}
const typedApi = client.getTypedApi(${descriptorName})

${metadataComment}${paramComment}const ${call.name} = typedApi.tx.${pallet}.${call.name}({
${args}
})

console.log('Transaction call created:', ${call.name})
// To actually submit: await ${call.name}.signAndSubmit(signer)${connectionInfo.cleanup || ''}`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

function generateFunctionCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  call: PalletCall,
  formData: Record<string, any>,
): string {
  const description = `Call ${pallet}.${call.name}`;
  const paramInfo = { required: call.args.map(arg => arg.name), optional: [] };

    const paramTypeMap = new Map<string, string>();
  call.args.forEach(arg => {
    paramTypeMap.set(arg.name, arg.type);
  });

  const args = Object.entries(formData)
    .map(([paramName, value]) => {
            const paramType = paramTypeMap.get(paramName) || 'unknown';

      // Extract actual value from form object structure if needed
      if (typeof value === 'object' && value?.type === 'Id' && value?.value) {
        value = value.value; // Extract the actual address string
      }

      // Handle MultiAddress types based on actual parameter type
      if (isAccountType(paramType)) {
        if (typeof value === "string" && value.startsWith("//")) {
          const accountMap: Record<string, string> = {
            "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
            "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
          };
          const address = accountMap[value] || accountMap["//Alice"];
          return `    ${paramName}: MultiAddress.Id("${address}"), // ${value}`;
        } else if (typeof value === "string" && value.length > 40) {
          return `    ${paramName}: MultiAddress.Id("${value}")`;
        } else {
          return `    ${paramName}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`;
        }
      }

      // Handle numeric types based on actual parameter type
      if (isBigIntType(paramType)) {
        const numValue =
          typeof value === "string" ? value : String(value || "0");
        return `    ${paramName}: ${numValue}n`;
      }

      // Handle boolean types
      if (isBoolType(paramType)) {
        return `    ${paramName}: ${Boolean(value)}`;
      }

      return `    ${paramName}: ${JSON.stringify(value)}`;
    })
    .join(",\n");

  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

    // Add metadata comments
    const metadataComment = description !== `Call ${pallet}.${call.name}`
      ? `// ${description}\n`
      : '';

    const paramComment = paramInfo.required.length > 0
      ? `// Required parameters: ${paramInfo.required.join(', ')}\n`
      : '';

  return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

${metadataComment}${paramComment}export async function execute${pallet}${call.name}(signer: any) {
  try {
${connectionInfo.connection}
    const typedApi = client.getTypedApi(${descriptorName})

    const call = typedApi.tx.${pallet}.${call.name}({
${args}
    })

    const hash = await call.signAndSubmit(signer)${connectionInfo.cleanup || ''}

    return { success: true, hash }
  } catch (error) {${connectionInfo.cleanup || ''}
    return { success: false, error: error.message }
  }
}
`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateMultiMethodCode(
  chainKey: string,
  providerId: string,
  methodQueue: Array<{
    pallet: string;
    call: PalletCall;
    formData: Record<string, any>;
    id: string;
  }>,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

  // Generate method calls
  const methodCalls = methodQueue
    .map((method, index) => {
      const args = method.call.args
        .map((arg) => {
          const value = method.formData[arg.name] || "";

          // Handle MultiAddress types properly for dest/target fields
          if (
            arg.name === "dest" ||
            arg.name === "target" ||
            isAccountType(arg.type)
          ) {
            if (typeof value === "string" && value.startsWith("//")) {
              const accountMap: Record<string, string> = {
                "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
                "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
                "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
              };
              const address = accountMap[value] || accountMap["//Alice"];
              return `    ${arg.name}: MultiAddress.Id("${address}"), // ${value}`;
            } else if (typeof value === "string" && value.length > 40) {
              return `    ${arg.name}: MultiAddress.Id("${value}")`;
            } else {
              return `    ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY") // //Alice`;
            }
          }

          // Handle BigInt values properly
          if (
            arg.type.includes("u128") ||
            arg.type.includes("u64") ||
            arg.name === "value" ||
            arg.name === "amount"
          ) {
            const numValue =
              typeof value === "string" ? value : String(value || "0");
            if (
              numValue &&
              !numValue.includes("n") &&
              (parseInt(numValue) > Number.MAX_SAFE_INTEGER ||
                numValue.length > 10)
            ) {
              return `    ${arg.name}: ${numValue}n`;
            }
            return `    ${arg.name}: ${numValue}n`;
          }

          return `    ${arg.name}: ${JSON.stringify(value)}`;
        })
        .join(",\n");

      const description = `Call ${method.pallet}.${method.call.name}`;
      const paramInfo = { required: method.call.args.map(arg => arg.name), optional: [] };

      const metadataComment = description !== `Call ${method.pallet}.${method.call.name}`
        ? `\n  // ${description}`
        : '';

      const paramComment = paramInfo.required.length > 0
        ? `\n  // Required parameters: ${paramInfo.required.join(', ')}`
        : '';

      return `
  // Method ${index + 1}: ${method.pallet}.${method.call.name}${metadataComment}${paramComment}
  console.log("Creating ${method.pallet}.${method.call.name}...")
  const call${index + 1} = typedApi.tx.${method.pallet}.${method.call.name}({${args ? "\n" + args + "\n  " : ""}})
  const result${index + 1} = await call${index + 1}.signAndSubmit(signer)
  console.log("Result ${index + 1}:", result${index + 1})

  // Check if method ${index + 1} succeeded before continuing
  if (!result${index + 1}.success) {
    console.error("Method ${index + 1} failed, stopping execution")
    return
  }`;
    })
    .join("\n");

  return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

async function executeMultipleMethods() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  // You'll need a proper signer here
  const signer = yourSigner // Replace with actual signer
  ${methodCalls}

  console.log("All methods completed successfully!")${connectionInfo.cleanup || ''}
}

executeMultipleMethods().catch(console.error)`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateConstantCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  constant: any,
): string {
  try {
    // Handle custom RPC connections
    if (chainKey === "custom") {
      const connectionInfo = getChainConnection(chainKey, providerId);

      return `import { createClient } from "polkadot-api"
${connectionInfo.imports}

async function getConstant() {
${connectionInfo.connection}

  try {
    // Custom RPC constants may not be accessible via typed API
    // For constants on custom chains, you may need to:
    // 1. Generate proper descriptors with 'papi add <chain>'
    // 2. Or use raw RPC calls like client.getApi()._request()

    console.log('Connected to custom RPC')
    console.log('Available constants depend on the chain')

    // Example raw constant query (uncomment and modify as needed):
    // const result = await client.getApi()._request("state_getMetadata", [])

    return { success: true, message: 'Connected to custom RPC successfully' }
  } catch (error) {${connectionInfo.cleanup || ''}
    console.error('Constant access failed:', error)
    return { success: false, error: error.message }
  }
}

getConstant().then(result => {
  console.log('Constant result:', result)
})`;
    }

    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

    return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

async function get${pallet}${constant.name}Constant() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  // PAPI Constants: Two ways to access constants

  // Method 1: Promise-based call (asynchronous)
  const constantValueAsync = await typedApi.constants.${pallet}.${constant.name}()
  console.log('${pallet}.${constant.name} constant value (async):', constantValueAsync)

  // Method 2: Synchronous call with compatibility token
  const compatibilityToken = await typedApi.compatibilityToken
  const constantValueSync = typedApi.constants.${pallet}.${constant.name}(compatibilityToken)
  console.log('${pallet}.${constant.name} constant value (sync):', constantValueSync)

  // Constants are defined at runtime and never change
  // Type: ${constant.type || 'unknown'}
  // ${constant.docs?.[0] || 'Runtime constant'}

  return constantValueAsync${connectionInfo.cleanup || ''}
}

get${pallet}${constant.name}Constant().catch(console.error)`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateErrorCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  error: any,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

    return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

// Example error handling for ${pallet}.${error.name}
async function handle${pallet}Errors() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  try {
    // Example transaction that might throw ${pallet}.${error.name}
    // Replace this with your actual transaction
    const call = typedApi.tx.${pallet}.someMethod({
      // your parameters here
    })

    const result = await call.signAndSubmit(signer)
    console.log('Transaction successful:', result)

  } catch (error) {
    // Check if the error is specifically ${pallet}.${error.name}
    if (error.type === '${pallet}' && error.value.type === '${error.name}') {
      console.error('Caught ${pallet}.${error.name} error:', error)

      // Handle this specific error
      // ${error.docs?.[0] || 'This error can occur during runtime execution'}
      console.log('Error details:', {
        pallet: '${pallet}',
        error: '${error.name}',
        type: '${error.type}',
        message: error.message
      })

      // Add your error handling logic here

    } else {
      // Handle other errors
      console.error('Other transaction error:', error)
    }${connectionInfo.cleanup || ''}
  }
}

// Usage example
handle${pallet}Errors().catch(console.error)

// Alternative: Check error types in transaction results
/*
const result = await call.signAndSubmit(signer)
if (result.type === 'txError' && result.value.type === '${pallet}' && result.value.value.type === '${error.name}') {
  console.log('Transaction failed with ${pallet}.${error.name}')
}
*/`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateMultiStorageCode(
  chainKey: string,
  providerId: string,
  storageQueue: Array<{
    pallet: string;
    storage: any;
    queryType: string;
    storageParams: Record<string, any>;
    id: string;
  }>,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

  // Generate storage queries
  const storageQueries = storageQueue
    .map((storage, index) => {
      const detectedParams = getStorageParameterInfo(chainKey, storage.pallet, storage.storage.name);
      const requiresKeys = detectedParams.required;
      const hasParams = Boolean(
        requiresKeys && Object.keys(storage.storageParams).length > 0,
      );

      // Generate parameter string for the query
      const paramString =
        hasParams && requiresKeys
          ? generateStorageParams(storage.storageParams, requiresKeys)
          : "";

      // Determine if this is a simple storage value (no parameters required)
      const isSimpleValue = (!requiresKeys || requiresKeys.length === 0);

      // Generate the actual query code based on type
      const queryCode = generateStorageQueryByType(
        storage.queryType,
        storage.pallet,
        storage.storage.name,
        paramString,
        hasParams,
        isSimpleValue,
      );

      return `
  // Storage Query ${index + 1}: ${storage.pallet}.${storage.storage.name} (${storage.queryType})
  console.log("Querying ${storage.pallet}.${storage.storage.name}...")
  ${queryCode.replace(/typedApi\./g, `typedApi.`).replace(/^/gm, '  ')}
  `;
    })
    .join("\n");

  return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

async function executeMultipleStorageQueries() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})
  ${storageQueries}

  console.log("All storage queries completed!")${connectionInfo.cleanup || ''}
}

executeMultipleStorageQueries().catch(console.error)`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}

export function generateEventCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  event: any,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries
// 🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, hydration, paseo, westend, rococo
// 💡 Please switch to a supported chain to generate code`;
    }

    const connectionInfo = getChainConnection(chainKey, providerId);

    // Generate event arguments description
    const argsDescription = event.args && event.args.length > 0
      ? event.args.map((arg: any) =>
          `    // ${arg.name}: ${arg.type} - ${getParameterDescription(arg.name, arg.type)}`
        ).join('\n')
      : '    // No arguments for this event';

    // Generate event listening examples
    const eventListeningExamples = `
  // Method 1: Listen to all events from this pallet
  const allPalletEvents$ = typedApi.event.${pallet}.*$
  allPalletEvents$.subscribe({
    next: (event) => {
      if (event.type === '${event.name}') {
        console.log('Caught ${pallet}.${event.name} event:', event.value)
        // Handle the event data here
      }
    },
    error: (error) => console.error('Event subscription error:', error)
  })

  // Method 2: Listen specifically to ${pallet}.${event.name} events
  const ${event.name.toLowerCase()}Events$ = typedApi.event.${pallet}.${event.name}$
  ${event.name.toLowerCase()}Events$.subscribe({
    next: (eventData) => {
      console.log('${pallet}.${event.name} event received:', eventData)
      ${event.args && event.args.length > 0
        ? `
      // Access event data:
${event.args.map((arg: any) => `      // eventData.${arg.name} - ${arg.type}`).join('\n')}`
        : '      // This event has no data'
      }
    },
    error: (error) => console.error('${event.name} event error:', error)
  })

  // Method 3: Filter events from all pallets (for comprehensive monitoring)
  const allEvents$ = client.finalizedBlock$.pipe(
    switchMap(block => block.events$),
    filter(event => event.pallet === '${pallet}' && event.name === '${event.name}')
  )

  allEvents$.subscribe({
    next: (event) => {
      console.log('Filtered ${pallet}.${event.name} event:', {
        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        eventData: event.value
      })
    }
  })`;

    return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}
import { switchMap, filter } from 'rxjs'

// Event listening for ${pallet}.${event.name}
async function listen${pallet}${event.name}Events() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  console.log("Setting up event listeners for ${pallet}.${event.name}...")

  // Event: ${pallet}.${event.name}
  // Description: ${event.docs?.[0] || 'Blockchain event emitted during runtime execution'}
  //
  // Event Arguments:
${argsDescription}
  ${eventListeningExamples}

  // Keep the subscription alive
  console.log("Event listeners active. Press Ctrl+C to stop.")

  // Prevent the script from exiting
  await new Promise(() => {})${connectionInfo.cleanup || ''}
}

// Usage example
listen${pallet}${event.name}Events().catch(console.error)

// Alternative: One-time event filtering from recent blocks
/*
async function getRecentEvents() {
${connectionInfo.connection}
  const typedApi = client.getTypedApi(${descriptorName})

  // Get events from the last 10 blocks
  const latestBlock = await client.getBlock()
  const blockHeight = latestBlock.number

  for (let i = 0; i < 10; i++) {
    const blockHash = await client.getBlockHash(blockHeight - i)
    const block = await client.getBlock(blockHash)
    const events = await block.events

    const ${event.name.toLowerCase()}Events = events.filter(e =>
      e.pallet === '${pallet}' && e.name === '${event.name}'
    )

    if (${event.name.toLowerCase()}Events.length > 0) {
      console.log(\`Found \${${event.name.toLowerCase()}Events.length} ${pallet}.${event.name} events in block \${blockHeight - i}\`)
      ${event.name.toLowerCase()}Events.forEach(event => {
        console.log('Event data:', event.value)
      })
    }
  }${connectionInfo.cleanup || ''}
}
*/`;
  } catch (error) {
    return `// ❌ Error generating code: ${error instanceof Error ? error.message : "Unknown error"}
// 💡 This chain may not be supported for typed API queries`;
  }
}
