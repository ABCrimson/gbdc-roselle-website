/**
 * 🏫 About Page - Great Beginnings Day Care
 *
 * 🎯 What does this do?
 * Shows comprehensive information about GBDC, including history, mission, values, team, and facilities.
 *
 * 🧒 Kid-Friendly Explanation:
 * This is like a big storybook page that tells everyone about our daycare - who we are,
 * what we believe in, who takes care of the children, and what makes our school special!
 *
 * 📚 How to use:
 * @example
 * ```tsx
 * // This page is automatically rendered at /about
 * // It uses Server Components for optimal performance
 * ```
 *
 * 🎭 Used by:
 * - Main navigation
 * - Footer links
 * - SEO landing pages
 *
 * 🏗️ Modern Patterns:
 * - Server Component (React 19)
 * - Async data fetching
 * - Tailwind 4.1.13 container queries
 * - Next.js 15.5.2 Image optimization
 */

import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Users,
  Trophy,
  Shield,
  Star,
  BookOpen,
  Home,
  Clock,
  Award,
  Baby,
  Smile,
  TreePine,
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

/**
 * 📝 Metadata for SEO
 * Provides search engines with information about the About page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: 'About Us | Great Beginnings Day Care',
    description: 'Learn about Great Beginnings Day Care Center in Roselle, IL. Discover our mission, values, experienced team, and commitment to quality childcare since 2014.',
    keywords: 'about GBDC, daycare history, childcare mission, Roselle daycare, experienced educators',
    openGraph: {
      title: 'About Great Beginnings Day Care',
      description: 'Providing quality childcare and early education in Roselle since 2014',
      images: ['/images/about-hero.jpg'],
    },
  };
}

/**
 * 🎨 Team member data structure
 */
interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  image?: string;
  certifications: string[];
}

/**
 * 👥 Our team members
 */
const teamMembers: TeamMember[] = [
  {
    name: 'Maria Rodriguez',
    role: 'Director',
    experience: '25+ years',
    specialization: 'Early Childhood Education',
    certifications: ['DCFS Licensed', 'CPR Certified', 'First Aid Certified'],
  },
  {
    name: 'Sarah Johnson',
    role: 'Assistant Director',
    experience: '15+ years',
    specialization: 'Child Development',
    certifications: ['Child Development Associate', 'CPR Certified'],
  },
  {
    name: 'Emily Chen',
    role: 'Lead Teacher - Infants',
    experience: '10+ years',
    specialization: 'Infant Care',
    certifications: ['Infant/Toddler Specialist', 'Safe Sleep Certified'],
  },
  {
    name: 'Michael Thompson',
    role: 'Lead Teacher - Toddlers',
    experience: '12+ years',
    specialization: 'Toddler Development',
    certifications: ['Early Childhood Education', 'Positive Discipline'],
  },
  {
    name: 'Jessica Williams',
    role: 'Lead Teacher - Preschool',
    experience: '8+ years',
    specialization: 'School Readiness',
    certifications: ['PreK Teaching Certificate', 'STEM Education'],
  },
];

/**
 * 🏆 Milestones and achievements
 */
const milestones = [
  { year: '2014', event: 'GBDC Acquired by Current Owners', icon: Home },
  { year: '2015', event: 'Expanded Infant Program', icon: Baby },
  { year: '2017', event: 'DCFS Gold Circle of Quality Award', icon: Trophy },
  { year: '2019', event: 'Introduced STEM Curriculum', icon: BookOpen },
  { year: '2021', event: 'Enhanced Safety Protocols', icon: Shield },
  { year: '2023', event: 'Celebrated 500+ Graduate Families', icon: Users },
  { year: '2024', event: '10 Year Anniversary Celebration', icon: Star },
];

/**
 * 💎 Core values with descriptions
 */
const coreValues = [
  {
    title: 'Safety First',
    description: 'Your child\'s safety is our top priority with secure facilities and trained staff',
    icon: Shield,
    color: 'text-blue-500',
  },
  {
    title: 'Nurturing Environment',
    description: 'We create a warm, loving atmosphere where every child feels valued',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    title: 'Quality Education',
    description: 'Age-appropriate curriculum that promotes learning through play',
    icon: BookOpen,
    color: 'text-green-500',
  },
  {
    title: 'Family Partnership',
    description: 'We work together with families to support each child\'s growth',
    icon: Users,
    color: 'text-purple-500',
  },
  {
    title: 'Individual Growth',
    description: 'Recognizing and nurturing each child\'s unique talents and needs',
    icon: Sparkles,
    color: 'text-yellow-500',
  },
  {
    title: 'Community Connection',
    description: 'Building strong relationships within our Roselle community',
    icon: TreePine,
    color: 'text-emerald-500',
  },
];

/**
 * 🏛️ Facility features
 */
const facilityFeatures = [
  'Secure entry system with video monitoring',
  'Age-appropriate playgrounds',
  'Spacious, bright classrooms',
  'Dedicated infant sleeping room',
  'Indoor gross motor play area',
  'Full commercial kitchen',
  'Library and quiet reading areas',
  'Art and creative spaces',
  'Technology learning center',
  'Parent conference room',
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Calendar className="mr-2 h-3 w-3" />
              Serving Roselle Since 2014
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Great Beginnings Day Care
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A decade of excellence in early childhood education, where every child's journey
              begins with love, learning, and laughter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="gap-2">
                  Schedule a Tour
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/programs`}>
                <Button size="lg" variant="outline">
                  View Our Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide high-quality, affordable childcare in a warm, loving environment
                  that promotes each child's social, emotional, physical, and cognitive development.
                  We strive to be partners with families in nurturing children to reach their full potential.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the premier early childhood education center in Roselle, recognized for
                  our commitment to excellence, innovative curriculum, and the positive impact
                  we make on children's lives as they begin their educational journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Great Beginnings
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <IconComponent className={`h-8 w-8 ${value.color} mb-2`} />
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A decade of milestones and achievements in childcare excellence
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

              {/* Timeline items */}
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={index} className="relative flex items-center mb-8">
                    <div className="absolute left-0 w-16 h-16 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-24">
                      <Badge variant="outline" className="mb-2">{milestone.year}</Badge>
                      <h3 className="text-lg font-semibold">{milestone.event}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Dedicated Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced educators committed to your child's growth and development
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{member.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{member.specialization}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {member.certifications.map((cert, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Facility</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A safe, modern, and welcoming environment designed for learning and growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Facility Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {facilityFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safety & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Health & Safety Protocols</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Daily health checks for all children and staff</li>
                      <li>• Enhanced cleaning and sanitization procedures</li>
                      <li>• Strict illness policies to prevent spread</li>
                      <li>• Regular safety drills and emergency preparedness</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Certifications & Compliance</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• DCFS Licensed and regularly inspected</li>
                      <li>• All staff CPR and First Aid certified</li>
                      <li>• Background checks for all employees</li>
                      <li>• Mandated reporter training completed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Families Choose Great Beginnings</h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold">10+ Years of Excellence</p>
                  <p className="text-sm text-muted-foreground">Trusted by hundreds of families</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <Users className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold">Experienced Educators</p>
                  <p className="text-sm text-muted-foreground">25+ years average experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <Heart className="h-8 w-8 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold">Nurturing Environment</p>
                  <p className="text-sm text-muted-foreground">Where every child feels loved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <Star className="h-8 w-8 text-purple-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold">5-Star Parent Reviews</p>
                  <p className="text-sm text-muted-foreground">95% parent satisfaction rate</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-lg">
              <Smile className="h-12 w-12 text-primary mx-auto mb-4" />
              <blockquote className="text-lg italic mb-4">
                "Great Beginnings has been a blessing for our family. The teachers genuinely care
                about each child's development, and we've seen incredible growth in our daughter's
                confidence and social skills."
              </blockquote>
              <p className="text-sm text-muted-foreground">- Sarah M., Parent of 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Family?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Schedule a tour today and see why Great Beginnings is the perfect place
            for your child's early education journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="secondary" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule a Tour
              </Button>
            </Link>
            <Link href="tel:+16305550123">
              <Button size="lg" variant="outline" className="gap-2 bg-background text-foreground hover:bg-background/90">
                <Phone className="h-4 w-4" />
                Call (630) 555-0123
              </Button>
            </Link>
            <Link href={`/${locale}/programs`}>
              <Button size="lg" variant="outline" className="gap-2 bg-background text-foreground hover:bg-background/90">
                <BookOpen className="h-4 w-4" />
                Explore Programs
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
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@greatbeginningsdaycare.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}