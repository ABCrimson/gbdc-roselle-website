/**
 * Contact Form Server Actions
 * 
 * Server-side form handling with rate limiting and email notifications.
 * Uses React 19 Server Actions - no API routes needed!
 * 
 * Like a mailroom that processes all incoming messages!
 */

"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { 
  contactFormSchema, 
  type ContactFormData, 
  type ContactResponse,
  sanitizeName,
  sanitizeMessage,
  getResponseTime 
} from "@/lib/contact/schemas";
import { Resend } from "resend";

// Initialize Resend for email notifications
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Submit contact form with rate limiting
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactResponse> {
  try {
    // Validate input data
    const validatedData = contactFormSchema.parse(formData);
    
    // Honeypot check (bot detection)
    if (validatedData.website && validatedData.website.length > 0) {
      return {
        success: false,
        error: "Invalid submission detected",
      };
    }
    
    // Get request metadata
    const headersList = headers();
    const ipAddress = headersList.get("x-forwarded-for") || 
                     headersList.get("x-real-ip") || 
                     "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";
    
    // Sanitize input data
    const sanitizedData = {
      ...validatedData,
      name: sanitizeName(validatedData.name),
      message: sanitizeMessage(validatedData.message),
      childName: validatedData.childName ? sanitizeName(validatedData.childName) : null,
    };
    
    // Create Supabase client
    const supabase = createClient();
    
    // Call PostgreSQL function with rate limiting
    const { data, error } = await supabase.rpc('save_contact_submission', {
      p_name: sanitizedData.name,
      p_email: sanitizedData.email,
      p_phone: sanitizedData.phone || null,
      p_subject: sanitizedData.subject,
      p_message: sanitizedData.message,
      p_child_name: sanitizedData.childName || null,
      p_child_age: sanitizedData.childAge || null,
      p_preferred_contact: sanitizedData.preferredContactMethod,
      p_urgency: sanitizedData.urgency,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
    });
    
    if (error) {
      console.error("Database error:", error);
      return {
        success: false,
        error: "Failed to submit form. Please try again later.",
      };
    }
    
    // Check if rate limited
    if (!data?.[0]?.success) {
      return {
        success: false,
        error: data?.[0]?.message || "Submission failed due to rate limiting",
        rateLimitInfo: {
          isAllowed: false,
          remainingAttempts: 0,
          resetAt: new Date(Date.now() + 120 * 60 * 1000), // 2 hours from now
          message: data?.[0]?.message || "Too many attempts. Please try again later.",
        },
      };
    }
    
    // Send email notifications
    await sendEmailNotifications(sanitizedData, data[0].submission_id);
    
    return {
      success: true,
      submissionId: data[0].submission_id,
      message: `Thank you for contacting us! We'll respond ${getResponseTime(sanitizedData.urgency)}.`,
    };
    
  } catch (error) {
    console.error("Contact form error:", error);
    
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as any;
      const fieldErrors: Record<string, string[]> = {};
      
      zodError.errors.forEach((err: any) => {
        const field = err.path.join('.');
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });
      
      return {
        success: false,
        error: "Please correct the form errors",
        fieldErrors,
      };
    }
    
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Send email notifications for new contact form submission
 */
async function sendEmailNotifications(
  data: ContactFormData,
  submissionId: string
): Promise<void> {
  try {
    // Send notification to daycare staff
    await resend.emails.send({
      from: 'Great Beginnings Day Care <noreply@greatbeginningsdaycare.com>',
      to: ['info@greatbeginningsdaycare.com'],
      subject: `[${data.urgency.toUpperCase()}] New Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Urgency:</strong> ${data.urgency.toUpperCase()}</p>
            <p><strong>Response Time:</strong> ${getResponseTime(data.urgency)}</p>
          </div>
          
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Preferred Contact:</strong> ${data.preferredContactMethod}</p>
          
          ${data.childName ? `
            <h3>Child Information</h3>
            <p><strong>Child's Name:</strong> ${data.childName}</p>
            ${data.childAge ? `<p><strong>Age Group:</strong> ${data.childAge}</p>` : ''}
          ` : ''}
          
          <h3>Message</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="background: white; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            Submission ID: ${submissionId}<br>
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });
    
    // Send confirmation email to parent
    await resend.emails.send({
      from: 'Great Beginnings Day Care <noreply@greatbeginningsdaycare.com>',
      to: [data.email],
      subject: 'We received your message - Great Beginnings Day Care',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px;">
            <h1 style="color: #1e40af;">Thank You for Contacting Us!</h1>
          </div>
          
          <p>Dear ${data.name},</p>
          
          <p>We've received your message and appreciate you reaching out to Great Beginnings Day Care.</p>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <p>Our team will review your message and respond ${getResponseTime(data.urgency)}.</p>
            ${data.urgency === 'emergency' ? `
              <p style="color: #dc2626; font-weight: bold;">
                For immediate assistance, please call us at (630) 894-3440.
              </p>
            ` : ''}
          </div>
          
          <h3>Your Message Summary</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            <p style="margin: 0;">${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Great Beginnings Day Care</strong><br>
              757 E Nerge Rd, Roselle, IL 60172<br>
              Phone: (630) 894-3440<br>
              Hours: Monday-Friday 6:30 AM - 6:00 PM
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Reference ID: ${submissionId}<br>
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      `,
    });
    
  } catch (error) {
    // Log error but don't fail the submission
    console.error("Email notification error:", error);
  }
}

/**
 * Check rate limit status for an identifier
 */
export async function checkRateLimit(
  identifier: string
): Promise<{
  isAllowed: boolean;
  remainingAttempts: number;
  resetAt: Date;
}> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.rpc('check_contact_rate_limit', {
      p_identifier: identifier,
      p_max_attempts: 5,
      p_window_minutes: 60,
      p_block_minutes: 120,
    });
    
    if (error || !data?.[0]) {
      return {
        isAllowed: true,
        remainingAttempts: 5,
        resetAt: new Date(Date.now() + 60 * 60 * 1000),
      };
    }
    
    return {
      isAllowed: data[0].is_allowed,
      remainingAttempts: data[0].remaining_attempts,
      resetAt: new Date(data[0].reset_at),
    };
    
  } catch (error) {
    console.error("Rate limit check error:", error);
    return {
      isAllowed: true,
      remainingAttempts: 5,
      resetAt: new Date(Date.now() + 60 * 60 * 1000),
    };
  }
}