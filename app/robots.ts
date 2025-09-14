/**
 * 🤖 Dynamic Robots.txt Generator
 *
 * 🎯 What does this do?
 * Creates rules for search engine crawlers about which pages they can and cannot access
 *
 * 🧒 Kid-Friendly Explanation:
 * This is like putting up signs that tell search engine robots which rooms
 * they can enter and which ones are private - keeping some areas just for us!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Metadata API
 * - Dynamic rules based on environment
 * - Sitemap integration
 * - Crawler-specific rules
 */

import { MetadataRoute } from 'next';

/**
 * Base URL for the website
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://greatbeginningsdaycare.com';

/**
 * Check if we're in production environment
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Generate robots.txt rules
 */
export default function robots(): MetadataRoute.Robots {
  // Development environment - discourage all crawling
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production environment - detailed rules
  return {
    rules: [
      {
        // Default rules for all crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/admin/',
          '/portal/staff/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*?*', // URLs with query parameters
          '/404',
          '/500',
        ],
        crawlDelay: 1, // Be respectful to the server
      },
      {
        // Google-specific rules
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/admin/',
          '/portal/staff/',
          '/_next/',
          '/static/',
        ],
        crawlDelay: 0, // Google can crawl faster
      },
      {
        // Google Image crawler
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/images/',
        ],
        disallow: [
          '/portal/',
          '/api/',
        ],
      },
      {
        // Bing-specific rules
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/admin/',
          '/portal/staff/',
          '/_next/',
          '/static/',
        ],
        crawlDelay: 1,
      },
      {
        // Block bad bots
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'PetalBot',
        ],
        disallow: '/',
      },
      {
        // AI/ML crawlers - control AI training data access
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
        ],
        allow: [
          '/',
          '/about',
          '/programs',
          '/contact',
        ],
        disallow: [
          '/portal/',
          '/api/',
          '/enrollment', // Protect user data
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-0.xml`, // If sitemap is split
    ],
    host: baseUrl,
  };
}