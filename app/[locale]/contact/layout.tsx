/**
 * 🏗️ Contact Layout with Partial Prerendering
 *
 * 🎯 What does this do?
 * Configures the Contact section for optimal performance with PPR
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes the contact page load super fast by preparing the map
 * and contact info early - like having the phone book ready to use!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Partial Prerendering
 * - Static shell with dynamic form
 * - Optimized for Core Web Vitals
 */

import type { ReactNode } from 'react';

// Enable Partial Prerendering for this route
// Contact form will be dynamic but info is static
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 86400; // Revalidate daily

interface ContactLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ContactLayout({
  children,
  params,
}: ContactLayoutProps) {
  return <>{children}</>;
}