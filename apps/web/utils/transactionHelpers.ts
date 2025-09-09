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

    // Detect if this storage requires parameters
    const requiredParams = detectStorageParameters(palletName, storageName);
    const hasParams = Boolean(
      requiredParams && Object.keys(storageParams).length > 0,
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
        setConsoleOutput((prev) => [
          ...prev,
          `📝 Parameters: ${JSON.stringify(paramValues)}`,
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

// Execute raw getValue
async function executeRawGetValue(
  client: any,
  palletName: string,
  storageName: string,
  setConsoleOutput: React.Dispatch<React.SetStateAction<string[]>>,
) {
  try {
    // Get storage key using well-known storage keys
    const knownStorageKeys: Record<string, string> = {
      "System.Number":
        "0x26aa394eea5630e07c48ae0c9558cef702a5c1b19ab7a04f536c519aca4983ac",
      "Balances.TotalIssuance":
        "0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80",
      "Timestamp.Now":
        "0xf0c365c3cf59d671eb72da0e7a4113c49f1f0515f462cdcf84e0f1d6045dfcbb",
    };

    const storageKey = knownStorageKeys[`${palletName}.${storageName}`];

    if (!storageKey) {
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️ Storage key not known for ${palletName}.${storageName}`,
      ]);
      setConsoleOutput((prev) => [
        ...prev,
        `💡 This storage would require dynamic key generation in a full implementation`,
      ]);
      return;
    }

    const result = await client._request("state_getStorage", [storageKey]);

    if (result) {
      const decodedValue = decodeStorageResult(result, palletName, storageName);
      setConsoleOutput((prev) => [
        ...prev,
        `📋 Current Value: ${decodedValue}`,
      ]);
      setConsoleOutput((prev) => [
        ...prev,
        `🎉 Successfully retrieved current storage value!`,
      ]);
    } else {
      setConsoleOutput((prev) => [
        ...prev,
        `⚠️ Storage value is null or not found`,
      ]);
    }
  } catch (error) {
    setConsoleOutput((prev) => [
      ...prev,
      `❌ Get value failed: ${error instanceof Error ? error.message : "Unknown error"}`,
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
