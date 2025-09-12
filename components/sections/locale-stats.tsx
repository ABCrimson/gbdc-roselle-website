/**
 * Locale-aware Stats Section
 * 
 * Statistics section with full translation support.
 * Server Component that renders with proper translations.
 */

import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";

interface LocaleStatsProps {
  locale: Locale;
}

export async function LocaleStats({ locale }: LocaleStatsProps) {
  const t = await getTranslations(locale);

  const stats = [
    {
      value: "29",
      label: t('about.experience'),
      key: 'experience'
    },
    {
      value: "500+",
      label: t('about.families_served'),
      key: 'families'
    },
    {
      value: "15",
      label: t('about.qualified_staff'),
      key: 'staff'
    },
    {
      value: "4.9/5",
      label: "Rating",
      key: 'rating'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.key} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}