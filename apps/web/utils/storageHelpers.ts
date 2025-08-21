/**
 * Storage query helper functions for parameter detection and formatting
 *
 * Now using Dynamic Storage Parameter Detection Engine
 */

import { getStorageParameterInfo } from './dynamicStorageDetection';

export function detectStorageParameters(
  palletName: string,
  storageName: string,
  chainKey: string = 'polkadot'
): string[] {
  // Use the dynamic detector instead of hard-coded mappings
  const info = getStorageParameterInfo(chainKey, palletName, storageName);
  // Return required parameters only (should be empty for most storage maps now)
  return info.required;
}

// New function to get all parameters (required + optional) for UI display
export function getAllStorageParameters(
  palletName: string,
  storageName: string,
  chainKey: string = 'polkadot'
): { required: string[]; optional: string[] } {
  const info = getStorageParameterInfo(chainKey, palletName, storageName);

  // UNIVERSAL OPTIONAL PARAMETER POLICY
  // ALL storage map parameters are treated as optional for UI flexibility
  // This enables both getValue(params) and getEntries() patterns
  const allDetectedParams = [...info.required, ...info.optional];

  return {
    required: [], // Force empty - all storage parameters are optional for UI
    optional: allDetectedParams // Move all parameters to optional
  };
}

export function isStorageQueryValid(
  selectedStorage: { pallet: string; storage: any } | undefined,
  storageParams: Record<string, any>,
  chainKey: string = 'polkadot'
): boolean {
  if (!selectedStorage) return false;

  // ALWAYS RETURN TRUE - ALL STORAGE PARAMETERS ARE OPTIONAL FOR UI FLEXIBILITY
  // This allows both:
  // 1. Queries with parameters: getValue(param1, param2) -> specific entry
  // 2. Queries without parameters: getEntries() -> all entries
  //
  // The form validation (useStorageValidation) handles parameter validation
  // This function only checks if a storage item is selected

  return true;
}

export function generateStorageParams(
  storageParams: Record<string, any>,
  requiredParams: string[],
): string {
  const params = requiredParams.map((paramType) => {
    const value =
      storageParams[paramType.toLowerCase()] ||
      storageParams[paramType] ||
      storageParams["ss58string"] ||
      storageParams["accountid"] ||
      storageParams["key"] ||
      storageParams["param"] ||
      "";

    // Handle different parameter types
    if (paramType === "AccountId" || paramType === "SS58String") {
      if (typeof value === "string" && value.startsWith("//")) {
        const accountMap: Record<string, string> = {
          "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
          "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
        };
        return `"${accountMap[value] || accountMap["//Alice"]}"`;
      }
      return `"${value}"`;
    } else if (paramType.includes("Number") || paramType.includes("Index")) {
      return String(parseInt(value || "0"));
    } else if (paramType === "Hash") {
      return `"${value || "0x0000000000000000000000000000000000000000000000000000000000000000"}"`;
    } else if (paramType === "bytes") {
      // Handle bytes parameters - ensure they're properly formatted as hex
      const cleanValue = value || "";
      const hexValue = cleanValue.startsWith("0x") ? cleanValue : `0x${cleanValue}`;
      return `"${hexValue}"`;
    }

    return `"${value}"`;
  });

  return params.join(", ");
}

export function generateStorageParamValues(
  storageParams: Record<string, any>,
  requiredParams: string[],
): any[] {
  return requiredParams.map((paramType) => {
    const paramValue =
      storageParams[paramType.toLowerCase()] ||
      storageParams[paramType] ||
      storageParams["ss58string"] ||
      storageParams["accountid"] ||
      storageParams["key"] ||
      storageParams["param"] ||
      "";

    // Handle different parameter types
    if ((paramType === "AccountId" || paramType === "SS58String") && typeof paramValue === "string") {
      if (paramValue.startsWith("//")) {
        // Convert test accounts to actual addresses
        const accountMap: Record<string, string> = {
          "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
          "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
        };
        return accountMap[paramValue] || accountMap["//Alice"];
      }
      return paramValue;
    } else if (paramType.includes("Number") || paramType.includes("Index")) {
      return parseInt(paramValue || "0");
    } else if (paramType === "Hash") {
      return (
        paramValue ||
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    }

    return paramValue;
  });
}

export function formatStorageResult(result: any): string {
  if (result === null || result === undefined) {
    return "null";
  }

  if (typeof result === "bigint") {
    // For DOT amounts, also show converted value
    if (result > 1000000000n) {
      const dotValue = (Number(result) / 10000000000).toFixed(4);
      return `${result.toString()} planck (${dotValue} DOT)`;
    }
    return `${result.toString()} (BigInt)`;
  }

  if (result instanceof Uint8Array) {
    return `[Uint8Array: ${result.length} bytes] 0x${Array.from(result)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  if (typeof result === "object") {
    try {
      return JSON.stringify(
        result,
        (key, value) => {
          if (typeof value === "bigint") {
            return value.toString() + "n";
          }
          if (value instanceof Uint8Array) {
            return `[Uint8Array: ${value.length} bytes]`;
          }
          return value;
        },
        2,
      );
    } catch (e) {
      return `[Object: ${result.constructor?.name || "Unknown"}]`;
    }
  }

  return String(result);
}

export function decodeStorageResult(
  hexResult: string,
  palletName: string,
  storageName: string,
): string {
  try {
    // Remove 0x prefix if present
    const hexValue = hexResult.startsWith("0x")
      ? hexResult.slice(2)
      : hexResult;

    // Special case for known storage types
    if (palletName === "Balances" && storageName === "TotalIssuance") {
      // Decode as u128 (16 bytes, little endian)
      const bytes =
        hexValue
          .slice(0, 32)
          .match(/.{1,2}/g)
          ?.reverse()
          .join("") || "0";
      const totalIssuance = BigInt("0x" + bytes);
      const dotAmount = (Number(totalIssuance) / 10000000000).toFixed(4);
      return `${totalIssuance.toString()} planck (${dotAmount} DOT)`;
    }

    if (palletName === "System" && storageName === "Number") {
      // Decode as u32 (4 bytes, little endian)
      const bytes =
        hexValue
          .slice(0, 8)
          .match(/.{1,2}/g)
          ?.reverse()
          .join("") || "0";
      const blockNumber = parseInt(bytes, 16);
      return `Block #${blockNumber}`;
    }

    if (palletName === "Timestamp" && storageName === "Now") {
      // Decode as u64 timestamp (8 bytes, little endian)
      const bytes =
        hexValue
          .slice(0, 16)
          .match(/.{1,2}/g)
          ?.reverse()
          .join("") || "0";
      const timestamp = parseInt(bytes, 16);
      const date = new Date(timestamp);
      return `${timestamp} ms (${date.toISOString()})`;
    }

    // Generic hex display for unknown types
    return `0x${hexValue} (${hexValue.length / 2} bytes)`;
  } catch (error) {
    return `Raw: ${hexResult} (decode failed: ${error instanceof Error ? error.message : "unknown"})`;
  }
}
