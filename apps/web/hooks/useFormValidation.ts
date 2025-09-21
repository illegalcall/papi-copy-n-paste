/**
 * Comprehensive form validation hook for PAPI forms
 * Provides consistent validation patterns across all form types
 */

import { useMemo, useCallback, useState } from 'react';
import { z } from 'zod';
import {
  createFormSchema,
  ValidationResult,
  FieldValidationResult,
  createParameterValidator
} from '../utils/validation/schemas';

interface FormField {
  name: string;
  type: string;
  required?: boolean;
}

interface UseFormValidationProps {
  fields: FormField[];
  validateOnChange?: boolean;
  mode?: 'all' | 'required-only' | 'touched-only';
}

interface UseFormValidationReturn {
  validateForm: (formData: Record<string, any>) => ValidationResult;
  validateField: (fieldName: string, value: any, fieldType: string) => FieldValidationResult;
  validatePartial: (formData: Record<string, any>) => ValidationResult;
  getFieldValidator: (fieldName: string, fieldType: string, required: boolean) => z.ZodType<any>;
  isValidForm: (formData: Record<string, any>) => boolean;
  getFieldError: (fieldName: string, value: any, fieldType: string) => string | undefined;
  schema: z.ZodObject<any>;
}

export function useFormValidation({
  fields,
  validateOnChange = true,
  mode = 'all'
}: UseFormValidationProps): UseFormValidationReturn {

  // Separate required and optional fields
  const { requiredFields, optionalFields } = useMemo(() => {
    const required = fields.filter(field => field.required !== false);
    const optional = fields.filter(field => field.required === false);
    return { requiredFields: required, optionalFields: optional };
  }, [fields]);

  // Create validation schema
  const schema = useMemo(() => {
    return createFormSchema(
      requiredFields.map(f => ({ name: f.name, type: f.type })),
      optionalFields.map(f => ({ name: f.name, type: f.type }))
    );
  }, [requiredFields, optionalFields]);

  // Validate entire form
  const validateForm = useCallback((formData: Record<string, any>): ValidationResult => {
    try {
      // Clean and prepare data
      const cleanData = prepareFormData(formData, fields);

      // Validate using schema
      const validatedData = schema.parse(cleanData);

      return {
        isValid: true,
        errors: {},
        data: validatedData
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};

        error.errors.forEach((err) => {
          const fieldName = err.path[0] as string;
          errors[fieldName] = err.message;
        });

        return {
          isValid: false,
          errors,
          data: formData
        };
      }

      return {
        isValid: false,
        errors: { general: 'Validation error occurred' },
        data: formData
      };
    }
  }, [schema, fields]);

  // Validate single field
  const validateField = useCallback((
    fieldName: string,
    value: any,
    fieldType: string
  ): FieldValidationResult => {
    try {
      const field = fields.find(f => f.name === fieldName);
      const isRequired = field?.required !== false;

      const fieldValidator = createParameterValidator(fieldType, !isRequired);
      const validatedValue = fieldValidator.parse(value);

      return {
        isValid: true,
        value: validatedValue
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          error: error.errors[0]?.message || 'Validation failed',
          value
        };
      }

      return {
        isValid: false,
        error: 'Validation error',
        value
      };
    }
  }, [fields]);

  // Validate partial form (only provided fields)
  const validatePartial = useCallback((formData: Record<string, any>): ValidationResult => {
    try {
      // Create partial schema for only the provided fields
      const providedFields = Object.keys(formData);
      const relevantFields = fields.filter(field => providedFields.includes(field.name));

      if (relevantFields.length === 0) {
        return { isValid: true, errors: {} };
      }

      const partialSchema = createFormSchema(
        relevantFields.filter(f => f.required !== false).map(f => ({ name: f.name, type: f.type })),
        relevantFields.filter(f => f.required === false).map(f => ({ name: f.name, type: f.type }))
      ).partial();

      // Clean data for only relevant fields
      const cleanData = prepareFormData(formData, relevantFields);
      const validatedData = partialSchema.parse(cleanData);

      return {
        isValid: true,
        errors: {},
        data: validatedData
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};

        error.errors.forEach((err) => {
          const fieldName = err.path[0] as string;
          errors[fieldName] = err.message;
        });

        return {
          isValid: false,
          errors
        };
      }

      return {
        isValid: false,
        errors: { general: 'Partial validation error occurred' }
      };
    }
  }, [fields]);

  // Get validator for a specific field
  const getFieldValidator = useCallback((
    fieldName: string,
    fieldType: string,
    required: boolean
  ): z.ZodType<any> => {
    return createParameterValidator(fieldType, !required);
  }, []);

  // Quick validation check
  const isValidForm = useCallback((formData: Record<string, any>): boolean => {
    return validateForm(formData).isValid;
  }, [validateForm]);

  // Get error for a specific field
  const getFieldError = useCallback((
    fieldName: string,
    value: any,
    fieldType: string
  ): string | undefined => {
    const result = validateField(fieldName, value, fieldType);
    return result.error;
  }, [validateField]);

  return {
    validateForm,
    validateField,
    validatePartial,
    getFieldValidator,
    isValidForm,
    getFieldError,
    schema
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Prepares form data for validation by cleaning and converting values
 */
function prepareFormData(
  formData: Record<string, any>,
  fields: FormField[]
): Record<string, any> {
  const cleanData: Record<string, any> = {};

  fields.forEach(field => {
    const value = formData[field.name];

    // Skip undefined/null values for optional fields
    if ((value === undefined || value === null) && field.required === false) {
      return;
    }

    // Convert empty strings to undefined for optional fields
    if (value === '' && field.required === false) {
      return;
    }

    // Clean string values
    if (typeof value === 'string') {
      cleanData[field.name] = value.trim();
    } else {
      cleanData[field.name] = value;
    }
  });

  return cleanData;
}

/**
 * Hook for real-time field validation
 */
export function useFieldValidation(
  fieldName: string,
  fieldType: string,
  required: boolean = true
) {
  const [error, setError] = useState<string | undefined>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const validator = useMemo(() => {
    return createParameterValidator(fieldType, !required);
  }, [fieldType, required]);

  const validateValue = useCallback((value: any) => {
    try {
      validator.parse(value);
      setError(undefined);
      setIsValid(true);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || 'Validation failed';
        setError(errorMessage);
        setIsValid(false);
        return false;
      }
      setError('Validation error');
      setIsValid(false);
      return false;
    }
  }, [validator]);

  return {
    error,
    isValid,
    validateValue,
    clearError: () => {
      setError(undefined);
      setIsValid(true);
    }
  };
}

/**
 * Hook for form-level validation with state management
 */
export function useFormValidationState(fields: FormField[]) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const { validateForm, validateField } = useFormValidation({ fields });

  const validateFormData = useCallback((formData: Record<string, any>) => {
    const result = validateForm(formData);
    setErrors(result.errors);
    setIsValid(result.isValid);
    return result;
  }, [validateForm]);

  const validateSingleField = useCallback((
    fieldName: string,
    value: any,
    fieldType: string
  ) => {
    const result = validateField(fieldName, value, fieldType);

    setErrors(prev => ({
      ...prev,
      [fieldName]: result.error || ''
    }));

    // Mark field as touched
    setTouched(prev => new Set([...prev, fieldName]));

    return result;
  }, [validateField]);

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
    setTouched(new Set());
  }, []);

  return {
    errors,
    isValid,
    touched,
    validateFormData,
    validateSingleField,
    clearFieldError,
    clearAllErrors,
    hasFieldError: (fieldName: string) => Boolean(errors[fieldName]),
    getFieldError: (fieldName: string) => errors[fieldName]
  };
}