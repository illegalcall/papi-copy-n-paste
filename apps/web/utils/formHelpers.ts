
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
 * Check if form has valid values (regardless of whether they're default or user-changed)
 */
export function hasValidFormData(
  currentData: FormData,
  args: Array<{ name: string; type: string }>
): boolean {
  // If no parameters, form is valid
  if (args.length === 0) return true;

  // Check that all required parameters have valid values
  return args.every((arg) => {
    const value = currentData[arg.name];
    const fieldType = parseSimpleType(arg.type);

    // Check if value is valid based on field type
    switch (fieldType) {
      case "bool":
        return typeof value === "boolean";
      case "number":
        return typeof value === "number" && value >= 0;
      case "account":
        return typeof value === "string" && value.length > 0;
      case "string":
        return typeof value === "string" && value.length > 0;
      default:
        return value != null && value !== "";
    }
  });
}