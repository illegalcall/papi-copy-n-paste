{{#includeExamples}}import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { typedApi } from "@/lib/chain"
import { formatNumber } from "@/lib/utils"

type QueryType = 'constants' | 'storage' | 'metadata'

export function StorageExample() {
  const [activeQuery, setActiveQuery] = useState<QueryType>('constants')
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const queryConstants = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const [version, blockWeights, existentialDeposit] = await Promise.all([
        typedApi.constants.System.Version(),
        typedApi.constants.System.BlockWeights(),
        typedApi.constants.Balances.ExistentialDeposit(),
      ])

      setResults({
        type: 'constants',
        data: {
          chainName: version.spec_name,
          runtimeVersion: version.spec_version,
          maxBlockWeight: blockWeights.max_block,
          existentialDeposit
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query constants")
    } finally {
      setIsLoading(false)
    }
  }

  const queryStorage = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const [blockNumber, timestamp, totalIssuance] = await Promise.all([
        typedApi.query.System.Number(),
        typedApi.query.Timestamp.Now(),
        typedApi.query.Balances.TotalIssuance(),
      ])

      // Get some account entries
      const accountEntries = await typedApi.query.System.Account.getEntries({ limit: 5 })

      setResults({
        type: 'storage',
        data: {
          currentBlock: blockNumber,
          timestamp: new Date(Number(timestamp)),
          totalIssuance,
          accountCount: accountEntries.length,
          sampleAccounts: accountEntries.map(([key, value]) => ({
            address: key[0],
            balance: value.data.free
          }))
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query storage")
    } finally {
      setIsLoading(false)
    }
  }

  const queryMetadata = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Get metadata info about storage items
      const accountMeta = typedApi.query.System.Account.meta
      const balanceMeta = typedApi.query.Balances.TotalIssuance.meta
      const timestampMeta = typedApi.query.Timestamp.Now.meta

      setResults({
        type: 'metadata',
        data: {
          storageItems: [
            {
              pallet: accountMeta.pallet,
              name: accountMeta.name,
              docs: accountMeta.docs.join(' ').slice(0, 100) + '...'
            },
            {
              pallet: balanceMeta.pallet,
              name: balanceMeta.name,
              docs: balanceMeta.docs.join(' ').slice(0, 100) + '...'
            },
            {
              pallet: timestampMeta.pallet,
              name: timestampMeta.name,
              docs: timestampMeta.docs.join(' ').slice(0, 100) + '...'
            }
          ]
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query metadata")
    } finally {
      setIsLoading(false)
    }
  }

  const executeQuery = () => {
    switch (activeQuery) {
      case 'constants':
        queryConstants()
        break
      case 'storage':
        queryStorage()
        break
      case 'metadata':
        queryMetadata()
        break
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Advanced Storage Queries</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Explore different types of data available on {{chainDisplayName}}.
        </p>
        
        {/* Query Type Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={activeQuery === 'constants' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveQuery('constants')}
          >
            Chain Constants
          </Button>
          <Button
            variant={activeQuery === 'storage' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveQuery('storage')}
          >
            Storage Queries
          </Button>
          <Button
            variant={activeQuery === 'metadata' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveQuery('metadata')}
          >
            Metadata Info
          </Button>
        </div>
        
        <Button 
          onClick={executeQuery}
          disabled={isLoading}
        >
          {isLoading ? "Querying..." : `Query ${activeQuery.charAt(0).toUpperCase() + activeQuery.slice(1)}`}
        </Button>
      </div>

      {/* Query Description */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm">
            {activeQuery === 'constants' && (
              <p>🔧 <strong>Chain Constants:</strong> Immutable values defined in the runtime, like chain version and limits.</p>
            )}
            {activeQuery === 'storage' && (
              <p>💾 <strong>Storage Queries:</strong> Current state of the blockchain, like account balances and block info.</p>
            )}
            {activeQuery === 'metadata' && (
              <p>📋 <strong>Metadata:</strong> Information about the storage items themselves, including documentation.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive text-sm">❌ Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Query Results</span>
              <Badge variant="outline" className="capitalize">{results.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.type === 'constants' && (
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain Name:</span>
                  <Badge variant="outline">{results.data.chainName}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runtime Version:</span>
                  <span className="font-mono">{results.data.runtimeVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Block Weight:</span>
                  <span className="font-mono text-sm">{formatNumber(Number(results.data.maxBlockWeight))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Existential Deposit:</span>
                  <span className="font-mono text-sm">{results.data.existentialDeposit.toString()}</span>
                </div>
              </div>
            )}

            {results.type === 'storage' && (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Block:</span>
                    <span className="font-mono font-semibold">#{formatNumber(Number(results.data.currentBlock))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="font-mono text-sm">{results.data.timestamp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Issuance:</span>
                    <span className="font-mono text-sm">{results.data.totalIssuance.toString()}</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Sample Accounts ({results.data.accountCount} found)</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {results.data.sampleAccounts.map((account: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded">
                        <code className="text-xs">{account.address.slice(0, 12)}...{account.address.slice(-8)}</code>
                        <span className="font-mono">{account.balance.toString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {results.type === 'metadata' && (
              <div className="space-y-3">
                <h5 className="font-medium">Storage Item Metadata</h5>
                {results.data.storageItems.map((item: any, index: number) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{item.pallet}</Badge>
                      <span className="font-mono text-sm">{item.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.docs}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{activeQuery === 'constants' && `// Query chain constants
const version = await typedApi.constants.System.Version()
const existentialDeposit = await typedApi.constants.Balances.ExistentialDeposit()`}
{activeQuery === 'storage' && `// Query current storage state
const blockNumber = await typedApi.query.System.Number()
const totalIssuance = await typedApi.query.Balances.TotalIssuance()
const accounts = await typedApi.query.System.Account.getEntries()`}
{activeQuery === 'metadata' && `// Access storage metadata
const meta = typedApi.query.System.Account.meta
console.log(meta.pallet, meta.name, meta.docs)`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}{{/includeExamples}}