/**
 * Referral Tracker Page
 *
 * Track and manage client referrals.
 * This feature is behind a feature flag and not publicly visible.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isFeatureEnabled } from '@/lib/feature-flags';
import ReferralTracker from '@/components/features/ReferralTracker';

export const metadata: Metadata = {
  title: 'Referral Tracker | Great Beginnings Day Care',
  description: 'Track and manage client referrals',
  robots: 'noindex, nofollow', // Hidden from search engines
};

export default function ReferralsPage() {
  // Check if feature is enabled
  if (!isFeatureEnabled('REFERRAL_TRACKER')) {
    notFound();
  }

  return <ReferralTracker />;
}