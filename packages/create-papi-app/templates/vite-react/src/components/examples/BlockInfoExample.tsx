{{#includeExamples}}import { useState, useEffect } from "react"
import { useStateObservable } from "@react-rxjs/core"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { currentBlock$, typedApi } from "@/lib/chain"
import { formatNumber, getRelativeTime } from "@/lib/utils"

export function BlockInfoExample() {
  const [isListening, setIsListening] = useState(false)
  const currentBlock = useStateObservable(currentBlock$)
  const [blockHistory, setBlockHistory] = useState<Array<{
    number: number
    hash: string
    timestamp: number
    extrinsics: number
  }>>([])
  const [specificBlock, setSpecificBlock] = useState<any>(null)
  const [queryBlockNumber, setQueryBlockNumber] = useState("")
  const [isQuerying, setIsQuerying] = useState(false)

  // Subscribe to new blocks when listening
  useEffect(() => {
    if (!isListening) return

    const subscription = currentBlock$.subscribe((block) => {
      const newBlock = {
        number: block.number,
        hash: block.hash,
        timestamp: Date.now(),
        extrinsics: block.extrinsics?.length || 0
      }
      
      setBlockHistory(prev => [newBlock, ...prev.slice(0, 9)]) // Keep last 10 blocks
    })

    return () => subscription.unsubscribe()
  }, [isListening])

  const querySpecificBlock = async () => {
    if (!queryBlockNumber) return
    
    setIsQuerying(true)
    try {
      const blockNumber = parseInt(queryBlockNumber)
      const blockHash = await typedApi.query.System.BlockHash(blockNumber)
      
      if (blockHash) {
        setSpecificBlock({
          number: blockNumber,
          hash: blockHash,
          queried: true
        })
      } else {
        setSpecificBlock({ error: "Block not found" })
      }
    } catch (error) {
      setSpecificBlock({ error: error instanceof Error ? error.message : "Query failed" })
    } finally {
      setIsQuerying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Real-time Block Information</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Monitor live blocks from {{chainDisplayName}} or query specific block information.
        </p>
      </div>

      {/* Live Block Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Live Block Stream</span>
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentBlock ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Current Block</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number:</span>
                    <span className="font-mono font-semibold">#{formatNumber(currentBlock.number)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hash:</span>
                    <code className="text-xs">{currentBlock.hash.slice(0, 12)}...{currentBlock.hash.slice(-8)}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extrinsics:</span>
                    <Badge variant="secondary">{currentBlock.extrinsics?.length || 'N/A'}</Badge>
                  </div>
                </div>
              </div>
                
                <div>
                  <h4 className="font-medium mb-2">Block History ({blockHistory.length}/10)</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {blockHistory.length === 0 && !isListening && (
                      <p className="text-xs text-muted-foreground">Click "Start Listening" to monitor new blocks</p>
                    )}
                    {blockHistory.map((block, index) => (
                      <div key={`${block.number}-${index}`} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded">
                        <span className="font-mono">#{formatNumber(block.number)}</span>
                        <span className="text-muted-foreground">{getRelativeTime(block.timestamp)}</span>
                        <Badge variant="outline" className="text-xs">{block.extrinsics} tx</Badge>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse h-16 bg-muted rounded" />
          )}
        </CardContent>
      </Card>

      {/* Specific Block Query */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Query Specific Block</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={queryBlockNumber}
              onChange={(e) => setQueryBlockNumber(e.target.value)}
              placeholder="Enter block number"
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <Button 
              onClick={querySpecificBlock}
              disabled={isQuerying || !queryBlockNumber}
              size="sm"
            >
              {isQuerying ? "Querying..." : "Query Block"}
            </Button>
          </div>

          {specificBlock && (
            <div className="mt-4 p-4 bg-muted/20 rounded-lg">
              {specificBlock.error ? (
                <p className="text-destructive text-sm">❌ {specificBlock.error}</p>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span className="font-mono font-semibold">#{formatNumber(specificBlock.number)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Hash:</span>
                    <code className="text-xs">{specificBlock.hash}</code>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
{`// Subscribe to real-time blocks
const subscription = client.finalizedBlock$.subscribe((block) => {
  console.log('New block:', block.number, block.hash)
})

// Query specific block hash
const blockHash = await typedApi.query.System.BlockHash(blockNumber)
console.log('Block hash:', blockHash)`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}{{/includeExamples}}