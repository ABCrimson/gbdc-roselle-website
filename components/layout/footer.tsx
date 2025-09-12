/**
 * Footer Component for GBDC Website
 * 
 * This Server Component provides comprehensive footer information for
 * the daycare website. It includes contact details, quick navigation,
 * social media links, and legal information.
 * 
 * Features:
 * - Professional daycare-focused design
 * - Contact information and hours
 * - Quick navigation links
 * - Social media integration
 * - Accessibility compliant
 * - Blue and yellow color scheme
 * - Mobile responsive layout
 */

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

/**
 * Quick navigation links for the footer
 */
const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Our Programs" },
  { href: "/enrollment", label: "Enrollment" },
  { href: "/staff", label: "Our Staff" },
  { href: "/policies", label: "Policies" },
  { href: "/calendar", label: "Calendar" },
] as const

/**
 * Parent resources and information links
 */
const parentResources = [
  { href: "/parent-portal", label: "Parent Portal" },
  { href: "/forms", label: "Forms & Documents" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/photos", label: "Photo Gallery" },
  { href: "/testimonials", label: "Testimonials" },
] as const

/**
 * Social media links
 */
const socialLinks = [
  {
    href: "https://facebook.com/greatbeginningsdaycare",
    label: "Follow us on Facebook",
    icon: Facebook,
  },
  {
    href: "https://instagram.com/greatbeginningsdaycare",
    label: "Follow us on Instagram", 
    icon: Instagram,
  },
  {
    href: "https://twitter.com/gbdaycare",
    label: "Follow us on Twitter",
    icon: Twitter,
  },
] as const

/**
 * Footer Component
 * 
 * @returns Server-rendered footer with comprehensive daycare information
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Information */}
          <div className="space-y-4">
            {/* Logo and Name */}
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                GB
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary leading-tight">
                  Great Beginnings
                </span>
                <span className="text-sm text-muted-foreground leading-tight">
                  Day Care • Roselle, IL
                </span>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nurturing young minds with love, care, and quality education. 
              Creating a safe and engaging environment where children can grow, 
              learn, and develop their full potential.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <address className="not-italic text-muted-foreground">
                  123 Child Development Lane<br />
                  Roselle, IL 60172
                </address>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="tel:+16305550123" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Call Great Beginnings Day Care"
                >
                  (630) 555-0123
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@greatbeginningsdaycare.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email Great Beginnings Day Care"
                >
                  info@greatbeginningsdaycare.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2" role="navigation" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Parent Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Parent Resources</h3>
            <nav className="space-y-2" role="navigation" aria-label="Parent resources">
              {parentResources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label={`Access ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hours and Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Hours & Connect</h3>
            
            {/* Operating Hours */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <div className="font-medium text-foreground">Operating Hours</div>
                  <div>Monday - Friday: 6:30 AM - 6:30 PM</div>
                  <div>Saturday: 8:00 AM - 12:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Great Beginnings Day Care. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-muted-foreground hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-muted-foreground hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Terms of Service
            </Link>
            <Link 
              href="/accessibility" 
              className="text-muted-foreground hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * Component Features:
 * 
 * 1. Server Component: Optimized rendering performance
 * 2. Comprehensive Information: Contact, hours, social media
 * 3. Responsive Grid: Adapts to different screen sizes
 * 4. Accessibility: ARIA labels, semantic HTML, keyboard navigation
 * 5. Professional Design: Matches daycare branding
 * 6. Contact Integration: Clickable phone and email links
 * 7. Social Media: External links with proper attributes
 * 8. Legal Compliance: Privacy policy and terms links
 */