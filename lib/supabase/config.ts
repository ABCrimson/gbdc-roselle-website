/**
 * 🏗️ SUPABASE CONFIGURATION CENTER
 * 
 * Think of this file as the "control panel" for our app's database and backend!
 * Just like how a remote control has all the buttons for your TV, this file
 * has all the settings for how our app talks to Supabase (our online database).
 * 
 * What is Supabase?
 * Supabase is like a super-powered online filing cabinet that can:
 * - Store information (like user accounts, photos, documents)
 * - Send emails automatically
 * - Handle payments
 * - Keep things secure
 * - Update information in real-time (like a live chat)
 * 
 * This file sets up all the "rules" and "addresses" so our app knows:
 * - Where to find our online database
 * - How to connect securely
 * - What special functions are available
 * - How to organize different types of files
 * 
 * Version: Using Supabase 2.57.4 (like version 2.57.4 of a video game)
 * Pattern: Edge Functions v2 (the newest way to run special tasks)
 */

import type { Database } from '@/database/types'

/**
 * 🔧 MAIN CONFIGURATION OBJECT
 * 
 * This is like the "settings menu" for our entire app!
 * Think of it like setting up a new phone - you need to tell it:
 * - Your Wi-Fi password (so it can connect to the internet)
 * - Your email settings (so it can send messages)
 * - Your security preferences (so strangers can't access your stuff)
 * 
 * Every part of our app will use these settings to know how to work properly.
 */
export const supabaseConfig = {
  // 🌐 CONNECTION ADDRESSES
  // These are like the "phone numbers" our app uses to call Supabase
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,           // The main address of our database (like a website URL)
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  // A public key (like a visitor badge) for normal users
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // A master key (like admin access) for special operations
  
  // 🔐 AUTHENTICATION SETTINGS
  // These control how users log in and stay logged in
  // Think of this like the security system for an apartment building
  auth: {
    // Should we automatically renew the user's "entrance pass"? YES!
    // Like extending your library card before it expires
    autoRefreshToken: true,
    
    // Should we remember the user is logged in when they close and reopen the app? YES!
    // Like how Netflix remembers you're logged in
    persistSession: true,
    
    // Should we check the website address for login information? YES!
    // Like checking for a special code in a link someone sends you
    detectSessionInUrl: true,
    
    // What security method should we use? The strongest one available (PKCE)!
    // PKCE is like using a really good lock on your house
    flowType: 'pkce' as const, 
    
    // Where should we store the user's login information?
    // In the browser's storage (like a cookie jar) if we're on a website, nowhere if on a server
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    
    // What should we name the login information file? 
    // Like naming your keychain "GBDC Keys"
    storageKey: 'gbdc-auth-token',
    
    // 🍪 COOKIE SETTINGS (for server-side authentication)
    // Cookies are like little notes the website leaves on your computer to remember you
    cookieOptions: {
      name: 'gbdc-auth',                    // What to name our cookie (like a file name)
      lifetime: 60 * 60 * 24 * 7,          // How long it should last (7 days)
      domain: '',                           // What website can read it (empty = only ours)
      path: '/',                            // What pages can use it (/ = all pages)
      sameSite: 'lax' as const,            // Security setting (lax = reasonably secure)
    },
  },
  
  // ⚡ REAL-TIME SETTINGS
  // These control how our app gets live updates (like a live sports score)
  // Think of this like tuning a radio to get clear reception
  realtime: {
    params: {
      eventsPerSecond: 10,                  // How many updates we can handle per second (like speed limit)
    },
    timeout: 10000,                         // How long to wait for a response (10 seconds, like waiting for a text back)
  },
  
  // 🗄️ DATABASE CONFIGURATION
  // These settings control how we talk to the database
  db: {
    schema: 'public',                       // Which "section" of the database to use ('public' = everyone can see)
  },
  
  // 🌍 GLOBAL NETWORK SETTINGS
  // These are applied to every request our app makes to Supabase
  // Like adding your return address to every letter you send
  global: {
    headers: {
      'x-application-name': 'gbdc-website', // Tells Supabase this request is from our GBDC website
    },
    // How should we send requests? Use the browser's built-in method if available
    fetch: typeof fetch !== 'undefined' ? fetch.bind(globalThis) : undefined,
  },
} as const

/**
 * 🚀 EDGE FUNCTIONS CONFIGURATION
 * 
 * Edge Functions are like "super helpers" that run in the cloud!
 * Think of them as magical assistants that can:
 * - Send emails when someone signs up
 * - Process documents and make PDFs  
 * - Handle payments safely
 * - Translate text to different languages
 * - Do complex tasks without slowing down our website
 * 
 * They're called "Edge" functions because they run close to users around the world
 * (like having helpers in different cities instead of just one office)
 * 
 * Version: Using Edge Functions v2 (the newest and best version)
 */
export const edgeFunctions = {
  // 🏠 BASE ADDRESS for all our special functions
  // This is like the main office address where all our helpers work
  baseUrl: `${supabaseConfig.url}/functions/v1`,
  
  // 📋 LIST OF ALL AVAILABLE HELPER FUNCTIONS
  // Each of these is like a different type of assistant that can help with specific tasks
  endpoints: {
    // 📧 EMAIL HELPERS (Functions that send emails automatically)
    sendEmail: '/send-email',                           // General purpose email sender
    sendWelcomeEmail: '/send-welcome-email',           // Sends welcome emails to new families
    sendEnrollmentConfirmation: '/send-enrollment-confirmation', // Confirms enrollment is complete
    
    // 📄 DOCUMENT HELPERS (Functions that work with files and documents)  
    processDocument: '/process-document',               // Cleans up and processes uploaded documents
    generatePdf: '/generate-pdf',                      // Creates PDF files (like enrollment forms)
    scanForVirus: '/scan-virus',                       // Checks files for viruses (keeps us safe!)
    
    // 📅 SCHEDULING HELPERS (Functions for appointments and reminders)
    scheduleTour: '/schedule-tour',                    // Books daycare tour appointments
    sendReminder: '/send-reminder',                    // Sends reminder emails/texts
    
    // 💳 PAYMENT HELPERS (Functions for handling money safely)
    createPaymentIntent: '/create-payment-intent',     // Sets up a payment (like getting ready to pay)
    processPayment: '/process-payment',                // Actually processes the payment
    
    // 📊 ANALYTICS HELPERS (Functions that track and report information)
    trackEvent: '/track-event',                        // Records when important things happen
    generateReport: '/generate-report',                // Creates reports for staff
    
    // 🤖 AI/SMART HELPERS (Functions that use artificial intelligence)
    translateContent: '/translate-content',            // Translates text to Spanish, Russian, Ukrainian
    analyzeDocument: '/analyze-document',              // Smart reading of documents
    
    // 🔗 INTEGRATION HELPERS (Functions that connect with other services)
    handleWebhook: '/handle-webhook',                  // Receives notifications from other services
    syncCalendar: '/sync-calendar',                    // Syncs with Google Calendar or similar
  },
  
  // 📝 DEFAULT SETTINGS for all Edge Function requests
  // These get sent with every request to our helper functions
  headers: {
    'Content-Type': 'application/json',      // Tell them we're sending JSON data (like a structured letter)
    'x-client-info': 'gbdc-website@0.1.0',  // Identify ourselves (like signing our name)
  },
} as const

/**
 * 🗂️ STORAGE BUCKETS CONFIGURATION
 * 
 * Storage buckets are like different filing cabinets where we keep files!
 * Think of them as labeled boxes in a storage unit:
 * - Each bucket has a specific purpose
 * - Files are organized by type
 * - Some boxes everyone can see, others are private
 * - We can easily find things because everything has its place
 * 
 * This keeps our files organized and makes the website run faster!
 */
export const storageBuckets = {
  // 📄 For enrollment forms, medical records, legal documents
  // Like a locked filing cabinet in the office
  documents: 'documents',
  
  // 👤 For profile pictures of children, families, and staff  
  // Like a photo album but digital
  avatars: 'avatars',
  
  // 📎 For general file uploads (forms, photos, etc.)
  // Like a miscellaneous folder for everything else
  uploads: 'uploads',
  
  // 🌍 For images and files everyone can see (website pictures, logos)
  // Like a bulletin board that everyone can look at
  public: 'public',
  
  // ⏰ For files that get automatically deleted after a while
  // Like a temporary desk where things don't stay long
  temp: 'temp',
} as const

/**
 * 📺 REAL-TIME CHANNELS CONFIGURATION
 * 
 * Real-time channels are like different TV channels or radio stations!
 * Each channel broadcasts updates about specific topics instantly.
 * When something happens, everyone "tuned in" to that channel gets the update immediately.
 * 
 * It's like having a walkie-talkie system where:
 * - Channel 1 is for announcements
 * - Channel 2 is for enrollment updates  
 * - Channel 3 is for messages
 * - etc.
 * 
 * This lets our website update instantly without needing to refresh the page!
 */
export const realtimeChannels = {
  // 📢 For important announcements (like snow days, holiday closures)
  // Everyone connected gets notified immediately
  announcements: 'announcements',
  
  // 📝 For enrollment status changes (approved, waitlisted, etc.)
  // Parents get instant updates about their application
  enrollments: 'enrollments',
  
  // ⏳ For waitlist position updates
  // Families know right away when their position changes
  waitlist: 'waitlist',
  
  // 💬 For chat messages between staff and parents
  // Like instant messaging but for important communications
  messages: 'messages',
  
  // 🎉 For event updates (field trips, parties, activities)
  // Everyone gets notified when events are added or changed
  events: 'events',
  
  // 📄 For document status updates (received, processed, approved)
  // Parents know immediately when their documents are reviewed
  documents: 'documents',
} as const

/**
 * 🗃️ DATABASE TABLE NAMES
 * 
 * Think of database tables like different spreadsheets in a filing system.
 * Each table holds a different type of information:
 * - Users table = Contact information for families and staff
 * - Children table = Information about each child
 * - Documents table = Records of uploaded paperwork
 * - etc.
 * 
 * By giving each table a specific name, our app always knows exactly
 * where to find or store different types of information.
 * This prevents confusion and keeps everything organized!
 */
export const tables = {
  users: 'users',                        // Parent and staff account information
  children: 'children',                  // Child profiles and details
  documents: 'document_uploads',         // Uploaded documents and forms
  referrals: 'referrals',               // Referral program information
  contacts: 'contact_submissions',       // Contact form submissions
  waitlist: 'waitlist',                 // Families waiting for enrollment
  classrooms: 'classrooms',             // Classroom information and capacity
  events: 'events',                     // Daycare events and activities
  announcements: 'announcements',       // Important announcements
  resources: 'resources',               // Educational resources and materials
  auditLogs: 'audit_logs',              // Security and activity logs
} as const

/**
 * 📝 TYPE DEFINITIONS
 * 
 * These are like "instruction sheets" that tell TypeScript exactly what
 * each configuration option should look like. Think of them as:
 * - A recipe that lists all the ingredients needed
 * - A checklist that makes sure everything is correct
 * - A guide that helps prevent mistakes
 */
export type SupabaseConfig = typeof supabaseConfig
export type EdgeFunctionEndpoint = keyof typeof edgeFunctions.endpoints
export type StorageBucket = keyof typeof storageBuckets
export type RealtimeChannel = keyof typeof realtimeChannels
export type TableName = keyof typeof tables

/**
 * 🔍 CONFIGURATION VALIDATOR
 * 
 * This function is like a "pre-flight check" before takeoff!
 * It makes sure all the important settings are properly configured
 * before our app tries to connect to Supabase.
 * 
 * Think of it like checking that you have:
 * - Your keys before leaving the house
 * - Gas in the car before a road trip  
 * - The right address before sending mail
 * 
 * If something is missing, it tells us exactly what's wrong
 * so we can fix it before users see any problems.
 */
export function validateSupabaseConfig(): void {
  // List of absolutely essential settings (like house keys - can't work without them)
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',        // The address of our database
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',   // The basic access key
  ]
  
  // Check if any essential settings are missing
  const missing = required.filter(key => !process.env[key])
  
  // If something important is missing, stop and tell the developer
  if (missing.length > 0) {
    throw new Error(
      `Missing required Supabase environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file.'
    )
  }
  
  // Double-check that the database URL looks correct (like checking an address format)
  try {
    new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!)
  } catch {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL format')
  }
}

/**
 * 🔗 URL BUILDER FOR EDGE FUNCTIONS
 * 
 * This function is like a "address builder" for our special helper functions!
 * Instead of having to remember the full address every time, you just say which
 * helper you want to use, and this builds the complete address automatically.
 * 
 * Example: Instead of typing "https://myproject.supabase.co/functions/v1/send-email"
 * You just say "sendEmail" and this function builds the full address for you!
 * 
 * @param endpoint - Which helper function you want to use (like "sendEmail")
 * @returns The complete web address to reach that helper function
 */
export function getEdgeFunctionUrl(endpoint: EdgeFunctionEndpoint): string {
  return `${edgeFunctions.baseUrl}${edgeFunctions.endpoints[endpoint]}`
}

/**
 * 🗂️ URL BUILDER FOR FILE STORAGE
 * 
 * This function creates web addresses for files stored in our buckets!
 * Think of it like getting the exact address where a specific box
 * is stored in a storage facility.
 * 
 * Example: If you want to show a profile picture, this function creates
 * the web address where browsers can find and display that image.
 * 
 * @param bucket - Which storage "box" the file is in (like "avatars")
 * @returns The complete web address where files in that bucket can be accessed
 */
export function getStorageBucketUrl(bucket: StorageBucket): string {
  return `${supabaseConfig.url}/storage/v1/object/public/${storageBuckets[bucket]}`
}