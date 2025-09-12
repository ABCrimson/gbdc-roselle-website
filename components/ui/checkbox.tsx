import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * ☑️ Checkbox Component - Like a magic box you can check or uncheck!
 * 
 * What it does for kids:
 * A checkbox is like a little square box that you can click to put a checkmark
 * inside it, or click again to make the checkmark go away! It's like making
 * a list of your favorite toys and checking off the ones you want to play with.
 * You can check as many boxes as you want - they're all independent!
 * 
 * For grown-ups:
 * A checkbox component built on Radix UI's Checkbox primitive with full
 * accessibility support, keyboard navigation, and custom styling.
 * Supports controlled and uncontrolled modes, indeterminate state,
 * and proper form integration.
 * 
 * Features:
 * - Full keyboard navigation (Space to toggle)
 * - Screen reader accessibility with proper ARIA attributes
 * - Controlled and uncontrolled modes
 * - Indeterminate state support (partially checked)
 * - Custom styling with focus and disabled states
 * - Integration with React Hook Form
 * - TypeScript support with proper prop inference
 * - Proper touch targets for mobile devices
 */

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * Visual variant of the checkbox
   * - default: Standard checkbox styling
   * - destructive: Red styling for delete/remove actions
   */
  variant?: 'default' | 'destructive'
  
  /**
   * Size of the checkbox
   * - default: Standard size (good for most uses)
   * - sm: Smaller size (for compact layouts)
   * - lg: Larger size (easier to click, good for accessibility)
   */
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Checkbox Component
 * 
 * @example
 * ```tsx
 * // Simple checkbox (like checking off a to-do item)
 * <Checkbox />
 * 
 * // Checkbox with label (so you know what it's for)
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="agree" />
 *   <Label htmlFor="agree">I agree to the terms</Label>
 * </div>
 * 
 * // Controlled checkbox (where code controls if it's checked)
 * const [checked, setChecked] = React.useState(false)
 * <Checkbox 
 *   checked={checked} 
 *   onCheckedChange={setChecked}
 * />
 * 
 * // Different sizes
 * <Checkbox size="sm" />  {/* Small checkbox */}
 * <Checkbox size="lg" />  {/* Large checkbox */}
 * 
 * // Different styles
 * <Checkbox variant="destructive" />  {/* Red checkbox for dangerous actions */}
 * 
 * // Disabled checkbox (can't be clicked)
 * <Checkbox disabled />
 * 
 * // Indeterminate checkbox (partially checked - like some items in a group are selected)
 * <Checkbox checked="indeterminate" />
 * 
 * // Using with forms for daycare activities
 * <FormField
 *   control={form.control}
 *   name="activities"
 *   render={({ field }) => (
 *     <FormItem>
 *       <div className="space-y-3">
 *         <FormLabel>Select Activities (choose all that interest you)</FormLabel>
 *         
 *         <div className="space-y-2">
 *           {[
 *             { id: "art", label: "🎨 Arts & Crafts" },
 *             { id: "music", label: "🎵 Music Time" },
 *             { id: "outdoor", label: "🌳 Outdoor Play" },
 *             { id: "reading", label: "📚 Story Time" },
 *             { id: "science", label: "🔬 Science Experiments" },
 *           ].map((activity) => (
 *             <div key={activity.id} className="flex items-center space-x-2">
 *               <Checkbox
 *                 id={activity.id}
 *                 checked={field.value?.includes(activity.id)}
 *                 onCheckedChange={(checked) => {
 *                   const updatedValue = checked
 *                     ? [...(field.value || []), activity.id]
 *                     : field.value?.filter((value) => value !== activity.id)
 *                   field.onChange(updatedValue)
 *                 }}
 *               />
 *               <Label htmlFor={activity.id}>{activity.label}</Label>
 *             </div>
 *           ))}
 *         </div>
 *       </div>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * 
 * // Checkbox for permissions (like allowing photos)
 * <div className="space-y-4">
 *   <div className="flex items-start space-x-2">
 *     <Checkbox id="photos" />
 *     <div className="space-y-1">
 *       <Label htmlFor="photos">Photo Permission</Label>
 *       <p className="text-sm text-muted-foreground">
 *         I give permission for my child to be included in daycare photos
 *         and videos for educational and promotional purposes.
 *       </p>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const sizeStyles = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5"
  }

  const variantStyles = {
    default: "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    destructive: "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground"
  }

  const iconSizes = {
    sm: "h-2.5 w-2.5",
    default: "h-3.5 w-3.5", 
    lg: "h-4 w-4"
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        // Base styling
        "peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        // Size styling
        sizeStyles[size],
        // Variant styling
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className={iconSizes[size]} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }