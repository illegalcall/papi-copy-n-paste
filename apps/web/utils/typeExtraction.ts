/**
 * TypeScript Type Extraction from PAPI Descriptors
 * Client-side type extraction with graceful fallbacks
 */

// Cache for parsed type information
const typeCache = new Map<string, any>();

// Known type mappings from PAPI descriptors (updated when descriptors are available)
const knownTypeMappings: Record<string, Record<string, Record<string, any>>> = {
  polkadot: {
    Balances: {
      Locks: {
        returnType: "Array<BalanceLock>",
        actualType:
          "Array<{ id: FixedSizeBinary<8>; amount: bigint; reasons: BalancesTypesReasons; }>",
        paramTypes: ["SS58String"],
        typeDefinition:
          'Array<{ "id": FixedSizeBinary<8>; "amount": bigint; "reasons": BalancesTypesReasons; }>',
      },
      Account: {
        returnType: "AccountInfo",
        actualType:
          "{ nonce: number; consumers: number; providers: number; sufficients: number; data: AccountData; }",
        paramTypes: ["SS58String"],
        typeDefinition:
          '{ "nonce": number; "consumers": number; "providers": number; "sufficients": number; "data": AccountData; }',
      },
      TotalIssuance: {
        returnType: "bigint",
        actualType: "bigint",
        paramTypes: [],
        typeDefinition: "bigint",
      },
      InactiveIssuance: {
        returnType: "bigint",
        actualType: "bigint",
        paramTypes: [],
        typeDefinition: "bigint",
      },
    },
    System: {
      Number: {
        returnType: "number",
        actualType: "number",
        paramTypes: [],
        typeDefinition: "number",
      },
      Account: {
        returnType: "AccountInfo",
        actualType:
          "{ nonce: number; consumers: number; providers: number; sufficients: number; data: AccountData; }",
        paramTypes: ["SS58String"],
        typeDefinition:
          '{ "nonce": number; "consumers": number; "providers": number; "sufficients": number; "data": AccountData; }',
      },
    },
    Timestamp: {
      Now: {
        returnType: "bigint",
        actualType: "bigint",
        paramTypes: [],
        typeDefinition: "bigint",
      },
    },
  },
};

/**
 * Extract actual TypeScript type information from known mappings
 */
export function extractActualTypes(
  chainKey: string,
  pallet: string,
  storageName: string,
): {
  returnType: string;
  actualType: string;
  paramTypes: string[];
  typeDefinition?: string;
} {
  const cacheKey = `${chainKey}:${pallet}:${storageName}`;

  // Check cache first
  if (typeCache.has(cacheKey)) {
    return typeCache.get(cacheKey)!;
  }

  try {
    // Check known type mappings first
    const chainMappings = knownTypeMappings[chainKey];
    if (
      chainMappings &&
      chainMappings[pallet] &&
      chainMappings[pallet][storageName]
    ) {
      const mapping = chainMappings[pallet][storageName];
      const result = {
        returnType: mapping.returnType,
        actualType: mapping.actualType,
        paramTypes: mapping.paramTypes,
        typeDefinition: mapping.typeDefinition,
      };
      typeCache.set(cacheKey, result);
      return result;
    }

    // Fallback to pattern-based inference
    const fallback = fallbackToInference(pallet, storageName);
    typeCache.set(cacheKey, fallback);
    return fallback;
  } catch (error) {
    console.warn(
      `Failed to extract types for ${chainKey}.${pallet}.${storageName}:`,
      error,
    );
    const fallback = fallbackToInference(pallet, storageName);
    typeCache.set(cacheKey, fallback);
    return fallback;
  }
}

/**
 * Get a human-readable example for a type
 */
export function getTypeExample(
  actualType: string,
  storageName?: string,
): string {
  // Handle array types
  if (actualType.startsWith("Array<{")) {
    const innerMatch = actualType.match(/Array<{([^}]+)}>/s);
    if (innerMatch) {
      const fields = innerMatch[1];
      if (
        fields &&
        fields.includes("id") &&
        fields.includes("amount") &&
        fields.includes("reasons")
      ) {
        // This looks like a balance lock
        return `[
  {
    id: new Uint8Array([115, 116, 97, 107, 105, 110, 103, 0]), // "staking"
    amount: 1000000000000n,
    reasons: "All"
  }
]`;
      }
    }
  }

  // Handle specific known types
  if (
    actualType.includes("FixedSizeBinary<8>") &&
    storageName?.toLowerCase().includes("lock")
  ) {
    return `[
  {
    id: new Uint8Array([115, 116, 97, 107, 105, 110, 103, 0]), // "staking" as bytes
    amount: 1000000000000n,
    reasons: "All"
  }
]`;
  }

  // Handle account info types
  if (actualType.includes("nonce") && actualType.includes("free")) {
    return `{
  nonce: 42,
  consumers: 0,
  providers: 1, 
  sufficients: 0,
  data: {
    free: 1000000000000n,
    reserved: 0n,
    frozen: 0n,
    flags: 0n
  }
}`;
  }

  // Fallback to simplified display
  return `// Type: ${actualType}
// Actual structure depends on runtime definition`;
}

/**
 * Fallback to pattern-based inference when descriptor reading fails
 */
function fallbackToInference(
  pallet: string,
  storageName: string,
): {
  returnType: string;
  actualType: string;
  paramTypes: string[];
  typeDefinition?: string;
} {
  const commonPatterns: Record<
    string,
    { returnType: string; paramTypes: string[] }
  > = {
    Account: { returnType: "AccountInfo", paramTypes: ["SS58String"] },
    Locks: { returnType: "Array<BalanceLock>", paramTypes: ["SS58String"] },
    Number: { returnType: "number", paramTypes: [] },
    BlockHash: { returnType: "Hash", paramTypes: ["number"] },
    TotalIssuance: { returnType: "bigint", paramTypes: [] },
    InactiveIssuance: { returnType: "bigint", paramTypes: [] },
  };

  const pattern = commonPatterns[storageName] || {
    returnType: "unknown",
    paramTypes: [],
  };

  return {
    returnType: pattern.returnType,
    actualType: pattern.returnType,
    paramTypes: pattern.paramTypes,
    typeDefinition: undefined,
  };
}

/**
 * Format type for display in the UI
 */
export function formatTypeForDisplay(
  typeInfo: ReturnType<typeof extractActualTypes>,
): string {
  if (typeInfo.typeDefinition) {
    return typeInfo.typeDefinition;
  }

  return typeInfo.actualType;
}
