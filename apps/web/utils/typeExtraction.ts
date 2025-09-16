/**
 * TypeScript Type Extraction from PAPI Descriptors
 * Client-side type extraction with graceful fallbacks
 */

// Cache for parsed type information
const typeCache = new Map<string, any>();

export interface TypeScriptTypeInfo {
  signature: string;
  parameters: Array<{
    name: string;
    type: string;
    description?: string;
  }>;
  returnType?: string;
  complexity: 'simple' | 'medium' | 'complex';
}

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

    // No fallback - throw error if metadata is missing
    throw new Error(`No type information available for ${chainKey}.${pallet}.${storageName} in known mappings`);
  } catch (error) {
    throw new Error(`Failed to extract types for ${chainKey}.${pallet}.${storageName}: ${error instanceof Error ? error.message : error}`);
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

/**
 * Converts PAPI type strings to TypeScript equivalents for transaction calls
 */
export function papiTypeToTypeScript(papiType: string): string {
  // Handle common PAPI to TypeScript conversions
  const typeMap: Record<string, string> = {
    // Numeric types
    'u8': 'number',
    'u16': 'number', 
    'u32': 'number',
    'u64': 'bigint',
    'u128': 'bigint',
    'i8': 'number',
    'i16': 'number',
    'i32': 'number',
    'i64': 'bigint',
    'i128': 'bigint',
    
    // Blockchain specific types
    'AccountId32': 'MultiAddress',
    'AccountId': 'MultiAddress',
    'H256': 'HexString',
    'Balance': 'bigint',
    
    // Basic types
    'Bool': 'boolean',
    'Bytes': 'HexString',
    'Text': 'string',
    'Str': 'string',
  };

  // Handle direct mappings
  if (typeMap[papiType]) {
    return typeMap[papiType];
  }

  // Handle Compact<T>
  const compactMatch = papiType.match(/^Compact<(.+)>$/);
  if (compactMatch && compactMatch[1]) {
    return papiTypeToTypeScript(compactMatch[1]);
  }

  // Handle Option<T>
  const optionMatch = papiType.match(/^Option<(.+)>$/);
  if (optionMatch && optionMatch[1]) {
    return `${papiTypeToTypeScript(optionMatch[1])} | undefined`;
  }

  // Handle Vec<T>
  const vecMatch = papiType.match(/^Vec<(.+)>$/);
  if (vecMatch && vecMatch[1]) {
    return `${papiTypeToTypeScript(vecMatch[1])}[]`;
  }

  // Handle Result<T, E>
  const resultMatch = papiType.match(/^Result<(.+),\s*(.+)>$/);
  if (resultMatch && resultMatch[1] && resultMatch[2]) {
    return `Result<${papiTypeToTypeScript(resultMatch[1])}, ${papiTypeToTypeScript(resultMatch[2])}>`;
  }

  // Handle tuples (T, U, V)
  const tupleMatch = papiType.match(/^\(([^)]+)\)$/);
  if (tupleMatch && tupleMatch[1]) {
    const types = tupleMatch[1].split(',').map(t => papiTypeToTypeScript(t.trim()));
    return `[${types.join(', ')}]`;
  }

  // Handle complex types - keep as-is but clean up
  return papiType
    .replace(/^sp_runtime::|^pallet_|^frame_/, '') // Remove common prefixes
    .replace(/::/, '.'); // Replace Rust :: with TS .
}

/**
 * Generates TypeScript-style call signature for a transaction
 */
export function generateCallSignature(
  pallet: string, 
  callName: string, 
  args: Array<{ name: string; type: string; }>
): TypeScriptTypeInfo {
  
  const parameters = args.map(arg => ({
    name: arg.name,
    type: papiTypeToTypeScript(arg.type),
    description: getParameterDescription(arg.name, arg.type)
  }));

  // Create TypeScript interface for parameters
  const paramInterface = parameters.length > 0 
    ? `{ ${parameters.map(p => `${p.name}: ${p.type}`).join('; ')} }`
    : '{}';

  // Generate the TxDescriptor signature
  const signature = `TxDescriptor<${paramInterface}>`;

  // Determine complexity based on parameter types and count
  const complexity = determineComplexity(parameters);

  return {
    signature,
    parameters,
    returnType: 'SubmittableExtrinsic',
    complexity
  };
}

/**
 * Generates TypeScript-style storage query signature
 */
export function generateStorageSignature(
  pallet: string,
  storageName: string,
  keyTypes: string[] = [],
  valueType: string = 'unknown'
): TypeScriptTypeInfo {
  
  const parameters = keyTypes.map((type, index) => ({
    name: `key${index + 1}`,
    type: papiTypeToTypeScript(type),
    description: `Storage key parameter ${index + 1}`
  }));

  const returnType = papiTypeToTypeScript(valueType);
  
  // Create signature based on whether it has keys
  const signature = parameters.length > 0
    ? `StorageDescriptor<[${parameters.map(p => p.type).join(', ')}], ${returnType}>`
    : `StorageDescriptor<[], ${returnType}>`;

  return {
    signature,
    parameters,
    returnType,
    complexity: determineComplexity(parameters)
  };
}

/**
 * Determines the complexity of a type signature
 */
function determineComplexity(parameters: Array<{ type: string; }>): 'simple' | 'medium' | 'complex' {
  if (parameters.length === 0) return 'simple';
  if (parameters.length <= 2) {
    const hasComplexTypes = parameters.some(p => 
      p.type.includes('|') || 
      p.type.includes('[]') || 
      p.type.includes('Result') ||
      p.type.includes('MultiAddress')
    );
    return hasComplexTypes ? 'medium' : 'simple';
  }
  return 'complex';
}

/**
 * Generates TypeScript-style constant signature
 */
export function generateConstantSignature(
  pallet: string,
  constantName: string,
  constantType: string,
  value: any
): TypeScriptTypeInfo {
  const tsType = papiTypeToTypeScript(constantType);
  
  // Create signature for the constant
  const signature = `${tsType}`;
  
  return {
    signature,
    parameters: [], // Constants have no parameters
    returnType: tsType,
    complexity: 'simple'
  };
}

/**
 * Gets human-readable explanation for common constant types
 */
export function getConstantExplanation(constantName: string, constantType: string, value: any): string {
  const normalizedName = constantName.toLowerCase();
  
  if (normalizedName.includes('deposit')) {
    return `💰 Deposit amount in plancks (1 DOT = 10¹⁰ plancks)`;
  }
  
  if (normalizedName.includes('period') && constantType === 'u32') {
    return `⏰ Time period in blocks (~6 seconds per block)`;
  }
  
  if (constantType === 'Permill') {
    return `📊 Percentage in parts per million (1,000,000 = 100%)`;
  }
  
  if (constantType === 'Perbill') {
    return `📊 Percentage in parts per billion (1,000,000,000 = 100%)`;
  }
  
  if (normalizedName.includes('max') && constantType === 'u32') {
    return `🔢 Maximum limit or count`;
  }
  
  if (constantType === 'Weight') {
    return `⚖️ Computational weight limits`;
  }
  
  if (constantType.includes('u128') && normalizedName.includes('balance')) {
    return `💰 Balance amount in smallest unit`;
  }
  
  return '';
}

/**
 * Gets parameter descriptions based on common parameter names
 */
function getParameterDescription(paramName: string, paramType: string): string {
  const descriptions: Record<string, string> = {
    'dest': 'Destination account for the transaction',
    'value': 'Amount to transfer (in smallest unit)',
    'amount': 'Amount for the operation (in smallest unit)', 
    'who': 'Account to perform operation on',
    'target': 'Target account for the operation',
    'source': 'Source account for the operation',
    'beneficiary': 'Account that will benefit from the operation',
    'controller': 'Controller account',
    'stash': 'Stash account for staking',
    'validator': 'Validator account',
    'nominees': 'List of validator nominees',
    'remark': 'On-chain remark or comment',
    'data': 'Data payload for the transaction',
    'call': 'Call to execute',
    'calls': 'Batch of calls to execute',
    'index': 'Index or identifier',
    'new_free': 'New free balance amount',
    'new_reserved': 'New reserved balance amount'
  };

  return descriptions[paramName] || `Parameter of type ${paramType}`;
}

/**
 * Formats TypeScript type for display with syntax highlighting classes
 * Returns the original string - highlighting will be handled by CSS classes in components
 */
export function formatTypeWithHighlighting(typeString: string): string {
  // For now, just return the clean type string
  // The components will handle styling with proper CSS classes
  return typeString;
}
