import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 🍞 Breadcrumb Components - Like leaving cookie crumbs to find your way home!
 * 
 * What it does for kids:
 * Breadcrumbs are like the trail of cookie crumbs that Hansel and Gretel left
 * to find their way back home! On websites, breadcrumbs show you where you are
 * and help you go back to where you came from. It's like having a map that says
 * "You started at Home, then went to Programs, then to Toddlers" so you can
 * click on any part to go back there!
 * 
 * For grown-ups:
 * Breadcrumb components provide hierarchical navigation context, showing users
 * their current location within the site structure and enabling easy navigation
 * back to parent pages. Essential for improving user experience and SEO.
 * 
 * Features:
 * - Semantic HTML with proper navigation structure
 * - Screen reader accessibility with proper ARIA attributes
 * - Flexible styling and customization
 * - Support for icons and custom separators
 * - Responsive design with ellipsis for long paths
 * - Integration with Next.js routing
 * - Keyboard navigation support
 * - Structured data markup support
 */

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

/**
 * Example Usage:
 * 
 * ```tsx
 * import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
 * 
 * // Basic breadcrumb for daycare website
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">🏠 Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/programs">📚 Programs</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>🍼 Toddler Program</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb for child profile page
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/dashboard">🏠 Dashboard</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/children">👶 My Children</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Emma Johnson</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb with custom separator
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator>
 *       <span className="text-muted-foreground">→</span>
 *     </BreadcrumbSeparator>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/activities">Activities</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator>
 *       <span className="text-muted-foreground">→</span>
 *     </BreadcrumbSeparator>
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Arts & Crafts</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb for enrollment process
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/enroll">📝 Enrollment</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/enroll/application">Application</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Child Information</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb with long path (using ellipsis)
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbEllipsis />
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/parent-portal/emma/reports">📋 Reports</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>March 2024</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb for photo gallery
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">🏠 Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/photos">📸 Photo Gallery</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/photos/2024">2024</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/photos/2024/march">March</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Spring Festival</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Dynamic breadcrumb with Next.js routing
 * function DynamicBreadcrumb() {
 *   const pathname = usePathname()
 *   const segments = pathname.split('/').filter(Boolean)
 *   
 *   const breadcrumbItems = [
 *     { href: '/', label: '🏠 Home' },
 *     ...segments.map((segment, index) => ({
 *       href: '/' + segments.slice(0, index + 1).join('/'),
 *       label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
 *     }))
 *   ]
 *   
 *   return (
 *     <Breadcrumb>
 *       <BreadcrumbList>
 *         {breadcrumbItems.map((item, index) => (
 *           <React.Fragment key={item.href}>
 *             <BreadcrumbItem>
 *               {index === breadcrumbItems.length - 1 ? (
 *                 <BreadcrumbPage>{item.label}</BreadcrumbPage>
 *               ) : (
 *                 <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
 *               )}
 *             </BreadcrumbItem>
 *             {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
 *           </React.Fragment>
 *         ))}
 *       </BreadcrumbList>
 *     </Breadcrumb>
 *   )
 * }
 * 
 * // Breadcrumb with icons for different sections
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/" className="flex items-center gap-1">
 *         <Home className="h-4 w-4" />
 *         Home
 *       </BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/programs" className="flex items-center gap-1">
 *         <BookOpen className="h-4 w-4" />
 *         Programs
 *       </BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage className="flex items-center gap-1">
 *         <Baby className="h-4 w-4" />
 *         Toddler Program
 *       </BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Responsive breadcrumb that collapses on mobile
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem className="hidden md:block">
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator className="hidden md:block" />
 *     <BreadcrumbItem className="hidden sm:block">
 *       <BreadcrumbLink href="/parent-portal">Parent Portal</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator className="hidden sm:block" />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/parent-portal/emma">Emma</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Daily Report</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb for admin sections
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/admin">⚙️ Admin Dashboard</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/admin/students">👥 Students</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/admin/students/busy-bees">🐝 Busy Bees Class</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Emma Johnson</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Breadcrumb in a card layout
 * <Card>
 *   <CardHeader className="pb-3">
 *     <Breadcrumb>
 *       <BreadcrumbList>
 *         <BreadcrumbItem>
 *           <BreadcrumbLink href="/activities">Activities</BreadcrumbLink>
 *         </BreadcrumbItem>
 *         <BreadcrumbSeparator />
 *         <BreadcrumbItem>
 *           <BreadcrumbPage>🎨 Today's Art Project</BreadcrumbPage>
 *         </BreadcrumbItem>
 *       </BreadcrumbList>
 *     </Breadcrumb>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Today the children created beautiful finger paintings using fall colors...</p>
 *   </CardContent>
 * </Card>
 * ```
 */

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}