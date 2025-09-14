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
 * Root Metadata with Next.js 15.5.2 Metadata API
 * Comprehensive SEO configuration with OpenGraph and Twitter cards
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://greatbeginningsdaycare.com'),
  title: {
    default: "Great Beginnings Day Care - Premier Childcare in Roselle, IL",
    template: "%s | Great Beginnings Day Care",
  },
  description: "Premier daycare center in Roselle, Illinois. Providing quality childcare, early education, and nurturing environment for infants through school-age children since 2014. Licensed, accredited, and owned by experienced educators.",
  keywords: [
    'daycare roselle il',
    'childcare roselle illinois',
    'preschool roselle',
    'infant care roselle',
    'toddler daycare',
    'great beginnings day care',
    'early childhood education',
    'after school care roselle',
    'summer camp roselle',
    'daycare near me',
  ],
  authors: [{ name: 'Great Beginnings Day Care' }],
  creator: 'Great Beginnings Day Care',
  publisher: 'Great Beginnings Day Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // OpenGraph configuration
  openGraph: {
    title: 'Great Beginnings Day Care - Where Learning Begins',
    description: 'Premier childcare center in Roselle, IL. Nurturing children aged 6 weeks to 12 years with love, learning, and laughter since 2014.',
    url: 'https://greatbeginningsdaycare.com',
    siteName: 'Great Beginnings Day Care',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Great Beginnings Day Care - Premier Childcare Center',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card configuration
  twitter: {
    card: 'summary_large_image',
    title: 'Great Beginnings Day Care - Roselle, IL',
    description: 'Premier childcare & early education center. Ages 6 weeks to 12 years. Licensed & accredited. Call (630) 894-3440',
    images: ['/twitter-image.png'],
    creator: '@gbdcroselle',
    site: '@gbdcroselle',
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },

  // Manifest link
  manifest: '/manifest.webmanifest',

  // Verification for search engines
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    other: {
      me: ['info@greatbeginningsdaycare.com', 'https://greatbeginningsdaycare.com'],
    },
  },

  // Alternate languages
  alternates: {
    canonical: 'https://greatbeginningsdaycare.com',
    languages: {
      'en-US': 'https://greatbeginningsdaycare.com/en',
      'es-ES': 'https://greatbeginningsdaycare.com/es',
      'ru-RU': 'https://greatbeginningsdaycare.com/ru',
      'uk-UA': 'https://greatbeginningsdaycare.com/uk',
    },
  },

  // Other metadata
  category: 'education',
  classification: 'Childcare & Early Education',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },

  // Apple-specific
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GBDC Roselle',
  },

  // App-specific metadata
  applicationName: 'Great Beginnings Day Care',
  generator: 'Next.js',

  // Additional meta tags
  other: {
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#1e40af',
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
