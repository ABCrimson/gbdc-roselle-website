import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 💬 Dialog Components - Like a special pop-up window for important things!
 * 
 * What it does for kids:
 * A dialog is like when someone taps you on the shoulder to tell you something
 * really important! It's a special window that appears on top of everything else
 * to show you a message, ask you a question, or let you do something special.
 * When you're done, you can close it by clicking the X or clicking outside!
 * 
 * For grown-ups:
 * A comprehensive dialog component system built on Radix UI's Dialog primitive
 * with full accessibility features, keyboard navigation, and focus management.
 * Perfect for modals, confirmations, forms, and content overlays.
 * 
 * Features:
 * - Full keyboard navigation (Escape to close, Tab trapping)
 * - Screen reader accessibility with proper ARIA attributes
 * - Focus management (returns focus when closed)
 * - Click outside to close functionality
 * - Controlled and uncontrolled modes
 * - Custom styling with animations
 * - Portal rendering for proper z-index stacking
 * - Backdrop overlay with blur effect
 */

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

/**
 * DialogOverlay Component
 * 
 * The dark background that appears behind the dialog
 * Like a curtain that dims everything else to help you focus!
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // Base overlay styling - dark semi-transparent background
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
      // Animations when opening/closing
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * DialogContent Component
 * 
 * The main dialog box that contains all the content
 * Like the actual speech bubble or message box!
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Base content styling - the actual dialog box
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
        // Mobile responsiveness
        "sm:rounded-lg",
        // Animations when opening/closing
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * DialogHeader Component
 * 
 * The top part of the dialog where the title and description go
 * Like the header of a letter that tells you what it's about!
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * DialogFooter Component
 * 
 * The bottom part of the dialog where buttons usually go
 * Like the bottom of a form where you click "OK" or "Cancel"!
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

/**
 * DialogTitle Component
 * 
 * The main title or headline of the dialog
 * Like the subject line that tells you what the dialog is about!
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * DialogDescription Component
 * 
 * Additional text that explains more about the dialog
 * Like a subtitle that gives you more details!
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic dialog with a button to open it
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="outline">Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Are you absolutely sure?</DialogTitle>
 *       <DialogDescription>
 *         This action cannot be undone. This will permanently delete your account.
 *       </DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DialogClose>
 *       <Button variant="destructive">Delete Account</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * 
 * // Daycare enrollment confirmation dialog
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>📝 Enroll Child</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>🎉 Enroll Your Child</DialogTitle>
 *       <DialogDescription>
 *         We're excited to welcome your little one to Golden Bear Daycare! 
 *         Please confirm the details below.
 *       </DialogDescription>
 *     </DialogHeader>
 *     
 *     <div className="space-y-4">
 *       <div className="grid grid-cols-2 gap-4">
 *         <div>
 *           <Label className="text-sm font-medium">Child's Name</Label>
 *           <p className="text-sm text-muted-foreground">Emma Johnson</p>
 *         </div>
 *         <div>
 *           <Label className="text-sm font-medium">Age Group</Label>
 *           <p className="text-sm text-muted-foreground">3-4 years</p>
 *         </div>
 *       </div>
 *       <div>
 *         <Label className="text-sm font-medium">Program</Label>
 *         <p className="text-sm text-muted-foreground">Full Day Program (7 AM - 6 PM)</p>
 *       </div>
 *     </div>
 *     
 *     <DialogFooter>
 *       <DialogClose asChild>
 *         <Button variant="outline">Review Details</Button>
 *       </DialogClose>
 *       <Button>Confirm Enrollment</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * 
 * // Photo gallery dialog
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="ghost" className="h-auto p-0">
 *       <img src="/classroom-photo.jpg" alt="Classroom activity" className="rounded-lg" />
 *     </Button>
 *   </DialogTrigger>
 *   <DialogContent className="max-w-4xl">
 *     <DialogHeader>
 *       <DialogTitle>🎨 Art Time - March 15, 2024</DialogTitle>
 *       <DialogDescription>
 *         The children had a wonderful time creating colorful masterpieces today!
 *       </DialogDescription>
 *     </DialogHeader>
 *     
 *     <div className="space-y-4">
 *       <img src="/classroom-photo-full.jpg" alt="Full classroom photo" className="w-full rounded-lg" />
 *       <p className="text-sm text-muted-foreground">
 *         Today's art session focused on finger painting and exploring different textures. 
 *         Each child created their own unique artwork to take home!
 *       </p>
 *     </div>
 *   </DialogContent>
 * </Dialog>
 * 
 * // Settings dialog
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="outline">⚙️ Settings</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Communication Preferences</DialogTitle>
 *       <DialogDescription>
 *         Choose how you'd like to receive updates about your child.
 *       </DialogDescription>
 *     </DialogHeader>
 *     
 *     <div className="space-y-4">
 *       <div className="flex items-center justify-between">
 *         <div className="space-y-0.5">
 *           <Label className="text-sm font-medium">Daily Reports</Label>
 *           <p className="text-xs text-muted-foreground">
 *             Get a summary of your child's day
 *           </p>
 *         </div>
 *         <Switch />
 *       </div>
 *       
 *       <div className="flex items-center justify-between">
 *         <div className="space-y-0.5">
 *           <Label className="text-sm font-medium">Photo Sharing</Label>
 *           <p className="text-xs text-muted-foreground">
 *             Receive photos from activities
 *           </p>
 *         </div>
 *         <Switch />
 *       </div>
 *     </div>
 *     
 *     <DialogFooter>
 *       <DialogClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DialogClose>
 *       <Button>Save Preferences</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}