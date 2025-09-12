import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  Check,
  ChevronRight,
  Circle,
} from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 📋 Dropdown Menu Components - Like a magic box that opens to show you choices!
 * 
 * What it does for kids:
 * A dropdown menu is like having a special button that when you click it,
 * a list of choices magically appears below it! It's like having a toy box
 * that when you open it, shows you all the different toys you can choose from.
 * You can click on one choice and the box closes, or click somewhere else
 * to make it go away without choosing anything!
 * 
 * For grown-ups:
 * Dropdown menu components built on Radix UI's DropdownMenu primitive with
 * full keyboard navigation, accessibility features, and rich content support.
 * Perfect for user menus, action menus, context menus, and settings panels.
 * 
 * Features:
 * - Full keyboard navigation (arrow keys, tab, enter, escape)
 * - Screen reader accessibility with proper ARIA attributes
 * - Click outside to close functionality
 * - Support for sub-menus and nested content
 * - Checkboxes and radio buttons within menus
 * - Custom positioning and animations
 * - Separator and label support
 * - Icon integration
 * - Portal rendering for proper z-index stacking
 */

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

/**
 * Example Usage:
 * 
 * ```tsx
 * import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
 * 
 * // Basic user menu dropdown
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">👤 My Account</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       👤 Profile Settings
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       👶 My Children
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📋 Daily Reports
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📞 Contact Info
 *     </DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       🚪 Sign Out
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Student actions menu
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost" className="h-8 w-8 p-0">
 *       <MoreHorizontal className="h-4 w-4" />
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="end">
 *     <DropdownMenuLabel>Actions for Emma</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       📋 View Daily Report
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📸 View Photos
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       💬 Send Message
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📅 Schedule Conference
 *     </DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem className="text-destructive">
 *       ⚠️ Report Concern
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Settings menu with checkboxes
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">⚙️ Notification Settings</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-56">
 *     <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuCheckboxItem checked>
 *       📧 Email Updates
 *     </DropdownMenuCheckboxItem>
 *     <DropdownMenuCheckboxItem>
 *       📱 SMS Alerts
 *     </DropdownMenuCheckboxItem>
 *     <DropdownMenuCheckboxItem checked>
 *       📸 Photo Notifications
 *     </DropdownMenuCheckboxItem>
 *     <DropdownMenuCheckboxItem>
 *       🚨 Emergency Only
 *     </DropdownMenuCheckboxItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Filter menu with radio buttons
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">🔍 Filter Students</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-56">
 *     <DropdownMenuLabel>Filter by Age Group</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuRadioGroup value="all">
 *       <DropdownMenuRadioItem value="all">
 *         👥 All Students
 *       </DropdownMenuRadioItem>
 *       <DropdownMenuRadioItem value="toddlers">
 *         🍼 Toddlers (1-2)
 *       </DropdownMenuRadioItem>
 *       <DropdownMenuRadioItem value="preschool">
 *         🎨 Preschool (3-4)
 *       </DropdownMenuRadioItem>
 *       <DropdownMenuRadioItem value="prek">
 *         📚 Pre-K (4-5)
 *       </DropdownMenuRadioItem>
 *     </DropdownMenuRadioGroup>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Sub-menu example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>📂 Quick Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-56">
 *     <DropdownMenuItem>
 *       📋 Today's Schedule
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📸 Recent Photos
 *     </DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuSub>
 *       <DropdownMenuSubTrigger>
 *         📊 Reports
 *       </DropdownMenuSubTrigger>
 *       <DropdownMenuSubContent>
 *         <DropdownMenuItem>
 *           📅 Daily Report
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           📈 Weekly Summary
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           📝 Monthly Progress
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           🎯 Learning Milestones
 *         </DropdownMenuItem>
 *       </DropdownMenuSubContent>
 *     </DropdownMenuSub>
 *     <DropdownMenuSub>
 *       <DropdownMenuSubTrigger>
 *         💬 Messages
 *       </DropdownMenuSubTrigger>
 *       <DropdownMenuSubContent>
 *         <DropdownMenuItem>
 *           ✉️ Send to Teacher
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           🏥 Medical Update
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           🚐 Pickup Change
 *         </DropdownMenuItem>
 *         <DropdownMenuItem>
 *           ❓ General Question
 *         </DropdownMenuItem>
 *       </DropdownMenuSubContent>
 *     </DropdownMenuSub>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Profile dropdown with user info
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost" className="relative h-8 w-8 rounded-full">
 *       <Avatar className="h-8 w-8">
 *         <img src="/parent-avatar.jpg" alt="Sarah Johnson" />
 *       </Avatar>
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-56" align="end" forceMount>
 *     <DropdownMenuLabel className="font-normal">
 *       <div className="flex flex-col space-y-1">
 *         <p className="text-sm font-medium leading-none">Sarah Johnson</p>
 *         <p className="text-xs leading-none text-muted-foreground">
 *           Parent of Emma & Liam
 *         </p>
 *       </div>
 *     </DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuGroup>
 *       <DropdownMenuItem>
 *         👤 Profile Settings
 *         <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
 *       </DropdownMenuItem>
 *       <DropdownMenuItem>
 *         💳 Billing & Payments
 *         <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
 *       </DropdownMenuItem>
 *       <DropdownMenuItem>
 *         ⚙️ Account Settings
 *         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
 *       </DropdownMenuItem>
 *     </DropdownMenuGroup>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       🚪 Log out
 *       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Class management dropdown for teachers
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">🐝 Busy Bees Class</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-56">
 *     <DropdownMenuLabel>Class Management</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       📋 Attendance Sheet
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📝 Activity Report
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📸 Upload Photos
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       💬 Send Class Update
 *     </DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>
 *       📊 Class Analytics
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       📅 Schedule Field Trip
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // Dropdown with complex content
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>🎯 Quick Enrollment</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="w-80">
 *     <DropdownMenuLabel>Available Programs</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <div className="p-2">
 *       <div className="grid gap-2">
 *         <div className="flex justify-between items-center p-2 rounded hover:bg-accent">
 *           <div>
 *             <p className="font-medium text-sm">🍼 Toddler Program</p>
 *             <p className="text-xs text-muted-foreground">Ages 1-2 • Full Day</p>
 *           </div>
 *           <Badge variant="destructive">Full</Badge>
 *         </div>
 *         <div className="flex justify-between items-center p-2 rounded hover:bg-accent cursor-pointer">
 *           <div>
 *             <p className="font-medium text-sm">🎨 Preschool Program</p>
 *             <p className="text-xs text-muted-foreground">Ages 3-4 • Half Day</p>
 *           </div>
 *           <Badge variant="success">2 spots</Badge>
 *         </div>
 *         <div className="flex justify-between items-center p-2 rounded hover:bg-accent cursor-pointer">
 *           <div>
 *             <p className="font-medium text-sm">📚 Pre-K Program</p>
 *             <p className="text-xs text-muted-foreground">Ages 4-5 • Full Day</p>
 *           </div>
 *           <Badge variant="success">Available</Badge>
 *         </div>
 *       </div>
 *       <div className="mt-3 pt-2 border-t">
 *         <Button className="w-full" size="sm">
 *           📝 Start Enrollment Process
 *         </Button>
 *       </div>
 *     </div>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}