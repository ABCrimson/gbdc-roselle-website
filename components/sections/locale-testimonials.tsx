/**
 * Locale-aware Testimonials Section
 * 
 * Testimonials section with full translation support.
 * Server Component that renders with proper translations.
 */

import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";
import { Quote } from "lucide-react";

interface LocaleTestimonialsProps {
  locale: Locale;
}

export async function LocaleTestimonials({ locale }: LocaleTestimonialsProps) {
  const t = await getTranslations(locale);

  // Placeholder testimonials (in a real app, these would come from a database)
  const testimonials = [
    {
      content: "Great Beginnings has been amazing for our family. The staff is so caring and our daughter loves going there every day!",
      author: "Sarah M.",
      relation: "Parent"
    },
    {
      content: "The programs are excellent and our son has learned so much. Highly recommend to any parent looking for quality childcare.",
      author: "Michael R.",
      relation: "Parent"
    },
    {
      content: "Professional, caring, and trustworthy. We couldn't ask for better care for our twins.",
      author: "Jessica L.",
      relation: "Parent"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <blockquote className="text-foreground mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <footer>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.relation}
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}