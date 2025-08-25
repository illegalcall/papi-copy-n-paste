
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Label } from '@workspace/ui/components/label'
import { cn } from '@workspace/ui/lib/utils'
import type { ParameterInfo } from '@/utils/metadataAnalyzer'

interface OptionalParameterFieldProps {
  parameter: ParameterInfo
  children: React.ReactNode
  value?: unknown
  onToggle?: (enabled: boolean) => void
  className?: string
}

export function OptionalParameterField({
  parameter,
  children,
  value,
  onToggle,
  className
}: OptionalParameterFieldProps) {
  const [isEnabled, setIsEnabled] = useState(Boolean(value))

  const handleToggle = () => {
    const newEnabled = !isEnabled
    setIsEnabled(newEnabled)
    onToggle?.(newEnabled)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-muted-foreground">
          {parameter.name}
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            optional
          </span>
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="h-8 w-8 p-0"
        >
          {isEnabled ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      </div>

      {parameter.description && (
        <p className="text-xs text-muted-foreground">
          {parameter.description}
        </p>
      )}

      {isEnabled && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}