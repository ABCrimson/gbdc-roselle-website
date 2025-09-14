/**
 * 🔄 Contact Page Loading State
 *
 * 🎯 What does this do?
 * Shows a skeleton loading state while the Contact page data is being fetched
 *
 * 🧒 Kid-Friendly Explanation:
 * This shows placeholder shapes while we're loading the contact information
 * and form - like waiting for a phone book to open!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Suspense boundary
 * - Tailwind 4.1.13 animations
 * - Optimized for Partial Prerendering
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-20 w-full mb-6" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards Skeleton */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-full" />
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form Skeleton */}
            <div>
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-full mb-8" />

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-12 w-32" />
                </CardContent>
              </Card>
            </div>

            {/* Info Section Skeleton */}
            <div className="space-y-8">
              <div>
                <Skeleton className="h-8 w-32 mb-4" />
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Skeleton className="h-8 w-40 mb-4" />
                <Card>
                  <CardContent className="p-6 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Skeleton */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Skeleton className="h-10 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <Card className="overflow-hidden">
              <Skeleton className="h-96 w-full" />
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-64 mx-auto mb-12" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}