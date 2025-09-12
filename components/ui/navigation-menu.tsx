import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 🧭 Navigation Menu Components - Like a smart menu that shows you where to go!
 * 
 * What it does for kids:
 * A navigation menu is like having a helpful map at the entrance of a big building
 * that shows you where everything is! It's like the signs at a zoo that tell you
 * where to find the elephants, lions, and gift shop. When you hover over or click
 * on different parts, it can show you even more choices, just like opening a
 * folder to see what's inside!
 * 
 * For grown-ups:
 * Navigation Menu components built on Radix UI's NavigationMenu primitive with
 * full keyboard navigation, accessibility features, and hover/focus interactions.
 * Perfect for main site navigation, complex menu structures, and responsive
 * navigation patterns.
 * 
 * Features:
 * - Full keyboard navigation (arrow keys, tab, enter, escape)
 * - Screen reader accessibility with proper ARIA attributes
 * - Hover and focus interactions
 * - Smooth animations and transitions
 * - Responsive design with mobile-friendly patterns
 * - Support for nested menus and content
 * - Customizable styling and positioning
 * - Auto-positioning to stay in viewport
 */

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  />
))
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
 * 
 * // Basic navigation menu for daycare website
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/">
 *         🏠 Home
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>📚 Programs</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
 *           <div className="row-span-3">
 *             <NavigationMenuLink asChild>
 *               <a href="/programs" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
 *                 <div className="mb-2 mt-4 text-lg font-medium">
 *                   🌟 Our Programs
 *                 </div>
 *                 <p className="text-sm leading-tight text-muted-foreground">
 *                   Age-appropriate learning experiences designed to help your child grow and thrive.
 *                 </p>
 *               </a>
 *             </NavigationMenuLink>
 *           </div>
 *           <div className="grid grid-cols-2 gap-3">
 *             <NavigationMenuLink asChild>
 *               <a href="/programs/toddlers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-sm font-medium leading-none">🍼 Toddlers (1-2)</div>
 *                 <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
 *                   Nurturing care for our youngest learners
 *                 </p>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/programs/preschool" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-sm font-medium leading-none">🎨 Preschool (3-4)</div>
 *                 <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
 *                   Creative learning through play
 *                 </p>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/programs/prek" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-sm font-medium leading-none">📚 Pre-K (4-5)</div>
 *                 <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
 *                   School readiness preparation
 *                 </p>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/programs/afterschool" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-sm font-medium leading-none">⚡ After School</div>
 *                 <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
 *                   Fun activities after school hours
 *                 </p>
 *               </a>
 *             </NavigationMenuLink>
 *           </div>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>🎯 Activities</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
 *           {[
 *             { title: "🎨 Arts & Crafts", href: "/activities/arts", description: "Creative expression through various art mediums" },
 *             { title: "🎵 Music & Movement", href: "/activities/music", description: "Songs, dancing, and musical instrument exploration" },
 *             { title: "🌳 Outdoor Adventures", href: "/activities/outdoor", description: "Nature exploration and physical activities" },
 *             { title: "🔬 Science Discovery", href: "/activities/science", description: "Hands-on experiments and STEM learning" },
 *             { title: "📚 Reading Corner", href: "/activities/reading", description: "Story time and early literacy development" },
 *             { title: "🧩 Learning Games", href: "/activities/games", description: "Educational games and problem-solving activities" },
 *           ].map((activity) => (
 *             <li key={activity.title}>
 *               <NavigationMenuLink asChild>
 *                 <a href={activity.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                   <div className="text-sm font-medium leading-none">{activity.title}</div>
 *                   <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
 *                     {activity.description}
 *                   </p>
 *                 </a>
 *               </NavigationMenuLink>
 *             </li>
 *           ))}
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>👪 For Parents</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <div className="grid gap-3 p-6 md:w-[400px]">
 *           <div className="grid grid-cols-1 gap-3">
 *             <NavigationMenuLink asChild>
 *               <a href="/parent-portal" className="flex select-none items-center space-x-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-2xl">🔐</div>
 *                 <div>
 *                   <div className="text-sm font-medium leading-none">Parent Portal</div>
 *                   <p className="text-sm leading-snug text-muted-foreground">
 *                     Access your child's daily reports and photos
 *                   </p>
 *                 </div>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/resources" className="flex select-none items-center space-x-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-2xl">📋</div>
 *                 <div>
 *                   <div className="text-sm font-medium leading-none">Parent Resources</div>
 *                   <p className="text-sm leading-snug text-muted-foreground">
 *                     Helpful guides and parenting tips
 *                   </p>
 *                 </div>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/calendar" className="flex select-none items-center space-x-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-2xl">📅</div>
 *                 <div>
 *                   <div className="text-sm font-medium leading-none">Events Calendar</div>
 *                   <p className="text-sm leading-snug text-muted-foreground">
 *                     Upcoming events and important dates
 *                   </p>
 *                 </div>
 *               </a>
 *             </NavigationMenuLink>
 *             
 *             <NavigationMenuLink asChild>
 *               <a href="/policies" className="flex select-none items-center space-x-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
 *                 <div className="text-2xl">📜</div>
 *                 <div>
 *                   <div className="text-sm font-medium leading-none">Policies & Forms</div>
 *                   <p className="text-sm leading-snug text-muted-foreground">
 *                     Important documents and procedures
 *                   </p>
 *                 </div>
 *               </a>
 *             </NavigationMenuLink>
 *           </div>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/about">
 *         ℹ️ About Us
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/contact">
 *         📞 Contact
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *     
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/enroll" className="bg-primary text-primary-foreground hover:bg-primary/90">
 *         📝 Enroll Now
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * 
 * // Simple navigation without dropdowns
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/">Home</NavigationMenuLink>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/programs">Programs</NavigationMenuLink>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/activities">Activities</NavigationMenuLink>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}