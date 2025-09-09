import { useStateObservable } from "@react-rxjs/core"
import { Card, CardContent } from "@/components/ui/card"
import { currentBlock$ } from "@/lib/chain"

export function LoadingScreen() {
  const currentBlock = useStateObservable(currentBlock$)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            {/* Polkadot brand gradient circle */}
            <div className="polkadot-gradient w-16 h-16 rounded-full mx-auto animate-pulse" />
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Connecting to {{chainDisplayName}}</h2>
              <p className="text-muted-foreground">
                Initializing PAPI client and establishing connection...
              </p>
              {currentBlock && (
                <p className="text-sm text-green-600">
                  Current block: #{currentBlock.number.toString()}
                </p>
              )}
            </div>
            
            {/* Simple loading animation */}
            <div className="loading-dots text-2xl font-bold">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>
            
            {/* Educational info about what's happening */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Loading chain metadata</p>
              <p>• Establishing WebSocket connection</p>
              <p>• Syncing with latest block</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}