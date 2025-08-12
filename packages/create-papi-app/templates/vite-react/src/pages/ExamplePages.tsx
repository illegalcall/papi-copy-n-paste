{{#includeExamples}}import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BalanceExample } from "@/components/examples/BalanceExample"
import { BlockInfoExample } from "@/components/examples/BlockInfoExample"
import { StorageExample } from "@/components/examples/StorageExample"

type ExampleTab = 'balance' | 'blocks' | 'storage'

export function ExamplePages() {
  const [activeTab, setActiveTab] = useState<ExampleTab>('balance')

  const examples = [
    {
      id: 'balance' as ExampleTab,
      title: 'Balance Queries',
      description: 'Query account balances and information',
      component: <BalanceExample />,
      difficulty: 'Beginner'
    },
    {
      id: 'blocks' as ExampleTab,
      title: 'Block Information',
      description: 'Real-time block data and subscriptions',
      component: <BlockInfoExample />,
      difficulty: 'Beginner'
    },
    {
      id: 'storage' as ExampleTab,
      title: 'Storage Queries',
      description: 'Advanced storage queries and metadata',
      component: <StorageExample />,
      difficulty: 'Intermediate'
    }
  ]

  const activeExample = examples.find(ex => ex.id === activeTab)!

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Examples</h2>
        <p className="text-muted-foreground">
          Interactive examples showing common PAPI patterns and use cases
        </p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PAPI Examples</CardTitle>
              <CardDescription>Learn by exploring these interactive examples</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {activeExample.difficulty}
            </Badge>
          </div>
          
          <div className="flex space-x-2 pt-4">
            {examples.map((example) => (
              <Button
                key={example.id}
                variant={activeTab === example.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(example.id)}
              >
                {example.title}
              </Button>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{activeExample.title}</h3>
              <p className="text-muted-foreground">{activeExample.description}</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-muted/20">
              {activeExample.component}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Resources</CardTitle>
            <CardDescription>Helpful links and documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <a 
                href="https://papi.how" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 rounded-md border hover:bg-accent transition-colors"
              >
                <div className="font-medium">Polkadot API Documentation</div>
                <div className="text-sm text-muted-foreground">Complete guide and API reference</div>
              </a>
              
              <a 
                href="https://papi.how/examples" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 rounded-md border hover:bg-accent transition-colors"
              >
                <div className="font-medium">More Examples</div>
                <div className="text-sm text-muted-foreground">Extended examples and use cases</div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Code Structure</CardTitle>
            <CardDescription>Understanding the example patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">typedApi.query.*</code>
                <div className="text-muted-foreground">Storage queries</div>
              </div>
              
              <div>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">typedApi.constants.*</code>
                <div className="text-muted-foreground">Chain constants</div>
              </div>
              
              <div>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">client.*Block$</code>
                <div className="text-muted-foreground">Real-time subscriptions</div>
              </div>
              
              <div>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">Subscribe component</code>
                <div className="text-muted-foreground">React integration</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}{{/includeExamples}}