import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * ⭕ Radio Group Components - Like choosing one favorite from a group!
 * 
 * What it does for kids:
 * Radio buttons are like having a group of circles where you can only pick
 * ONE favorite at a time! It's like when a teacher asks "What's your favorite
 * ice cream flavor?" and you can only choose one - vanilla, chocolate, or
 * strawberry. When you pick one, all the others become unselected.
 * 
 * For grown-ups:
 * A radio group component built on Radix UI's RadioGroup primitive with
 * full accessibility support and keyboard navigation. Enforces single
 * selection within a group and provides proper form integration.
 * 
 * Features:
 * - Mutually exclusive selection (only one can be selected)
 * - Full keyboard navigation (arrow keys, tab, space)
 * - Screen reader accessibility with proper ARIA attributes
 * - Controlled and uncontrolled modes
 * - Custom styling with focus and disabled states
 * - Integration with React Hook Form
 * - TypeScript support with proper prop inference
 * - Proper grouping semantics for screen readers
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /**
   * Size of the radio button
   * - default: Standard size (good for most uses)
   * - sm: Smaller size (for compact layouts)
   * - lg: Larger size (easier to click, good for accessibility)
   */
  size?: 'default' | 'sm' | 'lg'
  
  /**
   * Visual variant of the radio button
   * - default: Standard radio button styling
   * - card: Radio button styled as a selectable card
   */
  variant?: 'default' | 'card'
}

/**
 * RadioGroupItem Component
 * 
 * Individual radio button within the group
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size = "default", variant = "default", ...props }, ref) => {
  const sizeStyles = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5"
  }

  const indicatorSizes = {
    sm: "h-1.5 w-1.5",
    default: "h-2.5 w-2.5",
    lg: "h-3 w-3"
  }

  const baseStyles = variant === "card" 
    ? "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    : cn(
        "aspect-square rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeStyles[size]
      )

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn("fill-current text-current", indicatorSizes[size])} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic radio group for choosing one option
 * <RadioGroup defaultValue="comfortable">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="default" id="r1" />
 *     <Label htmlFor="r1">Default</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="comfortable" id="r2" />
 *     <Label htmlFor="r2">Comfortable</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="compact" id="r3" />
 *     <Label htmlFor="r3">Compact</Label>
 *   </div>
 * </RadioGroup>
 * 
 * // Radio group for daycare meal preferences
 * <RadioGroup>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="regular" id="meal-regular" />
 *     <Label htmlFor="meal-regular">🍎 Regular Menu</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="vegetarian" id="meal-vegetarian" />
 *     <Label htmlFor="meal-vegetarian">🥕 Vegetarian</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="allergies" id="meal-allergies" />
 *     <Label htmlFor="meal-allergies">⚠️ Special Dietary Needs</Label>
 *   </div>
 * </RadioGroup>
 * 
 * // Different sizes
 * <RadioGroup>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="small" id="size-sm" size="sm" />
 *     <Label htmlFor="size-sm">Small radio button</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="large" id="size-lg" size="lg" />
 *     <Label htmlFor="size-lg">Large radio button</Label>
 *   </div>
 * </RadioGroup>
 * 
 * // Using with forms for pickup person
 * <FormField
 *   control={form.control}
 *   name="pickupPerson"
 *   render={({ field }) => (
 *     <FormItem className="space-y-3">
 *       <FormLabel>Who will pick up your child today?</FormLabel>
 *       <FormControl>
 *         <RadioGroup
 *           onValueChange={field.onChange}
 *           defaultValue={field.value}
 *           className="flex flex-col space-y-1"
 *         >
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="parent1" id="pickup-parent1" />
 *             <Label htmlFor="pickup-parent1">👨‍💼 Parent/Guardian 1</Label>
 *           </div>
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="parent2" id="pickup-parent2" />
 *             <Label htmlFor="pickup-parent2">👩‍💼 Parent/Guardian 2</Label>
 *           </div>
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="emergency" id="pickup-emergency" />
 *             <Label htmlFor="pickup-emergency">👥 Emergency Contact</Label>
 *           </div>
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="other" id="pickup-other" />
 *             <Label htmlFor="pickup-other">🤝 Other Authorized Person</Label>
 *           </div>
 *         </RadioGroup>
 *       </FormControl>
 *       <FormDescription>
 *         Please let us know who will be picking up your child so we can ensure their safety.
 *       </FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * 
 * // Card-style radio group for selecting programs
 * <RadioGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
 *   <div className="flex items-center space-x-2 rounded-lg border border-input p-4 hover:bg-accent">
 *     <RadioGroupItem value="half-day" id="program-half" />
 *     <div className="flex-1">
 *       <Label htmlFor="program-half" className="text-base font-medium">
 *         🌅 Half Day Program
 *       </Label>
 *       <p className="text-sm text-muted-foreground">
 *         8:00 AM - 12:00 PM
 *       </p>
 *     </div>
 *   </div>
 *   <div className="flex items-center space-x-2 rounded-lg border border-input p-4 hover:bg-accent">
 *     <RadioGroupItem value="full-day" id="program-full" />
 *     <div className="flex-1">
 *       <Label htmlFor="program-full" className="text-base font-medium">
 *         ☀️ Full Day Program
 *       </Label>
 *       <p className="text-sm text-muted-foreground">
 *         7:00 AM - 6:00 PM
 *       </p>
 *     </div>
 *   </div>
 *   <div className="flex items-center space-x-2 rounded-lg border border-input p-4 hover:bg-accent">
 *     <RadioGroupItem value="extended" id="program-extended" />
 *     <div className="flex-1">
 *       <Label htmlFor="program-extended" className="text-base font-medium">
 *         🌙 Extended Care
 *       </Label>
 *       <p className="text-sm text-muted-foreground">
 *         6:00 AM - 7:00 PM
 *       </p>
 *     </div>
 *   </div>
 * </RadioGroup>
 * ```
 */

export { RadioGroup, RadioGroupItem }