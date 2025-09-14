/**
 * 🚨 Programs Page Error Boundary
 *
 * 🎯 What does this do?
 * Catches and displays errors that occur on the Programs page in a user-friendly way
 *
 * 🧒 Kid-Friendly Explanation:
 * If something goes wrong when showing our classroom programs, this shows
 * a helpful message instead of breaking - like having a backup plan!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Error Boundary
 * - Client Component for interactivity
 * - Graceful error recovery
 */

'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home, Phone, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function ProgramsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Programs page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <CardTitle className="text-2xl">Unable to Load Programs</CardTitle>
          </div>
          <CardDescription>
            We're having trouble displaying our programs right now.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertTitle>Our Programs Include:</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Infant Care (6 weeks - 15 months)</li>
                <li>Toddler Program (15 months - 2 years)</li>
                <li>Preschool (3 - 4 years)</li>
                <li>Pre-K (4 - 5 years)</li>
                <li>School Age (5 - 12 years)</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground">
            <p>You can still:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Call us for program information</li>
              <li>Schedule a tour to see our classrooms</li>
              <li>Try refreshing the page</li>
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
              Call for Info
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}