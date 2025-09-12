/**
 * 📧 Main Email API Route
 * 
 * This is the main email API that can send any type of email!
 * It's like having one super-smart button that knows exactly
 * what kind of email to send based on what you tell it.
 * 
 * This route can handle:
 * - Document upload notifications 📄
 * - Contact form emails 📝
 * - Welcome emails 🌟
 * - Enrollment confirmations 🎉
 * - Bulk email sending 📬
 * - Test emails 🧪
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  sendDocumentUploadEmail,
  sendContactFormEmails,
  sendWelcomeEmail,
  sendEnrollmentConfirmationEmail,
  sendBulkEmails,
  sendTestEmails,
  getEmailAnalytics,
  TEST_EMAIL_DATA
} from '@/lib/email/services'

/**
 * 📮 POST /api/send-email
 * 
 * Universal email sending endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, recipient, options } = body

    // 🔍 Validate request structure
    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Email type is required' },
        { status: 400 }
      )
    }

    console.log(`📧 Processing ${type} email request...`)

    // 📬 Handle different email types
    switch (type) {
      case 'document-upload':
        if (!data || !recipient) {
          return NextResponse.json(
            { success: false, error: 'data and recipient are required for document-upload emails' },
            { status: 400 }
          )
        }
        const documentResult = await sendDocumentUploadEmail(data, recipient)
        return NextResponse.json(documentResult)

      case 'contact-form':
        if (!data) {
          return NextResponse.json(
            { success: false, error: 'data is required for contact-form emails' },
            { status: 400 }
          )
        }
        const contactResult = await sendContactFormEmails(data, options)
        return NextResponse.json(contactResult)

      case 'welcome':
        if (!data || !recipient) {
          return NextResponse.json(
            { success: false, error: 'data and recipient are required for welcome emails' },
            { status: 400 }
          )
        }
        const welcomeResult = await sendWelcomeEmail(data, recipient)
        return NextResponse.json(welcomeResult)

      case 'enrollment':
        if (!data || !recipient) {
          return NextResponse.json(
            { success: false, error: 'data and recipient are required for enrollment emails' },
            { status: 400 }
          )
        }
        const enrollmentResult = await sendEnrollmentConfirmationEmail(data, recipient)
        return NextResponse.json(enrollmentResult)

      case 'bulk':
        if (!Array.isArray(data)) {
          return NextResponse.json(
            { success: false, error: 'data must be an array for bulk emails' },
            { status: 400 }
          )
        }
        const bulkResult = await sendBulkEmails(data)
        return NextResponse.json(bulkResult)

      case 'test':
        if (!recipient) {
          return NextResponse.json(
            { success: false, error: 'recipient is required for test emails' },
            { status: 400 }
          )
        }
        const testResult = await sendTestEmails(recipient)
        return NextResponse.json(testResult)

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Unknown email type: ${type}. Supported types: document-upload, contact-form, welcome, enrollment, bulk, test` 
          },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('❌ Main email API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * 🔍 GET /api/send-email
 * 
 * Returns information about the email API and current statistics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // 📊 Handle different GET actions
    switch (action) {
      case 'analytics':
        const analytics = getEmailAnalytics()
        return NextResponse.json({
          success: true,
          analytics
        })

      case 'test-data':
        return NextResponse.json({
          success: true,
          testData: TEST_EMAIL_DATA,
          description: 'Sample data for testing email templates'
        })

      default:
        // 📚 Return API documentation
        return NextResponse.json({
          endpoint: '/api/send-email',
          description: 'Universal email sending API for Great Beginnings Day Care',
          methods: ['POST', 'GET'],
          supportedEmailTypes: [
            {
              type: 'document-upload',
              description: 'Send document upload confirmation to parents',
              requiredFields: ['data', 'recipient'],
              dataFields: ['parentName', 'childName', 'documentType', 'fileName']
            },
            {
              type: 'contact-form',
              description: 'Send contact form emails (staff notification + customer confirmation)',
              requiredFields: ['data'],
              dataFields: ['name', 'email', 'message', 'inquiryType'],
              optionalFields: ['options.sendToStaff', 'options.sendConfirmation', 'options.staffEmail']
            },
            {
              type: 'welcome',
              description: 'Send welcome email to new families',
              requiredFields: ['data', 'recipient'],
              dataFields: ['parentName', 'childName', 'startDate'],
              optionalFields: ['classroom', 'teacher']
            },
            {
              type: 'enrollment',
              description: 'Send enrollment confirmation email',
              requiredFields: ['data', 'recipient'],
              dataFields: ['parentName', 'childName', 'program', 'startDate', 'classroom', 'teacher', 'tuition', 'nextSteps']
            },
            {
              type: 'bulk',
              description: 'Send multiple emails at once',
              requiredFields: ['data (array)'],
              dataFormat: 'Array of email objects with type, data, recipient'
            },
            {
              type: 'test',
              description: 'Send test emails to verify system is working',
              requiredFields: ['recipient'],
              note: 'Sends sample emails of all types to the specified address'
            }
          ],
          examples: {
            documentUpload: {
              type: 'document-upload',
              data: {
                parentName: 'Sarah Johnson',
                childName: 'Emma Johnson',
                documentType: 'Immunization Records',
                fileName: 'emma-immunizations.pdf',
                uploadDate: new Date().toISOString(),
                documentCount: 1
              },
              recipient: 'sarah.johnson@email.com'
            },
            contactForm: {
              type: 'contact-form',
              data: {
                name: 'Mike Rodriguez',
                email: 'mike.rodriguez@email.com',
                phone: '630-555-0123',
                message: 'I would like to learn more about your programs.',
                inquiryType: 'Program Information',
                submittedAt: new Date().toISOString()
              },
              options: {
                sendToStaff: true,
                sendConfirmation: true,
                staffEmail: 'staff@daycare.com'
              }
            },
            welcome: {
              type: 'welcome',
              data: {
                parentName: 'Jennifer Chen',
                childName: 'Lucas Chen',
                startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                classroom: 'Busy Bees (2-3 years)',
                teacher: 'Ms. Maria'
              },
              recipient: 'jennifer.chen@email.com'
            },
            enrollment: {
              type: 'enrollment',
              data: {
                parentName: 'David Thompson',
                childName: 'Ava Thompson',
                program: 'Full-Time Preschool',
                startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                classroom: 'Little Scholars (3-4 years)',
                teacher: 'Ms. Rebecca',
                tuition: 1250,
                nextSteps: [
                  'Complete enrollment forms',
                  'Schedule meet-and-greet',
                  'Set up parent portal account'
                ]
              },
              recipient: 'david.thompson@email.com'
            },
            test: {
              type: 'test',
              recipient: 'your-test@email.com'
            }
          },
          getActions: [
            '?action=analytics - Get email sending statistics',
            '?action=test-data - Get sample data for testing'
          ],
          notes: [
            'All date fields should be in ISO format (YYYY-MM-DDTHH:mm:ssZ)',
            'Email addresses are automatically validated',
            'Failed emails are logged for debugging',
            'Use the test endpoint to verify your setup'
          ]
        })
    }

  } catch (error) {
    console.error('❌ Email API GET error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process GET request'
      },
      { status: 500 }
    )
  }
}