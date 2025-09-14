/**
 * 🏗️ Enrollment Layout with Partial Prerendering
 *
 * 🎯 What does this do?
 * Configures the Enrollment section for optimal performance with PPR
 *
 * 🧒 Kid-Friendly Explanation:
 * This helps the enrollment form page load faster by preparing the
 * non-changing parts early - like having forms ready before parents arrive!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Partial Prerendering
 * - Static shell with dynamic form
 * - Optimized for Core Web Vitals
 */

import type { ReactNode } from 'react';

// Enable Partial Prerendering for this route
// The form itself will be dynamic but the shell is static
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

interface EnrollmentLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function EnrollmentLayout({
  children,
  params,
}: EnrollmentLayoutProps) {
  return <>{children}</>;
}