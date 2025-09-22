
import type { ParameterInfo } from './metadataAnalyzer'
import { isAccountType, isBalanceType, isIndexType } from './typeCheckers'

const TEST_ACCOUNTS = {
  "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
} as const;

/**
 * Generate formatted call parameters from raw form data
 */
export function generateCallParams(
  callParams: Record<string, any>,
  requiredParams: ParameterInfo[],
): string {
  const params = requiredParams.map((param) => {
    const paramType = param.type;
    const paramName = param.name;
    const value =
      callParams[paramName] ||
      callParams[paramName.toLowerCase()] ||
      callParams[paramType.toLowerCase()] ||
      "";

    // Handle different parameter types based on the new metadata type format
    if (isAccountType(paramType) || paramType === "SS58String" ||
        (paramType.startsWith("Enum(") && paramType.includes("Id|"))) {
      if (typeof value === "string" && value.startsWith("//")) {
        return `"${TEST_ACCOUNTS[value as keyof typeof TEST_ACCOUNTS] || TEST_ACCOUNTS["//Alice"]}"`;
      }
      return `"${value}"`;
    } else if (isBalanceType(paramType)) {
      // Handle balance amounts - convert to planck if needed
      const balanceValue = parseFloat(value || "0");
      if (balanceValue > 0 && balanceValue < 1000) {
        // Assume it's in tokens, convert to planck (multiply by 10^10 for DOT/KSM)
        const planckValue = Math.floor(balanceValue * 10**10);
        return planckValue.toString();
      }
      return value.toString();
    } else if (paramType === "AssetId") {
      return value.toString();
    } else if (paramType.includes("Number") || paramType.includes("Index") || paramType === "u32" || paramType === "u64") {
      return String(parseInt(value || "0"));
    } else if (paramType === "Hash") {
      return `"${value || "0x0000000000000000000000000000000000000000000000000000000000000000"}"`;
    } else if (paramType === "bytes") {
      // Handle bytes parameters - ensure they're properly formatted as hex
      const cleanValue = value || "";
      const hexValue = cleanValue.startsWith("0x") ? cleanValue : `0x${cleanValue}`;
      return `"${hexValue}"`;
    } else if (paramType.startsWith("Vec<")) {
      // Handle vector types
      if (Array.isArray(value)) {
        return JSON.stringify(value);
      } else if (typeof value === "string" && value.startsWith("[")) {
        try {
          JSON.parse(value); // Validate it's valid JSON
          return value;
        } catch {
          return "[]";
        }
      } else {
        return "[]";
      }
    } else {
      // Default handling - return as string
      return `"${value}"`;
    }
  });

  return `{ ${params.map((param, i) => `${requiredParams[i]?.name || `param${i}`}: ${param}`).join(", ")} }`;
}

/**
 * Generate parameter values for transaction execution
 */
export function generateCallParamValues(
  callParams: Record<string, any>,
  requiredParams: ParameterInfo[],
): Record<string, any> {
  const result: Record<string, any> = {};

  requiredParams.forEach((param) => {
    const paramName = param.name;
    const paramType = param.type;
    let value = callParams[paramName] || callParams[paramName.toLowerCase()] || "";

    // Handle different parameter types for actual values (not string representation)
    if (isAccountType(paramType) || paramType === "SS58String") {
      if (typeof value === "string" && value.startsWith("//")) {
        result[paramName] = TEST_ACCOUNTS[value as keyof typeof TEST_ACCOUNTS] || TEST_ACCOUNTS["//Alice"];
      } else {
        result[paramName] = value || "";
      }
    } else if (isBalanceType(paramType)) {
      // Handle balance amounts
      const balanceValue = parseFloat(value || "0");
      if (balanceValue > 0 && balanceValue < 1000) {
        // Convert to planck
        result[paramName] = Math.floor(balanceValue * 10**10);
      } else {
        result[paramName] = parseInt(value || "0");
      }
    } else if (paramType === "AssetId" || paramType.includes("Number") || paramType.includes("Index") ||
               paramType === "u32" || paramType === "u64") {
      result[paramName] = parseInt(value || "0");
    } else if (paramType === "Hash") {
      result[paramName] = value || "0x0000000000000000000000000000000000000000000000000000000000000000";
    } else if (paramType === "bytes") {
      const cleanValue = value || "";
      result[paramName] = cleanValue.startsWith("0x") ? cleanValue : `0x${cleanValue}`;
    } else if (paramType.startsWith("Vec<")) {
      if (Array.isArray(value)) {
        result[paramName] = value;
      } else if (typeof value === "string" && value.startsWith("[")) {
        try {
          result[paramName] = JSON.parse(value);
        } catch {
          result[paramName] = [];
        }
      } else {
        result[paramName] = [];
      }
    } else {
      result[paramName] = value;
    }
  });

  return result;
}

/**
 * Format transaction execution result for display
 */
export function formatTransactionResult(result: any): string {
  if (!result) {
    return "No result available";
  }

  // Handle different result formats
  if (typeof result === "string") {
    return result;
  }

  if (result.success !== undefined) {
    return result.success
      ? `✅ Success: ${result.message || 'Transaction completed'}`
      : `❌ Failed: ${result.error || 'Transaction failed'}`;
  }

  if (result.status) {
    return `Status: ${result.status}`;
  }

  if (result.hash) {
    return `Transaction Hash: ${result.hash}`;
  }

  // Default JSON representation
  try {
    return JSON.stringify(result, null, 2);
  } catch {
    return String(result);
  }
}

/**
 * Get call description from metadata - simplified version
 */
export async function getCallDescription(
  chainKey: string,
  pallet: string,
  call: string
): Promise<string> {
  // Simplified to avoid metadata access issues
  // This can be enhanced later with proper metadata integration
  return `Call ${pallet}.${call}`;
}

/**
 * Get call return type from metadata - simplified version
 */
export async function getCallReturnType(
  chainKey: string,
  pallet: string,
  call: string
): Promise<string> {
  // Simplified to avoid metadata access issues
  // Most calls return DispatchResult by default
  return 'DispatchResult';
}


/**
 * Generate formatted storage parameters from raw form data
 */
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
        return `"${TEST_ACCOUNTS[value as keyof typeof TEST_ACCOUNTS] || TEST_ACCOUNTS["//Alice"]}"`;
      }
      return `"${value}"`;
    } else if (isIndexType(paramType)) {
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

/**
 * Generate storage parameter values for query execution
 */
export function generateStorageParamValues(
  storageParams: Record<string, any>,
  requiredParams: string[],
): any[] {
  return requiredParams.map((paramType) => {
    const paramValue =
      storageParams[paramType.toLowerCase()] ||
      storageParams[paramType] ||
      "";

    // Handle different parameter types
    if ((paramType === "AccountId" || paramType === "SS58String") && typeof paramValue === "string") {
      if (paramValue.startsWith("//")) {
        return TEST_ACCOUNTS[paramValue as keyof typeof TEST_ACCOUNTS] || TEST_ACCOUNTS["//Alice"];
      }
      return paramValue;
    } else if (isIndexType(paramType)) {
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

/**
 * Format storage query result for display
 */
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

/**
 * Decode storage result from hex for display
 */
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


    // Generic hex display for unknown types
    return `0x${hexValue} (${hexValue.length / 2} bytes)`;
  } catch (error) {
    return `Raw: ${hexResult} (decode failed: ${error instanceof Error ? error.message : "unknown"})`;
  }
}