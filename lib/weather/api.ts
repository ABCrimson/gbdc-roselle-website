/**
 * Weather API Service
 * 
 * Server-side weather data fetching with OpenWeatherMap API.
 * Uses Next.js 15.5.2 caching with revalidation for optimal performance.
 * 
 * Like a weather station that gets fresh forecasts every hour!
 */

import { WeatherData, ForecastData, WeatherError } from './types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Default location: Roselle, IL
const DEFAULT_LOCATION = {
  lat: 41.9847,
  lon: -88.0778,
  city: 'Roselle',
};

/**
 * Fetch current weather data with caching
 */
export async function fetchCurrentWeather(
  lat: number = DEFAULT_LOCATION.lat,
  lon: number = DEFAULT_LOCATION.lon,
  units: 'metric' | 'imperial' = 'imperial'
): Promise<WeatherData | WeatherError> {
  if (!API_KEY) {
    return {
      code: 401,
      message: 'Weather API key not configured',
      timestamp: Date.now(),
    };
  }

  try {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    
    // Next.js 15.5.2 fetch with revalidation (1 hour cache)
    const response = await fetch(url, {
      next: { 
        revalidate: 3600, // Revalidate every hour
        tags: ['weather-current']
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        code: response.status,
        message: error.message || 'Failed to fetch weather data',
        timestamp: Date.now(),
      };
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Weather API error:', error);
    return {
      code: 500,
      message: 'Failed to connect to weather service',
      timestamp: Date.now(),
    };
  }
}

/**
 * Fetch 5-day weather forecast with caching
 */
export async function fetchWeatherForecast(
  lat: number = DEFAULT_LOCATION.lat,
  lon: number = DEFAULT_LOCATION.lon,
  units: 'metric' | 'imperial' = 'imperial'
): Promise<ForecastData | WeatherError> {
  if (!API_KEY) {
    return {
      code: 401,
      message: 'Weather API key not configured',
      timestamp: Date.now(),
    };
  }

  try {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    
    // Next.js 15.5.2 fetch with revalidation (3 hours cache for forecast)
    const response = await fetch(url, {
      next: { 
        revalidate: 10800, // Revalidate every 3 hours
        tags: ['weather-forecast']
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        code: response.status,
        message: error.message || 'Failed to fetch forecast data',
        timestamp: Date.now(),
      };
    }

    const data: ForecastData = await response.json();
    return data;
  } catch (error) {
    console.error('Forecast API error:', error);
    return {
      code: 500,
      message: 'Failed to connect to forecast service',
      timestamp: Date.now(),
    };
  }
}

/**
 * Get weather icon URL
 */
export function getWeatherIconUrl(iconCode: string, size: '2x' | '4x' = '2x'): string {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

/**
 * Convert temperature between units
 */
export function convertTemperature(
  temp: number,
  from: 'celsius' | 'fahrenheit',
  to: 'celsius' | 'fahrenheit'
): number {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  
  return (temp - 32) * 5/9;
}

/**
 * Format wind direction from degrees
 */
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                     'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Check if weather data is an error
 */
export function isWeatherError(data: WeatherData | ForecastData | WeatherError): data is WeatherError {
  return 'code' in data && 'message' in data && 'timestamp' in data;
}

/**
 * Get weather condition emoji
 */
export function getWeatherEmoji(condition: string): string {
  const emojiMap: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌫️',
    'Dust': '💨',
    'Fog': '🌫️',
    'Sand': '💨',
    'Ash': '🌋',
    'Squall': '💨',
    'Tornado': '🌪️',
  };
  
  return emojiMap[condition] || '🌡️';
}

/**
 * Format time for weather display
 */
export function formatWeatherTime(timestamp: number, timezone: number): string {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate UV index category
 */
export function getUVIndexCategory(uvi: number): {
  level: string;
  color: string;
  advice: string;
} {
  if (uvi <= 2) {
    return {
      level: 'Low',
      color: 'green',
      advice: 'No protection needed',
    };
  } else if (uvi <= 5) {
    return {
      level: 'Moderate',
      color: 'yellow',
      advice: 'Protection needed if outside for extended periods',
    };
  } else if (uvi <= 7) {
    return {
      level: 'High',
      color: 'orange',
      advice: 'Protection essential during midday hours',
    };
  } else if (uvi <= 10) {
    return {
      level: 'Very High',
      color: 'red',
      advice: 'Extra protection needed',
    };
  } else {
    return {
      level: 'Extreme',
      color: 'purple',
      advice: 'Avoid being outside during midday hours',
    };
  }
}