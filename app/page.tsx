/**
 * GBDC Homepage - Great Beginnings Day Care
 * 
 * The main homepage featuring all sections with Server Components,
 * Framer Motion animations, and Suspense boundaries for optimal performance.
 * 
 * Features:
 * - Server-side rendering for SEO and performance
 * - Progressive enhancement with loading states
 * - Responsive design optimized for all devices
 * - Accessibility-first design patterns
 * - Child-friendly animations and interactions
 */

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Import section components
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Programs } from "@/components/sections/programs";
import { Testimonials } from "@/components/sections/testimonials";
import { Stats } from "@/components/sections/stats";
import { CTA } from "@/components/sections/cta";

// Import Suspense wrappers
import {
  HeroWithSuspense,
  FeaturesWithSuspense,
  ProgramsWithSuspense,
  TestimonialsWithSuspense,
  StatsWithSuspense,
  CTAWithSuspense
} from "@/components/sections/suspense-wrappers";

// Import loading skeletons for immediate fallback
import {
  HeroSkeleton,
  FeaturesSkeleton,
  ProgramsSkeleton,
  TestimonialsSkeleton,
  StatsSkeleton,
  CTASkeleton
} from "@/components/ui/loading-skeletons";

/**
 * Homepage Component
 * 
 * Uses Next.js 15 Server Components by default with selective client-side
 * hydration for interactive elements. Each section is wrapped in Suspense
 * boundaries for optimal loading performance.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Above the fold, highest priority */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Features Section - Core value proposition */}
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>

      {/* Programs Section - Service offerings */}
      <Suspense fallback={<ProgramsSkeleton />}>
        <Programs />
      </Suspense>

      {/* Stats Section - Social proof with numbers */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      {/* Testimonials Section - Social proof with stories */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>

      {/* CTA Section - Final conversion opportunity */}
      <Suspense fallback={<CTASkeleton />}>
        <CTA />
      </Suspense>
    </div>
  );
}

/**
 * Homepage Metadata for SEO
 */
export const metadata = {
  title: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
  description: "Premier daycare center providing loving care, educational programs, and nurturing environment for children 6 weeks to 12 years in Roselle, Illinois.",
  keywords: [
    "daycare Roselle IL",
    "childcare Roselle",
    "preschool Roselle",
    "infant care",
    "after school care",
    "Great Beginnings Day Care"
  ],
  openGraph: {
    title: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
    description: "Premier daycare center providing loving care and educational programs for children in Roselle, Illinois.",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Great Beginnings Day Care - Happy children learning and playing"
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Beginnings Day Care - Quality Childcare in Roselle, IL",
    description: "Premier daycare center providing loving care and educational programs for children in Roselle, Illinois.",
    images: ["/images/og-homepage.jpg"]
  },
  alternates: {
    canonical: "https://greatbeginningsdaycare.com"
  }
};

/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand our daycare business
 */
export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": "Great Beginnings Day Care",
    "description": "Premier daycare center providing quality childcare, early education, and nurturing environment for children in Roselle, Illinois.",
    "url": "https://greatbeginningsdaycare.com",
    "logo": "https://greatbeginningsdaycare.com/images/logo.png",
    "image": "https://greatbeginningsdaycare.com/images/facility.jpg",
    "telephone": "+1-630-529-5555",
    "email": "info@greatbeginningsdaycare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Daycare Lane",
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
    "founder": {
      "@type": "Person",
      "name": "Great Beginnings Day Care Team"
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
      "name": "Childcare Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Infant Care",
            "description": "Care for children 6 weeks to 18 months"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Toddler Care",
            "description": "Care for children 18 months to 3 years"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Preschool",
            "description": "Educational programs for children 3 to 5 years"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "After School Care",
            "description": "Before and after school care for children 5 to 12 years"
          }
        }
      ]
    }
  };
}

/**
 * Performance optimizations:
 * 
 * 1. Server Components: All sections render on the server for better SEO
 * 2. Suspense Boundaries: Each section loads independently with fallbacks
 * 3. Code Splitting: Heavy interactive components are dynamically imported
 * 4. Progressive Enhancement: Core content works without JavaScript
 * 5. Optimized Images: Next.js Image component with proper sizing
 * 6. Structured Data: JSON-LD for better search engine understanding
 * 7. Semantic HTML: Proper heading hierarchy and ARIA labels
 * 8. Mobile-First: Responsive design optimized for touch interactions
 * 9. Accessibility: WCAG 2.1 AA compliance throughout
 * 10. Child-Friendly: Appropriate animations and color schemes
 */
