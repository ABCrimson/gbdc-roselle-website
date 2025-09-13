/**
 * Weather Display Component
 * 
 * Client component for displaying weather data with animations.
 * Uses Framer Motion 12 for smooth transitions.
 * 
 * Like a beautiful weather dashboard on your TV!
 */

"use client";

import { motion } from "framer-motion";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  CloudRain,
  Umbrella
} from "lucide-react";
import Image from "next/image";
import { WeatherData, ForecastData } from "@/lib/weather/types";
import { 
  getWeatherIconUrl, 
  getWindDirection, 
  formatWeatherTime,
  getWeatherEmoji 
} from "@/lib/weather/api";

interface WeatherDisplayProps {
  current: WeatherData;
  forecast?: ForecastData;
  units?: 'metric' | 'imperial';
}

export function WeatherDisplay({ 
  current, 
  forecast, 
  units = 'imperial' 
}: WeatherDisplayProps) {
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const speedUnit = units === 'imperial' ? 'mph' : 'm/s';
  
  // Get next 5 forecast periods (3-hour intervals)
  const upcomingForecast = forecast?.list.slice(0, 5) || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-xl shadow-lg border border-blue-200 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {current.name} Weather
              </h3>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            {/* Weather Icon */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Image
                src={getWeatherIconUrl(current.weather[0].icon, '4x')}
                alt={current.weather[0].description}
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>
          
          {/* Temperature and Description */}
          <div className="flex items-end gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-5xl font-bold text-gray-900"
            >
              {Math.round(current.main.temp)}{tempUnit}
            </motion.div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800 capitalize">
                {current.weather[0].description}
              </p>
              <p className="text-sm text-gray-600">
                Feels like {Math.round(current.main.feels_like)}{tempUnit}
              </p>
            </div>
          </div>
          
          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Humidity */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur rounded-lg p-3"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Droplets className="w-4 h-4" />
                <span className="text-xs font-medium">Humidity</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {current.main.humidity}%
              </p>
            </motion.div>
            
            {/* Wind */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur rounded-lg p-3"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Wind className="w-4 h-4" />
                <span className="text-xs font-medium">Wind</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {Math.round(current.wind.speed)} {speedUnit}
              </p>
              <p className="text-xs text-gray-600">
                {getWindDirection(current.wind.deg)}
              </p>
            </motion.div>
            
            {/* Pressure */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur rounded-lg p-3"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Gauge className="w-4 h-4" />
                <span className="text-xs font-medium">Pressure</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {current.main.pressure}
              </p>
              <p className="text-xs text-gray-600">hPa</p>
            </motion.div>
            
            {/* Visibility */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur rounded-lg p-3"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-medium">Visibility</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {Math.round(current.visibility / 1000)}
              </p>
              <p className="text-xs text-gray-600">km</p>
            </motion.div>
          </div>
          
          {/* Sunrise/Sunset */}
          <div className="flex items-center justify-around mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center gap-2">
              <Sunrise className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-600">Sunrise</p>
                <p className="text-sm font-medium">
                  {formatWeatherTime(current.sys.sunrise, current.timezone)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Sunset</p>
                <p className="text-sm font-medium">
                  {formatWeatherTime(current.sys.sunset, current.timezone)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forecast Section */}
      {forecast && upcomingForecast.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg border p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-600" />
            Next 15 Hours
          </h4>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            {upcomingForecast.map((item, index) => {
              const time = new Date(item.dt * 1000);
              const hour = time.getHours();
              const isNight = hour >= 20 || hour <= 6;
              
              return (
                <motion.div
                  key={item.dt}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0 w-24 text-center bg-gradient-to-b from-gray-50 to-white rounded-lg border p-3"
                >
                  <p className="text-xs text-gray-600 mb-2">
                    {time.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true
                    })}
                  </p>
                  
                  <div className="relative w-12 h-12 mx-auto mb-2">
                    <Image
                      src={getWeatherIconUrl(item.weather[0].icon)}
                      alt={item.weather[0].main}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <p className="text-sm font-semibold text-gray-900">
                    {Math.round(item.main.temp)}{tempUnit}
                  </p>
                  
                  {item.pop > 0 && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Umbrella className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">
                        {Math.round(item.pop * 100)}%
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {/* Weather Alert for Kids */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-2">
          Today's Outdoor Play Conditions
        </h4>
        <p className="text-sm text-gray-700">
          {getPlayConditionMessage(current)}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Get play condition message based on weather
 */
function getPlayConditionMessage(weather: WeatherData): string {
  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].main;
  
  if (condition === 'Rain' || condition === 'Thunderstorm') {
    return "🌧️ Indoor play day! We'll have fun activities inside today.";
  }
  
  if (condition === 'Snow') {
    return "❄️ Snow day! Bundle up for some winter fun (if temperature permits).";
  }
  
  if (temp > 90) {
    return "🌡️ Very hot outside. Limited outdoor time with extra water breaks.";
  }
  
  if (temp < 32) {
    return "🧊 Too cold for extended outdoor play. Short outdoor time with warm clothes.";
  }
  
  if (temp >= 60 && temp <= 85 && (condition === 'Clear' || condition === 'Clouds')) {
    return "☀️ Perfect weather for outdoor play! The kids will enjoy time outside today.";
  }
  
  return "🌤️ Good day for outdoor activities with appropriate clothing.";
}