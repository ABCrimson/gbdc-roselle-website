/**
 * 🚨 Contact Page Error Boundary
 *
 * 🎯 What does this do?
 * Catches and displays errors that occur on the Contact page in a user-friendly way
 *
 * 🧒 Kid-Friendly Explanation:
 * If something goes wrong on the contact page, this shows other ways to
 * reach us - like having multiple phone numbers just in case!
 *
 * 🏗️ Modern Patterns:
 * - React 19 Error Boundary
 * - Client Component for interactivity
 * - Graceful error recovery
 */

'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Contact page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <CardTitle className="text-2xl">Contact Page Unavailable</CardTitle>
          </div>
          <CardDescription>
            Don't worry! You can still reach us using the information below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-primary/20">
            <Phone className="h-4 w-4" />
            <AlertTitle>Contact Information</AlertTitle>
            <AlertDescription>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">(630) 555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">info@greatbeginningsdaycare.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">123 Main Street, Roselle, IL 60172</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mon-Fri: 6:30 AM - 6:00 PM</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Quick Actions:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Schedule a tour by calling us</li>
              <li>Email us your questions</li>
              <li>Visit during business hours</li>
              <li>Try refreshing this page</li>
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
              Call Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}