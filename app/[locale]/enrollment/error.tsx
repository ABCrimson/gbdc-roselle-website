/**
 * 🚨 Enrollment Page Error Boundary
 *
 * 🎯 What does this do?
 * Catches and displays errors that occur on the Enrollment page in a user-friendly way
 *
 * 🧒 Kid-Friendly Explanation:
 * If something goes wrong with the enrollment form, this shows a helpful
 * message with other ways to sign up - like having a backup plan!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Error Boundary
 * - Client Component for interactivity
 * - Graceful error recovery
 */

'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home, Phone, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function EnrollmentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Enrollment page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <CardTitle className="text-2xl">Enrollment System Unavailable</CardTitle>
          </div>
          <CardDescription>
            We're having trouble with our online enrollment system right now.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <Phone className="h-4 w-4" />
            <AlertTitle>Alternative Enrollment Options</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p className="font-medium">You can still enroll by:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Calling us at (630) 555-0123</li>
                  <li>Emailing enroll@greatbeginningsdaycare.com</li>
                  <li>Visiting us in person during business hours</li>
                  <li>Downloading and mailing the enrollment forms</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Office Hours:</p>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 6:30 AM - 6:00 PM<br />
              Administrative hours: 9:00 AM - 5:00 PM
            </p>
          </div>

          {error.digest && (
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              Error ID: {error.digest}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              onClick={reset}
              variant="default"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Link href="tel:+16305550123" className="w-full">
              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button>
            </Link>

            <Link href="mailto:enroll@greatbeginningsdaycare.com" className="w-full">
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
            </Link>
          </div>

          <Button variant="secondary" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Enrollment Forms (PDF)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}