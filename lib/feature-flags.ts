/**
 * Feature Flags System for GBDC Website
 *
 * Controls visibility and access to experimental features.
 * Features can be toggled without code changes via environment variables.
 */

/**
 * Feature flag definitions
 */
export const FEATURE_FLAGS = {
  // Resource Library - Educational materials and resources for parents
  RESOURCE_LIBRARY: process.env.NEXT_PUBLIC_FEATURE_RESOURCE_LIBRARY === 'true',

  // Referral Tracker - Track and manage client referrals
  REFERRAL_TRACKER: process.env.NEXT_PUBLIC_FEATURE_REFERRAL_TRACKER === 'true',

  // Other potential features for future use
  PARENT_PORTAL: process.env.NEXT_PUBLIC_FEATURE_PARENT_PORTAL === 'true',
  ONLINE_PAYMENTS: process.env.NEXT_PUBLIC_FEATURE_ONLINE_PAYMENTS === 'true',
  CHAT_SUPPORT: process.env.NEXT_PUBLIC_FEATURE_CHAT_SUPPORT === 'true',
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return FEATURE_FLAGS[feature] || false;
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(): FeatureFlag[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlag[])
    .filter(feature => FEATURE_FLAGS[feature]);
}

/**
 * Feature flag hook for client components
 * Note: For server components, use isFeatureEnabled directly
 */
export function useFeatureFlag(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

/**
 * Higher-order component to conditionally render based on feature flag
 */
export function withFeatureFlag<P extends object>(
  feature: FeatureFlag,
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<P>
): React.ComponentType<P> {
  return function FeatureFlaggedComponent(props: P) {
    if (isFeatureEnabled(feature)) {
      return <Component {...props} />;
    }

    if (FallbackComponent) {
      return <FallbackComponent {...props} />;
    }

    return null;
  };
}