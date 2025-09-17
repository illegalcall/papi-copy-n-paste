import { useMemo } from 'react';
import { z } from 'zod';
import type { StorageParams } from '../types/forms';

// Validation schema for different parameter types
const createParameterSchema = (paramTypes: string[]) => {
  const schemaFields: Record<string, z.ZodType<any>> = {};

  paramTypes.forEach((paramType) => {
    const fieldKey = paramType.toLowerCase();

    switch (paramType) {
      case 'AccountId':
      case 'SS58String':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              // Allow test accounts like //Alice, //Bob
              if (value.startsWith('//')) {
                return true;
              }
              // Allow full SS58 addresses (typically start with 1, 5, etc and are 47+ chars)
              if (value.length >= 47 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(value)) {
                return true;
              }
              return false;
            },
            {
              message: `${paramType} must be a test account (//Alice) or valid SS58 address`
            }
          );
        break;

      case 'AssetId':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              const num = parseInt(value, 10);
              return !isNaN(num) && num >= 0;
            },
            {
              message: `${paramType} must be a valid positive number`
            }
          );
        break;

      case 'BlockNumber':
      case 'number':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              const num = parseInt(value, 10);
              return !isNaN(num) && num >= 0;
            },
            {
              message: `${paramType} must be a valid positive number`
            }
          );
        break;

      case 'ReferendumIndex':
      case 'ProposalIndex':
      case 'QueryId':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              const num = parseInt(value, 10);
              return !isNaN(num) && num >= 0;
            },
            {
              message: `${paramType} must be a valid index (0 or positive number)`
            }
          );
        break;

      case 'Hash':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              // Must start with 0x and be 66 characters total (32 bytes hex)
              return /^0x[a-fA-F0-9]{64}$/.test(value);
            },
            {
              message: `${paramType} must be a valid 32-byte hex string starting with 0x`
            }
          );
        break;

      case 'bytes':
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`)
          .refine(
            (value) => {
              // Allow hex strings with or without 0x prefix
              const hexPattern = /^(0x)?[a-fA-F0-9]+$/;
              return hexPattern.test(value);
            },
            {
              message: `${paramType} must be a valid hex string`
            }
          );
        break;

      default:
        // Generic string validation for unknown types
        schemaFields[fieldKey] = z.string()
          .min(1, `${paramType} is required`);
        break;
    }
  });

  return z.object(schemaFields);
};

export function useStorageValidation(requiredParams: string[] | null) {
  const validationSchema = useMemo(() => {
    if (!requiredParams || requiredParams.length === 0) {
      return null;
    }
    return createParameterSchema(requiredParams);
  }, [requiredParams]);

  const validateParams = useMemo(() => {
    return (params: StorageParams) => {
      if (!validationSchema) {
        return { isValid: true, errors: {} };
      }

      const result = validationSchema.safeParse(params);

      if (result.success) {
        return { isValid: true, errors: {} };
      }

      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const path = error.path[0] as string;
        errors[path] = error.message;
      });

      return { isValid: false, errors };
    };
  }, [validationSchema]);

  return {
    validateParams,
    hasRequiredParams: requiredParams && requiredParams.length > 0,
    requiredParams: requiredParams || []
  };
}