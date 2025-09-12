/**
 * Locale-aware CTA Section
 * 
 * Call-to-action section with full translation support.
 * Server Component that renders with proper translations.
 */

import Link from "next/link";
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";
import { Phone, Calendar } from "lucide-react";

interface LocaleCTAProps {
  locale: Locale;
}

export async function LocaleCTA({ locale }: LocaleCTAProps) {
  const t = await getTranslations(locale);

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('enrollment.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('enrollment.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t('contact.schedule_tour')}
            </Link>
            
            <a
              href="tel:+16305550123"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('contact.call_us')}
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm opacity-75">
              {t('hero.trusted_since')} • {t('hero.licensed')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}