import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 🏷️ Label Component - Like name tags for input boxes!
 * 
 * What it does for kids:
 * Labels are like name tags that tell you what each box is for!
 * Just like how your cubby at school has your name on it, labels tell you
 * what to write in each input box. When you click on the label, it even
 * helps you click in the right box automatically - like magic!
 * 
 * For grown-ups:
 * A label component built on Radix UI's Label primitive with enhanced
 * accessibility features. Provides proper label-input associations,
 * keyboard navigation support, and visual styling variants.
 * 
 * Features:
 * - Automatic input association when used with htmlFor
 * - Click-to-focus functionality
 * - Screen reader compatibility
 * - Required/optional indicators
 * - Error state styling
 * - Multiple size variants
 * - Full TypeScript support
 */

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        error: "text-destructive",
        success: "text-green-600 dark:text-green-400",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * Shows a red asterisk (*) to indicate this field is required
   * Like putting a star next to the most important things!
   */
  required?: boolean
  
  /**
   * Shows "(optional)" text to indicate this field is not required
   * Like saying "you can fill this out if you want to"
   */
  optional?: boolean
  
  /**
   * Error message to display below the label
   * Shows helpful hints when something needs to be fixed
   */
  error?: string
  
  /**
   * Help text to display below the label
   * Like little hints to help you know what to write
   */
  help?: string
}

/**
 * Label Component
 * 
 * @example
 * ```tsx
 * // Basic label (tells you what the input is for)
 * <Label htmlFor="name">Your Name</Label>
 * <Input id="name" type="text" />
 * 
 * // Required field label (has a red star)
 * <Label htmlFor="email" required>Email Address</Label>
 * <Input id="email" type="email" />
 * 
 * // Optional field label (says "optional")
 * <Label htmlFor="phone" optional>Phone Number</Label>
 * <Input id="phone" type="tel" />
 * 
 * // Label with error message
 * <Label htmlFor="password" error="Password must be at least 8 characters">
 *   Password
 * </Label>
 * <Input id="password" type="password" />
 * 
 * // Label with help text
 * <Label htmlFor="age" help="Enter your child's age in years">
 *   Child's Age
 * </Label>
 * <Input id="age" type="number" />
 * 
 * // Different sizes
 * <Label size="sm">Small Label</Label>
 * <Label size="lg">Large Label</Label>
 * 
 * // Different styles
 * <Label variant="muted">Quiet Label</Label>
 * <Label variant="error">Error Label</Label>
 * 
 * // Complete form field example for daycare
 * <div className="space-y-2">
 *   <Label htmlFor="childName" required help="Please enter your child's full legal name">
 *     Child's Full Name
 *   </Label>
 *   <Input 
 *     id="childName" 
 *     type="text" 
 *     placeholder="e.g., Emma Johnson"
 *   />
 * </div>
 * ```
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, optional, error, help, children, ...props }, ref) => (
  <div className="space-y-1">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants({ variant: error ? "error" : variant, size }),
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span 
          className="ml-1 text-destructive" 
          aria-label="Required"
          title="This field is required"
        >
          *
        </span>
      )}
      {optional && !required && (
        <span 
          className="ml-1 text-xs text-muted-foreground font-normal"
          aria-label="Optional"
        >
          (optional)
        </span>
      )}
    </LabelPrimitive.Root>
    
    {/* Help text */}
    {help && !error && (
      <p className="text-xs text-muted-foreground" role="note">
        {help}
      </p>
    )}
    
    {/* Error message */}
    {error && (
      <p className="text-xs text-destructive" role="alert" aria-live="polite">
        {error}
      </p>
    )}
  </div>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }