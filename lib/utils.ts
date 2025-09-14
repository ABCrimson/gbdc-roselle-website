/**
 * 🛠️ UTILITY FUNCTIONS FOR UI COMPONENTS
 * 
 * 🎯 What does this file do?
 * This file contains helper functions that make our UI components work better.
 * Think of it as a toolbox that our components can use!
 * 
 * 🧒 Kid-Friendly Explanation:
 * Imagine you have a box of tools that help you build LEGO sets.
 * This file is like that toolbox - it has special tools that help
 * our website components work together nicely!
 * 
 * @module utils
 * @version 1.0.0
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 🎨 cn - Class Name Merger
 * 
 * 🎯 What it does:
 * Combines multiple CSS class names into one clean string,
 * removing duplicates and conflicts.
 * 
 * 🧒 Like mixing paint colors!
 * If you have "red" and "blue" paint, but then add "red" again,
 * you still only have red and blue - not two reds!
 * 
 * @param inputs - CSS class names to merge
 * @returns A single string with all the classes combined nicely
 * 
 * @example
 * cn('text-red-500', 'text-blue-500') // Returns: 'text-blue-500' (blue wins!)
 * cn('p-4', someCondition && 'p-8') // Conditionally applies padding
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * 🎲 generateId - Create Unique IDs
 * 
 * 🎯 Creates a unique identifier for components
 * 
 * 🧒 Like giving each toy a special name tag!
 * 
 * @param prefix - What to put at the start of the ID
 * @returns A unique ID string
 */
export function generateId(prefix: string = 'gbdc'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * 🔤 formatClassName - Format Class Names for Containers
 * 
 * 🎯 Formats class names with container query support
 * 
 * 🧒 Like organizing your toy boxes by size!
 * 
 * @param base - The main classes
 * @param container - Container-specific classes
 * @returns Formatted class string
 */
export function formatClassName(
  base: string,
  container?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
): string {
  if (!container) return base
  
  const containerClasses = [
    container.sm && `@container-sm:${container.sm}`,
    container.md && `@container-md:${container.md}`,
    container.lg && `@container-lg:${container.lg}`,
    container.xl && `@container-xl:${container.xl}`,
  ].filter(Boolean).join(' ')
  
  return cn(base, containerClasses)
}

/**
 * 🎨 Color Variants for GBDC Theme
 * 
 * 🧒 Our daycare's special colors - like crayons in a box!
 */
export const colors = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
  success: 'bg-green-500 text-white hover:bg-green-600',
  warning: 'bg-orange-500 text-white hover:bg-orange-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  info: 'bg-cyan-500 text-white hover:bg-cyan-600',
} as const

/**
 * 🎚️ Size Variants
 * 
 * 🧒 Like small, medium, and large toys!
 */
export const sizes = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
  xl: 'text-xl px-6 py-3',
} as const

/**
 * 🔄 Focus Ring Styles
 * 
 * 🎯 Makes sure keyboard users can see what they're selecting
 * 
 * 🧒 Like a glowing outline around the toy you're looking at!
 */
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

/**
 * 🎬 Animation Classes
 * 
 * 🧒 Makes things move smoothly, like a carousel!
 */
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideIn: 'animate-in slide-in-from-bottom-2 duration-200',
  slideOut: 'animate-out slide-out-to-bottom-2 duration-200',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
} as const

/**
 * 📱 Container Query Breakpoints
 * 
 * 🎯 For responsive components based on container size
 * 
 * 🧒 Like having different toy box sizes for different rooms!
 */
export const containerBreakpoints = {
  '@xs': '@container (min-width: 320px)',
  '@sm': '@container (min-width: 384px)',
  '@md': '@container (min-width: 448px)',
  '@lg': '@container (min-width: 512px)',
  '@xl': '@container (min-width: 576px)',
  '@2xl': '@container (min-width: 672px)',
} as const

/**
 * 🎨 Variant Builder Helper
 * 
 * 🎯 Helps create consistent variant styles
 * 
 * @example
 * const buttonVariants = createVariants({
 *   base: 'rounded-lg font-medium',
 *   variants: {
 *     color: colors,
 *     size: sizes
 *   }
 * })
 */
export function createVariants<T extends Record<string, Record<string, string>>>(config: {
  base: string
  variants: T
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>
}) {
  return config
}

/**
 * 🔧 Debounce Function
 * 
 * 🎯 Prevents functions from running too often
 * 
 * 🧒 Like waiting for everyone to sit down before starting story time!
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 🎯 Format Error Messages
 * 
 * 🧒 Makes error messages friendly for parents and kids!
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Something went wrong. Please try again!'
}

/**
 * 📏 Truncate Text
 * 
 * 🧒 Makes long sentences shorter with "..." at the end!
 */
export function truncate(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * 🎨 Theme Helper
 * 
 * 🎯 Gets the current theme (light or dark mode)
 * 
 * 🧒 Like switching between day and night lights!
 */
export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}