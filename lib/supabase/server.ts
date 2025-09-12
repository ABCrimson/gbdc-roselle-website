/**
 * SUPABASE SERVER-SIDE CLIENTS
 * 
 * This file provides Supabase clients that run on the server-side.
 * There are two types of server clients:
 * 1. Regular server client - respects user authentication and RLS policies
 * 2. Service role client - bypasses RLS, has full database access
 * 
 * Server clients are used for:
 * - Server-side rendering (SSR)
 * - API routes
 * - Server actions
 * - Background jobs
 * - Admin operations
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/database/types'

/**
 * Create a Supabase client for server-side usage with user authentication
 * 
 * This client:
 * - Runs on the server (Next.js Server Components, API routes)
 * - Respects user authentication from cookies
 * - Follows Row Level Security (RLS) policies
 * - Can access user-specific data based on their login status
 * 
 * When to use this client:
 * - Server Components that need user-specific data
 * - API routes that should respect user permissions
 * - Server actions triggered by authenticated users
 * 
 * @returns A Supabase client instance for server use with user context
 * 
 * @example
 * ```typescript
 * // In a Server Component
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export default async function MyPage() {
 *   const supabase = await createClient()
 *   
 *   // This will only return data the current user can access
 *   const { data } = await supabase
 *     .from('children')
 *     .select('*')
 *   
 *   return <div>{JSON.stringify(data)}</div>
 * }
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies()  // Get cookies from Next.js

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,      // Supabase project URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Anonymous/public API key
    {
      cookies: {
        /**
         * Get all cookies from the request
         * This allows Supabase to read authentication tokens
         */
        getAll() {
          return cookieStore.getAll()
        },
        /**
         * Set cookies in the response
         * This allows Supabase to update authentication tokens
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Create a Supabase client with service role privileges (ADMIN ACCESS)
 * 
 * ⚠️  WARNING: This client bypasses all Row Level Security (RLS) policies!
 * It has full read/write access to ALL data in the database.
 * 
 * This client:
 * - Has unlimited database access (like a database admin)
 * - Ignores user authentication
 * - Bypasses all security policies
 * - Should only be used for trusted operations
 * 
 * When to use this client:
 * - Admin operations that need to access any data
 * - Background jobs and automated tasks
 * - Data migration or bulk operations
 * - System maintenance tasks
 * 
 * ⚠️  SECURITY: Never expose this client to user-facing code!
 * 
 * @returns A Supabase client with service role privileges
 * 
 * @example
 * ```typescript
 * // In an admin API route
 * import { createServiceClient } from '@/lib/supabase/server'
 * 
 * export async function POST(request: Request) {
 *   // Only allow admin users to access this endpoint!
 *   const user = await checkAdminPermissions(request)
 *   if (!user.isAdmin) throw new Error('Unauthorized')
 *   
 *   const supabase = await createServiceClient()
 *   
 *   // This can access ALL data regardless of user permissions
 *   const { data } = await supabase
 *     .from('users')
 *     .select('*')  // Gets ALL users
 *   
 *   return Response.json(data)
 * }
 * ```
 */
export async function createServiceClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,       // Supabase project URL
    process.env.SUPABASE_SERVICE_ROLE_KEY!,      // Service role key (ADMIN privileges)
    {
      cookies: {},  // No cookies needed for service role
      auth: {
        autoRefreshToken: false,  // No token refresh needed
        persistSession: false     // No session persistence needed
      }
    }
  )
}