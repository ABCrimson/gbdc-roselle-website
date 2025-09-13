/**
 * Weather Widget Server Component
 * 
 * Main weather widget that fetches data server-side.
 * Uses Next.js 15.5.2 caching with revalidation for optimal performance.
 * 
 * Like having a meteorologist on staff at the daycare!
 */

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { 
  fetchCurrentWeather, 
  fetchWeatherForecast,
  isWeatherError 
} from "@/lib/weather/api";
import { WeatherDisplay } from "./weather-display";
import { WeatherError, WeatherFallback } from "./weather-error";
import { WeatherLoading } from "./weather-loading";

interface WeatherWidgetProps {
  showForecast?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Weather Data Fetcher Component
 * Server Component that fetches weather data
 */
async function WeatherData({ showForecast = true }: { showForecast?: boolean }) {
  // Fetch current weather (cached for 1 hour)
  const currentWeather = await fetchCurrentWeather();
  
  // Check for errors
  if (isWeatherError(currentWeather)) {
    throw new Error(currentWeather.message);
  }
  
  // Optionally fetch forecast (cached for 3 hours)
  let forecast = undefined;
  if (showForecast) {
    const forecastData = await fetchWeatherForecast();
    if (!isWeatherError(forecastData)) {
      forecast = forecastData;
    }
  }
  
  return (
    <WeatherDisplay 
      current={currentWeather} 
      forecast={forecast}
      units="imperial"
    />
  );
}

/**
 * Compact Weather Display
 * Minimal version for sidebar or header
 */
async function CompactWeatherData() {
  const weather = await fetchCurrentWeather();
  
  if (isWeatherError(weather)) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Weather unavailable</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-sm">
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
        className="w-8 h-8"
      />
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">
          {Math.round(weather.main.temp)}°F
        </span>
        <span className="text-xs text-gray-600">
          {weather.name}
        </span>
      </div>
    </div>
  );
}

/**
 * Main Weather Widget Component
 * Server Component with error boundary and loading states
 */
export async function WeatherWidget({ 
  showForecast = true, 
  compact = false,
  className = "" 
}: WeatherWidgetProps) {
  if (compact) {
    return (
      <ErrorBoundary
        fallback={<div className="text-sm text-gray-500">Weather unavailable</div>}
      >
        <Suspense fallback={<WeatherLoading />}>
          <CompactWeatherData />
        </Suspense>
      </ErrorBoundary>
    );
  }
  
  return (
    <div className={className}>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <WeatherError error={error} reset={resetErrorBoundary} />
        )}
      >
        <Suspense fallback={<WeatherLoading />}>
          <WeatherData showForecast={showForecast} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

/**
 * Weather Widget with Custom Location
 * For displaying weather at different locations
 */
export async function LocationWeatherWidget({ 
  lat, 
  lon, 
  locationName 
}: { 
  lat: number; 
  lon: number; 
  locationName?: string;
}) {
  const weather = await fetchCurrentWeather(lat, lon);
  
  if (isWeatherError(weather)) {
    return <WeatherFallback />;
  }
  
  // Override location name if provided
  const displayWeather = locationName 
    ? { ...weather, name: locationName }
    : weather;
  
  return <WeatherDisplay current={displayWeather} units="imperial" />;
}