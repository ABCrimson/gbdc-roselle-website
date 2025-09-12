import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 📂 Accordion Components - Like magical boxes that open and close to show information!
 * 
 * What it does for kids:
 * An accordion is like having special boxes that you can click to make them
 * open up and show you what's inside! When you click on one, it opens up
 * to show more information. If you click on it again, it closes up to save
 * space. It's like having a magic filing cabinet where you only see what
 * you want to see!
 * 
 * For grown-ups:
 * An accordion component built on Radix UI's Accordion primitive with full
 * accessibility support and smooth animations. Perfect for FAQs, expandable
 * content sections, and organizing information in a space-efficient manner.
 * 
 * Features:
 * - Full keyboard navigation (arrow keys, tab, enter, space)
 * - Screen reader accessibility with proper ARIA attributes
 * - Single or multiple item expansion modes
 * - Smooth expand/collapse animations
 * - Customizable trigger and content styling
 * - Support for disabled items
 * - Controlled and uncontrolled modes
 * - Collapsible root option
 */

const Accordion = AccordionPrimitive.Root

/**
 * AccordionItem Component
 * 
 * Individual accordion section container
 * Like one box in a set of special boxes!
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * AccordionTrigger Component
 * 
 * The clickable button that opens/closes accordion sections
 * Like the handle on a box that you click to open it!
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base styling for the trigger button
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all",
        // Hover and focus states
        "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Icon rotation when expanded
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * AccordionContent Component
 * 
 * The expandable content area that shows when opened
 * Like the inside of the box that shows when you open it!
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

/**
 * Example Usage:
 * 
 * ```tsx
 * // Basic accordion (only one item can be open at a time)
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It adheres to the WAI-ARIA design pattern.
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Is it styled?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It comes with default styles that match your theme.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // Multiple items can be open (like having multiple boxes open at once)
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes! With type="multiple" you can have several items open at once.
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>This one too?</AccordionTrigger>
 *     <AccordionContent>
 *       Absolutely! All items can be open simultaneously.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // Daycare FAQ accordion
 * <Accordion type="single" collapsible className="w-full">
 *   <AccordionItem value="enrollment">
 *     <AccordionTrigger>📝 How do I enroll my child?</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-2">
 *         <p>Enrolling your child is easy! Here's what you need to do:</p>
 *         <ol className="list-decimal list-inside space-y-1 ml-4">
 *           <li>Fill out our online enrollment form</li>
 *           <li>Schedule a tour of our facility</li>
 *           <li>Submit required documents (immunization records, etc.)</li>
 *           <li>Pay the enrollment fee</li>
 *         </ol>
 *         <p>We'll guide you through each step!</p>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 *   
 *   <AccordionItem value="hours">
 *     <AccordionTrigger>🕐 What are your operating hours?</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-2">
 *         <p><strong>Regular Hours:</strong></p>
 *         <ul className="list-disc list-inside ml-4">
 *           <li>Monday - Friday: 6:00 AM - 7:00 PM</li>
 *           <li>Saturday: 7:00 AM - 6:00 PM</li>
 *           <li>Sunday: Closed</li>
 *         </ul>
 *         <p className="text-sm text-muted-foreground">
 *           Extended hours available upon request for an additional fee.
 *         </p>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 *   
 *   <AccordionItem value="meals">
 *     <AccordionTrigger>🍎 Do you provide meals and snacks?</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-2">
 *         <p>Yes! We provide nutritious meals and snacks throughout the day:</p>
 *         <ul className="list-disc list-inside ml-4">
 *           <li>Breakfast (8:00 AM)</li>
 *           <li>Morning snack (10:00 AM)</li>
 *           <li>Lunch (12:00 PM)</li>
 *           <li>Afternoon snack (3:00 PM)</li>
 *         </ul>
 *         <p>All meals are prepared fresh daily and accommodate dietary restrictions and allergies.</p>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 *   
 *   <AccordionItem value="safety">
 *     <AccordionTrigger>🛡️ What safety measures do you have?</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-2">
 *         <p>Your child's safety is our top priority. We have:</p>
 *         <ul className="list-disc list-inside ml-4">
 *           <li>Secure entry system with key card access</li>
 *           <li>Background checks for all staff members</li>
 *           <li>24/7 security cameras in all common areas</li>
 *           <li>Emergency procedures and regular drills</li>
 *           <li>First aid certified staff on-site at all times</li>
 *           <li>Secure outdoor play areas</li>
 *         </ul>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // Program details accordion
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="toddlers">
 *     <AccordionTrigger>🍼 Toddler Program (1-2 years)</AccordionTrigger>
 *     <AccordionContent>
 *       <Card>
 *         <CardContent className="pt-6">
 *           <div className="space-y-4">
 *             <div>
 *               <h4 className="font-medium mb-2">Daily Schedule</h4>
 *               <ul className="text-sm space-y-1 text-muted-foreground">
 *                 <li>8:00 AM - Free play and breakfast</li>
 *                 <li>9:00 AM - Circle time and songs</li>
 *                 <li>10:00 AM - Sensory play activities</li>
 *                 <li>11:00 AM - Outdoor time (weather permitting)</li>
 *                 <li>12:00 PM - Lunch and quiet time</li>
 *                 <li>1:00 PM - Nap time</li>
 *                 <li>3:00 PM - Snack and free play</li>
 *               </ul>
 *             </div>
 *             <div>
 *               <h4 className="font-medium mb-2">Learning Focus</h4>
 *               <p className="text-sm text-muted-foreground">
 *                 Our toddler program focuses on building trust, developing motor skills, 
 *                 and introducing basic concepts through play and exploration.
 *               </p>
 *             </div>
 *           </div>
 *         </CardContent>
 *       </Card>
 *     </AccordionContent>
 *   </AccordionItem>
 *   
 *   <AccordionItem value="preschool">
 *     <AccordionTrigger>🎨 Preschool Program (3-4 years)</AccordionTrigger>
 *     <AccordionContent>
 *       <Card>
 *         <CardContent className="pt-6">
 *           <div className="space-y-4">
 *             <div>
 *               <h4 className="font-medium mb-2">Key Activities</h4>
 *               <div className="grid grid-cols-2 gap-2 text-sm">
 *                 <div>• Arts and crafts</div>
 *                 <div>• Story time</div>
 *                 <div>• Music and movement</div>
 *                 <div>• Science exploration</div>
 *                 <div>• Dramatic play</div>
 *                 <div>• Outdoor adventures</div>
 *               </div>
 *             </div>
 *             <div>
 *               <h4 className="font-medium mb-2">Skills Development</h4>
 *               <p className="text-sm text-muted-foreground">
 *                 Children develop social skills, creativity, early literacy, 
 *                 and problem-solving abilities through structured play and activities.
 *               </p>
 *             </div>
 *           </div>
 *         </CardContent>
 *       </Card>
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // Settings accordion with multiple open items
 * <Accordion type="multiple" className="max-w-2xl">
 *   <AccordionItem value="account">
 *     <AccordionTrigger>👤 Account Settings</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-4">
 *         <div>
 *           <Label htmlFor="username">Username</Label>
 *           <Input id="username" placeholder="Your username" />
 *         </div>
 *         <div>
 *           <Label htmlFor="email">Email</Label>
 *           <Input id="email" type="email" placeholder="your@email.com" />
 *         </div>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 *   
 *   <AccordionItem value="notifications">
 *     <AccordionTrigger>🔔 Notification Preferences</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="space-y-3">
 *         <div className="flex items-center justify-between">
 *           <Label>Email notifications</Label>
 *           <Switch />
 *         </div>
 *         <div className="flex items-center justify-between">
 *           <Label>SMS alerts</Label>
 *           <Switch />
 *         </div>
 *         <div className="flex items-center justify-between">
 *           <Label>Push notifications</Label>
 *           <Switch />
 *         </div>
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }