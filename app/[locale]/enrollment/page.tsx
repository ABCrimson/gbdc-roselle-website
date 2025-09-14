/**
 * 📝 Enrollment Page - Great Beginnings Day Care
 *
 * 🎯 What does this do?
 * Provides comprehensive enrollment information, process steps, required documents,
 * and an enrollment form for new families.
 *
 * 🧒 Kid-Friendly Explanation:
 * This is where mommies and daddies sign up their children to join our daycare -
 * like filling out a special form to become part of our school family!
 *
 * 📚 How to use:
 * @example
 * ```tsx
 * // This page is automatically rendered at /enrollment
 * // Uses Server Components with Server Actions for form handling
 * ```
 *
 * 🎭 Used by:
 * - Main navigation
 * - Programs page CTAs
 * - Homepage enrollment buttons
 *
 * 🏗️ Modern Patterns:
 * - Server Component (React 19)
 * - Server Actions for form submission
 * - Tailwind 4.1.13 container queries
 * - Next.js 15.5.2 Partial Prerendering
 */

import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  CheckCircle,
  Calendar,
  Users,
  Home,
  Clock,
  DollarSign,
  Shield,
  Baby,
  ClipboardList,
  Download,
  ArrowRight,
  Info,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Heart,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { EnrollmentForm } from '@/components/forms/EnrollmentForm';

/**
 * 📝 Metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: 'Enrollment | Great Beginnings Day Care',
    description: 'Enroll your child at Great Beginnings Day Care in Roselle, IL. Learn about our enrollment process, required documents, tuition rates, and start your application today.',
    keywords: 'daycare enrollment, childcare registration, Roselle daycare application, enrollment forms, tuition rates',
    openGraph: {
      title: 'Enrollment - Great Beginnings Day Care',
      description: 'Start your child\'s journey with us. Simple enrollment process and flexible payment options.',
      images: ['/images/enrollment-hero.jpg'],
    },
  };
}

/**
 * 📋 Enrollment steps
 */
const enrollmentSteps = [
  {
    step: 1,
    title: 'Schedule a Tour',
    description: 'Visit our facility and meet our staff',
    icon: Calendar,
    status: 'Schedule online or call us',
  },
  {
    step: 2,
    title: 'Submit Application',
    description: 'Complete the enrollment form online',
    icon: FileText,
    status: 'Takes about 15 minutes',
  },
  {
    step: 3,
    title: 'Provide Documents',
    description: 'Upload required paperwork',
    icon: ClipboardList,
    status: 'Medical records, immunizations, etc.',
  },
  {
    step: 4,
    title: 'Enrollment Meeting',
    description: 'Review policies and complete registration',
    icon: Users,
    status: '30-minute meeting with director',
  },
  {
    step: 5,
    title: 'Welcome to GBDC!',
    description: 'Your child starts their journey',
    icon: Heart,
    status: 'Orientation and first day',
  },
];

/**
 * 📄 Required documents
 */
const requiredDocuments = [
  {
    category: 'Medical Records',
    items: [
      'Physical examination (within last 12 months)',
      'Immunization records (up to date)',
      'Lead screening results (if applicable)',
      'TB test results (if required)',
    ],
  },
  {
    category: 'Identification',
    items: [
      'Child\'s birth certificate',
      'Parent/Guardian photo ID',
      'Custody documents (if applicable)',
      'Power of attorney (if applicable)',
    ],
  },
  {
    category: 'Emergency Information',
    items: [
      'Emergency contact list (3 contacts minimum)',
      'Authorized pickup list with photos',
      'Medical consent forms',
      'Allergy and medication information',
    ],
  },
  {
    category: 'Financial',
    items: [
      'Registration fee payment',
      'First week\'s tuition',
      'Automatic payment authorization (optional)',
      'CCAP documentation (if applicable)',
    ],
  },
];

/**
 * 💰 Tuition rates
 */
const tuitionRates = [
  {
    program: 'Infant Care',
    ages: '6 weeks - 15 months',
    fullTime: '$325/week',
    partTime: '$195/week',
    dropIn: '$75/day',
  },
  {
    program: 'Toddler Program',
    ages: '15 months - 2 years',
    fullTime: '$295/week',
    partTime: '$175/week',
    dropIn: '$70/day',
  },
  {
    program: 'Preschool',
    ages: '3 - 4 years',
    fullTime: '$265/week',
    partTime: '$160/week',
    dropIn: '$65/day',
  },
  {
    program: 'Pre-K',
    ages: '4 - 5 years',
    fullTime: '$255/week',
    partTime: '$155/week',
    dropIn: '$60/day',
  },
  {
    program: 'School Age',
    ages: '5 - 12 years',
    fullTime: '$225/week',
    partTime: '$135/week',
    dropIn: '$55/day',
  },
];

export default async function EnrollmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-2 h-3 w-3" />
              Now Enrolling for 2025-2026
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Begin Your Child's Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our nurturing community where children thrive through play-based learning,
              experienced care, and individualized attention.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="gap-2">
                  Schedule a Tour
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Forms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple Enrollment Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've made enrollment easy with our 5-step process. Most families complete
                enrollment within one week.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {enrollmentSteps.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      {index < enrollmentSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-border" />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <Alert className="border-primary/20">
              <Info className="h-4 w-4" />
              <AlertTitle>Ready to Start?</AlertTitle>
              <AlertDescription>
                The enrollment process typically takes 5-7 business days. We recommend starting
                2-3 weeks before your desired start date. Limited spots available!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="documents" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Required Documents</TabsTrigger>
                <TabsTrigger value="tuition">Tuition & Fees</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Document Checklist
                    </CardTitle>
                    <CardDescription>
                      Please prepare these documents before starting your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {requiredDocuments.map((category, index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Badge variant="outline">{category.category}</Badge>
                          </h4>
                          <ul className="space-y-2">
                            {category.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <Alert>
                      <Download className="h-4 w-4" />
                      <AlertTitle>Download Forms</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-2">
                          <Button variant="link" className="h-auto p-0 justify-start">
                            → Medical Form Template (PDF)
                          </Button>
                          <br />
                          <Button variant="link" className="h-auto p-0 justify-start">
                            → Emergency Contact Form (PDF)
                          </Button>
                          <br />
                          <Button variant="link" className="h-auto p-0 justify-start">
                            → Complete Enrollment Packet (PDF)
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tuition" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      2025-2026 Tuition Rates
                    </CardTitle>
                    <CardDescription>
                      Competitive rates with flexible payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Program</th>
                            <th className="text-left p-2">Ages</th>
                            <th className="text-center p-2">Full-Time</th>
                            <th className="text-center p-2">Part-Time</th>
                            <th className="text-center p-2">Drop-In</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tuitionRates.map((rate, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{rate.program}</td>
                              <td className="p-2 text-sm text-muted-foreground">{rate.ages}</td>
                              <td className="p-2 text-center font-semibold">{rate.fullTime}</td>
                              <td className="p-2 text-center">{rate.partTime}</td>
                              <td className="p-2 text-center text-sm">{rate.dropIn}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Registration Fee</AlertTitle>
                        <AlertDescription>
                          One-time fee of $150 per child ($100 for siblings)
                        </AlertDescription>
                      </Alert>

                      <Alert>
                        <Heart className="h-4 w-4" />
                        <AlertTitle>Discounts Available</AlertTitle>
                        <AlertDescription>
                          10% sibling discount • Military families • CCAP accepted
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h4 className="font-semibold mb-3">Payment Options</h4>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Weekly</p>
                            <p className="text-xs text-muted-foreground">Auto-pay available</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Bi-Weekly</p>
                            <p className="text-xs text-muted-foreground">2% discount</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">Monthly</p>
                            <p className="text-xs text-muted-foreground">5% discount</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="policies" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        Hours of Operation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">6:30 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday - Sunday</span>
                        <span className="text-muted-foreground">Closed</span>
                      </div>
                      <Separator className="my-3" />
                      <p className="text-sm text-muted-foreground">
                        Extended hours available upon request for an additional fee.
                        Closed on major holidays.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Shield className="h-5 w-5 text-primary" />
                        Health & Safety
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Daily health screenings required</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>24-hour illness exclusion policy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Medication administration available</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Allergy-aware environment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Baby className="h-5 w-5 text-primary" />
                        What to Bring
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <span>Change of clothes (2 sets)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <span>Diapers and wipes (if needed)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <span>Nap items (blanket, lovey)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <span>Labeled water bottle</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                          <span>Sunscreen (seasonal)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Parent Involvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Monthly parent newsletters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Bi-annual parent conferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Volunteer opportunities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Family events and celebrations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Parent advisory committee</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Start Your Application</h2>
              <p className="text-muted-foreground">
                Complete the form below to begin the enrollment process. We'll contact you
                within 24 hours to schedule your tour.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Application</CardTitle>
                <CardDescription>
                  All fields marked with * are required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">When can my child start?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Children can start as soon as the enrollment process is complete and space is
                    available. We recommend applying 2-3 weeks before your desired start date.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a waitlist?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we maintain a waitlist when programs are full. Priority is given based on
                    application date and sibling enrollment. Waitlist families are contacted as soon
                    as spots become available.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my child has allergies or special needs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We work closely with families to accommodate allergies and special needs. Our staff
                    is trained in allergy management and we create individualized care plans as needed.
                    Please discuss specific needs during your tour.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change my schedule after enrolling?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Schedule changes are possible based on availability. We require two weeks notice
                    for permanent schedule changes. Temporary changes can be accommodated with 48 hours
                    notice when space permits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Family?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We can't wait to meet you and your child. Contact us today to schedule
            your personalized tour and see why families love Great Beginnings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="secondary" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Tour
              </Button>
            </Link>
            <Link href="tel:+16305550123">
              <Button size="lg" variant="outline" className="gap-2 bg-background text-foreground hover:bg-background/90">
                <Phone className="h-4 w-4" />
                Call (630) 555-0123
              </Button>
            </Link>
            <Link href="mailto:enroll@greatbeginningsdaycare.com">
              <Button size="lg" variant="outline" className="gap-2 bg-background text-foreground hover:bg-background/90">
                <Mail className="h-4 w-4" />
                Email Us
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>123 Main Street, Roselle, IL 60172</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mon-Fri: 6:30 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}