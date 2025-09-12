import * as React from "react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * 📋 Form Components - Like a special organizer for collecting information!
 * 
 * What it does for kids:
 * Forms are like special pages where people can write information, just like
 * when you fill out a form to join a club or sign up for a fun activity!
 * These components help make sure all the information is collected properly
 * and shows helpful messages when someone needs to fix something.
 * 
 * For grown-ups:
 * A comprehensive form system built on React Hook Form with Radix UI integration.
 * Provides form context, field validation, error handling, and accessibility features.
 * Works seamlessly with Zod schema validation and other form validation libraries.
 * 
 * Features:
 * - Integration with React Hook Form
 * - Automatic error handling and display
 * - Field-level validation feedback
 * - Accessible form controls with proper ARIA attributes
 * - Consistent styling with design system
 * - Support for complex form layouts
 * - TypeScript support with type safety
 */

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/**
 * FormField Component
 * 
 * Connects a form control to React Hook Form validation
 */
type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /**
   * The name of the field in the form data
   */
  name: TName
} & ControllerProps<TFieldValues, TName>

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * FormItem Component
 * 
 * Container for a single form field with proper spacing and context
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * FormLabel Component
 * 
 * Label for form fields with automatic association and error states
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/**
 * FormControl Component
 * 
 * Wrapper for form controls (inputs, selects, etc.) with proper accessibility
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/**
 * FormDescription Component
 * 
 * Help text that describes what the field is for
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/**
 * FormMessage Component
 * 
 * Error message that appears when validation fails
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

/**
 * Example Usage:
 * 
 * ```tsx
 * import { useForm } from "react-hook-form"
 * import { zodResolver } from "@hookform/resolvers/zod"
 * import { z } from "zod"
 * 
 * // Create a schema (like rules for the form)
 * const formSchema = z.object({
 *   childName: z.string().min(1, "Please enter your child's name"),
 *   age: z.number().min(1).max(18, "Age must be between 1 and 18"),
 *   parentEmail: z.string().email("Please enter a valid email address"),
 * })
 * 
 * function EnrollmentForm() {
 *   const form = useForm<z.infer<typeof formSchema>>({
 *     resolver: zodResolver(formSchema),
 *     defaultValues: {
 *       childName: "",
 *       age: 0,
 *       parentEmail: "",
 *     },
 *   })
 * 
 *   function onSubmit(values: z.infer<typeof formSchema>) {
 *     console.log("Form data:", values)
 *   }
 * 
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 *         
 *         {/* Child's name field */}
 *         <FormField
 *           control={form.control}
 *           name="childName"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel required>Child's Name</FormLabel>
 *               <FormControl>
 *                 <Input placeholder="Enter your child's full name" {...field} />
 *               </FormControl>
 *               <FormDescription>
 *                 This helps us know who we'll be caring for!
 *               </FormDescription>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 * 
 *         {/* Child's age field */}
 *         <FormField
 *           control={form.control}
 *           name="age"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel required>Child's Age</FormLabel>
 *               <FormControl>
 *                 <Input 
 *                   type="number" 
 *                   placeholder="Age in years" 
 *                   {...field} 
 *                   onChange={(e) => field.onChange(Number(e.target.value))}
 *                 />
 *               </FormControl>
 *               <FormDescription>
 *                 This helps us plan age-appropriate activities
 *               </FormDescription>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 * 
 *         {/* Parent email field */}
 *         <FormField
 *           control={form.control}
 *           name="parentEmail"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel required>Parent Email</FormLabel>
 *               <FormControl>
 *                 <Input 
 *                   type="email" 
 *                   placeholder="your-email@example.com" 
 *                   {...field} 
 *                 />
 *               </FormControl>
 *               <FormDescription>
 *                 We'll use this to send updates about your child
 *               </FormDescription>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 * 
 *         <Button type="submit">Enroll My Child</Button>
 *       </form>
 *     </Form>
 *   )
 * }
 * ```
 */

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}