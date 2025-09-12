"use client"

/**
 * Theme Toggle Component for GBDC Website
 * 
 * This client component provides a toggle button to switch between
 * light and dark themes. It uses next-themes for persistence and
 * system preference detection.
 * 
 * Features:
 * - Smooth icon transitions
 * - System theme detection
 * - Persistent theme preference
 * - Accessible button with proper ARIA labels
 * - Professional daycare-friendly design
 * - Loading state to prevent hydration issues
 */

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * Theme Toggle Button Component
 * 
 * @returns Client-side theme toggle with smooth animations
 */
export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative h-4 w-4 overflow-hidden">
        {/* Sun Icon (Light Mode) */}
        <Sun
          className={`absolute h-4 w-4 transition-all duration-300 ease-in-out ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        
        {/* Moon Icon (Dark Mode) */}
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ease-in-out ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      
      {/* Visual indicator for current theme */}
      <span className="sr-only">
        {isDark ? "Dark theme active" : "Light theme active"}
      </span>
    </button>
  )
}

/**
 * Enhanced Theme Toggle with Dropdown (Optional Alternative)
 * 
 * This provides a more comprehensive theme selection with system option
 */
export function ThemeToggleDropdown() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </div>
    )
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Sun }, // Could use a system icon
  ] as const

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
        aria-label="Theme options"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          {themeOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value)
                  setIsOpen(false)
                }}
                className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                  theme === option.value ? "bg-accent" : ""
                }`}
              >
                <IconComponent className="mr-2 h-4 w-4" />
                <span>{option.label}</span>
                {theme === option.value && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Component Features:
 * 
 * 1. Client Component: Uses React hooks and theme context
 * 2. Hydration Safe: Prevents mismatch between server/client
 * 3. Smooth Animations: Rotating icon transitions
 * 4. Accessibility: ARIA labels, keyboard support
 * 5. Loading State: Prevents layout shift during hydration
 * 6. Professional Design: Matches daycare branding
 * 7. Theme Persistence: Remembers user preference
 * 8. Alternative Dropdown: More comprehensive theme options
 */