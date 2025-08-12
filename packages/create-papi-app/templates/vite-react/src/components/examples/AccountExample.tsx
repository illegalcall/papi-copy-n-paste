import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { typedApi } from "@/lib/chain"
import { formatBalance } from "@/lib/chains"

// Example account addresses for demonstration
const EXAMPLE_ACCOUNTS = {
  alice: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  bob: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  charlie: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y"
}

interface AccountInfo {
  address: string
  balance: {
    free: string
    reserved: string
    total: string
  }
  nonce: string
  isLoading: boolean
  error?: string
}

export function AccountExample() {
  const [accounts, setAccounts] = useState<Record<string, AccountInfo>>({})

  const loadAccountInfo = async (name: string, address: string) => {
    // Set loading state
    setAccounts(prev => ({
      ...prev,
      [name]: { 
        address, 
        balance: { free: "0", reserved: "0", total: "0" }, 
        nonce: "0", 
        isLoading: true 
      }
    }))

    try {
      // This is the key PAPI pattern: query chain storage
      const accountData = await typedApi.query.System.Account.getValue(address)
      
      // Extract balance information
      const free = accountData.data.free.toString()
      const reserved = accountData.data.reserved.toString()
      const total = (accountData.data.free + accountData.data.reserved).toString()
      
      // Update state with results
      setAccounts(prev => ({
        ...prev,
        [name]: {
          address,
          balance: { free, reserved, total },
          nonce: accountData.nonce.toString(),
          isLoading: false
        }
      }))
    } catch (error) {
      // Simple error handling
      setAccounts(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to load account"
        }
      }))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          👤 Account Information
          <Badge variant="secondary">Example</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {Object.entries(EXAMPLE_ACCOUNTS).map(([name, address]) => (
            <div key={name} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium capitalize">{name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {address}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => loadAccountInfo(name, address)}
                  disabled={accounts[name]?.isLoading}
                >
                  {accounts[name]?.isLoading ? "Loading..." : "Query Balance"}
                </Button>
              </div>

              {accounts[name] && (
                <div className="space-y-2 pt-2 border-t">
                  {accounts[name].error ? (
                    <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      Error: {accounts[name].error}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Free Balance</div>
                        <div className="font-mono">
                          {formatBalance(accounts[name].balance.free, "{{chainName}}")}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Reserved</div>
                        <div className="font-mono">
                          {formatBalance(accounts[name].balance.reserved, "{{chainName}}")}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Balance</div>
                        <div className="font-mono font-semibold">
                          {formatBalance(accounts[name].balance.total, "{{chainName}}")}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Nonce</div>
                        <div className="font-mono">{accounts[name].nonce}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Educational info about PAPI patterns */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">💡 PAPI Learning Notes</div>
            <ul className="text-xs space-y-1 text-blue-700">
              <li>• <code>typedApi.query.System.Account(address)</code> - Query on-chain storage</li>
              <li>• Account data includes free, reserved, and frozen balances</li>
              <li>• Nonce tracks number of transactions from this account</li>
              <li>• All balance values are in the smallest chain unit (planck/atomic)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}