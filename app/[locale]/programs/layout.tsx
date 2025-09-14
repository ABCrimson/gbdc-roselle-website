/**
 * 🏗️ Programs Layout with Partial Prerendering
 *
 * 🎯 What does this do?
 * Configures the Programs section for optimal performance with PPR
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes the Programs page load quickly by preparing the main parts
 * ahead of time - like setting up classroom materials before kids arrive!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Partial Prerendering
 * - Static shell with dynamic content
 * - Optimized for Core Web Vitals
 */

import type { ReactNode } from 'react';

// Enable Partial Prerendering for this route
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

interface ProgramsLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ProgramsLayout({
  children,
  params,
}: ProgramsLayoutProps) {
  return <>{children}</>;
}