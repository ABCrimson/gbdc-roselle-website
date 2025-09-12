/**
 * BASE REPOSITORY CLASS
 * 
 * This is the foundation class that all specific repository classes extend.
 * It provides standard CRUD (Create, Read, Update, Delete) operations that
 * work with any database table.
 * 
 * The BaseRepository uses TypeScript generics to provide type safety for
 * different tables while sharing the same common functionality.
 * 
 * Key features:
 * - Type-safe database operations
 * - Consistent error handling
 * - Pagination support
 * - Bulk operations (createMany, deleteMany)
 * - Standard filtering and sorting
 */

import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types'
import { handleDatabaseError, type QueryFilters, type PaginatedResults, createPaginatedResult } from '../helpers'

/**
 * Abstract base repository class that provides common database operations
 * 
 * Generic Parameters:
 * @param TTable - The database table name (e.g., 'users', 'children')
 * @param TRow - The type for reading data from this table
 * @param TInsert - The type for creating new records in this table
 * @param TUpdate - The type for updating existing records in this table
 */
export abstract class BaseRepository<
  TTable extends keyof Database['public']['Tables'],
  TRow = Database['public']['Tables'][TTable]['Row'],
  TInsert = Database['public']['Tables'][TTable]['Insert'],
  TUpdate = Database['public']['Tables'][TTable]['Update']
> {
  /** The name of the database table this repository manages */
  protected tableName: TTable
  
  /** The Supabase client instance for database operations */
  protected supabase: SupabaseClient<Database>

  /**
   * Create a new repository instance
   * @param supabase - The Supabase client for database access
   * @param tableName - The name of the table this repository manages
   */
  constructor(supabase: SupabaseClient<Database>, tableName: TTable) {
    this.supabase = supabase
    this.tableName = tableName
  }

  /**
   * Find a single record by its ID
   * @param id - The unique identifier of the record to find
   * @returns The record if found, null if not found
   * @throws DatabaseError if there's a database error (not including "not found")
   */
  async findById(id: string): Promise<TRow | null> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')     // Get all columns
        .eq('id', id)    // Where id equals the provided id
        .single()        // Expect exactly one result

      if (error) throw error
      return data as TRow
    } catch (error) {
      // PGRST116 means "no rows found" - this is normal, so return null
      if ((error as any)?.code === 'PGRST116') {
        return null
      }
      // For any other error, convert it to a user-friendly DatabaseError
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find multiple records with optional filtering, sorting, and pagination
   * @param filters - Optional filters to apply (limit, offset, orderBy, etc.)
   * @returns Array of records matching the filters
   * @throws DatabaseError if there's a database error
   */
  async findMany(filters?: QueryFilters): Promise<TRow[]> {
    try {
      let query = this.supabase.from(this.tableName).select('*')

      // Apply limit if specified (maximum number of records to return)
      if (filters?.limit) {
        query = query.limit(filters.limit)
      }
      
      // Apply offset/range if specified (for pagination)
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }
      
      // Apply ordering if specified
      if (filters?.orderBy) {
        query = query.order(filters.orderBy, { ascending: filters.orderDirection === 'asc' })
      }

      const { data, error } = await query
      if (error) throw error
      return (data || []) as TRow[]  // Return empty array if no data
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Find records with pagination support and metadata
   * @param page - Page number to retrieve (starts at 1)
   * @param pageSize - Number of records per page
   * @param filters - Optional additional filters to apply
   * @returns Paginated results with data and pagination metadata
   * @throws DatabaseError if there's a database error
   */
  async findManyPaginated(
    page: number = 1,
    pageSize: number = 10,
    filters?: QueryFilters
  ): Promise<PaginatedResults<TRow>> {
    try {
      const offset = (page - 1) * pageSize  // Calculate how many records to skip
      
      // First, get the total count of records (for pagination metadata)
      const { count, error: countError } = await this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })  // count only, no data
      
      if (countError) throw countError

      // Then get the actual data for this page
      const data = await this.findMany({
        ...filters,      // Apply any additional filters
        limit: pageSize, // Limit to page size
        offset           // Skip to the right page
      })

      // Create a paginated result with metadata
      return createPaginatedResult(data, count || 0, page, pageSize)
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Create a new record in the database
   * @param data - The data for the new record
   * @returns The created record with all fields (including generated ones like ID)
   * @throws DatabaseError if creation fails (e.g., validation errors, duplicates)
   */
  async create(data: TInsert): Promise<TRow> {
    try {
      const { data: result, error } = await this.supabase
        .from(this.tableName)
        .insert(data as any)  // Insert the new record
        .select()             // Return the created record
        .single()             // Expect exactly one result

      if (error) throw error
      return result as TRow
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Create multiple records in a single database operation
   * @param data - Array of data objects for the new records
   * @returns Array of created records with all fields
   * @throws DatabaseError if creation fails for any record
   */
  async createMany(data: TInsert[]): Promise<TRow[]> {
    try {
      const { data: result, error } = await this.supabase
        .from(this.tableName)
        .insert(data as any)  // Insert multiple records
        .select()             // Return all created records

      if (error) throw error
      return (result || []) as TRow[]
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Update an existing record by ID
   * @param id - The ID of the record to update
   * @param data - The fields to update (only changed fields need to be included)
   * @returns The updated record with all fields
   * @throws DatabaseError if update fails (e.g., record not found, validation errors)
   */
  async update(id: string, data: TUpdate): Promise<TRow> {
    try {
      const { data: result, error } = await this.supabase
        .from(this.tableName)
        .update(data as any)  // Update with the provided data
        .eq('id', id)         // Where id equals the specified id
        .select()             // Return the updated record
        .single()             // Expect exactly one result

      if (error) throw error
      return result as TRow
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Insert or update a record (upsert = update + insert)
   * If a record with the same primary key exists, it updates it.
   * If not, it creates a new record.
   * @param data - The data to insert or use for updating
   * @returns The inserted or updated record
   * @throws DatabaseError if the operation fails
   */
  async upsert(data: TInsert): Promise<TRow> {
    try {
      const { data: result, error } = await this.supabase
        .from(this.tableName)
        .upsert(data as any)  // Insert or update based on primary key
        .select()             // Return the resulting record
        .single()             // Expect exactly one result

      if (error) throw error
      return result as TRow
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Delete a record by ID
   * @param id - The ID of the record to delete
   * @throws DatabaseError if deletion fails (e.g., record not found, foreign key constraints)
   */
  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()         // Delete operation
        .eq('id', id)     // Where id equals the specified id

      if (error) throw error
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Delete multiple records by their IDs in a single operation
   * @param ids - Array of IDs of records to delete
   * @throws DatabaseError if deletion fails for any record
   */
  async deleteMany(ids: string[]): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()         // Delete operation
        .in('id', ids)    // Where id is in the provided array

      if (error) throw error
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Count the total number of records, optionally with filters
   * @param filters - Optional key-value pairs to filter the count
   * @returns The number of records matching the filters
   * @throws DatabaseError if the count operation fails
   */
  async count(filters?: Record<string, any>): Promise<number> {
    try {
      let query = this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })  // Count only, no data

      // Apply filters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)  // Add equality filter for each key-value pair
        })
      }

      const { count, error } = await query
      if (error) throw error
      return count || 0  // Return 0 if count is null
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  /**
   * Check if a record exists by ID (more efficient than findById when you only need to know if it exists)
   * @param id - The ID to check for
   * @returns true if a record with this ID exists, false otherwise
   * @throws DatabaseError if the check fails (not including "not found")
   */
  async exists(id: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('id')     // Only select the id field (more efficient)
        .eq('id', id)     // Where id equals the provided id
        .single()         // Expect exactly one result

      // PGRST116 means "no rows found" - this is normal for exists checks
      if (error && (error as any).code !== 'PGRST116') throw error
      return !!data  // Convert to boolean: true if data exists, false if null/undefined
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }
}