/**
 * EnhancedCallForm - New call form using rich metadata approach
 *
 * Replaces SimpleCallForm with POC-based parameter detection
 */

"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { EnumParameterField } from "./EnumParameterField";
import { OptionalParameterField } from "./OptionalParameterField";
import { getCallParameterInfo } from "@/utils/callParameterDetection";
import type { CallParameterInfo } from "@/utils/callParameterDetection";
import type { ParameterInfo } from "@/utils/metadataAnalyzer";
import type { PalletCall } from "@workspace/core";
import type { FormData, FormChangeHandler, ValidChangeHandler } from "../../types/forms";

interface EnhancedCallFormProps {
  pallet: string;
  callName: string;
  onFormChange: FormChangeHandler;
  onValidChange: ValidChangeHandler;
  chainKey: string;
  selectedCall?: { pallet: string; call: PalletCall } | null;
}

export function EnhancedCallForm({
  pallet,
  callName,
  onFormChange,
  onValidChange,
  chainKey,
  selectedCall,
}: EnhancedCallFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [parameterInfo, setParameterInfo] = useState<CallParameterInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  // Load parameter information
  useEffect(() => {
    let isCancelled = false;

    const loadParameterInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const info = await getCallParameterInfo(chainKey, pallet, callName);

        if (!isCancelled) {
          setParameterInfo(info);

          // Initialize form data with default values
          const initialData: FormData = {};
          info.required.forEach(param => {
            initialData[param.name] = param.defaultValue || "";
          });

          setFormData(initialData);
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn(`⚠️ Metadata analysis failed for ${pallet}.${callName}, using fallback`, err);

          // Fallback: Use call.args directly to preserve parameter names
          if (selectedCall?.call?.args) {
            const fallbackInfo = createFallbackParameterInfo(selectedCall.call.args);
            setParameterInfo(fallbackInfo);

            // Initialize form data with fallback parameter names
            const initialData: FormData = {};
            fallbackInfo.required.forEach(param => {
              initialData[param.name] = param.defaultValue || "";
            });

            setFormData(initialData);
          } else {
            setError(err instanceof Error ? err.message : "Failed to load parameter information");
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadParameterInfo();

    return () => {
      isCancelled = true;
    };
  }, [chainKey, pallet, callName]);

  // Notify parent of form changes
  useEffect(() => {
    console.log('🔍 [FORM] Sending form data:', formData);
    console.log('🔍 [FORM] Parameter info:', parameterInfo?.required?.map(p => p.name) || []);
    onFormChange(formData);

    // Validate form data
    const isValid = validateFormData(formData, parameterInfo);
    onValidChange(isValid);
  }, [formData, parameterInfo, onFormChange, onValidChange]);

  const handleFieldChange = (paramName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleOptionalToggle = (paramName: string, enabled: boolean) => {
    if (!enabled) {
      // Remove from form data when disabled
      setFormData(prev => {
        const newData = { ...prev };
        delete newData[paramName];
        return newData;
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading parameter information...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load call parameters: {error}
        </AlertDescription>
      </Alert>
    );
  }

  // No parameters
  if (!parameterInfo || (parameterInfo.required.length === 0 && parameterInfo.optional.length === 0)) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>This call has no parameters.</p>
        <Badge variant="outline" className="mt-2">
          {parameterInfo?.complexity || 'simple'}
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Call complexity indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Parameters</h3>
          <Badge
            variant={parameterInfo.complexity === 'complex' ? 'destructive' :
                     parameterInfo.complexity === 'medium' ? 'default' : 'secondary'}
          >
            {parameterInfo.complexity}
          </Badge>
        </div>

        {parameterInfo.optional.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOptional(!showOptional)}
          >
            Optional ({parameterInfo.optional.length})
            {showOptional ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Call description */}
      {parameterInfo.description && (
        <div className="p-3 bg-muted/30 rounded-md">
          <p className="text-sm text-muted-foreground">
            {parameterInfo.description}
          </p>
        </div>
      )}

      {/* Required parameters */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">
          Required Parameters ({parameterInfo.required.length})
        </h4>

        {parameterInfo.required.map(param => (
          <div key={param.name}>
            {renderParameterField(param, formData[param.name], handleFieldChange)}
          </div>
        ))}
      </div>

      {/* Optional parameters */}
      {parameterInfo.optional.length > 0 && showOptional && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Optional Parameters ({parameterInfo.optional.length})
          </h4>

          {parameterInfo.optional.map(param => (
            <OptionalParameterField
              key={param.name}
              parameter={param}
              value={formData[param.name]}
              onToggle={(enabled) => handleOptionalToggle(param.name, enabled)}
            >
              {renderParameterField(param, formData[param.name], handleFieldChange)}
            </OptionalParameterField>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Render appropriate field component based on parameter type
 */
function renderParameterField(
  param: ParameterInfo,
  value: any,
  onChange: (paramName: string, value: any) => void
) {
  const handleChange = (newValue: any) => onChange(param.name, newValue);

  // Handle enum parameters
  if (param.enumVariants && param.enumVariants.length > 0) {
    return (
      <EnumParameterField
        parameter={param}
        value={value}
        onChange={handleChange}
      />
    );
  }

  // Handle complex types
  if (param.isComplex) {
    return renderComplexParameterField(param, value, handleChange);
  }

  // Handle simple types
  return renderSimpleParameterField(param, value, handleChange);
}

/**
 * Render complex parameter field
 */
function renderComplexParameterField(
  param: ParameterInfo,
  value: any,
  onChange: (value: any) => void
) {
  const fieldType = getFieldTypeFromParameterType(param.type);

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {param.name}
        <Badge variant="outline" className="text-xs">
          {param.type}
        </Badge>
        {param.isComplex && (
          <Badge variant="secondary" className="text-xs">
            complex
          </Badge>
        )}
      </Label>

      {param.description && (
        <p className="text-xs text-muted-foreground">
          {param.description}
        </p>
      )}

      {fieldType === 'array' ? (
        <textarea
          className="w-full p-2 border rounded font-mono text-sm"
          value={Array.isArray(value) ? JSON.stringify(value, null, 2) : (value || '')}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              onChange(parsed);
            } catch {
              onChange(e.target.value);
            }
          }}
          placeholder="[]"
          rows={3}
        />
      ) : (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${param.name}`}
          className={fieldType === 'hex' ? 'font-mono' : ''}
        />
      )}
    </div>
  );
}

/**
 * Render simple parameter field
 */
function renderSimpleParameterField(
  param: ParameterInfo,
  value: any,
  onChange: (value: any) => void
) {
  const fieldType = getFieldTypeFromParameterType(param.type);

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {param.name}
        <Badge variant="outline" className="text-xs">
          {param.type}
        </Badge>
      </Label>

      {param.description && (
        <p className="text-xs text-muted-foreground">
          {param.description}
        </p>
      )}

      {fieldType === 'boolean' ? (
        <select
          value={value?.toString() || 'false'}
          onChange={(e) => onChange(e.target.value === 'true')}
          className="w-full p-2 border rounded"
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      ) : (
        <Input
          type={fieldType === 'number' ? 'number' : 'text'}
          value={value || ''}
          onChange={(e) => onChange(fieldType === 'number' ? e.target.value : e.target.value)}
          placeholder={getPlaceholderForType(param.type)}
          className={fieldType === 'hex' ? 'font-mono' : ''}
          min={fieldType === 'number' ? '0' : undefined}
        />
      )}
    </div>
  );
}

/**
 * Get field type from parameter type
 */
function getFieldTypeFromParameterType(type: string): 'text' | 'number' | 'boolean' | 'hex' | 'array' {
  if (type === 'bool') return 'boolean';
  if (type.includes('u8') || type.includes('u16') || type.includes('u32') ||
      type.includes('u64') || type.includes('u128') || type.startsWith('Compact<')) {
    return 'number';
  }
  if (type === 'bytes' || type.startsWith('0x')) return 'hex';
  if (type.startsWith('Vec<') || type.startsWith('[')) return 'array';
  return 'text';
}

/**
 * Get placeholder text for parameter type
 */
function getPlaceholderForType(type: string): string {
  if (type.includes('AccountId') || type.includes('Address')) {
    return '5GrwvaEF5zXb... or //Alice';
  }
  if (type.startsWith('Compact<') || type.includes('Balance')) {
    return '0';
  }
  if (type.includes('u8') || type.includes('u16') || type.includes('u32') ||
      type.includes('u64') || type.includes('u128')) {
    return '0';
  }
  if (type === 'bytes') {
    return '0x...';
  }
  if (type.startsWith('Vec<')) {
    return '[]';
  }
  return `Enter ${type}`;
}

/**
 * Validate form data against parameter requirements
 */
function validateFormData(formData: FormData, parameterInfo: CallParameterInfo | null): boolean {
  if (!parameterInfo) return false;

  // Check all required parameters are provided
  for (const param of parameterInfo.required) {
    const value = formData[param.name];
    if (value === undefined || value === null || value === '') {
      return false;
    }
  }

  return true;
}

/**
 * Create fallback parameter info from call.args when metadata analysis fails
 */
function createFallbackParameterInfo(callArgs: PalletCall["args"]): CallParameterInfo {
  const required: ParameterInfo[] = callArgs.map(arg => ({
    name: arg.name,
    type: arg.type || 'unknown',
    codec: null,
    isOptional: false,
    isComplex: false,
    description: `Parameter ${arg.name} (fallback)`,
    defaultValue: getDefaultValueForType(arg.type)
  }));

  return {
    required,
    optional: [],
    all: required,
    description: 'Fallback parameter info (metadata analysis failed)',
    complexity: 'simple'
  };
}

/**
 * Get default value based on parameter type
 */
function getDefaultValueForType(type: string): string {
  if (type.includes('u') || type.includes('i') || type.includes('Balance') || type.includes('Compact')) {
    return '0';
  }
  if (type.includes('bool')) {
    return 'false';
  }
  return '';
}