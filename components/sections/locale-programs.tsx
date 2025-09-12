/**
 * Locale-aware Programs Section
 * 
 * Programs section with full translation support.
 * Server Component that renders with proper translations.
 */

import Link from "next/link";
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";
import { Baby, Users2, GraduationCap, BookOpen } from "lucide-react";

interface LocaleProgramsProps {
  locale: Locale;
}

export async function LocalePrograms({ locale }: LocaleProgramsProps) {
  const t = await getTranslations(locale);

  const programs = [
    {
      icon: Baby,
      title: t('programs.infant.title'),
      age: t('programs.infant.age'),
      description: t('programs.infant.description'),
      features: t.raw('programs.infant.features') || [],
      key: 'infant'
    },
    {
      icon: Users2,
      title: t('programs.toddler.title'),
      age: t('programs.toddler.age'),
      description: t('programs.toddler.description'),
      features: t.raw('programs.toddler.features') || [],
      key: 'toddler'
    },
    {
      icon: GraduationCap,
      title: t('programs.preschool.title'),
      age: t('programs.preschool.age'),
      description: t('programs.preschool.description'),
      features: t.raw('programs.preschool.features') || [],
      key: 'preschool'
    },
    {
      icon: BookOpen,
      title: t('programs.afterschool.title'),
      age: t('programs.afterschool.age'),
      description: t('programs.afterschool.description'),
      features: t.raw('programs.afterschool.features') || [],
      key: 'afterschool'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            
            return (
              <div key={program.key} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {program.title}
                      </h3>
                      <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        {program.age}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {program.description}
                    </p>
                    
                    {Array.isArray(program.features) && program.features.length > 0 && (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {program.features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/programs`}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('common.learn_more')}
          </Link>
        </div>
      </div>
    </section>
  );
}