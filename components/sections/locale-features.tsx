/**
 * Locale-aware Features Section
 * 
 * Features section with full translation support.
 * Server Component that renders with proper translations.
 */

import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";
import { Heart, Shield, Users, Star } from "lucide-react";

interface LocaleFeaturesProps {
  locale: Locale;
}

export async function LocaleFeatures({ locale }: LocaleFeaturesProps) {
  const t = await getTranslations(locale);

  const features = [
    {
      icon: Shield,
      title: t('about.values.safety'),
      key: 'safety'
    },
    {
      icon: Heart,
      title: t('about.values.learning'),
      key: 'learning'
    },
    {
      icon: Users,
      title: t('about.values.family'),
      key: 'family'
    },
    {
      icon: Star,
      title: t('about.values.community'),
      key: 'community'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.values.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div key={feature.key} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}