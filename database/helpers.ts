/**
 * DATABASE HELPER TYPES AND UTILITIES
 * 
 * This file provides convenient type aliases and utility functions for working with the database.
 * It simplifies database operations by providing shorter, more readable type names and
 * helpful utility functions for common operations.
 */

import type { Database, Tables, TablesInsert, TablesUpdate } from './types'

/**
 * Type representing any table name in our database
 * This provides autocomplete when specifying which table to work with
 */
export type TableName = keyof Database['public']['Tables']

/**
 * CONVENIENT TYPE ALIASES
 * 
 * These shorter type names make it easier to work with database records
 * without having to write the full Tables<'table_name'> syntax every time.
 */

// Row types (for reading data from database)
export type User = Tables<'users'>                          // User account information
export type Child = Tables<'children'>                      // Child information and enrollment details
export type DocumentUpload = Tables<'document_uploads'>     // Uploaded documents from parents
export type Referral = Tables<'referrals'>                  // Parent referral tracking
export type ContactSubmission = Tables<'contact_submissions'> // Website contact form submissions
export type Waitlist = Tables<'waitlist'>                   // Waitlist management
export type Classroom = Tables<'classrooms'>                // Classroom information and capacity
export type Event = Tables<'events'>                        // Daycare events and activities
export type Announcement = Tables<'announcements'>          // Important announcements
export type Resource = Tables<'resources'>                  // Educational resources and documents
export type AuditLog = Tables<'audit_logs'>                // System activity tracking

// Insert types (for creating new records)
export type UserInsert = TablesInsert<'users'>                          // Data needed to create a new user
export type ChildInsert = TablesInsert<'children'>                      // Data needed to enroll a new child
export type DocumentUploadInsert = TablesInsert<'document_uploads'>     // Data needed to upload a document
export type ReferralInsert = TablesInsert<'referrals'>                  // Data needed to create a referral
export type ContactSubmissionInsert = TablesInsert<'contact_submissions'> // Data from contact forms
export type WaitlistInsert = TablesInsert<'waitlist'>                   // Data to add someone to waitlist
export type ClassroomInsert = TablesInsert<'classrooms'>                // Data to create a new classroom
export type EventInsert = TablesInsert<'events'>                        // Data to create a new event
export type AnnouncementInsert = TablesInsert<'announcements'>          // Data to create an announcement
export type ResourceInsert = TablesInsert<'resources'>                  // Data to add a new resource
export type AuditLogInsert = TablesInsert<'audit_logs'>                // Data for tracking system changes

// Update types (for modifying existing records)
export type UserUpdate = TablesUpdate<'users'>                          // Data that can be updated for users
export type ChildUpdate = TablesUpdate<'children'>                      // Data that can be updated for children
export type DocumentUploadUpdate = TablesUpdate<'document_uploads'>     // Data that can be updated for documents
export type ReferralUpdate = TablesUpdate<'referrals'>                  // Data that can be updated for referrals
export type ContactSubmissionUpdate = TablesUpdate<'contact_submissions'> // Data that can be updated for submissions
export type WaitlistUpdate = TablesUpdate<'waitlist'>                   // Data that can be updated for waitlist entries
export type ClassroomUpdate = TablesUpdate<'classrooms'>                // Data that can be updated for classrooms
export type EventUpdate = TablesUpdate<'events'>                        // Data that can be updated for events
export type AnnouncementUpdate = TablesUpdate<'announcements'>          // Data that can be updated for announcements
export type ResourceUpdate = TablesUpdate<'resources'>                  // Data that can be updated for resources
export type AuditLogUpdate = TablesUpdate<'audit_logs'>                // Data that can be updated for audit logs

/**
 * ENUM TYPE ALIASES
 * 
 * These provide shorter names for the enum types defined in the database.
 * Enums ensure only valid values can be used for certain fields.
 */
export type UserRole = Database['public']['Enums']['user_role']          // 'admin' | 'staff' | 'parent'
export type ChildStatus = Database['public']['Enums']['child_status']    // 'active' | 'inactive' | 'waitlist'
export type DocumentStatus = Database['public']['Enums']['document_status'] // 'pending' | 'approved' | 'rejected' | 'expired'
export type ReferralStatus = Database['public']['Enums']['referral_status'] // 'pending' | 'completed' | 'expired'
export type WaitlistStatus = Database['public']['Enums']['waitlist_status'] // 'waiting' | 'contacted' | 'enrolled' | 'withdrawn'
export type PriorityLevel = Database['public']['Enums']['priority_level'] // 'low' | 'medium' | 'high' | 'urgent'
export type AccessLevel = Database['public']['Enums']['access_level']    // 'public' | 'parent' | 'staff' | 'admin'

/**
 * TYPE GUARD FUNCTIONS
 * 
 * These functions help check what type of user, child status, or document status
 * we're dealing with. They provide type safety and make code more readable.
 */

// User role checks
export const isAdmin = (user: User): boolean => user.role === 'admin'     // Check if user is an admin
export const isStaff = (user: User): boolean => user.role === 'staff'     // Check if user is staff member
export const isParent = (user: User): boolean => user.role === 'parent'   // Check if user is a parent

// Child status checks
export const isActiveChild = (child: Child): boolean => child.status === 'active'    // Child is currently enrolled
export const isWaitlisted = (child: Child): boolean => child.status === 'waitlist'  // Child is on the waitlist

// Document status checks
export const isPendingDocument = (doc: DocumentUpload): boolean => doc.status === 'pending'   // Document awaiting review
export const isApprovedDocument = (doc: DocumentUpload): boolean => doc.status === 'approved' // Document has been approved
export const isExpiredDocument = (doc: DocumentUpload): boolean => doc.status === 'expired'   // Document has expired

/**
 * DATE UTILITY FUNCTIONS
 * 
 * These functions help work with dates, particularly for document expiration
 * and time-based calculations.
 */

/**
 * Check if a date has passed (expired)
 * @param expiresAt - The expiration date string or null
 * @returns true if the date has passed, false if still valid or no expiration date
 */
export const isExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

/**
 * Calculate how many days until something expires
 * @param expiresAt - The expiration date string or null
 * @returns Number of days until expiry, or null if no expiration date
 */
export const daysUntilExpiry = (expiresAt: string | null): number | null => {
  if (!expiresAt) return null
  const diff = new Date(expiresAt).getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * CHILD AGE CALCULATION FUNCTIONS
 * 
 * These functions help calculate and categorize children's ages,
 * which is important for classroom placement and program eligibility.
 */

/**
 * Calculate a child's age in months from their birth date
 * @param dateOfBirth - The child's birth date as a string
 * @returns The child's age in months (minimum 0)
 */
export const calculateAgeInMonths = (dateOfBirth: string): number => {
  const birth = new Date(dateOfBirth)
  const today = new Date()
  const months = (today.getFullYear() - birth.getFullYear()) * 12 + 
                 (today.getMonth() - birth.getMonth())
  return Math.max(0, months)
}

/**
 * Determine which age group a child belongs to based on their age in months
 * @param ageInMonths - The child's age in months
 * @returns A descriptive string of the child's age group
 */
export const getAgeGroup = (ageInMonths: number): string => {
  if (ageInMonths < 6) return 'Infant (0-6 months)'        // Newborn to 6 months
  if (ageInMonths < 12) return 'Infant (6-12 months)'      // 6 months to 1 year
  if (ageInMonths < 18) return 'Toddler (12-18 months)'    // 1 to 1.5 years
  if (ageInMonths < 24) return 'Toddler (18-24 months)'    // 1.5 to 2 years
  if (ageInMonths < 36) return 'Toddler (2-3 years)'       // 2 to 3 years
  if (ageInMonths < 48) return 'Preschool (3-4 years)'     // 3 to 4 years
  if (ageInMonths < 60) return 'Preschool (4-5 years)'     // 4 to 5 years
  return 'School Age (5+ years)'                            // 5 years and older
}

/**
 * WAITLIST PRIORITY CALCULATION
 * 
 * This function calculates a priority score for waitlist management.
 * Higher scores mean higher priority in the queue.
 */

/**
 * Calculate priority score for waitlist positioning
 * @param desiredDate - When they want to start (earlier = higher priority)
 * @param hasSibling - Whether they have a sibling already enrolled (bonus points)
 * @param isStaffChild - Whether this is a staff member's child (bonus points)
 * @returns Priority score between 0-150 (higher = more priority)
 */
export const calculatePriorityScore = (
  desiredDate: string,
  hasSibling: boolean = false,
  isStaffChild: boolean = false
): number => {
  let score = 100  // Base score
  
  // Add points for earlier desired start date
  // The sooner they want to start, the higher their priority
  const daysUntilStart = Math.ceil(
    (new Date(desiredDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  score -= Math.min(50, Math.max(0, daysUntilStart))  // Reduce score for later dates
  
  // Bonus points for special circumstances
  if (hasSibling) score += 20    // Sibling discount/priority
  if (isStaffChild) score += 30  // Staff children get highest priority
  
  return Math.max(0, Math.min(150, score))  // Keep score between 0-150
}

/**
 * QUERY BUILDING HELPERS
 * 
 * These utilities help build database queries with common filtering,
 * sorting, and pagination options.
 */

/**
 * Common query filters that can be applied to database queries
 */
export interface QueryFilters {
  limit?: number              // Maximum number of records to return
  offset?: number             // How many records to skip (for pagination)
  orderBy?: string            // Which field to sort by
  orderDirection?: 'asc' | 'desc'  // Sort direction (ascending or descending)
  startDate?: string          // Filter records after this date
  endDate?: string            // Filter records before this date
}

/**
 * Build date range filters for database queries
 * @param column - The database column to filter on
 * @param startDate - Include records on or after this date
 * @param endDate - Include records on or before this date
 * @returns Array of filter strings for the database query
 */
export const buildDateRangeFilter = (
  column: string,
  startDate?: string,
  endDate?: string
) => {
  const filters: string[] = []
  if (startDate) filters.push(`${column}.gte.${startDate}`)  // Greater than or equal
  if (endDate) filters.push(`${column}.lte.${endDate}`)      // Less than or equal
  return filters
}

/**
 * VALIDATION HELPER FUNCTIONS
 * 
 * These functions validate user input to ensure data quality
 * and prevent invalid data from being stored in the database.
 */

/**
 * Validate an email address format
 * @param email - The email string to validate
 * @returns true if email format is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Standard email format
  return emailRegex.test(email)
}

/**
 * Validate a phone number format
 * @param phone - The phone number string to validate
 * @returns true if phone format is valid and has at least 10 digits
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s()+-]+$/  // Allow digits, spaces, parentheses, plus, and dash
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10  // At least 10 digits
}

/**
 * Validate a referral code format (8 character hex string)
 * @param code - The referral code to validate
 * @returns true if code is valid format (8 hex characters)
 */
export const isValidReferralCode = (code: string): boolean => {
  return /^[a-f0-9]{8}$/.test(code)  // 8 characters, lowercase hex only
}

/**
 * JSON/METADATA HELPER FUNCTIONS
 * 
 * These functions help work with JSON data that's stored in database
 * metadata fields, ensuring safe parsing and stringifying.
 */

/**
 * Safely parse metadata from the database
 * @param metadata - The metadata to parse (could be string or object)
 * @returns Parsed metadata object, or empty object if parsing fails
 */
export const parseMetadata = <T = Record<string, any>>(metadata: any): T => {
  if (typeof metadata === 'string') {
    try {
      return JSON.parse(metadata) as T  // Try to parse JSON string
    } catch {
      return {} as T  // Return empty object if parsing fails
    }
  }
  return (metadata || {}) as T  // Return as-is if already an object
}

/**
 * Safely convert metadata to a JSON string for database storage
 * @param metadata - The metadata object to stringify
 * @returns JSON string representation of the metadata
 */
export const stringifyMetadata = (metadata: any): string => {
  if (typeof metadata === 'string') return metadata  // Already a string
  return JSON.stringify(metadata || {})  // Convert to JSON string
}

/**
 * ERROR HANDLING UTILITIES
 * 
 * These utilities help handle and categorize database errors in a
 * user-friendly way, converting technical error codes into readable messages.
 */

/**
 * Custom error class for database-related errors
 * Extends the standard Error class with additional database-specific information
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,    // Error code from database
    public details?: any     // Additional error details
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

/**
 * Convert database errors into user-friendly DatabaseError instances
 * @param error - The raw error from the database
 * @returns A DatabaseError with appropriate message and code
 */
export const handleDatabaseError = (error: any): DatabaseError => {
  // Duplicate key violation (trying to create something that already exists)
  if (error?.code === '23505') {
    return new DatabaseError('Duplicate entry exists', 'DUPLICATE_ENTRY', error)
  }
  // Foreign key violation (trying to reference something that doesn't exist)
  if (error?.code === '23503') {
    return new DatabaseError('Referenced record not found', 'FOREIGN_KEY_VIOLATION', error)
  }
  // Not null violation (required field is missing)
  if (error?.code === '23502') {
    return new DatabaseError('Required field is missing', 'NOT_NULL_VIOLATION', error)
  }
  // Check constraint violation (value doesn't meet database rules)
  if (error?.code === '23514') {
    return new DatabaseError('Value violates check constraint', 'CHECK_VIOLATION', error)
  }
  // PostgREST specific: no rows found
  if (error?.code === 'PGRST116') {
    return new DatabaseError('No rows found', 'NOT_FOUND', error)
  }
  // Default case for unknown errors
  return new DatabaseError(
    error?.message || 'An unknown database error occurred',
    error?.code,
    error
  )
}

/**
 * QUERY RESULT TYPE HELPERS
 * 
 * These types and utilities help work with database query results,
 * including single records, multiple records, and paginated results.
 */

// Type for queries that return a single record (or null if not found)
export type SingleResult<T> = T | null

// Type for queries that return multiple records
export type MultipleResults<T> = T[]

// Type for paginated query results with metadata
export type PaginatedResults<T> = {
  data: T[]           // The actual records
  count: number       // Total number of records (across all pages)
  page: number        // Current page number
  pageSize: number    // Number of records per page
  totalPages: number  // Total number of pages
}

/**
 * Create a paginated result object with calculated pagination metadata
 * @param data - The records for the current page
 * @param count - Total number of records across all pages
 * @param page - Current page number
 * @param pageSize - Number of records per page
 * @returns Complete paginated result with metadata
 */
export const createPaginatedResult = <T>(
  data: T[],
  count: number,
  page: number,
  pageSize: number
): PaginatedResults<T> => ({
  data,
  count,
  page,
  pageSize,
  totalPages: Math.ceil(count / pageSize)  // Calculate total pages
})

/**
 * STANDARD DATABASE OPERATIONS INTERFACE
 * 
 * This interface defines the common operations that should be available
 * for any database table. It ensures consistency across all repository classes.
 */
export interface DatabaseOperations<T, TInsert, TUpdate> {
  findById: (id: string) => Promise<SingleResult<T>>        // Get a single record by ID
  findMany: (filters?: QueryFilters) => Promise<MultipleResults<T>>  // Get multiple records with optional filters
  create: (data: TInsert) => Promise<T>                     // Create a new record
  update: (id: string, data: TUpdate) => Promise<T>         // Update an existing record
  delete: (id: string) => Promise<void>                     // Delete a record
  count: (filters?: QueryFilters) => Promise<number>        // Count records with optional filters
}

/**
 * Re-export all types from the types file for convenience
 * This allows importing everything from this single file
 */
export type * from './types'