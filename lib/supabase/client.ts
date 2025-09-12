/**
 * 🌐 SUPABASE BROWSER CLIENT
 * 
 * This file is like a "phone" that our website uses to talk to Supabase!
 * But this is a special phone that only works inside web browsers (like Chrome, Firefox, Safari).
 * 
 * What does this file do?
 * - Creates a connection between our website and the Supabase database
 * - Handles user login/logout in the browser
 * - Fetches data that users can see (like their profile, enrollment status)
 * - Updates information when users fill out forms
 * - Keeps the connection secure and fast
 * 
 * Why is it special?
 * - It works with cookies (those little files websites use to remember you)
 * - It automatically refreshes login tokens so users stay logged in
 * - It's optimized for Next.js (the framework our website uses)
 * - It follows the newest security patterns
 * 
 * Think of it like:
 * Your personal assistant who handles all your phone calls to the daycare office,
 * remembers who you are, and makes sure all your information stays private!
 * 
 * @version Supabase 2.57.4 (we're using the latest version for best performance)
 */

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/database/types'
import { supabaseConfig } from './config'

/**
 * 🔒 THE SINGLE CLIENT INSTANCE
 * 
 * This is like having ONE special phone line to Supabase instead of creating
 * a new phone line every time we need to make a call.
 * 
 * Why use just one?
 * - Prevents confusion (like having multiple people on the same call)
 * - Saves memory and makes the website faster
 * - Maintains consistent login state across all parts of the website
 * - Follows the "Singleton Pattern" (a fancy programming concept that means "just one")
 * 
 * Think of it like:
 * Having one main phone number for the whole family instead of everyone
 * getting their own phone line - it's more organized and efficient!
 */
let browserClient: SupabaseClient<Database> | undefined

/**
 * 📞 THE MAIN "PHONE DIALER" FUNCTION
 * 
 * This function is like a smart phone that either:
 * 1. Dials Supabase for the first time (creates a new connection)
 * 2. Uses the existing connection if we've already dialed before
 * 
 * It's smart because it doesn't waste time creating multiple connections!
 * 
 * How it works:
 * 1. Check: "Do we already have a phone connection?"
 * 2. If NO: Create a new connection with all our settings
 * 3. If YES: Just use the existing one
 * 4. Return the connection so other parts of the app can use it
 * 
 * What settings does it use?
 * - Database address and security keys (from our config file)
 * - Authentication settings (how to handle logins)
 * - Real-time settings (for instant updates)
 * - Security headers (for safe communication)
 * 
 * @returns A ready-to-use connection to Supabase that our React components can use
 * 
 * @example
 * How to use this in a React component:
 * ```tsx
 * // Import the function
 * import { createClient } from '@/lib/supabase/client'
 * 
 * export function MyComponent() {
 *   // Get our connection to Supabase
 *   const supabase = createClient()
 *   
 *   // Use it to get data from the database
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       // Ask Supabase for all users
 *       const { data, error } = await supabase
 *         .from('users')      // Look in the 'users' table
 *         .select('*')        // Get all columns
 *       
 *       if (error) {
 *         console.error('Oops, something went wrong:', error)
 *       } else {
 *         console.log('Got user data:', data)
 *       }
 *     }
 *     fetchData()
 *   }, [])
 * }
 * ```
 */
export function createClient(): SupabaseClient<Database> {
  // Check if we already have a connection (like checking if the phone is already dialed)
  if (!browserClient) {
    // We don't have one yet, so create a new connection
    browserClient = createBrowserClient<Database>(
      supabaseConfig.url,      // Where to call (the Supabase server address)
      supabaseConfig.anonKey,  // Our "caller ID" (the public access key)
      {
        // 🔐 Authentication settings (how to handle user logins)
        auth: {
          autoRefreshToken: supabaseConfig.auth.autoRefreshToken,     // Keep users logged in automatically
          persistSession: supabaseConfig.auth.persistSession,         // Remember login when browser closes
          detectSessionInUrl: supabaseConfig.auth.detectSessionInUrl, // Check URL for login info
          flowType: supabaseConfig.auth.flowType,                     // Use the most secure login method
          storage: supabaseConfig.auth.storage,                       // Where to store login tokens
          storageKey: supabaseConfig.auth.storageKey,                 // What to name the login file
        },
        // ⚡ Real-time settings (for instant updates)
        realtime: supabaseConfig.realtime,
        // 🗄️ Database settings
        db: supabaseConfig.db,
        // 🌍 Global communication settings
        global: supabaseConfig.global,
      }
    )
  }
  
  // Return the connection (either the one we just made or the existing one)
  return browserClient
}

/**
 * 🔍 CHECK IF WE ALREADY HAVE A CONNECTION
 * 
 * This function is like checking "Do we already have a phone line open?"
 * without actually dialing the number if we don't.
 * 
 * When would you use this?
 * - To check if someone already created a connection
 * - To avoid creating a new connection if you just want to check
 * - For debugging (finding out what's happening)
 * 
 * It's like peeking to see if your phone is already connected to a call,
 * but not making a call if it isn't.
 * 
 * @returns Either the existing connection, or 'undefined' (meaning "nothing") if no connection exists yet
 * 
 * @example
 * ```tsx
 * // Check if we already have a connection
 * const existingClient = getClient()
 * 
 * if (existingClient) {
 *   console.log("Great! We already have a connection to Supabase")
 * } else {
 *   console.log("No connection yet, we'll need to create one")
 * }
 * ```
 */
export function getClient(): SupabaseClient<Database> | undefined {
  return browserClient
}

/**
 * 🗑️ RESET THE CONNECTION (CLEAR EVERYTHING)
 * 
 * This function is like "hanging up the phone" and clearing the line completely.
 * After calling this, it's like we never made a connection at all.
 * 
 * When would you use this?
 * - During testing (to start fresh for each test)
 * - When switching between different Supabase projects
 * - If something goes wrong and you need to start over
 * - When logging out and want to completely clear the connection
 * 
 * It's like clearing your browser history - everything gets reset to the beginning.
 * 
 * ⚠️ Warning: After calling this, you'll need to call createClient() again 
 * to make a new connection!
 * 
 * @example
 * ```tsx
 * // Clear the existing connection
 * clearClient()
 * 
 * // Now we need to create a new one
 * const freshClient = createClient()
 * ```
 */
export function clearClient(): void {
  browserClient = undefined
}

/**
 * 📝 TYPE DEFINITION FOR OTHER FILES
 * 
 * This creates a "blueprint" or "instruction sheet" that other files can use
 * to understand exactly what type of Supabase client they're working with.
 * 
 * Think of it like a product label that tells you:
 * - What this thing is (a Supabase client)
 * - What database it connects to (our GBDC database)
 * - What you can do with it (all the standard Supabase operations)
 * 
 * Other files can import this type to make sure they're using the client correctly.
 */
export type SupabaseClientType = SupabaseClient<Database>