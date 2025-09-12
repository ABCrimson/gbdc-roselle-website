/**
 * 🎉 Enrollment Confirmation Email API Route
 * 
 * This API route sends official enrollment confirmation emails!
 * It's like handing families their golden ticket that says they're
 * officially part of our daycare family.
 * 
 * When enrollment is complete, this route will:
 * 1. Validate all the enrollment information
 * 2. Send an official confirmation with all important details
 * 3. Provide next steps and payment information
 * 4. Welcome them to the Great Beginnings family!
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendEnrollmentConfirmationEmail } from '@/lib/email/services'
import { EnrollmentEmailData } from '@/lib/email/index'

/**
 * 📮 POST /api/send-email/enrollment
 * 
 * Sends enrollment confirmation emails to families
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🎉 Processing enrollment confirmation email request...')

    // 📋 Get the enrollment data from the request
    const body = await request.json()
    
    // 🔍 Validate required fields
    const requiredFields = [
      'parentName', 'childName', 'program', 'startDate', 
      'classroom', 'teacher', 'tuition', 'recipientEmail'
    ]
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

    // 💰 Validate tuition amount
    const tuition = parseFloat(body.tuition)
    if (isNaN(tuition) || tuition <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid tuition amount. Must be a positive number.' 
        },
        { status: 400 }
      )
    }

    // 📝 Validate next steps array
    if (!Array.isArray(body.nextSteps) || body.nextSteps.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'nextSteps must be an array with at least one item.' 
        },
        { status: 400 }
      )
    }

    // 📧 Prepare email data
    const emailData: EnrollmentEmailData = {
      parentName: body.parentName.trim(),
      childName: body.childName.trim(),
      program: body.program.trim(),
      startDate: startDate,
      classroom: body.classroom.trim(),
      teacher: body.teacher.trim(),
      tuition: tuition,
      nextSteps: body.nextSteps.map((step: string) => step.trim()).filter(Boolean)
    }

    const recipientEmail = body.recipientEmail.trim().toLowerCase()

    // 📬 Send the enrollment confirmation email
    const result = await sendEnrollmentConfirmationEmail(emailData, recipientEmail)

    if (result.success) {
      console.log('✅ Enrollment confirmation email sent successfully!')
      
      return NextResponse.json({
        success: true,
        message: 'Enrollment confirmation sent successfully!',
        emailId: result.emailId,
        enrollmentDetails: {
          childName: emailData.childName,
          parentName: emailData.parentName,
          program: emailData.program,
          startDate: emailData.startDate.toISOString(),
          classroom: emailData.classroom,
          teacher: emailData.teacher,
          tuition: emailData.tuition,
          nextStepsCount: emailData.nextSteps.length,
          sentTo: recipientEmail
        }
      })
    } else {
      console.error('❌ Enrollment confirmation email failed:', result.error)
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send enrollment confirmation. Please contact us directly.',
          details: result.error
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Enrollment confirmation email API error:', error)
    
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
 * 🔍 GET /api/send-email/enrollment (for testing)
 * 
 * Returns information about this API endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/send-email/enrollment',
    method: 'POST',
    description: 'Sends official enrollment confirmation emails to families',
    requiredFields: [
      'parentName', 'childName', 'program', 'startDate', 
      'classroom', 'teacher', 'tuition', 'nextSteps', 'recipientEmail'
    ],
    optionalFields: [],
    example: {
      parentName: 'David Thompson',
      childName: 'Ava Thompson',
      program: 'Full-Time Preschool',
      startDate: '2024-09-01T06:30:00Z',
      classroom: 'Little Scholars (3-4 years)',
      teacher: 'Ms. Rebecca',
      tuition: 1250.00,
      nextSteps: [
        'Complete and return all enrollment forms by Friday',
        'Schedule a meet-and-greet with Ms. Rebecca',
        'Set up your parent portal account',
        'Attend the new parent orientation on Monday at 6 PM',
        'Bring supplies from the classroom list on the first day'
      ],
      recipientEmail: 'david.thompson@email.com'
    },
    notes: [
      'startDate should be in ISO format (YYYY-MM-DDTHH:mm:ssZ)',
      'tuition should be a number (will be formatted as currency)',
      'nextSteps should be an array of strings with clear action items',
      'All fields are required for a complete enrollment confirmation'
    ]
  })
}