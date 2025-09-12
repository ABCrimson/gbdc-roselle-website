/**
 * GBDC Features Section Component
 * 
 * Showcases the key features and benefits of Great Beginnings Day Care
 * with scroll-triggered animations, icon hover effects, and responsive grid layout.
 * 
 * Features:
 * - Grid of daycare features with icons
 * - Scroll-triggered animations (fade in, slide up)
 * - Icon animations on hover
 * - Staggered children animations
 * - Mobile-responsive design
 * - Child-friendly visual elements
 */

"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  GraduationCap, 
  Shield, 
  Users, 
  Clock, 
  Utensils, 
  BookOpen, 
  Car,
  Camera,
  Music,
  Palette,
  Baby
} from "lucide-react";
import { 
  staggerContainerVariants,
  staggerItemVariants,
  cardHoverVariants,
  iconVariants,
  slideUpVariants
} from "@/components/ui/animation-variants";
import { ScrollMotionWrapper, MotionWrapper } from "@/components/ui/motion-wrapper";

/**
 * Feature data with icons, titles, descriptions, and colors
 */
const features = [
  {
    icon: Heart,
    title: "Loving Care",
    description: "Our experienced caregivers provide nurturing, individualized attention to help each child feel safe, loved, and valued in our family-like environment.",
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    icon: GraduationCap,
    title: "Educational Excellence",
    description: "Age-appropriate curriculum designed to foster cognitive development, creativity, and school readiness through play-based learning activities.",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Licensed facility with comprehensive safety protocols, secure entry systems, and background-checked staff to ensure your child's protection.",
    color: "text-accent-green-600",
    bgColor: "bg-accent-green-50",
    borderColor: "border-accent-green-200"
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description: "Low child-to-caregiver ratios ensure personalized attention and meaningful relationships between staff, children, and families.",
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
    borderColor: "border-secondary-200"
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Extended hours from 6:30 AM to 6:30 PM to accommodate working parents' schedules with convenient drop-off and pick-up times.",
    color: "text-accent-purple-600",
    bgColor: "bg-accent-purple-50",
    borderColor: "border-accent-purple-200"
  },
  {
    icon: Utensils,
    title: "Healthy Meals",
    description: "Nutritious, home-cooked meals and snacks prepared fresh daily, accommodating dietary restrictions and promoting healthy eating habits.",
    color: "text-accent-orange-600",
    bgColor: "bg-accent-orange-50",
    borderColor: "border-accent-orange-200"
  },
  {
    icon: BookOpen,
    title: "Reading Program",
    description: "Daily reading activities, storytelling sessions, and literacy-rich environment to develop language skills and love for books.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    icon: Car,
    title: "Transportation",
    description: "Safe and reliable transportation services to and from local schools for school-age children with certified drivers.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: Camera,
    title: "Daily Updates",
    description: "Regular photos, progress reports, and communication through our parent app to keep you connected with your child's day.",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  {
    icon: Music,
    title: "Music & Arts",
    description: "Creative expression through music, art, and movement activities that enhance imagination and fine motor skills development.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: Palette,
    title: "STEAM Learning",
    description: "Science, Technology, Engineering, Arts, and Math activities integrated into daily play to spark curiosity and critical thinking.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200"
  },
  {
    icon: Baby,
    title: "Infant Care",
    description: "Specialized care for infants 6 weeks and older with individualized feeding, sleeping, and play schedules in a calm environment.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
  }
];

/**
 * Individual Feature Card Component
 */
function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <ScrollMotionWrapper
      variants={staggerItemVariants}
      threshold={0.1}
      className="group"
    >
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className={`child-friendly-card p-6 h-full ${feature.bgColor} ${feature.borderColor} border-2 cursor-pointer transition-colors duration-300`}
      >
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          initial="rest"
          whileHover="hover"
          className={`w-16 h-16 mx-auto mb-4 rounded-xl ${feature.bgColor} border-2 ${feature.borderColor} flex items-center justify-center group-hover:shadow-lg transition-shadow`}
        >
          <Icon className={`w-8 h-8 ${feature.color}`} />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-3 text-center group-hover:text-gray-800"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {feature.description}
        </motion.p>

        {/* Decorative Element */}
        <motion.div
          className={`w-12 h-1 ${feature.color} rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: 'currentColor' }}
        />
      </motion.div>
    </ScrollMotionWrapper>
  );
}

/**
 * Features Section Component
 */
export function Features() {
  return (
    <section id="features" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollMotionWrapper variants={slideUpVariants} threshold={0.2}>
          <div className="text-center mb-16 space-y-4">
            {/* Decorative Elements */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center gap-2 mb-4"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === 1 ? 'bg-primary-500' : 'bg-secondary-400'
                  }`}
                />
              ))}
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose 
              <span className="text-primary-600"> Great Beginnings</span>?
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                We provide exceptional childcare services with a focus on each child's 
                individual needs, growth, and happiness. Here's what makes us special:
              </p>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent-green-500" />
                Licensed by Illinois DCFS
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary-500" />
                Accredited Programs
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                25+ Years Experience
              </span>
            </motion.div>
          </div>
        </ScrollMotionWrapper>

        {/* Features Grid */}
        <MotionWrapper
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </MotionWrapper>

        {/* Call-to-Action Footer */}
        <ScrollMotionWrapper 
          variants={slideUpVariants} 
          threshold={0.1}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to give your child the great beginning they deserve?
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="child-friendly-button bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg inline-flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                Schedule a Visit
              </a>
            </motion.div>
          </div>
        </ScrollMotionWrapper>
      </div>
    </section>
  );
}

/**
 * Features section highlights:
 * 
 * 1. Responsive Grid: Adapts from 1 column on mobile to 4 columns on desktop
 * 2. Scroll Animations: Each card animates as it enters the viewport
 * 3. Icon Interactions: Icons scale and rotate on hover
 * 4. Card Hover Effects: Smooth elevation and color changes
 * 5. Staggered Animation: Cards appear in sequence for visual appeal
 * 6. Color-Coded Features: Each feature has its own color theme
 * 7. Trust Indicators: Displays credentials and experience
 * 8. Call-to-Action: Encourages next steps at the end
 * 9. Accessibility: Proper heading hierarchy and contrast
 * 10. Performance: Optimized animations and lazy loading
 */