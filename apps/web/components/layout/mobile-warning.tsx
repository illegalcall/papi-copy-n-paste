"use client";

import React from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Monitor, Smartphone, X } from "lucide-react";

interface MobileWarningProps {
  onDismiss: () => void;
}

export function MobileWarning({ onDismiss }: MobileWarningProps) {
  // Prevent all scrolling when modal is open
  React.useEffect(() => {
    // Prevent scrolling on both body and html
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlHeight = document.documentElement.style.height;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.documentElement.style.height = '100%';

    // Prevent touch scrolling
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.height = originalBodyHeight;
      document.documentElement.style.height = originalHtmlHeight;
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm overflow-hidden touch-none lg:hidden">
      <div className="flex items-center justify-center h-full w-full p-4 overflow-hidden">
        <Card className="w-full max-w-lg shadow-2xl border-2 relative overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Monitor className="h-16 w-16 text-primary" />
              <div className="absolute -bottom-2 -right-2 bg-destructive rounded-full p-1">
                <Smartphone className="h-4 w-4 text-destructive-foreground" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Desktop Required
          </CardTitle>
          <CardDescription className="text-base">
            Copy‑n‑Paste PAPI is optimized for desktop development workflows
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Why Desktop?
            </h4>
            <ul className="text-sm space-y-1 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Complex three-pane interface for browsing pallets, calls, and code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Code editor with syntax highlighting and copy functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Developer tools require wider screens for optimal experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Side-by-side comparison of generated code and documentation</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <p className="text-sm font-medium">
              <Monitor className="inline h-4 w-4 mr-1" />
              <span className="font-semibold">Recommended:</span> Desktop or laptop with minimum 1024px width
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button
            onClick={onDismiss}
            variant="outline"
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Continue Anyway
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            You can dismiss this warning, but the experience may be limited on mobile devices.
          </p>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}