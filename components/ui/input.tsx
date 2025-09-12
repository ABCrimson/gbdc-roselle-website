import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 📝 Input Component - Like a special box where you can type words!
 * 
 * What it does for kids:
 * This is like a magical box where you can write letters, numbers, or words!
 * It's just like when you write your name on a piece of paper, but on the computer.
 * You can click in the box and start typing, and your words will appear!
 * 
 * For grown-ups:
 * A styled input component that extends the native HTML input element
 * with consistent design system styling and accessibility features.
 * Built with Tailwind CSS and full TypeScript support.
 * 
 * Features:
 * - Consistent styling with design system
 * - Full accessibility with proper focus states
 * - Support for all native input attributes
 * - Disabled state styling
 * - Container query responsive behavior
 * - Integration with React Hook Form and other form libraries
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Custom error state styling
   * When true, shows red border to indicate something needs to be fixed
   */
  error?: boolean
}

/**
 * Input Component
 * 
 * @example
 * ```tsx
 * // Basic text input (for writing words)
 * <Input type="text" placeholder="What's your name?" />
 * 
 * // Email input (for email addresses)
 * <Input type="email" placeholder="your-email@example.com" />
 * 
 * // Password input (hides what you type for security)
 * <Input type="password" placeholder="Your secret password" />
 * 
 * // Number input (for ages, phone numbers, etc.)
 * <Input type="number" placeholder="How old are you?" />
 * 
 * // Input with error (shows when something's wrong)
 * <Input 
 *   type="email" 
 *   placeholder="your-email@example.com"
 *   error={true}
 * />
 * 
 * // Disabled input (can't type in it)
 * <Input 
 *   type="text" 
 *   value="This can't be changed" 
 *   disabled 
 * />
 * 
 * // Input for daycare enrollment
 * <Input 
 *   type="text"
 *   placeholder="Child's full name"
 *   required
 * />
 * 
 * // Input with custom styling
 * <Input 
 *   type="text"
 *   className="text-lg"
 *   placeholder="Big text input"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styling - makes it look like a nice input box
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
          // File input specific styling
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // Focus state - makes it glow when you click on it
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          // Disabled state - makes it look grayed out when you can't use it
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Placeholder text styling
          "placeholder:text-muted-foreground",
          // Mobile responsiveness
          "md:text-sm",
          // Error state - red border when something's wrong
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }