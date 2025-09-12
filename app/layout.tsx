/**
 * Root Layout Component for GBDC Website
 * 
 * This is the main layout file that handles locale routing redirects.
 * The actual layout with header/footer is now in the [locale]/layout.tsx file.
 * This root layout is minimal and only handles the initial routing setup.
 * 
 * Features:
 * - Locale routing setup (handled by middleware)
 * - Global styles and font configuration
 * - Theme provider for consistency
 * - Minimal layout for locale routing
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Layout components
import { ThemeProvider } from "@/components/providers/theme-provider";

/**
 * Font Configuration
 * Professional, child-friendly typography for the daycare website
 */

// Geist Sans - Clean, modern font perfect for a professional daycare
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

// Geist Mono - Monospace font for any code or technical content
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only load when needed
});

/**
 * Root Metadata
 * Basic metadata for the root layout (most SEO handled in locale layouts)
 */
export const metadata: Metadata = {
  title: "Great Beginnings Day Care - Roselle, IL",
  description: "Premier daycare center in Roselle, Illinois. Providing quality childcare, early education, and nurturing environment for infants through school-age children since 1995.",
  
  // Basic robots configuration
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root Layout Component
 * 
 * Minimal root layout that allows locale routing to work.
 * The middleware will redirect requests to the appropriate [locale] route.
 * 
 * @param children - All the page content that will be rendered
 * @returns Basic HTML structure for locale routing
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

/**
 * Root Layout Features:
 * 
 * 1. Locale Routing: Middleware handles automatic locale detection
 * 2. Font Configuration: Global font variables for all locales
 * 3. Theme Provider: Consistent theming across all locales
 * 4. Minimal Structure: Actual layout handled in [locale]/layout.tsx
 * 5. Performance: Lightweight root layout for fast initial loading
 */
