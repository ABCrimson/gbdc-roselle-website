/**
 * 🌈 shadcn/ui Component Library Index
 * 
 * This file exports all the UI components for the Golden Bear Daycare website.
 * Think of it like a table of contents for all our beautiful components!
 * 
 * What this does for kids:
 * This is like having one big toy box where you can find all your favorite toys
 * organized and ready to play with! Instead of looking in many different boxes,
 * you can find everything you need in one place.
 * 
 * For grown-ups:
 * Centralized export file for all shadcn/ui components, making imports cleaner
 * and more manageable across the application. Each component is fully typed
 * with TypeScript and includes comprehensive documentation.
 */

// Utility functions
export * from "./utils"

// Base Components
export * from "./button"
export * from "./card" 
export * from "./input"
export * from "./label"
export * from "./separator"

// Form Components  
export * from "./form"
export * from "./select"
export * from "./checkbox"
export * from "./radio-group"
export * from "./switch"
export * from "./textarea"

// Layout Components
export * from "./dialog"
export * from "./sheet"
export * from "./tabs"
export * from "./accordion"
export * from "./scroll-area"

// Feedback Components
export * from "./toast"
export * from "./use-toast"
export * from "./toaster"
export * from "./alert"
export * from "./badge"
export * from "./progress"
export * from "./skeleton"

// Navigation Components
export * from "./navigation-menu"
export * from "./breadcrumb"
export * from "./dropdown-menu"

/**
 * Component Categories Summary:
 * 
 * 🔧 Base Components (5):
 * - Button: Clickable actions and navigation
 * - Card: Content containers with headers, bodies, and footers
 * - Input: Text input fields for forms
 * - Label: Text labels for form fields
 * - Separator: Visual dividers between content
 * 
 * 📝 Form Components (6):
 * - Form: Complete form management with validation
 * - Select: Dropdown selection menus
 * - Checkbox: Multiple choice selections
 * - RadioGroup: Single choice from multiple options
 * - Switch: Toggle on/off controls
 * - Textarea: Multi-line text input
 * 
 * 🏗️ Layout Components (5):
 * - Dialog: Modal dialogs and popups
 * - Sheet: Slide-in panels from screen edges
 * - Tabs: Tabbed content organization
 * - Accordion: Expandable/collapsible sections
 * - ScrollArea: Custom scrollable content areas
 * 
 * 💬 Feedback Components (7):
 * - Toast: Temporary notification messages
 * - Alert: Persistent important messages
 * - Badge: Status indicators and labels
 * - Progress: Progress bars and completion indicators
 * - Skeleton: Loading state placeholders
 * 
 * 🧭 Navigation Components (3):
 * - NavigationMenu: Main site navigation with dropdowns
 * - Breadcrumb: Hierarchical navigation trails
 * - DropdownMenu: Context menus and action lists
 * 
 * Total: 26 component exports
 * 
 * Usage Examples:
 * 
 * ```tsx
 * // Import individual components
 * import { Button, Card, Input } from "@/components/ui"
 * 
 * // Import specific component parts
 * import { 
 *   Dialog, 
 *   DialogContent, 
 *   DialogHeader, 
 *   DialogTitle 
 * } from "@/components/ui"
 * 
 * // Import utility functions
 * import { cn } from "@/components/ui"
 * ```
 */