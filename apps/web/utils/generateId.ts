/**
 * Generate a random ID for queue items and other components
 * Centralized utility to avoid code duplication
 */
export const generateId = (): string => Math.random().toString(36).substr(2, 9);