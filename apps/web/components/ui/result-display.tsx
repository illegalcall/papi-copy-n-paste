import React, { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  queryType: string;
  pallet: string;
  storage: string;
  result: unknown;
  status: 'success' | 'error' | 'loading';
  error?: string;
}

export function ResultDisplay({
  queryType,
  pallet,
  storage,
  result,
  status,
  error
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const formatResult = (value: unknown): string => {
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

      // Format arrays nicely
      try {
        return JSON.stringify(value, (key, val) =>
          typeof val === 'bigint' ? val.toString() + 'n' : val, 2
        );
      } catch {
        return `[Array with ${value.length} items]`;
      }
    }

    if (typeof value === 'object') {
      // For empty objects
      if (Object.keys(value).length === 0) {
        return '{}';
      }

      try {
        return JSON.stringify(value, (key, val) =>
          typeof val === 'bigint' ? val.toString() + 'n' : val, 2
        );
      } catch {
        return '[Complex Object]';
      }
    }

    if (typeof value === 'string') {
      return `"${value}"`;
    }

    return String(value);
  };

  const copyResult = async () => {
    try {
      const textToCopy = formatResult(result);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getQueryTypeColor = (type: string) => {
    switch (type) {
      case 'getValue': return 'text-blue-600 bg-blue-50';
      case 'getEntries': return 'text-green-600 bg-green-50';
      case 'getKeys': return 'text-purple-600 bg-purple-50';
      case 'watchValue': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'loading': return '⏳';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'loading': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Query Info Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {pallet}.{storage}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getQueryTypeColor(queryType)}`}>
            {queryType}
          </span>
        </div>

        {status === 'success' && (
          <Button
            variant="outline"
            size="sm"
            onClick={copyResult}
            className="h-8 px-2"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>

      {/* Result Content */}
      {status === 'loading' && (
        <div className="text-sm text-gray-500 italic">
          Executing query...
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <div className="text-sm text-red-600 font-medium mb-1">Error</div>
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden">
          <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Result
            </span>
          </div>
          <div className="p-3">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono overflow-x-auto">
              {formatResult(result)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}