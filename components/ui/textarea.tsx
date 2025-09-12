import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 📝 Textarea Component - Like a big box for writing lots of words!
 * 
 * What it does for kids:
 * A textarea is like having a really big piece of paper on the computer
 * where you can write many sentences and paragraphs! It's perfect when
 * you want to write a long story, describe your favorite day, or tell
 * someone lots of information. The box grows as you write more!
 * 
 * For grown-ups:
 * A textarea component that extends the native HTML textarea element
 * with consistent design system styling, accessibility features, and
 * responsive behavior. Perfect for longer text input like comments,
 * descriptions, and messages.
 * 
 * Features:
 * - Consistent styling with design system
 * - Automatic resizing based on content (optional)
 * - Full accessibility with proper focus states
 * - Support for all native textarea attributes
 * - Error state styling for form validation
 * - Disabled state styling
 * - Character count integration capability
 * - Responsive design with proper mobile handling
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Shows red border to indicate something needs to be fixed
   */
  error?: boolean
  
  /**
   * Automatically resize the textarea based on content
   * - false: Fixed height (default behavior)
   * - true: Grows with content up to max height
   */
  autoResize?: boolean
  
  /**
   * Size variant of the textarea
   * - default: Standard size
   * - sm: Smaller text and padding
   * - lg: Larger text and padding
   */
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Textarea Component
 * 
 * @example
 * ```tsx
 * // Basic textarea for writing longer text
 * <Textarea placeholder="Tell us about yourself..." />
 * 
 * // Textarea with specific number of rows
 * <Textarea 
 *   placeholder="Write your message here..." 
 *   rows={5}
 * />
 * 
 * // Auto-resizing textarea (grows as you type)
 * <Textarea 
 *   placeholder="This will grow as you type..."
 *   autoResize
 * />
 * 
 * // Different sizes
 * <Textarea size="sm" placeholder="Small textarea" />
 * <Textarea size="lg" placeholder="Large textarea" />
 * 
 * // Textarea with error state
 * <Textarea 
 *   placeholder="This has an error..."
 *   error={true}
 * />
 * 
 * // Disabled textarea (can't edit)
 * <Textarea 
 *   value="This text cannot be changed"
 *   disabled
 * />
 * 
 * // Using with forms for daycare feedback
 * <FormField
 *   control={form.control}
 *   name="specialInstructions"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Special Instructions</FormLabel>
 *       <FormControl>
 *         <Textarea
 *           placeholder="Please share any special instructions for your child's care..."
 *           className="min-h-[120px]"
 *           {...field}
 *         />
 *       </FormControl>
 *       <FormDescription>
 *         Include allergies, medical needs, behavioral notes, or anything else we should know
 *       </FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * 
 * // Comment/feedback form
 * <div className="space-y-4">
 *   <Label htmlFor="feedback">How was your child's experience today?</Label>
 *   <Textarea
 *     id="feedback"
 *     placeholder="Share your thoughts about today's activities, meals, nap time, or anything else..."
 *     autoResize
 *     className="min-h-[100px]"
 *   />
 * </div>
 * 
 * // Incident report form
 * <Card>
 *   <CardHeader>
 *     <CardTitle>📋 Daily Report</CardTitle>
 *     <CardDescription>Tell us about your child's day</CardDescription>
 *   </CardHeader>
 *   <CardContent className="space-y-4">
 *     <div className="space-y-2">
 *       <Label htmlFor="activities">🎨 Favorite Activities</Label>
 *       <Textarea
 *         id="activities"
 *         placeholder="What activities did your child enjoy most today?"
 *         rows={3}
 *       />
 *     </div>
 *     
 *     <div className="space-y-2">
 *       <Label htmlFor="mood">😊 Mood & Behavior</Label>
 *       <Textarea
 *         id="mood"
 *         placeholder="How was your child's mood and behavior today?"
 *         rows={3}
 *       />
 *     </div>
 *     
 *     <div className="space-y-2">
 *       <Label htmlFor="notes">📝 Additional Notes</Label>
 *       <Textarea
 *         id="notes"
 *         placeholder="Any other observations or notes about today?"
 *         rows={4}
 *         autoResize
 *       />
 *     </div>
 *   </CardContent>
 * </Card>
 * 
 * // Contact form message
 * <div className="space-y-2">
 *   <Label htmlFor="message" required>Message</Label>
 *   <Textarea
 *     id="message"
 *     placeholder="How can we help you? Please describe your question or concern..."
 *     className="min-h-[150px]"
 *     required
 *   />
 *   <p className="text-xs text-muted-foreground">
 *     We'll get back to you within 24 hours!
 *   </p>
 * </div>
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, autoResize, size = "default", ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!)

    // Auto-resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current
        
        const resizeTextarea = () => {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }

        // Resize on mount if there's initial content
        if (textarea.value) {
          resizeTextarea()
        }

        // Listen for input changes
        textarea.addEventListener('input', resizeTextarea)
        
        return () => textarea.removeEventListener('input', resizeTextarea)
      }
    }, [autoResize])

    const sizeStyles = {
      sm: "text-xs px-2 py-1",
      default: "text-sm px-3 py-2",
      lg: "text-base px-4 py-3"
    }

    return (
      <textarea
        className={cn(
          // Base styling
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent shadow-sm transition-colors",
          // Focus state
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Placeholder styling
          "placeholder:text-muted-foreground",
          // Size styling
          sizeStyles[size],
          // Error state
          error && "border-destructive focus-visible:ring-destructive",
          // Auto-resize styling
          autoResize && "resize-none overflow-hidden",
          className
        )}
        ref={textareaRef}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }