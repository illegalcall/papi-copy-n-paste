import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChainSelector } from "@/components/chain/ChainSelector"

interface HeaderProps {
  currentPage: 'dashboard'{{#includeExamples}} | 'examples'{{/includeExamples}}
  onPageChange: (page: 'dashboard'{{#includeExamples}} | 'examples'{{/includeExamples}}) => void
  isConnected: boolean
}

export function Header({ currentPage, onPageChange, isConnected }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="polkadot-gradient w-8 h-8 rounded-full" />
          <div>
            <h1 className="text-lg font-semibold">{{projectName}}</h1>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className="chain-badge-{{chainName}} text-xs"
              >
                {{chainDisplayName}}
              </Badge>
              {/* Simple connection indicator */}
              <Badge 
                variant={isConnected ? "default" : "secondary"}
                className="text-xs"
              >
                {isConnected ? "Connected" : "Connecting"}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <Button
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPageChange('dashboard')}
          >
            Dashboard
          </Button>
          
          {{#includeExamples}}
          <Button
            variant={currentPage === 'examples' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPageChange('examples')}
          >
            Examples
          </Button>
          {{/includeExamples}}
          
          <ChainSelector />
        </nav>
      </div>
    </header>
  )
}