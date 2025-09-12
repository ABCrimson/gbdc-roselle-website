/**
 * Header Component for GBDC Website
 * 
 * This is a Server Component that provides the main navigation structure.
 * It includes the daycare logo, navigation menu, and slots for client-side
 * components like theme toggle and language switcher.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Professional daycare branding
 * - Accessible navigation with ARIA labels
 * - Blue and yellow color scheme
 * - Server Component for optimal performance
 */

import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { MobileMenu } from "./mobile-menu"

/**
 * Navigation menu items
 * Centralized configuration for easy maintenance
 */
const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/enrollment", label: "Enrollment" },
  { href: "/contact", label: "Contact" },
] as const

/**
 * Header Component
 * 
 * @returns Server-rendered header with navigation and branding
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo and Daycare Name */}
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            aria-label="Great Beginnings Day Care - Home"
          >
            {/* Logo placeholder - can be replaced with actual logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              GB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary leading-tight">
                Great Beginnings
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Day Care • Roselle, IL
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="mr-4 flex md:hidden">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Great Beginnings Day Care - Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              GB
            </div>
            <span className="font-bold text-primary">Great Beginnings</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu navigationItems={navigationItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * Component Features:
 * 
 * 1. Server Component: Rendered on the server for optimal performance
 * 2. Responsive Design: Different layouts for mobile/desktop
 * 3. Sticky Navigation: Stays at top when scrolling
 * 4. Backdrop Blur: Modern glass effect
 * 5. Accessibility: ARIA labels and focus management
 * 6. Professional Branding: Blue/yellow color scheme for daycare
 * 7. Modular Design: Navigation items easily configurable
 */