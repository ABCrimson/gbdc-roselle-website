/**
 * 📝 Enrollment Form Server Actions
 *
 * 🎯 What does this do?
 * Handles enrollment applications with validation, rate limiting, and notifications
 *
 * 🧒 Kid-Friendly Explanation:
 * This processes applications from parents who want to enroll their children -
 * like a helpful secretary that organizes all the paperwork!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Server Actions
 * - Rate limiting protection
 * - Input validation and sanitization
 * - Database persistence with Supabase
 */

'use server';

import { revalidatePath } from 'next/cache';
import { withRateLimit, RateLimitPresets } from '@/lib/rate-limit';
import {
  ActionResult,
  ValidationError,
  withErrorHandling,
  validateRequired,
  validateEmail,
  validatePhone,
  sanitizeInput,
  getRequestMetadata,
  withRetry,
} from '@/lib/error-handling';

/**
 * Enrollment form data structure
 */
interface EnrollmentFormData {
  // Parent Information
  parentName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Child Information
  childName: string;
  childBirthDate: string;
  childAge?: string;
  program: 'infant' | 'toddler' | 'preschool' | 'prek' | 'schoolage';

  // Enrollment Details
  desiredStartDate: string;
  schedule: 'fulltime' | 'parttime' | 'dropin';

  // Additional Information
  allergies?: string;
  medications?: string;
  specialNeeds?: string;
  emergencyContact: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Other
  howHeard?: string;
  additionalInfo?: string;
}

/**
 * Enrollment submission result
 */
interface EnrollmentResult {
  id: string;
  status: 'pending' | 'waitlist' | 'accepted';
  message: string;
  nextSteps: string[];
  estimatedResponseTime: string;
}

/**
 * Calculate child's age from birth date
 */
function calculateAge(birthDate: string): { years: number; months: number } {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return { years, months };
}

/**
 * Validate program eligibility based on age
 */
function validateProgramEligibility(birthDate: string, program: string): void {
  const age = calculateAge(birthDate);
  const totalMonths = age.years * 12 + age.months;

  const programRequirements = {
    infant: { min: 1.5, max: 15, label: '6 weeks - 15 months' },
    toddler: { min: 15, max: 36, label: '15 months - 3 years' },
    preschool: { min: 36, max: 60, label: '3 - 5 years' },
    prek: { min: 48, max: 72, label: '4 - 6 years' },
    schoolage: { min: 60, max: 144, label: '5 - 12 years' },
  };

  const req = programRequirements[program as keyof typeof programRequirements];

  if (req && (totalMonths < req.min || totalMonths > req.max)) {
    throw new ValidationError(
      `Child's age (${age.years} years, ${age.months} months) is not eligible for ${program} program (${req.label})`
    );
  }
}

/**
 * Save enrollment to database
 */
async function saveEnrollment(data: EnrollmentFormData & { metadata: any }): Promise<{
  id: string;
  status: 'pending' | 'waitlist';
}> {
  // In production, this would save to Supabase
  // For now, generate a mock enrollment ID
  const enrollmentId = `ENR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  console.log('Saving enrollment:', { id: enrollmentId, ...data });

  // Simulate database save
  await new Promise(resolve => setTimeout(resolve, 100));

  // Randomly assign status for demo (in production, check actual availability)
  const status = Math.random() > 0.3 ? 'pending' : 'waitlist';

  return { id: enrollmentId, status };
}

/**
 * Send enrollment notification emails
 */
async function sendEnrollmentNotifications(
  data: EnrollmentFormData,
  enrollmentId: string,
  status: 'pending' | 'waitlist'
): Promise<void> {
  // In production, use email service like Resend
  console.log('Sending enrollment notifications:', {
    to: data.email,
    enrollmentId,
    status,
  });

  // Simulate email sending
  await new Promise(resolve => setTimeout(resolve, 100));
}

/**
 * Submit enrollment application
 */
export const submitEnrollment = withRateLimit(
  withErrorHandling(
    async (formData: FormData): Promise<EnrollmentResult> => {
      // Extract and sanitize form data
      const data: EnrollmentFormData = {
        // Parent Information
        parentName: sanitizeInput(formData.get('parentName') as string || ''),
        email: sanitizeInput(formData.get('email') as string || '').toLowerCase(),
        phone: sanitizeInput(formData.get('phone') as string || ''),
        alternatePhone: sanitizeInput(formData.get('alternatePhone') as string || ''),
        address: sanitizeInput(formData.get('address') as string || ''),
        city: sanitizeInput(formData.get('city') as string || ''),
        state: sanitizeInput(formData.get('state') as string || ''),
        zipCode: sanitizeInput(formData.get('zipCode') as string || ''),

        // Child Information
        childName: sanitizeInput(formData.get('childName') as string || ''),
        childBirthDate: sanitizeInput(formData.get('childBirthDate') as string || ''),
        childAge: sanitizeInput(formData.get('childAge') as string || ''),
        program: formData.get('program') as any || '',

        // Enrollment Details
        desiredStartDate: sanitizeInput(formData.get('desiredStartDate') as string || ''),
        schedule: formData.get('schedule') as any || 'fulltime',

        // Additional Information
        allergies: sanitizeInput(formData.get('allergies') as string || ''),
        medications: sanitizeInput(formData.get('medications') as string || ''),
        specialNeeds: sanitizeInput(formData.get('specialNeeds') as string || ''),
        emergencyContact: sanitizeInput(formData.get('emergencyContact') as string || ''),
        emergencyPhone: sanitizeInput(formData.get('emergencyPhone') as string || ''),
        emergencyRelationship: sanitizeInput(formData.get('emergencyRelationship') as string || ''),

        // Other
        howHeard: sanitizeInput(formData.get('howHeard') as string || ''),
        additionalInfo: sanitizeInput(formData.get('additionalInfo') as string || ''),
      };

      // Validate required fields
      validateRequired(data, [
        'parentName',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zipCode',
        'childName',
        'childBirthDate',
        'program',
        'desiredStartDate',
        'emergencyContact',
        'emergencyPhone',
        'emergencyRelationship',
      ]);

      // Validate email format
      validateEmail(data.email);

      // Validate phone numbers
      validatePhone(data.phone);
      if (data.alternatePhone) {
        validatePhone(data.alternatePhone);
      }
      validatePhone(data.emergencyPhone);

      // Validate names
      if (data.parentName.length < 2) {
        throw new ValidationError('Parent name must be at least 2 characters');
      }
      if (data.childName.length < 2) {
        throw new ValidationError('Child name must be at least 2 characters');
      }

      // Validate birth date
      const birthDate = new Date(data.childBirthDate);
      const today = new Date();

      if (isNaN(birthDate.getTime())) {
        throw new ValidationError('Invalid birth date');
      }

      if (birthDate > today) {
        throw new ValidationError('Birth date cannot be in the future');
      }

      const age = calculateAge(data.childBirthDate);
      if (age.years > 12 || (age.years === 0 && age.months < 1)) {
        throw new ValidationError('Child must be between 6 weeks and 12 years old');
      }

      // Validate program eligibility
      validateProgramEligibility(data.childBirthDate, data.program);

      // Validate start date
      const startDate = new Date(data.desiredStartDate);
      if (isNaN(startDate.getTime())) {
        throw new ValidationError('Invalid start date');
      }

      if (startDate < today) {
        throw new ValidationError('Start date cannot be in the past');
      }

      // Validate ZIP code
      if (!/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
        throw new ValidationError('Invalid ZIP code format');
      }

      // Get request metadata
      const metadata = await getRequestMetadata();

      // Save enrollment with retry logic
      const { id: enrollmentId, status } = await withRetry(
        () => saveEnrollment({ ...data, metadata }),
        {
          maxAttempts: 3,
          delay: 1000,
          onRetry: (error, attempt) => {
            console.warn(`Enrollment save attempt ${attempt} failed:`, error);
          },
        }
      );

      // Send notification emails (don't fail if email fails)
      try {
        await sendEnrollmentNotifications(data, enrollmentId, status);
      } catch (error) {
        console.error('Failed to send enrollment notifications:', error);
      }

      // Revalidate enrollment page
      revalidatePath('/enrollment');

      // Prepare response based on status
      if (status === 'waitlist') {
        return {
          id: enrollmentId,
          status: 'waitlist',
          message: 'Your application has been added to our waitlist. We\'ll contact you as soon as a spot becomes available.',
          nextSteps: [
            'You\'ll receive a confirmation email shortly',
            'We\'ll notify you when a spot opens up',
            'Keep your contact information updated',
            'Feel free to call us for waitlist status updates',
          ],
          estimatedResponseTime: 'Variable based on availability',
        };
      }

      return {
        id: enrollmentId,
        status: 'pending',
        message: 'Thank you! Your enrollment application has been received and is being reviewed.',
        nextSteps: [
          'You\'ll receive a confirmation email within 15 minutes',
          'Our enrollment team will review your application within 24-48 hours',
          'We\'ll contact you to schedule an enrollment meeting',
          'Prepare required documents (medical records, immunizations, etc.)',
          'Complete remaining paperwork during enrollment meeting',
        ],
        estimatedResponseTime: '24-48 hours',
      };
    },
    { context: 'enrollment_form' }
  ),
  RateLimitPresets.standard
) as (formData: FormData) => Promise<ActionResult<EnrollmentResult>>;

/**
 * Check enrollment availability for a program
 */
export const checkAvailability = withRateLimit(
  withErrorHandling(
    async (program: string, startDate: string): Promise<{
      available: boolean;
      spotsRemaining: number;
      waitlistLength: number;
    }> => {
      // Validate inputs
      if (!program || !startDate) {
        throw new ValidationError('Program and start date are required');
      }

      // In production, query database for actual availability
      // For demo, return mock data
      const mockAvailability = {
        infant: { spots: 2, waitlist: 3 },
        toddler: { spots: 0, waitlist: 5 },
        preschool: { spots: 4, waitlist: 1 },
        prek: { spots: 3, waitlist: 0 },
        schoolage: { spots: 8, waitlist: 0 },
      };

      const programData = mockAvailability[program as keyof typeof mockAvailability] || {
        spots: 0,
        waitlist: 0,
      };

      return {
        available: programData.spots > 0,
        spotsRemaining: programData.spots,
        waitlistLength: programData.waitlist,
      };
    },
    { context: 'check_availability' }
  ),
  RateLimitPresets.relaxed
) as (program: string, startDate: string) => Promise<ActionResult<{
  available: boolean;
  spotsRemaining: number;
  waitlistLength: number;
}>>;