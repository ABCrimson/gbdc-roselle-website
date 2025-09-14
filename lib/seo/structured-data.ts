/**
 * 🔍 Structured Data Utilities for SEO
 *
 * 🎯 What does this do?
 * Creates JSON-LD structured data that helps search engines understand our content better
 *
 * 🧒 Kid-Friendly Explanation:
 * This gives search engines like Google special information about our daycare
 * in a language they understand really well - like giving them a detailed map!
 *
 * 🏗️ Modern Patterns:
 * - Schema.org structured data
 * - Type-safe JSON-LD generation
 * - Rich snippets support
 */

/**
 * Organization schema for the daycare
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': 'https://greatbeginningsdaycare.com/#organization',
    name: 'Great Beginnings Day Care',
    alternateName: 'GBDC Roselle',
    url: 'https://greatbeginningsdaycare.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://greatbeginningsdaycare.com/logo.png',
      width: 512,
      height: 512,
    },
    image: [
      'https://greatbeginningsdaycare.com/images/facility-1.jpg',
      'https://greatbeginningsdaycare.com/images/facility-2.jpg',
      'https://greatbeginningsdaycare.com/images/facility-3.jpg',
    ],
    description: 'Premier daycare center in Roselle, Illinois providing quality childcare and early education for infants through school-age children.',
    telephone: '+1-630-894-3440',
    email: 'info@greatbeginningsdaycare.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '757 E Nerge Rd',
      addressLocality: 'Roselle',
      addressRegion: 'IL',
      postalCode: '60172',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.9848,
      longitude: -88.0776,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:30',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    servesCuisine: 'Healthy snacks and meals',
    hasMap: 'https://maps.google.com/?q=Great+Beginnings+Day+Care+Roselle+IL',
    sameAs: [
      'https://www.facebook.com/greatbeginningsdaycare',
      'https://www.instagram.com/gbdcroselle',
      'https://twitter.com/gbdcroselle',
    ],
    foundingDate: '2014',
    slogan: 'Where Learning Begins',
    knowsAbout: [
      'Early Childhood Education',
      'Infant Care',
      'Toddler Development',
      'Preschool Education',
      'After School Programs',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Roselle',
      '@id': 'https://en.wikipedia.org/wiki/Roselle,_Illinois',
    },
    member: {
      '@type': 'Organization',
      name: 'Illinois Department of Children and Family Services',
    },
    award: [
      'DCFS Gold Circle of Quality Award 2017',
      'Parent Choice Award 2023',
    ],
  };
}

/**
 * Local Business schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://greatbeginningsdaycare.com/#business',
    name: 'Great Beginnings Day Care',
    image: 'https://greatbeginningsdaycare.com/images/storefront.jpg',
    telephone: '+1-630-894-3440',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '757 E Nerge Rd',
      addressLocality: 'Roselle',
      addressRegion: 'IL',
      postalCode: '60172',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        datePublished: '2024-10-15',
        reviewBody: 'Great Beginnings has been a blessing for our family. The teachers genuinely care about each child\'s development.',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Childcare Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Infant Care',
            description: 'Nurturing care for infants 6 weeks to 15 months',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Toddler Program',
            description: 'Developmental program for toddlers 15 months to 3 years',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preschool',
            description: 'Educational program for children 3 to 5 years',
          },
        },
      ],
    },
  };
}

/**
 * Website schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://greatbeginningsdaycare.com/#website',
    url: 'https://greatbeginningsdaycare.com',
    name: 'Great Beginnings Day Care',
    description: 'Official website of Great Beginnings Day Care in Roselle, Illinois',
    publisher: {
      '@id': 'https://greatbeginningsdaycare.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://greatbeginningsdaycare.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en-US', 'es-ES', 'ru-RU', 'uk-UA'],
  };
}

/**
 * Breadcrumb schema generator
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ schema generator
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Event schema generator (for open houses, tours, etc.)
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      '@type': 'Place',
      name: event.location || 'Great Beginnings Day Care',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '757 E Nerge Rd',
        addressLocality: 'Roselle',
        addressRegion: 'IL',
        postalCode: '60172',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@id': 'https://greatbeginningsdaycare.com/#organization',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

/**
 * Service schema generator
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  audience?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': 'https://greatbeginningsdaycare.com/#organization',
    },
    areaServed: service.areaServed || 'Roselle, Illinois',
    audience: {
      '@type': 'Audience',
      audienceType: service.audience || 'Parents with young children',
    },
    serviceType: 'Childcare',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        name: 'Great Beginnings Day Care',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '757 E Nerge Rd',
          addressLocality: 'Roselle',
          addressRegion: 'IL',
          postalCode: '60172',
        },
      },
    },
  };
}