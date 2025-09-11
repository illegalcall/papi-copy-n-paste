/**
 * Code generation utilities for PAPI transactions and storage queries
 */

import { PalletCall } from "@workspace/core";
import {
  getDescriptorImport,
  getDescriptorName,
  getSetupCommands,
  getParameterDescription,
} from "./chainConfig";
import {
  detectStorageParameters,
  generateStorageParams,
} from "./storageHelpers";

export function generateStorageQueryByType(
  queryType: string,
  pallet: string,
  storageName: string,
  paramString: string,
  hasParams: boolean,
): string {
  const baseQuery = `typedApi.query.${pallet}.${storageName}`;
  const params = hasParams ? `(${paramString})` : "()";

  // Check if this query type needs RxJS
  const needsRxJS = [
    "watchValue",
    "watchValueFinalized",
    "watchValueBest",
    "watchEntries",
    "watchEntriesPartial",
    "combineMultiple",
    "throttledWatch",
    "debouncedWatch",
    "mapValues",
    "filterChanges",
    "takeUntilChange",
    "resilientWatch",
    "comprehensiveWatch",
  ].includes(queryType);

  const rxjsImports = needsRxJS
    ? `
import { combineLatest, throttleTime, debounceTime, map, filter, takeUntil, distinctUntilChanged, retry, startWith } from 'rxjs'`
    : "";

  switch (queryType) {
    case "getValue":
      return `${rxjsImports}

// Get current value
const result = await ${baseQuery}.getValue${params}
console.log('Current value:', result)`;

    case "getValueAt":
      return `${rxjsImports}

// Get value at specific block states
const resultFinalized = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ", " : ""}{ at: "finalized" })
const resultBest = await ${baseQuery}.getValue${params.slice(0, -1)}${hasParams ? ", " : ""}{ at: "best" })
console.log('At finalized block:', resultFinalized)
console.log('At best block:', resultBest)`;

    case "getEntries":
      if (hasParams) {
        return `${rxjsImports}

// Note: This storage requires parameters, showing parameter-based approach
const result = await ${baseQuery}.getValue()
console.log('Storage value:', result)`;
      } else {
        return `${rxjsImports}

// Get all entries for this storage map
const entries = await ${baseQuery}.getEntries()
console.log('All entries:', entries)`;
      }

    case "getValues":
      return `${rxjsImports}

// Get multiple values (batch query)
const keys = [${paramString}, "//Bob", "//Charlie"] // Add more keys as needed
const results = await ${baseQuery}.getValues(keys)
console.log('Multiple values:', results)`;

    case "getEntriesPaged":
      if (hasParams) {
        return `${rxjsImports}

// Note: This storage requires parameters
const entries = await ${baseQuery}.getEntries()
console.log('Storage entries:', entries)`;
      } else {
        return `${rxjsImports}

// Get entries with pagination
const entries = await ${baseQuery}.getEntries()
console.log('Paged entries:', entries)`;
      }

    case "watchValue":
      return `${rxjsImports}

// Watch for value changes
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

    case "watchValueFinalized":
      return `${rxjsImports}

// Watch for value changes at finalized blocks only
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

    case "watchValueBest":
      return `${rxjsImports}

// Watch for value changes at best blocks
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

    case "watchEntries":
      return `${rxjsImports}

// Watch for entry changes across the entire storage map
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

    case "watchEntriesPartial":
      return `${rxjsImports}

// Watch for partial entry changes (useful for large storage maps)
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

    case "combineMultiple":
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

    case "throttledWatch":
      return `${rxjsImports}

// Watch with throttling (limit update frequency)
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

    case "debouncedWatch":
      return `${rxjsImports}

// Watch with debouncing (wait for pause in changes)
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

    case "mapValues":
      return `${rxjsImports}

// Watch and transform values
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

    case "filterChanges":
      return `${rxjsImports}

// Watch and filter specific changes
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

    case "takeUntilChange":
      return `${rxjsImports}

// Watch until a specific condition is met
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

    case "resilientWatch":
      return `${rxjsImports}

// Watch with error recovery and retry logic
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

    case "comprehensiveWatch":
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
      queryType,
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
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  const requiresKeys = detectStorageParameters(pallet, storage.name);
  const hasParams = Boolean(
    requiresKeys && Object.keys(storageParams).length > 0,
  );

  // Generate parameter string for the query
  const paramString =
    hasParams && requiresKeys
      ? generateStorageParams(storageParams, requiresKeys)
      : "";

  // Generate the actual query code based on type
  const queryCode = generateStorageQueryByType(
    queryType,
    pallet,
    storage.name,
    paramString,
    hasParams,
  );

  return `import { createClient } from "polkadot-api"
${descriptorImport}

async function query${pallet}${storage.name}() {
  // Create the client instance
  const client = createClient(provider) // Replace with your provider
  const typedApi = client.getTypedApi(${descriptorName})
  
  ${queryCode}
}

query${pallet}${storage.name}().catch(console.error)`;
}

function generateFunctionStorageCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  storage: any,
  queryType: string,
  storageParams: Record<string, any>,
): string {
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  return `import { createClient } from "polkadot-api"
${descriptorImport}

export async function query${pallet}${storage.name}(${Object.keys(storageParams).length > 0 ? "params: any" : ""}) {
  // Create the client instance
  const client = createClient(provider) // Replace with your provider
  const typedApi = client.getTypedApi(${descriptorName})
  
  try {
    const result = await typedApi.query.${pallet}.${storage.name}${Object.keys(storageParams).length > 0 ? "(params)" : ".getValue()"}
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}`;
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
  const args = call.args
    .map((arg) => {
      const value = formData[arg.name] || "";

      // Handle MultiAddress types properly for dest/target fields
      if (
        arg.name === "dest" ||
        arg.name === "target" ||
        arg.type.includes("MultiAddress")
      ) {
        if (typeof value === "string" && value.startsWith("//")) {
          const accountMap: Record<string, string> = {
            "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
            "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
          };
          const address = accountMap[value] || accountMap["//Alice"];
          return `  ${arg.name}: MultiAddress.Id("${address}"), // ${value}`;
        } else if (typeof value === "string" && value.length > 40) {
          return `  ${arg.name}: MultiAddress.Id("${value}")`;
        } else {
          return `  ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`;
        }
      }

      if (
        arg.type.includes("u128") ||
        arg.type.includes("u64") ||
        arg.name === "value" ||
        arg.name === "amount"
      ) {
        const numValue =
          typeof value === "string" ? value : String(value || "0");
        return `  ${arg.name}: ${numValue}n`;
      }

      return `  ${arg.name}: ${JSON.stringify(value)}`;
    })
    .join(",\n");

  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
${descriptorImport}

async function execute${pallet}${call.name}() {
  const ${descriptorName}Api = client.getTypedApi(${descriptorName})
  
  const call = ${descriptorName}Api.tx.${pallet}.${call.name}({
${args}
  })
  
  // You'll need a proper signer here
  const hash = await call.signAndSubmit(signer)
  console.log('Transaction hash:', hash)
}

execute${pallet}${call.name}().catch(console.error)`;
}

function generateFunctionCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  call: PalletCall,
  formData: Record<string, any>,
): string {
  const args = call.args
    .map((arg) => {
      const value = formData[arg.name] || "";

      // Handle MultiAddress types properly for dest/target fields
      if (
        arg.name === "dest" ||
        arg.name === "target" ||
        arg.type.includes("MultiAddress")
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
          return `    ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`;
        }
      }

      if (
        arg.type.includes("u128") ||
        arg.type.includes("u64") ||
        arg.name === "value" ||
        arg.name === "amount"
      ) {
        const numValue =
          typeof value === "string" ? value : String(value || "0");
        return `    ${arg.name}: ${numValue}n`;
      }

      return `    ${arg.name}: ${JSON.stringify(value)}`;
    })
    .join(",\n");

  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
${descriptorImport}

export async function execute${pallet}${call.name}(signer: any) {
  try {
    const typedApi = client.getTypedApi(${descriptorName})
    
    const call = typedApi.tx.${pallet}.${call.name}({
${args}
    })
    
    const hash = await call.signAndSubmit(signer)
    
    return { success: true, hash }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
`;
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
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

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
            arg.type.includes("MultiAddress")
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

      return `
  // Method ${index + 1}: ${method.pallet}.${method.call.name}
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

async function executeMultipleMethods() {
  const typedApi = client.getTypedApi(${descriptorName})
  
  // You'll need a proper signer here
  const signer = yourSigner // Replace with actual signer
  ${methodCalls}

  console.log("All methods completed successfully!")
}

executeMultipleMethods().catch(console.error)`;
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
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  // Generate storage queries
  const storageQueries = storageQueue
    .map((storage, index) => {
      const requiresKeys = detectStorageParameters(storage.pallet, storage.storage.name);
      const hasParams = Boolean(
        requiresKeys && Object.keys(storage.storageParams).length > 0,
      );

      // Generate parameter string for the query
      const paramString =
        hasParams && requiresKeys
          ? generateStorageParams(storage.storageParams, requiresKeys)
          : "";

      // Generate the actual query code based on type
      const queryCode = generateStorageQueryByType(
        storage.queryType,
        storage.pallet,
        storage.storage.name,
        paramString,
        hasParams,
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

async function executeMultipleStorageQueries() {
  // Create the client instance
  const client = createClient(provider) // Replace with your provider
  const typedApi = client.getTypedApi(${descriptorName})
  ${storageQueries}

  console.log("All storage queries completed!")
}

executeMultipleStorageQueries().catch(console.error)`;
}

// Constants code generation functions
export function generateConstantQueryCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  constant: any,
): string {
  const template = getCodeTemplate();
  if (template === "function") {
    return generateFunctionConstantCode(
      chainKey,
      providerId,
      pallet,
      constant,
    );
  } else {
    return generateInlineConstantCode(
      chainKey,
      providerId,
      pallet,
      constant,
    );
  }
}

export function generateInlineConstantCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  constant: any,
): string {
  const setupCommands = getSetupCommands(chainKey);
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  return `${setupCommands}

import { createClient } from "polkadot-api"
${descriptorImport}

// Create the client and get the typed API
const client = createClient(provider) // Replace with your provider
const typedApi = client.getTypedApi(${descriptorName})

// Query the constant value
const ${pallet.toLowerCase()}${constant.name} = await typedApi.constants.${pallet}.${constant.name}()

console.log("${pallet}.${constant.name}:", ${pallet.toLowerCase()}${constant.name})

// Constant information:
// Name: ${constant.name}
// Type: ${constant.type}
// Description: ${constant.docs && constant.docs.length > 0 ? constant.docs[0] : 'No description available'}
// Current value: (see console output above)`;
}

export function generateFunctionConstantCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  constant: any,
): string {
  const descriptorImport = getDescriptorImport(chainKey);
  const descriptorName = getDescriptorName(chainKey);

  return `import { createClient } from "polkadot-api"
${descriptorImport}

export async function get${pallet}${constant.name}() {
  try {
    const typedApi = client.getTypedApi(${descriptorName})
    
    const constantValue = await typedApi.constants.${pallet}.${constant.name}()
    
    return { 
      success: true, 
      value: constantValue,
      type: "${constant.type}",
      description: "${constant.docs && constant.docs.length > 0 ? constant.docs[0] : 'No description available'}"
    }
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    }
  }
}

// Constant information:
// Name: ${constant.name}
// Type: ${constant.type}
// Description: ${constant.docs && constant.docs.length > 0 ? constant.docs[0] : 'No description available'}`;
}
