/**
 * 🚨 Error Handling Utilities
 *
 * 🎯 What does this do?
 * Provides centralized error handling for Server Actions and API routes
 *
 * 🧒 Kid-Friendly Explanation:
 * This is like a safety net that catches problems and handles them nicely
 * instead of letting the website break - like having a backup plan!
 *
 * 🏗️ Modern Patterns:
 * - Type-safe error handling
 * - Structured error responses
 * - Logging and monitoring hooks
 */

import { headers } from 'next/headers';

/**
 * Custom error types
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTH_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHZ_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(resetTime?: Date) {
    const message = resetTime
      ? `Rate limit exceeded. Try again after ${resetTime.toISOString()}`
      : 'Rate limit exceeded';
    super(message, 429, 'RATE_LIMIT');
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: any) {
    super(`External service error: ${service}`, 503, 'EXTERNAL_SERVICE', originalError);
    this.name = 'ExternalServiceError';
  }
}

/**
 * Server Action result types
 */
export type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string; details?: any };

/**
 * Error logger interface
 */
interface ErrorLogger {
  log(error: Error, context?: any): void;
}

/**
 * Default console logger
 */
class ConsoleErrorLogger implements ErrorLogger {
  log(error: Error, context?: any): void {
    console.error('Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}

// Global error logger (can be replaced with external service)
let errorLogger: ErrorLogger = new ConsoleErrorLogger();

/**
 * Set custom error logger
 */
export function setErrorLogger(logger: ErrorLogger) {
  errorLogger = logger;
}

/**
 * Handle errors in Server Actions
 */
export async function handleActionError(error: unknown, context?: any): Promise<ActionResult> {
  // Log the error
  if (error instanceof Error) {
    errorLogger.log(error, context);
  }

  // Handle known error types
  if (error instanceof ValidationError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  if (error instanceof AuthorizationError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  if (error instanceof RateLimitError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  // Handle unknown errors
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';

  return {
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred. Please try again.'
      : message,
    code: 'INTERNAL_ERROR',
  };
}

/**
 * Wrap Server Action with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  action: T,
  context?: any
): T {
  return (async (...args: Parameters<T>) => {
    try {
      const result = await action(...args);
      return { success: true, data: result } as ActionResult;
    } catch (error) {
      return handleActionError(error, { ...context, args });
    }
  }) as T;
}

/**
 * Validate required fields
 */
export function validateRequired<T extends Record<string, any>>(
  data: T,
  fields: (keyof T)[]
): void {
  const missing: string[] = [];

  for (const field of fields) {
    if (!data[field]) {
      missing.push(String(field));
    }
  }

  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missing.join(', ')}`,
      { missing }
    );
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): void {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  const digits = phone.replace(/\D/g, '');

  if (!phoneRegex.test(phone) || digits.length < 10) {
    throw new ValidationError('Invalid phone number format');
  }
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, ''); // Remove HTML tags
}

/**
 * Get request metadata for logging
 */
export async function getRequestMetadata() {
  const headersList = await headers();

  return {
    userAgent: headersList.get('user-agent'),
    referer: headersList.get('referer'),
    ip: headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
        headersList.get('x-real-ip') ||
        headersList.get('cf-connecting-ip'),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Retry wrapper for external services
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 2,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxAttempts) {
        onRetry?.(lastError, attempt);
        const waitTime = delay * Math.pow(backoff, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}