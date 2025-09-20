/**
 * Call/Transaction helper functions for parameter detection and formatting
 *
 * Using Dynamic Call Parameter Detection Engine
 */

import { getCallParameterInfo } from './dynamicCallDetection';

export function detectCallParameters(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): string[] {
  // Use the dynamic detector to get call parameters
  const info = getCallParameterInfo(chainKey, palletName, callName);
  // Return required parameters
  return info.required;
}

// Get all parameters (required + optional) for UI display
export function getAllCallParameters(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): { required: string[]; optional: string[] } {
  const info = getCallParameterInfo(chainKey, palletName, callName);

  return {
    required: info.required,
    optional: info.optional
  };
}

export function isCallValid(
  selectedCall: { pallet: string; call: any } | undefined,
  callParams: Record<string, any>,
  chainKey: string = 'polkadot'
): boolean {
  if (!selectedCall) return false;

  // Get required parameters for this call
  const info = getCallParameterInfo(chainKey, selectedCall.pallet, selectedCall.call.name);
  const requiredParams = info.required;

  // Check if all required parameters are provided
  for (const paramType of requiredParams) {
    const value = callParams[paramType.toLowerCase()] ||
                   callParams[paramType] ||
                   callParams["accountid"] ||
                   callParams["balance"] ||
                   callParams["param"];

    if (!value || value === '') {
      return false;
    }
  }

  return true;
}

export function generateCallParams(
  callParams: Record<string, any>,
  requiredParams: string[],
): string {
  const params = requiredParams.map((paramType) => {
    const value =
      callParams[paramType.toLowerCase()] ||
      callParams[paramType] ||
      callParams["accountid"] ||
      callParams["balance"] ||
      callParams["assetid"] ||
      callParams["hash"] ||
      callParams["param"] ||
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
    } else if (paramType === "Balance") {
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
  requiredParams: string[],
): any[] {
  return requiredParams.map((paramType) => {
    const paramValue =
      callParams[paramType.toLowerCase()] ||
      callParams[paramType] ||
      callParams["accountid"] ||
      callParams["balance"] ||
      callParams["assetid"] ||
      callParams["hash"] ||
      callParams["param"] ||
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
    } else if (paramType === "Balance") {
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

export function getCallDescription(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): string {
  try {
    const info = getCallParameterInfo(chainKey, palletName, callName);
    return info.description || `Call ${palletName}.${callName}`;
  } catch (error) {
    return `Call ${palletName}.${callName}`;
  }
}

export function getCallReturnType(
  palletName: string,
  callName: string,
  chainKey: string = 'polkadot'
): string {
  try {
    const info = getCallParameterInfo(chainKey, palletName, callName);
    return info.returnType || 'void';
  } catch (error) {
    return 'void';
  }
}