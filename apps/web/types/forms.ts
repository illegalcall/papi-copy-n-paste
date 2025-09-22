
// Generic form data type for parameter forms
export type FormData = Record<string, any>;

// Storage query parameter type
export type StorageParams = Record<string, any>;

// Standard form change handler
export interface FormChangeHandler {
  (formData: FormData): void;
}

// Standard validation change handler
export interface ValidChangeHandler {
  (isValid: boolean): void;
}

// Storage parameter change handler
export interface StorageParamsChangeHandler {
  (params: StorageParams): void;
}

// Queue item interfaces for better type safety
export interface MethodQueueItem {
  pallet: string;
  call: any; // PalletCall type
  formData: FormData;
  id: string;
}

export interface StorageQueueItem {
  pallet: string;
  storage: any;
  queryType: string;
  storageParams: StorageParams;
  id: string;
}