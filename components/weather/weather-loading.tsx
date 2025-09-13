/**
 * Weather Loading Component
 * 
 * Loading skeleton for weather widget with smooth animations.
 * Uses Tailwind CSS 4.1.13 for styling.
 * 
 * Like watching clouds form while waiting for the forecast!
 */

import { Cloud } from "lucide-react";

export function WeatherLoading() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-5 bg-white/50 rounded w-32 mb-2" />
          <div className="h-3 bg-white/30 rounded w-24" />
        </div>
        <div className="relative">
          <Cloud className="w-12 h-12 text-blue-300 animate-bounce" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-12 w-20 bg-white/50 rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-white/40 rounded w-16 mb-2" />
            <div className="h-3 bg-white/30 rounded w-24" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/30 rounded-lg p-2">
              <div className="h-3 bg-white/40 rounded mb-1" />
              <div className="h-4 bg-white/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Weather Skeleton Component
 * Alternative loading state with more detail
 */
export function WeatherSkeleton() {
  return (
    <div className="space-y-4">
      {/* Current Weather Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-20 mt-3 animate-pulse" />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Forecast Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="h-5 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
        <div className="flex gap-3 overflow-x-auto">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-shrink-0 w-20 space-y-2">
              <div className="h-3 bg-gray-100 rounded animate-pulse" />
              <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}