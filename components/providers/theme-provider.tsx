"use client"

/**
 * Theme Provider Component for GBDC Website
 * 
 * This component provides theme switching functionality using next-themes.
 * It wraps the entire application to enable light/dark mode support
 * throughout all pages and components.
 * 
 * Features:
 * - Automatic system theme detection
 * - Prevents hydration mismatches
 * - Smooth theme transitions
 * - Persistent theme preferences
 */

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * Custom Theme Provider wrapper
 * 
 * @param children - All child components that will have access to theme
 * @param props - Additional theme provider configuration
 * @returns Theme provider with GBDC-specific defaults
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * Configuration explanation:
 * 
 * - attribute="class": Uses CSS classes (.light/.dark) instead of data attributes
 * - defaultTheme="light": Starts with light theme (friendly for daycare)
 * - enableSystem=true: Respects user's system preference
 * - disableTransitionOnChange=false: Smooth animations when switching themes
 */