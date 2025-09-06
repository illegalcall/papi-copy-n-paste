"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Label } from "@workspace/ui/components/label"

export interface QueryOption {
  value: string
  label: string
  description: string
  category: 'basic' | 'observable' | 'advanced' | 'complete'
  useCase: string
  returnType: string
  performance: string
  icon: string
}

export const ENHANCED_STORAGE_QUERY_TYPES: QueryOption[] = [
  // Basic Promise-based queries
  { 
    value: 'getValue', 
    label: 'Get Value', 
    description: 'Get single storage value once', 
    category: 'basic',
    useCase: 'Perfect for: One-time checks, transaction validation, balance lookups',
    returnType: 'Promise<T>',
    performance: '⚡ Fast (~50ms)',
    icon: '📊'
  },
  { 
    value: 'getValueAt', 
    label: 'Get Value At Block', 
    description: 'Get value at specific block (finalized/best)', 
    category: 'basic',
    useCase: 'Perfect for: Historical data, audit trails, specific block analysis',
    returnType: 'Promise<T>',
    performance: '⚡ Fast (~80ms)',
    icon: '🎯'
  },
  { 
    value: 'getValues', 
    label: 'Get Multiple Values', 
    description: 'Get multiple values with different keys', 
    category: 'basic',
    useCase: 'Perfect for: Bulk operations, multiple accounts, batch processing',
    returnType: 'Promise<T[]>',
    performance: '📊 Batch (~100ms)',
    icon: '📋'
  },
  { 
    value: 'getEntries', 
    label: 'Get All Entries', 
    description: 'Get all storage entries or partial matches', 
    category: 'basic',
    useCase: 'Perfect for: Data export, analysis tools, complete storage dumps',
    returnType: 'Promise<Map>',
    performance: '📈 Heavy (500ms+)',
    icon: '🗃️'
  },
  
  // Observable queries
  { 
    value: 'watchValue', 
    label: 'Watch Value', 
    description: 'Monitor value changes in real-time', 
    category: 'observable',
    useCase: 'Perfect for: Dashboards, live displays, real-time balance monitoring',
    returnType: 'Observable<T>',
    performance: '🔄 Continuous updates',
    icon: '📡'
  },
  { 
    value: 'watchValueFinalized', 
    label: 'Watch Value - Finalized', 
    description: 'Watch value changes on finalized blocks only', 
    category: 'observable',
    useCase: 'Perfect for: Secure applications, confirmed transactions only',
    returnType: 'Observable<T>',
    performance: '🔄 Slower but safer',
    icon: '🔒'
  },
  { 
    value: 'watchValueBest', 
    label: 'Watch Value - Best', 
    description: 'Watch value changes on best blocks (faster)', 
    category: 'observable',
    useCase: 'Perfect for: Fast UIs, immediate feedback, pending transactions',
    returnType: 'Observable<T>',
    performance: '🔄 Fastest updates',
    icon: '⚡'
  },
  { 
    value: 'watchEntries', 
    label: 'Watch All Entries', 
    description: 'Watch all entries with deltas', 
    category: 'observable',
    useCase: 'Perfect for: Monitoring tools, system analysis, change tracking',
    returnType: 'Observable<Map>',
    performance: '🔄 Heavy continuous',
    icon: '🌊'
  },
  { 
    value: 'watchEntriesPartial', 
    label: 'Watch Partial Entries', 
    description: 'Watch entries with partial key matching', 
    category: 'observable',
    useCase: 'Perfect for: Filtered monitoring, specific account groups',
    returnType: 'Observable<Map>',
    performance: '🔄 Moderate load',
    icon: '🎚️'
  },
  
  // Advanced patterns
  { 
    value: 'multiWatch', 
    label: 'Multi-Storage Watch', 
    description: 'Combine multiple storage observables', 
    category: 'advanced',
    useCase: 'Perfect for: Complex dashboards, correlated data monitoring',
    returnType: 'Observable<Combined>',
    performance: '🚀 Advanced patterns',
    icon: '🔗'
  },
  { 
    value: 'conditionalWatch', 
    label: 'Conditional Watch', 
    description: 'Watch with filtering and conditions', 
    category: 'advanced',
    useCase: 'Perfect for: Conditional logic, filtered updates, smart contracts',
    returnType: 'Observable<T>',
    performance: '🧠 Intelligent filtering',
    icon: '🎛️'
  },
  { 
    value: 'throttledWatch', 
    label: 'Throttled Watch', 
    description: 'Watch with rate limiting for performance', 
    category: 'advanced',
    useCase: 'Perfect for: High-frequency data, performance optimization',
    returnType: 'Observable<T>',
    performance: '🎯 Rate limited',
    icon: '⏱️'
  },
  
  // Complete example
  { 
    value: 'comprehensive', 
    label: 'All Patterns', 
    description: 'Complete example with all query types', 
    category: 'complete',
    useCase: 'Perfect for: Learning, reference implementation, full examples',
    returnType: 'Multiple examples',
    performance: '📚 Educational',
    icon: '🎓'
  }
]

interface EnhancedQuerySelectorProps {
  value: string
  onValueChange: (value: string) => void
  storageName?: string
}

export function EnhancedQuerySelector({ 
  value, 
  onValueChange, 
  storageName 
}: EnhancedQuerySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedOption = ENHANCED_STORAGE_QUERY_TYPES.find(option => option.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get smart suggestions based on storage context
  const getSmartSuggestions = () => {
    const suggestions: QueryOption[] = []
    
    // Context-aware recommendations
    if (storageName?.toLowerCase().includes('account') || storageName?.toLowerCase().includes('balance')) {
      suggestions.push(
        ENHANCED_STORAGE_QUERY_TYPES.find(opt => opt.value === 'getValue')!,
        ENHANCED_STORAGE_QUERY_TYPES.find(opt => opt.value === 'watchValue')!
      )
    }
    
    if (storageName?.toLowerCase().includes('total') || storageName?.toLowerCase().includes('supply')) {
      suggestions.push(
        ENHANCED_STORAGE_QUERY_TYPES.find(opt => opt.value === 'getValue')!,
        ENHANCED_STORAGE_QUERY_TYPES.find(opt => opt.value === 'watchValue')!
      )
    }

    // If no specific suggestions, use general recommendations
    if (suggestions.length === 0) {
      // Return basic commonly used options
      return ENHANCED_STORAGE_QUERY_TYPES.filter(opt => opt.category === 'basic').slice(0, 2)
    }

    return suggestions.filter(Boolean)
  }

  const smartSuggestions = getSmartSuggestions()
  const categorizedOptions = {
    suggestions: smartSuggestions,
    basic: ENHANCED_STORAGE_QUERY_TYPES.filter(opt => opt.category === 'basic'),
    observable: ENHANCED_STORAGE_QUERY_TYPES.filter(opt => opt.category === 'observable'),
    advanced: ENHANCED_STORAGE_QUERY_TYPES.filter(opt => opt.category === 'advanced'),
    complete: ENHANCED_STORAGE_QUERY_TYPES.filter(opt => opt.category === 'complete')
  }

  const handleOptionSelect = (option: QueryOption) => {
    onValueChange(option.value)
    setIsOpen(false)
  }

  const CategorySection = ({ 
    title, 
    icon, 
    options 
  }: { 
    title: string
    icon: string
    options: QueryOption[]
  }) => (
    <div className="category-section">
      <div className="flex items-center px-3 py-1.5 bg-muted/20">
        <div className="flex items-center space-x-2">
          <span className="text-xs">{icon}</span>
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        {options.map(option => (
          <div
            key={option.value}
            className={`
              cursor-pointer px-3 py-2 hover:bg-muted/30 transition-colors
              ${value === option.value ? 'bg-primary/10 border-l-2 border-primary' : ''}
            `}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs">{option.icon}</span>
                <span className="text-xs text-muted-foreground">
                  {value === option.value ? '●' : '○'}
                </span>
                <span className="text-xs">{option.label}</span>
              </div>
              <Badge 
                variant={
                  option.category === 'basic' ? 'default' :
                  option.category === 'observable' ? 'secondary' :
                  option.category === 'advanced' ? 'destructive' : 'outline'
                }
                className="text-xs px-1.5"
              >
                {option.category}
              </Badge>
            </div>
            
            <div className="ml-5 mt-0.5">
              <div className="text-xs text-muted-foreground/80">
                {option.useCase}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-2">
      <Label htmlFor="queryType" className="flex items-center space-x-2">
        <span>Query Type</span>
        <HelpCircle className="w-3 h-3 text-muted-foreground" />
      </Label>
      
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          className={`
            w-full flex items-center justify-between px-3 py-2 
            border border-input rounded-md bg-background text-sm
            hover:bg-accent hover:text-accent-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${isOpen ? 'ring-2 ring-ring ring-offset-2' : ''}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-2">
            {selectedOption && (
              <>
                <span>{selectedOption.icon}</span>
                <span>{selectedOption.label}</span>
                <Badge 
                  variant={
                    selectedOption.category === 'basic' ? 'default' :
                    selectedOption.category === 'observable' ? 'secondary' :
                    selectedOption.category === 'advanced' ? 'destructive' : 'outline'
                  }
                  className="text-xs px-1.5"
                >
                  {selectedOption.category}
                </Badge>
              </>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg">
            <div className="max-h-[400px] overflow-y-auto">
              
              {/* Smart Suggestions */}
              <CategorySection
                title="RECOMMENDED"
                icon="⭐"
                options={smartSuggestions}
              />

              {/* All Categories */}
              <div className="border-t border-border">
                <CategorySection
                  title="BASIC"
                  icon="📊"
                  options={categorizedOptions.basic}
                />
              </div>

              <div className="border-t border-border">
                <CategorySection
                  title="OBSERVABLE"
                  icon="🔄"
                  options={categorizedOptions.observable}
                />
              </div>

              <div className="border-t border-border">
                <CategorySection
                  title="ADVANCED"
                  icon="⚡"
                  options={categorizedOptions.advanced}
                />
              </div>

              <div className="border-t border-border">
                <CategorySection
                  title="EXAMPLES"
                  icon="🎓"
                  options={categorizedOptions.complete}
                />
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <div className="text-xs text-muted-foreground">
          {selectedOption.useCase}
        </div>
      )}
    </div>
  )
}