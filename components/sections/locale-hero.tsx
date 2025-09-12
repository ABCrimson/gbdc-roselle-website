/**
 * Locale-aware Hero Section
 * 
 * Hero section with full translation support for the homepage.
 * Server Component that renders with proper translations.
 */

import Link from "next/link";
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";

interface LocaleHeroProps {
  locale: Locale;
}

export async function LocaleHero({ locale }: LocaleHeroProps) {
  const t = await getTranslations(locale);

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('hero.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {t('hero.subtitle')}
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('hero.cta')}
            </Link>
            
            <Link
              href={`/${locale}/programs`}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>{t('hero.trusted_since')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>{t('hero.licensed')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}