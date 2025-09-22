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
import { getStorageParameterInfo } from "./dynamicStorageDetection";
import {
  generateStorageParamValues,
  decodeStorageResult,
  generateCallParamValues,
  formatTransactionResult,
  getCallDescription,
} from "./formatting-utils";
import { getAllCallParameters } from "./callParameterDetection";
import type { ParameterInfo } from "./metadataAnalyzer";
import { createCleanLogger, QueryResult } from "./cleanLogger";
import { getDescriptorForChain } from "@workspace/core/descriptors";
import { StorageQueryType } from "../types/enums";

// BigInt serialization helper
function serializeBigInt(value: any): any {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeBigInt);
  }
  if (value && typeof value === 'object') {
    const serialized: any = {};
    for (const [key, val] of Object.entries(value)) {
      serialized[key] = serializeBigInt(val);
    }
    return serialized;
  }
  return value;
}

// Observable subscriptions storage for watch functionality
let activeWatchSubscriptions = new Map<string, any>();

// Helper function to get storage parameters using the new dynamic detection system
function getStorageParameters(chainKey: string, pallet: string, storageName: string): { required: string[], optional: string[] } {
  try {
    // Use the storage parameter detector directly
    const detectedParams = getStorageParameterInfo(chainKey, pallet, storageName);
    const paramInfo = {
      required: detectedParams.required,
      optional: detectedParams.optional || []
    };

    return paramInfo;
  } catch (error) {
    // Fallback that returns empty arrays
    return { required: [], optional: [] };
  }
}

// Helper function to get call parameters using the new dynamic detection system
async function getCallParameters(chainKey: string, pallet: string, callName: string): Promise<{ required: ParameterInfo[], optional: ParameterInfo[] }> {
  try {
    // Use the new getAllCallParameters from callParameterDetection
    const paramInfo = await getAllCallParameters(chainKey, pallet, callName);
    return paramInfo;
  } catch (error) {
    // Fallback that returns empty arrays
    return { required: [], optional: [] };
  }
}

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
    // Get call parameter information using the new detection system
    const paramInfo = await getCallParameters(chainKey, pallet, call.name);
    // Use sync description for now - async descriptions will be handled later
    const description = `Call ${pallet}.${call.name}`;

    setConsoleOutput((prev) => [
      ...prev,
      `🚀 Executing ${pallet}.${call.name} transaction...`,
    ]);

    // Log call information
    if (description !== `Call ${pallet}.${call.name}`) {
      setConsoleOutput((prev) => [...prev, `📝 ${description}`]);
    }

    if (paramInfo.required.length > 0) {
      const paramValues = generateCallParamValues(formData, paramInfo.required);
      const serializedParams = JSON.stringify(paramValues, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      setConsoleOutput((prev) => [...prev, `🔧 Parameters: ${serializedParams}`]);
    }

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
      // Get call parameter information using the new detection system
      const paramInfo = await getCallParameters(chainKey, method.pallet, method.call.name);
      // Use sync description for now - async descriptions will be handled later
      const description = `Call ${method.pallet}.${method.call.name}`;

      // Log call information
      if (description !== `Call ${method.pallet}.${method.call.name}`) {
        setConsoleOutput((prev) => [...prev, `  📝 ${description}`]);
      }

      if (paramInfo.required.length > 0) {
        const paramValues = generateCallParamValues(method.formData, paramInfo.required);
        const serializedParams = JSON.stringify(paramValues, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
        setConsoleOutput((prev) => [...prev, `  🔧 Parameters: ${serializedParams}`]);
      }

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
  queryType: StorageQueryType | string,
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

    // Detect storage parameters using the new dynamic detection system
    const paramInfo = getStorageParameters(chainKey, palletName, storageName);
    const allParams = [...paramInfo.required, ...paramInfo.optional];

    // Check if user has actually provided parameter values (not just empty strings)
    const providedParamKeys = Object.keys(storageParams).filter(key => {
      const value = storageParams[key];
      return value !== undefined && value !== null && value !== '';
    });

    const hasParams = Boolean(allParams.length > 0 && providedParamKeys.length > 0);

    logger.info(`  Provided params: ${JSON.stringify(storageParams)}`);
    logger.info(`  Has params: ${hasParams}`);


    // Generate parameter values only if we actually have parameter data provided
    // For optional parameters, only use them if the user has actually provided values
    const paramValues = hasParams
      ? generateStorageParamValues(storageParams, allParams)
      : [];

    // Note: For modern PAPI, we use typed API approach instead of legacy client.query
    // This supports all chain pallets including Assets on AssetHub chains

    // Log parameter information using new optional system
    if (allParams.length > 0) {
      if (paramInfo.required.length > 0) {
        logger.info(`Parameters required: ${paramInfo.required.join(', ')}`);
      }
      if (paramInfo.optional.length > 0) {
        logger.info(`Parameters optional: ${paramInfo.optional.join(', ')}`);
      }

      if (hasParams && paramValues.length > 0) {
        const serializedParams = JSON.stringify(paramValues, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
        logger.info(`Parameters provided: ${serializedParams}`);
      } else {
        logger.info(`💡 No parameters provided - will query all entries`);
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
    if ((queryType === StorageQueryType.WATCH_VALUE || queryType === 'watchValue' || queryType === 'watchValue') && rawResult) {
      return rawResult;
    }

    // For non-watchValue operations, return undefined
    return undefined;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.queryError(pallet, storage.name, queryType, errorMessage);

    // Return failed state for watchValue operations
    if (queryType === StorageQueryType.WATCH_VALUE || queryType === 'watchValue') {
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


    // Serialize BigInt values before logging
    const serializedResult = serializeBigInt(result);
    logger.querySuccess(pallet, storageName, queryType, serializedResult);
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
        case StorageQueryType.GET_VALUE:
        case 'getValue':
          await executeRawGetValue(
            client,
            palletName,
            storageName,
            chainKey,
            logger,
            storageParams,
          );
          break;
        case StorageQueryType.GET_VALUE_AT:
        case 'getValueAt':
          await executeGetValueAt(
            client,
            undefined,
            palletName,
            storageName,
            logger,
          );
          break;
        case StorageQueryType.WATCH_VALUE:
        case 'watchValue':
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
    if (queryType === StorageQueryType.WATCH_VALUE || queryType === 'watchValue') {
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
    // Detect storage parameters using the new dynamic detection system
    const paramInfo = getStorageParameters(chainKey, palletName, storageName);
    const allParams = [...paramInfo.required, ...paramInfo.optional];

    if (allParams.length > 0) {
      if (paramInfo.required.length > 0) {
        logger.info(`Parameters required: ${paramInfo.required.join(', ')}`);
      }
      if (paramInfo.optional.length > 0) {
        logger.info(`Parameters optional: ${paramInfo.optional.join(', ')}`);
      }
    }

    // Now attempt the proper PAPI integration
    try {
      const descriptorName = getDescriptorName(chainKey);

      // Check if descriptor is available for this chain
      if (!descriptorName) {
        logger.error(`Chain '${chainKey}' not supported for typed queries`);
        return;
      }

      // Get the descriptor using the helper function
      const descriptor = getDescriptorForChain(chainKey);

        const typedApi = client.getTypedApi(descriptor);
        const palletQueries = typedApi.query[palletName];

        if (palletQueries && palletQueries[storageName]) {
          const storageFunction = palletQueries[storageName];

          // Execute the actual storage query - handle both direct function and object cases
          let result;

          // Generate parameter values only if user has actually provided them
          const providedParamKeys = Object.keys(storageParams).filter(key => {
            const value = storageParams[key];
            return value !== undefined && value !== null && value !== '';
          });

          const paramValues = providedParamKeys.length > 0 && allParams.length > 0
            ? generateStorageParamValues(storageParams, allParams)
            : [];

          // Determine query strategy: simple values vs storage maps
          const isSimpleValue = allParams.length === 0;
          const hasUserParams = paramValues.length > 0;

          if (typeof storageFunction === 'function') {
            result = hasUserParams
              ? await storageFunction(...paramValues)
              : await storageFunction();
          } else if (storageFunction && (storageFunction.getValue || storageFunction.query)) {
            const queryMethod = storageFunction.getValue || storageFunction.query;

            if (isSimpleValue) {
              result = await queryMethod();
            } else {
              result = hasUserParams
                ? await queryMethod(...paramValues)
                : await storageFunction.getEntries();
            }
          } else {
            throw new Error(`Storage item ${palletName}.${storageName} is not callable: ${typeof storageFunction}`);
          }

          const methodUsed = isSimpleValue
            ? 'getValue'
            : (hasUserParams ? 'getValue' : 'getEntries');

          // Serialize BigInt values before logging
          const serializedResult = serializeBigInt(result);
          logger.querySuccess(palletName, storageName, methodUsed, serializedResult);

        } else {
          logger.error(`Storage ${palletName}.${storageName} not found`);
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
  storageKey: string | undefined,
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
              // Serialize BigInt values before logging
              const serializedValue = serializeBigInt(value);
              logger.result('Initial Value', serializedValue);
            } else {
              // Serialize BigInt values before logging
              const serializedValue = serializeBigInt(value);
              logger.result(`Update #${valueCount} [${timestamp}]`, serializedValue);
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
