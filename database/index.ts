/**
 * DATABASE MODULE MAIN ENTRY POINT
 * 
 * This file serves as the main entry point for the entire database module.
 * It exports all the types, helper functions, and repository classes
 * that other parts of the application need to work with the database.
 * 
 * By importing from this file, you get access to everything you need
 * for database operations without having to know the internal structure
 * of the database module.
 * 
 * Usage examples:
 * - import { User, UserRepository } from '@/database'
 * - import { Database, isValidEmail } from '@/database'
 * - import { PaginatedResults, QueryFilters } from '@/database'
 */

/**
 * EXPORT ALL TYPE DEFINITIONS
 * 
 * This exports all TypeScript types from the types.ts file,
 * including the main Database type and all table definitions.
 */
export type * from './types'

/**
 * EXPORT ALL HELPER FUNCTIONS AND UTILITY TYPES
 * 
 * This exports all utility functions, type guards, validation functions,
 * and convenient type aliases from the helpers.ts file.
 */
export * from './helpers'

/**
 * EXPORT ALL REPOSITORY CLASSES
 * 
 * This exports all the repository classes that provide methods
 * for interacting with specific database tables.
 */
export * from './repositories'

/**
 * RE-EXPORT CORE DATABASE TYPES FOR CONVENIENCE
 * 
 * These are the most commonly used types from the types.ts file.
 * By re-exporting them here, we make them easily accessible
 * without having to remember the exact import path.
 */
export type {
  Database,        // The main database schema type
  Tables,          // Helper for getting table row types
  TablesInsert,    // Helper for getting table insert types
  TablesUpdate,    // Helper for getting table update types
  Json             // Type for JSON fields in the database
} from './types'

/**
 * RE-EXPORT COMMONLY USED HELPER TYPES
 * 
 * These are the most frequently used types and interfaces
 * from the helpers.ts file, providing convenient access
 * to table types, enums, and utility interfaces.
 */
export type {
  // Table row types (for reading data)
  User,                // User account information
  Child,               // Child enrollment information
  DocumentUpload,      // Uploaded documents from parents
  Referral,            // Parent referral tracking
  ContactSubmission,   // Website contact form data
  Waitlist,            // Waitlist management
  Classroom,           // Classroom information
  Event,               // Daycare events and activities
  Announcement,        // Important announcements
  Resource,            // Educational resources
  AuditLog,            // System activity tracking
  
  // Enum types (predefined value lists)
  UserRole,            // 'admin' | 'staff' | 'parent'
  ChildStatus,         // 'active' | 'inactive' | 'waitlist'
  DocumentStatus,      // 'pending' | 'approved' | 'rejected' | 'expired'
  ReferralStatus,      // 'pending' | 'completed' | 'expired'
  WaitlistStatus,      // 'waiting' | 'contacted' | 'enrolled' | 'withdrawn'
  PriorityLevel,       // 'low' | 'medium' | 'high' | 'urgent'
  AccessLevel,         // 'public' | 'parent' | 'staff' | 'admin'
  
  // Query and result types
  QueryFilters,        // Common query filtering options
  PaginatedResults,    // Paginated query results with metadata
  SingleResult,        // Single record result (T | null)
  MultipleResults,     // Multiple records result (T[])
  DatabaseOperations   // Standard CRUD operations interface
} from './helpers'