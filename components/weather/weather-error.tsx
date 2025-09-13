/**
 * Weather Error Component
 * 
 * Error boundary and fallback UI for weather widget.
 * Provides graceful error handling with retry functionality.
 * 
 * Like a friendly weatherman saying "technical difficulties, please stand by!"
 */

"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, CloudOff } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherErrorProps {
  error: Error;
  reset: () => void;
}

export function WeatherError({ error, reset }: WeatherErrorProps) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Weather widget error:', error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-red-100 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-50 rounded-lg">
          <CloudOff className="w-6 h-6 text-red-500" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            Weather Unavailable
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We couldn't load the weather information. This might be due to a temporary connection issue.
          </p>
          
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
      
      {/* Error details for development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 p-3 bg-gray-50 rounded-lg">
          <summary className="text-xs text-gray-500 cursor-pointer flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Error Details
          </summary>
          <pre className="mt-2 text-xs text-gray-600 overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
    </motion.div>
  );
}

/**
 * Weather Fallback Component
 * Shows when weather data is not available
 */
export function WeatherFallback() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Roselle Weather</h3>
          <p className="text-sm text-gray-600">Loading weather data...</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg animate-pulse" />
      </div>
      
      <div className="space-y-2">
        <div className="h-8 bg-white/50 rounded animate-pulse" />
        <div className="h-4 bg-white/30 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}