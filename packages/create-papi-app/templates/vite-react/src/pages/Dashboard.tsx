import { useState, useEffect } from "react"
import { useStateObservable } from "@react-rxjs/core"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { typedApi, currentBlock$ } from "@/lib/chain"
import { formatNumber, formatBalance } from "@/lib/utils"

export function Dashboard() {
  const [chainInfo, setChainInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const currentBlock = useStateObservable(currentBlock$)

  useEffect(() => {
    async function fetchChainInfo() {
      try {
        const [version, blockWeights] = await Promise.all([
          typedApi.constants.System.Version(),
          typedApi.constants.System.BlockWeights(),
        ])
        
        setChainInfo({
          name: version.spec_name,
          version: version.spec_version,
          maxBlockWeight: blockWeights.max_block,
        })
      } catch (error) {
        console.error("Failed to fetch chain info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChainInfo()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-8 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your {{chainDisplayName}} connection and chain information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Chain Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chain Information</CardTitle>
            <CardDescription>Current chain details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {chainInfo && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <Badge variant="outline">{chainInfo.name}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runtime:</span>
                  <span className="font-mono text-sm">{chainInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Block Weight:</span>
                  <span className="font-mono text-sm">{formatNumber(Number(chainInfo.maxBlockWeight))}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Current Block */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Latest Block</CardTitle>
            <CardDescription>Real-time block information</CardDescription>
          </CardHeader>
          <CardContent>
            {currentBlock ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number:</span>
                  <span className="font-mono text-lg font-semibold">
                    #{formatNumber(currentBlock.number)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hash:</span>
                  <span className="font-mono text-sm">
                    {currentBlock.hash.slice(0, 10)}...{currentBlock.hash.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extrinsics:</span>
                  <Badge variant="secondary">{currentBlock.extrinsics?.length || 'N/A'}</Badge>
                </div>
              </div>
            ) : (
              <div className="animate-pulse h-16 bg-muted rounded" />
            )}
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connection Status</CardTitle>
            <CardDescription>PAPI client information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider:</span>
              <Badge variant="default">WebSocket</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chain:</span>
              <Badge className="chain-badge-{{chainName}}">{{chainDisplayName}}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="default">✓ Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Your {{chainDisplayName}} PAPI application is successfully connected!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">What's included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ PAPI client with {{chainDisplayName}} connection</li>
                <li>✓ Real-time block subscription</li>
                <li>✓ TypeScript support with full type safety</li>
                <li>✓ Modern React with Vite and Tailwind CSS</li>
                {{#includeExamples}}<li>✓ Example pages and components</li>{{/includeExamples}}
                {{#includeChopsticks}}<li>✓ Chopsticks local development setup</li>{{/includeChopsticks}}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Next steps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Explore the Dashboard and connection info</li>
                {{#includeExamples}}<li>• Check out the Examples page</li>{{/includeExamples}}
                <li>• Start building your custom components</li>
                <li>• Add account management and transactions</li>
                <li>• Read the <a href="https://papi.how" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PAPI documentation</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}