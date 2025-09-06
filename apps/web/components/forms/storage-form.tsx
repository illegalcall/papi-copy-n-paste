"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Database, HelpCircle, Code2, ChevronDown, ChevronUp } from "lucide-react"
import { EnhancedQuerySelector } from "./enhanced-query-selector"

interface StorageFormProps {
  pallet: string
  storage: any
  chainKey: string
  onQueryTypeChange: (queryType: string) => void
  onParamsChange: (params: Record<string, any>) => void
  queryType: string
  storageParams: Record<string, any>
}

// Query types are now defined in enhanced-query-selector.tsx

// Dynamic type extraction utilities

// Parse StorageDescriptor type to extract return type and parameter types
function parseStorageDescriptorType(typeString: string): { returnType: string; paramTypes: string[] } {
  // StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>
  // StorageDescriptor<[], number, false, never>
  // StorageDescriptor<[Key: number], FixedSizeBinary<32>, false, never>
  
  const match = typeString.match(/StorageDescriptor<\[([^\]]*)\],\s*([^,]+),/)
  if (!match) {
    return { returnType: 'Codec', paramTypes: [] }
  }
  
  const [, paramString, returnTypeString] = match
  
  // Extract parameter types
  const paramTypes: string[] = []
  if (paramString && paramString.trim()) {
    // Parse "Key: SS58String" or "Key: number" format
    const keyMatches = paramString.matchAll(/Key:\s*([^,\]]+)/g)
    for (const keyMatch of keyMatches) {
      if (keyMatch[1]) {
        paramTypes.push(keyMatch[1].trim())
      }
    }
  }
  
  // Clean up return type
  let returnType = returnTypeString ? returnTypeString.trim() : 'Codec'
  
  // Handle Anonymize wrapper
  if (returnType.startsWith('Anonymize<')) {
    returnType = returnType.replace(/Anonymize<([^>]+)>/, '$1')
  }
  
  // Handle FixedSizeBinary
  if (returnType.startsWith('FixedSizeBinary<')) {
    returnType = 'Hash'
  }
  
  // Handle primitive types
  if (returnType === 'number') returnType = 'number'
  if (returnType === 'bigint') returnType = 'bigint'
  if (returnType === 'boolean') returnType = 'boolean'
  
  // Handle complex anonymous types - try to infer meaningful names
  if (returnType.match(/^I[a-z0-9]+$/)) {
    // Anonymous type - try to infer from context
    returnType = inferTypeFromContext(returnType, paramTypes.length > 0)
  }
  
  return { returnType, paramTypes }
}

// Infer meaningful type names from anonymous types based on context
function inferTypeFromContext(anonymousType: string, hasParams: boolean): string {
  // This is still inferential but based on actual descriptor patterns
  if (hasParams) {
    return 'StorageValue' // Likely a storage value with keys
  }
  return 'StorageData' // Likely a simple storage value
}

// Cache for descriptor type information to avoid repeated parsing
const typeInfoCache = new Map<string, { returnType: string; paramTypes: string[] }>()

// Get type information dynamically from the actual storage object passed to the component
function getStorageTypeInfo(chainKey: string, pallet: string, storageName: string, storageEntry?: any): { returnType: string; paramTypes: string[] } {
  const cacheKey = `${chainKey}:${pallet}:${storageName}`
  
  // Check cache first
  if (typeInfoCache.has(cacheKey)) {
    return typeInfoCache.get(cacheKey)!
  }
  
  let result: { returnType: string; paramTypes: string[] }
  
  // Extract from the storage entry - it has a simple 'type' property
  if (storageEntry && storageEntry.type) {
    const storageType = storageEntry.type
    
    // Determine if this storage requires parameters based on common patterns
    const paramTypes = determineStorageParameters(pallet, storageName, storageType)
    
    result = {
      returnType: storageType,
      paramTypes
    }
  } else {
    // Fallback to pattern-based inference
    result = inferFromStorageName(pallet, storageName)
  }
  
  // Cache the result
  typeInfoCache.set(cacheKey, result)
  
  return result
}

// Determine if storage requires parameters based on common patterns
function determineStorageParameters(pallet: string, storageName: string, storageType: string): string[] {
  // Common patterns for storage that requires keys
  const storagePatterns: Record<string, string[]> = {
    // Account-based storage
    'Account': ['AccountId'],
    'Locks': ['AccountId'],
    'Freezes': ['AccountId'],
    'Reserves': ['AccountId'],
    
    // Block-based storage
    'BlockHash': ['BlockNumber'],
    'BlockWeight': ['BlockNumber'],
    
    // Staking storage (often requires era and/or validator)
    'ErasStakers': ['EraIndex', 'AccountId'],
    'ErasStakersClipped': ['EraIndex', 'AccountId'],
    'ErasValidatorReward': ['EraIndex'],
    'ErasRewardPoints': ['EraIndex'],
    
    // Democracy/Governance
    'ReferendumInfoOf': ['ReferendumIndex'],
    'VotingOf': ['AccountId'],
    'ProposalOf': ['ProposalIndex'],
    
    // Identity
    'IdentityOf': ['AccountId'],
    'SuperOf': ['AccountId'],
    
    // Assets
    'Asset': ['AssetId'],
    'AssetAccount': ['AssetId', 'AccountId']
  }
  
  // Direct match on storage name
  if (storagePatterns[storageName]) {
    return storagePatterns[storageName]
  }
  
  // Pattern matching for common suffixes
  if (storageName.endsWith('Of') && storageName !== 'TotalIssuance') {
    // Most "...Of" storage entries require a key
    return ['AccountId']
  }
  
  // Check if the type suggests it needs parameters
  if (storageType.includes('Map') || storageType.includes('Vec') && storageName.includes('Account')) {
    return ['AccountId']
  }
  
  // No parameters needed
  return []
}

// Simple fallback inference for when no descriptor info is available
function inferFromStorageName(pallet: string, storageName: string): { returnType: string; paramTypes: string[] } {
  // Basic inference based on common naming patterns
  const commonPatterns: Record<string, { returnType: string; paramTypes: string[] }> = {
    'Account': { returnType: 'AccountInfo', paramTypes: ['SS58String'] },
    'Number': { returnType: 'number', paramTypes: [] },
    'BlockHash': { returnType: 'Hash', paramTypes: ['number'] },
    'TotalIssuance': { returnType: 'bigint', paramTypes: [] },
    'InactiveIssuance': { returnType: 'bigint', paramTypes: [] }
  }
  
  return commonPatterns[storageName] || { returnType: 'Codec', paramTypes: [] }
}

// Legacy function for backward compatibility (deprecated)
function detectStorageType(pallet: string, storageName: string): string {
  // This function is deprecated - use getStorageTypeInfo instead
  return getStorageTypeInfo('polkadot', pallet, storageName).returnType
}

// Get storage parameters from PAPI descriptors (source of truth)
function getStorageParameters(chainKey: string, pallet: string, storageName: string): string[] | null {
  const typeInfo = getStorageTypeInfo(chainKey, pallet, storageName)
  return typeInfo.paramTypes.length > 0 ? typeInfo.paramTypes : null
}

// Legacy function for backward compatibility (deprecated)
function detectStorageParameters(pallet: string, storageName: string): string[] | null {
  // This function is deprecated - use getStorageParameters instead
  return getStorageParameters('polkadot', pallet, storageName)
}

// Generate expected response structure based on storage type and query type
function generateResponseStructure(
  returnType: string, 
  queryType: string, 
  pallet: string, 
  storageName: string
): string {
  // Get base type examples based on the return type
  const getTypeExample = (type: string): string => {
    // Handle Substrate/Polkadot specific types
    switch (type) {
      // Primitive numeric types
      case 'u8':
      case 'u16':
      case 'u32':
        return '12345'
      case 'u64':
      case 'u128':
      case 'BlockNumber':
        return '1000000000000n'
      case 'bool':
      case 'boolean':
        return 'true'
      
      // Hash types
      case 'Hash':
      case 'H256':
        return '"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"'
      
      // Account types  
      case 'AccountId':
      case 'AccountId32':
      case 'SS58String':
        return '"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"'
      
      // Complex account info
      case 'AccountInfo':
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
}`
      
      // Account data (balance info)
      case 'AccountData':
        return `{
  free: 1000000000000n,
  reserved: 0n,
  frozen: 0n,
  flags: 0n
}`
      
      // Vector types
      case 'Vec<BalanceLock>':
        return `[
  {
    id: "staking",
    amount: 1000000000000n,
    reasons: "All"
  }
]`
      
      // Context-specific examples
      default:
        // Try to infer from context
        if (pallet === 'System' && storageName === 'Number') return '12345678'
        if (pallet === 'Timestamp' && storageName === 'Now') return '1640995200000'
        if (pallet === 'Balances' && storageName === 'TotalIssuance') return '21000000000000000000n'
        if (pallet === 'Balances' && storageName === 'InactiveIssuance') return '500000000000000000n'
        
        // Staking-specific types
        if (pallet === 'Staking' && storageName.includes('Validator')) {
          return `{
  commission: {
    commission: 100000000, // 10%
    blocked: false
  },
  // ... other validator fields
}`
        }
        
        // Democracy/Governance types
        if (pallet === 'Democracy' && storageName.includes('Referendum')) {
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
}`
        }
        
        // Handle Vec types
        if (type.startsWith('Vec<')) {
          const innerType = type.slice(4, -1)
          return `[
  ${getTypeExample(innerType).split('\n').join('\n  ')},
  // ... more items
]`
        }
        
        // Handle Option types
        if (type.startsWith('Option<')) {
          const innerType = type.slice(7, -1)
          return `${getTypeExample(innerType)} // or null`
        }
        
        // Handle Compact types
        if (type.startsWith('Compact<')) {
          const innerType = type.slice(8, -1)
          return getTypeExample(innerType)
        }
        
        // Generic fallback
        return `{
  // ${type} structure
  // Specific fields depend on the runtime definition
}`
    }
  }

  const baseExample = getTypeExample(returnType)

  // Generate response based on query type
  switch (queryType) {
    case 'getValue':
    case 'getValueAt':
      return `Promise<${returnType}>\n\n// Example response:\n${baseExample}`

    case 'getValues':
      return `Promise<${returnType}[]>\n\n// Example response:\n[\n  ${baseExample.split('\n').join('\n  ')},\n  ${baseExample.split('\n').join('\n  ')}\n]`

    case 'getEntries':
      return `Promise<Map<string, ${returnType}>>\n\n// Example response:\nMap {\n  "0x1234..." => ${baseExample.split('\n').join('\n  ')},\n  "0x5678..." => ${baseExample.split('\n').join('\n  ')}\n}`

    case 'watchValue':
    case 'watchValueFinalized':
    case 'watchValueBest':
      return `Observable<${returnType}>\n\n// Stream of values:\n${baseExample}\n// Updates automatically when storage changes`

    case 'watchEntries':
    case 'watchEntriesPartial':
      return `Observable<Map<string, ${returnType}>>\n\n// Stream of entry maps:\nMap {\n  "0x1234..." => ${baseExample.split('\n').join('\n  ')}\n}\n// Updates when entries are added/removed/changed`

    case 'multiWatch':
      return `Observable<Combined>\n\n// Combined observable result:\n{\n  [storageKey]: ${baseExample.split('\n').join('\n  ')},\n  // ... other storage values\n}`

    case 'conditionalWatch':
      return `Observable<${returnType}>\n\n// Filtered stream:\n${baseExample}\n// Only emits when condition is met`

    case 'throttledWatch':
      return `Observable<${returnType}>\n\n// Rate-limited stream:\n${baseExample}\n// Throttled to prevent excessive updates`

    case 'comprehensive':
      return `Multiple Examples\n\n// getValue(): Promise<${returnType}>\n${baseExample}\n\n// watchValue(): Observable<${returnType}>\n// Stream of ${baseExample}\n\n// getEntries(): Promise<Map<string, ${returnType}>>\n// Map of all entries`

    default:
      return `Promise<${returnType}>\n\n// Example response:\n${baseExample}`
  }
}

export function StorageForm({ 
  pallet, 
  storage, 
  chainKey,
  onQueryTypeChange, 
  onParamsChange, 
  queryType, 
  storageParams 
}: StorageFormProps) {
  const [localParams, setLocalParams] = useState<Record<string, any>>(storageParams)
  const [showResponseStructure, setShowResponseStructure] = useState(false)
  
  // Get type information dynamically from storage entry and descriptors
  const typeInfo = getStorageTypeInfo(chainKey, pallet, storage.name, storage)
  
  const requiredParams = typeInfo.paramTypes.length > 0 ? typeInfo.paramTypes : null
  const actualType = typeInfo.returnType
  
  // Generate response structure dynamically
  const responseStructure = generateResponseStructure(actualType, queryType, pallet, storage.name)

  useEffect(() => {
    onParamsChange(localParams)
  }, [localParams]) // Remove onParamsChange from deps to prevent unnecessary re-renders

  const handleParamChange = useCallback((paramType: string, value: string) => {
    setLocalParams(prev => ({ ...prev, [paramType.toLowerCase()]: value }))
  }, [])

  const getParameterPlaceholder = (paramType: string) => {
    switch (paramType) {
      case 'AccountId':
      case 'SS58String':
        return '//Alice or 5GrwvaEF5z... (full address)'
      case 'BlockNumber':
      case 'number':
        return '1000000 (block number)'
      case 'ReferendumIndex':
        return '0 (referendum index)'
      case 'ProposalIndex':
        return '0 (proposal index)'
      case 'QueryId':
        return '0 (query ID)'
      case 'Hash':
        return '0x000... (32-byte hash)'
      default:
        return `Enter ${paramType}`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-4 h-4" />
          <span>{pallet}.{storage.name}</span>
          <Badge variant="outline">Storage Query</Badge>
        </CardTitle>
        <CardDescription>
          {storage.docs?.[0] || 'Storage entry in the blockchain state'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enhanced Query Type Selection */}
        <EnhancedQuerySelector
          value={queryType}
          onValueChange={onQueryTypeChange}
          storageName={storage.name}
        />

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
                  value={localParams[paramType.toLowerCase()] || ''}
                  onChange={(e) => handleParamChange(paramType, e.target.value)}
                  className="font-mono text-xs"
                />
                <div className="text-xs text-muted-foreground">
                  {(paramType === 'AccountId' || paramType === 'SS58String') && 'Use test accounts (//Alice, //Bob) or full addresses'}
                  {(paramType === 'BlockNumber' || paramType === 'number') && 'Block number to query (empty uses latest)'}
                  {paramType.includes('Index') && 'Index number for this entry type'}
                  {paramType === 'Hash' && '32-byte hash (0x prefix required)'}
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
              <span className="text-sm font-medium">Expected Response Structure</span>
              <Badge variant="outline" className="text-xs">
                Dynamic
              </Badge>
            </div>
            {showResponseStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showResponseStructure && (
            <div className="bg-muted/20 rounded-md p-3 border border-muted">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                {responseStructure}
              </pre>
              <div className="mt-2 text-xs text-muted-foreground">
                <div className="text-blue-600">✨ Generated from storage type information and query selection</div>
                <div>Structure updates automatically when you change query type or storage</div>
              </div>
            </div>
          )}
        </div>

        {/* Storage Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div><strong>Type:</strong> {storage.type || actualType}</div>
          <div className="text-blue-600 text-xs">✓ From PAPI descriptors</div>
          {requiredParams ? (
            <div><strong>Requires Keys:</strong> {requiredParams.join(', ')}</div>
          ) : (
            <div><strong>Simple Entry:</strong> No parameters required</div>
          )}
          {queryType === 'getValues' && !requiredParams && (
            <div className="text-orange-500">
              ⚠️ getValues() only works with storage entries that have keys
            </div>
          )}
          {(queryType === 'getEntries' || queryType === 'watchEntries') && (
            <div className="text-blue-500">
              💡 This operation retrieves all entries and may be resource intensive
            </div>
          )}
          {queryType.includes('watch') && (
            <div className="text-green-500">
              🔄 This creates a live subscription - remember to unsubscribe when done
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}