/**
 * Unified form validation hook that replaces existing validation patterns
 * Provides consistent validation across all PAPI forms
 */

import { useCallback, useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import {
  createFormSchema,
  ValidationResult,
  FieldValidationResult
} from '../utils/validation/schemas';
import {
  cleanFormData,
  convertFormValues,
  validateRequiredFields,
  createRequiredFieldErrors,
  createValidationMessage,
  isEmpty
} from '../utils/validation/helpers';

// ============================================================================
// TYPES
// ============================================================================

export interface FormField {
  name: string;
  type: string;
  required?: boolean;
  label?: string;
}

export interface ValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  mode?: 'strict' | 'lenient';
  showTypeHints?: boolean;
}

export interface UseUnifiedFormValidationProps {
  fields: FormField[];
  options?: ValidationOptions;
  onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

export interface UseUnifiedFormValidationReturn {
  // Validation functions
  validateForm: (formData: Record<string, any>) => ValidationResult;
  validateField: (fieldName: string, value: any) => FieldValidationResult;
  validatePartial: (formData: Record<string, any>) => ValidationResult;

  // State
  errors: Record<string, string>;
  isValid: boolean;
  touched: Set<string>;
  isValidating: boolean;

  // Actions
  setFieldValue: (fieldName: string, value: any) => void;
  setFieldTouched: (fieldName: string, touched?: boolean) => void;
  clearFieldError: (fieldName: string) => void;
  clearAllErrors: () => void;
  reset: () => void;

  // Utilities
  getFieldError: (fieldName: string) => string | undefined;
  hasFieldError: (fieldName: string) => boolean;
  isFieldTouched: (fieldName: string) => boolean;
  getFieldType: (fieldName: string) => string | undefined;
  isFieldRequired: (fieldName: string) => boolean;

  // Form data handling
  processFormData: (formData: Record<string, any>) => Record<string, any>;
  convertToApiFormat: (formData: Record<string, any>) => Record<string, any>;

  // Schema
  schema: z.ZodObject<any>;
}

// ============================================================================
// MAIN HOOK
// ============================================================================

export function useUnifiedFormValidation({
  fields,
  options = {},
  onValidationChange
}: UseUnifiedFormValidationProps): UseUnifiedFormValidationReturn {

  const {
    validateOnChange = true,
    validateOnBlur = true,
    mode = 'strict',
    showTypeHints = true
  } = options;

  // ============================================================================
  // STATE
  // ============================================================================

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================

  // Separate required and optional fields
  const { requiredFields, optionalFields, fieldMap } = useMemo(() => {
    const required = fields.filter(field => field.required !== false);
    const optional = fields.filter(field => field.required === false);
    const map = new Map(fields.map(field => [field.name, field]));

    return {
      requiredFields: required,
      optionalFields: optional,
      fieldMap: map
    };
  }, [fields]);

  // Create validation schema
  const schema = useMemo(() => {
    return createFormSchema(
      requiredFields.map(f => ({ name: f.name, type: f.type })),
      optionalFields.map(f => ({ name: f.name, type: f.type }))
    );
  }, [requiredFields, optionalFields]);

  // Field type mapping
  const fieldTypes = useMemo(() => {
    const types: Record<string, string> = {};
    fields.forEach(field => {
      types[field.name] = field.type;
    });
    return types;
  }, [fields]);

  // Required field names
  const requiredFieldNames = useMemo(() => {
    return requiredFields.map(f => f.name);
  }, [requiredFields]);

  // ============================================================================
  // VALIDATION FUNCTIONS
  // ============================================================================

  const validateForm = useCallback((formData: Record<string, any>): ValidationResult => {
    setIsValidating(true);

    try {
      // Clean the data first
      const cleanData = cleanFormData(formData, requiredFieldNames);

      // Validate using schema
      const validatedData = schema.parse(cleanData);

      const result: ValidationResult = {
        isValid: true,
        errors: {},
        data: validatedData
      };

      setIsValidating(false);
      return result;

    } catch (error) {
      let validationErrors: Record<string, string> = {};

      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as string;
          const field = fieldMap.get(fieldName);

          if (field) {
            validationErrors[fieldName] = createValidationMessage(
              field.label || field.name,
              field.type,
              err.message
            );
          } else {
            validationErrors[fieldName] = err.message;
          }
        });
      } else {
        validationErrors = { general: 'Validation error occurred' };
      }

      const result: ValidationResult = {
        isValid: false,
        errors: validationErrors,
        data: formData
      };

      setIsValidating(false);
      return result;
    }
  }, [schema, requiredFieldNames, fieldMap]);

  const validateField = useCallback((
    fieldName: string,
    value: any
  ): FieldValidationResult => {
    const field = fieldMap.get(fieldName);

    if (!field) {
      return {
        isValid: false,
        error: 'Unknown field'
      };
    }

    try {
      // Create single field schema
      const isRequired = field.required !== false;
      const singleFieldSchema = createFormSchema(
        isRequired ? [{ name: field.name, type: field.type }] : [],
        !isRequired ? [{ name: field.name, type: field.type }] : []
      );

      const fieldData = { [fieldName]: value };
      const cleanData = cleanFormData(fieldData, isRequired ? [fieldName] : []);

      singleFieldSchema.parse(cleanData);

      return {
        isValid: true,
        value: cleanData[fieldName]
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        const errorMessage = createValidationMessage(
          field.label || field.name,
          field.type,
          firstError?.message || 'Validation failed'
        );

        return {
          isValid: false,
          error: errorMessage,
          value
        };
      }

      return {
        isValid: false,
        error: 'Validation error',
        value
      };
    }
  }, [fieldMap]);

  const validatePartial = useCallback((formData: Record<string, any>): ValidationResult => {
    const providedFields = Object.keys(formData).filter(key => !isEmpty(formData[key]));

    if (providedFields.length === 0) {
      return { isValid: true, errors: {} };
    }

    // Create partial validation with only provided fields
    const relevantFields = fields.filter(field => providedFields.includes(field.name));
    const partialSchema = createFormSchema(
      relevantFields.filter(f => f.required !== false).map(f => ({ name: f.name, type: f.type })),
      relevantFields.filter(f => f.required === false).map(f => ({ name: f.name, type: f.type }))
    ).partial();

    try {
      const cleanData = cleanFormData(formData, []);
      partialSchema.parse(cleanData);

      return {
        isValid: true,
        errors: {},
        data: cleanData
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string> = {};

        error.errors.forEach((err) => {
          const fieldName = err.path[0] as string;
          const field = fieldMap.get(fieldName);

          if (field) {
            validationErrors[fieldName] = createValidationMessage(
              field.label || field.name,
              field.type,
              err.message
            );
          } else {
            validationErrors[fieldName] = err.message;
          }
        });

        return {
          isValid: false,
          errors: validationErrors
        };
      }

      return {
        isValid: false,
        errors: { general: 'Partial validation error' }
      };
    }
  }, [fields, fieldMap]);

  // ============================================================================
  // STATE MANAGEMENT FUNCTIONS
  // ============================================================================

  const setFieldValue = useCallback((fieldName: string, value: any) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validate on change if enabled
    if (validateOnChange) {
      const result = validateField(fieldName, value);

      setErrors(prev => {
        const newErrors = { ...prev };
        if (result.isValid) {
          delete newErrors[fieldName];
        } else {
          newErrors[fieldName] = result.error || 'Validation failed';
        }
        return newErrors;
      });
    }
  }, [validateOnChange, validateField]);

  const setFieldTouched = useCallback((fieldName: string, isTouched: boolean = true) => {
    setTouched(prev => {
      const newTouched = new Set(prev);
      if (isTouched) {
        newTouched.add(fieldName);
      } else {
        newTouched.delete(fieldName);
      }
      return newTouched;
    });

    // Validate on blur if enabled and field is being marked as touched
    if (validateOnBlur && isTouched && fieldValues[fieldName] !== undefined) {
      const result = validateField(fieldName, fieldValues[fieldName]);

      if (!result.isValid) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: result.error || 'Validation failed'
        }));
      }
    }
  }, [validateOnBlur, fieldValues, validateField]);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  const reset = useCallback(() => {
    setErrors({});
    setIsValid(false);
    setTouched(new Set());
    setFieldValues({});
    setIsValidating(false);
  }, []);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const getFieldError = useCallback((fieldName: string): string | undefined => {
    return errors[fieldName];
  }, [errors]);

  const hasFieldError = useCallback((fieldName: string): boolean => {
    return Boolean(errors[fieldName]);
  }, [errors]);

  const isFieldTouched = useCallback((fieldName: string): boolean => {
    return touched.has(fieldName);
  }, [touched]);

  const getFieldType = useCallback((fieldName: string): string | undefined => {
    return fieldMap.get(fieldName)?.type;
  }, [fieldMap]);

  const isFieldRequired = useCallback((fieldName: string): boolean => {
    const field = fieldMap.get(fieldName);
    return field ? field.required !== false : false;
  }, [fieldMap]);

  const processFormData = useCallback((formData: Record<string, any>): Record<string, any> => {
    return cleanFormData(formData, requiredFieldNames);
  }, [requiredFieldNames]);

  const convertToApiFormat = useCallback((formData: Record<string, any>): Record<string, any> => {
    const cleanData = cleanFormData(formData, requiredFieldNames);
    return convertFormValues(cleanData, fieldTypes);
  }, [requiredFieldNames, fieldTypes]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Update validation state when errors change
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const newIsValid = !hasErrors && !isValidating;

    if (newIsValid !== isValid) {
      setIsValid(newIsValid);
    }

    // Notify parent component
    if (onValidationChange) {
      onValidationChange(newIsValid, errors);
    }
  }, [errors, isValidating, isValid, onValidationChange]);

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // Validation functions
    validateForm,
    validateField,
    validatePartial,

    // State
    errors,
    isValid,
    touched,
    isValidating,

    // Actions
    setFieldValue,
    setFieldTouched,
    clearFieldError,
    clearAllErrors,
    reset,

    // Utilities
    getFieldError,
    hasFieldError,
    isFieldTouched,
    getFieldType,
    isFieldRequired,

    // Form data handling
    processFormData,
    convertToApiFormat,

    // Schema
    schema
  };
}