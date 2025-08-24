/**
 * Call/Transaction helper functions for parameter detection and formatting
 *
 * Updated to use new POC-based metadata approach
 */

import { getCallParameterInfo, getAllCallParameters as getParametersFromDetection, isCallValid as isCallValidNew, type CallParameterInfo } from './callParameterDetection'
import type { ParameterInfo } from './metadataAnalyzer'

export async function detectCallParameters(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): Promise<string[]> {
  try {
    // Use the new detector to get call parameters
    const info = await getCallParameterInfo(chainKey, palletName, callName);
    // Return required parameter names for backward compatibility
    return info.required.map(p => p.name);
  } catch (error) {
    console.error(`Failed to detect parameters for ${chainKey}.${palletName}.${callName}:`, error);
    throw error; // Re-throw to ensure caller knows about the failure
  }
}

// Get all parameters (required + optional) for UI display
export async function getAllCallParameters(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): Promise<{ required: ParameterInfo[]; optional: ParameterInfo[] }> {
  try {
    const paramInfo = await getParametersFromDetection(chainKey, palletName, callName);
    return paramInfo;
  } catch (error) {
    console.error(`Failed to get all parameters for ${chainKey}.${palletName}.${callName}:`, error);
    throw error;
  }
}


export async function isCallValid(
  selectedCall: { pallet: string; call: any } | undefined,
  callParams: Record<string, any>,
  chainKey: string = 'polkadot'
): Promise<boolean> {
  if (!selectedCall) return false;

  try {
    return await isCallValidNew(chainKey, selectedCall.pallet, selectedCall.call.name, callParams);
  } catch (error) {
    console.error(`Failed to validate call ${chainKey}.${selectedCall.pallet}.${selectedCall.call.name}:`, error);
    return false;
  }
}

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
    if (paramType.includes("AccountId") || paramType === "SS58String" ||
        (paramType.startsWith("Enum(") && paramType.includes("Id|"))) {
      if (typeof value === "string" && value.startsWith("//")) {
        const accountMap: Record<string, string> = {
          "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
          "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
        };
        return `"${accountMap[value] || accountMap["//Alice"]}"`;
      }
      return `"${value}"`;
    } else if (paramType === "Balance" || paramType.startsWith("Compact<")) {
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
      }
      return `[]`;
    }

    return `"${value}"`;
  });

  return params.join(", ");
}

export function generateCallParamValues(
  callParams: Record<string, any>,
  requiredParams: ParameterInfo[],
): any[] {
  return requiredParams.map((param) => {
    const paramType = param.type;
    const paramName = param.name;
    const paramValue = callParams[paramName] || callParams[paramName.toLowerCase()] || "";

    // Handle different parameter types based on the new metadata type format
    if ((paramType.includes("AccountId") || paramType === "SS58String" ||
         (paramType.startsWith("Enum(") && paramType.includes("Id|"))) && typeof paramValue === "string") {
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
    } else if ((paramType === "MultiAddress" || paramType.startsWith("Enum(")) && typeof paramValue === "string") {
      // Handle MultiAddress format for PAPI - return as string, PAPI will encode it
      if (paramValue.startsWith("//")) {
        const accountMap: Record<string, string> = {
          "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
          "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
        };
        return accountMap[paramValue] || accountMap["//Alice"];
      }
      return paramValue;
    } else if (paramType === "Balance" || paramType.startsWith("Compact<")) {
      // Handle balance amounts - convert to planck if needed
      const balanceValue = parseFloat(paramValue || "0");
      if (balanceValue > 0 && balanceValue < 1000) {
        // Assume it's in tokens, convert to planck (multiply by 10^10 for DOT/KSM)
        const planckValue = Math.floor(balanceValue * 10**10);
        return BigInt(planckValue);
      }
      return BigInt(paramValue || "0");
    } else if (paramType === "AssetId") {
      return parseInt(paramValue || "0");
    } else if (paramType.includes("Number") || paramType.includes("Index") || paramType === "u32" || paramType === "u64") {
      return parseInt(paramValue || "0");
    } else if (paramType === "Hash") {
      return (
        paramValue ||
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    } else if (paramType === "bytes") {
      const cleanValue = paramValue || "";
      return cleanValue.startsWith("0x") ? cleanValue : `0x${cleanValue}`;
    } else if (paramType.startsWith("Vec<")) {
      if (Array.isArray(paramValue)) {
        return paramValue;
      }
      // Try to parse as JSON array
      try {
        return JSON.parse(paramValue || "[]");
      } catch {
        return [];
      }
    }

    return paramValue;
  });
}

export function formatTransactionResult(result: any): string {
  if (result === null || result === undefined) {
    return "null";
  }

  if (typeof result === "object" && result.hash) {
    return `Transaction Hash: ${result.hash}`;
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

export async function getCallDescription(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): Promise<string> {
  try {
    const info = await getCallParameterInfo(chainKey, palletName, callName);
    return info.description || `Call ${palletName}.${callName}`;
  } catch (error) {
    console.warn(`Failed to get description for ${chainKey}.${palletName}.${callName}:`, error);
    return `Call ${palletName}.${callName}`;
  }
}

export async function getCallReturnType(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): Promise<string> {
  try {
    // Return type detection is not implemented yet in the current system
    // Most extrinsics return dispatch results
    return 'DispatchResult';
  } catch (error) {
    console.warn(`Failed to get return type for ${chainKey}.${palletName}.${callName}:`, error);
    return 'DispatchResult';
  }
}