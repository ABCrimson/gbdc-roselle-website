/**
 * Locale-aware Header Component
 * 
 * Navigation header with translation support and language switcher.
 * Server Component that renders with proper translations for each locale.
 * 
 * Features:
 * - Full translation support for navigation items
 * - Language switcher dropdown
 * - Responsive design with mobile menu
 * - Accessibility-compliant navigation
 * - SEO-friendly locale-aware links
 */

import Link from "next/link";
import Image from "next/image";

// i18n imports
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";

// Components
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Icons
import { Phone, Menu, X } from "lucide-react";

interface LocaleHeaderProps {
  locale: Locale;
}

/**
 * Locale-aware Header Component
 */
export async function LocaleHeader({ locale }: LocaleHeaderProps) {
  const t = await getTranslations(locale);

  // Navigation items with translations
  const navigation = [
    { 
      key: 'home',
      label: t('nav.home'), 
      href: `/${locale}` 
    },
    { 
      key: 'about',
      label: t('nav.about'), 
      href: `/${locale}/about` 
    },
    { 
      key: 'programs',
      label: t('nav.programs'), 
      href: `/${locale}/programs` 
    },
    { 
      key: 'contact',
      label: t('nav.contact'), 
      href: `/${locale}/contact` 
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href={`/${locale}`} 
              className="flex items-center space-x-2"
              aria-label={t('nav.home')}
            >
              <Image
                src="/images/logo.svg"
                alt="Great Beginnings Day Care Logo"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10"
                priority
              />
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-primary">
                  Great Beginnings
                </div>
                <div className="text-xs text-muted-foreground">
                  Day Care
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation">
            <ul className="flex items-center space-x-6">
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                    aria-label={item.label}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <a 
                href="tel:+16305550123"
                className="font-medium text-foreground hover:text-primary transition-colors"
                aria-label={`${t('contact.phone')}: (630) 555-0123`}
              >
                (630) 555-0123
              </a>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {t('nav.enroll')}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <MobileMenu 
              navigation={navigation}
              locale={locale}
              enrollText={t('nav.enroll')}
            />
          </div>
        </div>
      </div>

      {/* Mobile Header Actions Bar */}
      <div className="sm:hidden border-t px-4 py-2 bg-muted/50">
        <div className="flex items-center justify-between">
          {/* Mobile Phone */}
          <a 
            href="tel:+16305550123"
            className="flex items-center space-x-2 text-sm font-medium text-primary"
            aria-label={`${t('contact.phone')}: (630) 555-0123`}
          >
            <Phone className="h-4 w-4" />
            <span>(630) 555-0123</span>
          </a>

          {/* Mobile CTA */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('nav.enroll')}
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * Header Features:
 * 
 * 1. Server Component: Renders on server with translations
 * 2. Full Translation: All navigation items and labels translated
 * 3. Responsive Design: Mobile-first with collapsible navigation
 * 4. Accessibility: Proper ARIA labels, keyboard navigation
 * 5. SEO-Friendly: Locale-aware internal links
 * 6. Performance: Optimized images with Next.js Image component
 * 7. User Experience: Hover states, focus indicators, smooth transitions
 * 8. Professional: Appropriate design for daycare business
 * 9. Multi-language: Language switcher for all supported locales
 * 10. Contact Integration: Prominent phone number and CTA button
 */