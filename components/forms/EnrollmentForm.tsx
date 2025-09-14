/**
 * 📝 Enrollment Form Component
 *
 * 🎯 What does this do?
 * Handles enrollment applications with Server Actions for form submission
 *
 * 🧒 Kid-Friendly Explanation:
 * This is the form where parents fill in information about their child
 * to join our daycare - like filling out a special application!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Server Actions
 * - useFormStatus() hook
 * - Progressive enhancement
 * - Error handling with toast notifications
 */

'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnrollment } from '@/app/actions/enrollment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting Application...
        </>
      ) : (
        'Submit Application'
      )}
    </Button>
  );
}

export function EnrollmentForm() {
  const [result, setResult] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    details?: string[];
  }>({ type: null, message: '' });

  async function handleSubmit(formData: FormData) {
    try {
      const response = await submitEnrollment(formData);

      if (response.success) {
        setResult({
          type: 'success',
          message: response.data.message,
          details: response.data.nextSteps,
        });

        // Scroll to success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setResult({
          type: 'error',
          message: response.error,
        });
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <>
      {result.type && (
        <Alert className={result.type === 'success' ? 'border-green-500' : 'border-red-500'}>
          {result.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          <AlertTitle>{result.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
          <AlertDescription>
            <p>{result.message}</p>
            {result.details && (
              <ul className="mt-2 list-disc list-inside text-sm">
                {result.details.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            )}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent/Guardian Name *</Label>
            <Input
              id="parentName"
              name="parentName"
              placeholder="John Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(630) 555-0123"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childName">Child's Name *</Label>
            <Input
              id="childName"
              name="childName"
              placeholder="Emma Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childBirthDate">Child's Birth Date *</Label>
            <Input
              id="childBirthDate"
              name="childBirthDate"
              type="date"
              required
            />
          </div>

        <div className="space-y-2">
          <Label htmlFor="program">Program Interest *</Label>
          <Select name="program" required>
            <SelectTrigger id="program">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infant">Infant (6 weeks - 15 months)</SelectItem>
              <SelectItem value="toddler">Toddler (15 months - 2 years)</SelectItem>
              <SelectItem value="preschool">Preschool (3 - 4 years)</SelectItem>
              <SelectItem value="prek">Pre-K (4 - 5 years)</SelectItem>
              <SelectItem value="schoolage">School Age (5 - 12 years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desiredStartDate">Desired Start Date *</Label>
          <Input
            id="desiredStartDate"
            name="desiredStartDate"
            type="date"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule Preference</Label>
          <Select name="schedule">
            <SelectTrigger id="schedule">
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fulltime">Full-Time (5 days)</SelectItem>
              <SelectItem value="parttime">Part-Time (2-3 days)</SelectItem>
              <SelectItem value="dropin">Drop-In</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional Required Fields for Enrollment */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            placeholder="Roselle"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            name="state"
            placeholder="IL"
            maxLength={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            name="zipCode"
            placeholder="60172"
            pattern="[0-9]{5}(-[0-9]{4})?"
            required
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-4">Emergency Contact Information</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              placeholder="(630) 555-0124"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyRelationship">Relationship *</Label>
            <Input
              id="emergencyRelationship"
              name="emergencyRelationship"
              placeholder="Grandmother"
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Tell us about your child's needs, allergies, medications, or any questions you have..."
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
    </>
  );
}