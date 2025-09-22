
import { getSs58AddressInfo } from 'polkadot-api';


/**
 * Check if a value is empty (null, undefined, empty string, or whitespace)
 */
export function isEmpty(value: any): boolean {
  return value === null ||
         value === undefined ||
         (typeof value === 'string' && value.trim() === '');
}

/**
 * Check if a value is a valid number string
 */
export function isValidNumberString(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * Check if a value is a valid SS58 address
 */
export function isValidSS58Address(address: string): boolean {
  try {
    getSs58AddressInfo(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a value is a valid hash (0x + 64 hex characters)
 */
export function isValidHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Check if a value is a valid hex string with 0x prefix
 */
export function isValidHexString(hex: string): boolean {
  return /^0x[a-fA-F0-9]*$/.test(hex);
}

/**
 * Check if a value is valid JSON
 */
export function isValidJSON(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a value is a valid balance (supports decimal DOT amounts)
 */
export function isValidBalance(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value);
}


/**
 * Convert a type string to human-readable format
 */
export function formatParameterType(type: string): string {
  // Handle common type mappings
  const typeMap: Record<string, string> = {
    'AccountId': 'Account Address (SS58)',
    'SS58String': 'Account Address (SS58)',
    'AssetId': 'Asset ID (Number)',
    'Balance': 'Balance (DOT/Token Amount)',
    'Compact<Balance>': 'Balance (DOT/Token Amount)',
    'BlockNumber': 'Block Number',
    'Hash': 'Hash (0x + 64 hex chars)',
    'bytes': 'Bytes (0x + hex string)',
    'bool': 'Boolean (true/false)',
    'u8': 'Number (0-255)',
    'u16': 'Number (0-65535)',
    'u32': 'Number (0-4294967295)',
    'u64': 'Large Number',
    'u128': 'Very Large Number'
  };

  // Handle Vec types
  if (type.startsWith('Vec<') && type.endsWith('>')) {
    const innerType = type.slice(4, -1);
    return `Array of ${formatParameterType(innerType)}`;
  }

  // Handle Option types
  if (type.startsWith('Option<') && type.endsWith('>')) {
    const innerType = type.slice(7, -1);
    return `Optional ${formatParameterType(innerType)}`;
  }

  // Handle Compact types
  if (type.startsWith('Compact<') && type.endsWith('>')) {
    const innerType = type.slice(8, -1);
    return formatParameterType(innerType);
  }

  // Handle Enum types
  if (type.startsWith('Enum(') && type.endsWith(')')) {
    const enumOptions = type
      .slice(5, -1)
      .split('|')
      .map(opt => opt.trim());
    return `One of: ${enumOptions.join(', ')}`;
  }

  return typeMap[type] || type;
}

/**
 * Get placeholder text for a parameter type
 */
export function getParameterPlaceholder(type: string, name: string): string {
  const placeholderMap: Record<string, string> = {
    'AccountId': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    'SS58String': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    'AssetId': '1000',
    'Balance': '1.5',
    'Compact<Balance>': '1.5',
    'BlockNumber': '12345678',
    'Hash': '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    'bytes': '0x1234abcd',
    'bool': 'true',
    'u8': '255',
    'u16': '65535',
    'u32': '4294967295',
    'u64': '18446744073709551615',
    'u128': '340282366920938463463374607431768211455'
  };

  // Handle Vec types
  if (type.startsWith('Vec<') && type.endsWith('>')) {
    return '["item1", "item2"]';
  }

  // Handle Option types (can be empty)
  if (type.startsWith('Option<') && type.endsWith('>')) {
    const innerType = type.slice(7, -1);
    return `Optional: ${getParameterPlaceholder(innerType, name)}`;
  }

  // Handle Compact types
  if (type.startsWith('Compact<') && type.endsWith('>')) {
    const innerType = type.slice(8, -1);
    return getParameterPlaceholder(innerType, name);
  }

  return placeholderMap[type] || `Enter ${name}`;
}

/**
 * Get help text for a parameter type
 */
export function getParameterHelpText(type: string): string {
  const helpMap: Record<string, string> = {
    'AccountId': 'A valid Polkadot account address in SS58 format',
    'SS58String': 'A valid Polkadot account address in SS58 format',
    'AssetId': 'Numeric identifier for an asset',
    'Balance': 'Token amount (can use decimal DOT amounts like 1.5)',
    'Compact<Balance>': 'Token amount (can use decimal DOT amounts like 1.5)',
    'BlockNumber': 'Block number in the blockchain',
    'Hash': 'A 32-byte hash value (0x followed by 64 hex characters)',
    'bytes': 'Arbitrary bytes as hex string (starting with 0x)',
    'bool': 'Boolean value: true or false',
    'u8': 'Unsigned 8-bit integer (0 to 255)',
    'u16': 'Unsigned 16-bit integer (0 to 65,535)',
    'u32': 'Unsigned 32-bit integer (0 to 4,294,967,295)',
    'u64': 'Unsigned 64-bit integer',
    'u128': 'Unsigned 128-bit integer'
  };

  if (type.startsWith('Vec<')) {
    return 'Array of values in JSON format, e.g., ["value1", "value2"]';
  }

  if (type.startsWith('Option<')) {
    return 'Optional field - can be left empty';
  }

  if (type.startsWith('Enum(')) {
    const enumOptions = type
      .slice(5, -1)
      .split('|')
      .map(opt => opt.trim());
    return `Must be one of: ${enumOptions.join(', ')}`;
  }

  return helpMap[type] || 'Enter a valid value for this parameter';
}


/**
 * Clean form data by trimming strings and removing empty optional fields
 */
export function cleanFormData(
  formData: Record<string, any>,
  requiredFields: string[] = []
): Record<string, any> {
  const cleaned: Record<string, any> = {};

  Object.entries(formData).forEach(([key, value]) => {
    // Skip empty values for optional fields
    if (!requiredFields.includes(key) && isEmpty(value)) {
      return;
    }

    // Trim strings
    if (typeof value === 'string') {
      cleaned[key] = value.trim();
    } else {
      cleaned[key] = value;
    }
  });

  return cleaned;
}

/**
 * Convert form values to appropriate types for API calls
 */
export function convertFormValues(
  formData: Record<string, any>,
  fieldTypes: Record<string, string>
): Record<string, any> {
  const converted: Record<string, any> = {};

  Object.entries(formData).forEach(([key, value]) => {
    const type = fieldTypes[key];

    if (!type || isEmpty(value)) {
      converted[key] = value;
      return;
    }

    // Convert based on type
    switch (type) {
      case 'u8':
      case 'u16':
      case 'u32':
      case 'u64':
      case 'u128':
      case 'i8':
      case 'i16':
      case 'i32':
      case 'i64':
      case 'i128':
      case 'AssetId':
      case 'BlockNumber':
      case 'Number':
        converted[key] = parseInt(value.toString(), 10);
        break;

      case 'Balance':
      case 'Compact<Balance>':
        // Convert DOT amounts to planck if needed
        const balanceValue = parseFloat(value.toString());
        if (balanceValue > 0 && balanceValue < 1000) {
          // Assume it's in tokens, convert to planck
          converted[key] = Math.floor(balanceValue * 10**10);
        } else {
          converted[key] = parseInt(value.toString(), 10);
        }
        break;

      case 'bool':
        converted[key] = value === 'true' || value === true;
        break;

      default:
        // Handle Vec types (parse JSON)
        if (type.startsWith('Vec<')) {
          try {
            converted[key] = JSON.parse(value.toString());
          } catch {
            converted[key] = [];
          }
        } else {
          converted[key] = value;
        }
        break;
    }
  });

  return converted;
}

/**
 * Validate that all required fields are present and not empty
 */
export function validateRequiredFields(
  formData: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field =>
    isEmpty(formData[field])
  );

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

/**
 * Create error messages for missing required fields
 */
export function createRequiredFieldErrors(
  missingFields: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  missingFields.forEach(field => {
    errors[field] = `${field} is required`;
  });

  return errors;
}


/**
 * Create user-friendly validation error messages
 */
export function createValidationMessage(
  fieldName: string,
  fieldType: string,
  error: string
): string {
  const fieldLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  const typeInfo = formatParameterType(fieldType);

  // Customize message based on error type
  if (error.includes('required')) {
    return `${fieldLabel} is required`;
  }

  if (error.includes('Invalid SS58')) {
    return `${fieldLabel} must be a valid account address`;
  }

  if (error.includes('must be a valid number')) {
    return `${fieldLabel} must be a valid number`;
  }

  if (error.includes('Hash must be')) {
    return `${fieldLabel} must be a valid hash (0x + 64 hex characters)`;
  }

  if (error.includes('Bytes must be')) {
    return `${fieldLabel} must be valid hex bytes (starting with 0x)`;
  }

  if (error.includes('Must be valid JSON')) {
    return `${fieldLabel} must be valid JSON format`;
  }

  if (error.includes('Must be one of')) {
    return error; // Already well formatted
  }

  // Default with type information
  return `${fieldLabel} must be a valid ${typeInfo.toLowerCase()}`;
}