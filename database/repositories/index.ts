/**
 * REPOSITORY MODULE INDEX
 * 
 * This file serves as the entry point for all repository classes in the database module.
 * It exports individual repository classes and provides a convenient factory function
 * to create all repositories at once with a shared Supabase client.
 * 
 * Repositories provide a clean abstraction layer between the application and the database.
 * Each repository handles operations for a specific table and includes:
 * - Standard CRUD operations (inherited from BaseRepository)
 * - Specialized queries for that table's data
 * - Business logic related to that data type
 * 
 * Usage examples:
 * - import { UsersRepository, ChildrenRepository } from '@/database/repositories'
 * - import { createRepositories } from '@/database/repositories'
 * - const repos = createRepositories(supabaseClient)
 */

/**
 * Export individual repository classes
 * Use these if you only need specific repositories in your code
 */
export { BaseRepository } from './base.repository'       // Abstract base class for common operations
export { UsersRepository } from './users.repository'     // User account management
export { ChildrenRepository } from './children.repository' // Child enrollment and information

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types'
import { UsersRepository } from './users.repository'
import { ChildrenRepository } from './children.repository'

/**
 * Factory function to create all repository instances with a shared Supabase client
 * 
 * This is the recommended way to create repositories because:
 * - All repositories share the same database connection
 * - Consistent configuration across all repositories
 * - Easy to add new repositories in the future
 * - Type-safe access to all repositories
 * 
 * @param supabase - The Supabase client instance for database operations
 * @returns Object containing all repository instances
 * 
 * @example
 * ```typescript
 * const supabase = createClient(url, key)
 * const repositories = createRepositories(supabase)
 * 
 * // Now you can use any repository
 * const user = await repositories.users.findByEmail('user@example.com')
 * const children = await repositories.children.findByParent(userId)
 * ```
 */
export function createRepositories(supabase: SupabaseClient<Database>) {
  return {
    users: new UsersRepository(supabase),           // User management operations
    children: new ChildrenRepository(supabase),     // Child management operations
    // Add new repositories here as they're created
  }
}

/**
 * Type definition for the repositories object returned by createRepositories
 * 
 * This type provides TypeScript intellisense and type checking when using
 * the repositories object throughout the application.
 * 
 * @example
 * ```typescript
 * function useRepositories(): Repositories {
 *   const supabase = createClient(url, key)
 *   return createRepositories(supabase)
 * }
 * ```
 */
export type Repositories = ReturnType<typeof createRepositories>