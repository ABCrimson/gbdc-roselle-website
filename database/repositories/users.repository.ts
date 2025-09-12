/**
 * USERS REPOSITORY
 * 
 * This repository provides specialized database operations for managing user accounts
 * in the daycare management system. It handles authentication-related queries and
 * user management operations for administrators, staff, and parents.
 * 
 * Key features:
 * - User authentication support (find by email)
 * - Role-based user management
 * - User search functionality
 * - Metadata management for user preferences/settings
 * - Convenient methods for getting users by role
 * 
 * User roles in the system:
 * - admin: Full system access, can manage all data
 * - staff: Can manage children, view reports, update information
 * - parent: Can view their own children's information, upload documents
 */

import { BaseRepository } from './base.repository'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types'
import type { User, UserRole } from '../helpers'
import { handleDatabaseError } from '../helpers'

/**
 * Repository class for managing user accounts
 * Extends BaseRepository with user-specific operations
 */
export class UsersRepository extends BaseRepository<'users'> {
  /**
   * Create a new UsersRepository instance
   * @param supabase - The Supabase client for database operations
   */
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'users')
  }

  /**
   * Find a user by their email address
   * This is commonly used for authentication and login processes
   * @param email - The email address to search for
   * @returns The user if found, null if not found
   * @throws DatabaseError if there's a database error (not including "not found")
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')            // Get all user information
        .eq('email', email)     // Where email matches exactly
        .single()               // Expect exactly one result

      // PGRST116 means "no rows found" - this is normal, so return null
      if (error && (error as any).code !== 'PGRST116') throw error
      return data
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find all users with a specific role
   * @param role - The user role to filter by ('admin', 'staff', or 'parent')
   * @returns Array of users with the specified role, newest first
   * @throws DatabaseError if query fails
   */
  async findByRole(role: UserRole): Promise<User[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                                    // Get all user information
        .eq('role', role)                               // Where role matches
        .order('created_at', { ascending: false })      // Newest accounts first

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Update a user's metadata (preferences, settings, additional info)
   * @param id - The ID of the user to update
   * @param metadata - The metadata object to store (preferences, settings, etc.)
   * @returns The updated user record
   * @throws DatabaseError if update fails (e.g., user not found)
   */
  async updateMetadata(id: string, metadata: Record<string, any>): Promise<User> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ 
          metadata,                               // Update metadata with new object
          updated_at: new Date().toISOString()    // Update the timestamp
        })
        .eq('id', id)                           // Where id matches
        .select()                               // Return the updated record
        .single()                               // Expect exactly one result

      if (error) throw error
      return data
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Get all administrator users
   * This is a convenience method that calls findByRole('admin')
   * @returns Array of admin users, newest first
   * @throws DatabaseError if query fails
   */
  async getAdmins(): Promise<User[]> {
    return this.findByRole('admin')
  }

  /**
   * Get all staff users (teachers, caregivers, etc.)
   * This is a convenience method that calls findByRole('staff')
   * @returns Array of staff users, newest first
   * @throws DatabaseError if query fails
   */
  async getStaff(): Promise<User[]> {
    return this.findByRole('staff')
  }

  /**
   * Get all parent users
   * This is a convenience method that calls findByRole('parent')
   * @returns Array of parent users, newest first
   * @throws DatabaseError if query fails
   */
  async getParents(): Promise<User[]> {
    return this.findByRole('parent')
  }

  /**
   * Search for users by email or name
   * @param searchTerm - The text to search for in email and name fields (case-insensitive)
   * @returns Array of up to 20 users whose email or name matches the search term
   * @throws DatabaseError if query fails
   */
  async searchUsers(searchTerm: string): Promise<User[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                                                    // Get all user information
        .or(`email.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`)  // Search email OR name (case-insensitive)
        .order('name')                                                  // Alphabetical order by name
        .limit(20)                                                      // Limit results to prevent overwhelming UI

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }
}