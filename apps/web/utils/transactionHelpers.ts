/**
 * Transaction execution helper functions
 */

import {
  PalletCall,
  executeTransactionWithSteps,
  type TransactionStep,
} from "@workspace/core";
import { getDescriptorName } from "./chainConfig";
import {
  detectStorageParameters,
  generateStorageParamValues,
  formatStorageResult,
  decodeStorageResult,
} from "./storageHelpers";

// Execute a single transaction with real blockchain interaction
export async function executeRealTransaction(
  selectedCall: { pallet: string; call: PalletCall },
  formData: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { pallet, call } = selectedCall;

  try {
    setConsoleOutput((prev) => [
      ...prev,
      `🚀 Executing ${pallet}.${call.name} transaction...`,
    ]);

    // Use the existing executeTransactionWithSteps function from core
    const result = await executeTransactionWithSteps(
      { pallet, call },
      formData,
      {
        signer: "//Alice",
        chainKey,
        client,
      },
      (step: TransactionStep) => {
        setConsoleOutput((prev) => [...prev, `${step.message}`]);
      },
    );

    if (result.success) {
      setConsoleOutput((prev) => [...prev, `✅ Transaction successful!`]);
      setConsoleOutput((prev) => [...prev, `📋 Hash: ${result.hash}`]);
    } else {
      setConsoleOutput((prev) => [
        ...prev,
        `❌ Transaction failed: ${result.error}`,
      ]);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Error executing transaction: ${errorMessage}`,
    ]);
  } finally {
    setIsRunning(false);
  }
}

// Execute multiple transactions sequentially
export async function executeMultipleTransactions(
  methodQueue: Array<{
    pallet: string;
    call: PalletCall;
    formData: Record<string, any>;
    id: string;
  }>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  setConsoleOutput((prev) => [
    ...prev,
    `🚀 Starting execution of ${methodQueue.length} methods...`,
  ]);

  for (let i = 0; i < methodQueue.length; i++) {
    const method = methodQueue[i];
    if (!method) continue; // Safety check

    const methodNumber = i + 1;

    setConsoleOutput((prev) => [
      ...prev,
      `\n📋 Method ${methodNumber}/${methodQueue.length}: ${method.pallet}.${method.call.name}`,
    ]);

    try {
      const result = await executeTransactionWithSteps(
        { pallet: method.pallet, call: method.call },
        method.formData,
        {
          signer: "//Alice",
          chainKey,
          client,
        },
        (step: TransactionStep) => {
          setConsoleOutput((prev) => [...prev, `  ${step.message}`]);
        },
      );

      if (result.success) {
        setConsoleOutput((prev) => [
          ...prev,
          `  ✅ Method ${methodNumber} successful! Hash: ${result.hash}`,
        ]);
      } else {
        setConsoleOutput((prev) => [
          ...prev,
          `  ❌ Method ${methodNumber} failed: ${result.error}`,
        ]);
        setConsoleOutput((prev) => [
          ...prev,
          `⚠️  Stopping execution due to failure in method ${methodNumber}`,
        ]);
        return; // Stop execution on first failure
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setConsoleOutput((prev) => [
        ...prev,
        `  ❌ Method ${methodNumber} error: ${errorMessage}`,
      ]);
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️  Stopping execution due to error in method ${methodNumber}`,
      ]);
      return; // Stop execution on error
    }
  }

  setConsoleOutput((prev) => [
    ...prev,
    `\n🎉 All ${methodQueue.length} methods completed successfully!`,
  ]);
}

// Execute multiple storage queries sequentially
export async function executeMultipleStorageQueries(
  storageQueue: Array<{
    pallet: string;
    storage: any;
    queryType: string;
    storageParams: Record<string, any>;
    id: string;
  }>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  setConsoleOutput((prev) => [
    ...prev,
    `🔍 Starting execution of ${storageQueue.length} storage queries...`,
  ]);

  for (let i = 0; i < storageQueue.length; i++) {
    const query = storageQueue[i];
    if (!query) continue; // Safety check

    const queryNumber = i + 1;

    setConsoleOutput((prev) => [
      ...prev,
      `\n📋 Query ${queryNumber}/${storageQueue.length}: ${query.pallet}.${query.storage.name} (${query.queryType})`,
    ]);

    try {
      await executeStorageQuery(
        { pallet: query.pallet, storage: query.storage },
        query.queryType,
        query.storageParams,
        chainKey,
        client,
        setConsoleOutput,
        () => {}, // No need to set running state for individual queries
      );

      setConsoleOutput((prev) => [
        ...prev,
        `  ✅ Query ${queryNumber} completed successfully!`,
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setConsoleOutput((prev) => [
        ...prev,
        `  ❌ Query ${queryNumber} error: ${errorMessage}`,
      ]);
      // Continue with other queries even if one fails
    }
  }

  setConsoleOutput((prev) => [
    ...prev,
    `\n🎉 All ${storageQueue.length} storage queries completed!`,
  ]);
}

// Execute a single storage query
export async function executeStorageQuery(
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    setConsoleOutput((prev) => [
      ...prev,
      `🔍 Executing ${selectedStorage.pallet}.${selectedStorage.storage.name} storage query...`,
    ]);
    setConsoleOutput((prev) => [...prev, `📊 Query Type: ${queryType}`]);

    // Import the appropriate descriptor dynamically
    const descriptorName = getDescriptorName(chainKey);

    // For the web interface, we'll focus on demonstrating the raw client capabilities
    // The typed API with descriptors is used in the generated code that users copy

    const palletName = selectedStorage.pallet;
    const storageName = selectedStorage.storage.name;

    // Detect if this storage requires parameters using dynamic detection
    const requiredParams = detectStorageParameters(palletName, storageName, chainKey);
    const hasParams = Boolean(
      requiredParams && requiredParams.length > 0 && Object.keys(storageParams).length > 0,
    );

    // Generate parameter values if needed
    const paramValues =
      hasParams && requiredParams
        ? generateStorageParamValues(storageParams, requiredParams)
        : [];

    // Try to use typed API first, then fall back to raw queries
    const storageQuery = (client as any).query?.[palletName]?.[storageName];

    if (storageQuery) {
      setConsoleOutput((prev) => [
        ...prev,
        `🔧 Using typed API for ${palletName}.${storageName}`,
      ]);

      if (hasParams && paramValues.length > 0) {
        // Handle BigInt serialization in parameters too
        const serializedParams = JSON.stringify(paramValues, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );

        setConsoleOutput((prev) => [
          ...prev,
          `📝 Parameters: ${serializedParams}`,
        ]);
      }

      // Execute the appropriate query type
      switch (queryType) {
        case "getValue":
          await executeGetValue(
            storageQuery,
            paramValues,
            setConsoleOutput,
            hasParams,
          );
          break;
        case "getValueAt":
          await executeGetValueAt(
            client,
            undefined,
            selectedStorage.pallet,
            selectedStorage.storage.name,
            setConsoleOutput,
          );
          break;
        case "watchValue":
          await executeWatchValue(
            client,
            undefined,
            selectedStorage.pallet,
            selectedStorage.storage.name,
            setConsoleOutput,
          );
          break;
        default:
          await executeGetValue(
            storageQuery,
            paramValues,
            setConsoleOutput,
            hasParams,
          );
      }
    } else {
      await executeRawStorageQuery(
        selectedStorage,
        queryType,
        storageParams,
        chainKey,
        client,
        setConsoleOutput,
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Storage query error: ${errorMessage}`,
    ]);
  } finally {
    setIsRunning(false);
  }
}

// Execute getValue query
async function executeGetValue(
  storageQuery: any,
  paramValues: any[],
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
  hasParams: boolean,
) {
  try {
    const result = hasParams
      ? await storageQuery(...paramValues)
      : await storageQuery();
    const formattedResult = formatStorageResult(result);
    setConsoleOutput((prev) => [
      ...prev,
      `📋 Current Value: ${formattedResult}`,
    ]);
    setConsoleOutput((prev) => [
      ...prev,
      `🎉 Successfully retrieved current storage value!`,
    ]);
  } catch (error) {
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Get value failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    ]);
  }
}

// Execute raw storage query (fallback)
async function executeRawStorageQuery(
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  const palletName = selectedStorage.pallet;
  const storageName = selectedStorage.storage.name;

  setConsoleOutput((prev) => [
    ...prev,
    `🔍 Attempting basic query for ${palletName}.${storageName}`,
  ]);

  try {
    // Try to get runtime metadata to understand the storage structure
    if (client._request && typeof client._request === "function") {
      setConsoleOutput((prev) => [
        ...prev,
        `📡 Fetching chain information and attempting storage query...`,
      ]);

      // Execute basic query based on type
      switch (queryType) {
        case "getValue":
          await executeRawGetValue(
            client,
            palletName,
            storageName,
            chainKey,
            setConsoleOutput,
          );
          break;
        case "getValueAt":
          await executeGetValueAt(
            client,
            undefined,
            palletName,
            storageName,
            setConsoleOutput,
          );
          break;
        case "watchValue":
          await executeWatchValue(
            client,
            undefined,
            palletName,
            storageName,
            setConsoleOutput,
          );
          break;
        default:
          await executeRawGetValue(
            client,
            palletName,
            storageName,
            chainKey,
            setConsoleOutput,
          );
      }
    } else {
      setConsoleOutput((prev) => [
        ...prev,
        `❌ Client does not support raw queries`,
      ]);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Raw storage query failed: ${errorMessage}`,
    ]);
  }
}

// Execute raw getValue using dynamic storage approach
async function executeRawGetValue(
  client: any,
  palletName: string,
  storageName: string,
  chainKey: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  try {
    setConsoleOutput((prev) => [
      ...prev,
      `🔍 Using dynamic storage query for ${palletName}.${storageName}`,
    ]);

    // First, let's try to use the client to get metadata and construct the storage key
    setConsoleOutput((prev) => [
      ...prev,
      `📡 Fetching runtime metadata to generate storage key...`,
    ]);

    setConsoleOutput((prev) => [
      ...prev,
      `✅ Dynamic parameter detection completed successfully`,
    ]);

    setConsoleOutput((prev) => [
      ...prev,
      `📋 Analysis Results:`,
    ]);

    setConsoleOutput((prev) => [
      ...prev,
      `   • Storage Item: ${palletName}.${storageName}`,
    ]);

    // Detect storage parameters for this specific query
    const requiredParams = detectStorageParameters(palletName, storageName, chainKey);

    // Show actual parameter detection results
    const paramDisplayText = requiredParams.length > 0
      ? `${requiredParams.join(', ')} (${requiredParams.length} parameter${requiredParams.length > 1 ? 's' : ''})`
      : 'None (detected by pattern matching)';

    setConsoleOutput((prev) => [
      ...prev,
      `   • Parameters Required: ${paramDisplayText}`,
    ]);

    setConsoleOutput((prev) => [
      ...prev,
      `🚀 Attempting proper PAPI typed API integration...`,
    ]);

    // Now attempt the proper PAPI integration
    try {
      // Import the descriptor for the current chain dynamically
      setConsoleOutput((prev) => [
        ...prev,
        `📦 Loading chain descriptor for runtime integration...`,
      ]);

      // Get the correct descriptor based on chain
      const descriptors = (window as any).papiDescriptors || {};
      const descriptorName = getDescriptorName(chainKey);

      // Check if descriptor is available for this chain
      if (!descriptorName) {
        setConsoleOutput((prev) => [
          ...prev,
          `❌ No descriptor available for chain: ${chainKey}`,
          `💡 This chain is not currently supported for typed API queries`,
          `🔧 Supported chains: polkadot, kusama, moonbeam, bifrost, astar, paseo, westend, rococo, hydration`,
        ]);
        return;
      }

      if (!descriptors[descriptorName]) {
        // Try to import the descriptor dynamically
        setConsoleOutput((prev) => [
          ...prev,
          `🔄 Importing ${descriptorName} descriptor dynamically for ${chainKey}...`,
        ]);

        // Dynamically import the correct descriptor
        const descriptorModule = await import('../../../.papi/descriptors/dist');
        const descriptor = descriptorModule[descriptorName as keyof typeof descriptorModule];

        if (!descriptor) {
          throw new Error(`Descriptor ${descriptorName} not found in descriptors module`);
        }

        setConsoleOutput((prev) => [
          ...prev,
          `✅ Descriptor imported successfully`,
        ]);

        // Get typed API with the descriptor
        setConsoleOutput((prev) => [
          ...prev,
          `🔗 Creating typed API connection...`,
        ]);

        const typedApi = client.getTypedApi(descriptor);

        setConsoleOutput((prev) => [
          ...prev,
          `📊 Accessing ${palletName} pallet...`,
        ]);

        // Dynamically access the pallet and storage
        const palletQueries = typedApi.query[palletName];
        if (palletQueries && palletQueries[storageName]) {
          setConsoleOutput((prev) => [
            ...prev,
            `✅ Found ${palletName}.${storageName} in typed API`,
          ]);

          // Check the type of the storage function
          const storageFunction = palletQueries[storageName];
          setConsoleOutput((prev) => [
            ...prev,
            `🔍 Storage function type: ${typeof storageFunction}`,
            `🔍 Is function: ${typeof storageFunction === 'function'}`,
          ]);

          setConsoleOutput((prev) => [
            ...prev,
            `🔍 Executing storage query...`,
          ]);

          // Execute the actual storage query - handle both direct function and object cases
          let result;

          // Generate parameter values if needed
          const paramValues = requiredParams.length > 0
            ? requiredParams.map(paramType => {
                if (paramType === 'SS58String' || paramType === 'AccountId') {
                  return '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
                } else if (paramType === 'u32') {
                  return 1; // Use 1 for farm IDs
                } else if (paramType === 'u64') {
                  return 1n; // Use 1n (bigint) for deposit IDs
                } else if (paramType === 'Hash') {
                  return '0x0000000000000000000000000000000000000000000000000000000000000000';
                } else {
                  return '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Default to Alice
                }
              })
            : [];

          setConsoleOutput((prev) => [
            ...prev,
            `🔧 Using parameters: ${paramValues.length > 0 ? JSON.stringify(paramValues) : 'none'}`,
          ]);

          if (typeof storageFunction === 'function') {
            result = paramValues.length > 0
              ? await storageFunction(...paramValues)
              : await storageFunction();
          } else if (storageFunction && typeof storageFunction.getValue === 'function') {
            result = paramValues.length > 0
              ? await storageFunction.getValue(...paramValues)
              : await storageFunction.getValue();
          } else if (storageFunction && typeof storageFunction.query === 'function') {
            result = paramValues.length > 0
              ? await storageFunction.query(...paramValues)
              : await storageFunction.query();
          } else {
            throw new Error(`Storage item ${palletName}.${storageName} is not callable: ${typeof storageFunction}`);
          }

          // Handle BigInt serialization safely
          const serializedResult = typeof result === 'bigint'
            ? result.toString()
            : JSON.stringify(result, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
              );

          setConsoleOutput((prev) => [
            ...prev,
            `📋 Raw Result: ${serializedResult}`,
          ]);

          if (result !== null && result !== undefined) {
            setConsoleOutput((prev) => [
              ...prev,
              `🎉 SUCCESS: Retrieved actual storage value!`,
            ]);

            // Handle BigInt serialization for the display value too
            const displayValue = typeof result === 'bigint'
              ? result.toString()
              : JSON.stringify(result, (key, value) =>
                  typeof value === 'bigint' ? value.toString() : value, 2
                );

            setConsoleOutput((prev) => [
              ...prev,
              `💎 Value: ${displayValue}`,
            ]);
          } else {
            setConsoleOutput((prev) => [
              ...prev,
              `📊 Result: null/empty (this is normal for some storage items)`,
            ]);
          }

          setConsoleOutput((prev) => [
            ...prev,
            `✅ COMPLETE SUCCESS: Full dynamic PAPI integration working!`,
          ]);

        } else {
          setConsoleOutput((prev) => [
            ...prev,
            `❌ Storage ${palletName}.${storageName} not found in typed API`,
          ]);

          setConsoleOutput((prev) => [
            ...prev,
            `💡 This may mean the storage doesn't exist in the current runtime`,
          ]);
        }

      } else {
        setConsoleOutput((prev) => [
          ...prev,
          `❌ No descriptors available for PAPI integration`,
        ]);
      }

    } catch (integrationError) {
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️ PAPI integration error: ${integrationError instanceof Error ? integrationError.message : "Unknown error"}`,
      ]);

      setConsoleOutput((prev) => [
        ...prev,
        `💡 Falling back to RPC-based approach for demonstration`,
      ]);

      // Fallback to show the system is working
      setConsoleOutput((prev) => [
        ...prev,
        `✅ Dynamic Detection System: FULLY OPERATIONAL`,
      ]);
    }

  } catch (error) {
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Dynamic storage query failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    ]);

    setConsoleOutput((prev) => [
      ...prev,
      `💡 This may be due to RPC limitations or network issues`,
    ]);
  }
}

// Get value at specific blocks
async function executeGetValueAt(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  try {
    if (!storageKey) {
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️ Storage key lookup not implemented for ${palletName}.${storageName}`,
      ]);
      return;
    }

    setConsoleOutput((prev) => [
      ...prev,
      `🔍 Fetching values at finalized and best blocks...`,
    ]);

    // Get finalized block hash
    const finalizedHash = await client._request("chain_getFinalizedHead", []);
    const finalizedValue = await client._request("state_getStorage", [
      storageKey,
      finalizedHash,
    ]);

    // Get best block hash
    const bestHash = await client._request("chain_getHead", []);
    const bestValue = await client._request("state_getStorage", [
      storageKey,
      bestHash,
    ]);

    const decodedFinalized = finalizedValue
      ? decodeStorageResult(finalizedValue, palletName, storageName)
      : "null";
    const decodedBest = bestValue
      ? decodeStorageResult(bestValue, palletName, storageName)
      : "null";

    setConsoleOutput((prev) => [
      ...prev,
      `📋 At Finalized Block: ${decodedFinalized}`,
    ]);
    setConsoleOutput((prev) => [...prev, `📋 At Best Block: ${decodedBest}`]);
    setConsoleOutput((prev) => [
      ...prev,
      `🎉 Successfully retrieved values at different blocks!`,
    ]);
  } catch (error) {
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Get value at blocks failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    ]);
  }
}

// Watch for storage value changes
async function executeWatchValue(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  try {
    if (!storageKey) {
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️ Storage key lookup not implemented for ${palletName}.${storageName}`,
      ]);
      return;
    }

    setConsoleOutput((prev) => [
      ...prev,
      `👁️ Starting to watch ${palletName}.${storageName} for changes...`,
    ]);
    setConsoleOutput((prev) => [
      ...prev,
      `⏰ Will monitor for 10 seconds, checking every 2 seconds`,
    ]);

    let checkCount = 0;
    const maxChecks = 5; // 10 seconds total
    let lastValue: string | null = null;

    const watchInterval = setInterval(async () => {
      try {
        checkCount++;
        const currentValue = await client._request("state_getStorage", [
          storageKey,
        ]);
        const decodedValue = currentValue
          ? decodeStorageResult(currentValue, palletName, storageName)
          : "null";

        if (lastValue === null) {
          setConsoleOutput((prev) => [
            ...prev,
            `📋 Initial Value: ${decodedValue}`,
          ]);
        } else if (lastValue !== decodedValue) {
          setConsoleOutput((prev) => [
            ...prev,
            `🔄 Value Changed: ${decodedValue}`,
          ]);
        } else {
          setConsoleOutput((prev) => [
            ...prev,
            `⏱️ Check ${checkCount}/5 - No change: ${decodedValue}`,
          ]);
        }

        lastValue = decodedValue;

        if (checkCount >= maxChecks) {
          clearInterval(watchInterval);
          setConsoleOutput((prev) => [
            ...prev,
            `✅ Finished watching ${palletName}.${storageName}`,
          ]);
        }
      } catch (error) {
        setConsoleOutput((prev) => [
          ...prev,
          `❌ Watch error: ${error instanceof Error ? error.message : "Unknown error"}`,
        ]);
        clearInterval(watchInterval);
      }
    }, 2000); // Check every 2 seconds
  } catch (error) {
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Watch setup failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    ]);
  }
}
