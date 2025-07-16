"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Badge } from "@workspace/ui/components/badge"
import { Label } from "@workspace/ui/components/label"
import { PalletCall } from "@workspace/core"

interface SimpleCallFormProps {
  pallet: string
  call: PalletCall
  onFormChange: (formData: Record<string, any>) => void
  onValidChange: (isValid: boolean) => void
}

export function SimpleCallForm({ pallet, call, onFormChange, onValidChange }: SimpleCallFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // Initialize form data when call changes
  useEffect(() => {
    const initialData: Record<string, any> = {}
    call.args.forEach(arg => {
      initialData[arg.name] = getDefaultValue(arg.type)
    })
    setFormData(initialData)
    setInitialValues(initialData)
  }, [call])

  // Notify parent of changes
  useEffect(() => {
    onFormChange(formData)

    // Validation logic:
    // - If call has no parameters, disable run button (no input = can't run)
    // - If call has parameters, check if user has modified any values from defaults
    const hasUserInput = call.args.length > 0 && call.args.some(arg => {
      const currentValue = formData[arg.name]
      const initialValue = initialValues[arg.name]
      return currentValue !== initialValue
    })
    onValidChange(hasUserInput)
  }, [formData, initialValues, call.args, onFormChange, onValidChange])

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const renderField = (arg: { name: string; type: string }) => {
    const fieldType = parseSimpleType(arg.type)
    const value = formData[arg.name] || ''

    return (
      <div key={arg.name} className="space-y-2">
        <Label className="flex items-center gap-2">
          {arg.name}
          <Badge variant="outline" className="text-xs">
            {arg.type}
          </Badge>
        </Label>
        
        {fieldType === 'bool' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) => handleFieldChange(arg.name, checked)}
            />
            <Label>Enable</Label>
          </div>
        )}
        
        {fieldType === 'number' && (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(arg.name, Number(e.target.value) || 0)}
            placeholder={`Enter ${arg.name}`}
          />
        )}
        
        {fieldType === 'account' && (
          <Select value={value} onValueChange={(val) => handleFieldChange(arg.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="//Alice">Alice (//Alice)</SelectItem>
              <SelectItem value="//Bob">Bob (//Bob)</SelectItem>
              <SelectItem value="//Charlie">Charlie (//Charlie)</SelectItem>
              <SelectItem value="//Dave">Dave (//Dave)</SelectItem>
              <SelectItem value="//Eve">Eve (//Eve)</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {fieldType === 'string' && (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(arg.name, e.target.value)}
            placeholder={`Enter ${arg.name}`}
          />
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {pallet}.{call.name}
        </CardTitle>
        <CardDescription>
          {call.docs.length > 0 ? call.docs.join(' ') : 'Configure the parameters for this call'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {call.args.map(renderField)}
          
          {call.args.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              This call has no parameters
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function parseSimpleType(type: string): string {
  if (type.includes('Bool') || type === 'bool') return 'bool'
  if (type.includes('AccountId') || type.includes('MultiAddress')) return 'account'
  if (type.includes('u8') || type.includes('u16') || type.includes('u32') || type.includes('u64') || type.includes('u128') || type.includes('Compact')) return 'number'
  return 'string'
}

function getDefaultValue(type: string): any {
  const simpleType = parseSimpleType(type)
  switch (simpleType) {
    case 'bool': return false
    case 'number': return 0
    case 'account': return '//Alice'
    default: return ''
  }
}