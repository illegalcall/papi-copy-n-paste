"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { ChainProvider } from "../contexts/ChainContext";
// import { WalletProvider } from "../contexts/WalletContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {/* Context providers temporarily disabled for testing */}
      {/* <ChainProvider> */}
        {/* <WalletProvider> */}
          {children}
        {/* </WalletProvider> */}
      {/* </ChainProvider> */}
    </NextThemesProvider>
  );
}
