/**
 * 🚨 About Page Error Boundary
 *
 * 🎯 What does this do?
 * Catches and displays errors that occur on the About page in a user-friendly way
 *
 * 🧒 Kid-Friendly Explanation:
 * When something goes wrong on the About page, this shows a friendly message
 * instead of a scary error - like when a toy breaks, we fix it nicely!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Error Boundary
 * - Client Component for interactivity
 * - Graceful error recovery
 */

'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('About page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
          </div>
          <CardDescription>
            We're having trouble loading the About page right now.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>What happened?</AlertTitle>
            <AlertDescription>
              {error.message || 'An unexpected error occurred while loading this page.'}
            </AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground">
            <p>Don't worry! You can try these options:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Refresh the page to try again</li>
              <li>Go back to the homepage</li>
              <li>Contact us directly for information</li>
            </ul>
          </div>

          {error.digest && (
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              Error ID: {error.digest}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={reset}
            className="w-full sm:w-auto"
            variant="default"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>

          <Link href="tel:+16305550123" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}