/**
 * Loading Skeleton Components
 * 
 * Skeleton loading states for different sections while content loads.
 */

export function HeroSkeleton() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="h-12 md:h-16 bg-muted/50 rounded-lg animate-pulse mb-6"></div>
          <div className="h-8 bg-muted/50 rounded-lg animate-pulse mb-8 max-w-2xl mx-auto"></div>
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse mb-12 max-w-xl mx-auto"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-40 bg-muted/50 rounded-lg animate-pulse"></div>
            <div className="h-14 w-48 bg-muted/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full animate-pulse mb-6 mx-auto"></div>
              <div className="h-6 bg-muted/50 rounded-lg animate-pulse mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProgramsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted/50 rounded-lg animate-pulse flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-6 bg-muted/50 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 bg-muted/50 rounded-lg animate-pulse mb-4"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-3 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-3 bg-muted/50 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 bg-muted/50 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-muted/50 rounded-lg animate-pulse flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-4 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-4 bg-muted/50 rounded-lg animate-pulse w-3/4"></div>
                  </div>
                  <div className="h-4 bg-muted/50 rounded-lg animate-pulse w-1/2 mb-1"></div>
                  <div className="h-3 bg-muted/50 rounded-lg animate-pulse w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASkeleton() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="h-10 bg-white/20 rounded-lg animate-pulse mb-6 max-w-md mx-auto"></div>
          <div className="h-6 bg-white/20 rounded-lg animate-pulse mb-8 max-w-2xl mx-auto"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-48 bg-white/20 rounded-lg animate-pulse"></div>
            <div className="h-14 w-40 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}