/**
 * Weather Page
 * 
 * Dedicated page for displaying weather information.
 * Server Component with full weather widget.
 * 
 * Like a weather channel just for the daycare!
 */

import { Metadata } from "next";
import { WeatherWidget } from "@/components/weather";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Weather | Great Beginnings Day Care",
  description: "Current weather conditions and forecast for Roselle, IL",
};

export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Roselle Weather
              </h1>
              <p className="text-gray-600 mt-1">
                Current conditions and forecast for our daycare location
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Widget */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <WeatherWidget showForecast={true} />
          
          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Outdoor Play Guidelines */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Outdoor Play Guidelines
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Ideal Conditions:</strong> 60-85°F, clear or partly cloudy
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">⚠</span>
                  <div>
                    <strong>Limited Outdoor Time:</strong> Above 90°F or below 32°F
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Indoor Activities:</strong> Heavy rain, storms, or extreme weather
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Weather Safety */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Weather Safety Tips
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💧</span>
                  <div>
                    <strong>Hydration:</strong> Extra water breaks on hot days
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">☀️</span>
                  <div>
                    <strong>Sun Protection:</strong> Sunscreen applied before outdoor play
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">🧥</span>
                  <div>
                    <strong>Appropriate Clothing:</strong> Layers for changing temperatures
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Emergency Weather Procedures */}
          <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Emergency Weather Procedures
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Great Beginnings Day Care follows strict safety protocols for severe weather:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">🌪️ Tornado Watch/Warning</p>
                <p className="text-gray-600">Move to designated safe areas away from windows</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">⛈️ Severe Thunderstorm</p>
                <p className="text-gray-600">All children brought inside immediately</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">❄️ Winter Storm</p>
                <p className="text-gray-600">Early closure notifications sent to parents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}