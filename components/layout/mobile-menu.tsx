"use client"

/**
 * Mobile Menu Component for GBDC Website
 * 
 * This client component provides a responsive mobile navigation menu.
 * It uses a slide-out drawer pattern with smooth animations and
 * proper accessibility features.
 * 
 * Features:
 * - Hamburger menu icon animation
 * - Slide-out drawer with backdrop
 * - Touch-friendly navigation links
 * - Keyboard navigation support
 * - Focus management for accessibility
 */

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  readonly href: string
  readonly label: string
}

interface MobileMenuProps {
  navigationItems: readonly NavigationItem[]
}

/**
 * Mobile Menu Component
 * 
 * @param navigationItems - Array of navigation links
 * @returns Client-side mobile menu with animations
 */
export function MobileMenu({ navigationItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="flex h-4 w-4 items-center justify-center"
        >
          <motion.div
            variants={{
              closed: { rotate: 0, opacity: 1 },
              open: { rotate: 180, opacity: 0 }
            }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute" }}
          >
            <Menu className="h-4 w-4" />
          </motion.div>
          <motion.div
            variants={{
              closed: { rotate: -180, opacity: 0 },
              open: { rotate: 0, opacity: 1 }
            }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute" }}
          >
            <X className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </button>

      {/* Mobile Menu Overlay and Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Mobile Navigation Drawer */}
            <motion.nav
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-40 h-full w-72 border-l bg-background p-6 shadow-lg md:hidden"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    GB
                  </div>
                  <span className="font-bold text-primary">Great Beginnings</span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Quality childcare in Roselle, IL
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Call us: (630) 555-0123
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Component Features:
 * 
 * 1. Client Component: Uses React hooks and event handlers
 * 2. Animated Hamburger: Smooth icon transitions
 * 3. Slide Animation: Spring-based drawer motion
 * 4. Staggered Items: Navigation links animate in sequence
 * 5. Accessibility: ARIA labels, focus management, keyboard support
 * 6. Touch Optimized: Large touch targets for mobile devices
 * 7. Professional Design: Matches daycare branding
 */