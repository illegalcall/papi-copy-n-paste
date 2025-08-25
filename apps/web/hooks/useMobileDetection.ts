"use client";

import { useState, useEffect } from "react";
import { BooleanString } from "../types/enums";

interface MobileDetectionHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  showMobileWarning: boolean;
  dismissMobileWarning: () => void;
}

// Breakpoints that match the project's design requirements
const BREAKPOINTS = {
  mobile: 640,    // sm breakpoint
  tablet: 768,    // md breakpoint
  desktop: 1024,  // lg breakpoint - minimum for three-pane layout
} as const;

export function useMobileDetection(): MobileDetectionHook {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [showMobileWarning, setShowMobileWarning] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    // Initial screen width check
    const checkScreenWidth = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Show warning if screen is smaller than desktop breakpoint
      // and user hasn't dismissed it yet (check localStorage)
      const hasUserDismissed = localStorage.getItem("mobile-warning-dismissed") === BooleanString.TRUE;

      if (width < BREAKPOINTS.desktop && !hasUserDismissed) {
        setShowMobileWarning(true);
      } else if (width >= BREAKPOINTS.desktop) {
        // Hide warning immediately when screen becomes desktop size
        setShowMobileWarning(false);
      }
    };

    // Set initial values
    checkScreenWidth();

    // Add resize listener
    const handleResize = () => {
      checkScreenWidth();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dismissMobileWarning = () => {
    setShowMobileWarning(false);
    // Remember user's choice in localStorage
    localStorage.setItem("mobile-warning-dismissed", "true");
  };

  // Calculate device type based on screen width
  const isMobile = screenWidth > 0 && screenWidth < BREAKPOINTS.mobile;
  const isTablet = screenWidth >= BREAKPOINTS.mobile && screenWidth < BREAKPOINTS.desktop;
  const isDesktop = screenWidth >= BREAKPOINTS.desktop;

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    showMobileWarning,
    dismissMobileWarning,
  };
}