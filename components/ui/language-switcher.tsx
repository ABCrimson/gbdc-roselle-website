"use client"

/**
 * Language Switcher Component for GBDC Website
 * 
 * This client component provides language switching functionality
 * for the daycare website. It supports multiple languages common
 * in the Roselle, IL area and uses smooth animations.
 * 
 * Features:
 * - Multi-language support (English, Spanish, Polish)
 * - Dropdown selection interface
 * - Flag icons for visual identification
 * - Persistent language preference
 * - Accessible design with ARIA labels
 * - Professional daycare-friendly styling
 */

import * as React from "react"
import { Languages, ChevronDown, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Supported languages for the daycare website
 * Common languages in Roselle, IL area
 */
const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    nativeName: "English"
  },
  {
    code: "es", 
    name: "Spanish",
    flag: "🇪🇸",
    nativeName: "Español"
  },
  {
    code: "pl",
    name: "Polish", 
    flag: "🇵🇱",
    nativeName: "Polski"
  },
] as const

/**
 * Language Switcher Component
 * 
 * @returns Client-side language switcher with dropdown
 */
export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = React.useState(languages[0])
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
    
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage) {
      const found = languages.find(lang => lang.code === savedLanguage)
      if (found) {
        setCurrentLanguage(found)
      }
    }
  }, [])

  // Handle language change
  const handleLanguageChange = (language: typeof languages[number]) => {
    setCurrentLanguage(language)
    setIsOpen(false)
    
    // Save preference to localStorage
    localStorage.setItem("preferred-language", language.code)
    
    // Here you would typically trigger your i18n system
    // For example: i18n.changeLanguage(language.code)
    
    // For demonstration, we'll just log the change
    console.log(`Language changed to: ${language.name} (${language.code})`)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-language-switcher]')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex h-9 w-20 items-center justify-center rounded-md border border-input bg-background">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </div>
    )
  }

  return (
    <div className="relative" data-language-switcher>
      {/* Language Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center space-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
        aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Current Language Flag and Code */}
        <span className="text-base" role="img" aria-label={`${currentLanguage.name} flag`}>
          {currentLanguage.flag}
        </span>
        <span className="hidden sm:inline font-medium">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {/* Language Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-1 z-50 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg"
            role="listbox"
            aria-label="Available languages"
          >
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.15 }}
                className={`relative flex w-full cursor-pointer select-none items-center space-x-3 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                  currentLanguage.code === language.code 
                    ? "bg-accent text-accent-foreground" 
                    : ""
                }`}
                role="option"
                aria-selected={currentLanguage.code === language.code}
                aria-label={`Switch to ${language.name}`}
              >
                {/* Flag */}
                <span 
                  className="text-base flex-shrink-0" 
                  role="img" 
                  aria-label={`${language.name} flag`}
                >
                  {language.flag}
                </span>
                
                {/* Language Names */}
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-medium">{language.name}</span>
                  {language.nativeName !== language.name && (
                    <span className="text-xs text-muted-foreground">
                      {language.nativeName}
                    </span>
                  )}
                </div>

                {/* Active Indicator */}
                {currentLanguage.code === language.code && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </motion.button>
            ))}
            
            {/* Footer Note */}
            <div className="mt-2 border-t pt-2 px-3 py-1">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span>More languages coming soon</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Simplified Language Switcher (Alternative)
 * 
 * A more compact version for mobile or space-constrained areas
 */
export function LanguageSwitcherCompact() {
  const [currentLanguage, setCurrentLanguage] = React.useState(languages[0])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage) {
      const found = languages.find(lang => lang.code === savedLanguage)
      if (found) setCurrentLanguage(found)
    }
  }, [])

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLanguage.code)
    const nextIndex = (currentIndex + 1) % languages.length
    const nextLanguage = languages[nextIndex]
    
    setCurrentLanguage(nextLanguage)
    localStorage.setItem("preferred-language", nextLanguage.code)
  }

  if (!mounted) {
    return (
      <div className="flex h-9 w-12 items-center justify-center rounded-md border border-input bg-background">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </div>
    )
  }

  return (
    <button
      onClick={cycleLanguage}
      className="flex h-9 w-12 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
      aria-label={`Current language: ${currentLanguage.name}. Click to cycle to next language.`}
      title={`Switch from ${currentLanguage.name}`}
    >
      <span className="text-base" role="img" aria-label={`${currentLanguage.name} flag`}>
        {currentLanguage.flag}
      </span>
    </button>
  )
}

/**
 * Component Features:
 * 
 * 1. Client Component: Uses React hooks and local storage
 * 2. Multi-Language Support: English, Spanish, Polish
 * 3. Visual Indicators: Flag emojis and language codes
 * 4. Smooth Animations: Dropdown transitions and staggered items
 * 5. Accessibility: ARIA labels, keyboard support, screen reader friendly
 * 6. Persistent Storage: Remembers language preference
 * 7. Professional Design: Matches daycare branding
 * 8. Alternative Compact Version: For mobile/limited space
 * 9. Future Extensible: Easy to add more languages
 */