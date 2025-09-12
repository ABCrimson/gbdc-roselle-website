/**
 * Root Layout Component for GBDC Website
 * 
 * This is the main layout file that wraps EVERY page in the application.
 * It provides the complete structure including header, footer, and theme support
 * for the Great Beginnings Day Care website.
 * 
 * Features:
 * - Professional typography with Google Fonts
 * - Theme provider for light/dark mode support
 * - Responsive header with navigation
 * - Comprehensive footer with contact information
 * - Proper hydration boundaries for client components
 * - SEO-optimized metadata
 * - Accessibility-compliant structure
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Layout components
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
 * Website Metadata
 * Comprehensive SEO and social media optimization for the daycare
 */
export const metadata: Metadata = {
  title: {
    default: "Great Beginnings Day Care - Roselle, IL",
    template: "%s | Great Beginnings Day Care"
  },
  description: "Premier daycare center in Roselle, Illinois. Providing quality childcare, early education, and nurturing environment for infants through school-age children since 1995.",
  
  // Keywords for local SEO
  keywords: [
    "daycare", "childcare", "preschool", "Roselle IL", "early education", 
    "infant care", "toddler care", "after school care", "summer camp",
    "licensed daycare", "quality childcare", "nurturing environment"
  ],
  
  // Author and publisher information
  authors: [{ name: "Great Beginnings Day Care", url: "https://greatbeginningsdaycare.com" }],
  creator: "Great Beginnings Day Care",
  publisher: "Great Beginnings Day Care",
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greatbeginningsdaycare.com",
    siteName: "Great Beginnings Day Care",
    title: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
    description: "Premier daycare center providing quality childcare, early education, and nurturing environment for children in Roselle, Illinois.",
    images: [
      {
        url: "/og-image.jpg", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@gbdaycare", // Add your Twitter handle
    creator: "@gbdaycare",
    title: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
    description: "Premier daycare center providing quality childcare and early education in Roselle, Illinois.",
    images: ["/og-image.jpg"],
  },
  
  // Additional metadata
  category: "Childcare & Education",
  verification: {
    // Add verification IDs when you have them
    // google: "your-google-verification-id",
    // yandex: "your-yandex-verification-id",
  },
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Root Layout Component
 * 
 * @param children - All the page content that will be rendered
 * @returns The complete HTML structure with header, footer, and theme support
 * 
 * Architecture:
 * 1. HTML with proper lang attribute for accessibility
 * 2. Theme provider wrapping everything for consistent theming
 * 3. Header with navigation (Server Component)
 * 4. Main content area for each page
 * 5. Footer with comprehensive information (Server Component)
 * 6. Proper font loading and CSS custom properties
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Theme Provider - wraps everything to provide theme context */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Site Header - Navigation and branding */}
          <Header />
          
          {/* Main Content Area - where each page's content will appear */}
          <main className="flex-1" role="main">
            {children}
          </main>
          
          {/* Site Footer - Contact info, links, and legal */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

/**
 * Layout Features:
 * 
 * 1. Server Components: Header and Footer are server-rendered for performance
 * 2. Client Components: Theme provider enables client-side theme switching
 * 3. Hydration Boundaries: Proper separation prevents hydration mismatches
 * 4. Accessibility: Semantic HTML, proper ARIA roles, language attributes
 * 5. SEO Optimized: Comprehensive metadata for search engines
 * 6. Performance: Font loading optimization, minimal client-side JavaScript
 * 7. Responsive: Mobile-first design throughout
 * 8. Professional: Suitable for a childcare business website
 * 9. Extensible: Easy to add new features and pages
 */
