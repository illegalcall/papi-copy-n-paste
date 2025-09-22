
"use client";

import React, { Component, ReactNode } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { AlertTriangle, RefreshCw, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { AppError } from '../../types/errors';
import { errorHandler, createError } from '../../utils/core/error-handler';

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorInfo: string | null;
  showDetails: boolean;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: AppError, retry: () => void) => ReactNode;
  onError?: (error: AppError, errorInfo: string) => void;
  maxRetries?: number;
  showRetryButton?: boolean;
  showDetailsButton?: boolean;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Convert JavaScript error to AppError
    const appError = errorHandler.createErrorFromException(error, 'system', {
      component: 'ErrorBoundary',
      action: 'render',
    });

    return {
      hasError: true,
      error: appError,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const appError = this.state.error || createError('SYSTEM_INITIALIZATION_FAILED');

    // Add React-specific context
    const enhancedError: AppError = {
      ...appError,
      context: {
        ...appError.context,
        reactErrorInfo: errorInfo,
        componentStack: errorInfo.componentStack,
      },
      technicalDetails: `${error.message}\n\nComponent Stack:\n${errorInfo.componentStack}`,
    };

    this.setState({
      error: enhancedError,
      errorInfo: errorInfo.componentStack || null,
    });

    // Report error to handler
    errorHandler.handleError(enhancedError);

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(enhancedError, errorInfo.componentStack || '');
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    const maxRetries = this.props.maxRetries || 3;

    if (this.state.retryCount >= maxRetries) {
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: prevState.retryCount + 1,
    }));

    // Add a small delay to prevent immediate re-error
    this.retryTimeoutId = setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  handleToggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  handleCopyError = async () => {
    if (!this.state.error) return;

    const errorDetails = {
      code: this.state.error.code,
      message: this.state.error.message,
      userMessage: this.state.error.userMessage,
      timestamp: new Date(this.state.error.timestamp).toISOString(),
      context: this.state.error.context,
      technicalDetails: this.state.error.technicalDetails,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  handleRefreshPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return this.renderDefaultErrorUI();
    }

    return this.props.children;
  }

  private renderDefaultErrorUI() {
    const { error } = this.state;
    if (!error) return null;

    const {
      showRetryButton = true,
      showDetailsButton = true,
      maxRetries = 3,
    } = this.props;

    const canRetry = showRetryButton && this.state.retryCount < maxRetries;
    const suggestions = errorHandler.getRecoverySuggestions(error);

    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-lg w-full space-y-6">
          {/* Main Error Alert */}
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">Something went wrong</h3>
                  <p className="mt-1">{errorHandler.getUserMessage(error)}</p>
                </div>

                {/* Error Code */}
                <div className="text-sm">
                  <span className="font-medium">Error Code:</span>{' '}
                  <code className="bg-red-100 px-1 py-0.5 rounded text-red-700">
                    {error.code}
                  </code>
                </div>

                {/* Recovery Suggestions */}
                {suggestions.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-2">Try these solutions:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {canRetry && (
              <Button onClick={this.handleRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
                {this.state.retryCount > 0 && (
                  <span className="text-xs opacity-75">
                    ({this.state.retryCount}/{maxRetries})
                  </span>
                )}
              </Button>
            )}

            <Button
              variant="outline"
              onClick={this.handleRefreshPage}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>

            {showDetailsButton && (
              <Button
                variant="ghost"
                onClick={this.handleToggleDetails}
                className="flex items-center gap-2"
              >
                {this.state.showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show Details
                  </>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={this.handleCopyError}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Error
            </Button>
          </div>

          {/* Technical Details (Collapsible) */}
          {this.state.showDetails && (
            <Alert>
              <AlertDescription>
                <div className="space-y-3">
                  <h4 className="font-medium">Technical Details</h4>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Timestamp:</span>{' '}
                      {new Date(error.timestamp).toLocaleString()}
                    </div>

                    <div>
                      <span className="font-medium">Category:</span>{' '}
                      <span className="capitalize">{error.category}</span>
                    </div>

                    <div>
                      <span className="font-medium">Severity:</span>{' '}
                      <span className="capitalize">{error.severity}</span>
                    </div>

                    {error.technicalDetails && (
                      <div>
                        <span className="font-medium">Details:</span>
                        <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                          {error.technicalDetails}
                        </pre>
                      </div>
                    )}

                    {error.context && Object.keys(error.context).length > 0 && (
                      <div>
                        <span className="font-medium">Context:</span>
                        <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                          {JSON.stringify(error.context, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Higher-order component to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Hook to manually trigger error boundary (useful for async errors)
 */
export function useErrorBoundary() {
  const [, setState] = React.useState();

  return React.useCallback((error: Error | AppError) => {
    setState(() => {
      throw error;
    });
  }, []);
}