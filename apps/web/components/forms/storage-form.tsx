"use client";

import { useState, useEffect, useCallback } from "react";
import type { StorageParams, StorageParamsChangeHandler } from "../../types/forms";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Database,
  HelpCircle,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { EnhancedQuerySelector } from "./enhanced-query-selector";
import {
  extractActualTypes,
  getTypeExample,
  formatTypeForDisplay,
  generateStorageSignature,
} from "../../utils/typeExtraction";
import { detectStorageParameters, getStorageParameterInfo } from "../../utils/dynamicStorageDetection";
import { CallSignature } from "@/components/type-display";

interface StorageFormProps {
  pallet: string;
  storage: any;
  chainKey: string;
  onQueryTypeChange: (queryType: string) => void;
  onParamsChange: StorageParamsChangeHandler;
  queryType: string;
  storageParams: StorageParams;
}

// Query types are now defined in enhanced-query-selector.tsx

// Dynamic type extraction utilities

// Cache for descriptor type information to avoid repeated parsing
const typeInfoCache = new Map<
  string,
  { returnType: string; paramTypes: string[] }
>();

// Get type information dynamically from the actual storage object passed to the component
function getStorageTypeInfo(
  chainKey: string,
  pallet: string,
  storageName: string,
  storageEntry?: any,
): { returnType: string; paramTypes: string[] } {
  const cacheKey = `${chainKey}:${pallet}:${storageName}`;

  // Check cache first
  if (typeInfoCache.has(cacheKey)) {
    return typeInfoCache.get(cacheKey)!;
  }

  let result: { returnType: string; paramTypes: string[] };

  // Extract from the storage entry - it has a simple 'type' property
  if (storageEntry && storageEntry.type) {
    const storageType = storageEntry.type;

    // Determine if this storage requires parameters based on common patterns
    const paramTypes = determineStorageParameters(
      pallet,
      storageName,
      chainKey
    );

    result = {
      returnType: storageType,
      paramTypes,
    };
  } else {
    // Fallback to pattern-based inference
    result = inferFromStorageName(pallet, storageName, chainKey);
  }

  // Cache the result
  typeInfoCache.set(cacheKey, result);

  return result;
}

// Determine if storage requires parameters using dynamic detection
function determineStorageParameters(
  pallet: string,
  storageName: string,
  chainKey: string = 'polkadot'
): string[] {
  // Use dynamic detection to get parameter types
  return detectStorageParameters(pallet, storageName, chainKey);
}

// Dynamic inference using metadata-driven detection
function inferFromStorageName(
  pallet: string,
  storageName: string,
  chainKey: string = 'polkadot'
): { returnType: string; paramTypes: string[] } {
  // Use dynamic detection to get both parameter and return type information
  const storageInfo = getStorageParameterInfo(chainKey, pallet, storageName);

  return {
    returnType: storageInfo.returnType || "Codec",
    paramTypes: storageInfo.required
  };
}

// Enhanced response structure generator using PAPI types
function generateEnhancedResponseStructure(
  actualType: string,
  displayType: string,
  queryType: string,
  pallet: string,
  storageName: string,
  typeInfo: ReturnType<typeof extractActualTypes>,
): string {
  // If we have type definition, use it for examples
  const hasTypeDefinition =
    typeInfo.typeDefinition && typeInfo.typeDefinition !== "unknown";

  if (hasTypeDefinition) {
    const actualExample = getTypeExample(typeInfo.typeDefinition!, storageName);
    return generateResponseWithActualType(
      actualExample,
      displayType,
      queryType,
    );
  }

  // Fallback to original generator
  return generateResponseStructure(actualType, queryType, pallet, storageName);
}

// Generate response structure using actual type information
function generateResponseWithActualType(
  actualExample: string,
  displayType: string,
  queryType: string,
): string {
  switch (queryType) {
    case "getValue":
    case "getValueAt":
      return `Promise<${displayType}>\n\n// Example response:\n${actualExample}`;

    case "getValues":
      return `Promise<${displayType}[]>\n\n// Example response:\n[\n  ${actualExample
        .split("\n")
        .map((l) => "  " + l)
        .join("\n")},\n  // ... more items\n]`;

    case "getEntries":
      return `Promise<Map<string, ${displayType}>>\n\n// Example response:\nMap {\n  "0x1234..." => ${actualExample
        .split("\n")
        .map((l) => "  " + l)
        .join("\n")},\n  "0x5678..." => ${actualExample
        .split("\n")
        .map((l) => "  " + l)
        .join("\n")}\n}`;

    case "watchValue":
    case "watchValueFinalized":
    case "watchValueBest":
      return `Observable<${displayType}>\n\n// Stream of values:\n${actualExample}\n// Updates automatically when storage changes`;

    case "watchEntries":
    case "watchEntriesPartial":
      return `Observable<Map<string, ${displayType}>>\n\n// Stream of entry maps:\nMap {\n  "0x1234..." => ${actualExample
        .split("\n")
        .map((l) => "  " + l)
        .join("\n")}\n}\n// Updates when entries are added/removed/changed`;

    case "comprehensive":
      return `Multiple Examples\n\n// getValue(): Promise<${displayType}>\n${actualExample}\n\n// watchValue(): Observable<${displayType}>\n// Stream of ${actualExample}\n\n// getEntries(): Promise<Map<string, ${displayType}>>\n// Map of all entries`;

    default:
      return `Promise<${displayType}>\n\n// Example response:\n${actualExample}`;
  }
}

// Generate expected response structure based on storage type and query type (legacy)
function generateResponseStructure(
  returnType: string,
  queryType: string,
  pallet: string,
  storageName: string,
): string {
  // Get base type examples based on the return type
  const getTypeExample = (type: string): string => {
    // Handle Substrate/Polkadot specific types
    switch (type) {
      // Primitive numeric types
      case "u8":
      case "u16":
      case "u32":
        return "12345";
      case "u64":
      case "u128":
      case "BlockNumber":
        return "1000000000000n";
      case "bool":
      case "boolean":
        return "true";

      // Hash types
      case "Hash":
      case "H256":
        return '"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"';

      // Account types
      case "AccountId":
      case "AccountId32":
      case "SS58String":
        return '"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"';

      // Complex account info
      case "AccountInfo":
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

      // Account data (balance info)
      case "AccountData":
        return `{
  free: 1000000000000n,
  reserved: 0n,
  frozen: 0n,
  flags: 0n
}`;

      // Vector types
      case "Vec<BalanceLock>":
        return `[
  {
    id: "staking",
    amount: 1000000000000n,
    reasons: "All"
  }
]`;

      // Context-specific examples
      default:
        // Try to infer from context
        if (pallet === "System" && storageName === "Number") return "12345678";
        if (pallet === "Timestamp" && storageName === "Now")
          return "1640995200000";
        if (pallet === "Balances" && storageName === "TotalIssuance")
          return "21000000000000000000n";
        if (pallet === "Balances" && storageName === "InactiveIssuance")
          return "500000000000000000n";

        // Staking-specific types
        if (pallet === "Staking" && storageName.includes("Validator")) {
          return `{
  commission: {
    commission: 100000000, // 10%
    blocked: false
  },
  // ... other validator fields
}`;
        }

        // Democracy/Governance types
        if (pallet === "Democracy" && storageName.includes("Referendum")) {
          return `{
  ongoing: {
    proposal: { /* proposal data */ },
    threshold: "SuperMajorityApprove", 
    delay: 28800,
    tally: {
      ayes: 1000000000000n,
      nays: 500000000000n,
      turnout: 1500000000000n
    }
  }
}`;
        }

        // Handle Vec types
        if (type.startsWith("Vec<")) {
          const innerType = type.slice(4, -1);
          return `[
  ${getTypeExample(innerType).split("\n").join("\n  ")},
  // ... more items
]`;
        }

        // Handle Option types
        if (type.startsWith("Option<")) {
          const innerType = type.slice(7, -1);
          return `${getTypeExample(innerType)} // or null`;
        }

        // Handle Compact types
        if (type.startsWith("Compact<")) {
          const innerType = type.slice(8, -1);
          return getTypeExample(innerType);
        }

        // Generic fallback
        return `{
  // ${type} structure
  // Specific fields depend on the runtime definition
}`;
    }
  };

  const baseExample = getTypeExample(returnType);

  // Generate response based on query type
  switch (queryType) {
    case "getValue":
    case "getValueAt":
      return `Promise<${returnType}>\n\n// Example response:\n${baseExample}`;

    case "getValues":
      return `Promise<${returnType}[]>\n\n// Example response:\n[\n  ${baseExample.split("\n").join("\n  ")},\n  ${baseExample.split("\n").join("\n  ")}\n]`;

    case "getEntries":
      return `Promise<Map<string, ${returnType}>>\n\n// Example response:\nMap {\n  "0x1234..." => ${baseExample.split("\n").join("\n  ")},\n  "0x5678..." => ${baseExample.split("\n").join("\n  ")}\n}`;

    case "watchValue":
    case "watchValueFinalized":
    case "watchValueBest":
      return `Observable<${returnType}>\n\n// Stream of values:\n${baseExample}\n// Updates automatically when storage changes`;

    case "watchEntries":
    case "watchEntriesPartial":
      return `Observable<Map<string, ${returnType}>>\n\n// Stream of entry maps:\nMap {\n  "0x1234..." => ${baseExample.split("\n").join("\n  ")}\n}\n// Updates when entries are added/removed/changed`;

    case "multiWatch":
      return `Observable<Combined>\n\n// Combined observable result:\n{\n  [storageKey]: ${baseExample.split("\n").join("\n  ")},\n  // ... other storage values\n}`;

    case "conditionalWatch":
      return `Observable<${returnType}>\n\n// Filtered stream:\n${baseExample}\n// Only emits when condition is met`;

    case "throttledWatch":
      return `Observable<${returnType}>\n\n// Rate-limited stream:\n${baseExample}\n// Throttled to prevent excessive updates`;

    case "comprehensive":
      return `Multiple Examples\n\n// getValue(): Promise<${returnType}>\n${baseExample}\n\n// watchValue(): Observable<${returnType}>\n// Stream of ${baseExample}\n\n// getEntries(): Promise<Map<string, ${returnType}>>\n// Map of all entries`;

    default:
      return `Promise<${returnType}>\n\n// Example response:\n${baseExample}`;
  }
}

export function StorageForm({
  pallet,
  storage,
  chainKey,
  onQueryTypeChange,
  onParamsChange,
  queryType,
  storageParams,
}: StorageFormProps) {
  const [localParams, setLocalParams] =
    useState<StorageParams>(storageParams);
  const [showResponseStructure, setShowResponseStructure] = useState(false);
  const [showTypeInfo, setShowTypeInfo] = useState(true);

  // Get ACTUAL type information from PAPI descriptors - no fallbacks
  let actualTypeInfo;
  let requiredParams = null;
  let actualType = "unknown";
  let displayType = "unknown";

  try {
    actualTypeInfo = extractActualTypes(chainKey, pallet, storage.name);
    requiredParams = actualTypeInfo.paramTypes.length > 0 ? actualTypeInfo.paramTypes : null;
    actualType = actualTypeInfo.actualType;
    displayType = formatTypeForDisplay(actualTypeInfo);
  } catch (error) {
    console.error(`Type extraction failed for ${chainKey}.${pallet}.${storage.name}:`, error);
    // No fallback - let it be unknown
  }

  // Generate response structure with type information
  const responseStructure = actualTypeInfo ? generateEnhancedResponseStructure(
    actualType,
    displayType,
    queryType,
    pallet,
    storage.name,
    actualTypeInfo,
  ) : `// Type information not available for ${chainKey}.${pallet}.${storage.name}
// This storage query requires proper metadata to determine return type structure
const result = await typedApi.query.${pallet}.${storage.name}(/* parameters */);
console.log('Result:', result);`;
  
  // Generate TypeScript type information for storage
  const storageTypeInfo = generateStorageSignature(
    pallet,
    storage.name,
    actualTypeInfo?.paramTypes || [],
    actualType
  );

  useEffect(() => {
    onParamsChange(localParams);
  }, [localParams]); // Remove onParamsChange from deps to prevent unnecessary re-renders

  const handleParamChange = useCallback((paramType: string, value: string) => {
    setLocalParams((prev) => ({ ...prev, [paramType.toLowerCase()]: value }));
  }, []);

  const getParameterPlaceholder = (paramType: string) => {
    switch (paramType) {
      case "AccountId":
      case "SS58String":
        return "//Alice or 5GrwvaEF5z... (full address)";
      case "AssetId":
        return "1, 1000, etc. (asset identifier)";
      case "BlockNumber":
      case "number":
        return "1000000 (block number)";
      case "ReferendumIndex":
        return "0 (referendum index)";
      case "ProposalIndex":
        return "0 (proposal index)";
      case "QueryId":
        return "0 (query ID)";
      case "Hash":
        return "0x000... (32-byte hash)";
      default:
        return `Enter ${paramType}`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Storage Header - No Card */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            {pallet}.{storage.name}
          </h3>
          <Badge variant="outline" className="text-xs">Storage Query</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {storage.docs?.[0] || "Storage entry in the blockchain state"}
        </p>
      </div>

      {/* TypeScript Type Information - Inline Compact */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowTypeInfo(!showTypeInfo)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Code2 className="w-3 h-3 text-muted-foreground" />
            <div className="font-mono text-xs text-foreground truncate">
              <span className="text-pink-600">{storage.name}</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-purple-600">StorageDescriptor</span>
              <span className="text-gray-400">&lt;</span>
              <span className="text-foreground">{storageTypeInfo.returnType}</span>
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>
          {showTypeInfo ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {showTypeInfo && (
          <div className="max-h-48 overflow-y-auto p-3 bg-muted/10 rounded-md border border-muted/50">
            <CallSignature 
              typeInfo={storageTypeInfo}
              description={storage.docs?.[0] || "Storage entry in the blockchain state"}
            />
          </div>
        )}
      </div>

        {/* Enhanced Query Type Selection */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Query Configuration</h4>
          <EnhancedQuerySelector
            value={queryType}
            onValueChange={onQueryTypeChange}
            storageName={storage.name}
          />
        </div>

        {/* Storage Parameters (if needed) */}
        {requiredParams && requiredParams.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label>Storage Parameters</Label>
              <HelpCircle className="w-3 h-3 text-muted-foreground" />
            </div>

            {requiredParams.map((paramType) => (
              <div key={paramType} className="space-y-1">
                <Label htmlFor={paramType} className="text-xs">
                  {paramType}
                </Label>
                <Input
                  id={paramType}
                  placeholder={getParameterPlaceholder(paramType)}
                  value={localParams[paramType.toLowerCase()] || ""}
                  onChange={(e) => handleParamChange(paramType, e.target.value)}
                  className="font-mono text-xs"
                />
                <div className="text-xs text-muted-foreground">
                  {(paramType === "AccountId" || paramType === "SS58String") &&
                    "Use test accounts (//Alice, //Bob) or full addresses"}
                  {paramType === "AssetId" &&
                    "Asset identifier (varies by chain)"}
                  {(paramType === "BlockNumber" || paramType === "number") &&
                    "Block number to query (empty uses latest)"}
                  {paramType.includes("Index") &&
                    "Index number for this entry type"}
                  {paramType === "Hash" && "32-byte hash (0x prefix required)"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Response Structure */}
        <div className="space-y-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setShowResponseStructure(!showResponseStructure)}
          >
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                Expected Response Structure
              </span>
              <Badge variant="outline" className="text-xs">
                Dynamic
              </Badge>
            </div>
            {showResponseStructure ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showResponseStructure && (
            <div className="bg-muted/20 rounded-md p-3 border border-muted">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                {responseStructure}
              </pre>
              <div className="mt-2 text-xs text-muted-foreground">
                <div>
                  Structure updates automatically when you change query type or
                  storage
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Storage Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>
            <strong>Type:</strong> {storage.type || actualType}
          </div>
          {requiredParams ? (
            <div>
              <strong>Requires Keys:</strong> {requiredParams.join(", ")}
            </div>
          ) : (
            <div>
              <strong>Simple Entry:</strong> No parameters required
            </div>
          )}
          {queryType === "getValues" && !requiredParams && (
            <div className="text-orange-500">
              ⚠️ getValues() only works with storage entries that have keys
            </div>
          )}
          {(queryType === "getEntries" || queryType === "watchEntries") && (
            <div className="text-blue-500">
              💡 This operation retrieves all entries and may be resource
              intensive
            </div>
          )}
          {queryType.includes("watch") && (
            <div className="text-green-500">
              🔄 This creates a live subscription - remember to unsubscribe when
              done
            </div>
          )}
        </div>
    </div>
  );
}
