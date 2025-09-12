import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * ➖ Separator Component - Like drawing lines to organize things!
 * 
 * What it does for kids:
 * A separator is like drawing a line between different parts of your drawing
 * or putting a divider in your toy box to keep different toys separate.
 * It helps make things look organized and neat, just like how you might
 * draw a line under your name when you're done writing it!
 * 
 * For grown-ups:
 * A separator component built on Radix UI's Separator primitive that provides
 * semantic separation between content sections. Supports both horizontal and
 * vertical orientations with proper accessibility attributes.
 * 
 * Features:
 * - Semantic HTML with proper ARIA attributes
 * - Horizontal and vertical orientations
 * - Customizable styling with decorative variants
 * - Screen reader accessibility
 * - Consistent spacing and visual hierarchy
 * - Container query responsive behavior
 */

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * The visual style of the separator
   * - default: Simple subtle line
   * - bold: Thicker, more prominent line  
   * - dashed: Dotted line style
   * - gradient: Colorful gradient line
   */
  variant?: 'default' | 'bold' | 'dashed' | 'gradient'
  
  /**
   * Spacing around the separator
   * - none: No extra spacing
   * - sm: Small spacing (useful in compact areas)
   * - default: Standard spacing
   * - lg: Large spacing (for major section breaks)
   */
  spacing?: 'none' | 'sm' | 'default' | 'lg'
}

/**
 * Separator Component
 * 
 * @example
 * ```tsx
 * // Simple horizontal line (like drawing a line across the page)
 * <Separator />
 * 
 * // Vertical line (like drawing a line up and down)
 * <Separator orientation="vertical" className="h-20" />
 * 
 * // Bold separator for major sections
 * <Separator variant="bold" />
 * 
 * // Dashed line (like a dotted line you might cut along)
 * <Separator variant="dashed" />
 * 
 * // Colorful gradient line (like a rainbow!)
 * <Separator variant="gradient" />
 * 
 * // Different spacing options
 * <Separator spacing="sm" />   {/* Less space around */}
 * <Separator spacing="lg" />   {/* More space around */}
 * 
 * // Using in a daycare schedule
 * <div>
 *   <h3>Morning Activities</h3>
 *   <p>9:00 AM - Circle Time</p>
 *   <p>9:30 AM - Arts & Crafts</p>
 *   
 *   <Separator variant="bold" spacing="lg" />
 *   
 *   <h3>Afternoon Activities</h3>
 *   <p>1:00 PM - Story Time</p>
 *   <p>1:30 PM - Outdoor Play</p>
 * </div>
 * 
 * // In a card with sections
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Class Information</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <div>Teacher: Ms. Sarah</div>
 *     <Separator className="my-4" />
 *     <div>Age Group: 3-4 years</div>
 *     <Separator className="my-4" />
 *     <div>Class Size: 12 children</div>
 *   </CardContent>
 * </Card>
 * 
 * // Between buttons in a toolbar
 * <div className="flex items-center space-x-2">
 *   <Button>Save</Button>
 *   <Separator orientation="vertical" className="h-6" />
 *   <Button variant="outline">Cancel</Button>
 * </div>
 * ```
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ 
  className, 
  orientation = "horizontal", 
  decorative = true, 
  variant = "default",
  spacing = "default",
  ...props 
}, ref) => {
  const variantStyles = {
    default: "bg-border",
    bold: "bg-border h-0.5",
    dashed: "bg-transparent border-t border-dashed border-border",
    gradient: "bg-gradient-to-r from-primary/20 via-primary to-primary/20 h-0.5"
  }

  const spacingStyles = {
    none: "",
    sm: orientation === "horizontal" ? "my-2" : "mx-2",
    default: orientation === "horizontal" ? "my-4" : "mx-4", 
    lg: orientation === "horizontal" ? "my-6" : "mx-6"
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }