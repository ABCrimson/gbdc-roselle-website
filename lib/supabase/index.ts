/**
 * 📚 SUPABASE LIBRARY MAIN ENTRANCE
 * 
 * Think of this file as the "front desk" or "main lobby" of a big building!
 * Instead of having to remember which floor each office is on, you just come
 * to the front desk and ask for what you need.
 * 
 * What does this file do?
 * - Collects ALL our Supabase tools from different files
 * - Organizes them in one convenient place
 * - Makes it easy to import exactly what you need
 * - Provides a single "shopping list" of available tools
 * 
 * Why is this useful?
 * ✅ Instead of: import { createClient } from './supabase/client'
 *                import { useAuth } from './supabase/hooks'  
 *                import { uploadFile } from './supabase/utils'
 * 
 * ✅ You can do: import { createClient, useAuth, uploadFile } from './supabase'
 * 
 * It's like having a universal remote control instead of separate remotes
 * for your TV, cable box, sound system, and lights!
 * 
 * What's available in our toolbox?
 * 🔌 Clients: Different ways to connect to Supabase
 * 🪝 Hooks: React superpowers for components
 * 🛠️ Utils: Helpful tools and utilities
 * 🚀 Edge Functions: Cloud helper services
 * ⚙️ Config: Settings and configuration
 * 🛡️ Middleware: Behind-the-scenes authentication helpers
 * 
 * @version Supabase 2.57.4 (your one-stop shop for all Supabase needs)
 */

// Client exports
export { createClient, getClient, clearClient } from './client'
export type { SupabaseClientType } from './client'

// Server exports
export { createClient as createServerClient, createServiceClient, createApiClient } from './server'
export type { ServerClient, ServiceClient } from './server'

// Middleware exports
export { updateSession } from './middleware'

// Configuration exports
export {
  supabaseConfig,
  edgeFunctions,
  storageBuckets,
  realtimeChannels,
  tables,
  validateSupabaseConfig,
  getEdgeFunctionUrl,
  getStorageBucketUrl,
} from './config'
export type {
  SupabaseConfig,
  EdgeFunctionEndpoint,
  StorageBucket,
  RealtimeChannel,
  TableName,
} from './config'

// Edge Functions exports
export {
  EdgeFunctionsClient,
  createEdgeFunctionsClient,
  useEdgeFunctions,
} from './edge-functions'
export type {
  EdgeFunctionResponse,
  EdgeFunctionError,
  SendEmailPayload,
  WelcomeEmailPayload,
  EnrollmentConfirmationPayload,
  ProcessDocumentPayload,
  GeneratePdfPayload,
  ScheduleTourPayload,
  SendReminderPayload,
  CreatePaymentIntentPayload,
  ProcessPaymentPayload,
  TrackEventPayload,
  GenerateReportPayload,
  TranslateContentPayload,
} from './edge-functions'

// Utilities exports
export {
  testConnection,
  withRetry,
  executeBatch,
  transaction,
  getPaginated,
  getPublicUrl,
  getSignedUrl,
  uploadFile,
  deleteFile,
  supabaseUtils,
  SupabaseError,
  isPostgrestError,
} from './utils'
export type {
  ConnectionStatus,
  ConnectionState,
  RetryConfig,
  BatchConfig,
  PaginationParams,
  PaginatedResponse,
} from './utils'

// React hooks exports (only for client components)
export {
  useSupabase,
  useAuth,
  useConnectionStatus,
  useRealtime,
  useQuery,
  useMutation,
  usePagination,
  useFileUpload,
} from './hooks'

// Re-export database types for convenience
export type { Database } from '@/database/types'

/**
 * Quick start examples:
 * 
 * Client-side (React components):
 * ```tsx
 * import { createClient, useAuth } from '@/lib/supabase'
 * 
 * function MyComponent() {
 *   const supabase = createClient()
 *   const { user, signIn } = useAuth()
 * }
 * ```
 * 
 * Server-side (Server Components/API routes):
 * ```tsx
 * import { createServerClient } from '@/lib/supabase'
 * 
 * export default async function Page() {
 *   const supabase = await createServerClient()
 *   const { data } = await supabase.from('users').select()
 * }
 * ```
 * 
 * Edge Functions:
 * ```tsx
 * import { createClient, createEdgeFunctionsClient } from '@/lib/supabase'
 * 
 * const supabase = createClient()
 * const edgeFunctions = createEdgeFunctionsClient(supabase)
 * await edgeFunctions.sendEmail({ to: 'user@example.com', subject: 'Hello' })
 * ```
 */