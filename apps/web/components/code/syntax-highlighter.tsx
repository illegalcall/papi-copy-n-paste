"use client"

import { useEffect } from "react"
import Prism from "prismjs"

// Import TypeScript language definition
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"

interface SyntaxHighlighterProps {
  code: string
  language?: string
  className?: string
}

export function SyntaxHighlighter({ code, language = "typescript", className = "" }: SyntaxHighlighterProps) {
  useEffect(() => {
    // Highlight all code blocks
    Prism.highlightAll()
  }, [code])

  if (!code.trim()) {
    return (
      <div className={`text-muted-foreground italic ${className}`}>
        {`// Select a pallet call to generate code`}
      </div>
    )
  }

  // Get the language grammar, with fallbacks
  const grammar = Prism.languages[language] || 
                  Prism.languages.typescript || 
                  Prism.languages.javascript ||
                  {}

  let highlightedCode: string
  try {
    highlightedCode = Prism.highlight(code, grammar as any, language)
  } catch {
    // Fallback to plain text if highlighting fails
    highlightedCode = code
  }

  return (
    <pre className={`${className} overflow-x-auto`}>
      <code 
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: highlightedCode
        }}
      />
    </pre>
  )
}