"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Label } from "@workspace/ui/components/label"

export interface QueryOption {
  value: string
  label: string
  description: string
  useCase: string
  returnType: string
  performance: string
  icon: string
}

export const ENHANCED_STORAGE_QUERY_TYPES: QueryOption[] = [
  { 
    value: 'getValue', 
    label: 'Get Value', 
    description: 'Get single storage value once', 
    useCase: 'Perfect for: One-time checks, transaction validation, balance lookups',
    returnType: 'Promise<T>',
    performance: 'Fast (~50ms)',
    icon: ''
  },
  { 
    value: 'getValueAt', 
    label: 'Get Value At Block', 
    description: 'Get value at specific block (finalized/best)', 
    useCase: 'Perfect for: Historical data, audit trails, specific block analysis',
    returnType: 'Promise<T>',
    performance: 'Fast (~80ms)',
    icon: ''
  },
  { 
    value: 'getValues', 
    label: 'Get Multiple Values', 
    description: 'Get multiple values with different keys', 
    useCase: 'Perfect for: Bulk operations, multiple accounts, batch processing',
    returnType: 'Promise<T[]>',
    performance: 'Batch (~100ms)',
    icon: ''
  },
  { 
    value: 'getEntries', 
    label: 'Get All Entries', 
    description: 'Get all storage entries or partial matches', 
    useCase: 'Perfect for: Data export, analysis tools, complete storage dumps',
    returnType: 'Promise<Map>',
    performance: 'Heavy (500ms+)',
    icon: ''
  },
  { 
    value: 'watchValue', 
    label: 'Watch Value', 
    description: 'Monitor value changes in real-time', 
    useCase: 'Perfect for: Dashboards, live displays, real-time balance monitoring',
    returnType: 'Observable<T>',
    performance: 'Continuous updates',
    icon: ''
  },
  { 
    value: 'watchValueFinalized', 
    label: 'Watch Value - Finalized', 
    description: 'Watch value changes on finalized blocks only', 
    useCase: 'Perfect for: Secure applications, confirmed transactions only',
    returnType: 'Observable<T>',
    performance: 'Slower but safer',
    icon: ''
  },
  { 
    value: 'watchValueBest', 
    label: 'Watch Value - Best', 
    description: 'Watch value changes on best blocks (faster)', 
    useCase: 'Perfect for: Fast UIs, immediate feedback, pending transactions',
    returnType: 'Observable<T>',
    performance: 'Fastest updates',
    icon: ''
  },
  { 
    value: 'watchEntries', 
    label: 'Watch All Entries', 
    description: 'Watch all entries with deltas', 
    useCase: 'Perfect for: Monitoring tools, system analysis, change tracking',
    returnType: 'Observable<Map>',
    performance: 'Heavy continuous',
    icon: ''
  },
  { 
    value: 'watchEntriesPartial', 
    label: 'Watch Partial Entries', 
    description: 'Watch entries with partial key matching', 
    useCase: 'Perfect for: Filtered monitoring, specific account groups',
    returnType: 'Observable<Map>',
    performance: 'Moderate load',
    icon: ''
  },
  { 
    value: 'multiWatch', 
    label: 'Multi-Storage Watch', 
    description: 'Combine multiple storage observables', 
    useCase: 'Perfect for: Complex dashboards, correlated data monitoring',
    returnType: 'Observable<Combined>',
    performance: 'Advanced patterns',
    icon: ''
  },
  { 
    value: 'conditionalWatch', 
    label: 'Conditional Watch', 
    description: 'Watch with filtering and conditions', 
    useCase: 'Perfect for: Conditional logic, filtered updates, smart contracts',
    returnType: 'Observable<T>',
    performance: 'Intelligent filtering',
    icon: ''
  },
  { 
    value: 'throttledWatch', 
    label: 'Throttled Watch', 
    description: 'Watch with rate limiting for performance', 
    useCase: 'Perfect for: High-frequency data, performance optimization',
    returnType: 'Observable<T>',
    performance: 'Rate limited',
    icon: ''
  },
  { 
    value: 'comprehensive', 
    label: 'All Patterns', 
    description: 'Complete example with all query types', 
    useCase: 'Perfect for: Learning, reference implementation, full examples',
    returnType: 'Multiple examples',
    performance: 'Educational',
    icon: ''
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

  const allOptions = ENHANCED_STORAGE_QUERY_TYPES

  const handleOptionSelect = (option: QueryOption) => {
    onValueChange(option.value)
    setIsOpen(false)
  }

  const OptionItem = ({ option }: { option: QueryOption }) => (
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
          <span className="text-xs text-muted-foreground">
            {value === option.value ? '●' : '○'}
          </span>
          <span className="text-xs">{option.label}</span>
        </div>
      </div>
      
      <div className="ml-5 mt-0.5 space-y-1">
        <div className="text-xs text-muted-foreground/80">
          {option.useCase}
        </div>
        <div className="text-xs text-blue-600 font-mono">
          Returns: {option.returnType}
        </div>
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
              <span>{selectedOption.label}</span>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="space-y-1">
                {allOptions.map(option => (
                  <OptionItem key={option.value} option={option} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <div className="text-xs text-muted-foreground space-y-1">
          <div>{selectedOption.useCase}</div>
          <div className="text-blue-600 font-mono">
            Returns: {selectedOption.returnType} | {selectedOption.performance}
          </div>
        </div>
      )}
    </div>
  )
}