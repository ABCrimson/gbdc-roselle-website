/**
 * Language Switcher Component
 * 
 * Dropdown component for switching between supported locales.
 * Updates the URL to change the locale while preserving the current path.
 * 
 * Features:
 * - Dropdown menu with all supported languages
 * - Current locale highlighting
 * - Native language names for each locale
 * - Flag icons for visual identification
 * - Preserves current path when switching languages
 * - Accessible keyboard navigation
 * - Mobile-friendly design
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";

// i18n imports
import { type Locale } from "@/middleware";
import { getAvailableLocales } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

/**
 * Language Switcher Component
 */
export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get all available locales
  const availableLocales = getAvailableLocales();
  const currentLocaleInfo = availableLocales.find(locale => locale.code === currentLocale);

  /**
   * Handle language change
   * Updates the URL to use the new locale while preserving the current path
   */
  const handleLanguageChange = (newLocale: Locale) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    
    // Create new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Navigate to new path
    router.push(newPath);
    
    // Close dropdown
    setIsOpen(false);
  };

  /**
   * Handle click outside to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {currentLocaleInfo?.flag} {currentLocaleInfo?.nativeName}
        </span>
        <span className="sm:hidden">
          {currentLocaleInfo?.flag}
        </span>
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {availableLocales.map((locale) => {
              const isActive = locale.code === currentLocale;
              
              return (
                <button
                  key={locale.code}
                  onClick={() => handleLanguageChange(locale.code)}
                  className={`
                    w-full px-4 py-2 text-left text-sm transition-colors duration-150
                    ${isActive 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                    focus:outline-none focus:bg-muted/50
                  `}
                  role="menuitem"
                  aria-label={`Switch to ${locale.name}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg leading-none">
                      {locale.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {locale.nativeName}
                      </span>
                      <span className="text-xs opacity-75">
                        {locale.name}
                      </span>
                    </div>
                    {isActive && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Language Switcher Features:
 * 
 * 1. Client Component: Interactive dropdown with state management
 * 2. URL Preservation: Maintains current path when switching languages
 * 3. Visual Indicators: Flag icons and native language names
 * 4. Current Language: Highlights the active locale
 * 5. Accessibility: Proper ARIA attributes and keyboard navigation
 * 6. Responsive: Mobile-friendly with collapsed text on small screens
 * 7. Animation: Smooth dropdown transitions
 * 8. Click Outside: Closes dropdown when clicking elsewhere
 * 9. Keyboard Support: ESC key closes dropdown
 * 10. Professional Design: Consistent with overall site styling
 */