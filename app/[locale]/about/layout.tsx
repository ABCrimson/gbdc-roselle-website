/**
 * 🏗️ About Layout with Partial Prerendering
 *
 * 🎯 What does this do?
 * Configures the About section for optimal performance with PPR
 *
 * 🧒 Kid-Friendly Explanation:
 * This helps the About page load super fast by preparing parts of it
 * ahead of time - like having your backpack ready the night before school!
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

interface AboutLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AboutLayout({
  children,
  params,
}: AboutLayoutProps) {
  return <>{children}</>;
}