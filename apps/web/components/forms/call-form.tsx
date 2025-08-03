"use client"

import { useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Checkbox } from "@workspace/ui/components/checkbox"
// Button import removed as not currently used
import { Badge } from "@workspace/ui/components/badge"
import { PalletCall } from "@workspace/core"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface CallFormProps {
  pallet: string
  call: PalletCall
  onFormChange: (formData: Record<string, any>) => void
  onValidChange: (isValid: boolean) => void
}

export function CallForm({ pallet, call, onFormChange, onValidChange }: CallFormProps) {
  // Generate a unique key for the call to force form remount on call change
  const callKey = `${pallet}-${call.name}-${call.args.length}`
  
  // Generate schema and default values from call args
  const { schema, defaultValues } = useMemo(() => {
    const schemaShape: Record<string, z.ZodTypeAny> = {}
    const defaults: Record<string, any> = {}

    call.args.forEach((arg) => {
      const { zodType, defaultValue } = mapTypeToZodSchema(arg.type)
      schemaShape[arg.name] = zodType
      defaults[arg.name] = defaultValue
    })

    return {
      schema: z.object(schemaShape),
      defaultValues: defaults
    }
  }, [callKey]) // Use callKey instead of call to avoid object comparison

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange"
  })

  const watchedValues = form.watch()

  useEffect(() => {
    onFormChange(watchedValues)
    // Validation logic:
    // - If call has no parameters, disable run button (no input = can't run)
    // - If call has parameters, check if user has modified any values from defaults
    const hasUserInput = call.args.length > 0 && call.args.some(arg => {
      const currentValue = watchedValues[arg.name]
      const defaultValue = defaultValues[arg.name]
      return currentValue !== defaultValue
    })
    const isValid = hasUserInput && form.formState.isValid
    onValidChange(isValid)
  }, [watchedValues, form.formState.isValid, onFormChange, onValidChange, call.args, defaultValues])

  const renderField = (arg: { name: string; type: string }) => {
    const fieldType = parseType(arg.type)
    
    return (
      <FormField
        key={arg.name}
        control={form.control}
        name={arg.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              {arg.name}
              <Badge variant="outline" className="text-xs">
                {arg.type}
              </Badge>
            </FormLabel>
            <FormControl>
              {renderInputComponent(fieldType, field)}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  const renderInputComponent = (fieldType: FieldType, field: any) => {
    switch (fieldType.base) {
      case 'bool':
        return (
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )
      
      case 'string':
        return (
          <Input
            {...field}
            placeholder={`Enter ${fieldType.base}`}
          />
        )
      
      case 'number':
        return (
          <Input
            {...field}
            type="number"
            placeholder={`Enter ${fieldType.base}`}
            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
          />
        )
      
      case 'enum':
        return (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {fieldType.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'accountid':
        return (
          <Select onValueChange={field.onChange} value={field.value}>
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
        )
      
      default:
        return (
          <Input
            {...field}
            placeholder={`Enter value`}
          />
        )
    }
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
        <Form {...form}>
          <form className="space-y-4">
            {call.args.map(renderField)}
            
            {call.args.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                This call has no parameters
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

interface FieldType {
  base: string
  options?: string[]
  isOptional?: boolean
}

function parseType(type: string): FieldType {
  // Handle common Substrate types
  if (type.includes('Bool') || type === 'bool') {
    return { base: 'bool' }
  }
  
  if (type.includes('AccountId') || type.includes('MultiAddress')) {
    return { base: 'accountid' }
  }
  
  if (type.includes('u8') || type.includes('u16') || type.includes('u32') || type.includes('u64') || type.includes('u128') || type.includes('Compact')) {
    return { base: 'number' }
  }
  
  if (type.includes('String') || type.includes('Vec<u8>') || type.includes('Bytes')) {
    return { base: 'string' }
  }
  
  // Handle enums (simplified)
  if (type.includes('{') && type.includes('}')) {
    return { base: 'enum', options: ['Option1', 'Option2'] }
  }
  
  return { base: 'string' }
}

function mapTypeToZodSchema(type: string): { zodType: z.ZodTypeAny; defaultValue: any } {
  const fieldType = parseType(type)
  
  switch (fieldType.base) {
    case 'bool':
      return { zodType: z.boolean(), defaultValue: false }
    
    case 'number':
      return { zodType: z.number().min(0), defaultValue: 0 }
    
    case 'string':
      return { zodType: z.string().min(1), defaultValue: '' }
    
    case 'accountid':
      return { zodType: z.string().min(1), defaultValue: '//Bob' }
    
    case 'enum':
      return { 
        zodType: z.enum(['Option1', 'Option2'] as [string, ...string[]]), 
        defaultValue: 'Option1' 
      }
    
    default:
      return { zodType: z.string(), defaultValue: '' }
  }
}