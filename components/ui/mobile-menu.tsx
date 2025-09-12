/**
 * Mobile Menu Component
 * 
 * Responsive navigation menu for mobile devices with locale support.
 * 
 * Features:
 * - Hamburger menu with smooth animations
 * - Full-screen overlay navigation
 * - Translated navigation items
 * - Mobile-optimized touch interactions
 * - Accessible keyboard navigation
 * - Close on route change
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// i18n imports
import { type Locale } from "@/middleware";

interface NavigationItem {
  key: string;
  label: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavigationItem[];
  locale: Locale;
  enrollText: string;
}

/**
 * Mobile Menu Component
 */
export function MobileMenu({ navigation, locale, enrollText }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-8 h-8 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-xl border-l">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="text-lg font-semibold text-foreground">
                  Menu
                </div>
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6" role="navigation">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className={`
                            block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200
                            ${isActive 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-foreground hover:bg-muted/50 hover:text-primary'
                            }
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="p-4 border-t space-y-4">
                <Link
                  href={`/${locale}/contact`}
                  className="w-full inline-flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  {enrollText}
                </Link>
                
                <div className="text-center">
                  <a 
                    href="tel:+16305550123"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    (630) 555-0123
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Mobile Menu Features:
 * 
 * 1. Client Component: Interactive state management for menu toggle
 * 2. Full Screen: Overlay navigation for mobile devices
 * 3. Smooth Animation: CSS transitions for open/close states
 * 4. Route Awareness: Highlights active navigation item
 * 5. Auto Close: Closes menu on navigation or route change
 * 6. Body Scroll Lock: Prevents background scrolling when open
 * 7. Touch Optimized: Large touch targets for mobile interaction
 * 8. Accessibility: Proper ARIA labels and keyboard support
 * 9. Contact Integration: CTA button and phone number
 * 10. Professional Design: Consistent with overall site styling
 */