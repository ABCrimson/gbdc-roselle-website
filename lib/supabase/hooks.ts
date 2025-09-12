/**
 * 🪝 SUPABASE REACT HOOKS
 * 
 * Think of React hooks as "superpowers" for React components!
 * Just like how a superhero has different powers (flying, strength, x-ray vision),
 * these hooks give our React components different superpowers for working with Supabase.
 * 
 * What superpowers do these hooks provide?
 * 🔐 Authentication Powers: Know who's logged in, help people sign in/out
 * 📡 Real-time Powers: Get instant updates when data changes
 * 📊 Data Fetching Powers: Get data from the database automatically  
 * 📤 File Upload Powers: Handle file uploads with progress tracking
 * 🔌 Connection Powers: Monitor if we're connected to Supabase
 * 🎣 Edge Function Powers: Call our special helper functions
 * 
 * Why use hooks instead of regular functions?
 * - They automatically update your component when things change
 * - They handle complex state management for you
 * - They clean up after themselves (no memory leaks!)
 * - They follow React best practices
 * - They make your code cleaner and easier to understand
 * 
 * Think of it like:
 * Instead of manually checking your mailbox every 5 minutes, these hooks are like
 * having a personal assistant who automatically tells you when new mail arrives!
 * 
 * ⚠️ IMPORTANT: These hooks only work in React components that run in the browser
 * (not in Server Components). That's why we have 'use client' at the top.
 * 
 * @version Supabase 2.57.4 (hooks designed for the latest Supabase version)
 */

'use client'  // This tells Next.js these hooks only work in the browser

import { useEffect, useState, useCallback, useRef } from 'react'
import type { SupabaseClient, User, Session, RealtimeChannel } from '@supabase/supabase-js'
import type { Database } from '@/database/types'
import { createClient } from './client'
import { testConnection, type ConnectionState } from './utils'
import { createEdgeFunctionsClient, type EdgeFunctionsClient } from './edge-functions'

/**
 * 🔌 THE BASIC SUPABASE CONNECTION HOOK
 * 
 * This hook is like having a "phone" that's always ready to call Supabase!
 * Every time you use this hook in a component, you get a working connection
 * that you can use to read data, save data, upload files, etc.
 * 
 * It's the most basic hook - think of it as the "dial tone" that tells you
 * your phone is working and ready to make calls.
 * 
 * @returns A ready-to-use Supabase client for database operations
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const supabase = useSupabase()
 *   
 *   const handleClick = async () => {
 *     const { data, error } = await supabase
 *       .from('users')
 *       .select('*')
 *   }
 * }
 * ```
 */
export function useSupabase(): SupabaseClient<Database> {
  return createClient()
}

/**
 * 🚀 THE EDGE FUNCTIONS HOOK
 * 
 * This hook gives you access to all our special "helper functions" in the cloud!
 * Instead of just talking to the database, this lets you use our magical assistants
 * that can send emails, process documents, handle payments, and more.
 * 
 * Think of it like:
 * useSupabase() = Having a phone to call the database directly
 * useEdgeFunctions() = Having speed-dial buttons for all our helpful services
 * 
 * @returns A client that can call all our Edge Functions (special helper services)
 * 
 * @example
 * ```tsx
 * function WelcomeEmail() {
 *   const edgeFunctions = useEdgeFunctions()
 *   
 *   const sendWelcome = async () => {
 *     await edgeFunctions.sendWelcomeEmail({
 *       parentName: "John Doe",
 *       parentEmail: "john@example.com",
 *       childName: "Emma",
 *       enrollmentDate: "2024-01-15"
 *     })
 *   }
 * }
 * ```
 */
export function useEdgeFunctions(): EdgeFunctionsClient {
  const supabase = useSupabase()
  return createEdgeFunctionsClient(supabase)
}

/**
 * 🔐 THE AUTHENTICATION MASTER HOOK
 * 
 * This is like having a smart security guard for your component!
 * It keeps track of who's logged in, helps people sign in/out, and automatically
 * updates your component when someone's login status changes.
 * 
 * What does this hook track?
 * - Is someone currently logged in?
 * - Who is the current user? (name, email, etc.)
 * - What's their current session information?
 * - Are we still checking the login status? (loading state)
 * 
 * What can this hook do?
 * - Sign people in with email/password
 * - Create new user accounts
 * - Sign people out
 * - Reset passwords
 * - Update user profiles
 * 
 * The magical part:
 * This hook automatically updates your component whenever someone logs in or out,
 * even if they do it in another browser tab! It's like having a security camera
 * that instantly notifies you of any changes.
 * 
 * Think of it like:
 * A smart doorman who not only knows who's allowed in, but also helps people
 * check in, check out, and automatically tells you whenever someone's status changes!
 * 
 * @returns An object with user info, login status, and authentication functions
 */
export function useAuth() {
  const supabase = useSupabase()
  
  // 📊 State variables (these store the current authentication information)
  const [user, setUser] = useState<User | null>(null)        // Who is logged in? (or null if nobody)
  const [session, setSession] = useState<Session | null>(null)  // Their login session details
  const [loading, setLoading] = useState(true)              // Are we still checking? (true = still checking)

  useEffect(() => {
    // 🔍 Check who's currently logged in when this hook first starts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)                    // Save the session info
      setUser(session?.user ?? null)        // Save the user info (or null if no session)
      setLoading(false)                      // We're done checking!
    })

    // 👂 Listen for any changes to authentication (login, logout, etc.)
    // This is the "magic" part - it automatically updates when things change!
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Something changed! Update our information
      setSession(session)                    // Update session
      setUser(session?.user ?? null)        // Update user
      setLoading(false)                      // We're not loading anymore
    })

    // 🧹 Clean up when this component is removed (prevents memory leaks)
    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    },
    [supabase]
  )

  const signUp = useCallback(
    async (email: string, password: string, metadata?: Record<string, any>) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      return { data, error }
    },
    [supabase]
  )

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }, [supabase])

  const resetPassword = useCallback(
    async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { data, error }
    },
    [supabase]
  )

  const updateUser = useCallback(
    async (attributes: { email?: string; password?: string; data?: Record<string, any> }) => {
      const { data, error } = await supabase.auth.updateUser(attributes)
      return { data, error }
    },
    [supabase]
  )

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUser,
    isAuthenticated: !!user,
  }
}

/**
 * Hook to check Supabase connection status
 */
export function useConnectionStatus() {
  const supabase = useSupabase()
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: 'connecting',
    lastChecked: new Date(),
  })

  const checkConnection = useCallback(async () => {
    const state = await testConnection(supabase)
    setConnectionState(state)
    return state
  }, [supabase])

  useEffect(() => {
    checkConnection()

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [checkConnection])

  return {
    ...connectionState,
    checkConnection,
  }
}

/**
 * Hook for real-time subscriptions
 */
export function useRealtime<T extends keyof Database['public']['Tables']>(
  table: T,
  options?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
    filter?: string
    onInsert?: (payload: any) => void
    onUpdate?: (payload: any) => void
    onDelete?: (payload: any) => void
    onChange?: (payload: any) => void
  }
) {
  const supabase = useSupabase()
  const channelRef = useRef<RealtimeChannel | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: options?.event || '*',
          schema: 'public',
          table: table as string,
          filter: options?.filter,
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              options?.onInsert?.(payload)
              break
            case 'UPDATE':
              options?.onUpdate?.(payload)
              break
            case 'DELETE':
              options?.onDelete?.(payload)
              break
          }
          options?.onChange?.(payload)
        }
      )
      .subscribe((status) => {
        setIsSubscribed(status === 'SUBSCRIBED')
      })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
    }
  }, [supabase, table, options])

  const unsubscribe = useCallback(() => {
    channelRef.current?.unsubscribe()
    setIsSubscribed(false)
  }, [])

  return {
    isSubscribed,
    unsubscribe,
  }
}

/**
 * Hook for fetching data with loading and error states
 */
export function useQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await queryFn()
      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [queryFn])

  useEffect(() => {
    execute()
  }, dependencies)

  return {
    data,
    loading,
    error,
    refetch: execute,
  }
}

/**
 * Hook for mutations with loading and error states
 */
export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<{ data: TData | null; error: any }>
) {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const mutate = useCallback(
    async (variables: TVariables) => {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await mutationFn(variables)
        if (error) throw error
        setData(data)
        return { data, error: null }
      } catch (err) {
        setError(err)
        return { data: null, error: err }
      } finally {
        setLoading(false)
      }
    },
    [mutationFn]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    mutate,
    data,
    loading,
    error,
    reset,
  }
}

/**
 * Hook for paginated data fetching
 */
export function usePagination<T>(
  table: keyof Database['public']['Tables'],
  options?: {
    pageSize?: number
    orderBy?: string
    orderDirection?: 'asc' | 'desc'
    filter?: Record<string, any>
  }
) {
  const supabase = useSupabase()
  const [page, setPage] = useState(1)
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [totalCount, setTotalCount] = useState(0)

  const pageSize = options?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const fetchPage = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from(table).select('*', { count: 'exact' })

      // Apply filters
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy, {
          ascending: options.orderDirection === 'asc',
        })
      }

      // Apply pagination
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      setData((data || []) as T[])
      setTotalCount(count || 0)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [supabase, table, page, pageSize, from, to, options])

  useEffect(() => {
    fetchPage()
  }, [page])

  const totalPages = Math.ceil(totalCount / pageSize)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1

  const nextPage = useCallback(() => {
    if (hasNextPage) setPage(p => p + 1)
  }, [hasNextPage])

  const previousPage = useCallback(() => {
    if (hasPreviousPage) setPage(p => p - 1)
  }, [hasPreviousPage])

  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber)
    }
  }, [totalPages])

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
    refetch: fetchPage,
  }
}

/**
 * Hook for file uploads
 */
export function useFileUpload(bucket: string) {
  const supabase = useSupabase()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<any>(null)

  const upload = useCallback(
    async (file: File, path?: string) => {
      setUploading(true)
      setError(null)
      setProgress(0)

      try {
        const fileName = path || `${Date.now()}-${file.name}`
        
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (error) throw error

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path)

        setProgress(100)
        return { path: data.path, url: publicUrl }
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setUploading(false)
      }
    },
    [supabase, bucket]
  )

  const remove = useCallback(
    async (path: string) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])
      
      if (error) {
        setError(error)
        throw error
      }
    },
    [supabase, bucket]
  )

  return {
    upload,
    remove,
    uploading,
    progress,
    error,
  }
}