
import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'
import type { EnumVariant } from '@/utils/metadataAnalyzer'

interface EnumVariantSelectorProps {
  variants: EnumVariant[]
  value?: string
  onValueChange: (value: string | null) => void
  placeholder?: string
  className?: string
}

export function EnumVariantSelector({
  variants,
  value,
  onValueChange,
  placeholder = "Select variant...",
  className
}: EnumVariantSelectorProps) {
  const [open, setOpen] = useState(false)

  // Format options with type hints (like PAPI Console)
  const options = variants.map(variant => ({
    value: variant.name,
    text: variant.name + getTypeHint(variant),
    description: variant.description
  }))

  const selectedOption = options.find(option => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? (
            <span className="truncate">{selectedOption.text}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter variants..." />
          <CommandEmpty>No variants found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(selectedValue: string) => {
                    const newValue = selectedValue === value ? null : selectedValue
                    onValueChange(newValue)
                    setOpen(false)
                  }}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{option.text}</span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                  {option.description && (
                    <span className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Generate type hint for enum variant (following PAPI Console pattern)
 */
function getTypeHint(variant: EnumVariant): string {
  if (variant.type === 'void') {
    return '' // No type hint for void variants
  }

  if (variant.dataType) {
    // Show the data type in parentheses
    switch (variant.dataType) {
      case 'AccountId32':
      case 'AccountId20':
        return ` (${variant.dataType})`
      case 'u32':
      case 'u64':
      case 'u128':
        return ` (${variant.dataType})`
      case 'Compact<u128>':
        return ' (Balance)'
      case 'bytes':
        return ' (Bytes)'
      default:
        // Show simplified type for complex types
        if (variant.dataType.startsWith('Compact<')) {
          return ' (Balance)'
        }
        if (variant.dataType.startsWith('Vec<')) {
          return ' (Array)'
        }
        if (variant.dataType.startsWith('[')) {
          return ' (Array)'
        }
        return ` (${variant.dataType})`
    }
  }

  return ' (Data)'
}