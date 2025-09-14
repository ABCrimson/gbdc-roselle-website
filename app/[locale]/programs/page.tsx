/**
 * Programs Page
 * 
 * Dedicated page showcasing all daycare programs with filtering and details.
 * Server Component that renders the client-side programs grid.
 * 
 * Like the main catalog page where parents can explore all our offerings!
 */

import { Metadata } from "next";
import { ProgramsGrid } from "@/components/programs";

// Page metadata for SEO
export const metadata: Metadata = {
  title: "Our Programs | Great Beginnings Day Care",
  description: "Explore our age-appropriate daycare programs including infant care, toddler programs, preschool, Pre-K, and after-school care in Roselle, IL.",
  keywords: [
    "daycare programs",
    "infant care Roselle",
    "toddler daycare",
    "preschool Roselle IL",
    "Pre-K program",
    "after school care",
    "summer camp Roselle",
    "childcare programs",
    "early education"
  ],
  openGraph: {
    title: "Our Programs | Great Beginnings Day Care",
    description: "Age-appropriate programs designed to nurture growth, learning, and happiness at every stage.",
    images: [
      {
        url: "/images/og-programs.jpg",
        width: 1200,
        height: 630,
        alt: "Great Beginnings Day Care Programs"
      }
    ]
  }
};

/**
 * Programs Page Component
 */
export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Programs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover the perfect program for your child's age and developmental stage. 
              Each program is thoughtfully designed to provide nurturing care, 
              engaging activities, and age-appropriate learning experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Programs Grid Component */}
      <ProgramsGrid />
      
      {/* Additional Information Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose Our Programs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <h3 className="font-semibold mb-2">Experienced Teachers</h3>
                <p className="text-sm text-muted-foreground">
                  Certified educators with years of early childhood experience
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Research-Based Curriculum</h3>
                <p className="text-sm text-muted-foreground">
                  Programs aligned with state standards and best practices
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏡</span>
                </div>
                <h3 className="font-semibold mb-2">Safe Environment</h3>
                <p className="text-sm text-muted-foreground">
                  Secure facilities with age-appropriate spaces and equipment
                </p>
              </div>
            </div>
            
            {/* Contact CTA */}
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Have Questions About Our Programs?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're here to help you find the perfect fit for your child. 
                Contact us to learn more or schedule a tour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+16305550123"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Call (630) 555-0123
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                >
                  Contact Us Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}