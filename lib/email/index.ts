/**
 * 🌟 Email Service Configuration for GBDC Website
 * 
 * This file sets up our email system using Resend!
 * Think of it like a magical post office that sends beautiful emails
 * to parents, children, and families about our daycare.
 * 
 * What this does:
 * - Creates a connection to Resend (our email service)
 * - Provides easy functions to send different types of emails
 * - Makes sure all our emails look pretty and professional
 * 
 * For grown-ups: This is a service layer that abstracts Resend functionality
 * with proper error handling and TypeScript support.
 */

import { Resend } from 'resend'

// 🔧 Create our email service connection
// This is like opening our magical post office!
if (!process.env.RESEND_API_KEY) {
  throw new Error('🚨 RESEND_API_KEY is missing! We need this to send emails.')
}

// Initialize Resend with our API key
export const resend = new Resend(process.env.RESEND_API_KEY)

// 📧 Email configuration settings
export const EMAIL_CONFIG = {
  // Where emails come from (like the return address on a letter)
  from: process.env.RESEND_FROM_EMAIL || 'noreply@greatbeginningsdaycare.com',
  
  // Business information for our emails
  business: {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Great Beginnings Day Care Center',
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(630) 894-3440',
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '757 E Nerge Rd, Roselle, IL 60172',
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@greatbeginningsdaycare.com',
    website: process.env.NEXT_PUBLIC_APP_URL || 'https://greatbeginningsdaycare.com'
  },
  
  // Email template subjects (the titles of our emails)
  subjects: {
    documentUpload: '📄 Document Received - Great Beginnings Day Care',
    contactForm: '📝 New Message from Website - Great Beginnings Day Care',
    welcome: '🌟 Welcome to Great Beginnings Day Care Family!',
    enrollment: '🎉 Enrollment Confirmation - Great Beginnings Day Care'
  }
} as const

/**
 * 🎯 Type definitions for our email system
 * These tell TypeScript what information each email needs
 */

// Base email recipient information
export interface EmailRecipient {
  email: string
  name?: string
}

// Information needed for document upload emails
export interface DocumentUploadEmailData {
  parentName: string
  childName: string
  documentType: string
  fileName: string
  uploadDate: Date
  documentCount: number
}

// Information needed for contact form emails
export interface ContactFormEmailData {
  name: string
  email: string
  phone?: string
  message: string
  inquiryType: string
  submittedAt: Date
}

// Information needed for welcome emails
export interface WelcomeEmailData {
  parentName: string
  childName: string
  startDate: Date
  classroom?: string
  teacher?: string
}

// Information needed for enrollment confirmation emails
export interface EnrollmentEmailData {
  parentName: string
  childName: string
  program: string
  startDate: Date
  classroom: string
  teacher: string
  tuition: number
  nextSteps: string[]
}

/**
 * 📬 Main email sending function
 * This is our magical email sender that can send any type of email!
 * 
 * @param to - Who should receive the email
 * @param subject - The title of the email
 * @param react - The beautiful React email template
 * @returns Promise with email result
 */
export async function sendEmail(
  to: string | EmailRecipient[],
  subject: string,
  react: React.ReactElement
) {
  try {
    console.log('📧 Sending email:', { to, subject })
    
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: Array.isArray(to) ? to.map(recipient => 
        typeof recipient === 'string' ? recipient : recipient.email
      ) : to,
      subject,
      react
    })
    
    console.log('✅ Email sent successfully:', result.data?.id)
    return { success: true, data: result.data }
    
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * 🔍 Email validation helper
 * Checks if an email address looks correct
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 📝 Format phone number helper
 * Makes phone numbers look nice and consistent
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

/**
 * 📅 Format date helper
 * Makes dates look nice in our emails
 */
export function formatEmailDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * 🎨 Email template utilities
 * These help make our emails look consistent and beautiful
 */
export const EMAIL_STYLES = {
  colors: {
    primary: '#3B82F6', // Blue - trust and reliability
    secondary: '#10B981', // Green - growth and nature
    accent: '#F59E0B', // Orange - warmth and energy
    text: '#374151', // Dark gray - easy to read
    lightText: '#6B7280', // Light gray - secondary text
    background: '#F9FAFB', // Very light gray - email background
    white: '#FFFFFF'
  },
  fonts: {
    heading: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    body: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
} as const

// Export the Resend instance for advanced usage if needed
export { resend as resendClient }