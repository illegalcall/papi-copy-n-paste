"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { AlertTriangle } from "lucide-react";

interface ContractsErrorBoundaryProps {
  children: ReactNode;
}

interface ContractsErrorBoundaryState {
  error: Error | null;
}

/**
 * React error boundary for the Contract IDE. Must be a class component —
 * React error boundaries cannot be expressed with hooks.
 *
 * On error, renders a minimal fallback with the error message and a "Retry"
 * button that resets the boundary so a fresh render can attempt recovery.
 */
export class ContractsErrorBoundary extends Component<
  ContractsErrorBoundaryProps,
  ContractsErrorBoundaryState
> {
  constructor(props: ContractsErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ContractsErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Keep the log simple — the page-level boundary should not add heavy
    // instrumentation. Surface to devtools so users can inspect the stack.
    // eslint-disable-next-line no-console
    console.error("[ContractsErrorBoundary]", error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="max-w-lg w-full space-y-4">
            <Alert role="alert" className="border-destructive text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <div className="font-semibold mb-1">
                  The Contract IDE hit an unexpected error.
                </div>
                <div className="font-mono text-xs break-words">
                  {this.state.error.message}
                </div>
              </AlertDescription>
            </Alert>
            <div className="flex justify-end">
              <Button onClick={this.handleRetry} size="sm">
                Retry
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
