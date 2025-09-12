import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * 📊 Progress Component - Like a colorful bar that shows how much is done!
 * 
 * What it does for kids:
 * A progress bar is like a special measuring stick that fills up with color
 * to show you how much of something is finished! It's like when you're filling
 * up a jar with marbles - the more marbles you put in, the fuller it gets.
 * Or like a thermometer that shows how close you are to your goal. When it's
 * all filled up, that means you're done!
 * 
 * For grown-ups:
 * Progress component built on Radix UI's Progress primitive with accessible
 * progress indication and customizable styling. Perfect for showing completion
 * status, loading states, form progress, and other measurable progress indicators.
 * 
 * Features:
 * - Accessible progress indication with proper ARIA attributes
 * - Smooth animations and transitions
 * - Customizable colors and sizes
 * - Support for different orientations
 * - Screen reader announcements
 * - Percentage-based values (0-100)
 * - Indeterminate state support
 * - Responsive design
 */

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * Visual variant of the progress bar
   * - default: Standard blue progress bar
   * - success: Green for completed/successful progress
   * - warning: Yellow/orange for attention-needed progress
   * - destructive: Red for error or critical progress
   */
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  
  /**
   * Size of the progress bar
   * - default: Standard height
   * - sm: Smaller, more compact height
   * - lg: Larger, more prominent height
   */
  size?: 'default' | 'sm' | 'lg'
  
  /**
   * Show percentage text on the progress bar
   * - true: Shows "X%" text overlay
   * - false: No text shown
   */
  showValue?: boolean
}

/**
 * Progress Component
 * 
 * @example
 * ```tsx
 * // Basic progress bar (like a loading bar)
 * <Progress value={33} />
 * 
 * // Progress with percentage text
 * <Progress value={75} showValue />
 * 
 * // Different colors for different meanings
 * <Progress value={100} variant="success" showValue />  {/* Green - completed! */}
 * <Progress value={25} variant="warning" showValue />   {/* Yellow - needs attention */}
 * <Progress value={10} variant="destructive" showValue /> {/* Red - critical */}
 * 
 * // Different sizes
 * <Progress value={50} size="sm" />   {/* Small and subtle */}
 * <Progress value={50} size="lg" />   {/* Large and prominent */}
 * 
 * // Enrollment progress for daycare
 * <div className="space-y-4">
 *   <div>
 *     <div className="flex justify-between text-sm mb-1">
 *       <span>📝 Application Progress</span>
 *       <span>3 of 5 steps completed</span>
 *     </div>
 *     <Progress value={60} showValue />
 *   </div>
 * </div>
 * 
 * // Class capacity indicators
 * <div className="space-y-4">
 *   <div>
 *     <div className="flex justify-between text-sm mb-1">
 *       <span>🍼 Tiny Tots (1-2 years)</span>
 *       <span>12/12 enrolled</span>
 *     </div>
 *     <Progress value={100} variant="destructive" />
 *     <p className="text-xs text-muted-foreground mt-1">Class is full</p>
 *   </div>
 *   
 *   <div>
 *     <div className="flex justify-between text-sm mb-1">
 *       <span>🎨 Busy Bees (3-4 years)</span>
 *       <span>10/12 enrolled</span>
 *     </div>
 *     <Progress value={83} variant="warning" />
 *     <p className="text-xs text-muted-foreground mt-1">2 spots remaining</p>
 *   </div>
 *   
 *   <div>
 *     <div className="flex justify-between text-sm mb-1">
 *       <span>📚 Future Leaders (4-5 years)</span>
 *       <span>6/12 enrolled</span>
 *     </div>
 *     <Progress value={50} variant="success" />
 *     <p className="text-xs text-muted-foreground mt-1">Spots available</p>
 *   </div>
 * </div>
 * 
 * // Daily activity completion
 * <Card>
 *   <CardHeader>
 *     <CardTitle>📅 Emma's Daily Activities</CardTitle>
 *     <CardDescription>Today's progress</CardDescription>
 *   </CardHeader>
 *   <CardContent className="space-y-4">
 *     <div>
 *       <div className="flex justify-between text-sm mb-1">
 *         <span>🎵 Circle Time</span>
 *         <span>✅ Completed</span>
 *       </div>
 *       <Progress value={100} variant="success" size="sm" />
 *     </div>
 *     
 *     <div>
 *       <div className="flex justify-between text-sm mb-1">
 *         <span>🎨 Arts & Crafts</span>
 *         <span>In Progress</span>
 *       </div>
 *       <Progress value={60} size="sm" />
 *     </div>
 *     
 *     <div>
 *       <div className="flex justify-between text-sm mb-1">
 *         <span>🏃‍♀️ Outdoor Play</span>
 *         <span>⏰ Coming Up</span>
 *       </div>
 *       <Progress value={0} variant="warning" size="sm" />
 *     </div>
 *     
 *     <div>
 *       <div className="flex justify-between text-sm mb-1">
 *         <span>📖 Story Time</span>
 *         <span>⏰ Coming Up</span>
 *       </div>
 *       <Progress value={0} size="sm" />
 *     </div>
 *   </CardContent>
 * </Card>
 * 
 * // Learning milestones progress
 * <div className="space-y-6">
 *   <div>
 *     <h3 className="text-lg font-medium mb-4">🌟 Emma's Learning Progress</h3>
 *     
 *     <div className="space-y-4">
 *       <div>
 *         <div className="flex justify-between items-center mb-2">
 *           <span className="text-sm font-medium">🔤 Letter Recognition</span>
 *           <Badge variant="success" size="sm">Advanced</Badge>
 *         </div>
 *         <Progress value={90} variant="success" showValue />
 *       </div>
 *       
 *       <div>
 *         <div className="flex justify-between items-center mb-2">
 *           <span className="text-sm font-medium">🔢 Number Skills</span>
 *           <Badge variant="outline" size="sm">On Track</Badge>
 *         </div>
 *         <Progress value={75} showValue />
 *       </div>
 *       
 *       <div>
 *         <div className="flex justify-between items-center mb-2">
 *           <span className="text-sm font-medium">✂️ Fine Motor Skills</span>
 *           <Badge variant="warning" size="sm">Developing</Badge>
 *         </div>
 *         <Progress value={45} variant="warning" showValue />
 *       </div>
 *       
 *       <div>
 *         <div className="flex justify-between items-center mb-2">
 *           <span className="text-sm font-medium">🤝 Social Skills</span>
 *           <Badge variant="success" size="sm">Excellent</Badge>
 *         </div>
 *         <Progress value={95} variant="success" showValue />
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * 
 * // Form completion progress
 * <div className="mb-6">
 *   <div className="flex justify-between items-center mb-2">
 *     <h2 className="text-xl font-semibold">Enrollment Application</h2>
 *     <span className="text-sm text-muted-foreground">Step 3 of 5</span>
 *   </div>
 *   <Progress value={60} size="lg" />
 *   <div className="flex justify-between text-xs text-muted-foreground mt-1">
 *     <span>Basic Info ✅</span>
 *     <span>Medical Info ✅</span>
 *     <span className="font-medium">Emergency Contacts</span>
 *     <span>Documents</span>
 *     <span>Review</span>
 *   </div>
 * </div>
 * 
 * // Fund raising goal progress
 * <Card>
 *   <CardHeader>
 *     <CardTitle>🎯 Playground Fund Goal</CardTitle>
 *     <CardDescription>Help us build a new playground for the children!</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <div className="space-y-2">
 *       <div className="flex justify-between text-sm">
 *         <span>Raised so far</span>
 *         <span className="font-medium">$7,500 of $10,000</span>
 *       </div>
 *       <Progress value={75} variant="success" size="lg" />
 *       <p className="text-xs text-muted-foreground">
 *         We're 75% of the way to our goal! Thank you for your generous support.
 *       </p>
 *     </div>
 *   </CardContent>
 * </Card>
 * 
 * // Reading progress tracker
 * <div className="space-y-4">
 *   <h3 className="text-lg font-medium">📚 Monthly Reading Challenge</h3>
 *   {[
 *     { child: "Emma Johnson", books: 8, goal: 10, variant: "success" as const },
 *     { child: "Liam Smith", books: 12, goal: 10, variant: "success" as const },
 *     { child: "Sophia Garcia", books: 4, goal: 10, variant: "warning" as const },
 *     { child: "Noah Brown", books: 2, goal: 10, variant: "destructive" as const },
 *   ].map((student, i) => (
 *     <div key={i} className="space-y-2">
 *       <div className="flex justify-between text-sm">
 *         <span>{student.child}</span>
 *         <span>{student.books}/{student.goal} books</span>
 *       </div>
 *       <Progress 
 *         value={(student.books / student.goal) * 100} 
 *         variant={student.variant}
 *         showValue
 *       />
 *     </div>
 *   ))}
 * </div>
 * 
 * // Loading state (indeterminate)
 * <div className="space-y-2">
 *   <p className="text-sm">Uploading Emma's photos...</p>
 *   <Progress value={null} className="animate-pulse" />
 * </div>
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "default", size = "default", showValue, ...props }, ref) => {
  const sizeStyles = {
    sm: "h-2",
    default: "h-3", 
    lg: "h-4"
  }

  const variantStyles = {
    default: "bg-primary",
    success: "bg-green-500 dark:bg-green-600",
    warning: "bg-yellow-500 dark:bg-yellow-600", 
    destructive: "bg-destructive"
  }

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-primary/20",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all",
            variantStyles[variant]
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && value !== null && value !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white mix-blend-difference">
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }