import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

/**
 * 🍞 Toaster Component - The magical container that shows all toast messages!
 * 
 * What it does for kids:
 * The Toaster is like having a special mailbox where all the pop-up messages
 * appear! When the website wants to tell you something important (like "Great job!"
 * or "Don't forget your lunch!"), the message appears in this special area.
 * It's like having a friendly messenger that brings you notes!
 * 
 * For grown-ups:
 * The Toaster component renders all active toast notifications. It should be
 * placed once in your root layout to provide toast functionality across your
 * entire application. Works with the useToast hook to display notifications.
 * 
 * Features:
 * - Automatically renders all active toasts
 * - Handles toast positioning and stacking
 * - Provides consistent styling across all toasts
 * - Manages toast lifecycle and animations
 * - Supports all toast variants and actions
 * - Screen reader accessible
 * 
 * @example
 * ```tsx
 * // Add this to your root layout (layout.tsx or _app.tsx)
 * import { Toaster } from "@/components/ui/toaster"
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <main>{children}</main>
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}