"use client"

import { Button } from "@workspace/ui/components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@workspace/ui/components/navigation-menu"
import { Moon, Sun, Github, BookOpen } from "lucide-react"
import { useTheme } from "next-themes"
import { chains } from "@workspace/core"

interface HeaderProps {
  selectedChain: string
  onChainChange: (chain: string) => void
}

export function Header({ selectedChain, onChainChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center px-6 h-12 border-b bg-background">
      <div className="flex items-center gap-4">
        <div className="font-bold text-lg">
          Copy‑n‑Paste PAPI
        </div>
        
        <Select value={selectedChain} onValueChange={onChainChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent>
            {chains.map((chain) => (
              <SelectItem key={chain.key} value={chain.key}>
                {chain.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/polkadot-api/polkadot-api" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <a href="https://papi.how" target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4" />
            <span className="sr-only">Documentation</span>
          </a>
        </Button>
      </div>
    </header>
  )
}