/**
 * TypeScript Type Definitions for i18n System
 * 
 * Comprehensive type definitions for the internationalization system
 * including locales, translations, and component props.
 */

import type { locales, defaultLocale } from "@/middleware";

// Core locale types
export type Locale = (typeof locales)[number];
export type DefaultLocale = typeof defaultLocale;

// Locale configuration types
export interface LocaleConfig {
  dir: 'ltr' | 'rtl';
  name: string;
  nativeName: string;
  flag: string;
  dateFormat: string;
  timeFormat: string;
}

// Translation system types
export type TranslationKey = string;
export type TranslationValue = string | Record<string, any>;
export type Translations = Record<string, TranslationValue>;

// Translation function type
export interface TranslationFunction {
  (key: string, variables?: Record<string, string | number>): string;
  raw: (key: string) => any;
  has: (key: string) => boolean;
  locale: Locale;
  all: () => Translations;
}

// Component prop types for locale-aware components
export interface LocaleProps {
  locale: Locale;
}

export interface LocalePageProps {
  params: { locale: Locale };
}

export interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

// Navigation item type
export interface NavigationItem {
  key: string;
  label: string;
  href: string;
}

// Language switcher types
export interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export interface AvailableLocale {
  code: Locale;
  dir: 'ltr' | 'rtl';
  name: string;
  nativeName: string;
  flag: string;
  dateFormat: string;
  timeFormat: string;
}

// Mobile menu types
export interface MobileMenuProps {
  navigation: NavigationItem[];
  locale: Locale;
  enrollText: string;
}

// Section component types (for locale-aware sections)
export interface LocaleSectionProps {
  locale: Locale;
}

// Metadata generation types
export interface LocaleMetadata {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  alternateLocales: string[];
}

// Translation key validation (extend as needed)
export type ValidTranslationKeys = 
  // Common translations
  | 'common.loading'
  | 'common.error' 
  | 'common.success'
  | 'common.cancel'
  | 'common.save'
  | 'common.edit'
  | 'common.delete'
  | 'common.back'
  | 'common.next'
  | 'common.previous'
  | 'common.close'
  | 'common.open'
  | 'common.yes'
  | 'common.no'
  | 'common.ok'
  | 'common.submit'
  | 'common.learn_more'
  | 'common.contact_us'
  | 'common.call_now'
  
  // Navigation translations
  | 'nav.home'
  | 'nav.about'
  | 'nav.programs'
  | 'nav.contact'
  | 'nav.enroll'
  | 'nav.gallery'
  | 'nav.testimonials'
  | 'nav.resources'
  
  // Hero section
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.description'
  | 'hero.cta'
  | 'hero.cta_secondary'
  | 'hero.trusted_since'
  | 'hero.licensed'
  
  // About section
  | 'about.title'
  | 'about.subtitle'
  | 'about.description'
  | 'about.mission.title'
  | 'about.mission.description'
  | 'about.values.title'
  | 'about.values.safety'
  | 'about.values.learning'
  | 'about.values.family'
  | 'about.values.community'
  | 'about.experience'
  | 'about.families_served'
  | 'about.qualified_staff'
  
  // Programs section
  | 'programs.title'
  | 'programs.subtitle'
  | 'programs.infant.title'
  | 'programs.infant.age'
  | 'programs.infant.description'
  | 'programs.toddler.title'
  | 'programs.toddler.age'
  | 'programs.toddler.description'
  | 'programs.preschool.title'
  | 'programs.preschool.age'
  | 'programs.preschool.description'
  | 'programs.afterschool.title'
  | 'programs.afterschool.age'
  | 'programs.afterschool.description'
  
  // Contact section
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.description'
  | 'contact.phone'
  | 'contact.email'
  | 'contact.address'
  | 'contact.hours'
  | 'contact.form.title'
  | 'contact.form.name'
  | 'contact.form.email'
  | 'contact.form.phone'
  | 'contact.form.child_age'
  | 'contact.form.program'
  | 'contact.form.message'
  | 'contact.form.send'
  | 'contact.form.success'
  | 'contact.form.error'
  | 'contact.schedule_tour'
  | 'contact.call_us'
  | 'contact.email_us'
  
  // Footer section
  | 'footer.about'
  | 'footer.programs'
  | 'footer.contact'
  | 'footer.hours'
  | 'footer.monday_friday'
  | 'footer.closed_weekends'
  | 'footer.follow_us'
  | 'footer.newsletter'
  | 'footer.newsletter_signup'
  | 'footer.copyright'
  | 'footer.licensed'
  | 'footer.address'
  | 'footer.phone'
  | 'footer.email'
  
  // Enrollment section
  | 'enrollment.title'
  | 'enrollment.subtitle'
  | 'enrollment.description'
  | 'enrollment.steps.tour.title'
  | 'enrollment.steps.tour.description'
  | 'enrollment.steps.apply.title'
  | 'enrollment.steps.apply.description'
  | 'enrollment.steps.start.title'
  | 'enrollment.steps.start.description'
  | 'enrollment.requirements.title'
  | 'enrollment.requirements.immunizations'
  | 'enrollment.requirements.physical'
  | 'enrollment.requirements.emergency'
  | 'enrollment.requirements.birth_certificate'
  | 'enrollment.tuition.title'
  | 'enrollment.tuition.description'
  | 'enrollment.tuition.contact_for_rates'
  | 'enrollment.tuition.discounts'
  
  // Testimonials section
  | 'testimonials.title'
  | 'testimonials.subtitle'
  
  // Gallery section
  | 'gallery.title'
  | 'gallery.subtitle'
  
  // Resources section
  | 'resources.title'
  | 'resources.subtitle'
  | 'resources.handbook'
  | 'resources.calendar'
  | 'resources.forms'
  | 'resources.nutrition'
  | 'resources.development';

// Strongly typed translation function
export interface TypedTranslationFunction {
  (key: ValidTranslationKeys, variables?: Record<string, string | number>): string;
  raw: (key: string) => any;
  has: (key: string) => boolean;
  locale: Locale;
  all: () => Translations;
}

// Export utility types
export type { Locale as SupportedLocale };
export type LocaleCode = Locale;
export type TranslationDictionary = Translations;

// Helper type for pages with locale params
export type PageWithLocale<T = {}> = T & {
  params: { locale: Locale };
};

// Helper type for layouts with locale params  
export type LayoutWithLocale<T = {}> = T & {
  children: React.ReactNode;
  params: { locale: Locale };
};

// Metadata generation helper type
export interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}

// JSON-LD structured data types
export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  [key: string]: any;
}