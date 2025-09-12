/**
 * Root Page Redirect
 * 
 * This page should not normally be accessed as the middleware
 * will redirect all requests to the appropriate locale route.
 * This is a fallback in case someone accesses the root directly.
 */

import { redirect } from "next/navigation";
import { defaultLocale } from "@/middleware";

/**
 * Root page component - redirects to default locale
 */
export default function RootPage() {
  // Redirect to default locale
  redirect(`/${defaultLocale}`);
}

