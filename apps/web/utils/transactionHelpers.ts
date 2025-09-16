/**
 * Transaction execution helper functions
 */

import {
  PalletCall,
  executeTransactionWithSteps,
  type TransactionStep,
} from "@workspace/core";
import { getDescriptorName } from "./chainConfig";
import type { StorageParams } from "../types/forms";
import {
  detectStorageParameters,
  generateStorageParamValues,
  formatStorageResult as formatStorageResultHelper,
  decodeStorageResult,
} from "./storageHelpers";
import { createCleanLogger, QueryResult } from "./cleanLogger";
import { getDescriptorForChain } from "@workspace/core/descriptors";

// Observable subscriptions storage for watch functionality
let activeWatchSubscriptions = new Map<string, any>();

// Execute a single transaction with real blockchain interaction
export async function executeRealTransaction(
  selectedCall: { pallet: string; call: PalletCall },
  formData: Record<string, any>,
  chainKey: string,
  client: any,
  setConsoleOutput: React.Dispatch<React.SetStateAction<any[]>>,
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
  setConsoleOutput: React.Dispatch<React.SetStateAction<any[]>>,
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
  setConsoleOutput: React.Dispatch<React.SetStateAction<any[]>>,
  addResultDisplay?: (result: QueryResult) => void,
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
  setConsoleOutput: React.Dispatch<React.SetStateAction<any[]>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  addResultDisplay?: (result: QueryResult) => void,
): Promise<{ watchKey: string; isWatching: boolean } | undefined> {
  const logger = createCleanLogger(setConsoleOutput);
  const { pallet, storage } = selectedStorage;

  try {
    logger.startQuery(pallet, storage.name, queryType);

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

    // Debug logging for parameter detection
    logger.info(`🔍 Storage ${palletName}.${storageName} analysis:`);
    logger.info(`  Required params: ${requiredParams ? requiredParams.join(', ') : 'none'}`);
    logger.info(`  Provided params: ${JSON.stringify(storageParams)}`);
    logger.info(`  Has params: ${hasParams}`);


    // Generate parameter values if needed
    const paramValues =
      hasParams && requiredParams
        ? generateStorageParamValues(storageParams, requiredParams)
        : [];

    // Note: For modern PAPI, we use typed API approach instead of legacy client.query
    // This supports all chain pallets including Assets on AssetHub chains

    // Always log parameters for debugging
    if (requiredParams && requiredParams.length > 0) {
      logger.info(`Parameters required: ${requiredParams.join(', ')}`);
      if (hasParams && paramValues.length > 0) {
        const serializedParams = JSON.stringify(paramValues, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
        logger.info(`Parameters provided: ${serializedParams}`);
      } else {
        logger.info(`⚠️ Parameters required but none provided: ${JSON.stringify(storageParams)}`);
      }
    }

    // Use modern PAPI typed API approach for all queries
    const rawResult = await executeRawStorageQuery(
      selectedStorage,
      queryType,
      storageParams,
      chainKey,
      client,
      logger,
    );
    // Return watch result if it's a watchValue operation
    if (queryType === 'watchValue' && rawResult) {
      return rawResult;
    }

    // For non-watchValue operations, return undefined
    return undefined;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.queryError(pallet, storage.name, queryType, errorMessage);

    // Return failed state for watchValue operations
    if (queryType === 'watchValue') {
      return { watchKey: '', isWatching: false };
    }
    return undefined;
  } finally {
    setIsRunning(false);
  }
}

// Execute getValue query
async function executeGetValue(
  storageQuery: any,
  paramValues: any[],
  logger: any,
  hasParams: boolean,
  pallet: string,
  storageName: string,
  queryType: string,
) {
  try {
    const result = hasParams
      ? await storageQuery(...paramValues)
      : await storageQuery();

    // Enhanced logging for account balances
    if (pallet === "System" && storageName === "Account" && result?.data) {
      const free = result.data.free;
      const reserved = result.data.reserved;
      if (typeof free === 'bigint' && typeof reserved === 'bigint') {
        const freeTokens = (Number(free) / 10**10).toFixed(4);
        const reservedTokens = (Number(reserved) / 10**10).toFixed(4);
        const totalTokens = (Number(free + reserved) / 10**10).toFixed(4);
        logger.info(`💰 Native token balance (System.Account):`);
        logger.info(`  Free: ${free} planck (${freeTokens} tokens)`);
        logger.info(`  Reserved: ${reserved} planck (${reservedTokens} tokens)`);
        logger.info(`  Total: ${free + reserved} planck (${totalTokens} tokens)`);
        logger.info(`💡 For asset tokens, query Assets.Account with asset ID`);
      }
    }

    logger.querySuccess(pallet, storageName, queryType, result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.queryError(pallet, storageName, queryType, `Get value failed: ${errorMessage}`);
  }
}

// Execute raw storage query using modern PAPI typed API
async function executeRawStorageQuery(
  selectedStorage: { pallet: string; storage: any },
  queryType: string,
  storageParams: Record<string, any>,
  chainKey: string,
  client: any,
  logger: any,
): Promise<{ watchKey: string; isWatching: boolean } | undefined> {
  const palletName = selectedStorage.pallet;
  const storageName = selectedStorage.storage.name;

  try {
    // Try to get runtime metadata to understand the storage structure
    if (client._request && typeof client._request === "function") {

      // Execute basic query based on type
      switch (queryType) {
        case "getValue":
          await executeRawGetValue(
            client,
            palletName,
            storageName,
            chainKey,
            logger,
            storageParams,
          );
          break;
        case "getValueAt":
          await executeGetValueAt(
            client,
            undefined,
            palletName,
            storageName,
            logger,
          );
          break;
        case "watchValue":
          const watchResult = await executeWatchValue(
            client,
            undefined,
            palletName,
            storageName,
            logger,
            chainKey,
          );
          return watchResult; // Return watch state for UI
        default:
          await executeRawGetValue(
            client,
            palletName,
            storageName,
            chainKey,
            logger,
            storageParams,
          );
      }
    } else {
      logger.error("Client does not support raw queries");
    }

    // For non-watchValue operations, return undefined
    return undefined;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error(`Raw storage query failed: ${errorMessage}`);

    // Return failed state for watchValue operations
    if (queryType === 'watchValue') {
      return { watchKey: '', isWatching: false };
    }
    return undefined;
  }
}

// Execute raw getValue using dynamic storage approach
async function executeRawGetValue(
  client: any,
  palletName: string,
  storageName: string,
  chainKey: string,
  logger: any,
  storageParams: StorageParams = {},
) {
  try {
    // Detect storage parameters for this specific query
    const requiredParams = detectStorageParameters(palletName, storageName, chainKey);

    if (requiredParams.length > 0) {
      logger.info(`Parameters required: ${requiredParams.join(', ')}`);
    }

    // Now attempt the proper PAPI integration
    try {
      // Get the correct descriptor based on chain
      const descriptors = (window as any).papiDescriptors || {};
      const descriptorName = getDescriptorName(chainKey);

      // Check if descriptor is available for this chain
      if (!descriptorName) {
        logger.error(`Chain '${chainKey}' not supported for typed queries`);
        return;
      }

      if (!descriptors[descriptorName]) {

        // Get the descriptor using the helper function
        const descriptor = getDescriptorForChain(chainKey);

        const typedApi = client.getTypedApi(descriptor);
        const palletQueries = typedApi.query[palletName];

        if (palletQueries && palletQueries[storageName]) {
          const storageFunction = palletQueries[storageName];

          // Execute the actual storage query - handle both direct function and object cases
          let result;

          // Generate parameter values from actual form data
          const paramValues = requiredParams.length > 0
            ? generateStorageParamValues(storageParams, requiredParams)
            : [];


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

          // Handle result display
          logger.querySuccess(palletName, storageName, 'getValue', result);

        } else {
          logger.error(`Storage ${palletName}.${storageName} not found`);
        }

      }

    } catch (integrationError) {
      const errorMessage = integrationError instanceof Error ? integrationError.message : "Unknown error";
      logger.queryError(palletName, storageName, 'getValue', errorMessage);
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.queryError(palletName, storageName, 'getValue', errorMessage);
  }
}

// Get value at specific blocks
async function executeGetValueAt(
  client: any,
  storageKey: string | undefined,
  palletName: string,
  storageName: string,
  logger: any,
) {
  try {
    if (!storageKey) {
      logger.warning(`Storage key lookup not implemented for ${palletName}.${storageName}`);
      return;
    }

    logger.info('Fetching values at finalized and best blocks');

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

    logger.result('At Finalized Block', decodedFinalized);
    logger.result('At Best Block', decodedBest);
    logger.success('Successfully retrieved values at different blocks');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error(`Get value at blocks failed: ${errorMessage}`);
  }
}

// Watch for storage value changes using modern PAPI architecture with manual control
async function executeWatchValue(
  client: any,
  storageKey: string | undefined, // Legacy parameter, now unused
  palletName: string,
  storageName: string,
  logger: any,
  chainKey: string,
) {
  try {
    const watchKey = `${chainKey}-${palletName}-${storageName}`;

    // Check if already watching
    if (activeWatchSubscriptions.has(watchKey)) {
      logger.info(`Already watching ${palletName}.${storageName}. Click Stop to end current watch.`);
      return { watchKey, isWatching: true };
    }

    // Get the appropriate descriptor for the current chain
    let descriptor: any;
    try {
      descriptor = getDescriptorForChain(chainKey);
    } catch (importError) {
      logger.error(`Failed to get descriptor for ${chainKey}: ${importError}`);
      return { watchKey, isWatching: false };
    }

    // Create typed API with the proper descriptor
    const typedApi = client.getTypedApi(descriptor);
    const storageQuery = typedApi.query?.[palletName]?.[storageName];

    if (storageQuery && typeof storageQuery.watchValue === 'function') {
      logger.info(`🔴 Starting continuous watch for ${palletName}.${storageName}`);
      logger.info('📡 Using PAPI observable - will log every value change');
      logger.info('🛑 Click "Stop Watching" button to end');

      let valueCount = 0;
      let subscription: any = null;

      try {
        // Use PAPI's reactive watchValue with proper Observable handling
        subscription = storageQuery.watchValue().subscribe({
          next: (value: any) => {
            valueCount++;
            const formattedValue = formatPapiStorageResult(value);
            const timestamp = new Date().toLocaleTimeString();

            if (valueCount === 1) {
              // Pass raw value to logger.result so it can detect large arrays
              logger.result('Initial Value', value);
            } else {
              // For subsequent updates, also use logger.result for array copy functionality
              logger.result(`Update #${valueCount} [${timestamp}]`, value);
            }
          },
          error: (error: any) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            logger.error(`Observable error: ${errorMessage}`);
            activeWatchSubscriptions.delete(watchKey);
          },
          complete: () => {
            logger.info('Observable completed');
            activeWatchSubscriptions.delete(watchKey);
          }
        });

        // Store subscription for manual control
        activeWatchSubscriptions.set(watchKey, {
          subscription,
          palletName,
          storageName,
          valueCount,
          startTime: Date.now()
        });

        return { watchKey, isWatching: true };

      } catch (subscriptionError) {
        const errorMessage = subscriptionError instanceof Error ? subscriptionError.message : "Unknown error";
        logger.error(`Failed to create subscription: ${errorMessage}`);
        return { watchKey, isWatching: false };
      }
    } else {
      logger.error(`watchValue not available for ${palletName}.${storageName}`);
      return { watchKey, isWatching: false };
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error(`Watch value setup failed: ${errorMessage}`);
    return { watchKey: '', isWatching: false };
  }
}

// Stop watching a specific storage value
export function stopWatchValue(watchKey: string, logger: any): boolean {
  const watchData = activeWatchSubscriptions.get(watchKey);

  if (watchData) {
    const { subscription, palletName, storageName, valueCount, startTime } = watchData;
    const duration = Math.round((Date.now() - startTime) / 1000);

    subscription.unsubscribe();
    activeWatchSubscriptions.delete(watchKey);

    logger.success(`🛑 Stopped watching ${palletName}.${storageName}`);
    logger.info(`📊 Watched for ${duration}s, received ${valueCount} updates`);

    return true;
  }

  return false;
}

// Check if currently watching
export function isWatching(watchKey: string): boolean {
  return activeWatchSubscriptions.has(watchKey);
}

// Get all active watches
export function getActiveWatches(): string[] {
  return Array.from(activeWatchSubscriptions.keys());
}

// Helper function to format storage results consistently for PAPI
function formatPapiStorageResult(value: any): string {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    // Option 1: Always show summary for large arrays (current behavior)
    if (value.length > 5) {
      return `[Array with ${value.length} items]`;
    }

    // Option 2: Show first few items + summary (you can uncomment this)
    // if (value.length > 5) {
    //   try {
    //     const preview = value.slice(0, 2);
    //     const previewStr = JSON.stringify(preview, (_, val) =>
    //       typeof val === 'bigint' ? val.toString() : val
    //     );
    //     return `${previewStr.slice(0, -1)}, ... +${value.length - 2} more items]`;
    //   } catch {
    //     return `[Array with ${value.length} items]`;
    //   }
    // }

    try {
      return JSON.stringify(value, (_, val) =>
        typeof val === 'bigint' ? val.toString() : val
      );
    } catch {
      return `[Array with ${value.length} items]`;
    }
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, (_, val) =>
        typeof val === 'bigint' ? val.toString() : val, 2
      );
    } catch {
      return '[Complex Object]';
    }
  }

  return String(value);
}
