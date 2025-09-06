"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Database, HelpCircle } from "lucide-react"
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
  
  // Try to extract from the storage entry if available
  if (storageEntry) {
    // Check if the storage entry has type information
    if (storageEntry.type) {
      result = parseStorageDescriptorType(storageEntry.type)
    } else if (storageEntry.signature) {
      result = parseStorageDescriptorType(storageEntry.signature)
    } else {
      // Fallback to simple inference based on common patterns
      result = inferFromStorageName(pallet, storageName)
    }
  } else {
    // Fallback to pattern-based inference
    result = inferFromStorageName(pallet, storageName)
  }
  
  // Cache the result
  typeInfoCache.set(cacheKey, result)
  
  return result
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
  // Get type information dynamically from storage entry and descriptors
  const typeInfo = getStorageTypeInfo(chainKey, pallet, storage.name, storage)
  const requiredParams = typeInfo.paramTypes.length > 0 ? typeInfo.paramTypes : null
  const actualType = typeInfo.returnType

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