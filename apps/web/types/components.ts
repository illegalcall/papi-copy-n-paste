// Core blockchain types

export interface StorageInfo {
  name: string;
  type: string;
  modifier: 'Optional' | 'Default';
  fallback?: string;
  docs?: string[];
  documentation?: string[];
}