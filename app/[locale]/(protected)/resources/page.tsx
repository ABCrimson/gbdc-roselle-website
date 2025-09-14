/**
 * Resource Library Page
 *
 * Educational resources and materials for parents.
 * This feature is behind a feature flag and not publicly visible.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isFeatureEnabled } from '@/lib/feature-flags';
import ResourceLibrary from '@/components/features/ResourceLibrary';

export const metadata: Metadata = {
  title: 'Resource Library | Great Beginnings Day Care',
  description: 'Educational resources, guides, and materials for parents',
  robots: 'noindex, nofollow', // Hidden from search engines
};

export default function ResourcesPage() {
  // Check if feature is enabled
  if (!isFeatureEnabled('RESOURCE_LIBRARY')) {
    notFound();
  }

  return <ResourceLibrary />;
}