import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 🏷️ Badge Component - Like little name tags or stickers that show status!
 * 
 * What it does for kids:
 * A badge is like a special sticker or name tag that shows important information
 * in a colorful, easy-to-see way! Just like how you might get a gold star sticker
 * for good behavior, or a red badge that says "Helper of the Day," badges help
 * you quickly understand what's happening. They can be different colors and sizes
 * to show different things!
 * 
 * For grown-ups:
 * Badge components are used for displaying status indicators, categories, counts,
 * and other metadata in a compact, visually distinct way. They're perfect for
 * showing enrollment status, activity types, notification counts, and other
 * categorical information.
 * 
 * Features:
 * - Multiple visual variants (default, secondary, destructive, outline, success, warning)
 * - Size variants for different use cases
 * - Semantic HTML with proper styling
 * - Consistent with design system colors
 * - Support for icons and text
 * - Accessible color contrast
 * - Hover states and interactions
 */

const badgeVariants = cva(
  // Base badge styling
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80 dark:bg-green-600 dark:hover:bg-green-600/80",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/80 dark:bg-yellow-600 dark:hover:bg-yellow-600/80",
        info:
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80 dark:bg-blue-600 dark:hover:bg-blue-600/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs rounded",
        lg: "px-3 py-1 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 * 
 * @example
 * ```tsx
 * // Basic badge (like a simple label)
 * <Badge>New</Badge>
 * 
 * // Different variants (colors that mean different things)
 * <Badge variant="default">Enrolled</Badge>
 * <Badge variant="secondary">Pending</Badge>
 * <Badge variant="destructive">Cancelled</Badge>
 * <Badge variant="outline">Waitlist</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Attention Needed</Badge>
 * <Badge variant="info">Information</Badge>
 * 
 * // Different sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="default">Regular</Badge>
 * <Badge size="lg">Large</Badge>
 * 
 * // Daycare-specific examples
 * 
 * // Student status badges
 * <div className="flex gap-2">
 *   <Badge variant="success">✅ Present</Badge>
 *   <Badge variant="warning">⏰ Late</Badge>
 *   <Badge variant="destructive">❌ Absent</Badge>
 *   <Badge variant="info">💤 Napping</Badge>
 * </div>
 * 
 * // Age group badges
 * <div className="space-x-2">
 *   <Badge variant="outline">🍼 1-2 years</Badge>
 *   <Badge variant="outline">🎨 3-4 years</Badge>
 *   <Badge variant="outline">📚 4-5 years</Badge>
 * </div>
 * 
 * // Activity type badges
 * <div className="flex flex-wrap gap-2">
 *   <Badge variant="success">🎨 Arts & Crafts</Badge>
 *   <Badge variant="info">🎵 Music Time</Badge>
 *   <Badge variant="warning">🏃‍♀️ Physical Activity</Badge>
 *   <Badge variant="secondary">📖 Quiet Reading</Badge>
 *   <Badge variant="default">🧩 Learning Games</Badge>
 * </div>
 * 
 * // Enrollment status
 * <div className="space-y-2">
 *   <div className="flex items-center gap-2">
 *     <span>Emma Johnson</span>
 *     <Badge variant="success">Enrolled</Badge>
 *     <Badge variant="outline" size="sm">Full Day</Badge>
 *   </div>
 *   
 *   <div className="flex items-center gap-2">
 *     <span>Liam Smith</span>
 *     <Badge variant="warning">Waitlist</Badge>
 *     <Badge variant="outline" size="sm">Half Day</Badge>
 *   </div>
 *   
 *   <div className="flex items-center gap-2">
 *     <span>Sophia Garcia</span>
 *     <Badge variant="secondary">Pending</Badge>
 *     <Badge variant="outline" size="sm">Extended Care</Badge>
 *   </div>
 * </div>
 * 
 * // Meal preferences
 * <div className="flex gap-1">
 *   <Badge variant="success" size="sm">🥗 Vegetarian</Badge>
 *   <Badge variant="warning" size="sm">🥜 Nut Allergy</Badge>
 *   <Badge variant="info" size="sm">🥛 Lactose Free</Badge>
 * </div>
 * 
 * // Class capacity indicators
 * <div className="space-y-2">
 *   <div className="flex justify-between items-center">
 *     <span>Tiny Tots (1-2 years)</span>
 *     <Badge variant="destructive">Full</Badge>
 *   </div>
 *   
 *   <div className="flex justify-between items-center">
 *     <span>Busy Bees (3-4 years)</span>
 *     <Badge variant="warning">2 spots left</Badge>
 *   </div>
 *   
 *   <div className="flex justify-between items-center">
 *     <span>Future Leaders (4-5 years)</span>
 *     <Badge variant="success">Available</Badge>
 *   </div>
 * </div>
 * 
 * // Notification badges (with counts)
 * <div className="flex gap-4">
 *   <div className="relative">
 *     <Button variant="ghost">Messages</Button>
 *     <Badge 
 *       variant="destructive" 
 *       size="sm" 
 *       className="absolute -top-2 -right-2"
 *     >
 *       3
 *     </Badge>
 *   </div>
 *   
 *   <div className="relative">
 *     <Button variant="ghost">Photos</Button>
 *     <Badge 
 *       variant="success" 
 *       size="sm" 
 *       className="absolute -top-2 -right-2"
 *     >
 *       12
 *     </Badge>
 *   </div>
 * </div>
 * 
 * // Achievement badges
 * <div className="grid grid-cols-2 gap-4">
 *   <Card className="p-4">
 *     <div className="flex items-center gap-2 mb-2">
 *       <h4 className="font-medium">Emma Johnson</h4>
 *       <Badge variant="success" size="sm">⭐ Star Student</Badge>
 *     </div>
 *     <div className="flex flex-wrap gap-1">
 *       <Badge variant="outline" size="sm">🎨 Creative</Badge>
 *       <Badge variant="outline" size="sm">🤝 Helpful</Badge>
 *       <Badge variant="outline" size="sm">📚 Curious</Badge>
 *     </div>
 *   </Card>
 * </div>
 * 
 * // Event status badges
 * <div className="space-y-2">
 *   <div className="flex items-center justify-between">
 *     <span>Spring Festival</span>
 *     <Badge variant="info">📅 Upcoming</Badge>
 *   </div>
 *   
 *   <div className="flex items-center justify-between">
 *     <span>Parent-Teacher Conference</span>
 *     <Badge variant="warning">⏰ Today</Badge>
 *   </div>
 *   
 *   <div className="flex items-center justify-between">
 *     <span>Field Trip to Zoo</span>
 *     <Badge variant="success">✅ Completed</Badge>
 *   </div>
 * </div>
 * 
 * // Health and safety badges
 * <div className="space-y-3">
 *   <div className="flex items-center gap-2">
 *     <span>Immunization Status:</span>
 *     <Badge variant="success">✅ Up to Date</Badge>
 *   </div>
 *   
 *   <div className="flex items-center gap-2">
 *     <span>Emergency Contacts:</span>
 *     <Badge variant="warning">⚠️ Update Needed</Badge>
 *   </div>
 *   
 *   <div className="flex items-center gap-2">
 *     <span>Medical Forms:</span>
 *     <Badge variant="destructive">❌ Missing</Badge>
 *   </div>
 * </div>
 * 
 * // Interactive badges (clickable)
 * <div className="flex gap-2">
 *   <Badge 
 *     variant="outline" 
 *     className="cursor-pointer hover:bg-muted"
 *     onClick={() => console.log('Filter by age group')}
 *   >
 *     👶 Toddlers
 *   </Badge>
 *   
 *   <Badge 
 *     variant="outline" 
 *     className="cursor-pointer hover:bg-muted"
 *     onClick={() => console.log('Filter by preschool')}
 *   >
 *     🎨 Preschool
 *   </Badge>
 * </div>
 * 
 * // Large badges for important information
 * <Badge variant="warning" size="lg" className="mb-4">
 *   🚨 Important: School closed tomorrow due to weather
 * </Badge>
 * ```
 */
function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }