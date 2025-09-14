/**
 * 📝 Contact Form Email API Route
 * 
 * This API route handles contact form submissions and sends appropriate emails!
 * When families fill out our contact form, this route will:
 * 1. Validate their information
 * 2. Send a notification to our staff
 * 3. Send a confirmation to the family
 * 
 * It's like having a super-efficient assistant that never forgets to
 * follow up on inquiries!
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmails } from '@/lib/email/services'
import type { ContactFormEmailData } from '@/lib/email/index'

/**
 * 📮 POST /api/send-email/contact
 * 
 * Handles contact form submissions and sends appropriate emails
 */
export async function POST(request: NextRequest) {
  try {
    // Processing contact form email request

    // 📋 Get the form data from the request
    const body = await request.json()
    
    // 🔍 Validate required fields
    const requiredFields = ['name', 'email', 'message', 'inquiryType']
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

    // 📧 Prepare email data
    const emailData: ContactFormEmailData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      message: body.message.trim(),
      inquiryType: body.inquiryType.trim(),
      submittedAt: new Date()
    }

    // 📬 Send the emails (both staff notification and customer confirmation)
    const result = await sendContactFormEmails(emailData, {
      sendToStaff: true,
      sendConfirmation: true,
      staffEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'admin@greatbeginningsdaycare.com'
    })

    if (result.success) {
      // Contact form emails sent successfully
      
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully! We\'ll get back to you within 24 hours.',
        emailResults: {
          staffNotificationSent: result.results.staffEmail.success,
          confirmationSent: result.results.confirmationEmail.success
        }
      })
    } else {
      // Contact form email failed
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send emails. Please try again or contact us directly.',
          details: result.results
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Contact form API error:', error)
    
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
 * 🔍 GET /api/send-email/contact (for testing)
 * 
 * Returns information about this API endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/send-email/contact',
    method: 'POST',
    description: 'Sends contact form emails to staff and customer',
    requiredFields: ['name', 'email', 'message', 'inquiryType'],
    optionalFields: ['phone'],
    example: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '630-555-0123',
      message: 'I would like to learn more about your toddler program.',
      inquiryType: 'Program Information'
    }
  })
}