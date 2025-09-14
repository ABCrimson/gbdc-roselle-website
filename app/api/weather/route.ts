/**
 * 🌤️ Weather API Route
 *
 * 🎯 What does this do?
 * Fetches weather data from OpenWeatherMap API with caching and rate limiting
 *
 * 🧒 Kid-Friendly Explanation:
 * This gets the weather information for our daycare location - like having
 * a weather reporter that tells us if it's sunny or rainy outside!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Route Handler
 * - Rate limiting protection
 * - Response caching
 * - Error handling with fallbacks
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit';

/**
 * Weather data cache
 */
interface WeatherCache {
  data: any;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

// In-memory cache (in production, use Redis or similar)
const weatherCache = new Map<string, WeatherCache>();

/**
 * OpenWeatherMap API configuration
 */
const WEATHER_CONFIG = {
  apiKey: process.env.OPENWEATHER_API_KEY || '',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  // Roselle, IL coordinates
  defaultLocation: {
    lat: 41.9848,
    lon: -88.0776,
    city: 'Roselle',
  },
  cacheTTL: 10 * 60 * 1000, // 10 minutes
} as const;

/**
 * Error response helper
 */
function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    {
      error: true,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * GET /api/weather
 * Fetches current weather data
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(RateLimitPresets.weather);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again after ${rateLimitResult.reset.toISOString()}`,
          retryAfter: rateLimitResult.reset.getTime() - Date.now(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset.getTime() - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Check if API key is configured
    if (!WEATHER_CONFIG.apiKey) {
      console.error('OpenWeatherMap API key not configured');
      return errorResponse('Weather service not configured', 503);
    }

    // Get location from query params or use default
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || WEATHER_CONFIG.defaultLocation.lat.toString();
    const lon = searchParams.get('lon') || WEATHER_CONFIG.defaultLocation.lon.toString();
    const units = searchParams.get('units') || 'imperial';

    // Create cache key
    const cacheKey = `weather:${lat}:${lon}:${units}`;

    // Check cache
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return NextResponse.json(
        {
          ...cached.data,
          cached: true,
          cacheAge: Date.now() - cached.timestamp,
        },
        {
          headers: {
            'X-Cache': 'HIT',
            'X-Cache-Age': ((Date.now() - cached.timestamp) / 1000).toString(),
            'Cache-Control': `public, max-age=${Math.floor(cached.ttl / 1000)}`,
          },
        }
      );
    }

    // Fetch weather data
    const weatherUrl = new URL(`${WEATHER_CONFIG.baseUrl}/weather`);
    weatherUrl.searchParams.set('lat', lat);
    weatherUrl.searchParams.set('lon', lon);
    weatherUrl.searchParams.set('units', units);
    weatherUrl.searchParams.set('appid', WEATHER_CONFIG.apiKey);

    const weatherResponse = await fetch(weatherUrl.toString(), {
      next: {
        revalidate: 600, // Revalidate every 10 minutes
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 401) {
        console.error('Invalid OpenWeatherMap API key');
        return errorResponse('Weather service authentication failed', 503);
      }
      if (weatherResponse.status === 429) {
        return errorResponse('Weather service rate limit exceeded', 503);
      }
      throw new Error(`Weather API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Fetch forecast data
    const forecastUrl = new URL(`${WEATHER_CONFIG.baseUrl}/forecast`);
    forecastUrl.searchParams.set('lat', lat);
    forecastUrl.searchParams.set('lon', lon);
    forecastUrl.searchParams.set('units', units);
    forecastUrl.searchParams.set('cnt', '8'); // Next 24 hours (3-hour intervals)
    forecastUrl.searchParams.set('appid', WEATHER_CONFIG.apiKey);

    const forecastResponse = await fetch(forecastUrl.toString(), {
      next: {
        revalidate: 600,
      },
      signal: AbortSignal.timeout(5000),
    });

    let forecastData = null;
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json();
    }

    // Prepare response data
    const responseData = {
      current: {
        temp: Math.round(weatherData.main.temp),
        feels_like: Math.round(weatherData.main.feels_like),
        temp_min: Math.round(weatherData.main.temp_min),
        temp_max: Math.round(weatherData.main.temp_max),
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        main: weatherData.weather[0].main,
        wind_speed: Math.round(weatherData.wind.speed),
        wind_deg: weatherData.wind.deg,
        clouds: weatherData.clouds.all,
        visibility: weatherData.visibility,
        sunrise: weatherData.sys.sunrise * 1000, // Convert to milliseconds
        sunset: weatherData.sys.sunset * 1000,
      },
      location: {
        name: weatherData.name || WEATHER_CONFIG.defaultLocation.city,
        country: weatherData.sys.country,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
      },
      forecast: forecastData ? forecastData.list.slice(0, 4).map((item: any) => ({
        dt: item.dt * 1000,
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        pop: Math.round((item.pop || 0) * 100), // Probability of precipitation
      })) : [],
      timestamp: new Date().toISOString(),
      cached: false,
    };

    // Update cache
    weatherCache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
      ttl: WEATHER_CONFIG.cacheTTL,
    });

    // Clean old cache entries
    for (const [key, value] of weatherCache.entries()) {
      if (Date.now() - value.timestamp > value.ttl * 2) {
        weatherCache.delete(key);
      }
    }

    return NextResponse.json(responseData, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': `public, max-age=${Math.floor(WEATHER_CONFIG.cacheTTL / 1000)}`,
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);

    // Return fallback data in case of error
    return NextResponse.json(
      {
        current: {
          temp: 72,
          feels_like: 70,
          temp_min: 68,
          temp_max: 76,
          humidity: 60,
          description: 'Weather data temporarily unavailable',
          icon: '01d',
          main: 'Clear',
          wind_speed: 5,
        },
        location: {
          name: WEATHER_CONFIG.defaultLocation.city,
          country: 'US',
        },
        forecast: [],
        error: true,
        message: 'Using fallback weather data',
        timestamp: new Date().toISOString(),
      },
      {
        status: 200, // Return 200 with fallback data to prevent client errors
        headers: {
          'X-Fallback': 'true',
          'Cache-Control': 'public, max-age=60', // Cache fallback for 1 minute
        },
      }
    );
  }
}

/**
 * OPTIONS /api/weather
 * CORS preflight handler
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}