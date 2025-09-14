/**
 * 📧 Email Service Functions for GBDC Website
 * 
 * This file contains all the specific email sending functions that make
 * it super easy to send different types of emails! Each function is like
 * a special button that creates and sends a specific kind of email.
 * 
 * Think of it like having different mail templates:
 * - One for when documents are uploaded
 * - One for when families contact us
 * - One for welcoming new families
 * - One for confirming enrollment
 * 
 * For grown-ups: This provides a clean service layer with proper error
 * handling, logging, and type safety for all email operations.
 */

import React from 'react'
import { render } from '@react-email/render'
import {
  sendEmail,
  EMAIL_CONFIG,
  DocumentUploadEmailData,
  ContactFormEmailData,
  WelcomeEmailData,
  EnrollmentEmailData,
  EmailRecipient,
  isValidEmail
} from './index'

// Import all our beautiful email templates
import DocumentUploadEmail from './templates/document-upload'
import ContactFormEmail from './templates/contact-form'
import WelcomeEmail from './templates/welcome'
import EnrollmentConfirmationEmail from './templates/enrollment-confirmation'

/**
 * 📄 Send Document Upload Notification Email
 * 
 * This function sends a nice email to parents when we receive their documents.
 * It's like sending a receipt that says "We got your papers!"
 */
export async function sendDocumentUploadEmail(
  data: DocumentUploadEmailData,
  recipientEmail: string
) {
  try {
    // 🔍 Check if email looks correct
    if (!isValidEmail(recipientEmail)) {
      throw new Error(`Invalid email address: ${recipientEmail}`)
    }

    // Document upload notification being sent

    // 🎨 Create the beautiful email template
    const emailHtml = render(
      React.createElement(DocumentUploadEmail, { data })
    )

    // 📧 Send the email
    const result = await sendEmail(
      recipientEmail,
      EMAIL_CONFIG.subjects.documentUpload,
      React.createElement(DocumentUploadEmail, { data })
    )

    if (result.success) {
      // Document upload email sent successfully
      return {
        success: true,
        emailId: result.data?.id,
        message: 'Document upload notification sent successfully'
      }
    } else {
      throw new Error(result.error || 'Failed to send document upload email')
    }

  } catch (error) {
    console.error('❌ Error sending document upload email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * 📝 Send Contact Form Emails
 * 
 * This function sends TWO emails when someone contacts us:
 * 1. To our staff - so they know about the inquiry
 * 2. To the family - to confirm we got their message
 * 
 * It's like having an automatic assistant that never forgets!
 */
export async function sendContactFormEmails(
  data: ContactFormEmailData,
  options: {
    sendToStaff?: boolean
    sendConfirmation?: boolean
    staffEmail?: string
  } = {}
) {
  const {
    sendToStaff = true,
    sendConfirmation = true,
    staffEmail = EMAIL_CONFIG.business.email
  } = options

  const results = {
    staffEmail: { success: false, error: '', emailId: '' },
    confirmationEmail: { success: false, error: '', emailId: '' }
  }

  try {
    // 🔍 Validate the customer's email
    if (!isValidEmail(data.email)) {
      throw new Error(`Invalid customer email address: ${data.email}`)
    }

    // Processing contact form emails

    // 📧 Send notification to staff
    if (sendToStaff) {
      try {
        if (!isValidEmail(staffEmail)) {
          throw new Error(`Invalid staff email address: ${staffEmail}`)
        }

        const staffResult = await sendEmail(
          staffEmail,
          `${EMAIL_CONFIG.subjects.contactForm} - ${data.inquiryType}`,
          React.createElement(ContactFormEmail, { data, type: 'staff' })
        )

        if (staffResult.success) {
          results.staffEmail = {
            success: true,
            error: '',
            emailId: staffResult.data?.id || ''
          }
          // Staff notification sent successfully
        } else {
          results.staffEmail.error = staffResult.error || 'Failed to send staff notification'
        }
      } catch (error) {
        results.staffEmail.error = error instanceof Error ? error.message : 'Unknown error'
        console.error('❌ Error sending staff notification:', error)
      }
    }

    // 📧 Send confirmation to customer
    if (sendConfirmation) {
      try {
        const confirmationResult = await sendEmail(
          data.email,
          `Thank you for contacting ${EMAIL_CONFIG.business.name}`,
          React.createElement(ContactFormEmail, { data, type: 'confirmation' })
        )

        if (confirmationResult.success) {
          results.confirmationEmail = {
            success: true,
            error: '',
            emailId: confirmationResult.data?.id || ''
          }
          // Customer confirmation sent successfully
        } else {
          results.confirmationEmail.error = confirmationResult.error || 'Failed to send confirmation'
        }
      } catch (error) {
        results.confirmationEmail.error = error instanceof Error ? error.message : 'Unknown error'
        console.error('❌ Error sending customer confirmation:', error)
      }
    }

    // 🎯 Determine overall success
    const overallSuccess = 
      (!sendToStaff || results.staffEmail.success) &&
      (!sendConfirmation || results.confirmationEmail.success)

    return {
      success: overallSuccess,
      results,
      message: overallSuccess 
        ? 'Contact form emails processed successfully'
        : 'Some contact form emails failed to send'
    }

  } catch (error) {
    console.error('❌ Error processing contact form emails:', error)
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * 🌟 Send Welcome Email
 * 
 * This function sends a super special welcome email to new families!
 * It's like rolling out the red carpet and saying "Welcome to our family!"
 */
export async function sendWelcomeEmail(
  data: WelcomeEmailData,
  recipientEmail: string
) {
  try {
    // 🔍 Check if email looks correct
    if (!isValidEmail(recipientEmail)) {
      throw new Error(`Invalid email address: ${recipientEmail}`)
    }

    // Sending welcome email

    // 📧 Send the welcome email
    const result = await sendEmail(
      recipientEmail,
      EMAIL_CONFIG.subjects.welcome,
      React.createElement(WelcomeEmail, { data })
    )

    if (result.success) {
      // Welcome email sent successfully
      return {
        success: true,
        emailId: result.data?.id,
        message: 'Welcome email sent successfully'
      }
    } else {
      throw new Error(result.error || 'Failed to send welcome email')
    }

  } catch (error) {
    console.error('❌ Error sending welcome email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * 🎉 Send Enrollment Confirmation Email
 * 
 * This function sends an official enrollment confirmation email!
 * It's like giving families a golden ticket that says they're officially
 * part of our daycare family.
 */
export async function sendEnrollmentConfirmationEmail(
  data: EnrollmentEmailData,
  recipientEmail: string
) {
  try {
    // 🔍 Check if email looks correct
    if (!isValidEmail(recipientEmail)) {
      throw new Error(`Invalid email address: ${recipientEmail}`)
    }

    // Sending enrollment confirmation

    // 📧 Send the enrollment confirmation
    const result = await sendEmail(
      recipientEmail,
      EMAIL_CONFIG.subjects.enrollment,
      React.createElement(EnrollmentConfirmationEmail, { data })
    )

    if (result.success) {
      // Enrollment confirmation sent successfully
      return {
        success: true,
        emailId: result.data?.id,
        message: 'Enrollment confirmation sent successfully'
      }
    } else {
      throw new Error(result.error || 'Failed to send enrollment confirmation')
    }

  } catch (error) {
    console.error('❌ Error sending enrollment confirmation:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * 🎯 Send Multiple Emails at Once
 * 
 * This function can send several emails at the same time!
 * It's like having a super-efficient mail carrier that can
 * deliver lots of different letters all at once.
 */
export async function sendBulkEmails(
  emails: Array<{
    type: 'document' | 'contact' | 'welcome' | 'enrollment'
    data: DocumentUploadEmailData | ContactFormEmailData | WelcomeEmailData | EnrollmentEmailData
    recipient: string
    options?: {
      sendToStaff?: boolean
      sendConfirmation?: boolean
      staffEmail?: string
    }
  }>
) {
  const results = []

  // Sending bulk emails

  for (const email of emails) {
    try {
      let result

      switch (email.type) {
        case 'document':
          result = await sendDocumentUploadEmail(
            email.data as DocumentUploadEmailData,
            email.recipient
          )
          break
        
        case 'contact':
          result = await sendContactFormEmails(
            email.data as ContactFormEmailData,
            email.options
          )
          break
        
        case 'welcome':
          result = await sendWelcomeEmail(
            email.data as WelcomeEmailData,
            email.recipient
          )
          break
        
        case 'enrollment':
          result = await sendEnrollmentConfirmationEmail(
            email.data as EnrollmentEmailData,
            email.recipient
          )
          break
        
        default:
          result = {
            success: false,
            error: `Unknown email type: ${email.type}`
          }
      }

      results.push({
        type: email.type,
        recipient: email.recipient,
        ...result
      })

    } catch (error) {
      results.push({
        type: email.type,
        recipient: email.recipient,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const successCount = results.filter(r => r.success).length
  const failCount = results.length - successCount

  // Bulk email processing completed

  return {
    success: failCount === 0,
    totalSent: emails.length,
    successCount,
    failCount,
    results
  }
}

/**
 * 🔍 Email Template Preview Functions
 * 
 * These functions let developers see what emails will look like
 * before sending them. It's like having a preview button!
 */

export function previewDocumentUploadEmail(data: DocumentUploadEmailData): string {
  return render(React.createElement(DocumentUploadEmail, { data }))
}

export function previewContactFormEmail(
  data: ContactFormEmailData, 
  type: 'staff' | 'confirmation'
): string {
  return render(React.createElement(ContactFormEmail, { data, type }))
}

export function previewWelcomeEmail(data: WelcomeEmailData): string {
  return render(React.createElement(WelcomeEmail, { data }))
}

export function previewEnrollmentConfirmationEmail(data: EnrollmentEmailData): string {
  return render(React.createElement(EnrollmentConfirmationEmail, { data }))
}

/**
 * 📈 Email Analytics and Utilities
 * 
 * Helper functions for tracking and managing emails
 */

export interface EmailAnalytics {
  totalSent: number
  successRate: number
  failureCount: number
  lastSent?: Date
  mostCommonErrors: string[]
}

// Simple in-memory tracking (in a real app, this would use a database)
let emailStats = {
  totalSent: 0,
  totalFailed: 0,
  errors: [] as string[],
  lastSent: undefined as Date | undefined
}

export function trackEmailSent(success: boolean, error?: string) {
  emailStats.totalSent++
  if (!success) {
    emailStats.totalFailed++
    if (error) {
      emailStats.errors.push(error)
    }
  }
  emailStats.lastSent = new Date()
}

export function getEmailAnalytics(): EmailAnalytics {
  const errorCounts = emailStats.errors.reduce((acc, error) => {
    acc[error] = (acc[error] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostCommonErrors = Object.entries(errorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([error]) => error)

  return {
    totalSent: emailStats.totalSent,
    successRate: emailStats.totalSent > 0 
      ? ((emailStats.totalSent - emailStats.totalFailed) / emailStats.totalSent) * 100 
      : 0,
    failureCount: emailStats.totalFailed,
    lastSent: emailStats.lastSent,
    mostCommonErrors
  }
}

export function resetEmailAnalytics() {
  emailStats = {
    totalSent: 0,
    totalFailed: 0,
    errors: [],
    lastSent: undefined
  }
}

/**
 * 🧪 Email Testing Utilities
 * 
 * Functions to help test our email system safely
 */

export const TEST_EMAIL_DATA = {
  documentUpload: {
    parentName: 'Sarah Johnson',
    childName: 'Emma Johnson',
    documentType: 'Immunization Records',
    fileName: 'emma-immunizations.pdf',
    uploadDate: new Date(),
    documentCount: 1
  } as DocumentUploadEmailData,

  contactForm: {
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@email.com',
    phone: '630-555-0123',
    message: 'Hi! I\'m interested in learning more about your toddler program. My daughter Sofia is 18 months old and we\'re looking for a caring daycare environment.',
    inquiryType: 'Program Information',
    submittedAt: new Date()
  } as ContactFormEmailData,

  welcome: {
    parentName: 'Jennifer Chen',
    childName: 'Lucas Chen',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
    classroom: 'Busy Bees (2-3 years)',
    teacher: 'Ms. Maria'
  } as WelcomeEmailData,

  enrollment: {
    parentName: 'David Thompson',
    childName: 'Ava Thompson',
    program: 'Full-Time Preschool',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Two weeks from now
    classroom: 'Little Scholars (3-4 years)',
    teacher: 'Ms. Rebecca',
    tuition: 1250,
    nextSteps: [
      'Complete and return all enrollment forms by Friday',
      'Schedule a meet-and-greet with Ms. Rebecca',
      'Set up your parent portal account',
      'Attend the new parent orientation on Monday at 6 PM',
      'Bring supplies from the classroom list on the first day'
    ]
  } as EnrollmentEmailData
}

export async function sendTestEmails(testEmail: string) {
  if (!isValidEmail(testEmail)) {
    throw new Error('Invalid test email address')
  }

  // Sending test emails

  const results = await sendBulkEmails([
    {
      type: 'document',
      data: TEST_EMAIL_DATA.documentUpload,
      recipient: testEmail
    },
    {
      type: 'welcome',
      data: TEST_EMAIL_DATA.welcome,
      recipient: testEmail
    },
    {
      type: 'enrollment',
      data: TEST_EMAIL_DATA.enrollment,
      recipient: testEmail
    }
  ])

  // Send contact form test with both emails
  const contactResult = await sendContactFormEmails(
    TEST_EMAIL_DATA.contactForm,
    {
      sendToStaff: true,
      sendConfirmation: true,
      staffEmail: testEmail // Send staff notification to test email too
    }
  )

  return {
    bulkResults: results,
    contactResults: contactResult,
    message: 'Test emails sent successfully!'
  }
}