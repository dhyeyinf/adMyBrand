"use client"; // Mark as client component since it uses hooks
import * as React from "react";
import { ThemeProvider as NextThemesProvider} from "next-themes";
import { type ThemeProviderProps } from "next-themes"; // Correct import for types

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}