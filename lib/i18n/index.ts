/**
 * Translation System for GBDC Website
 * 
 * Server-side translation system using Next.js 15 Server Components.
 * No client-side JavaScript required for translations.
 * 
 * Features:
 * - Type-safe translations with full TypeScript support
 * - Nested translation keys with dot notation
 * - Server Component compatible
 * - Interpolation support for dynamic content
 * - Fallback to default locale if translation missing
 */

import 'server-only';
import { Locale, defaultLocale } from './config';

// Translation type definitions
export type TranslationKey = string;
export type TranslationValue = string | Record<string, any>;
export type Translations = Record<string, TranslationValue>;

/**
 * Translation cache to avoid repeated file reads
 */
const translationCache = new Map<Locale, Translations>();

/**
 * Load translations for a specific locale
 */
async function loadTranslations(locale: Locale): Promise<Translations> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    // Dynamic import of translation files
    const translations = await import(`./dictionaries/${locale}.json`);
    const translationData = translations.default || translations;
    
    // Cache the translations
    translationCache.set(locale, translationData);
    
    return translationData;
  } catch (error) {
    console.warn(`Failed to load translations for locale '${locale}':`, error);
    
    // Fallback to default locale if not already trying default
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    
    // Return empty object as last resort
    return {};
  }
}

/**
 * Get translation value by key with dot notation support
 */
function getTranslationByKey(translations: Translations, key: string): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Simple interpolation function
 * Replaces {{variable}} with provided values
 */
function interpolate(text: string, variables: Record<string, string | number> = {}): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Create translation function for a specific locale
 */
export async function createTranslator(locale: Locale) {
  const translations = await loadTranslations(locale);
  
  /**
   * Translation function with interpolation support
   * 
   * @param key - Translation key (supports dot notation)
   * @param variables - Variables for interpolation
   * @returns Translated string
   */
  function t(key: string, variables?: Record<string, string | number>): string {
    const translation = getTranslationByKey(translations, key);
    
    if (variables && Object.keys(variables).length > 0) {
      return interpolate(translation, variables);
    }
    
    return translation;
  }

  // Add additional helper methods to the translator
  Object.assign(t, {
    /**
     * Get raw translation object for a key
     */
    raw: (key: string): any => {
      const keys = key.split('.');
      let value: any = translations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return null;
        }
      }
      
      return value;
    },
    
    /**
     * Check if translation exists
     */
    has: (key: string): boolean => {
      const value = getTranslationByKey(translations, key);
      return value !== key;
    },
    
    /**
     * Get current locale
     */
    locale,
    
    /**
     * Get all translations (useful for debugging)
     */
    all: (): Translations => translations,
  });

  return t;
}

/**
 * Utility function to get dictionary for a locale
 * Use this in Server Components
 */
export async function getDictionary(locale: Locale): Promise<Translations> {
  return loadTranslations(locale);
}

/**
 * Type-safe translation keys (will be extended as translations are added)
 */
export type TranslationKeys = 
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
  | 'nav.home'
  | 'nav.about'
  | 'nav.programs'
  | 'nav.contact'
  | 'nav.enroll'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'about.title'
  | 'about.description'
  | 'programs.infant.title'
  | 'programs.toddler.title'
  | 'programs.preschool.title'
  | 'programs.afterschool.title'
  | 'contact.title'
  | 'contact.phone'
  | 'contact.email'
  | 'contact.address'
  | 'footer.hours'
  | 'footer.copyright';

/**
 * Pre-defined translation function type
 */
export type TranslationFunction = {
  (key: TranslationKeys, variables?: Record<string, string | number>): string;
  raw: (key: string) => any;
  has: (key: string) => boolean;
  locale: Locale;
  all: () => Translations;
};

/**
 * Helper to create strongly typed translator
 */
export async function getTranslations(locale: Locale): Promise<TranslationFunction> {
  return await createTranslator(locale) as TranslationFunction;
}