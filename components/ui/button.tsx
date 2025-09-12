import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 🔘 Button Component - Like a magic button that does things!
 * 
 * What it does for kids:
 * This is like the buttons you press to make things happen! It can look different
 * ways - sometimes big, sometimes small, sometimes colorful - but it always
 * helps you tell the computer what you want to do. Just like pressing the
 * elevator button to go up or down!
 * 
 * For grown-ups:
 * A flexible button component built on Radix UI's Slot primitive with
 * comprehensive styling variants using class-variance-authority.
 * Supports all native button props and custom styling variants.
 * 
 * Features:
 * - Multiple visual variants (default, destructive, outline, secondary, ghost, link)
 * - Size variants (default, sm, lg, icon)
 * - Full keyboard and screen reader accessibility
 * - Support for asChild prop to render as different elements
 * - TypeScript support with proper prop inference
 */

const buttonVariants = cva(
  // Base styles that always apply
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the button will render as a child element instead of a button.
   * This is useful for creating buttons that look like links or other elements.
   * 
   * Think of it like: "Should this look like a button but actually be something else?"
   */
  asChild?: boolean
}

/**
 * Button Component
 * 
 * @example
 * ```tsx
 * // Regular button (like a doorbell!)
 * <Button>Click Me!</Button>
 * 
 * // Dangerous button (like a "Delete" button - use carefully!)
 * <Button variant="destructive">Delete Item</Button>
 * 
 * // Outline button (like a picture frame around text)
 * <Button variant="outline">Cancel</Button>
 * 
 * // Small button (for small spaces)
 * <Button size="sm">Save</Button>
 * 
 * // Big button (for important actions)
 * <Button size="lg">Get Started</Button>
 * 
 * // Icon button (just a symbol, no text)
 * <Button size="icon" variant="ghost">
 *   <Heart className="h-4 w-4" />
 * </Button>
 * 
 * // Button that looks like a link
 * <Button variant="link">Learn More</Button>
 * 
 * // Custom button that acts like a link
 * <Button asChild>
 *   <a href="/about">About Us</a>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }