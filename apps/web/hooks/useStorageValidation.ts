import { useMemo } from 'react';
import { z } from 'zod';
import { getSs58AddressInfo } from 'polkadot-api';
import type { StorageParams } from '../types/forms';

// Validation schema for different parameter types
const createParameterSchema = (paramTypes: string[], isOptional: boolean = false) => {
  const schemaFields: Record<string, z.ZodType<any>> = {};

  paramTypes.forEach((paramType) => {
    const fieldKey = paramType.toLowerCase();
    let baseSchema: z.ZodType<any>;

    switch (paramType) {
      case 'AccountId':
      case 'SS58String':
        // SS58 address validation using PAPI's built-in validation
        baseSchema = z.string().min(1, 'AccountId is required').refine(
          (address) => {
            try {
              getSs58AddressInfo(address);
              return true;
            } catch {
              return false;
            }
          },
          'Invalid SS58 address format'
        );
        break;

      case 'AssetId':
      case 'BlockNumber':
      case 'number':
      case 'ReferendumIndex':
      case 'ProposalIndex':
      case 'QueryId':
        // Numeric validation - can be string representation of number
        baseSchema = z.string().min(1, `${paramType} is required`).regex(
          /^\d+$/,
          `${paramType} must be a valid number`
        );
        break;

      case 'Hash':
        // Hash validation - should be hex string, usually 32 bytes (64 hex chars) with 0x prefix
        baseSchema = z.string().min(1, 'Hash is required').regex(
          /^0x[a-fA-F0-9]{64}$/,
          'Hash must be a valid 32-byte hex string (0x followed by 64 hex characters)'
        );
        break;

      case 'bytes':
        // Bytes validation - hex string with 0x prefix
        baseSchema = z.string().min(1, 'Bytes value is required').regex(
          /^0x[a-fA-F0-9]*$/,
          'Bytes must be a valid hex string starting with 0x'
        );
        break;

      default:
        // Default string validation for unknown types
        baseSchema = z.string().min(1, `${paramType} is required`);
        break;
    }

    // Make optional fields nullable/optional
    schemaFields[fieldKey] = isOptional
      ? baseSchema.optional().or(z.literal(''))
      : baseSchema;
  });

  return z.object(schemaFields);
};

export function useStorageValidation(requiredParams: string[] | null, optionalParams: string[] | null = null) {
  const validationSchema = useMemo(() => {
    // Handle simple storage values (no parameters)
    if ((!requiredParams || requiredParams.length === 0) &&
        (!optionalParams || optionalParams.length === 0)) {
      return null;
    }

    // Create schemas for required and optional parameters
    const requiredSchema = requiredParams && requiredParams.length > 0
      ? createParameterSchema(requiredParams, false)
      : null;

    const optionalSchema = optionalParams && optionalParams.length > 0
      ? createParameterSchema(optionalParams, true)
      : null;

    // Merge schemas - this allows mixing required and optional fields
    if (requiredSchema && optionalSchema) {
      return requiredSchema.merge(optionalSchema.partial());
    } else if (requiredSchema) {
      return requiredSchema;
    } else if (optionalSchema) {
      return optionalSchema.partial(); // All optional fields
    }

    return null;
  }, [requiredParams, optionalParams]);

  const validateParams = useMemo(() => {
    return (params: StorageParams) => {
      // Simple storage values (like DCA.ScheduleIdSequencer) have no parameters to validate
      if (!validationSchema) {
        return { isValid: true, errors: {} };
      }

      try {
        // Filter out empty optional parameters before validation
        const filteredParams: Record<string, string> = {};
        Object.entries(params).forEach(([key, value]) => {
          if (value && value.trim() !== '') {
            filteredParams[key] = value.trim();
          }
        });

        // For required-only parameters: all must be provided and valid
        if (requiredParams && requiredParams.length > 0 && (!optionalParams || optionalParams.length === 0)) {
          validationSchema.parse(filteredParams);
        }
        // For optional-only parameters: any provided must be valid (empty is OK)
        else if ((!requiredParams || requiredParams.length === 0) && optionalParams && optionalParams.length > 0) {
          validationSchema.parse(filteredParams);
        }
        // For mixed required/optional: required must be provided, optional can be empty
        else {
          // Check that all required parameters have values
          const requiredKeys = (requiredParams || []).map(p => p.toLowerCase());
          const missingRequired = requiredKeys.filter(key => !filteredParams[key]);

          if (missingRequired.length > 0) {
            const errors: Record<string, string> = {};
            missingRequired.forEach(key => {
              const originalParam = requiredParams?.find(p => p.toLowerCase() === key);
              errors[key] = `${originalParam || key} is required`;
            });
            return { isValid: false, errors };
          }

          // Validate the provided parameters
          validationSchema.parse(filteredParams);
        }

        return { isValid: true, errors: {} };

      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            errors[field] = err.message;
          });
          return { isValid: false, errors };
        }
        return { isValid: false, errors: { general: 'Validation error occurred' } };
      }
    };
  }, [validationSchema, requiredParams, optionalParams]);

  return {
    validateParams,
    hasRequiredParams: requiredParams && requiredParams.length > 0,
    requiredParams: requiredParams || [],
    optionalParams: optionalParams || []
  };
}