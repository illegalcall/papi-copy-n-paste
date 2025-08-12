{{#includeExamples}}import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { typedApi } from "@/lib/chain"
import { formatBalance, truncateAddress } from "@/lib/utils"

const WELL_KNOWN_ACCOUNTS = [
  { name: "Alice", address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" },
  { name: "Bob", address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty" },
  { name: "Charlie", address: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y" },
]

export function BalanceExample() {
  const [selectedAccount, setSelectedAccount] = useState(WELL_KNOWN_ACCOUNTS[0])
  const [accountData, setAccountData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const queryBalance = async (address: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const accountInfo = await typedApi.query.System.Account(address)
      setAccountData({
        address,
        free: accountInfo.data.free,
        reserved: accountInfo.data.reserved,
        frozen: accountInfo.data.frozen || 0n,
        nonce: accountInfo.nonce,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query account")
      console.error("Balance query error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Query Account Balances</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Select a well-known account to query its balance information from {{chainDisplayName}}.
        </p>
        
        {/* Account Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {WELL_KNOWN_ACCOUNTS.map((account) => (
            <Button
              key={account.address}
              variant={selectedAccount.address === account.address ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAccount(account)}
            >
              {account.name}
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={() => queryBalance(selectedAccount.address)}
          disabled={isLoading}
        >
          {isLoading ? "Querying..." : `Query ${selectedAccount.name}'s Balance`}
        </Button>
      </div>

      {/* Results */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive text-sm">❌ Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {accountData && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Account Information</span>
              <Badge variant="outline">{selectedAccount.name}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {truncateAddress(accountData.address)}
                </code>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free Balance:</span>
                <span className="font-mono font-semibold text-green-600">
                  {formatBalance(accountData.free, 12, "{{chainName}}" === "polkadot" ? "DOT" : "KSM")}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reserved:</span>
                <span className="font-mono text-yellow-600">
                  {formatBalance(accountData.reserved, 12, "{{chainName}}" === "polkadot" ? "DOT" : "KSM")}
                </span>
              </div>
              
              {accountData.frozen > 0n && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frozen:</span>
                  <span className="font-mono text-blue-600">
                    {formatBalance(accountData.frozen, 12, "{{chainName}}" === "polkadot" ? "DOT" : "KSM")}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nonce:</span>
                <span className="font-mono">{accountData.nonce.toString()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> Free balance is what can be transferred. Reserved balance is locked for operations like staking or governance.
              </p>
            </div>
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
{`// Query account balance
const accountInfo = await typedApi.query.System.Account(address)

console.log({
  free: accountInfo.data.free,
  reserved: accountInfo.data.reserved,
  nonce: accountInfo.nonce
})`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}{{/includeExamples}}