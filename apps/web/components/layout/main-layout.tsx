/**
 * Main layout component for the application
 * Handles the overall page structure and mobile responsiveness
 */

import React, { memo } from 'react';
import { Header } from './header';
import { MobileWarning } from './mobile-warning';
import { Sheet, SheetContent } from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  showMobileWarning: boolean;
  onDismissMobileWarning: () => void;
  isMobileSheetOpen: boolean;
  onMobileSheetOpenChange: (open: boolean) => void;
  mobileLeftPaneContent?: React.ReactNode;
  selectedChain: string;
  selectedProvider: string;
  onNetworkChange: (chainKey: string, providerId: string) => void;
}

export const MainLayout = memo(({
  children,
  showMobileWarning,
  onDismissMobileWarning,
  isMobileSheetOpen,
  onMobileSheetOpenChange,
  mobileLeftPaneContent,
  selectedChain,
  selectedProvider,
  onNetworkChange,
}: MainLayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Header
        selectedChain={selectedChain}
        selectedProvider={selectedProvider}
        onNetworkChange={onNetworkChange}
      />

      {showMobileWarning && (
        <MobileWarning onDismiss={onDismissMobileWarning} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile menu button - visible only on mobile */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMobileSheetOpenChange(true)}
            className="m-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile sheet for left pane */}
        <Sheet open={isMobileSheetOpen} onOpenChange={onMobileSheetOpenChange}>
          <SheetContent side="left" className="w-80 p-0">
            {mobileLeftPaneContent}
          </SheetContent>
        </Sheet>

        {/* Main content area */}
        {children}
      </div>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';