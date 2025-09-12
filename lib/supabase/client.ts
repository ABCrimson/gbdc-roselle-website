/**
 * SUPABASE CLIENT-SIDE CLIENT
 * 
 * This file creates a Supabase client that runs in the browser (client-side).
 * It's used for operations that happen after the page loads, like user interactions,
 * real-time subscriptions, and dynamic data loading.
 * 
 * Key characteristics:
 * - Runs in the browser environment
 * - Uses the anonymous (public) key for security
 * - Handles user authentication state
 * - Supports real-time features
 * - Automatically manages browser sessions
 * 
 * When to use this client:
 * - React components and hooks
 * - User interactions (buttons, forms)
 * - Real-time subscriptions
 * - Client-side data fetching
 * 
 * Security considerations:
 * - Uses the public/anonymous key (safe to expose in browser)
 * - Row Level Security (RLS) policies control data access
 * - User authentication tokens are automatically included
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/database/types'

/**
 * Create a Supabase client for browser/client-side usage
 * 
 * This function creates a properly configured Supabase client that:
 * - Works in browser environments (React components, client-side code)
 * - Includes TypeScript types for our database schema
 * - Uses environment variables for configuration
 * - Handles authentication sessions automatically
 * 
 * @returns A Supabase client instance for browser use
 * 
 * @example
 * ```typescript
 * // In a React component
 * import { createClient } from '@/lib/supabase/client'
 * 
 * function MyComponent() {
 *   const supabase = createClient()
 *   
 *   const handleClick = async () => {
 *     const { data } = await supabase
 *       .from('users')
 *       .select('*')
 *   }
 *   
 *   return <button onClick={handleClick}>Load Data</button>
 * }
 * ```
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,      // Supabase project URL (must be public)
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // Anonymous/public API key (safe for browsers)
  )
}