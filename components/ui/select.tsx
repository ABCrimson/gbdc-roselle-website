import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 📝 Select Components - Like a magic dropdown list to choose from!
 * 
 * What it does for kids:
 * A select is like having a special box that shows you a list of choices
 * when you click on it! It's like looking at a menu at a restaurant -
 * you click to see all the yummy options, then pick your favorite one.
 * The box then shows your choice and hides the other options until next time!
 * 
 * For grown-ups:
 * A comprehensive select component built on Radix UI's Select primitive
 * with full keyboard navigation, accessibility features, and custom styling.
 * Supports controlled and uncontrolled modes, custom content, and proper
 * form integration.
 * 
 * Features:
 * - Full keyboard navigation support
 * - Screen reader accessibility with proper ARIA attributes
 * - Controlled and uncontrolled modes
 * - Custom trigger and content styling
 * - Support for groups, separators, and labels
 * - Integration with React Hook Form
 * - TypeScript support with proper prop inference
 * - Mobile-friendly with proper touch targets
 */

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

/**
 * SelectTrigger Component
 * 
 * The button that you click to open the dropdown list
 * Like the handle on a toy box that you pull to see what's inside!
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styling - makes it look like a nice button
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
      // Placeholder text styling
      "placeholder:text-muted-foreground",
      // Focus state - glows when you click on it
      "focus:outline-none focus:ring-1 focus:ring-ring",
      // Disabled state - grayed out when you can't use it
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Make sure the dropdown icon doesn't interfere with clicks
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * SelectScrollUpButton Component
 * 
 * Arrow button that appears when there are more options above
 * Like an up arrow that says "there's more above!"
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * SelectScrollDownButton Component
 * 
 * Arrow button that appears when there are more options below  
 * Like a down arrow that says "there's more below!"
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/**
 * SelectContent Component
 * 
 * The dropdown list that appears when you click the trigger
 * Like opening a toy box to see all the toys inside!
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base styling for the dropdown
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        // Animation when opening/closing
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // Position-specific animations
        position === "popper" &&
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * SelectLabel Component
 * 
 * A label that groups related options together
 * Like having a sign that says "Favorite Colors" above color choices!
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * SelectItem Component
 * 
 * Each choice in the dropdown list
 * Like each toy in the toy box that you can pick!
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Base styling for each option
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
      // Hover/focus states - highlights when you point at it
      "focus:bg-accent focus:text-accent-foreground",
      // Disabled state - grayed out when you can't pick it
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * SelectSeparator Component
 * 
 * A line that separates different groups of options
 * Like drawing a line between different types of toys!
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic select for choosing favorite colors
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Pick your favorite color" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="red">❤️ Red</SelectItem>
 *     <SelectItem value="blue">💙 Blue</SelectItem>
 *     <SelectItem value="green">💚 Green</SelectItem>
 *     <SelectItem value="yellow">💛 Yellow</SelectItem>
 *   </SelectContent>
 * </Select>
 * 
 * // Select with groups (like organizing toys by type)
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Choose your class" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectLabel>Toddlers (1-2 years)</SelectLabel>
 *     <SelectItem value="tiny-tots">Tiny Tots</SelectItem>
 *     <SelectItem value="little-explorers">Little Explorers</SelectItem>
 *     
 *     <SelectSeparator />
 *     
 *     <SelectLabel>Preschoolers (3-4 years)</SelectLabel>
 *     <SelectItem value="busy-bees">Busy Bees</SelectItem>
 *     <SelectItem value="curious-cubs">Curious Cubs</SelectItem>
 *     
 *     <SelectSeparator />
 *     
 *     <SelectLabel>Pre-K (4-5 years)</SelectLabel>
 *     <SelectItem value="future-leaders">Future Leaders</SelectItem>
 *   </SelectContent>
 * </Select>
 * 
 * // Using with forms (React Hook Form)
 * <FormField
 *   control={form.control}
 *   name="childAge"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Child's Age Group</FormLabel>
 *       <Select onValueChange={field.onChange} defaultValue={field.value}>
 *         <FormControl>
 *           <SelectTrigger>
 *             <SelectValue placeholder="Select age group" />
 *           </SelectTrigger>
 *         </FormControl>
 *         <SelectContent>
 *           <SelectItem value="1-2">1-2 years (Toddlers)</SelectItem>
 *           <SelectItem value="2-3">2-3 years (Toddlers)</SelectItem>
 *           <SelectItem value="3-4">3-4 years (Preschool)</SelectItem>
 *           <SelectItem value="4-5">4-5 years (Pre-K)</SelectItem>
 *         </SelectContent>
 *       </Select>
 *       <FormDescription>
 *         This helps us place your child in the right class
 *       </FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}