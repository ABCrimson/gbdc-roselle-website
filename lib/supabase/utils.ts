/**
 * 🛠️ SUPABASE UTILITY TOOLBOX
 * 
 * Think of this file as a super helpful toolbox full of useful tools!
 * Just like how a toolbox has different tools for different jobs
 * (hammer for nails, screwdriver for screws, etc.), this file has
 * different functions to help with common Supabase tasks.
 * 
 * What kinds of tools are in here?
 * 🔧 Connection Tools: Check if we can talk to Supabase
 * 🔄 Retry Tools: Try again if something fails  
 * 📦 Batch Tools: Do lots of things at once efficiently
 * 📄 Pagination Tools: Show data page by page (like a book)
 * 📁 File Tools: Upload, download, and manage files
 * ⚡ Performance Tools: Make things faster and more reliable
 * 
 * Why do we need these tools?
 * - Make our code easier to write and understand
 * - Handle common problems automatically
 * - Make the website faster and more reliable
 * - Provide helpful error messages when things go wrong
 * - Follow best practices for database operations
 * 
 * Think of it like:
 * Having a Swiss Army knife instead of carrying around individual tools!
 * Everything you commonly need is in one convenient place.
 * 
 * @version Supabase 2.57.4 (latest tools for the latest Supabase version)
 */

import type { SupabaseClient, PostgrestError } from '@supabase/supabase-js'
import type { Database } from '@/database/types'

/**
 * 🚦 CONNECTION STATUS TYPES
 * 
 * These are like traffic light signals that tell us how our connection to Supabase is doing:
 * 🟢 'connected' = Everything is working great! (green light)
 * 🔴 'disconnected' = We can't reach Supabase (red light)  
 * 🟡 'connecting' = We're trying to connect right now (yellow light)
 * 💥 'error' = Something went wrong (flashing red light)
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error'

/**
 * 📊 CONNECTION STATE INFORMATION
 * 
 * This is like a detailed report about our connection to Supabase.
 * It tells us not just whether it's working, but also:
 * - What's happening right now
 * - Any error messages if something went wrong
 * - When we last checked the connection
 * 
 * Think of it like a health checkup report for our database connection!
 */
export interface ConnectionState {
  status: ConnectionStatus    // How are we doing? (connected, error, etc.)
  message?: string           // A human-readable explanation (like "All good!" or "Can't connect")
  error?: Error             // If something went wrong, the detailed error info
  lastChecked: Date         // When did we last check this? (like a timestamp)
}

/**
 * 🚨 ENHANCED ERROR HANDLING
 * 
 * Regular errors are like saying "Something went wrong" - not very helpful!
 * Our enhanced error class is like having a detailed incident report that tells you:
 * - What exactly went wrong
 * - Why it might have happened  
 * - What error code was involved
 * - Helpful hints for fixing it
 * - Additional technical details
 * 
 * Think of it like the difference between:
 * ❌ "Your car won't start" (not helpful)
 * ✅ "Your car won't start because the battery is dead (code: BATTERY_DEAD), 
 *     try jump-starting it or replacing the battery" (very helpful!)
 */
export class SupabaseError extends Error {
  constructor(
    message: string,                    // What went wrong (in plain English)
    public code?: string,              // The error code (like a diagnostic code)
    public details?: any,              // Extra technical information
    public hint?: string,              // Suggestion for how to fix it
    public statusCode?: number         // HTTP status code (like 404, 500, etc.)
  ) {
    super(message)
    this.name = 'SupabaseError'       // Label this as our special error type
  }

  /**
   * 🔄 CONVERT DATABASE ERRORS TO OUR ENHANCED ERRORS
   * 
   * Sometimes Supabase gives us basic error information. This function
   * takes that basic info and turns it into our detailed error report.
   * 
   * It's like taking a brief text message and turning it into a 
   * full detailed report with all the helpful information included.
   */
  static fromPostgrestError(error: PostgrestError): SupabaseError {
    return new SupabaseError(
      error.message,    // The main error message
      error.code,       // The error code
      error.details,    // Technical details
      error.hint        // Helpful hint for fixing
    )
  }
}

/**
 * 🔍 ERROR TYPE CHECKER
 * 
 * This function is like a detective that looks at an error and determines:
 * "Is this a database error from Supabase or some other kind of error?"
 * 
 * Why do we need this?
 * - Different types of errors need different handling
 * - Database errors have special information we can use
 * - Helps us provide better error messages to users
 * 
 * It's like checking if a problem is with the plumbing (database)
 * or the electrical system (something else) - you need different
 * tools and approaches for each!
 * 
 * @param error - The error we want to examine
 * @returns true if it's a database error, false if it's something else
 */
export function isPostgrestError(error: any): error is PostgrestError {
  return (
    error &&                           // Make sure there's actually an error
    typeof error === 'object' &&      // Make sure it's an object (not just text)
    'message' in error &&             // Does it have a message?
    'code' in error &&                // Does it have an error code?
    'details' in error                // Does it have technical details?
  )
}

/**
 * 🩺 CONNECTION HEALTH CHECKER
 * 
 * This function is like a doctor giving our Supabase connection a health checkup!
 * It tries to do a simple task (like asking "Are you there?") to see if everything
 * is working properly.
 * 
 * How does it work?
 * 1. 👋 Says "Hello" to Supabase by asking for one user ID
 * 2. 👂 Listens for a response 
 * 3. 📊 Analyzes what happened:
 *    - Got a response? Great! Connection is healthy! ✅
 *    - Got "no users found"? That's okay, connection works! ✅
 *    - Got an error? Something's wrong! ❌
 *    - No response at all? Connection is broken! ❌
 * 
 * Why do we test with a user query?
 * - It's a simple, lightweight operation
 * - Every app has users, so the table should exist
 * - We only ask for one ID, so it's super fast
 * - It tests both connection AND database access
 * 
 * Think of it like:
 * Calling a friend to make sure your phone works - if they answer,
 * you know your phone, their phone, and the network all work!
 * 
 * @param supabase - The connection we want to test
 * @returns A detailed report about the connection health
 */
export async function testConnection(
  supabase: SupabaseClient<Database>
): Promise<ConnectionState> {
  try {
    // 👋 Send a simple "hello" message to Supabase
    // We're asking: "Can you give me the ID of just one user?"
    const { data, error } = await supabase
      .from('users')          // Look in the users table
      .select('id')           // Just get the ID (smallest possible data)
      .limit(1)              // Only get one result (fastest possible)
      .single()              // Expect exactly one result

    // 🔍 Check what kind of response we got
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is a special code that means "no rows found"
      // That's actually okay - it means the connection works, there just aren't any users yet!
      // Any OTHER error means there's a real problem
      
      return {
        status: 'error',
        message: `Connection failed: ${error.message}`,
        error: SupabaseError.fromPostgrestError(error),
        lastChecked: new Date(),
      }
    }

    // 🎉 Success! Either we got data, or we got the harmless "no rows" error
    return {
      status: 'connected',
      message: 'Successfully connected to Supabase',
      lastChecked: new Date(),
    }
  } catch (error) {
    // 💥 Something went completely wrong (like network failure)
    return {
      status: 'error',
      message: 'Failed to connect to Supabase',
      error: error instanceof Error ? error : new Error('Unknown error'),
      lastChecked: new Date(),
    }
  }
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  backoffFactor?: number
  retryIf?: (error: any) => boolean
}

const defaultRetryConfig: Required<RetryConfig> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
  retryIf: (error) => {
    // Retry on network errors or 5xx status codes
    if (error?.statusCode && error.statusCode >= 500) return true
    if (error?.code === 'ECONNREFUSED') return true
    if (error?.code === 'ETIMEDOUT') return true
    return false
  },
}

/**
 * Execute a Supabase operation with automatic retry
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config?: RetryConfig
): Promise<T> {
  const finalConfig = { ...defaultRetryConfig, ...config }
  let lastError: any
  let delay = finalConfig.initialDelay

  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (
        attempt === finalConfig.maxAttempts ||
        !finalConfig.retryIf(error)
      ) {
        throw error
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))

      // Increase delay for next attempt
      delay = Math.min(delay * finalConfig.backoffFactor, finalConfig.maxDelay)
    }
  }

  throw lastError
}

/**
 * Batch operations configuration
 */
export interface BatchConfig {
  batchSize?: number
  delayBetweenBatches?: number
  onBatchComplete?: (batchIndex: number, results: any[]) => void
  onBatchError?: (batchIndex: number, error: any) => void
}

/**
 * Execute operations in batches
 */
export async function executeBatch<T, R>(
  items: T[],
  operation: (batch: T[]) => Promise<R[]>,
  config?: BatchConfig
): Promise<R[]> {
  const batchSize = config?.batchSize || 100
  const delayBetweenBatches = config?.delayBetweenBatches || 0
  const results: R[] = []
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchIndex = Math.floor(i / batchSize)
    
    try {
      const batchResults = await operation(batch)
      results.push(...batchResults)
      
      config?.onBatchComplete?.(batchIndex, batchResults)
      
      // Delay between batches if configured
      if (delayBetweenBatches > 0 && i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
      }
    } catch (error) {
      config?.onBatchError?.(batchIndex, error)
      throw error
    }
  }
  
  return results
}

/**
 * Transaction helper for multiple operations
 */
export async function transaction<T>(
  supabase: SupabaseClient<Database>,
  operations: Array<(client: SupabaseClient<Database>) => Promise<any>>
): Promise<T[]> {
  // Note: Supabase doesn't have native transaction support in the client
  // This is a best-effort implementation using RPC
  const results: T[] = []
  
  try {
    for (const operation of operations) {
      const result = await operation(supabase)
      results.push(result)
    }
    return results
  } catch (error) {
    // In a real transaction, we would rollback here
    // With Supabase, we need to handle this at the database level
    throw new SupabaseError(
      'Transaction failed',
      'TRANSACTION_ERROR',
      { results, error }
    )
  }
}

/**
 * Pagination helpers
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Get paginated results from a table
 */
export async function getPaginated<T>(
  supabase: SupabaseClient<Database>,
  table: keyof Database['public']['Tables'],
  params?: PaginationParams
): Promise<PaginatedResponse<T>> {
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Get total count
  const { count } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })

  // Get paginated data
  let query = supabase.from(table).select('*').range(from, to)

  if (params?.orderBy) {
    query = query.order(params.orderBy, {
      ascending: params.orderDirection === 'asc',
    })
  }

  const { data, error } = await query

  if (error) {
    throw SupabaseError.fromPostgrestError(error)
  }

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  return {
    data: (data || []) as T[],
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

/**
 * URL builder for Supabase Storage
 */
export function getPublicUrl(
  supabase: SupabaseClient<Database>,
  bucket: string,
  path: string
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Get signed URL for temporary access
 */
export async function getSignedUrl(
  supabase: SupabaseClient<Database>,
  bucket: string,
  path: string,
  expiresIn: number = 3600
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Failed to create signed URL:', error)
    return null
  }

  return data.signedUrl
}

/**
 * 📤 FILE UPLOADER TOOL
 * 
 * This function is like a digital mail carrier that takes files from users
 * and delivers them safely to our online storage (Supabase Storage)!
 * 
 * What can it handle?
 * - Photos (JPG, PNG, etc.)
 * - Documents (PDF, Word, etc.) 
 * - Any type of file really!
 * 
 * How does it work?
 * 1. 📦 Takes the file from the user
 * 2. 📋 Checks what type of file it is
 * 3. 🏷️ Gives it a name and location
 * 4. 📨 Sends it to our storage bucket
 * 5. 🔗 Returns the web address where people can access it
 * 
 * Special features:
 * - Can choose which "bucket" (folder) to put it in
 * - Can set how long browsers should remember the file (caching)
 * - Can replace existing files or create new ones
 * - Returns a web link so people can view/download the file
 * 
 * Think of it like:
 * A post office that not only delivers your package, but also gives you
 * a tracking number (web link) so anyone can find it later!
 * 
 * @param supabase - Our connection to Supabase
 * @param bucket - Which storage "folder" to put it in (like 'documents' or 'photos')
 * @param path - What to name the file and where in the bucket to put it
 * @param file - The actual file to upload
 * @param options - Extra settings for the upload
 * @returns The web address where the file can be accessed, or null if upload failed
 */
export async function uploadFile(
  supabase: SupabaseClient<Database>,
  bucket: string,
  path: string,
  file: File | Blob,
  options?: {
    cacheControl?: string    // How long should browsers remember this file? (default: 1 hour)
    contentType?: string     // What type of file is this? (usually auto-detected)
    upsert?: boolean        // Should we replace the file if it already exists? (default: no)
  }
): Promise<{ url: string; path: string } | null> {
  // 📨 Send the file to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)                                                  // Choose which storage bucket
    .upload(path, file, {                                         // Upload the file
      cacheControl: options?.cacheControl || '3600',             // Cache for 1 hour by default
      contentType: options?.contentType,                         // File type (auto-detected if not specified)
      upsert: options?.upsert || false,                         // Don't replace existing files by default
    })

  // 💥 Check if something went wrong
  if (error) {
    console.error('Upload failed:', error)
    return null  // Return null to indicate the upload failed
  }

  // 🎉 Success! Get the web address where people can access this file
  const url = getPublicUrl(supabase, bucket, data.path)
  return { url, path: data.path }  // Return both the web address and the file path
}

/**
 * 🗑️ FILE DELETION TOOL
 * 
 * This function is like a digital shredder that safely removes files
 * from our online storage when we no longer need them!
 * 
 * Why delete files?
 * - Save storage space (like cleaning out your closet)
 * - Remove outdated documents
 * - Delete files uploaded by mistake
 * - Clean up after users who delete their accounts
 * - Remove temporary files that are no longer needed
 * 
 * Special features:
 * - Can delete just one file OR multiple files at once
 * - Works with any storage bucket
 * - Returns true/false so you know if it worked
 * - Safely handles errors without crashing
 * 
 * Think of it like:
 * A reliable cleaning service that can clean out one room or your whole house,
 * and always tells you when they're done!
 * 
 * @param supabase - Our connection to Supabase
 * @param bucket - Which storage "folder" to delete from
 * @param paths - The file(s) to delete (can be one file or a list of files)
 * @returns true if deletion succeeded, false if it failed
 */
export async function deleteFile(
  supabase: SupabaseClient<Database>,
  bucket: string,
  paths: string | string[]    // Can be a single file path OR an array of file paths
): Promise<boolean> {
  // 📋 Convert single path to array for consistency (makes our code simpler)
  const pathArray = Array.isArray(paths) ? paths : [paths]
  
  // 🗑️ Send the deletion request to Supabase
  const { error } = await supabase.storage
    .from(bucket)              // Choose which storage bucket
    .remove(pathArray)         // Remove these file(s)

  // 💥 Check if something went wrong
  if (error) {
    console.error('Delete failed:', error)
    return false  // Return false to indicate deletion failed
  }

  return true  // Return true to indicate success!
}

/**
 * Export all utilities
 */
export const supabaseUtils = {
  testConnection,
  withRetry,
  executeBatch,
  transaction,
  getPaginated,
  getPublicUrl,
  getSignedUrl,
  uploadFile,
  deleteFile,
}