/**
 * Centralized type checking utilities for PAPI parameter types
 * Replaces scattered type checking patterns across the codebase
 */

export const SUBSTRATE_TYPES = {
  UNSIGNED: ['u8', 'u16', 'u32', 'u64', 'u128'] as const,
  SIGNED: ['i8', 'i16', 'i32', 'i64', 'i128'] as const,
  BALANCE: ['Balance', 'Compact'] as const,
  ACCOUNT: ['AccountId', 'MultiAddress', 'SS58String'] as const,
  INDEX: ['Number', 'Index'] as const,
} as const;

export const ALL_NUMERIC_TYPES = [
  ...SUBSTRATE_TYPES.UNSIGNED,
  ...SUBSTRATE_TYPES.SIGNED,
  ...SUBSTRATE_TYPES.BALANCE
] as const;

export const BIGINT_TYPES = ['u64', 'u128', 'i64', 'i128', 'Balance'] as const;

/**
 * Check if a type is any numeric type (unsigned, signed, balance, compact)
 */
export function isNumericType(type: string): boolean {
  return ALL_NUMERIC_TYPES.some(numType => type.includes(numType)) ||
         type.startsWith('Compact<');
}

/**
 * Check if a type should be handled as BigInt
 */
export function isBigIntType(type: string): boolean {
  return BIGINT_TYPES.some(bigIntType => type.includes(bigIntType)) ||
         type.startsWith('Compact<');
}

/**
 * Check if a type is a balance type
 */
export function isBalanceType(type: string): boolean {
  return type.includes('Balance') || type.startsWith('Compact<');
}

/**
 * Check if a type is an account type
 */
export function isAccountType(type: string): boolean {
  return SUBSTRATE_TYPES.ACCOUNT.some(accountType => type.includes(accountType));
}

/**
 * Check if a type is an index/number type
 */
export function isIndexType(type: string): boolean {
  return SUBSTRATE_TYPES.INDEX.some(indexType => type.includes(indexType));
}

/**
 * Check if a type is a specific unsigned integer
 */
export function isUnsignedType(type: string): boolean {
  return SUBSTRATE_TYPES.UNSIGNED.some(unsignedType => type.includes(unsignedType));
}

/**
 * Check if a type is a specific signed integer
 */
export function isSignedType(type: string): boolean {
  return SUBSTRATE_TYPES.SIGNED.some(signedType => type.includes(signedType));
}

/**
 * Check for specific u32 or u64 types (exact matches)
 */
export function isU32OrU64Type(type: string): boolean {
  return type === 'u32' || type === 'u64';
}

/**
 * Check if a type is a boolean
 */
export function isBoolType(type: string): boolean {
  return type.includes('Bool') || type.includes('bool');
}

/**
 * Get the simple type category for form handling
 */
export function getSimpleTypeCategory(type: string): 'bool' | 'account' | 'number' | 'string' {
  if (isBoolType(type)) return 'bool';
  if (isAccountType(type)) return 'account';
  if (isNumericType(type)) return 'number';
  return 'string';
}

/**
 * Get default value for a type
 */
export function getDefaultValueForType(type: string): any {
  const category = getSimpleTypeCategory(type);
  switch (category) {
    case 'bool':
      return false;
    case 'number':
      return 0;
    case 'account':
      return '//Alice';
    default:
      return '';
  }
}