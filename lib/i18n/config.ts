/**
 * Internationalization Configuration
 * 
 * Central configuration for the GBDC website i18n system.
 * Defines supported locales, default settings, and type definitions.
 */

// Define the locales and types here to avoid circular dependency
export const locales = ['en', 'es', 'pl', 'uk'] as const;
export const defaultLocale = 'en' as const;
export const localeNames = {
  en: 'English',
  es: 'Español',
  pl: 'Polski',
  uk: 'Українська',
} as const;

export type Locale = typeof locales[number];
export type LocaleNames = typeof localeNames;

/**
 * i18n Configuration Object
 */
export const i18n = {
  locales,
  defaultLocale,
  localeNames,
} as const;

/**
 * Locale-specific configurations
 * Includes text direction, date formats, and other locale-specific settings
 */
export const localeConfig = {
  en: {
    dir: 'ltr' as const,
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'h:mm a',
  },
  es: {
    dir: 'ltr' as const,
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
  },
  pl: {
    dir: 'ltr' as const,
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
  },
  uk: {
    dir: 'ltr' as const,
    name: 'Ukrainian',
    nativeName: 'Українська',
    flag: '🇺🇦',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
  },
} as const;

/**
 * Get configuration for a specific locale
 */
export function getLocaleConfig(locale: Locale) {
  return localeConfig[locale];
}

/**
 * Check if locale requires RTL layout
 * Currently all supported locales are LTR, but ready for future RTL support
 */
export function isRTL(locale: Locale): boolean {
  return localeConfig[locale].dir === 'rtl';
}

/**
 * Get all available locales for language switcher
 */
export function getAvailableLocales() {
  return locales.map(locale => ({
    code: locale,
    ...localeConfig[locale],
  }));
}