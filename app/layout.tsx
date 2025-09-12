/**
 * Root Layout Component
 * 
 * This is the main layout file that wraps EVERY page in the application.
 * Think of it like a picture frame - every page goes inside this frame.
 * It sets up fonts, metadata, and the basic HTML structure.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Global styles that apply to the entire website

/**
 * Font Configuration
 * We're using Google Fonts to load professional typography
 */

// Geist Sans - A clean, modern font for regular text (headings, paragraphs)
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable name we can use in our styles
  subsets: ["latin"],             // Only load Latin characters (English alphabet)
});

// Geist Mono - A monospace font for code or special text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable for monospace font
  subsets: ["latin"],             // Only load Latin characters
});

/**
 * Website Metadata
 * This information appears in search results and browser tabs
 * IMPORTANT: Update these values for production!
 */
export const metadata: Metadata = {
  title: "Great Beginnings Day Care - Roselle, IL",
  description: "Premier daycare center in Roselle, Illinois. Providing quality childcare, early education, and nurturing environment for infants through school-age children.",
  
  // Additional metadata for better SEO
  keywords: "daycare, childcare, preschool, Roselle IL, early education, infant care",
  authors: [{ name: "Great Beginnings Day Care" }],
  openGraph: {
    title: "Great Beginnings Day Care - Roselle, IL",
    description: "Quality childcare and early education in Roselle, Illinois",
    type: "website",
  },
};

/**
 * Root Layout Component
 * 
 * @param children - All the page content that will be rendered
 * @returns The complete HTML structure with fonts and styles applied
 * 
 * This component:
 * 1. Sets up the HTML and body tags for every page
 * 2. Applies our custom fonts
 * 3. Adds the 'antialiased' class for smoother text rendering
 * 4. Wraps all page content in a consistent structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React.ReactNode means any valid React content
}>) {
  return (
    <html lang="en">
      {/* The body tag wraps all visible content */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* This is where each page's content will be inserted */}
        {children}
      </body>
    </html>
  );
}
