
export type LogLevel = 'info' | 'success' | 'error' | 'warning';

export interface CleanLoggerOptions {
  showTechnicalDetails?: boolean;
  showTimestamps?: boolean;
  prefix?: string;
  onResult?: (result: QueryResult) => void;
}

export interface QueryResult {
  queryType: string;
  pallet: string;
  storage: string;
  result: any;
  status: 'success' | 'error' | 'loading';
  error?: string;
  rawData?: any; // Store original data for summarized arrays
}

export interface ArrayResult {
  type: 'array-result';
  displayText: string;
  rawData: any[];
  label: string;
}

export class CleanLogger {
  private setOutput: React.Dispatch<React.SetStateAction<string[]>>;
  private options: CleanLoggerOptions;

  constructor(
    setOutput: React.Dispatch<React.SetStateAction<string[]>>,
    options: CleanLoggerOptions = {}
  ) {
    this.setOutput = setOutput;
    this.options = {
      showTechnicalDetails: false,
      showTimestamps: false,
      ...options,
    };
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.options.showTimestamps ? `[${new Date().toLocaleTimeString()}] ` : '';
    const prefix = this.options.prefix ? `${this.options.prefix}: ` : '';

    switch (level) {
      case 'success':
        return `${timestamp}${prefix}✓ ${message}`;
      case 'error':
        return `${timestamp}${prefix}✗ ${message}`;
      case 'warning':
        return `${timestamp}${prefix}⚠ ${message}`;
      default:
        return `${timestamp}${prefix}${message}`;
    }
  }

  info(message: string): void {
    this.setOutput(prev => [...prev, this.formatMessage('info', message)]);
  }

  success(message: string): void {
    this.setOutput(prev => [...prev, this.formatMessage('success', message)]);
  }

  error(message: string): void {
    this.setOutput(prev => [...prev, this.formatMessage('error', message)]);
  }

  warning(message: string): void {
    this.setOutput(prev => [...prev, this.formatMessage('warning', message)]);
  }

  result(label: string, value: any): void {
    const formattedValue = this.formatResult(value);

    // Check if this is a summarized array that needs a copy button
    if (Array.isArray(value) && value.length > 5) {
      // Create an ArrayResult object for large arrays
      const arrayResult: ArrayResult = {
        type: 'array-result',
        displayText: `${label}: ${formattedValue}`,
        rawData: value,
        label: label
      };
      this.setOutput(prev => [...prev, arrayResult as any]);
    } else {
      // Regular string output for non-large arrays
      this.setOutput(prev => [...prev, `${label}: ${formattedValue}`]);
    }
  }

  private formatResult(value: any): string {
    if (value === null || value === undefined) {
      return 'null';
    }

    if (typeof value === 'bigint') {
      return value.toString();
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]';
      }

      // For arrays with many empty objects, show count instead of full array
      if (value.every(item => typeof item === 'object' && Object.keys(item).length === 0)) {
        return `[${value.length} empty objects]`;
      }

      // Limit array display to first few items if very long
      if (value.length > 5) {
        const preview = value.slice(0, 3);
        return `[${JSON.stringify(preview).slice(1, -1)}, ... +${value.length - 3} more]`;
      }
    }

    if (typeof value === 'object') {
      // For empty objects, show as empty
      if (Object.keys(value).length === 0) {
        return '{}';
      }

      try {
        return JSON.stringify(value, (_, val) =>
          typeof val === 'bigint' ? val.toString() : val, 2
        );
      } catch {
        return '[Complex Object]';
      }
    }

    return String(value);
  }

  // Storage query specific methods
  startQuery(pallet: string, storage: string, queryType: string): void {
    this.info(`Querying ${pallet}.${storage} (${queryType})`);
  }

  querySuccess(pallet: string, storage: string, _queryType: string, result: any): void {
    this.success(`${pallet}.${storage} query completed`);
    this.result('Result', result);
  }

  queryError(pallet: string, storage: string, _queryType: string, error: string): void {
    this.error(`${pallet}.${storage} query failed: ${error}`);
  }

  // Transaction specific methods
  startTransaction(pallet: string, call: string): void {
    this.info(`Executing ${pallet}.${call} transaction`);
  }

  transactionSuccess(pallet: string, call: string, hash: string): void {
    this.success(`${pallet}.${call} transaction completed`);
    this.result('Hash', hash);
  }

  transactionError(pallet: string, call: string, error: string): void {
    this.error(`${pallet}.${call} transaction failed: ${error}`);
  }

  // Batch operations
  startBatch(type: 'queries' | 'transactions', count: number): void {
    this.info(`Starting ${count} ${type}...`);
  }

  batchComplete(type: 'queries' | 'transactions', count: number): void {
    this.success(`All ${count} ${type} completed`);
  }

  batchItem(current: number, total: number, name: string): void {
    this.info(`[${current}/${total}] ${name}`);
  }
}

// Factory function for creating clean loggers
export function createCleanLogger(
  setOutput: React.Dispatch<React.SetStateAction<string[]>>,
  options?: CleanLoggerOptions
): CleanLogger {
  return new CleanLogger(setOutput, options);
}

