import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 🍞 Toast Components - Like little pop-up messages that appear and disappear!
 * 
 * What it does for kids:
 * A toast is like getting a little note that pops up to tell you something
 * important and then disappears on its own! It's like when someone taps you
 * on the shoulder to say "Great job!" and then walks away. These messages
 * can tell you when something worked, when there's a problem, or give you
 * helpful information!
 * 
 * For grown-ups:
 * A toast notification system built on Radix UI's Toast primitive with
 * full accessibility support and customizable styling. Perfect for showing
 * temporary feedback, success messages, errors, and other notifications.
 * 
 * Features:
 * - Auto-dismiss with configurable duration
 * - Manual dismiss with close button
 * - Multiple variants (default, destructive, success)
 * - Screen reader accessibility with proper ARIA attributes
 * - Keyboard navigation (Escape to dismiss)
 * - Queue management for multiple toasts
 * - Smooth animations and positioning
 * - Action buttons support
 * - Swipe to dismiss on touch devices
 */

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      // Positioning - toasts appear in top right corner
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  // Base toast styling
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive border-destructive bg-destructive text-destructive-foreground",
        success:
          "border-green-500 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      // Action button styling
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      // Close button styling
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

/**
 * Example Usage:
 * 
 * First, set up the ToastProvider in your root component:
 * 
 * ```tsx
 * // In your root layout or _app.tsx
 * import { Toaster } from "@/components/ui/toaster"
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 * 
 * Then use the useToast hook in your components:
 * 
 * ```tsx
 * import { useToast } from "@/components/ui/use-toast"
 * 
 * function MyComponent() {
 *   const { toast } = useToast()
 * 
 *   return (
 *     <div>
 *       {/* Success message (like "Great job!" sticker) */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "🎉 Success!",
 *             description: "Your child has been enrolled successfully!",
 *             variant: "success",
 *           })
 *         }}
 *       >
 *         Enroll Child
 *       </Button>
 * 
 *       {/* Error message (like "Oops, something went wrong") */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "❌ Error",
 *             description: "Something went wrong. Please try again.",
 *             variant: "destructive",
 *           })
 *         }}
 *       >
 *         Delete Account
 *       </Button>
 * 
 *       {/* Info message (like a helpful reminder) */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "💡 Reminder",
 *             description: "Don't forget to pack Emma's lunch tomorrow!",
 *           })
 *         }}
 *       >
 *         Set Reminder
 *       </Button>
 * 
 *       {/* Toast with action button */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "📸 New Photos Available!",
 *             description: "Emma's art class photos from today are ready to view.",
 *             action: (
 *               <ToastAction altText="View photos">
 *                 View Photos
 *               </ToastAction>
 *             ),
 *           })
 *         }}
 *       >
 *         Upload Photos
 *       </Button>
 * 
 *       {/* Daycare-specific examples */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "🚐 Pickup Reminder",
 *             description: "Emma will be ready for pickup at 5:30 PM today.",
 *             action: (
 *               <ToastAction altText="Set alarm">
 *                 Set Alarm
 *               </ToastAction>
 *             ),
 *           })
 *         }}
 *       >
 *         Schedule Pickup
 *       </Button>
 * 
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "🍎 Meal Update",
 *             description: "Emma ate all her lunch and asked for seconds!",
 *             variant: "success",
 *           })
 *         }}
 *       >
 *         Report Meal
 *       </Button>
 * 
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "⚠️ Weather Alert",
 *             description: "Outdoor play may be cancelled due to rain. We'll keep you updated!",
 *             action: (
 *               <ToastAction altText="View weather">
 *                 Check Weather
 *               </ToastAction>
 *             ),
 *           })
 *         }}
 *       >
 *         Check Weather
 *       </Button>
 * 
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "💤 Nap Time Update",
 *             description: "Emma is sleeping peacefully and should wake up around 2:30 PM.",
 *           })
 *         }}
 *       >
 *         Nap Report
 *       </Button>
 * 
 *       {/* Form submission feedback */}
 *       <Button
 *         onClick={() => {
 *           toast({
 *             title: "📝 Form Saved",
 *             description: "Your enrollment information has been saved as a draft.",
 *             action: (
 *               <ToastAction altText="Continue editing">
 *                 Continue
 *               </ToastAction>
 *             ),
 *           })
 *         }}
 *       >
 *         Save Draft
 *       </Button>
 *     </div>
 *   )
 * }
 * ```
 */

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}