/**
 * Locale-aware Layout Component for GBDC Website
 * 
 * This layout handles the dynamic locale routing and provides translations
 * to all child pages within the [locale] directory structure.
 * 
 * Features:
 * - Dynamic locale parameter handling
 * - Translation context for all child components
 * - Locale-specific metadata and SEO optimization
 * - RTL layout support (ready for future Arabic support)
 * - Proper HTML lang attribute for accessibility
 * - Server Component with no client-side JavaScript for translations
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

// i18n imports
import { type Locale, locales, defaultLocale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";
import { getLocaleConfig, isRTL } from "@/lib/i18n/config";

// Layout components
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LocaleHeader } from "@/components/layout/locale-header";
import { LocaleFooter } from "@/components/layout/locale-footer";

// Global styles
import "../globals.css";

/**
 * Font Configuration
 * Professional, child-friendly typography for the daycare website
 * Supports international character sets for all supported locales
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

/**
 * Static params generation for all supported locales
 * This enables static generation of all locale routes at build time
 */
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/**
 * Generate locale-specific metadata
 * SEO optimization for each supported language
 */
export async function generateMetadata({ 
  params 
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const localeConfig = getLocaleConfig(locale);
  
  // Get localized content for metadata
  const title = "Great Beginnings Day Care - Roselle, IL";
  const description = t("hero.description");
  
  return {
    title: {
      default: title,
      template: `%s | Great Beginnings Day Care`
    },
    description,
    
    // Language-specific metadata
    alternates: {
      canonical: `https://greatbeginningsdaycare.com/${locale}`,
      languages: {
        en: "https://greatbeginningsdaycare.com/en",
        es: "https://greatbeginningsdaycare.com/es",
        ru: "https://greatbeginningsdaycare.com/ru",
        uk: "https://greatbeginningsdaycare.com/uk",
      },
    },
    
    // Open Graph metadata with locale
    openGraph: {
      type: "website",
      locale: locale === 'en' ? 'en_US' : 
              locale === 'es' ? 'es_ES' :
              locale === 'ru' ? 'ru_RU' :
              locale === 'uk' ? 'uk_UA' : 'en_US',
      alternateLocale: locales.filter(l => l !== locale).map(l => 
        l === 'en' ? 'en_US' :
        l === 'es' ? 'es_ES' :
        l === 'ru' ? 'ru_RU' :
        l === 'uk' ? 'uk_UA' : 'en_US'
      ),
      url: `https://greatbeginningsdaycare.com/${locale}`,
      siteName: "Great Beginnings Day Care",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      site: "@gbdaycare",
      creator: "@gbdaycare", 
      title,
      description,
      images: ["/og-image.jpg"],
    },
    
    // Additional SEO metadata
    keywords: [
      "daycare", "childcare", "preschool", "Roselle IL", "early education",
      "infant care", "toddler care", "after school care", "summer camp",
      "licensed daycare", "quality childcare", "nurturing environment"
    ],
    
    authors: [{ name: "Great Beginnings Day Care", url: "https://greatbeginningsdaycare.com" }],
    creator: "Great Beginnings Day Care",
    publisher: "Great Beginnings Day Care",
    category: "Childcare & Education",
    
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
}

/**
 * Locale Layout Component
 * 
 * @param params - Contains the dynamic locale parameter
 * @param children - Child pages to render within this layout
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Validate locale parameter
  if (!locales.includes(locale)) {
    notFound();
  }
  
  // Get locale configuration
  const localeConfig = getLocaleConfig(locale);
  const isRightToLeft = isRTL(locale);
  
  // Get translations for the layout
  const t = await getTranslations(locale);

  // Prepare JSON-LD data with translations
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": t("hero.title"),
    "description": t("hero.description"),
    "url": `https://greatbeginningsdaycare.com/${locale}`,
    "inLanguage": locale,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Roselle",
      "addressRegion": "IL",
      "postalCode": "60172",
      "addressCountry": "US"
    },
    "telephone": "(630) 555-0123",
    "email": "info@greatbeginningsdaycare.com",
  };

  return (
    <html
      lang={locale}
      dir={localeConfig.dir}
      suppressHydrationWarning
    >
      <head>
        {/* Locale-specific meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content={locale} />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Alternate language links for SEO */}
        {locales.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://greatbeginningsdaycare.com/${lang}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://greatbeginningsdaycare.com/${defaultLocale}`}
        />

        {/* JSON-LD structured data for the locale */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData)
          }}
        />
      </head>
      
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased min-h-screen flex flex-col
          ${isRightToLeft ? 'rtl' : 'ltr'}
        `}
      >
        {/* Theme Provider - wraps everything to provide theme context */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Locale-aware Header with language switcher */}
          <LocaleHeader locale={locale} />
          
          {/* Main Content Area - where each page's content will appear */}
          <main className="flex-1" role="main">
            {children}
          </main>
          
          {/* Locale-aware Footer */}
          <LocaleFooter locale={locale} />
        </ThemeProvider>
        
        {/* Performance monitoring (only in production) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Vercel Analytics */}
            <script
              defer
              src="/_vercel/insights/script.js"
            />
            
            {/* Web Vitals tracking */}
            <script
              defer
              src="/_vercel/speed-insights/script.js"
            />
          </>
        )}
      </body>
    </html>
  );
}

/**
 * Layout Features:
 * 
 * 1. Server Components: Entire layout renders on server for performance
 * 2. Dynamic Locale Support: Handles all 4 supported languages (en, es, ru, uk)
 * 3. SEO Optimized: Proper hreflang tags, canonical URLs, structured data
 * 4. Accessibility: Proper lang and dir attributes, semantic HTML
 * 5. Performance: Font optimization, preconnections, minimal client JS
 * 6. RTL Ready: Prepared for future right-to-left language support
 * 7. Type Safe: Full TypeScript support with proper locale typing
 * 8. Child Friendly: Appropriate for a daycare business
 * 9. Translation Ready: Server-side translation system integrated
 * 10. Production Optimized: Analytics and monitoring in production only
 */