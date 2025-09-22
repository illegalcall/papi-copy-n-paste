
import React, { useState, useEffect } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { Textarea } from '@workspace/ui/components/textarea'
import { Badge } from '@workspace/ui/components/badge'
import { EnumVariantSelector } from './EnumVariantSelector'
import type { ParameterInfo, EnumVariant } from '@/utils/metadataAnalyzer'
import { cn } from '@workspace/ui/lib/utils'

interface EnumParameterFieldProps {
  parameter: ParameterInfo
  value?: unknown
  onChange: (value: unknown) => void
  className?: string
}

export function EnumParameterField({
  parameter,
  value,
  onChange,
  className
}: EnumParameterFieldProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [variantData, setVariantData] = useState<unknown>(null)

  // Initialize from value
  useEffect(() => {
    if (value && typeof value === 'object' && 'type' in value) {
      setSelectedVariant((value as any).type)
      setVariantData((value as any).value || null)
    } else if (typeof value === 'string') {
      setSelectedVariant(value)
      setVariantData(null)
    }
  }, [value])

  // Get the selected variant info
  const selectedVariantInfo = parameter.enumVariants?.find(v => v.name === selectedVariant)

  const handleVariantChange = (variantName: string | null) => {
    setSelectedVariant(variantName)

    if (!variantName) {
      setVariantData(null)
      onChange(null)
      return
    }

    const variant = parameter.enumVariants?.find(v => v.name === variantName)
    if (!variant) return

    if (variant.type === 'void') {
      // Void variant - no data needed
      setVariantData(null)
      onChange({ type: variantName, value: null })
    } else {
      // Data variant - needs data input
      const defaultData = getDefaultValueForVariant(variant)
      setVariantData(defaultData)
      onChange({ type: variantName, value: defaultData })
    }
  }

  const handleDataChange = (newData: unknown) => {
    setVariantData(newData)
    onChange({
      type: selectedVariant,
      value: newData
    })
  }

  if (!parameter.enumVariants) {
    return (
      <div className={cn("space-y-2", className)}>
        <Label>
          {parameter.name}
          <Badge variant="outline" className="ml-2 text-xs">
            {parameter.type}
          </Badge>
        </Label>
        <Input
          value={typeof value === 'string' ? value : (value ? String(value) : '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${parameter.name}`}
        />
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <Label>
          {parameter.name}
          <Badge variant="outline" className="ml-2 text-xs">
            {parameter.type}
          </Badge>
        </Label>

        {parameter.description && (
          <p className="text-xs text-muted-foreground">
            {parameter.description}
          </p>
        )}

        <EnumVariantSelector
          variants={parameter.enumVariants}
          value={selectedVariant || undefined}
          onValueChange={handleVariantChange}
          placeholder={`Select ${parameter.name} variant...`}
        />
      </div>

      {selectedVariant && selectedVariantInfo && selectedVariantInfo.type === 'data' && (
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          <Label className="text-sm text-muted-foreground">
            {selectedVariantInfo.name} Data
            {selectedVariantInfo.dataType && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {selectedVariantInfo.dataType}
              </Badge>
            )}
          </Label>

          {renderDataInput(selectedVariantInfo, variantData, handleDataChange)}
        </div>
      )}
    </div>
  )
}

/**
 * Render appropriate input for variant data type
 */
function renderDataInput(variant: EnumVariant, value: unknown, onChange: (value: unknown) => void) {
  const dataType = variant.dataType || 'unknown'

  // Handle different data types
  if (dataType.includes('AccountId') || dataType === 'SS58String') {
    return (
      <Input
        type="text"
        value={typeof value === 'string' ? value : (value ? String(value) : '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder="5GrwvaEF5zXb26Fz... or //Alice"
        className="font-mono text-sm"
      />
    )
  }

  if (dataType.startsWith('Compact<') || dataType.includes('Balance') ||
      dataType.includes('u32') || dataType.includes('u64') || dataType.includes('u128')) {
    return (
      <Input
        type="number"
        value={typeof value === 'string' ? value : (value ? String(value) : '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        min="0"
      />
    )
  }

  if (dataType === 'bool') {
    return (
      <select
        value={typeof value === 'boolean' ? String(value) : (value ? String(value) : 'false')}
        onChange={(e) => onChange(e.target.value === 'true')}
        className="w-full p-2 border rounded"
      >
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    )
  }

  if (dataType === 'bytes' || dataType.startsWith('Vec<u8>')) {
    return (
      <Input
        type="text"
        value={typeof value === 'string' ? value : (value ? String(value) : '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0x..."
        className="font-mono text-sm"
      />
    )
  }

  if (dataType.startsWith('Vec<')) {
    return (
      <Textarea
        value={Array.isArray(value) ? JSON.stringify(value, null, 2) : (typeof value === 'string' ? value : (value ? String(value) : ''))}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          try {
            const parsed = JSON.parse(e.target.value)
            onChange(parsed)
          } catch {
            onChange(e.target.value)
          }
        }}
        placeholder="[]"
        className="font-mono text-sm"
        rows={3}
      />
    )
  }

  // Default to text input
  return (
    <Input
      type="text"
      value={typeof value === 'string' ? value : (value ? String(value) : '')}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter ${variant.name} data`}
    />
  )
}

/**
 * Get default value for variant data type
 */
function getDefaultValueForVariant(variant: EnumVariant): unknown {
  const dataType = variant.dataType || 'unknown'

  if (dataType.includes('AccountId')) return ''
  if (dataType.startsWith('Compact<') || dataType.includes('Balance')) return '0'
  if (dataType.includes('u32') || dataType.includes('u64') || dataType.includes('u128')) return '0'
  if (dataType === 'bool') return false
  if (dataType === 'bytes') return '0x'
  if (dataType.startsWith('Vec<')) return []

  return ''
}