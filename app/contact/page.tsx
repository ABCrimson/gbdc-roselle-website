/**
 * Contact Page
 * 
 * Beautiful contact page with form, location info, and hours.
 * Server Component that loads the client-side form.
 * 
 * Like the front office where parents can reach out!
 */

import { Metadata } from "next";
import { ContactForm } from "@/components/contact";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car,
  MessageCircle,
  Heart,
  Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Great Beginnings Day Care",
  description: "Get in touch with Great Beginnings Day Care in Roselle, IL. Schedule a tour, ask questions, or learn more about our programs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100">
              We'd love to hear from you! Whether you have questions about our programs, 
              want to schedule a tour, or need more information, we're here to help.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Contact
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:6308943440"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">(630) 894-3440</p>
                    <p className="text-sm text-gray-600">Call us directly</p>
                  </div>
                </a>
                
                {/* Email */}
                <a
                  href="mailto:info@greatbeginningsdaycare.com"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">info@greatbeginningsdaycare.com</p>
                    <p className="text-sm text-gray-600">Email us anytime</p>
                  </div>
                </a>
                
                {/* Address */}
                <div className="flex items-start gap-3 p-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">757 E Nerge Rd</p>
                    <p className="text-sm text-gray-600">Roselle, IL 60172</p>
                    <a
                      href="https://maps.google.com/?q=757+E+Nerge+Rd+Roselle+IL+60172"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hours of Operation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Hours of Operation
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">6:30 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Holiday Closures:</strong> We observe major holidays. 
                  Please contact us for our holiday schedule.
                </p>
              </div>
            </div>
            
            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Common Inquiries
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Schedule a tour</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Ask about enrollment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Learn about our programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Transportation options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>
              <p className="text-gray-600 mt-1">
                Conveniently located in Roselle with easy access and ample parking
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-96 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Interactive map will be displayed here</p>
                  <a
                    href="https://maps.google.com/?q=757+E+Nerge+Rd+Roselle+IL+60172"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
            
            {/* Directions */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">From Schaumburg</h4>
                  <p className="text-gray-600">
                    Take Roselle Rd south for 3 miles. Turn left on Nerge Rd. 
                    We're on the right after 0.5 miles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">From Bloomingdale</h4>
                  <p className="text-gray-600">
                    Head north on Bloomingdale Rd. Turn right on Lake St, 
                    then left on Roselle Rd. Turn right on Nerge Rd.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Parking</h4>
                  <p className="text-gray-600">
                    Free parking available on-site. Designated drop-off zone 
                    at the main entrance for quick morning drop-offs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}