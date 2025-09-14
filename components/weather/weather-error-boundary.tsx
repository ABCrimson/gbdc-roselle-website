/**
 * Weather Error Boundary Client Component
 *
 * Client-side wrapper for error boundary functionality
 */

"use client";

import { ErrorBoundary } from "react-error-boundary";
import { WeatherError } from "./weather-error";

interface WeatherErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function WeatherErrorBoundary({
  children,
  fallback
}: WeatherErrorBoundaryProps) {
  if (fallback) {
    return (
      <ErrorBoundary fallback={fallback}>
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <WeatherError error={error} reset={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}