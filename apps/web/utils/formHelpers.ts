/**
 * Consolidated form helper utilities
 * Extracted from repeated patterns across components
 */

import type { FormData } from '../types/forms';

/**
 * Parse simple type string to determine input field type
 */
export function parseSimpleType(type: string): string {
  if (type.includes("Bool") || type === "bool") return "bool";
  if (type.includes("AccountId") || type.includes("MultiAddress"))
    return "account";
  if (
    type.includes("u8") ||
    type.includes("u16") ||
    type.includes("u32") ||
    type.includes("u64") ||
    type.includes("u128") ||
    type.includes("i8") ||
    type.includes("i16") ||
    type.includes("i32") ||
    type.includes("i64") ||
    type.includes("i128") ||
    type.includes("Balance") ||
    type.includes("Compact")
  )
    return "number";
  return "string";
}

/**
 * Get default value for a given type
 */
export function getDefaultValue(type: string): any {
  const simpleType = parseSimpleType(type);
  switch (simpleType) {
    case "bool":
      return false;
    case "number":
      return 0;
    case "account":
      return "//Alice";
    default:
      return "";
  }
}

/**
 * Generic field change handler factory
 */
export function createFieldChangeHandler(
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) {
  return (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
}

/**
 * Initialize form data from arguments/parameters
 */
export function initializeFormData(args: Array<{ name: string; type: string }>): FormData {
  const initialData: FormData = {};
  args.forEach((arg) => {
    initialData[arg.name] = getDefaultValue(arg.type);
  });
  return initialData;
}

/**
 * Check if form data has changed from initial values
 */
export function hasFormDataChanged(
  currentData: FormData,
  initialData: FormData,
  args: Array<{ name: string }>
): boolean {
  return args.length > 0 && args.some((arg) => {
    const currentValue = currentData[arg.name];
    const initialValue = initialData[arg.name];
    return currentValue !== initialValue;
  });
}