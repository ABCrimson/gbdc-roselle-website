import { cn } from "@/lib/utils"

/**
 * ⚪ Skeleton Component - Like gray placeholders while things are loading!
 * 
 * What it does for kids:
 * Skeleton components are like having gray shapes that show where text and
 * pictures will appear while the computer is getting them ready to show you!
 * It's like when you're drawing a picture and you first draw the outline
 * before filling in all the colors and details. The gray shapes help you
 * know that something exciting is coming soon!
 * 
 * For grown-ups:
 * Skeleton components provide visual placeholders during content loading states.
 * They improve perceived performance by showing users that content is loading
 * and giving them a preview of the layout structure. The animated shimmer effect
 * indicates active loading.
 * 
 * Features:
 * - Smooth shimmer animation to indicate loading
 * - Flexible sizing to match content dimensions
 * - Accessible loading state indication
 * - Consistent with design system colors
 * - Easy composition for complex layouts
 * - Responsive design support
 * - Screen reader friendly
 * - Low performance impact
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Base skeleton styling with shimmer animation
        "animate-pulse rounded-md bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic skeleton shapes
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-[250px]" />  {/* Text line */}
 *   <Skeleton className="h-4 w-[200px]" />  {/* Shorter text line */}
 *   <Skeleton className="h-20 w-full" />    {/* Large content block */}
 * </div>
 * 
 * // Skeleton card (like a preview of a student card)
 * <div className="flex items-center space-x-4">
 *   <Skeleton className="h-12 w-12 rounded-full" />  {/* Profile picture */}
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-[150px]" />  {/* Name */}
 *     <Skeleton className="h-4 w-[100px]" />  {/* Age/Class */}
 *   </div>
 * </div>
 * 
 * // Loading daycare activity feed
 * <div className="space-y-4">
 *   {Array.from({ length: 5 }).map((_, i) => (
 *     <Card key={i} className="p-4">
 *       <div className="flex space-x-4">
 *         <Skeleton className="h-12 w-12 rounded-full" />  {/* Activity icon */}
 *         <div className="space-y-2 flex-1">
 *           <Skeleton className="h-4 w-[200px]" />  {/* Activity title */}
 *           <Skeleton className="h-4 w-[300px]" />  {/* Description */}
 *           <Skeleton className="h-4 w-[100px]" />  {/* Time */}
 *         </div>
 *       </div>
 *     </Card>
 *   ))}
 * </div>
 * 
 * // Student list skeleton
 * <div className="space-y-3">
 *   <Skeleton className="h-8 w-[200px]" />  {/* Class title */}
 *   {Array.from({ length: 8 }).map((_, i) => (
 *     <div key={i} className="flex items-center justify-between p-2 border rounded">
 *       <div className="flex items-center space-x-3">
 *         <Skeleton className="h-10 w-10 rounded-full" />  {/* Student photo */}
 *         <div className="space-y-1">
 *           <Skeleton className="h-4 w-[120px]" />  {/* Student name */}
 *           <Skeleton className="h-3 w-[80px]" />   {/* Age */}
 *         </div>
 *       </div>
 *       <Skeleton className="h-6 w-[60px] rounded-full" />  {/* Status badge */}
 *     </div>
 *   ))}
 * </div>
 * 
 * // Photo gallery skeleton
 * <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 *   {Array.from({ length: 12 }).map((_, i) => (
 *     <div key={i} className="space-y-2">
 *       <Skeleton className="aspect-square w-full rounded-lg" />  {/* Photo */}
 *       <Skeleton className="h-3 w-full" />  {/* Caption */}
 *     </div>
 *   ))}
 * </div>
 * 
 * // Message conversation skeleton
 * <div className="space-y-4">
 *   {Array.from({ length: 6 }).map((_, i) => (
 *     <div key={i} className={cn(
 *       "flex",
 *       i % 2 === 0 ? "justify-start" : "justify-end"  // Alternate message sides
 *     )}>
 *       <div className={cn(
 *         "flex space-x-2 max-w-[70%]",
 *         i % 2 === 0 ? "flex-row" : "flex-row-reverse space-x-reverse"
 *       )}>
 *         <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />  {/* Avatar */}
 *         <div className="space-y-1">
 *           <Skeleton className="h-4 w-[150px]" />  {/* Message text */}
 *           <Skeleton className="h-3 w-[60px]" />   {/* Timestamp */}
 *         </div>
 *       </div>
 *     </div>
 *   ))}
 * </div>
 * 
 * // Dashboard summary skeleton
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   {Array.from({ length: 3 }).map((_, i) => (
 *     <Card key={i} className="p-6">
 *       <div className="space-y-4">
 *         <div className="flex items-center justify-between">
 *           <Skeleton className="h-6 w-6 rounded" />  {/* Icon */}
 *           <Skeleton className="h-4 w-[80px]" />    {/* Label */}
 *         </div>
 *         <Skeleton className="h-8 w-[100px]" />     {/* Big number */}
 *         <Skeleton className="h-3 w-full" />        {/* Description */}
 *       </div>
 *     </Card>
 *   ))}
 * </div>
 * 
 * // Profile page skeleton
 * <div className="space-y-6">
 *   {/* Header section */}
 *   <div className="flex items-start space-x-6">
 *     <Skeleton className="h-24 w-24 rounded-full" />  {/* Profile picture */}
 *     <div className="space-y-3 flex-1">
 *       <Skeleton className="h-8 w-[200px]" />  {/* Name */}
 *       <Skeleton className="h-4 w-[150px]" />  {/* Title/Class */}
 *       <Skeleton className="h-4 w-[100px]" />  {/* Status */}
 *     </div>
 *   </div>
 *   
 *   {/* Info tabs skeleton */}
 *   <div className="space-y-4">
 *     <div className="flex space-x-2">
 *       {Array.from({ length: 4 }).map((_, i) => (
 *         <Skeleton key={i} className="h-10 w-[100px] rounded-lg" />
 *       ))}
 *     </div>
 *     
 *     {/* Tab content */}
 *     <div className="space-y-4">
 *       <Skeleton className="h-6 w-[150px]" />  {/* Section title */}
 *       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 *         {Array.from({ length: 4 }).map((_, i) => (
 *           <div key={i} className="space-y-2">
 *             <Skeleton className="h-4 w-[100px]" />  {/* Field label */}
 *             <Skeleton className="h-4 w-full" />     {/* Field value */}
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * 
 * // Calendar view skeleton
 * <div className="space-y-4">
 *   <div className="flex justify-between items-center">
 *     <Skeleton className="h-8 w-[150px]" />  {/* Month/Year */}
 *     <div className="flex space-x-2">
 *       <Skeleton className="h-8 w-8 rounded" />  {/* Nav button */}
 *       <Skeleton className="h-8 w-8 rounded" />  {/* Nav button */}
 *     </div>
 *   </div>
 *   
 *   <div className="grid grid-cols-7 gap-2">
 *     {/* Days of week */}
 *     {Array.from({ length: 7 }).map((_, i) => (
 *       <Skeleton key={i} className="h-8 w-full" />
 *     ))}
 *     
 *     {/* Calendar days */}
 *     {Array.from({ length: 35 }).map((_, i) => (
 *       <Skeleton key={i} className="h-12 w-full rounded" />
 *     ))}
 *   </div>
 * </div>
 * 
 * // Form skeleton (while loading form data)
 * <div className="space-y-6">
 *   <Skeleton className="h-8 w-[200px]" />  {/* Form title */}
 *   
 *   {Array.from({ length: 5 }).map((_, i) => (
 *     <div key={i} className="space-y-2">
 *       <Skeleton className="h-4 w-[120px]" />  {/* Field label */}
 *       <Skeleton className="h-10 w-full rounded-md" />  {/* Input field */}
 *     </div>
 *   ))}
 *   
 *   <div className="flex justify-end space-x-2">
 *     <Skeleton className="h-10 w-[100px] rounded-md" />  {/* Cancel button */}
 *     <Skeleton className="h-10 w-[100px] rounded-md" />  {/* Submit button */}
 *   </div>
 * </div>
 * 
 * // Custom skeleton component for specific use case
 * function StudentCardSkeleton() {
 *   return (
 *     <Card className="p-4">
 *       <div className="flex items-center space-x-4">
 *         <Skeleton className="h-16 w-16 rounded-full" />
 *         <div className="space-y-2 flex-1">
 *           <Skeleton className="h-5 w-[150px]" />  {/* Student name */}
 *           <Skeleton className="h-4 w-[100px]" />  {/* Age/class */}
 *           <div className="flex space-x-2">
 *             <Skeleton className="h-6 w-[60px] rounded-full" />  {/* Status */}
 *             <Skeleton className="h-6 w-[80px] rounded-full" />  {/* Activity */}
 *           </div>
 *         </div>
 *         <Skeleton className="h-8 w-8 rounded" />  {/* Action button */}
 *       </div>
 *     </Card>
 *   )
 * }
 * 
 * // Using the custom skeleton
 * <div className="space-y-4">
 *   {Array.from({ length: 5 }).map((_, i) => (
 *     <StudentCardSkeleton key={i} />
 *   ))}
 * </div>
 * ```
 */

export { Skeleton }