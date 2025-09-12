import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 🃏 Card Components - Like special boxes for organizing information!
 * 
 * What it does for kids:
 * Think of cards like pretty boxes or picture frames that hold information.
 * Just like how you might put your favorite drawings in a special folder,
 * cards help organize and display information in a neat and pretty way!
 * 
 * For grown-ups:
 * A flexible card component system for creating contained content areas.
 * Provides semantic structure with Header, Title, Description, Content, and Footer
 * components that work together to create well-organized information displays.
 * 
 * Features:
 * - Semantic HTML structure for accessibility
 * - Flexible composition with multiple sub-components
 * - Consistent spacing and visual hierarchy
 * - Responsive design with container queries
 * - Full TypeScript support
 */

/**
 * Card Root Component
 * 
 * The main container that holds all the card content.
 * Like the box that everything else goes inside!
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow @container",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Card Header Component
 * 
 * The top part of the card where important information goes.
 * Like the title area of a book cover!
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Card Title Component
 * 
 * The main title or headline of the card.
 * Like writing the name of your story at the top!
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Card Description Component
 * 
 * A smaller text that explains more about the card.
 * Like a subtitle that tells you what the card is about!
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Card Content Component
 * 
 * The main area where most of your content goes.
 * Like the middle part of a book where the story happens!
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

/**
 * Card Footer Component
 * 
 * The bottom part of the card where actions or extra info goes.
 * Like the bottom of a poster where you might put buttons or links!
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/**
 * Example Usage:
 * 
 * ```tsx
 * // Simple card with just content
 * <Card>
 *   <CardContent>
 *     <p>Hello! This is inside a card.</p>
 *   </CardContent>
 * </Card>
 * 
 * // Full card with all parts
 * <Card>
 *   <CardHeader>
 *     <CardTitle>My Favorite Animals</CardTitle>
 *     <CardDescription>
 *       A collection of the cutest animals in the world
 *     </CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Did you know that pandas can eat up to 40 pounds of bamboo a day?</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Learn More</Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Card for a daycare activity
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Art Time! 🎨</CardTitle>
 *     <CardDescription>Creative fun for little hands</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Join us for finger painting and craft activities!</p>
 *     <p>Age: 3-5 years • Duration: 45 minutes</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Sign Up</Button>
 *     <Button variant="outline">Learn More</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }