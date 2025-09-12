/**
 * SUPABASE MIDDLEWARE
 * 
 * This file provides middleware functions for managing user authentication
 * sessions in Next.js. The middleware runs before pages are rendered and
 * ensures that user authentication tokens are fresh and valid.
 * 
 * Key functions:
 * - Refreshes expired authentication tokens
 * - Maintains user sessions across requests
 * - Updates cookies with fresh authentication data
 * - Enables Server Components to access user information
 * 
 * How it works:
 * 1. Middleware runs on every request
 * 2. Checks if user authentication token is expired
 * 3. If expired, automatically refreshes it
 * 4. Updates cookies with fresh tokens
 * 5. Passes request to the page with valid authentication
 * 
 * This is essential for keeping users logged in and allowing
 * Server Components to know who the current user is.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/database/types'

/**
 * Update the user's authentication session
 * 
 * This function runs as Next.js middleware and ensures that:
 * - User authentication tokens are fresh and valid
 * - Expired tokens are automatically refreshed
 * - Server Components can access the current user's information
 * - Authentication state is maintained across page navigation
 * 
 * How it works:
 * 1. Creates a Supabase client configured for middleware
 * 2. Reads authentication cookies from the request
 * 3. Checks if the user's session is valid/expired
 * 4. If expired, refreshes the session automatically
 * 5. Updates response cookies with fresh authentication data
 * 6. Returns the response with updated authentication
 * 
 * @param request - The incoming Next.js request object
 * @returns A Next.js response with updated authentication cookies
 * 
 * Usage in middleware.ts (at project root):
 * ```typescript
 * import { updateSession } from '@/lib/supabase/middleware'
 * 
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 * 
 * export const config = {
 *   matcher: [
 *     '/((?!_next/static|_next/image|favicon.ico).*)',
 *   ],
 * }
 * ```
 */
export async function updateSession(request: NextRequest) {
  // Start with a basic response that continues to the page
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create a Supabase client configured for middleware
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,      // Supabase project URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Anonymous/public API key
    {
      cookies: {
        /**
         * Read all cookies from the incoming request
         * This gets the user's current authentication tokens
         */
        getAll() {
          return request.cookies.getAll()
        },
        
        /**
         * Set cookies in both the request and response
         * This updates authentication tokens if they were refreshed
         */
        setAll(cookiesToSet) {
          // First, update the request cookies (for this request)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          
          // Create a new response with the updated request
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // Then update the response cookies (for future requests)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This call refreshes the user's session if it's expired
  // It's required for Server Components to have access to user information
  await supabase.auth.getUser()

  return supabaseResponse
}