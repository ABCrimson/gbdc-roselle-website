/**
 * Supabase Edge Functions Client
 * 
 * Type-safe client for invoking Supabase Edge Functions v2.
 * Provides strongly-typed function calls with automatic error handling.
 * 
 * @version Edge Functions v2
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/database/types'
import { edgeFunctions, type EdgeFunctionEndpoint } from './config'

/**
 * Edge Function response types
 */
export interface EdgeFunctionResponse<T = any> {
  data: T | null
  error: EdgeFunctionError | null
}

export interface EdgeFunctionError {
  message: string
  code?: string
  details?: any
}

/**
 * Email function payloads
 */
export interface SendEmailPayload {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: string
    encoding?: string
  }>
}

export interface WelcomeEmailPayload {
  parentName: string
  parentEmail: string
  childName: string
  enrollmentDate: string
}

export interface EnrollmentConfirmationPayload {
  parentName: string
  parentEmail: string
  childName: string
  classroom: string
  startDate: string
  documents: string[]
}

/**
 * Document processing payloads
 */
export interface ProcessDocumentPayload {
  documentId: string
  documentUrl: string
  documentType: string
  operations?: Array<'ocr' | 'compress' | 'watermark' | 'encrypt'>
}

export interface GeneratePdfPayload {
  template: 'enrollment' | 'invoice' | 'report' | 'certificate'
  data: Record<string, any>
  options?: {
    format?: 'A4' | 'Letter'
    orientation?: 'portrait' | 'landscape'
    margin?: number
  }
}

/**
 * Scheduling payloads
 */
export interface ScheduleTourPayload {
  parentName: string
  parentEmail: string
  parentPhone: string
  preferredDate: string
  preferredTime: string
  childAge: string
  notes?: string
}

export interface SendReminderPayload {
  type: 'tour' | 'payment' | 'document' | 'event'
  recipientEmail: string
  recipientName: string
  reminderDate: string
  details: Record<string, any>
}

/**
 * Payment payloads
 */
export interface CreatePaymentIntentPayload {
  amount: number
  currency?: string
  description: string
  customerId?: string
  metadata?: Record<string, string>
}

export interface ProcessPaymentPayload {
  paymentIntentId: string
  paymentMethodId: string
  confirm?: boolean
}

/**
 * Analytics payloads
 */
export interface TrackEventPayload {
  event: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: string
}

export interface GenerateReportPayload {
  reportType: 'enrollment' | 'financial' | 'attendance' | 'waitlist'
  startDate: string
  endDate: string
  format?: 'pdf' | 'excel' | 'csv'
  filters?: Record<string, any>
}

/**
 * Translation payload
 */
export interface TranslateContentPayload {
  content: string | Record<string, string>
  targetLanguage: 'es' | 'ru' | 'uk'
  sourceLanguage?: 'en'
}

/**
 * Edge Functions client class
 */
export class EdgeFunctionsClient {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Invoke an Edge Function with type safety
   */
  private async invoke<TPayload, TResponse>(
    functionName: EdgeFunctionEndpoint,
    payload?: TPayload,
    options?: {
      headers?: Record<string, string>
      method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    }
  ): Promise<EdgeFunctionResponse<TResponse>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(
        edgeFunctions.endpoints[functionName].replace('/',''),
        {
          body: payload,
          headers: {
            ...edgeFunctions.headers,
            ...options?.headers,
          },
          method: options?.method || 'POST',
        }
      )

      if (error) {
        return {
          data: null,
          error: {
            message: error.message || 'Edge function error',
            code: 'EDGE_FUNCTION_ERROR',
            details: error,
          },
        }
      }

      return { data, error: null }
    } catch (error) {
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'INVOCATION_ERROR',
          details: error,
        },
      }
    }
  }

  /**
   * Email functions
   */
  async sendEmail(payload: SendEmailPayload) {
    return this.invoke<SendEmailPayload, { messageId: string }>(
      'sendEmail',
      payload
    )
  }

  async sendWelcomeEmail(payload: WelcomeEmailPayload) {
    return this.invoke<WelcomeEmailPayload, { messageId: string }>(
      'sendWelcomeEmail',
      payload
    )
  }

  async sendEnrollmentConfirmation(payload: EnrollmentConfirmationPayload) {
    return this.invoke<EnrollmentConfirmationPayload, { messageId: string }>(
      'sendEnrollmentConfirmation',
      payload
    )
  }

  /**
   * Document processing functions
   */
  async processDocument(payload: ProcessDocumentPayload) {
    return this.invoke<ProcessDocumentPayload, { 
      processedUrl: string
      metadata: Record<string, any>
    }>('processDocument', payload)
  }

  async generatePdf(payload: GeneratePdfPayload) {
    return this.invoke<GeneratePdfPayload, {
      pdfUrl: string
      size: number
    }>('generatePdf', payload)
  }

  async scanForVirus(documentUrl: string) {
    return this.invoke<{ url: string }, {
      clean: boolean
      threats?: string[]
    }>('scanForVirus', { url: documentUrl })
  }

  /**
   * Scheduling functions
   */
  async scheduleTour(payload: ScheduleTourPayload) {
    return this.invoke<ScheduleTourPayload, {
      tourId: string
      confirmationCode: string
      scheduledAt: string
    }>('scheduleTour', payload)
  }

  async sendReminder(payload: SendReminderPayload) {
    return this.invoke<SendReminderPayload, {
      reminderId: string
      scheduledFor: string
    }>('sendReminder', payload)
  }

  /**
   * Payment functions
   */
  async createPaymentIntent(payload: CreatePaymentIntentPayload) {
    return this.invoke<CreatePaymentIntentPayload, {
      paymentIntentId: string
      clientSecret: string
      amount: number
    }>('createPaymentIntent', payload)
  }

  async processPayment(payload: ProcessPaymentPayload) {
    return this.invoke<ProcessPaymentPayload, {
      status: 'succeeded' | 'processing' | 'failed'
      paymentId: string
    }>('processPayment', payload)
  }

  /**
   * Analytics functions
   */
  async trackEvent(payload: TrackEventPayload) {
    return this.invoke<TrackEventPayload, {
      eventId: string
      tracked: boolean
    }>('trackEvent', payload)
  }

  async generateReport(payload: GenerateReportPayload) {
    return this.invoke<GenerateReportPayload, {
      reportUrl: string
      generatedAt: string
      recordCount: number
    }>('generateReport', payload)
  }

  /**
   * AI/ML functions
   */
  async translateContent(payload: TranslateContentPayload) {
    return this.invoke<TranslateContentPayload, {
      translated: string | Record<string, string>
      confidence: number
    }>('translateContent', payload)
  }

  async analyzeDocument(documentUrl: string) {
    return this.invoke<{ url: string }, {
      documentType: string
      extractedData: Record<string, any>
      confidence: number
    }>('analyzeDocument', { url: documentUrl })
  }

  /**
   * Webhook handlers
   */
  async handleWebhook(payload: Record<string, any>) {
    return this.invoke<Record<string, any>, {
      processed: boolean
      actions: string[]
    }>('handleWebhook', payload)
  }

  async syncCalendar(calendarUrl: string) {
    return this.invoke<{ url: string }, {
      eventsAdded: number
      eventsUpdated: number
      eventsRemoved: number
    }>('syncCalendar', { url: calendarUrl })
  }
}

/**
 * Factory function to create an Edge Functions client
 */
export function createEdgeFunctionsClient(
  supabase: SupabaseClient<Database>
): EdgeFunctionsClient {
  return new EdgeFunctionsClient(supabase)
}

/**
 * Hook-friendly Edge Functions client creator
 */
export function useEdgeFunctions(
  supabase: SupabaseClient<Database>
): EdgeFunctionsClient {
  return new EdgeFunctionsClient(supabase)
}