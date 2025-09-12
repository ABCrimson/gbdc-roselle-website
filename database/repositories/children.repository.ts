/**
 * CHILDREN REPOSITORY
 * 
 * This repository provides specialized database operations for managing children
 * enrolled in the daycare. It extends the BaseRepository to include child-specific
 * operations like finding children by parent, classroom, age group, and status.
 * 
 * Key features:
 * - Find children by parent account
 * - Classroom management and enrollment
 * - Age-based queries and grouping
 * - Status tracking (active, inactive, waitlist)
 * - Allergy management for safety
 * - Search functionality for staff
 * - Statistical reporting for administrators
 */

import { BaseRepository } from './base.repository'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types'
import type { Child, ChildStatus } from '../helpers'
import { handleDatabaseError, calculateAgeInMonths, getAgeGroup } from '../helpers'

/**
 * Repository class for managing children data
 * Extends BaseRepository with child-specific operations
 */
export class ChildrenRepository extends BaseRepository<'children'> {
  /**
   * Create a new ChildrenRepository instance
   * @param supabase - The Supabase client for database operations
   */
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'children')
  }

  /**
   * Find all children belonging to a specific parent
   * @param parentId - The ID of the parent user
   * @returns Array of children ordered by date of birth (oldest first)
   * @throws DatabaseError if query fails
   */
  async findByParent(parentId: string): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                                    // Get all child information
        .eq('parent_id', parentId)                      // Where parent_id matches
        .order('date_of_birth', { ascending: true })    // Oldest children first

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find all active children in a specific classroom
   * @param classroom - The classroom name
   * @returns Array of active children in the classroom, sorted by first name
   * @throws DatabaseError if query fails
   */
  async findByClassroom(classroom: string): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                    // Get all child information
        .eq('classroom', classroom)     // Where classroom matches
        .eq('status', 'active')         // Only active children (not inactive/waitlist)
        .order('first_name')            // Alphabetical order by first name

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find all children with a specific status
   * @param status - The child status to filter by ('active', 'inactive', or 'waitlist')
   * @returns Array of children with the specified status, newest enrollments first
   * @throws DatabaseError if query fails
   */
  async findByStatus(status: ChildStatus): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                                        // Get all child information
        .eq('status', status)                               // Where status matches
        .order('enrollment_date', { ascending: false })     // Most recent enrollments first

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find active children within a specific age range
   * @param minMonths - Minimum age in months (inclusive)
   * @param maxMonths - Maximum age in months (inclusive)
   * @returns Array of active children in the age range, ordered by birth date
   * @throws DatabaseError if query fails
   */
  async findByAgeGroup(minMonths: number, maxMonths: number): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                        // Get all child information
        .gte('age_months', minMonths)       // Age greater than or equal to minimum
        .lte('age_months', maxMonths)       // Age less than or equal to maximum
        .eq('status', 'active')             // Only active children
        .order('date_of_birth')             // Ordered by birth date

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Get all children who are currently actively enrolled
   * This is a convenience method that calls findByStatus('active')
   * @returns Array of active children, newest enrollments first
   * @throws DatabaseError if query fails
   */
  async getActiveChildren(): Promise<Child[]> {
    return this.findByStatus('active')
  }

  /**
   * Get all children who are on the waitlist
   * This is a convenience method that calls findByStatus('waitlist')
   * @returns Array of waitlisted children, newest applications first
   * @throws DatabaseError if query fails
   */
  async getWaitlistedChildren(): Promise<Child[]> {
    return this.findByStatus('waitlist')
  }

  /**
   * Search for children by name (first or last name)
   * @param searchTerm - The text to search for in first and last names (case-insensitive)
   * @returns Array of up to 20 children whose names match the search term
   * @throws DatabaseError if query fails
   */
  async searchChildren(searchTerm: string): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                                                        // Get all child information
        .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)  // Search first OR last name (case-insensitive)
        .order('first_name')                                                // Alphabetical order
        .limit(20)                                                          // Limit results to prevent overwhelming UI

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Move a child to a different classroom or remove them from a classroom
   * @param childId - The ID of the child to update
   * @param classroom - The new classroom name, or null to remove from classroom
   * @returns The updated child record
   * @throws DatabaseError if update fails (e.g., child not found)
   */
  async updateClassroom(childId: string, classroom: string | null): Promise<Child> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ 
          classroom,                              // Set new classroom (or null)
          updated_at: new Date().toISOString()    // Update the timestamp
        })
        .eq('id', childId)                      // Where id matches
        .select()                               // Return the updated record
        .single()                               // Expect exactly one result

      if (error) throw error
      return data
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Change a child's enrollment status
   * @param childId - The ID of the child to update
   * @param status - The new status ('active', 'inactive', or 'waitlist')
   * @returns The updated child record
   * @throws DatabaseError if update fails (e.g., child not found)
   */
  async updateStatus(childId: string, status: ChildStatus): Promise<Child> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ 
          status,                                 // Set new status
          updated_at: new Date().toISOString()    // Update the timestamp
        })
        .eq('id', childId)                      // Where id matches
        .select()                               // Return the updated record
        .single()                               // Expect exactly one result

      if (error) throw error
      return data
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Get all active children who have known allergies
   * This is important for kitchen staff and teachers to ensure child safety
   * @returns Array of active children who have allergies, grouped by classroom
   * @throws DatabaseError if query fails
   */
  async getChildrenWithAllergies(): Promise<Child[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')                    // Get all child information
        .not('allergies', 'is', null)   // Where allergies field is not null
        .eq('status', 'active')         // Only active children
        .order('classroom')             // Group by classroom for easy reference

      if (error) throw error
      return data || []
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Get enrollment statistics by classroom
   * @returns Object with classroom names as keys and child counts as values
   * @throws DatabaseError if query fails
   * 
   * Example return value:
   * {
   *   "Infant Room A": 12,
   *   "Toddler Room B": 18,
   *   "Preschool Room C": 22
   * }
   */
  async getClassroomStatistics(): Promise<Record<string, number>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('classroom')                // Only need classroom field
        .eq('status', 'active')             // Only count active children
        .not('classroom', 'is', null)       // Only children assigned to classrooms

      if (error) throw error

      // Count children per classroom
      const stats: Record<string, number> = {}
      data?.forEach((child) => {
        if (child.classroom) {
          stats[child.classroom] = (stats[child.classroom] || 0) + 1
        }
      })

      return stats
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }
}