import { useState } from "react"
import { useStateObservable } from "@react-rxjs/core"
import { hasConnected$ } from "@/lib/chain"
import { Header } from "@/components/Header"
import { LoadingScreen } from "@/components/LoadingScreen"
import { Dashboard } from "@/pages/Dashboard"
{{#includeExamples}}import { ExamplePages } from "@/pages/ExamplePages"{{/includeExamples}}

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard'{{#includeExamples}} | 'examples'{{/includeExamples}}>('dashboard')
  const isConnected = useStateObservable(hasConnected$)

  if (!isConnected) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isConnected={isConnected}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && <Dashboard />}
        {{#includeExamples}}{currentPage === 'examples' && <ExamplePages />}{{/includeExamples}}
      </main>
      
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>
            Built with{" "}
            <a 
              href="https://papi.how" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Polkadot API
            </a>{" "}
            • Connected to {{chainDisplayName}}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App