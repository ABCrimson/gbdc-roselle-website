/**
 * 🌟 Welcome Email API Route
 * 
 * This API route sends super special welcome emails to new families!
 * It's like rolling out the red carpet digitally when a family
 * is ready to start their journey with us.
 * 
 * When a family is ready to begin, this route will:
 * 1. Validate their enrollment information
 * 2. Send a beautiful welcome email with first-day details
 * 3. Make them feel excited and prepared for day one!
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email/services'
import { WelcomeEmailData } from '@/lib/email/index'

/**
 * 📮 POST /api/send-email/welcome
 * 
 * Sends welcome emails to new families
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🌟 Processing welcome email request...')

    // 📋 Get the enrollment data from the request
    const body = await request.json()
    
    // 🔍 Validate required fields
    const requiredFields = ['parentName', 'childName', 'startDate', 'recipientEmail']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // 📅 Validate start date
    const startDate = new Date(body.startDate)
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid start date format. Please use ISO date format.' 
        },
        { status: 400 }
      )
    }

    // 📧 Prepare email data
    const emailData: WelcomeEmailData = {
      parentName: body.parentName.trim(),
      childName: body.childName.trim(),
      startDate: startDate,
      classroom: body.classroom?.trim() || undefined,
      teacher: body.teacher?.trim() || undefined
    }

    const recipientEmail = body.recipientEmail.trim().toLowerCase()

    // 📬 Send the welcome email
    const result = await sendWelcomeEmail(emailData, recipientEmail)

    if (result.success) {
      console.log('✅ Welcome email sent successfully!')
      
      return NextResponse.json({
        success: true,
        message: 'Welcome email sent successfully!',
        emailId: result.emailId,
        welcomeDetails: {
          childName: emailData.childName,
          parentName: emailData.parentName,
          startDate: emailData.startDate.toISOString(),
          classroom: emailData.classroom,
          teacher: emailData.teacher,
          sentTo: recipientEmail
        }
      })
    } else {
      console.error('❌ Welcome email failed:', result.error)
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send welcome email. Please contact us directly.',
          details: result.error
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Welcome email API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    )
  }
}

/**
 * 🔍 GET /api/send-email/welcome (for testing)
 * 
 * Returns information about this API endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/send-email/welcome',
    method: 'POST',
    description: 'Sends welcome emails to new families starting at the daycare',
    requiredFields: ['parentName', 'childName', 'startDate', 'recipientEmail'],
    optionalFields: ['classroom', 'teacher'],
    example: {
      parentName: 'Jennifer Chen',
      childName: 'Lucas Chen',
      startDate: '2024-09-15T06:30:00Z',
      classroom: 'Busy Bees (2-3 years)',
      teacher: 'Ms. Maria',
      recipientEmail: 'jennifer.chen@email.com'
    },
    notes: [
      'startDate should be in ISO format (YYYY-MM-DDTHH:mm:ssZ)',
      'classroom and teacher are optional but recommended for personalization',
      'The email includes a first-day checklist and what to expect'
    ]
  })
}