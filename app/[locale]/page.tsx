/**
 * Localized Homepage - Great Beginnings Day Care
 * 
 * Server-rendered homepage with full translation support.
 * Uses the locale parameter to provide content in the user's language.
 * 
 * Features:
 * - Server-side rendering for SEO and performance
 * - Full translation support for all content
 * - Locale-specific metadata and structured data
 * - Progressive enhancement with loading states
 * - Responsive design optimized for all devices
 * - Accessibility-first design patterns
 * - Child-friendly animations and interactions
 */

import { Suspense } from "react";
import type { Metadata } from "next";

// i18n imports
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";

// Import section components (now with translation support)
import { LocaleHero } from "@/components/sections/locale-hero";
import { LocaleFeatures } from "@/components/sections/locale-features";
import { LocalePrograms } from "@/components/sections/locale-programs";
import { LocaleTestimonials } from "@/components/sections/locale-testimonials";
import { LocaleStats } from "@/components/sections/locale-stats";
import { LocaleCTA } from "@/components/sections/locale-cta";

// Import loading skeletons
import {
  HeroSkeleton,
  FeaturesSkeleton,
  ProgramsSkeleton,
  TestimonialsSkeleton,
  StatsSkeleton,
  CTASkeleton
} from "@/components/ui/loading-skeletons";

/**
 * Page Props Interface
 */
interface LocalePageProps {
  params: { locale: Locale };
}

/**
 * Generate locale-specific metadata for SEO
 */
export async function generateMetadata({ 
  params 
}: LocalePageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations(locale);
  
  const title = t("hero.title");
  const description = t("hero.description");
  
  return {
    title,
    description,
    
    // Locale-specific keywords
    keywords: [
      t("nav.home"),
      t("nav.about"),
      t("nav.programs"),
      t("nav.contact"),
      "daycare Roselle IL",
      "childcare Roselle",
      "preschool Roselle",
      "infant care",
      "after school care",
      "Great Beginnings Day Care"
    ],
    
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/og-homepage.jpg",
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: "website",
      locale: locale === 'en' ? 'en_US' : 
              locale === 'es' ? 'es_ES' :
              locale === 'pl' ? 'pl_PL' :
              locale === 'uk' ? 'uk_UA' : 'en_US',
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-homepage.jpg"]
    },
    
    alternates: {
      canonical: `https://greatbeginningsdaycare.com/${locale}`
    }
  };
}

/**
 * Localized Homepage Component
 * 
 * Renders all homepage sections with proper translations and locale context.
 * Each section receives the locale parameter for translation purposes.
 */
export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = params;
  
  // Get translations for any direct usage
  const t = await getTranslations(locale);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section - Above the fold, highest priority */}
      <Suspense fallback={<HeroSkeleton />}>
        <LocaleHero locale={locale} />
      </Suspense>

      {/* Features Section - Core value proposition */}
      <Suspense fallback={<FeaturesSkeleton />}>
        <LocaleFeatures locale={locale} />
      </Suspense>

      {/* Programs Section - Service offerings */}
      <Suspense fallback={<ProgramsSkeleton />}>
        <LocalePrograms locale={locale} />
      </Suspense>

      {/* Stats Section - Social proof with numbers */}
      <Suspense fallback={<StatsSkeleton />}>
        <LocaleStats locale={locale} />
      </Suspense>

      {/* Testimonials Section - Social proof with stories */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <LocaleTestimonials locale={locale} />
      </Suspense>

      {/* CTA Section - Final conversion opportunity */}
      <Suspense fallback={<CTASkeleton />}>
        <LocaleCTA locale={locale} />
      </Suspense>
    </div>
  );
}

/**
 * Generate JSON-LD structured data for the localized homepage
 */
export async function generateJsonLd(locale: Locale) {
  const t = await getTranslations(locale);
  
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": "Great Beginnings Day Care",
    "description": t("hero.description"),
    "url": `https://greatbeginningsdaycare.com/${locale}`,
    "logo": "https://greatbeginningsdaycare.com/images/logo.png",
    "image": "https://greatbeginningsdaycare.com/images/facility.jpg", 
    "telephone": "+1-630-555-0123",
    "email": "info@greatbeginningsdaycare.com",
    "inLanguage": locale,
    
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Roselle",
      "addressRegion": "IL",
      "postalCode": "60172",
      "addressCountry": "US"
    },
    
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.9842",
      "longitude": "-88.0798"
    },
    
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "06:30",
      "closes": "18:30"
    },
    
    "priceRange": "$$",
    
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    
    "areaServed": {
      "@type": "City",
      "name": "Roselle",
      "addressRegion": "IL",
      "addressCountry": "US"
    },
    
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.9842",
        "longitude": "-88.0798"
      },
      "geoRadius": "10000"
    },
    
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": t("programs.title"),
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t("programs.infant.title"),
            "description": t("programs.infant.description")
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": t("programs.toddler.title"),
            "description": t("programs.toddler.description")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t("programs.preschool.title"),
            "description": t("programs.preschool.description")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t("programs.afterschool.title"),
            "description": t("programs.afterschool.description")
          }
        }
      ]
    }
  };
}

/**
 * Homepage Features:
 * 
 * 1. Full Localization: All content translated based on locale parameter
 * 2. Server Components: Entire page renders on server for better SEO
 * 3. Suspense Boundaries: Each section loads independently with fallbacks
 * 4. SEO Optimized: Locale-specific metadata and structured data
 * 5. Type Safe: Full TypeScript support with translation keys
 * 6. Performance: Minimal client-side JavaScript for core functionality
 * 7. Accessibility: Proper language attributes and semantic structure
 * 8. Progressive Enhancement: Core content works without JavaScript
 * 9. Mobile-First: Responsive design optimized for touch interactions
 * 10. Child-Friendly: Appropriate content and design for daycare business
 */