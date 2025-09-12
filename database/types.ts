/**
 * DATABASE TYPE DEFINITIONS
 * 
 * This file contains all the TypeScript type definitions for the GBDC (Great Beginnings Daycare) website database.
 * These types are automatically generated from the Supabase database schema and provide type safety
 * when working with database records.
 * 
 * The types ensure that we can't accidentally use wrong data types when reading from or writing to the database.
 */

/**
 * Json type definition for Supabase database
 * 
 * This represents any JSON value that can be stored in the database.
 * JSON columns can contain:
 * - Simple values: strings, numbers, booleans, null
 * - Complex objects: { key: value } pairs
 * - Arrays: [value1, value2, ...]
 * 
 * This is commonly used for storing flexible data like metadata, settings, or complex nested information.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * Main Database type definition
 * 
 * This defines the entire structure of our Supabase database, including:
 * - Tables: All the data tables in our database
 * - Views: Database views (currently none)
 * - Functions: Database functions for complex operations
 * - Enums: Predefined value lists (like user roles, statuses)
 * - CompositeTypes: Complex data types (currently none)
 */
export type Database = {
  public: {
    Tables: {
      /**
       * USERS TABLE
       * 
       * Stores information about all users of the daycare management system.
       * This includes parents, staff members, and administrators.
       * 
       * Row: What the data looks like when reading from the database
       * Insert: What data is required/optional when creating a new user
       * Update: What data can be modified when updating an existing user
       */
      users: {
        Row: {
          id: string                                    // Unique identifier for each user
          email: string                                 // User's email address (used for login)
          name: string | null                          // User's full name (optional)
          role: 'admin' | 'staff' | 'parent'          // User's role in the system
          metadata: Json                               // Additional user information (preferences, settings, etc.)
          created_at: string                           // When this user account was created
          updated_at: string                           // When this user account was last modified
        }
        Insert: {
          id?: string                                  // Optional: system generates if not provided
          email: string                                // Required: email address
          name?: string | null                         // Optional: full name
          role: 'admin' | 'staff' | 'parent'         // Required: user role
          metadata?: Json                              // Optional: additional information
          created_at?: string                          // Optional: system sets current time if not provided
          updated_at?: string                          // Optional: system sets current time if not provided
        }
        Update: {
          id?: string                                  // Optional: usually not changed
          email?: string                               // Optional: can update email
          name?: string | null                         // Optional: can update name
          role?: 'admin' | 'staff' | 'parent'        // Optional: can change user role
          metadata?: Json                              // Optional: can update additional information
          created_at?: string                          // Optional: usually not changed
          updated_at?: string                          // Optional: system automatically updates
        }
      }
      /**
       * CHILDREN TABLE
       * 
       * Stores information about all children enrolled or associated with the daycare.
       * Each child is linked to a parent user account and contains all relevant
       * information needed for their care and management.
       */
      children: {
        Row: {
          id: string                                    // Unique identifier for each child
          parent_id: string                            // Links to the parent user account (users table)
          first_name: string                           // Child's first name
          last_name: string                            // Child's last name
          date_of_birth: string                        // Child's birth date (used for age calculations)
          age_months: number                           // Child's age in months (auto-calculated)
          classroom: string | null                     // Which classroom the child is assigned to (optional)
          allergies: string[] | null                   // List of known allergies (optional)
          medical_info: Json                           // Medical conditions, medications, etc.
          emergency_contacts: Json                     // Emergency contact information
          enrollment_date: string | null               // When child started at daycare (optional)
          status: 'active' | 'inactive' | 'waitlist'  // Current enrollment status
          created_at: string                           // When this record was created
          updated_at: string                           // When this record was last modified
        }
        Insert: {
          id?: string                                  // Optional: system generates if not provided
          parent_id: string                            // Required: must link to existing parent
          first_name: string                           // Required: child's first name
          last_name: string                            // Required: child's last name
          date_of_birth: string                        // Required: child's birth date
          classroom?: string | null                    // Optional: classroom assignment
          allergies?: string[] | null                  // Optional: allergy list
          medical_info?: Json                          // Optional: medical information
          emergency_contacts?: Json                    // Optional: emergency contacts
          enrollment_date?: string | null              // Optional: enrollment date
          status?: 'active' | 'inactive' | 'waitlist' // Optional: defaults to appropriate status
          created_at?: string                          // Optional: system sets current time
          updated_at?: string                          // Optional: system sets current time
        }
        Update: {
          id?: string                                  // Optional: usually not changed
          parent_id?: string                           // Optional: can reassign to different parent
          first_name?: string                          // Optional: can update first name
          last_name?: string                           // Optional: can update last name
          date_of_birth?: string                       // Optional: can correct birth date
          classroom?: string | null                    // Optional: can reassign classroom
          allergies?: string[] | null                  // Optional: can update allergies
          medical_info?: Json                          // Optional: can update medical info
          emergency_contacts?: Json                    // Optional: can update emergency contacts
          enrollment_date?: string | null              // Optional: can set/update enrollment date
          status?: 'active' | 'inactive' | 'waitlist' // Optional: can change enrollment status
          created_at?: string                          // Optional: usually not changed
          updated_at?: string                          // Optional: system automatically updates
        }
      }
      /**
       * DOCUMENT UPLOADS TABLE
       * 
       * Tracks all documents uploaded by parents for their children.
       * This includes forms, medical records, immunization records, etc.
       * Staff can review and approve/reject these documents.
       */
      document_uploads: {
        Row: {
          id: string                                              // Unique identifier for each document
          parent_id: string                                       // Which parent uploaded this document
          child_id: string | null                                 // Which child this document relates to (optional)
          document_type: string                                   // Type of document (e.g., "immunization", "medical_form")
          file_url: string                                        // URL where the file is stored
          file_name: string                                       // Original filename when uploaded
          file_size: number                                       // Size of the file in bytes
          mime_type: string                                       // File type (e.g., "application/pdf", "image/jpeg")
          metadata: Json                                          // Additional file information
          uploaded_at: string                                     // When the document was uploaded
          expires_at: string | null                               // When document expires (optional)
          status: 'pending' | 'approved' | 'rejected' | 'expired' // Current review status
        }
        Insert: {
          id?: string                                             // Optional: system generates if not provided
          parent_id: string                                       // Required: uploading parent
          child_id?: string | null                                // Optional: related child
          document_type: string                                   // Required: type of document
          file_url: string                                        // Required: storage location
          file_name: string                                       // Required: original filename
          file_size: number                                       // Required: file size
          mime_type: string                                       // Required: file type
          metadata?: Json                                         // Optional: additional info
          uploaded_at?: string                                    // Optional: system sets current time
          expires_at?: string | null                              // Optional: expiration date
          status?: 'pending' | 'approved' | 'rejected' | 'expired' // Optional: defaults to 'pending'
        }
        Update: {
          id?: string                                             // Optional: usually not changed
          parent_id?: string                                      // Optional: can reassign if needed
          child_id?: string | null                                // Optional: can link to different child
          document_type?: string                                  // Optional: can correct document type
          file_url?: string                                       // Optional: can update storage location
          file_name?: string                                      // Optional: can update filename
          file_size?: number                                      // Optional: can update file size
          mime_type?: string                                      // Optional: can update file type
          metadata?: Json                                         // Optional: can update additional info
          uploaded_at?: string                                    // Optional: usually not changed
          expires_at?: string | null                              // Optional: can set/update expiration
          status?: 'pending' | 'approved' | 'rejected' | 'expired' // Optional: staff updates review status
        }
      }
      /**
       * REFERRALS TABLE
       * 
       * Tracks parent referrals and manages the referral reward system.
       * When existing parents refer new families, this table manages
       * the referral process and any associated rewards.
       */
      referrals: {
        Row: {
          id: string                                    // Unique identifier for each referral
          referrer_id: string                          // Parent who made the referral
          referred_name: string                        // Name of the person being referred
          referred_email: string                       // Email of the person being referred
          referred_phone: string | null                // Phone number of referred person (optional)
          referral_code: string                        // Unique code for tracking this referral
          status: 'pending' | 'completed' | 'expired' // Current status of the referral
          reward_amount: number | null                 // Amount of reward if applicable
          reward_type: string | null                   // Type of reward (discount, credit, etc.)
          completed_at: string | null                  // When the referral was completed
          expires_at: string                           // When the referral expires
          created_at: string                           // When the referral was created
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_name: string
          referred_email: string
          referred_phone?: string | null
          referral_code?: string
          status?: 'pending' | 'completed' | 'expired'
          reward_amount?: number | null
          reward_type?: string | null
          completed_at?: string | null
          expires_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_name?: string
          referred_email?: string
          referred_phone?: string | null
          referral_code?: string
          status?: 'pending' | 'completed' | 'expired'
          reward_amount?: number | null
          reward_type?: string | null
          completed_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      /**
       * CONTACT SUBMISSIONS TABLE
       * 
       * Stores all contact form submissions from the website.
       * This includes general inquiries and tour requests from prospective parents.
       */
      contact_submissions: {
        Row: {
          id: string                    // Unique identifier for each submission
          name: string                  // Name of the person contacting us
          email: string                 // Contact email address
          phone: string | null          // Phone number (optional)
          message: string               // Message content from contact form
          tour_requested: boolean       // Whether they requested a tour
          preferred_date: string | null // Preferred tour date (if tour requested)
          preferred_time: string | null // Preferred tour time (if tour requested)
          child_age: string | null      // Age of their child (optional)
          source: string | null         // How they found us (optional)
          metadata: Json                // Additional tracking information
          ip_address: string | null     // IP address of submitter (for security)
          user_agent: string | null     // Browser information (for analytics)
          submitted_at: string          // When the form was submitted
          responded_at: string | null   // When staff responded (optional)
          response_notes: string | null // Staff notes about the response (optional)
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          tour_requested?: boolean
          preferred_date?: string | null
          preferred_time?: string | null
          child_age?: string | null
          source?: string | null
          metadata?: Json
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          responded_at?: string | null
          response_notes?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          tour_requested?: boolean
          preferred_date?: string | null
          preferred_time?: string | null
          child_age?: string | null
          source?: string | null
          metadata?: Json
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          responded_at?: string | null
          response_notes?: string | null
        }
      }
      /**
       * WAITLIST TABLE
       * 
       * Manages the waiting list for daycare enrollment.
       * Parents can join the waitlist when no spots are available,
       * and staff can manage the queue with priority scoring.
       */
      waitlist: {
        Row: {
          id: string                                              // Unique identifier for waitlist entry
          parent_name: string                                     // Name of the parent
          parent_email: string                                    // Parent's email address
          parent_phone: string                                    // Parent's phone number
          child_name: string                                      // Name of the child waiting for enrollment
          child_age: string                                       // Age of the child
          desired_start_date: string                              // When they want to start
          preferred_schedule: string | null                       // Preferred schedule (full-time, part-time, etc.)
          notes: string | null                                    // Additional notes or requirements
          priority_score: number                                  // Calculated priority score for queue position
          status: 'waiting' | 'contacted' | 'enrolled' | 'withdrawn' // Current waitlist status
          position: number                                        // Position in the waitlist queue
          metadata: Json                                          // Additional information
          created_at: string                                      // When added to waitlist
          updated_at: string                                      // When last updated
        }
        Insert: {
          id?: string
          parent_name: string
          parent_email: string
          parent_phone: string
          child_name: string
          child_age: string
          desired_start_date: string
          preferred_schedule?: string | null
          notes?: string | null
          priority_score?: number
          status?: 'waiting' | 'contacted' | 'enrolled' | 'withdrawn'
          position?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_name?: string
          parent_email?: string
          parent_phone?: string
          child_name?: string
          child_age?: string
          desired_start_date?: string
          preferred_schedule?: string | null
          notes?: string | null
          priority_score?: number
          status?: 'waiting' | 'contacted' | 'enrolled' | 'withdrawn'
          position?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      classrooms: {
        Row: {
          id: string
          name: string
          age_group: string
          capacity: number
          current_enrollment: number
          lead_teacher: string | null
          assistant_teachers: string[] | null
          room_number: string | null
          schedule: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          age_group: string
          capacity: number
          current_enrollment?: number
          lead_teacher?: string | null
          assistant_teachers?: string[] | null
          room_number?: string | null
          schedule?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age_group?: string
          capacity?: number
          current_enrollment?: number
          lead_teacher?: string | null
          assistant_teachers?: string[] | null
          room_number?: string | null
          schedule?: Json
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          start_time: string
          end_time: string | null
          location: string | null
          event_type: string
          is_recurring: boolean
          recurrence_pattern: Json | null
          max_attendees: number | null
          current_attendees: number
          registration_required: boolean
          registration_deadline: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          start_time: string
          end_time?: string | null
          location?: string | null
          event_type: string
          is_recurring?: boolean
          recurrence_pattern?: Json | null
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          start_time?: string
          end_time?: string | null
          location?: string | null
          event_type?: string
          is_recurring?: boolean
          recurrence_pattern?: Json | null
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          target_audience: string[] | null
          published: boolean
          publish_date: string
          expire_date: string | null
          author_id: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          target_audience?: string[] | null
          published?: boolean
          publish_date?: string
          expire_date?: string | null
          author_id: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          target_audience?: string[] | null
          published?: boolean
          publish_date?: string
          expire_date?: string | null
          author_id?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          file_url: string | null
          external_url: string | null
          tags: string[] | null
          access_level: 'public' | 'parent' | 'staff' | 'admin'
          download_count: number
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          file_url?: string | null
          external_url?: string | null
          tags?: string[] | null
          access_level?: 'public' | 'parent' | 'staff' | 'admin'
          download_count?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          file_url?: string | null
          external_url?: string | null
          tags?: string[] | null
          access_level?: 'public' | 'parent' | 'staff' | 'admin'
          download_count?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    /**
     * DATABASE VIEWS
     * 
     * Currently no views are defined in the database.
     * Views would be pre-defined queries that act like virtual tables.
     */
    Views: {
      [_ in never]: never
    }
    
    /**
     * DATABASE FUNCTIONS
     * 
     * These are custom functions defined in the database that perform
     * complex operations or calculations that are better handled at the database level.
     */
    Functions: {
      /**
       * Rate limiting function to prevent spam submissions
       * 
       * @param p_email - Email address to check
       * @param p_limit - Maximum submissions allowed (optional)
       * @param p_window - Time window for rate limiting (optional)
       * @returns boolean - true if submission is allowed, false if rate limited
       */
      check_rate_limit: {
        Args: {
          p_email: string
          p_limit?: number
          p_window?: string
        }
        Returns: boolean
      }
      
      /**
       * Calculates priority score for waitlist management
       * 
       * @param desired_date - When they want to start
       * @param has_sibling - Whether they have a sibling already enrolled
       * @param is_staff_child - Whether this is a staff member's child
       * @returns number - Calculated priority score
       */
      calculate_priority_score: {
        Args: {
          desired_date: string
          has_sibling: boolean
          is_staff_child: boolean
        }
        Returns: number
      }
      
      /**
       * Gets the number of available spots in a classroom
       * 
       * @param classroom_id - ID of the classroom to check
       * @returns number - Number of available spots
       */
      get_available_spots: {
        Args: {
          classroom_id: string
        }
        Returns: number
      }
      
      /**
       * Synchronizes user metadata across systems
       * 
       * This function ensures user information is consistent
       * across all related tables and systems.
       */
      sync_user_metadata: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    
    /**
     * DATABASE ENUMS
     * 
     * These define the allowed values for certain fields.
     * Using enums ensures data consistency and prevents invalid values.
     */
    Enums: {
      user_role: 'admin' | 'staff' | 'parent'                              // Possible user roles in the system
      child_status: 'active' | 'inactive' | 'waitlist'                     // Possible child enrollment statuses
      document_status: 'pending' | 'approved' | 'rejected' | 'expired'     // Possible document review statuses
      referral_status: 'pending' | 'completed' | 'expired'                 // Possible referral statuses
      waitlist_status: 'waiting' | 'contacted' | 'enrolled' | 'withdrawn'  // Possible waitlist statuses
      priority_level: 'low' | 'medium' | 'high' | 'urgent'                // Possible priority levels for announcements
      access_level: 'public' | 'parent' | 'staff' | 'admin'               // Possible access levels for resources
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/**
 * UTILITY TYPES FOR EASIER DATABASE ACCESS
 * 
 * These helper types make it easier to work with specific table data
 * without having to write the full Database['public']['Tables']['table_name'] path.
 */

/**
 * Tables type helper
 * 
 * Use this to get the Row type for any table. This represents the data structure
 * when reading records from the database.
 * 
 * Example usage:
 * - Tables<'users'> gets the user row type
 * - Tables<'children'> gets the children row type
 */
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

/**
 * TablesInsert type helper
 * 
 * Use this to get the Insert type for any table. This represents the data structure
 * required when creating new records in the database.
 * 
 * Example usage:
 * - TablesInsert<'users'> gets the user insert type
 * - TablesInsert<'children'> gets the children insert type
 */
export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

/**
 * TablesUpdate type helper
 * 
 * Use this to get the Update type for any table. This represents the data structure
 * when updating existing records in the database.
 * 
 * Example usage:
 * - TablesUpdate<'users'> gets the user update type
 * - TablesUpdate<'children'> gets the children update type
 */
export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

/**
 * Enums type helper
 * 
 * Use this to get enum values for any database enum.
 * 
 * Example usage:
 * - Enums<'user_role'> gets 'admin' | 'staff' | 'parent'
 * - Enums<'child_status'> gets 'active' | 'inactive' | 'waitlist'
 */
export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never