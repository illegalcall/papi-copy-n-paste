/**
 * Comprehensive validation schemas for PAPI form validation
 * Provides standardized validation across all form types
 */

import { z } from 'zod';
import { getSs58AddressInfo } from 'polkadot-api';


/**
 * SS58 Address validator using PAPI's built-in validation
 */
export const ss58AddressValidator = z
  .string()
  .min(1, 'Address is required')
  .refine(
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

/**
 * Numeric string validator (for blockchain numeric types)
 */
export const numericStringValidator = z
  .string()
  .min(1, 'Value is required')
  .regex(/^\d+$/, 'Must be a valid number');

/**
 * Positive number validator
 */
export const positiveNumberValidator = z
  .number()
  .positive('Must be a positive number');

/**
 * Hash validator (32-byte hex string with 0x prefix)
 */
export const hashValidator = z
  .string()
  .min(1, 'Hash is required')
  .regex(
    /^0x[a-fA-F0-9]{64}$/,
    'Hash must be a valid 32-byte hex string (0x followed by 64 hex characters)'
  );

/**
 * Bytes validator (hex string with 0x prefix)
 */
export const bytesValidator = z
  .string()
  .min(1, 'Bytes value is required')
  .regex(
    /^0x[a-fA-F0-9]*$/,
    'Bytes must be a valid hex string starting with 0x'
  );

/**
 * Balance validator (supports DOT amounts and planck)
 */
export const balanceValidator = z
  .string()
  .min(1, 'Balance is required')
  .refine(
    (value) => {
      // Check if it's a valid number (can be decimal for DOT amounts)
      return /^\d+(\.\d+)?$/.test(value);
    },
    'Balance must be a valid number'
  );

/**
 * JSON string validator
 */
export const jsonStringValidator = z
  .string()
  .min(1, 'JSON value is required')
  .refine(
    (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    },
    'Must be valid JSON'
  );


/**
 * Maps PAPI parameter types to appropriate validators
 */
export const parameterTypeValidators = {
  // Account types
  AccountId: ss58AddressValidator,
  SS58String: ss58AddressValidator,

  // Numeric types
  AssetId: numericStringValidator,
  BlockNumber: numericStringValidator,
  Number: numericStringValidator,
  ReferendumIndex: numericStringValidator,
  ProposalIndex: numericStringValidator,
  QueryId: numericStringValidator,
  ParaId: numericStringValidator,
  Index: numericStringValidator,
  u8: numericStringValidator,
  u16: numericStringValidator,
  u32: numericStringValidator,
  u64: numericStringValidator,
  u128: numericStringValidator,
  i8: z.string().regex(/^-?\d+$/, 'Must be a valid integer'),
  i16: z.string().regex(/^-?\d+$/, 'Must be a valid integer'),
  i32: z.string().regex(/^-?\d+$/, 'Must be a valid integer'),
  i64: z.string().regex(/^-?\d+$/, 'Must be a valid integer'),
  i128: z.string().regex(/^-?\d+$/, 'Must be a valid integer'),

  // Balance types
  Balance: balanceValidator,
  'Compact<Balance>': balanceValidator,
  'Compact<u128>': balanceValidator,

  // Hash and bytes
  Hash: hashValidator,
  bytes: bytesValidator,
  Bytes: bytesValidator,

  // Boolean
  bool: z.enum(['true', 'false'], { message: 'Must be true or false' }),

  // String types
  String: z.string().min(1, 'Value is required'),
  Text: z.string().min(1, 'Value is required'),

  // Vec types (JSON arrays)
  'Vec<AccountId>': jsonStringValidator,
  'Vec<u8>': jsonStringValidator,
  'Vec<u32>': jsonStringValidator,
  'Vec<u64>': jsonStringValidator,
  'Vec<Hash>': jsonStringValidator,

  // Option types (can be empty)
  'Option<AccountId>': ss58AddressValidator.optional().or(z.literal('')),
  'Option<u32>': numericStringValidator.optional().or(z.literal('')),
  'Option<u64>': numericStringValidator.optional().or(z.literal('')),
  'Option<Hash>': hashValidator.optional().or(z.literal('')),
  'Option<Balance>': balanceValidator.optional().or(z.literal('')),
} as const;


/**
 * Creates a validation schema for a parameter type
 */
export function createParameterValidator(
  paramType: string,
  isOptional: boolean = false
): z.ZodType<any> {
  // Handle enum types
  if (paramType.startsWith('Enum(') && paramType.endsWith(')')) {
    const enumOptions = paramType
      .slice(5, -1)
      .split('|')
      .map(opt => opt.trim());

    const enumValidator = z.enum(enumOptions as [string, ...string[]], {
      message: `Must be one of: ${enumOptions.join(', ')}`
    });

    return isOptional ? enumValidator.optional().or(z.literal('')) : enumValidator;
  }

  // Handle Compact types
  if (paramType.startsWith('Compact<') && paramType.endsWith('>')) {
    const innerType = paramType.slice(8, -1);
    return createParameterValidator(innerType, isOptional);
  }

  // Handle Vec types
  if (paramType.startsWith('Vec<') && paramType.endsWith('>')) {
    const baseValidator = jsonStringValidator;
    return isOptional ? baseValidator.optional().or(z.literal('')) : baseValidator;
  }

  // Handle Option types
  if (paramType.startsWith('Option<') && paramType.endsWith('>')) {
    const innerType = paramType.slice(7, -1);
    const innerValidator = createParameterValidator(innerType, false);
    return innerValidator.optional().or(z.literal(''));
  }

  // Get validator from mapping
  const validator = parameterTypeValidators[paramType as keyof typeof parameterTypeValidators];

  if (validator) {
    return isOptional ? validator.optional().or(z.literal('')) : validator;
  }

  // Default fallback for unknown types
  const defaultValidator = z.string().min(1, `${paramType} is required`);
  return isOptional ? defaultValidator.optional().or(z.literal('')) : defaultValidator;
}

/**
 * Creates a complete form validation schema
 */
export function createFormSchema(
  requiredParams: Array<{ name: string; type: string }>,
  optionalParams: Array<{ name: string; type: string }> = []
): z.ZodObject<any> {
  const schemaFields: Record<string, z.ZodType<any>> = {};

  // Add required parameters
  requiredParams.forEach(param => {
    schemaFields[param.name] = createParameterValidator(param.type, false);
  });

  // Add optional parameters
  optionalParams.forEach(param => {
    schemaFields[param.name] = createParameterValidator(param.type, true);
  });

  return z.object(schemaFields);
}


export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: Record<string, any>;
}

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  value?: any;
}