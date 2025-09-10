"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider
      enableSystem
      defaultTheme="blue"
      attribute="data-theme" // important for custom themes
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
