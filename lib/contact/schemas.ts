/**
 * Contact Form Validation Schemas
 * 
 * Zod 4.1.8 schemas for contact form validation.
 * Provides type-safe validation for all form fields.
 * 
 * Like a strict teacher checking all the homework!
 */

import { z } from "zod";

// Phone number regex for US format
const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

// Contact form schema
export const contactFormSchema = z.object({
  // Parent Information
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  
  phone: z.string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .or(z.literal(""))
    .optional(),
  
  // Message Details
  subject: z.enum([
    "enrollment",
    "tour",
    "general",
    "programs",
    "billing",
    "emergency",
    "feedback",
    "other"
  ], {
    errorMap: () => ({ message: "Please select a subject" })
  }),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  
  // Child Information (Optional)
  childName: z.string()
    .min(2, "Child's name must be at least 2 characters")
    .max(100, "Child's name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Child's name can only contain letters, spaces, hyphens, and apostrophes")
    .or(z.literal(""))
    .optional(),
  
  childAge: z.enum([
    "infant",
    "toddler",
    "preschool",
    "pre-k",
    "school-age",
    ""
  ]).optional(),
  
  // Contact Preferences
  preferredContactMethod: z.enum(["email", "phone", "either"]).default("email"),
  
  urgency: z.enum(["normal", "urgent", "emergency"]).default("normal"),
  
  // Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" })
  }),
  
  // Honeypot field for bot detection (should be empty)
  website: z.string().max(0, "This field should be empty").optional(),
});

// Type inference
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Subject labels for display
export const subjectLabels: Record<ContactFormData["subject"], string> = {
  enrollment: "Enrollment Inquiry",
  tour: "Schedule a Tour",
  general: "General Question",
  programs: "Programs Information",
  billing: "Billing Question",
  emergency: "Emergency Contact",
  feedback: "Feedback",
  other: "Other",
};

// Age group labels
export const ageGroupLabels: Record<NonNullable<ContactFormData["childAge"]>, string> = {
  infant: "Infant (6 weeks - 15 months)",
  toddler: "Toddler (15 months - 2.5 years)",
  preschool: "Preschool (2.5 - 4 years)",
  "pre-k": "Pre-K (4 - 5 years)",
  "school-age": "School Age (5+ years)",
  "": "Not specified",
};

// Server-side only schema (includes metadata)
export const contactSubmissionSchema = contactFormSchema.extend({
  ipAddress: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, "Invalid IP address").nullable().optional(),
  userAgent: z.string().nullable(),
  submittedAt: z.date(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

// Rate limit response schema
export const rateLimitResponseSchema = z.object({
  isAllowed: z.boolean(),
  remainingAttempts: z.number(),
  resetAt: z.date(),
  message: z.string(),
});

export type RateLimitResponse = z.infer<typeof rateLimitResponseSchema>;

// Server action response schema
export const contactResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    submissionId: z.string().uuid(),
    message: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
    fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
    rateLimitInfo: rateLimitResponseSchema.optional(),
  }),
]);

export type ContactResponse = z.infer<typeof contactResponseSchema>;

// Validation helper functions
export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function sanitizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function sanitizeMessage(message: string): string {
  return message.trim().replace(/\s+/g, ' ').slice(0, 2000);
}

// Get urgency color for UI
export function getUrgencyColor(urgency: ContactFormData["urgency"]): string {
  switch (urgency) {
    case "emergency":
      return "text-red-600 bg-red-50";
    case "urgent":
      return "text-orange-600 bg-orange-50";
    default:
      return "text-blue-600 bg-blue-50";
  }
}

// Estimate response time based on urgency
export function getResponseTime(urgency: ContactFormData["urgency"]): string {
  switch (urgency) {
    case "emergency":
      return "within 1 hour during business hours";
    case "urgent":
      return "within 4 hours during business hours";
    default:
      return "within 24-48 hours";
  }
}