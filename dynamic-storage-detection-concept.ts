// Concept: Dynamic storage parameter detection from descriptors
// This shows how we could eliminate the hard-coded storage parameters

import type { StorageDescriptor } from "polkadot-api";

/**
 * Dynamically detect storage parameters from the actual descriptor metadata
 * This eliminates the need for hard-coded parameter lists
 */
function detectStorageParametersDynamic(
  descriptor: any, // The chain descriptor (polkadot, kusama, etc.)
  palletName: string,
  storageName: string
): string[] {
  try {
    // Access the storage descriptor from the chain metadata
    const storageDescriptor = descriptor.query[palletName]?.[storageName];

    if (!storageDescriptor) {
      console.warn(`Storage ${palletName}.${storageName} not found in descriptor`);
      return [];
    }

    // The descriptor contains type information about required parameters
    // StorageDescriptor<[Key1, Key2], ReturnType, Optional, Default>
    // If the first type parameter is empty [], no parameters required
    // If it contains types like [SS58String], those are the required parameters

    // This would need to be implemented using PAPI's type introspection
    // The exact implementation depends on how PAPI exposes type metadata
    const parameterTypes = extractParameterTypesFromDescriptor(storageDescriptor);

    return parameterTypes;
  } catch (error) {
    console.error(`Error detecting parameters for ${palletName}.${storageName}:`, error);
    return [];
  }
}

/**
 * Extract parameter type information from storage descriptor
 * This would use PAPI's built-in type introspection capabilities
 */
function extractParameterTypesFromDescriptor(storageDescriptor: any): string[] {
  // Implementation would depend on PAPI's internal structure
  // Ideally PAPI would provide a helper method for this

  // Conceptual approach:
  // 1. Check if storage descriptor has parameter metadata
  // 2. Extract the required parameter types
  // 3. Map types to user-friendly names (SS58String -> "AccountId", etc.)

  return []; // Placeholder
}

/**
 * Usage example - this would replace the hard-coded detectStorageParameters
 */
function improvedStorageQueryValidation(
  chainDescriptor: any,
  selectedStorage: { pallet: string; storage: any },
  storageParams: Record<string, any>
): boolean {
  const requiredParams = detectStorageParametersDynamic(
    chainDescriptor,
    selectedStorage.pallet,
    selectedStorage.storage.name
  );

  // Same validation logic as before, but using dynamic parameters
  if (requiredParams.length === 0) return true;

  for (const paramType of requiredParams) {
    const paramValue = storageParams[paramType.toLowerCase()] ||
                     storageParams[paramType] ||
                     storageParams["key"];

    if (!paramValue || paramValue.toString().trim() === "") {
      return false;
    }
  }

  return true;
}

/**
 * Benefits of dynamic approach:
 *
 * 1. ✅ Automatic support for all storage items
 * 2. ✅ Chain-specific storage differences handled automatically
 * 3. ✅ Runtime upgrades automatically supported
 * 4. ✅ No manual maintenance required
 * 5. ✅ Always up-to-date with actual chain metadata
 */