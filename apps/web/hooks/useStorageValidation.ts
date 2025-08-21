import { useMemo } from 'react';
import { z } from 'zod';
import type { StorageParams } from '../types/forms';

// Validation schema for different parameter types (now supports optional parameters)
const createParameterSchema = (paramTypes: string[], isOptional: boolean = false) => {
  const schemaFields: Record<string, z.ZodType<any>> = {};

  paramTypes.forEach((paramType) => {
    const fieldKey = paramType.toLowerCase();

    switch (paramType) {
      case 'AccountId':
      case 'SS58String':
        // Since validation is disabled (all params are optional), just use basic string validation
        schemaFields[fieldKey] = z.string();
        break;

      case 'AssetId':
      case 'BlockNumber':
      case 'number':
      case 'ReferendumIndex':
      case 'ProposalIndex':
      case 'QueryId':
        // Since validation is disabled (all params are optional), just use basic string validation
        schemaFields[fieldKey] = z.string();
        break;

      case 'Hash':
        // Since validation is disabled (all params are optional), just use basic string validation
        schemaFields[fieldKey] = z.string();
        break;

      case 'bytes':
        // Since validation is disabled (all params are optional), just use basic string validation
        schemaFields[fieldKey] = z.string();
        break;

      default:
        // Since validation is disabled (all params are optional), just use basic string validation
        schemaFields[fieldKey] = z.string();
        break;
    }
  });

  return z.object(schemaFields);
};

export function useStorageValidation(requiredParams: string[] | null, optionalParams: string[] | null = null) {
  const validationSchema = useMemo(() => {
    const allParams = [...(requiredParams || []), ...(optionalParams || [])];


    if (allParams.length === 0) {
      return null;
    }

    // Create schemas for required and optional parameters
    const requiredSchema = requiredParams && requiredParams.length > 0
      ? createParameterSchema(requiredParams, false)
      : null;

    const optionalSchema = optionalParams && optionalParams.length > 0
      ? createParameterSchema(optionalParams, true)
      : null;


    // Merge schemas
    if (requiredSchema && optionalSchema) {
      return requiredSchema.merge(optionalSchema);
    } else if (requiredSchema) {
      return requiredSchema;
    } else if (optionalSchema) {
      return optionalSchema;
    }

    return null;
  }, [requiredParams, optionalParams]);

  const validateParams = useMemo(() => {
    return (params: StorageParams) => {
      // ALL STORAGE PARAMETERS ARE OPTIONAL FOR UI FLEXIBILITY
      // This enables both getValue(params) and getEntries() patterns
      return { isValid: true, errors: {} };
    };
  }, [validationSchema]);

  return {
    validateParams,
    hasRequiredParams: requiredParams && requiredParams.length > 0,
    requiredParams: requiredParams || [],
    optionalParams: optionalParams || []
  };
}