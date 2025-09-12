import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 📄 Sheet Components - Like a sliding drawer that comes from the side!
 * 
 * What it does for kids:
 * A sheet is like having a special drawer that slides out from the side of
 * your screen! It's like when you pull open a drawer to see what's inside,
 * but on the computer. It can slide in from the left, right, top, or bottom
 * and shows you extra information or options without covering everything!
 * 
 * For grown-ups:
 * A sheet component system built on Radix UI's Dialog primitive, designed
 * for slide-in panels and drawers. Perfect for navigation menus, settings
 * panels, forms, and additional content that doesn't need full modal treatment.
 * 
 * Features:
 * - Slides in from any side (left, right, top, bottom)
 * - Full keyboard navigation and accessibility
 * - Focus management and escape key handling
 * - Multiple size variants for different content needs
 * - Backdrop overlay with click-outside-to-close
 * - Smooth animations and transitions
 * - Mobile-friendly with proper touch handling
 */

const Sheet = DialogPrimitive.Root

const SheetTrigger = DialogPrimitive.Trigger

const SheetClose = DialogPrimitive.Close

const SheetPortal = DialogPrimitive.Portal

/**
 * SheetOverlay Component
 * 
 * The background overlay that appears when the sheet is open
 * Like a see-through curtain that dims the rest of the screen!
 */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      // Base overlay styling
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
      // Animation when opening/closing
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      side: "right",
      size: "default",
    },
  }
)

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * SheetContent Component
 * 
 * The main sheet panel that slides in with content
 * Like the actual drawer that slides out to show you things!
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", size, className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side, size }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

/**
 * SheetHeader Component
 * 
 * The top section of the sheet with title and description
 * Like the header of a page that tells you what the drawer is about!
 */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

/**
 * SheetFooter Component
 * 
 * The bottom section of the sheet, usually for action buttons
 * Like the bottom of a form where you put "Save" and "Cancel" buttons!
 */
const SheetFooter = ({
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
SheetFooter.displayName = "SheetFooter"

/**
 * SheetTitle Component
 * 
 * The main title of the sheet
 * Like the name tag that tells you what the drawer contains!
 */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

/**
 * SheetDescription Component
 * 
 * Additional descriptive text for the sheet
 * Like a subtitle that explains more about what's in the drawer!
 */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic sheet that slides from the right
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="outline">Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>
 *         This is a description of what this sheet contains.
 *       </SheetDescription>
 *     </SheetHeader>
 *     <div className="py-4">
 *       <p>Sheet content goes here...</p>
 *     </div>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Mobile navigation menu
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="outline" size="icon" className="md:hidden">
 *       <Menu className="h-4 w-4" />
 *     </Button>
 *   </SheetTrigger>
 *   <SheetContent side="left">
 *     <SheetHeader>
 *       <SheetTitle>🐻 Golden Bear Daycare</SheetTitle>
 *       <SheetDescription>
 *         Where little ones learn and grow!
 *       </SheetDescription>
 *     </SheetHeader>
 *     <nav className="flex flex-col space-y-4 mt-4">
 *       <a href="/about" className="text-lg hover:text-primary">About Us</a>
 *       <a href="/programs" className="text-lg hover:text-primary">Programs</a>
 *       <a href="/activities" className="text-lg hover:text-primary">Activities</a>
 *       <a href="/contact" className="text-lg hover:text-primary">Contact</a>
 *       <a href="/enroll" className="text-lg hover:text-primary">Enroll Now</a>
 *     </nav>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Child profile sheet
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="ghost" className="justify-start">
 *       <Avatar className="h-8 w-8 mr-2">
 *         <img src="/emma-photo.jpg" alt="Emma" />
 *       </Avatar>
 *       Emma Johnson
 *     </Button>
 *   </SheetTrigger>
 *   <SheetContent size="lg">
 *     <SheetHeader>
 *       <SheetTitle>👧 Emma Johnson</SheetTitle>
 *       <SheetDescription>
 *         Age 4 • Busy Bees Class • Started: March 2024
 *       </SheetDescription>
 *     </SheetHeader>
 *     
 *     <div className="space-y-6 py-4">
 *       <div className="space-y-2">
 *         <Label className="text-sm font-medium">📋 Today's Activities</Label>
 *         <div className="space-y-1 text-sm text-muted-foreground">
 *           <p>✅ Circle Time - Participated well</p>
 *           <p>✅ Arts & Crafts - Made a beautiful painting</p>
 *           <p>✅ Outdoor Play - Played on swings</p>
 *           <p>⏳ Rest Time - Currently napping</p>
 *         </div>
 *       </div>
 *       
 *       <div className="space-y-2">
 *         <Label className="text-sm font-medium">🍎 Meals</Label>
 *         <div className="space-y-1 text-sm text-muted-foreground">
 *           <p>Breakfast: Ate well (8:30 AM)</p>
 *           <p>Snack: Apple slices and crackers (10:00 AM)</p>
 *           <p>Lunch: Coming up at 12:00 PM</p>
 *         </div>
 *       </div>
 *       
 *       <div className="space-y-2">
 *         <Label className="text-sm font-medium">📝 Notes</Label>
 *         <p className="text-sm text-muted-foreground">
 *           Emma was very engaged during story time today and helped 
 *           her friend with their puzzle. She's showing great social skills!
 *         </p>
 *       </div>
 *     </div>
 *     
 *     <SheetFooter>
 *       <Button variant="outline">Send Message</Button>
 *       <Button>View Full Report</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Settings panel from bottom
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="outline">⚙️ Settings</Button>
 *   </SheetTrigger>
 *   <SheetContent side="bottom" size="full" className="h-[80vh]">
 *     <SheetHeader>
 *       <SheetTitle>Account Settings</SheetTitle>
 *       <SheetDescription>
 *         Manage your preferences and communication settings
 *       </SheetDescription>
 *     </SheetHeader>
 *     
 *     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
 *       <div className="space-y-4">
 *         <h3 className="font-medium">Notifications</h3>
 *         <div className="space-y-3">
 *           <div className="flex items-center justify-between">
 *             <Label>Daily Reports</Label>
 *             <Switch />
 *           </div>
 *           <div className="flex items-center justify-between">
 *             <Label>Photo Updates</Label>
 *             <Switch />
 *           </div>
 *         </div>
 *       </div>
 *       
 *       <div className="space-y-4">
 *         <h3 className="font-medium">Contact Information</h3>
 *         <div className="space-y-3">
 *           <Input placeholder="Primary Phone" />
 *           <Input placeholder="Email Address" />
 *         </div>
 *       </div>
 *     </div>
 *     
 *     <SheetFooter>
 *       <SheetClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </SheetClose>
 *       <Button>Save Changes</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Different slide directions
 * <div className="flex gap-2">
 *   <Sheet>
 *     <SheetTrigger asChild><Button>From Left</Button></SheetTrigger>
 *     <SheetContent side="left">Content slides from left</SheetContent>
 *   </Sheet>
 *   
 *   <Sheet>
 *     <SheetTrigger asChild><Button>From Right</Button></SheetTrigger>
 *     <SheetContent side="right">Content slides from right</SheetContent>
 *   </Sheet>
 *   
 *   <Sheet>
 *     <SheetTrigger asChild><Button>From Top</Button></SheetTrigger>
 *     <SheetContent side="top">Content slides from top</SheetContent>
 *   </Sheet>
 *   
 *   <Sheet>
 *     <SheetTrigger asChild><Button>From Bottom</Button></SheetTrigger>
 *     <SheetContent side="bottom">Content slides from bottom</SheetContent>
 *   </Sheet>
 * </div>
 * ```
 */

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}