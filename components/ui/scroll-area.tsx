import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * 📜 ScrollArea Components - Like a special window with invisible scrollbars!
 * 
 * What it does for kids:
 * A scroll area is like having a magic window that can show you more content
 * than what fits on the screen! When there's too much text or pictures to show
 * all at once, you can scroll up and down to see everything. It's like looking
 * through a window and being able to move what you see up and down to explore
 * everything behind it!
 * 
 * For grown-ups:
 * A scroll area component built on Radix UI's ScrollArea primitive that provides
 * custom-styled scrollbars with better cross-browser consistency. Perfect for
 * creating scrollable content areas with a consistent look across all platforms.
 * 
 * Features:
 * - Custom-styled scrollbars that work across browsers
 * - Smooth scrolling behavior
 * - Horizontal and vertical scrolling support
 * - Customizable scrollbar appearance
 * - Touch-friendly scrolling on mobile devices
 * - Accessibility support with keyboard navigation
 * - Fade-in/fade-out scrollbar visibility
 * - Support for scroll position tracking
 */

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar Component
 * 
 * The scrollbar that appears when content overflows
 * Like the handle on the side that you can drag to move around!
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      // Base scrollbar styling
      "flex touch-none select-none transition-colors",
      // Vertical scrollbar (up and down)
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      // Horizontal scrollbar (left and right)
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic scroll area for long content
 * <ScrollArea className="h-72 w-48 rounded-md border">
 *   <div className="p-4">
 *     <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
 *     {Array.from({ length: 50 }).map((_, i) => (
 *       <div key={i} className="text-sm">
 *         Tag {i + 1}
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * 
 * // Daycare activity feed
 * <ScrollArea className="h-96 w-full rounded-lg border">
 *   <div className="p-4 space-y-4">
 *     <h3 className="text-lg font-semibold mb-4">📅 Today's Activities</h3>
 *     
 *     {[
 *       { time: "9:00 AM", activity: "Circle Time", description: "Morning songs and weather discussion", emoji: "🎵" },
 *       { time: "9:30 AM", activity: "Arts & Crafts", description: "Finger painting with fall colors", emoji: "🎨" },
 *       { time: "10:15 AM", activity: "Snack Time", description: "Apple slices and crackers", emoji: "🍎" },
 *       { time: "10:30 AM", activity: "Outdoor Play", description: "Playground time and nature exploration", emoji: "🌳" },
 *       { time: "11:30 AM", activity: "Story Time", description: "Reading 'The Very Hungry Caterpillar'", emoji: "📚" },
 *       { time: "12:00 PM", activity: "Lunch", description: "Grilled cheese and tomato soup", emoji: "🥪" },
 *       { time: "1:00 PM", activity: "Rest Time", description: "Quiet time with soft music", emoji: "😴" },
 *       { time: "2:30 PM", activity: "Science Fun", description: "Exploring magnets and metal objects", emoji: "🔬" },
 *       { time: "3:00 PM", activity: "Snack Time", description: "Graham crackers and milk", emoji: "🥛" },
 *       { time: "3:30 PM", activity: "Free Play", description: "Block building and imaginative play", emoji: "🧱" },
 *     ].map((item, i) => (
 *       <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50">
 *         <div className="text-2xl">{item.emoji}</div>
 *         <div className="flex-1">
 *           <div className="flex justify-between items-start mb-1">
 *             <h4 className="font-medium">{item.activity}</h4>
 *             <span className="text-sm text-muted-foreground">{item.time}</span>
 *           </div>
 *           <p className="text-sm text-muted-foreground">{item.description}</p>
 *         </div>
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * 
 * // Scrollable student list
 * <ScrollArea className="h-80 rounded-md border">
 *   <div className="p-4">
 *     <h4 className="mb-4 text-sm font-medium">🌟 Busy Bees Class</h4>
 *     {[
 *       { name: "Emma Johnson", age: 4, status: "Present", activity: "Playing with blocks" },
 *       { name: "Liam Smith", age: 3, status: "Present", activity: "Reading books" },
 *       { name: "Sophia Garcia", age: 4, status: "Napping", activity: "Rest time" },
 *       { name: "Noah Brown", age: 3, status: "Present", activity: "Art station" },
 *       { name: "Olivia Davis", age: 4, status: "Present", activity: "Puzzle time" },
 *       { name: "Mason Wilson", age: 3, status: "Present", activity: "Music corner" },
 *       { name: "Ava Miller", age: 4, status: "Present", activity: "Sensory play" },
 *       { name: "Lucas Taylor", age: 3, status: "Present", activity: "Building towers" },
 *     ].map((student, i) => (
 *       <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
 *         <div>
 *           <p className="font-medium text-sm">{student.name}</p>
 *           <p className="text-xs text-muted-foreground">Age {student.age} • {student.activity}</p>
 *         </div>
 *         <span className={cn(
 *           "px-2 py-1 rounded-full text-xs font-medium",
 *           student.status === "Present" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
 *         )}>
 *           {student.status}
 *         </span>
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * 
 * // Horizontal scroll area for photos
 * <ScrollArea className="w-full whitespace-nowrap rounded-md border">
 *   <div className="flex w-max space-x-4 p-4">
 *     {Array.from({ length: 10 }).map((_, i) => (
 *       <div key={i} className="shrink-0">
 *         <div className="w-32 h-24 bg-muted rounded-md flex items-center justify-center">
 *           <span className="text-sm text-muted-foreground">Photo {i + 1}</span>
 *         </div>
 *         <p className="text-xs text-center mt-2">Activity {i + 1}</p>
 *       </div>
 *     ))}
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * 
 * // Chat-like message area
 * <ScrollArea className="h-96 w-full rounded-lg border bg-background">
 *   <div className="p-4 space-y-4">
 *     <div className="text-center text-sm text-muted-foreground mb-4">
 *       📱 Messages with Ms. Sarah - Today
 *     </div>
 *     
 *     {[
 *       { sender: "teacher", time: "9:15 AM", message: "Good morning! Emma had a great start to the day and enjoyed circle time." },
 *       { sender: "parent", time: "9:20 AM", message: "Wonderful! Thank you for the update. How did she do with breakfast?" },
 *       { sender: "teacher", time: "9:25 AM", message: "She ate her whole breakfast and asked for seconds on the fruit! 🍓" },
 *       { sender: "teacher", time: "10:45 AM", message: "Emma created a beautiful painting during art time. I'll send a photo shortly!" },
 *       { sender: "parent", time: "11:00 AM", message: "Can't wait to see it! She loves art activities." },
 *       { sender: "teacher", time: "12:30 PM", message: "Lunch went well, and she's now resting peacefully. 😴" },
 *     ].map((msg, i) => (
 *       <div key={i} className={cn(
 *         "flex",
 *         msg.sender === "parent" ? "justify-end" : "justify-start"
 *       )}>
 *         <div className={cn(
 *           "max-w-[70%] rounded-lg p-3",
 *           msg.sender === "parent" 
 *             ? "bg-primary text-primary-foreground" 
 *             : "bg-muted"
 *         )}>
 *           <p className="text-sm">{msg.message}</p>
 *           <p className={cn(
 *             "text-xs mt-1",
 *             msg.sender === "parent" 
 *               ? "text-primary-foreground/70" 
 *               : "text-muted-foreground"
 *           )}>
 *             {msg.time}
 *           </p>
 *         </div>
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * 
 * // Menu/navigation with scroll
 * <ScrollArea className="h-64 w-48">
 *   <div className="p-4">
 *     <h4 className="mb-4 text-sm font-medium leading-none">Navigation</h4>
 *     {[
 *       "🏠 Dashboard",
 *       "👶 My Children", 
 *       "📅 Daily Schedule",
 *       "📸 Photo Gallery",
 *       "💬 Messages",
 *       "📋 Reports",
 *       "⚙️ Settings",
 *       "❓ Help & Support",
 *       "📞 Contact Us",
 *       "🚪 Logout"
 *     ].map((item, i) => (
 *       <div key={i} className="text-sm py-2 px-2 rounded hover:bg-muted cursor-pointer">
 *         {item}
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */

export { ScrollArea, ScrollBar }