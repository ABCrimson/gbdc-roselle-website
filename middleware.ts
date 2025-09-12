/**
 * Middleware for Dynamic Locale Routing
 * 
 * Handles automatic locale detection and routing for the GBDC website.
 * Supports 4 languages: English (en), Spanish (es), Polish (pl), Ukrainian (uk)
 * 
 * Features:
 * - Automatic locale detection from Accept-Language header
 * - Cookie-based locale persistence
 * - SEO-friendly URL redirects with locale prefix
 * - Fallback to default locale (English)
 * - Next.js 15 App Router compatible
 */

import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config';

// Re-export for backward compatibility
export { locales, defaultLocale, type Locale };

/**
 * Check if a locale is supported
 */
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from Accept-Language header
 * Parse the header and find the best matching supported locale
 */
function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      const quality = qValue ? parseFloat(qValue) : 1;
      const normalizedLocale = locale.split('-')[0].toLowerCase(); // Convert en-US to en
      return { locale: normalizedLocale, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)

  // Find the first supported locale
  for (const { locale } of languages) {
    if (isValidLocale(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

/**
 * Get locale from various sources in order of priority:
 * 1. URL path parameter
 * 2. Cookie preference
 * 3. Accept-Language header
 * 4. Default locale
 */
function getLocale(request: NextRequest): Locale {
  // 1. Check if locale is in URL path
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split('/')[1];
  
  if (isValidLocale(pathnameLocale)) {
    return pathnameLocale;
  }

  // 2. Check cookie preference
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  return getLocaleFromAcceptLanguage(acceptLanguage);
}

/**
 * Check if the pathname already has a locale prefix
 */
function hasLocalePrefix(pathname: string): boolean {
  const segments = pathname.split('/');
  return segments.length > 1 && isValidLocale(segments[1]);
}

/**
 * Remove locale prefix from pathname
 */
function removeLocalePrefix(pathname: string): string {
  if (!hasLocalePrefix(pathname)) return pathname;
  
  const segments = pathname.split('/');
  return '/' + segments.slice(2).join('/');
}

/**
 * Middleware function for Next.js
 * Handles locale detection and routing
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for:
  // - API routes
  // - Static files (_next, favicon.ico, images, etc.)
  // - Files with extensions
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.ico') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Get the preferred locale
  const locale = getLocale(request);
  
  // If pathname doesn't have a locale prefix, redirect to add it
  if (!hasLocalePrefix(pathname)) {
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    
    // Preserve query parameters
    redirectUrl.search = request.nextUrl.search;
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Set locale cookie for future requests
    response.cookies.set('locale', locale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    
    return response;
  }

  // If pathname has a locale prefix, ensure the cookie is updated
  const pathnameLocale = pathname.split('/')[1] as Locale;
  const response = NextResponse.next();
  
  // Update locale cookie if it doesn't match the URL
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale !== pathnameLocale) {
    response.cookies.set('locale', pathnameLocale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

/**
 * Matcher configuration for Next.js middleware
 * Defines which paths should be processed by the middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (images, css, js, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

/**
 * Utility functions for use in components and pages
 */

/**
 * Get the current locale from a pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1];
  return isValidLocale(locale) ? locale : defaultLocale;
}

/**
 * Create a localized URL
 */
export function createLocalizedUrl(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

