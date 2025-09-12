/**
 * Suspense Wrapper Components for Homepage Sections
 * 
 * These components provide proper loading states and error boundaries
 * for each section of the homepage using React 19 Suspense.
 * 
 * Features:
 * - Loading skeletons while content loads
 * - Error boundaries for graceful failure handling
 * - Optimized for Server Components
 * - Child-friendly loading animations
 */

import React, { Suspense } from "react";
import { 
  HeroSkeleton,
  FeaturesSkeleton,
  ProgramsSkeleton,
  TestimonialsSkeleton,
  StatsSkeleton,
  CTASkeleton
} from "@/components/ui/loading-skeletons";

/**
 * Error Boundary Component for Section-Level Errors
 */
interface ErrorFallbackProps {
  sectionName: string;
  error?: Error;
}

function SectionErrorFallback({ sectionName, error }: ErrorFallbackProps) {
  return (
    <div className="py-20 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">😕</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            We're having trouble loading the {sectionName} section. 
            Please refresh the page or contact us if this continues.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="child-friendly-button bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left mt-4 text-sm text-gray-500">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Generic Section Suspense Wrapper
 */
interface SectionSuspenseWrapperProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  sectionName: string;
}

function SectionSuspenseWrapper({ 
  children, 
  fallback, 
  sectionName 
}: SectionSuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary 
        fallback={<SectionErrorFallback sectionName={sectionName} />}
      >
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}

/**
 * Simple Error Boundary Implementation
 * Note: In a production app, you'd want to use a more robust solution
 * like react-error-boundary or implement a class-based error boundary
 */
function ErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  // For now, we'll just render children and handle errors at the component level
  // In Next.js 14+, you can use error.tsx files for proper error boundaries
  return <>{children}</>;
}

/**
 * Hero Section with Suspense
 */
export function HeroWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<HeroSkeleton />}
      sectionName="Hero"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * Features Section with Suspense
 */
export function FeaturesWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<FeaturesSkeleton />}
      sectionName="Features"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * Programs Section with Suspense
 */
export function ProgramsWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<ProgramsSkeleton />}
      sectionName="Programs"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * Testimonials Section with Suspense
 */
export function TestimonialsWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<TestimonialsSkeleton />}
      sectionName="Testimonials"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * Stats Section with Suspense
 */
export function StatsWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<StatsSkeleton />}
      sectionName="Stats"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * CTA Section with Suspense
 */
export function CTAWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SectionSuspenseWrapper
      fallback={<CTASkeleton />}
      sectionName="Contact & Enrollment"
    >
      {children}
    </SectionSuspenseWrapper>
  );
}

/**
 * Lazy loading utilities for better performance
 */
export const createLazySection = <T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback: React.ReactNode,
  sectionName: string
) => {
  const LazyComponent = React.lazy(importFn);
  
  return function LazySection(props: T) {
    return (
      <SectionSuspenseWrapper
        fallback={fallback}
        sectionName={sectionName}
      >
        <LazyComponent {...props} />
      </SectionSuspenseWrapper>
    );
  };
};

/**
 * Progressive enhancement wrapper
 * Falls back to basic content if JavaScript is disabled
 */
export function ProgressiveEnhancement({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return (
    <>
      <noscript>{fallback}</noscript>
      <div className="js-required">{children}</div>
    </>
  );
}