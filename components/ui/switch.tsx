import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * 🔄 Switch Component - Like a light switch you can flip on and off!
 * 
 * What it does for kids:
 * A switch is just like the light switches in your house! You can flip it
 * to turn something ON (the switch slides to one side and changes color)
 * or flip it again to turn it OFF (the switch slides back and becomes gray).
 * It's perfect for things that can be either on or off, like notifications
 * or special features!
 * 
 * For grown-ups:
 * A switch component built on Radix UI's Switch primitive with smooth
 * animations and accessibility features. Perfect for boolean settings
 * and toggle states with visual feedback.
 * 
 * Features:
 * - Smooth sliding animation with visual feedback
 * - Full keyboard navigation (Space, Enter to toggle)
 * - Screen reader accessibility with proper ARIA attributes
 * - Controlled and uncontrolled modes
 * - Custom styling with focus and disabled states
 * - Integration with React Hook Form
 * - Different sizes for various use cases
 * - TypeScript support with proper prop inference
 */

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /**
   * Size of the switch
   * - default: Standard size (good for most settings)
   * - sm: Smaller size (for compact layouts)
   * - lg: Larger size (easier to interact with)
   */
  size?: 'default' | 'sm' | 'lg'
  
  /**
   * Visual variant of the switch
   * - default: Standard blue/green when active
   * - destructive: Red when active (for dangerous settings)
   */
  variant?: 'default' | 'destructive'
}

/**
 * Switch Component
 * 
 * @example
 * ```tsx
 * // Simple switch (like turning notifications on/off)
 * <Switch />
 * 
 * // Switch with label
 * <div className="flex items-center space-x-2">
 *   <Switch id="notifications" />
 *   <Label htmlFor="notifications">Enable notifications</Label>
 * </div>
 * 
 * // Controlled switch (where code controls the state)
 * const [enabled, setEnabled] = React.useState(false)
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * 
 * // Different sizes
 * <Switch size="sm" />  {/* Small switch */}
 * <Switch size="lg" />  {/* Large switch */}
 * 
 * // Different variants
 * <Switch variant="destructive" />  {/* Red when active */}
 * 
 * // Disabled switch (can't be toggled)
 * <Switch disabled />
 * 
 * // Using with forms for daycare settings
 * <FormField
 *   control={form.control}
 *   name="photoPermission"
 *   render={({ field }) => (
 *     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
 *       <div className="space-y-0.5">
 *         <FormLabel className="text-base">
 *           📸 Photo Permission
 *         </FormLabel>
 *         <FormDescription>
 *           Allow us to include your child in daycare photos and videos
 *         </FormDescription>
 *       </div>
 *       <FormControl>
 *         <Switch
 *           checked={field.value}
 *           onCheckedChange={field.onChange}
 *         />
 *       </FormControl>
 *     </FormItem>
 *   )}
 * />
 * 
 * // Multiple settings with switches
 * <div className="space-y-4">
 *   <div className="flex items-center justify-between">
 *     <div className="space-y-0.5">
 *       <Label className="text-base">🔔 Email Notifications</Label>
 *       <p className="text-sm text-muted-foreground">
 *         Receive updates about your child's activities
 *       </p>
 *     </div>
 *     <Switch />
 *   </div>
 *   
 *   <div className="flex items-center justify-between">
 *     <div className="space-y-0.5">
 *       <Label className="text-base">📱 SMS Updates</Label>
 *       <p className="text-sm text-muted-foreground">
 *         Get text messages for important updates
 *       </p>
 *     </div>
 *     <Switch />
 *   </div>
 *   
 *   <div className="flex items-center justify-between">
 *     <div className="space-y-0.5">
 *       <Label className="text-base">🚨 Emergency Alerts</Label>
 *       <p className="text-sm text-muted-foreground">
 *         Immediate notifications for urgent matters
 *       </p>
 *     </div>
 *     <Switch variant="destructive" />
 *   </div>
 * </div>
 * 
 * // Settings panel for daycare preferences
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Communication Preferences</CardTitle>
 *     <CardDescription>
 *       Choose how you'd like to receive updates about your child
 *     </CardDescription>
 *   </CardHeader>
 *   <CardContent className="space-y-6">
 *     <div className="flex items-center justify-between">
 *       <div className="space-y-0.5">
 *         <Label className="text-sm font-medium">Daily Reports</Label>
 *         <p className="text-xs text-muted-foreground">
 *           Get a summary of your child's day
 *         </p>
 *       </div>
 *       <Switch size="sm" />
 *     </div>
 *     
 *     <div className="flex items-center justify-between">
 *       <div className="space-y-0.5">
 *         <Label className="text-sm font-medium">Activity Photos</Label>
 *         <p className="text-xs text-muted-foreground">
 *           Receive photos from daily activities
 *         </p>
 *       </div>
 *       <Switch size="sm" />
 *     </div>
 *   </CardContent>
 * </Card>
 * ```
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "default", variant = "default", ...props }, ref) => {
  const sizeStyles = {
    sm: "h-4 w-7",
    default: "h-5 w-9", 
    lg: "h-6 w-11"
  }

  const thumbSizes = {
    sm: "h-3 w-3 data-[state=checked]:translate-x-3",
    default: "h-4 w-4 data-[state=checked]:translate-x-4",
    lg: "h-5 w-5 data-[state=checked]:translate-x-5"
  }

  const variantStyles = {
    default: "data-[state=checked]:bg-primary",
    destructive: "data-[state=checked]:bg-destructive"
  }

  return (
    <SwitchPrimitive.Root
      className={cn(
        // Base styling
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        // Default state (off/unchecked)
        "bg-input",
        // Size styling
        sizeStyles[size],
        // Variant styling (active state)
        variantStyles[variant],
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          // Base thumb styling
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
          // Size-specific thumb styling and movement
          thumbSizes[size]
        )}
      />
    </SwitchPrimitive.Root>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }