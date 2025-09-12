/**
 * Loading Skeleton Components for GBDC Website
 * 
 * Professional loading states that maintain layout while content loads.
 * Designed to match the visual style of the actual components.
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]",
        "dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        className
      )}
      style={{
        animation: "shimmer 2s infinite"
      }}
      {...props}
    />
  );
}

/**
 * Hero Section Loading Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Main headline skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-16 w-1/2 mx-auto" />
          </div>
          
          {/* Subheadline skeleton */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          
          {/* CTA buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Skeleton className="h-14 w-48" />
            <Skeleton className="h-14 w-40" />
          </div>
        </div>
        
        {/* Scroll indicator skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Skeleton className="h-8 w-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Features Section Loading Skeleton
 */
export function FeaturesSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header skeleton */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-12 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        
        {/* Features grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="child-friendly-card space-y-4">
              <Skeleton className="h-16 w-16 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Programs Section Loading Skeleton
 */
export function ProgramsSkeleton() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section header skeleton */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-12 w-1/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        
        {/* Filter tabs skeleton */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-24" />
            ))}
          </div>
        </div>
        
        {/* Programs grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="child-friendly-card space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Testimonials Section Loading Skeleton
 */
export function TestimonialsSkeleton() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section header skeleton */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-12 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        
        {/* Testimonial carousel skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="child-friendly-card text-center space-y-6">
            {/* Stars skeleton */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-6" />
              ))}
            </div>
            
            {/* Quote skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
              <Skeleton className="h-6 w-4/5 mx-auto" />
            </div>
            
            {/* Author skeleton */}
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          
          {/* Navigation dots skeleton */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stats Section Loading Skeleton
 */
export function StatsSkeleton() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-16 w-20 mx-auto bg-white/20" />
              <Skeleton className="h-6 w-24 mx-auto bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CTA Section Loading Skeleton
 */
export function CTASkeleton() {
  return (
    <section className="py-20 bg-gradient-to-r from-secondary-500 to-primary-500">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Headline skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-2/3 mx-auto bg-white/20" />
            <Skeleton className="h-6 w-3/4 mx-auto bg-white/20" />
          </div>
          
          {/* Form skeleton */}
          <div className="child-friendly-card max-w-md mx-auto space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
          
          {/* CTA buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-14 w-48 bg-white/20" />
            <Skeleton className="h-14 w-40 bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Add shimmer animation to globals.css
 */
export const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;