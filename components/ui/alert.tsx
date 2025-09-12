import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * ⚠️ Alert Components - Like important announcement boxes that stay put!
 * 
 * What it does for kids:
 * An alert is like a special announcement box that stays on the page to tell
 * you something important! It's different from toast messages because it doesn't
 * disappear on its own - it stays there until you're done reading it. It's like
 * having a colorful sticky note that says "Pay attention to this!" and it can
 * be different colors depending on how important the message is.
 * 
 * For grown-ups:
 * Alert components are used for displaying important information that requires
 * user attention. Unlike toasts, alerts are static and persistent until dismissed.
 * Perfect for warnings, errors, informational messages, and success confirmations
 * that need to remain visible.
 * 
 * Features:
 * - Multiple variants (default, destructive, warning, success)
 * - Semantic HTML with proper ARIA roles
 * - Screen reader accessibility
 * - Icon support for visual hierarchy
 * - Title and description composition
 * - Customizable styling
 * - Responsive design
 * - Integration with design system colors
 */

const alertVariants = cva(
  // Base alert styling
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:border-yellow-500 dark:bg-yellow-950 dark:text-yellow-50 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        success:
          "border-green-500/50 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-50 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info:
          "border-blue-500/50 bg-blue-50 text-blue-900 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-50 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

/**
 * Example Usage:
 * 
 * ```tsx
 * import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
 * import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"
 * 
 * // Basic info alert (like a helpful tip)
 * <Alert>
 *   <Info className="h-4 w-4" />
 *   <AlertTitle>💡 Helpful Tip</AlertTitle>
 *   <AlertDescription>
 *     Remember to pack Emma's favorite blanket for nap time!
 *   </AlertDescription>
 * </Alert>
 * 
 * // Success alert (like "Mission accomplished!")
 * <Alert variant="success">
 *   <CheckCircle className="h-4 w-4" />
 *   <AlertTitle>🎉 Success!</AlertTitle>
 *   <AlertDescription>
 *     Your child has been successfully enrolled in our program!
 *   </AlertDescription>
 * </Alert>
 * 
 * // Warning alert (like "Be careful!")
 * <Alert variant="warning">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>⚠️ Important Notice</AlertTitle>
 *   <AlertDescription>
 *     The playground will be closed for maintenance from 2-3 PM today.
 *     Indoor activities will be provided during this time.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Error alert (like "Oops, something went wrong!")
 * <Alert variant="destructive">
 *   <XCircle className="h-4 w-4" />
 *   <AlertTitle>❌ Error</AlertTitle>
 *   <AlertDescription>
 *     Unable to submit enrollment form. Please check your information and try again.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Daycare-specific examples
 * 
 * // Weather alert
 * <Alert variant="warning">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>🌧️ Weather Update</AlertTitle>
 *   <AlertDescription>
 *     Due to heavy rain, outdoor activities have been moved indoors. 
 *     Children will enjoy indoor obstacle courses and creative play instead!
 *   </AlertDescription>
 * </Alert>
 * 
 * // Health and safety
 * <Alert variant="info">
 *   <Info className="h-4 w-4" />
 *   <AlertTitle>🏥 Health Reminder</AlertTitle>
 *   <AlertDescription>
 *     Please ensure your child's immunization records are up to date. 
 *     Contact our office if you need assistance with documentation.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Pick-up instructions
 * <Alert variant="success">
 *   <CheckCircle className="h-4 w-4" />
 *   <AlertTitle>🚐 Pick-up Confirmation</AlertTitle>
 *   <AlertDescription>
 *     Emma will be ready for pick-up at Door B at 5:30 PM. 
 *     Please bring your ID for verification.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Emergency alert
 * <Alert variant="destructive">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>🚨 Emergency Information</AlertTitle>
 *   <AlertDescription>
 *     Please update your emergency contact information in your parent portal. 
 *     Current information is required for your child's safety.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Event announcement
 * <Alert>
 *   <Info className="h-4 w-4" />
 *   <AlertTitle>🎪 Special Event</AlertTitle>
 *   <AlertDescription>
 *     Join us for our Spring Festival on Friday, April 15th at 10 AM! 
 *     There will be games, crafts, and snacks for everyone to enjoy.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Form validation errors
 * <Alert variant="destructive">
 *   <XCircle className="h-4 w-4" />
 *   <AlertTitle>📝 Form Incomplete</AlertTitle>
 *   <AlertDescription>
 *     <p>Please complete the following required fields:</p>
 *     <ul className="mt-2 list-disc list-inside">
 *       <li>Child's emergency contact</li>
 *       <li>Medical information</li>
 *       <li>Parent signature</li>
 *     </ul>
 *   </AlertDescription>
 * </Alert>
 * 
 * // Multiple alerts in a form
 * <div className="space-y-4">
 *   <Alert variant="info">
 *     <Info className="h-4 w-4" />
 *     <AlertTitle>📋 Enrollment Process</AlertTitle>
 *     <AlertDescription>
 *       Complete all sections to finalize your child's enrollment. 
 *       You can save and return to this form at any time.
 *     </AlertDescription>
 *   </Alert>
 *   
 *   <Alert variant="warning">
 *     <AlertTriangle className="h-4 w-4" />
 *     <AlertTitle>⏰ Limited Spots Available</AlertTitle>
 *     <AlertDescription>
 *       Only 3 spots remaining in the 3-4 year old program. 
 *       Submit your application soon to secure your child's spot!
 *     </AlertDescription>
 *   </Alert>
 * </div>
 * 
 * // Alert without icon
 * <Alert variant="success">
 *   <AlertTitle>Welcome to Golden Bear Daycare! 🐻</AlertTitle>
 *   <AlertDescription>
 *     We're thrilled to have Emma join our Busy Bees class. 
 *     Her first day is scheduled for Monday, March 20th at 8:00 AM.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Compact alert (just description)
 * <Alert variant="info">
 *   <AlertDescription>
 *     📞 Need help? Call us at (555) 123-4567 or email support@goldenbear.com
 *   </AlertDescription>
 * </Alert>
 * 
 * // Alert with actions (using Button components)
 * <Alert variant="warning">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>📄 Documents Required</AlertTitle>
 *   <AlertDescription className="mb-3">
 *     Your child's immunization records are missing. 
 *     Please upload them to complete the enrollment process.
 *   </AlertDescription>
 *   <div className="flex gap-2">
 *     <Button size="sm" variant="outline">Upload Documents</Button>
 *     <Button size="sm" variant="ghost">Skip for Now</Button>
 *   </div>
 * </Alert>
 * ```
 */

export { Alert, AlertTitle, AlertDescription }