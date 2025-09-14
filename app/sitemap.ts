/**
 * 🗺️ Dynamic Sitemap Generator
 *
 * 🎯 What does this do?
 * Generates a dynamic XML sitemap for search engines with all pages and their priorities
 *
 * 🧒 Kid-Friendly Explanation:
 * This creates a map that helps Google and other search engines find all
 * the pages on our website - like a treasure map for the internet!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Metadata API
 * - Dynamic route generation
 * - Internationalization support
 * - Priority-based indexing
 */

import { MetadataRoute } from 'next';

/**
 * Supported locales for the daycare website
 */
const locales = ['en', 'es', 'ru', 'uk'] as const;

/**
 * Base URL for the website
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://greatbeginningsdaycare.com';

/**
 * Static pages with their priorities and change frequencies
 */
const staticPages = [
  {
    path: '',
    priority: 1.0,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/about',
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/programs',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/enrollment',
    priority: 0.95,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/contact',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/portal',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/portal/documents',
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/weather',
    priority: 0.4,
    changeFrequency: 'daily' as const,
  },
];

/**
 * Program-specific pages (dynamic)
 */
const programPages = [
  'infant',
  'toddler',
  'preschool',
  'pre-k',
  'school-age',
];

/**
 * Generate sitemap entries for all locales
 */
function generateLocalizedUrls(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'],
  lastModified: Date
): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: locales.reduce((acc, l) => ({
        ...acc,
        [l]: `${baseUrl}/${l}${path}`,
      }), {}),
    },
  }));
}

/**
 * Dynamic sitemap generation
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add home page (special case without locale in URL for default)
  sitemapEntries.push({
    url: baseUrl,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: locales.reduce((acc, locale) => ({
        ...acc,
        [locale]: `${baseUrl}/${locale}`,
      }), {}),
    },
  });

  // Add static pages for all locales
  staticPages.forEach(page => {
    if (page.path) { // Skip empty path as it's handled above
      const localizedUrls = generateLocalizedUrls(
        page.path,
        page.priority,
        page.changeFrequency,
        lastModified
      );
      sitemapEntries.push(...localizedUrls);
    }
  });

  // Add dynamic program pages
  programPages.forEach(program => {
    const localizedUrls = generateLocalizedUrls(
      `/programs/${program}`,
      0.75,
      'weekly',
      lastModified
    );
    sitemapEntries.push(...localizedUrls);
  });

  // Add legal/policy pages
  const legalPages = [
    '/privacy-policy',
    '/terms-of-service',
    '/enrollment-agreement',
  ];

  legalPages.forEach(page => {
    const localizedUrls = generateLocalizedUrls(
      page,
      0.3,
      'yearly',
      lastModified
    );
    sitemapEntries.push(...localizedUrls);
  });

  // Add seasonal/event pages (if they exist)
  const eventPages = [
    '/summer-camp',
    '/holiday-schedule',
    '/events',
  ];

  eventPages.forEach(page => {
    const localizedUrls = generateLocalizedUrls(
      page,
      0.5,
      'monthly',
      lastModified
    );
    sitemapEntries.push(...localizedUrls);
  });

  // Sort by priority (highest first)
  sitemapEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return sitemapEntries;
}