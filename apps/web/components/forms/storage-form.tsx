"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Database, HelpCircle } from "lucide-react"

interface StorageFormProps {
  pallet: string
  storage: any
  chainKey: string
  onQueryTypeChange: (queryType: string) => void
  onParamsChange: (params: Record<string, any>) => void
  queryType: string
  storageParams: Record<string, any>
}

const QUERY_TYPES = [
  { value: 'getValue', label: 'Get Value', description: 'Get single storage value' },
  { value: 'getValueAt', label: 'Get Value At Block', description: 'Get value at specific block (finalized/best)' },
  { value: 'getValues', label: 'Get Multiple Values', description: 'Get multiple values with different keys' },
  { value: 'getEntries', label: 'Get All Entries', description: 'Get all storage entries or partial matches' },
  { value: 'watchValue', label: 'Watch Value', description: 'Watch storage changes (Observable)' },
  { value: 'comprehensive', label: 'Comprehensive', description: 'Complete example with all query types' }
]

// Helper function to detect if storage needs parameters
function detectStorageParameters(pallet: string, storageName: string): string[] | null {
  const storageWithParams = {
    'System': {
      'Account': ['AccountId'],
      'BlockHash': ['BlockNumber']
    },
    'Balances': {
      'Account': ['AccountId'], 
      'Locks': ['AccountId']
    },
    'Staking': {
      'Bonded': ['AccountId'],
      'Ledger': ['AccountId'],
      'Validators': ['AccountId'],
      'Nominators': ['AccountId']
    },
    'Democracy': {
      'ReferendumInfoOf': ['ReferendumIndex'],
      'VotingOf': ['AccountId']
    },
    'Treasury': {
      'Proposals': ['ProposalIndex']
    },
    'Vesting': {
      'Vesting': ['AccountId']
    },
    'XcmPallet': {
      'Queries': ['QueryId'],
      'AssetTraps': ['Hash']
    }
  }
  
  const palletStorage = storageWithParams[pallet as keyof typeof storageWithParams]
  if (palletStorage && storageName in palletStorage) {
    return palletStorage[storageName as keyof typeof palletStorage] as string[]
  }
  
  return null
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
  const requiredParams = detectStorageParameters(pallet, storage.name)

  useEffect(() => {
    onParamsChange(localParams)
  }, [localParams]) // Remove onParamsChange from deps to prevent unnecessary re-renders

  const handleParamChange = useCallback((paramType: string, value: string) => {
    setLocalParams(prev => ({ ...prev, [paramType.toLowerCase()]: value }))
  }, [])

  const getParameterPlaceholder = (paramType: string) => {
    switch (paramType) {
      case 'AccountId':
        return '//Alice or 5GrwvaEF5z... (full address)'
      case 'BlockNumber':
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
        {/* Query Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="queryType">Query Type</Label>
          <Select value={queryType} onValueChange={onQueryTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select query type" />
            </SelectTrigger>
            <SelectContent>
              {QUERY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  value={localParams[paramType.toLowerCase()] || ''}
                  onChange={(e) => handleParamChange(paramType, e.target.value)}
                  className="font-mono text-xs"
                />
                <div className="text-xs text-muted-foreground">
                  {paramType === 'AccountId' && 'Use test accounts (//Alice, //Bob) or full addresses'}
                  {paramType === 'BlockNumber' && 'Block number to query (empty uses latest)'}
                  {paramType.includes('Index') && 'Index number for this entry type'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Storage Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div><strong>Type:</strong> {storage.type || 'Unknown'}</div>
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
        </div>
      </CardContent>
    </Card>
  )
}