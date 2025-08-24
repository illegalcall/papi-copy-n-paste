/**
 * Shared component type definitions
 */

// Core blockchain types
export interface PalletInfo {
  name: string;
  calls: CallInfo[];
  constants: ConstantInfo[];
  storage: StorageInfo[];
  events: EventInfo[];
  errors: ErrorInfo[];
}

export interface CallInfo {
  name: string;
  args: ArgumentInfo[];
  docs?: string[];
  documentation?: string[];
}

export interface ArgumentInfo {
  name: string;
  type: string;
  typeName?: string;
}

export interface ConstantInfo {
  name: string;
  type: string;
  value: Uint8Array | string;
  docs?: string[];
  documentation?: string[];
}

export interface StorageInfo {
  name: string;
  type: string;
  modifier: 'Optional' | 'Default';
  fallback?: string;
  docs?: string[];
  documentation?: string[];
}

export interface EventInfo {
  name: string;
  args: ArgumentInfo[];
  docs?: string[];
  documentation?: string[];
}

export interface ErrorInfo {
  name: string;
  docs?: string[];
  documentation?: string[];
}

// Tree component types
export interface TreeNode {
  id: string;
  name: string;
  type: 'pallet' | 'call' | 'storage' | 'constant' | 'event' | 'error';
  children?: TreeNode[];
  isExpanded?: boolean;
  metadata?: Record<string, unknown>;
}

export interface TreeSelectionState {
  pallet?: string;
  call?: CallInfo;
  storage?: StorageInfo;
  constant?: ConstantInfo;
  event?: EventInfo;
  error?: ErrorInfo;
}

// Form component types
export interface FormFieldProps {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

// Code generation types
export interface CodeGenerationOptions {
  includeComments?: boolean;
  includeImports?: boolean;
  includeSetup?: boolean;
  format?: 'typescript' | 'javascript';
  style?: 'modern' | 'classic';
}

export interface GeneratedCode {
  code: string;
  imports: string[];
  setup?: string[];
  examples?: string[];
}

// Transaction types (extending from PageContent.tsx)
export interface TransactionInfo {
  pallet: string;
  call: string;
  args: Record<string, unknown>;
  method?: unknown;
}

export interface TransactionResult {
  hash: string;
  blockHash?: string;
  blockNumber?: string;
  success: boolean;
  error?: string;
  events?: Record<string, unknown>[];
  fee?: string;
  timestamp: number;
}

export interface TransactionEvent {
  type: string;
  txHash?: string;
  blockHash?: string;
  blockNumber?: string;
}

// Layout component types
export interface PaneProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LeftPaneProps extends PaneProps {
  palletTree: PalletInfo[];
  onSelection: (selection: TreeSelectionState) => void;
  selectedChain: string;
}

export interface CenterPaneProps extends PaneProps {
  selectedPallet?: string;
  selectedCall?: CallInfo;
  selectedStorage?: StorageInfo;
  selectedConstant?: ConstantInfo;
  selectedEvent?: EventInfo;
  selectedError?: ErrorInfo;
  onFormChange: (data: Record<string, unknown>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export interface RightPaneProps extends PaneProps {
  generatedCode: GeneratedCode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Utility types
export type ChainKey = string;
export type PalletName = string;
export type CallName = string;
export type StorageName = string;
export type ConstantName = string;
export type EventName = string;
export type ErrorName = string;

// Component state types
export interface ComponentState<T = unknown> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

// Search types
export interface SearchResult {
  type: 'pallet' | 'call' | 'storage' | 'constant' | 'event' | 'error';
  pallet: string;
  name: string;
  description?: string;
  relevance: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  selectedIndex: number;
}