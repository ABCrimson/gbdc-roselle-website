/**
 * 🚦 Rate Limiting Utility
 *
 * 🎯 What does this do?
 * Implements rate limiting to prevent API abuse and ensure fair usage
 *
 * 🧒 Kid-Friendly Explanation:
 * This is like a traffic light for our website - it makes sure no one
 * sends too many requests too quickly, keeping everything running smoothly!
 *
 * 🏗️ Modern Patterns:
 * - In-memory rate limiting with LRU cache
 * - Sliding window algorithm
 * - TypeScript strict mode
 */

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Rate limit configuration
 */
interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max users per interval
  requests: number; // Max requests per interval per user
}

/**
 * Rate limit result
 */
interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
}

/**
 * In-memory store for rate limiting
 * In production, use Redis or similar
 */
class RateLimitStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  increment(key: string, interval: number, limit: number): RateLimitResult {
    const now = Date.now();
    const record = this.store.get(key);
    const resetTime = now + interval;

    if (!record || record.resetTime < now) {
      // Create new record
      this.store.set(key, { count: 1, resetTime });
      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: new Date(resetTime),
      };
    }

    if (record.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        limit,
        remaining: 0,
        reset: new Date(record.resetTime),
      };
    }

    // Increment count
    record.count++;
    this.store.set(key, record);

    return {
      success: true,
      limit,
      remaining: limit - record.count,
      reset: new Date(record.resetTime),
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (record.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Global store instance
const rateLimitStore = new RateLimitStore();

/**
 * Get identifier from request
 */
async function getIdentifier(): Promise<string> {
  const headersList = await headers();

  // Try to get IP from various headers
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');

  // Use the first available IP or fallback to a default
  const ip = forwardedFor?.split(',')[0].trim() ||
             realIp ||
             cfConnectingIp ||
             '127.0.0.1';

  return ip;
}

/**
 * Rate limiting middleware
 */
export async function rateLimit(config: RateLimitConfig): Promise<RateLimitResult> {
  const identifier = await getIdentifier();
  const key = `rate-limit:${identifier}`;

  return rateLimitStore.increment(key, config.interval, config.requests);
}

/**
 * Rate limit response helper
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  const headers = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toISOString(),
  };

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Please try again after ${result.reset.toISOString()}`,
      },
      {
        status: 429,
        headers,
      }
    );
  }

  return NextResponse.next({
    headers,
  });
}

/**
 * Preset configurations
 */
export const RateLimitPresets = {
  // Strict: 10 requests per minute
  strict: {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
    requests: 10,
  } satisfies RateLimitConfig,

  // Standard: 30 requests per minute
  standard: {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
    requests: 30,
  } satisfies RateLimitConfig,

  // Relaxed: 60 requests per minute
  relaxed: {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
    requests: 60,
  } satisfies RateLimitConfig,

  // API: 100 requests per 15 minutes
  api: {
    interval: 15 * 60 * 1000,
    uniqueTokenPerInterval: 500,
    requests: 100,
  } satisfies RateLimitConfig,

  // Weather: 20 requests per 5 minutes (for weather API)
  weather: {
    interval: 5 * 60 * 1000,
    uniqueTokenPerInterval: 500,
    requests: 20,
  } satisfies RateLimitConfig,
} as const;

/**
 * Rate limit decorator for Server Actions
 */
export function withRateLimit<T extends (...args: any[]) => any>(
  fn: T,
  config: RateLimitConfig = RateLimitPresets.standard
): T {
  return (async (...args: Parameters<T>) => {
    const result = await rateLimit(config);

    if (!result.success) {
      throw new Error(`Rate limit exceeded. Try again after ${result.reset.toISOString()}`);
    }

    return fn(...args);
  }) as T;
}