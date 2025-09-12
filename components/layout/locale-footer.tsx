/**
 * Locale-aware Footer Component
 * 
 * Footer with translation support for all content including links,
 * contact information, and legal text.
 * 
 * Features:
 * - Full translation support for all footer content
 * - Locale-aware internal links
 * - Contact information with proper formatting
 * - Newsletter signup (translated)
 * - Social media links
 * - Copyright with dynamic year
 * - Professional design suitable for daycare
 */

import Link from "next/link";
import Image from "next/image";

// i18n imports
import { type Locale } from "@/middleware";
import { getTranslations } from "@/lib/i18n";

// Icons
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

interface LocaleFooterProps {
  locale: Locale;
}

/**
 * Locale-aware Footer Component
 */
export async function LocaleFooter({ locale }: LocaleFooterProps) {
  const t = await getTranslations(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.svg"
                alt="Great Beginnings Day Care Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div>
                <div className="text-lg font-bold text-primary">
                  Great Beginnings
                </div>
                <div className="text-sm text-muted-foreground">
                  Day Care
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('footer.licensed')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/programs`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/testimonials`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.testimonials')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('footer.programs')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/programs#infant`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('programs.infant.title')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/programs#toddler`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('programs.toddler.title')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/programs#preschool`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('programs.preschool.title')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/programs#afterschool`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('programs.afterschool.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>{t('footer.address')}</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="tel:+16305550123"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`${t('contact.phone')}: (630) 555-0123`}
                >
                  {t('footer.phone')}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@greatbeginningsdaycare.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`${t('contact.email')}: info@greatbeginningsdaycare.com`}
                >
                  {t('footer.email')}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">{t('footer.hours')}</div>
                  <div>{t('footer.monday_friday')}</div>
                  <div className="text-xs">{t('footer.closed_weekends')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              {t('footer.copyright', { year: currentYear.toString() })}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {t('footer.follow_us')}:
              </span>
              
              <div className="flex items-center space-x-2">
                <a
                  href="https://facebook.com/greatbeginningsdaycare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                
                <a
                  href="https://instagram.com/greatbeginningsdaycare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                
                <a
                  href="https://twitter.com/gbdaycare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {t('footer.newsletter')}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {t('footer.newsletter_signup')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('contact.email')}
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label={t('footer.newsletter_signup')}
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  {t('common.submit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer Features:
 * 
 * 1. Server Component: Renders with full translations
 * 2. Complete Translation: All text content localized
 * 3. Responsive Layout: Mobile-first grid design
 * 4. Contact Information: Phone, email, address with proper formatting
 * 5. Navigation Links: Locale-aware internal links
 * 6. Social Media: External links with proper accessibility
 * 7. Newsletter: Subscription form (ready for backend integration)
 * 8. Legal Compliance: Licensing information and copyright
 * 9. Professional Design: Suitable for daycare business
 * 10. Accessibility: Proper ARIA labels and keyboard navigation
 */