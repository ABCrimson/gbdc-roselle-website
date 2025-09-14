/**
 * Contact Form Component
 * 
 * Beautiful contact form with React Hook Form 7.62.0 and Zod validation.
 * Uses Server Actions for form submission - no API routes!
 * 
 * Like a friendly receptionist taking messages!
 */

"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  User,
  MessageSquare,
  Baby,
  Clock,
  AlertTriangle
} from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { 
  contactFormSchema, 
  type ContactFormData,
  subjectLabels,
  ageGroupLabels,
  getUrgencyColor
} from "@/lib/contact/schemas";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContactMethod: "email",
      urgency: "normal",
      consent: false,
      website: "", // Honeypot field
    }
  });
  
  const urgency = watch("urgency");
  const subject = watch("subject");
  
  // Handle form submission
  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      try {
        const result = await submitContactForm(data);
        
        if (result.success) {
          setSubmitResult({
            type: 'success',
            message: result.message
          });
          reset();
          onSuccess?.();
        } else {
          setSubmitResult({
            type: 'error',
            message: result.error
          });
          
          // Handle field-specific errors
          if (result.fieldErrors) {
            // Field-specific errors available for debugging
          }
        }
      } catch (error) {
        // Form submission error occurred
        setSubmitResult({
          type: 'error',
          message: "An unexpected error occurred. Please try again."
        });
      }
    });
  };
  
  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {/* Result Alert */}
      <AnimatePresence>
        {submitResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "mb-6 p-4 rounded-lg flex items-start gap-3",
              submitResult.type === 'success' 
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            )}
          >
            {submitResult.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium">{submitResult.message}</p>
            </div>
            <button
              onClick={() => setSubmitResult(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Urgency Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            How urgent is your inquiry?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['normal', 'urgent', 'emergency'] as const).map((level) => (
              <label
                key={level}
                className={cn(
                  "relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                  urgency === level
                    ? level === 'emergency' 
                      ? "border-red-500 bg-red-50"
                      : level === 'urgent'
                      ? "border-orange-500 bg-orange-50"
                      : "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <input
                  type="radio"
                  {...register("urgency")}
                  value={level}
                  className="sr-only"
                />
                <span className={cn(
                  "text-sm font-medium capitalize",
                  urgency === level
                    ? level === 'emergency'
                      ? "text-red-700"
                      : level === 'urgent'
                      ? "text-orange-700"
                      : "text-blue-700"
                    : "text-gray-600"
                )}>
                  {level}
                </span>
                {level === 'emergency' && (
                  <AlertTriangle className="w-4 h-4 ml-2 text-red-600" />
                )}
              </label>
            ))}
          </div>
          {urgency === 'emergency' && (
            <p className="text-sm text-red-600 mt-2">
              <strong>For immediate assistance, please call (630) 894-3440</strong>
            </p>
          )}
        </div>
        
        {/* Parent Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("name")}
                  type="text"
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  )}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  )}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("phone")}
                  type="tel"
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                    errors.phone
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  )}
                  placeholder="(630) 555-0123"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            {/* Preferred Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select
                {...register("preferredContactMethod")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="either">Either</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Child Information (Optional) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Child Information 
            <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Child Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Child's Name
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("childName")}
                  type="text"
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                    errors.childName
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  )}
                  placeholder="Emma"
                />
              </div>
              {errors.childName && (
                <p className="text-sm text-red-600 mt-1">{errors.childName.message}</p>
              )}
            </div>
            
            {/* Child Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Group
              </label>
              <select
                {...register("childAge")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select age group</option>
                {Object.entries(ageGroupLabels).map(([value, label]) => (
                  value !== "" && (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Message</h3>
          
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <select
              {...register("subject")}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                errors.subject
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              )}
            >
              <option value="">Select a subject</option>
              {Object.entries(subjectLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
            )}
          </div>
          
          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                {...register("message")}
                rows={5}
                className={cn(
                  "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none",
                  errors.message
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                )}
                placeholder="Tell us how we can help you..."
              />
            </div>
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>
        </div>
        
        {/* Consent */}
        <div className="space-y-4">
          <label className="flex items-start gap-3">
            <input
              {...register("consent")}
              type="checkbox"
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              I agree to the privacy policy and consent to Great Beginnings Day Care 
              contacting me about my inquiry. *
            </span>
          </label>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent.message}</p>
          )}
        </div>
        
        {/* Honeypot field (hidden) */}
        <input
          {...register("website")}
          type="text"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isPending || isSubmitting}
          className={cn(
            "w-full py-3 rounded-lg font-semibold transition-all",
            "flex items-center justify-center gap-2",
            isPending || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : urgency === 'emergency'
              ? "bg-red-600 text-white hover:bg-red-700"
              : urgency === 'urgent'
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
          whileHover={!isPending && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isPending && !isSubmitting ? { scale: 0.98 } : {}}
        >
          {isPending || isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}