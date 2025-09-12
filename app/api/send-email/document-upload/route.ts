/**
 * 📄 Document Upload Email API Route
 * 
 * This API route sends notification emails when parents upload documents!
 * It's like having a friendly assistant that immediately lets parents know
 * we received their important paperwork.
 * 
 * When documents are uploaded, this route will:
 * 1. Validate the upload information
 * 2. Send a confirmation email to the parent
 * 3. Log the activity for our records
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendDocumentUploadEmail } from '@/lib/email/services'
import { DocumentUploadEmailData } from '@/lib/email/index'

/**
 * 📮 POST /api/send-email/document-upload
 * 
 * Sends document upload confirmation emails to parents
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📄 Processing document upload email request...')

    // 📋 Get the upload data from the request
    const body = await request.json()
    
    // 🔍 Validate required fields
    const requiredFields = ['parentName', 'childName', 'documentType', 'fileName', 'recipientEmail']
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
    const emailData: DocumentUploadEmailData = {
      parentName: body.parentName.trim(),
      childName: body.childName.trim(),
      documentType: body.documentType.trim(),
      fileName: body.fileName.trim(),
      uploadDate: body.uploadDate ? new Date(body.uploadDate) : new Date(),
      documentCount: body.documentCount || 1
    }

    const recipientEmail = body.recipientEmail.trim().toLowerCase()

    // 📬 Send the document upload confirmation email
    const result = await sendDocumentUploadEmail(emailData, recipientEmail)

    if (result.success) {
      console.log('✅ Document upload email sent successfully!')
      
      return NextResponse.json({
        success: true,
        message: 'Document upload confirmation sent successfully!',
        emailId: result.emailId,
        documentDetails: {
          childName: emailData.childName,
          documentType: emailData.documentType,
          fileName: emailData.fileName,
          sentTo: recipientEmail
        }
      })
    } else {
      console.error('❌ Document upload email failed:', result.error)
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send document upload confirmation. Please contact us if you don\'t receive confirmation.',
          details: result.error
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Document upload email API error:', error)
    
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
 * 🔍 GET /api/send-email/document-upload (for testing)
 * 
 * Returns information about this API endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/send-email/document-upload',
    method: 'POST',
    description: 'Sends document upload confirmation emails to parents',
    requiredFields: ['parentName', 'childName', 'documentType', 'fileName', 'recipientEmail'],
    optionalFields: ['uploadDate', 'documentCount'],
    example: {
      parentName: 'Sarah Johnson',
      childName: 'Emma Johnson',
      documentType: 'Immunization Records',
      fileName: 'emma-immunizations.pdf',
      recipientEmail: 'sarah.johnson@email.com',
      uploadDate: '2024-12-12T10:30:00Z',
      documentCount: 2
    }
  })
}