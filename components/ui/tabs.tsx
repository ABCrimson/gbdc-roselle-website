import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * 📑 Tabs Components - Like having different folders for different things!
 * 
 * What it does for kids:
 * Tabs are like having a special notebook with different colored tabs at the top!
 * Each tab shows you different information, just like how you might have one
 * tab for math, one for reading, and one for art. You click on a tab to see
 * what's inside that section, and only one section shows at a time!
 * 
 * For grown-ups:
 * A tabs component built on Radix UI's Tabs primitive with full accessibility
 * support and keyboard navigation. Perfect for organizing related content
 * into separate, switchable panels.
 * 
 * Features:
 * - Full keyboard navigation (arrow keys, tab, enter, space)
 * - Screen reader accessibility with proper ARIA attributes
 * - Controlled and uncontrolled modes
 * - Custom styling with active states
 * - Horizontal and vertical orientations
 * - Automatic focus management
 * - Support for disabled tabs
 * - Integration with form libraries
 */

const Tabs = TabsPrimitive.Root

/**
 * TabsList Component
 * 
 * The container that holds all the tab buttons
 * Like the top of a file folder where all the tab labels are!
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Base styling - the container for tab buttons
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * TabsTrigger Component
 * 
 * Individual tab buttons that you click to switch content
 * Like the actual tab labels that you click on!
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styling for tab buttons
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
      // Focus and disabled states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      // Active state styling - when the tab is selected
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * TabsContent Component
 * 
 * The content area that shows when a tab is selected
 * Like the inside of a folder that shows when you open it!
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Base styling for content areas
      "mt-2 ring-offset-background",
      // Focus states for accessibility
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic tabs for different sections
 * <Tabs defaultValue="account" className="w-[400px]">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     <p>Make changes to your account here.</p>
 *   </TabsContent>
 *   <TabsContent value="password">
 *     <p>Change your password here.</p>
 *   </TabsContent>
 * </Tabs>
 * 
 * // Daycare program tabs
 * <Tabs defaultValue="toddlers" className="w-full">
 *   <TabsList className="grid w-full grid-cols-4">
 *     <TabsTrigger value="toddlers">🍼 Toddlers (1-2)</TabsTrigger>
 *     <TabsTrigger value="preschool">🎨 Preschool (3-4)</TabsTrigger>
 *     <TabsTrigger value="prek">📚 Pre-K (4-5)</TabsTrigger>
 *     <TabsTrigger value="afterschool">⚡ After School</TabsTrigger>
 *   </TabsList>
 *   
 *   <TabsContent value="toddlers" className="space-y-4">
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>🍼 Toddler Program (Ages 1-2)</CardTitle>
 *         <CardDescription>
 *           Nurturing care for our youngest learners
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         <ul className="space-y-2 text-sm">
 *           <li>• Sensory play and exploration</li>
 *           <li>• Basic motor skill development</li>
 *           <li>• Gentle introduction to routines</li>
 *           <li>• Individual attention and care</li>
 *         </ul>
 *       </CardContent>
 *     </Card>
 *   </TabsContent>
 *   
 *   <TabsContent value="preschool" className="space-y-4">
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>🎨 Preschool Program (Ages 3-4)</CardTitle>
 *         <CardDescription>
 *           Creative learning through play and discovery
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         <ul className="space-y-2 text-sm">
 *           <li>• Arts and crafts activities</li>
 *           <li>• Early literacy and numeracy</li>
 *           <li>• Social skills development</li>
 *           <li>• Outdoor exploration time</li>
 *         </ul>
 *       </CardContent>
 *     </Card>
 *   </TabsContent>
 *   
 *   <TabsContent value="prek" className="space-y-4">
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>📚 Pre-K Program (Ages 4-5)</CardTitle>
 *         <CardDescription>
 *           School readiness and advanced learning
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         <ul className="space-y-2 text-sm">
 *           <li>• Kindergarten preparation</li>
 *           <li>• Advanced reading and writing</li>
 *           <li>• Math concepts and problem solving</li>
 *           <li>• Science experiments and discovery</li>
 *         </ul>
 *       </CardContent>
 *     </Card>
 *   </TabsContent>
 * </Tabs>
 * 
 * // Child profile tabs
 * <Tabs defaultValue="today" className="w-full">
 *   <TabsList>
 *     <TabsTrigger value="today">📅 Today</TabsTrigger>
 *     <TabsTrigger value="week">📊 This Week</TabsTrigger>
 *     <TabsTrigger value="photos">📸 Photos</TabsTrigger>
 *     <TabsTrigger value="reports">📋 Reports</TabsTrigger>
 *   </TabsList>
 *   
 *   <TabsContent value="today" className="space-y-4">
 *     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 *       <Card>
 *         <CardHeader>
 *           <CardTitle className="text-base">🍎 Meals</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           <div className="space-y-2 text-sm">
 *             <p>Breakfast: ✅ Ate well</p>
 *             <p>Snack: ✅ Apple slices</p>
 *             <p>Lunch: ⏰ 12:00 PM</p>
 *           </div>
 *         </CardContent>
 *       </Card>
 *       
 *       <Card>
 *         <CardHeader>
 *           <CardTitle className="text-base">🎯 Activities</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           <div className="space-y-2 text-sm">
 *             <p>Circle Time: ✅ Participated</p>
 *             <p>Art Project: ✅ Completed</p>
 *             <p>Outdoor Play: ⏰ Coming up</p>
 *           </div>
 *         </CardContent>
 *       </Card>
 *     </div>
 *   </TabsContent>
 *   
 *   <TabsContent value="photos" className="space-y-4">
 *     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 *       {[1, 2, 3, 4, 5, 6].map((i) => (
 *         <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
 *           <span className="text-muted-foreground">Photo {i}</span>
 *         </div>
 *       ))}
 *     </div>
 *   </TabsContent>
 * </Tabs>
 * 
 * // Settings tabs
 * <Tabs defaultValue="profile" className="max-w-2xl">
 *   <TabsList className="grid w-full grid-cols-3">
 *     <TabsTrigger value="profile">👤 Profile</TabsTrigger>
 *     <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
 *     <TabsTrigger value="privacy">🔒 Privacy</TabsTrigger>
 *   </TabsList>
 *   
 *   <TabsContent value="profile" className="space-y-4">
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>Profile Information</CardTitle>
 *         <CardDescription>
 *           Update your account details here
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent className="space-y-4">
 *         <div className="space-y-2">
 *           <Label htmlFor="name">Full Name</Label>
 *           <Input id="name" placeholder="Your full name" />
 *         </div>
 *         <div className="space-y-2">
 *           <Label htmlFor="email">Email</Label>
 *           <Input id="email" type="email" placeholder="your@email.com" />
 *         </div>
 *       </CardContent>
 *     </Card>
 *   </TabsContent>
 *   
 *   <TabsContent value="notifications" className="space-y-4">
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>Notification Preferences</CardTitle>
 *         <CardDescription>
 *           Choose what updates you'd like to receive
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent className="space-y-4">
 *         <div className="flex items-center justify-between">
 *           <Label>Daily Reports</Label>
 *           <Switch />
 *         </div>
 *         <div className="flex items-center justify-between">
 *           <Label>Photo Updates</Label>
 *           <Switch />
 *         </div>
 *       </CardContent>
 *     </Card>
 *   </TabsContent>
 * </Tabs>
 * 
 * // Vertical tabs (using custom styling)
 * <Tabs defaultValue="tab1" orientation="vertical" className="flex">
 *   <TabsList className="flex-col h-auto">
 *     <TabsTrigger value="tab1" className="w-full">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2" className="w-full">Tab 2</TabsTrigger>
 *     <TabsTrigger value="tab3" className="w-full">Tab 3</TabsTrigger>
 *   </TabsList>
 *   <div className="flex-1 ml-4">
 *     <TabsContent value="tab1">Content for tab 1</TabsContent>
 *     <TabsContent value="tab2">Content for tab 2</TabsContent>
 *     <TabsContent value="tab3">Content for tab 3</TabsContent>
 *   </div>
 * </Tabs>
 * ```
 */

export { Tabs, TabsList, TabsTrigger, TabsContent }