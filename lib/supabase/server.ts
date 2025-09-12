/**
 * 🖥️ SUPABASE SERVER-SIDE CLIENTS
 * 
 * This file is like the "back office" phone system for our website!
 * While the browser client works in users' web browsers, these server clients
 * work behind the scenes on our web server (the computer that hosts our website).
 * 
 * What's the difference?
 * 🌐 Browser Client: Works in the user's browser (Chrome, Firefox, etc.)
 *    - Handles user interactions
 *    - Shows data to visitors
 *    - Limited by what browsers can do
 * 
 * 🖥️ Server Client: Works on our web server (before the page is sent to users)
 *    - Prepares pages before users see them
 *    - Has special admin powers
 *    - Can access sensitive operations
 *    - Faster because it's closer to the database
 * 
 * Why do we need server clients?
 * - Pre-load data for faster page loading
 * - Handle sensitive operations (like admin tasks)
 * - Work with user authentication cookies
 * - Process data before sending it to browsers
 * - Provide better SEO (search engines can see the content)
 * 
 * This file provides THREE types of server connections:
 * 1. 👤 Regular user connection (respects user permissions)
 * 2. 🔑 Admin connection (can do anything)
 * 3. 🌐 API connection (for special server routes)
 * 
 * Think of it like:
 * Having different types of phones in an office - some for regular employees,
 * one master phone for the manager, and special phones for different departments!
 * 
 * @version Supabase 2.57.4 (latest version for best performance)
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/database/types'
import { supabaseConfig } from './config'
import { cache } from 'react'

/**
 * 👤 REGULAR USER SERVER CONNECTION
 * 
 * This function creates a server connection that respects user permissions!
 * It's like having a phone that can only call the numbers that the current
 * user is allowed to call.
 * 
 * How it works:
 * 1. Reads the user's login cookies from their browser
 * 2. Creates a connection that knows who is logged in
 * 3. Only shows data that this specific user is allowed to see
 * 4. Respects all security rules (Row Level Security)
 * 
 * Special features:
 * 🚀 Cached: If multiple parts of a page need the same connection,
 *    it reuses the same one instead of creating multiple connections
 * 🔒 Secure: Only shows data the current user is allowed to see
 * 🍪 Cookie-aware: Reads login information from browser cookies
 * ⚡ Fast: Runs on the server so it's closer to the database
 * 
 * When to use this:
 * - In Server Components (pages that load on the server)
 * - When you need user-specific data
 * - For pages that show different content per user
 * - When you want the fastest possible loading times
 * 
 * @returns A connection to Supabase that knows about the current user
 * 
 * @example
 * How to use this in a Server Component (a page that loads on the server):
 * ```tsx
 * // Import the function
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export default async function MyPage() {
 *   // Get a connection that knows about the current user
 *   const supabase = await createClient()
 *   
 *   // Get data - this will only show what this user is allowed to see
 *   const { data, error } = await supabase
 *     .from('users')           // Look in the users table
 *     .select('*')             // Get all columns
 *   
 *   if (error) {
 *     return <div>Sorry, something went wrong!</div>
 *   }
 *   
 *   // Show the data on the webpage
 *   return (
 *     <div>
 *       <h1>User Information</h1>
 *       {data?.map(user => (
 *         <p key={user.id}>{user.name}</p>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export const createClient = cache(async (): Promise<SupabaseClient<Database>> => {
  // Get the user's cookies (these contain their login information)
  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseConfig.url,      // Where our database lives
    supabaseConfig.anonKey,  // Public access key (not the admin key!)
    {
      // 🍪 Cookie handling (how we read and write login information)
      cookies: {
        // Read all cookies from the user's browser
        getAll() {
          return cookieStore.getAll()
        },
        // Try to save new cookies (like updated login tokens)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Sometimes we can't save cookies in Server Components - that's okay!
            // This happens because of how Next.js works, and it's expected
          }
        },
      },
      // 🔐 Authentication settings (how to handle user logins)
      auth: {
        autoRefreshToken: supabaseConfig.auth.autoRefreshToken,  // Keep users logged in
        persistSession: supabaseConfig.auth.persistSession,     // Remember login sessions
        detectSessionInUrl: false,                              // Don't check URLs for login info (not needed on server)
        flowType: supabaseConfig.auth.flowType,                 // Use secure login method
      },
      // 🗄️ Database settings
      db: supabaseConfig.db,
      // 🌍 Network settings (how to communicate)
      global: {
        ...supabaseConfig.global,
        fetch: fetch,  // Use the server's built-in fetch function (faster than browser fetch)
      },
    }
  )
})

/**
 * 🔑 ADMIN/SERVICE ROLE CONNECTION (SUPER USER ACCESS)
 * 
 * ⚠️ SUPER IMPORTANT WARNING: This is like the MASTER KEY to everything!
 * 
 * This function creates a connection with UNLIMITED ACCESS to the database.
 * It's like having the master key that opens every door in the building,
 * reads every file, and can change anything!
 * 
 * What makes this so powerful?
 * - Bypasses ALL security rules (Row Level Security)
 * - Can read ANY data from ANY table
 * - Can modify/delete ANY record
 * - Can access data from ALL users
 * - Has administrative privileges
 * 
 * When should you use this? (Very carefully!)
 * ✅ Admin operations (like generating reports for all users)
 * ✅ Data migration tasks
 * ✅ Automated system tasks (like sending emails to everyone)
 * ✅ Server-side operations that need to access all data
 * ✅ Cleanup tasks and maintenance
 * 
 * When should you NEVER use this?
 * ❌ For regular user operations
 * ❌ In browser/client-side code
 * ❌ When you only need to access one user's data
 * ❌ For anything a regular user should be able to do
 * 
 * Think of it like:
 * The difference between a regular employee badge (regular client) and 
 * the CEO's master keycard that opens every door (service client)
 * 
 * @returns A connection with full admin access to everything in the database
 * 
 * @example
 * How to use this in an admin API route (be very careful!):
 * ```tsx
 * // This should only be in admin-only API routes!
 * import { createServiceClient } from '@/lib/supabase/server'
 * 
 * export async function POST(request: Request) {
 *   // First, verify this is actually an admin user!
 *   // (Add your admin verification logic here)
 *   
 *   // Get the super-powerful connection
 *   const supabase = await createServiceClient()
 *   
 *   // This can access ALL user data (be careful!)
 *   const { data } = await supabase
 *     .from('users')
 *     .select('*')  // Gets ALL users, not just the current user
 *   
 *   return Response.json(data)
 * }
 * ```
 */
export const createServiceClient = cache(async (): Promise<SupabaseClient<Database>> => {
  // First, make sure we have the master key configured
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  }

  return createServerClient<Database>(
    supabaseConfig.url,                        // Where our database lives
    process.env.SUPABASE_SERVICE_ROLE_KEY,     // The MASTER KEY (not the regular public key!)
    {
      // 🍪 No cookie handling needed (this doesn't care about user sessions)
      cookies: {},
      // 🔐 No authentication needed (we're using the master key)
      auth: {
        autoRefreshToken: false,    // Don't refresh tokens (master key doesn't expire)
        persistSession: false,      // Don't save sessions (no user sessions here)
        detectSessionInUrl: false,  // Don't look for login info in URLs
      },
      // 🗄️ Database settings
      db: supabaseConfig.db,
      // 🌍 Network settings
      global: {
        ...supabaseConfig.global,
        fetch: fetch,  // Use server's fetch function
      },
    }
  )
})

/**
 * 🌐 API ROUTE CONNECTION (SPECIAL SERVER ENDPOINTS)
 * 
 * This function creates a connection specifically for API routes!
 * API routes are like special "phone extensions" that handle specific requests,
 * such as form submissions, file uploads, or data processing.
 * 
 * What makes this different from regular server clients?
 * - Works in API routes (not regular pages)
 * - Has special cookie handling for requests and responses
 * - Can read user authentication AND send back updated cookies
 * - Perfect for form processing and data manipulation
 * 
 * When to use this:
 * ✅ API routes that need to know who the user is
 * ✅ Form submission handlers
 * ✅ File upload endpoints
 * ✅ Any API that needs user authentication
 * ✅ When you need to update user login information
 * 
 * Think of it like:
 * A special reception desk phone that not only answers calls but can also
 * send messages back to the caller with updated information!
 * 
 * @param request - The incoming request (like a phone call coming in)
 * @param response - The response we'll send back (like our reply to the caller)
 * @returns A connection that can read user info and update cookies
 * 
 * @example
 * How to use this in an API route (like app/api/update-profile/route.ts):
 * ```tsx
 * import { createApiClient } from '@/lib/supabase/server'
 * 
 * export async function POST(request: Request) {
 *   // Create a response object to send back
 *   const response = new Response()
 *   
 *   // Get a connection that knows about the user and can update cookies
 *   const supabase = createApiClient(request, response)
 *   
 *   // Get the data from the form submission
 *   const formData = await request.json()
 *   
 *   // Update the user's profile (this respects user permissions)
 *   const { data, error } = await supabase
 *     .from('users')
 *     .update({ name: formData.name })
 *     .eq('id', formData.userId)
 *   
 *   if (error) {
 *     return Response.json({ error: error.message }, { status: 400 })
 *   }
 *   
 *   // Send success response (any cookie updates are automatically included)
 *   return Response.json({ success: true, data })
 * }
 * ```
 */
export function createApiClient(
  request: Request,
  response: Response
): SupabaseClient<Database> {
  // Get access to the cookie system
  const cookieStore = cookies()
  
  return createServerClient<Database>(
    supabaseConfig.url,      // Where our database lives
    supabaseConfig.anonKey,  // Public access key (respects user permissions)
    {
      // 🍪 Special cookie handling for API routes
      cookies: {
        // Read all cookies from the incoming request
        getAll() {
          return cookieStore.getAll()
        },
        // Send updated cookies back to the user's browser
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Format the cookie properly for the browser
            const serializedCookie = `${name}=${value}; ${Object.entries(options || {})
              .map(([k, v]) => `${k}=${v}`)
              .join('; ')}`
            // Add it to the response headers so the browser receives it
            response.headers.append('Set-Cookie', serializedCookie)
          })
        },
      },
      // 🔐 Use all our standard authentication settings
      auth: supabaseConfig.auth,
      // 🗄️ Database settings
      db: supabaseConfig.db,
      // 🌍 Network settings
      global: supabaseConfig.global,
    }
  )
}

/**
 * 📝 TYPE DEFINITIONS FOR SERVER CLIENTS
 * 
 * These are "labels" that help TypeScript understand what type of
 * connections we're working with. Think of them like name tags at a conference:
 * 
 * - ServerClient: "Hi, I'm a regular user connection"
 * - ServiceClient: "Hi, I'm an admin/super-user connection"
 * 
 * Other files can import these types to make sure they're using
 * the right type of connection for their needs.
 */
export type ServerClient = SupabaseClient<Database>
export type ServiceClient = SupabaseClient<Database>