/**
 * GBDC Programs Section Component
 * 
 * Showcases different age-based programs with filtering, animations, and image galleries.
 * Features age group cards with layout animations, hover effects, and filtering capabilities.
 * 
 * Features:
 * - Age group cards with images and descriptions
 * - Layout animations when filtering programs
 * - Hover effects with scale transforms
 * - Image galleries with smooth transitions
 * - Filter tabs with active states
 * - Mobile-responsive design
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Baby, 
  Heart, 
  BookOpen, 
  Gamepad2, 
  Users, 
  Clock, 
  ArrowRight,
  Calendar,
  Star
} from "lucide-react";
import Image from "next/image";
import { 
  staggerContainerVariants,
  staggerItemVariants,
  cardHoverVariants,
  slideUpVariants,
  scaleVariants
} from "@/components/ui/animation-variants";
import { ScrollMotionWrapper, MotionWrapper } from "@/components/ui/motion-wrapper";

/**
 * Program data structure
 */
interface Program {
  id: string;
  title: string;
  ageRange: string;
  category: "all" | "infant" | "toddler" | "preschool" | "schoolage";
  description: string;
  keyFeatures: string[];
  schedule: string;
  capacity: string;
  image: string;
  color: string;
  bgColor: string;
  icon: React.ComponentType<any>;
}

/**
 * Programs data
 */
const programs: Program[] = [
  {
    id: "infants",
    title: "Tiny Beginnings",
    ageRange: "6 Weeks - 18 Months",
    category: "infant",
    description: "Nurturing care for our youngest learners with individualized attention, feeding, and sleep schedules in a calm, loving environment.",
    keyFeatures: [
      "Individual feeding & sleeping schedules",
      "Sensory play activities", 
      "Language development through songs",
      "Daily reports for parents"
    ],
    schedule: "6:30 AM - 6:30 PM",
    capacity: "8 children",
    image: "/images/programs/infants.jpg",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    icon: Baby
  },
  {
    id: "toddlers",
    title: "Little Explorers",
    ageRange: "18 Months - 3 Years",
    category: "toddler", 
    description: "Active learning through exploration, play, and social interaction while developing independence and communication skills.",
    keyFeatures: [
      "Potty training support",
      "Social skills development",
      "Creative arts & crafts",
      "Outdoor play & nature walks"
    ],
    schedule: "6:30 AM - 6:30 PM",
    capacity: "12 children",
    image: "/images/programs/toddlers.jpg",
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
    icon: Heart
  },
  {
    id: "preschool",
    title: "Young Scholars",
    ageRange: "3 - 5 Years",
    category: "preschool",
    description: "Pre-academic skills, school readiness, and creative expression through structured learning and play-based activities.",
    keyFeatures: [
      "Pre-K curriculum",
      "Letter & number recognition",
      "Science experiments",
      "Dramatic play & storytelling"
    ],
    schedule: "6:30 AM - 6:30 PM",
    capacity: "16 children",
    image: "/images/programs/preschool.jpg",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    icon: BookOpen
  },
  {
    id: "schoolage",
    title: "After School Adventures",
    ageRange: "5 - 12 Years",
    category: "schoolage",
    description: "Before and after school care with homework assistance, recreational activities, and summer camp programs.",
    keyFeatures: [
      "Homework help & tutoring",
      "STEAM activities",
      "Sports & games",
      "Summer camp programs"
    ],
    schedule: "6:30 AM - 9:00 AM, 3:00 PM - 6:30 PM",
    capacity: "20 children",
    image: "/images/programs/schoolage.jpg", 
    color: "text-accent-green-600",
    bgColor: "bg-accent-green-50",
    icon: Gamepad2
  }
];

/**
 * Filter categories
 */
const filterCategories = [
  { id: "all", label: "All Programs", icon: Users },
  { id: "infant", label: "Infants", icon: Baby },
  { id: "toddler", label: "Toddlers", icon: Heart },
  { id: "preschool", label: "Preschool", icon: BookOpen },
  { id: "schoolage", label: "School Age", icon: Gamepad2 }
];

/**
 * Individual Program Card Component
 */
function ProgramCard({ program }: { program: Program }) {
  const Icon = program.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      variants={cardHoverVariants}
      whileHover="hover"
      className="group cursor-pointer"
    >
      <div className={`child-friendly-card overflow-hidden ${program.bgColor} border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}>
        {/* Program Image */}
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={program.image}
              alt={`${program.title} program at Great Beginnings Day Care`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Overlay with Icon */}
          <div className="absolute top-4 right-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-12 h-12 ${program.bgColor} rounded-xl flex items-center justify-center shadow-lg border-2 border-white`}
            >
              <Icon className={`w-6 h-6 ${program.color}`} />
            </motion.div>
          </div>
        </div>

        {/* Program Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800">
                {program.title}
              </h3>
              <span className={`text-sm font-medium ${program.color} bg-white px-2 py-1 rounded-full`}>
                {program.ageRange}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {program.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
            <ul className="space-y-1">
              {program.keyFeatures.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Star className={`w-3 h-3 ${program.color} fill-current`} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Program Details */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {program.schedule}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                Max {program.capacity}
              </div>
            </div>
            
            <motion.button
              whileHover={{ x: 5 }}
              className={`flex items-center gap-2 ${program.color} font-medium text-sm hover:underline`}
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Filter Tab Component
 */
function FilterTab({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: typeof filterCategories[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = category.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive 
          ? "bg-primary-600 text-white shadow-lg" 
          : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden sm:inline">{category.label}</span>
      <span className="sm:hidden">{category.label.split(' ')[0]}</span>
    </motion.button>
  );
}

/**
 * Programs Section Component
 */
export function Programs() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPrograms = programs.filter(
    program => activeFilter === "all" || program.category === activeFilter
  );

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollMotionWrapper variants={slideUpVariants} threshold={0.2}>
          <div className="text-center mb-16 space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our <span className="text-primary-600">Programs</span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                Age-appropriate programs designed to nurture growth, learning, and development 
                at every stage of your child's journey.
              </p>
            </div>
          </div>
        </ScrollMotionWrapper>

        {/* Filter Tabs */}
        <ScrollMotionWrapper variants={staggerContainerVariants} threshold={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterCategories.map((category) => (
              <motion.div key={category.id} variants={staggerItemVariants}>
                <FilterTab
                  category={category}
                  isActive={activeFilter === category.id}
                  onClick={() => setActiveFilter(category.id)}
                />
              </motion.div>
            ))}
          </div>
        </ScrollMotionWrapper>

        {/* Programs Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional Information */}
        <ScrollMotionWrapper 
          variants={slideUpVariants} 
          threshold={0.1}
          className="mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Heart className="w-12 h-12 text-red-500 fill-current mx-auto" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to Enroll Your Child?
              </h3>
              
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're accepting enrollment for all age groups. Contact us today to schedule 
                a tour and learn more about our programs and availability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="/enrollment"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="child-friendly-button bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Start Enrollment
                </motion.a>
                
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="child-friendly-button bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-2xl font-semibold border-2 border-primary-200 flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Tour
                </motion.a>
              </div>
            </div>
          </div>
        </ScrollMotionWrapper>
      </div>
    </section>
  );
}

/**
 * Programs section features:
 * 
 * 1. Filtering System: Interactive tabs to filter programs by age group
 * 2. Layout Animations: Smooth transitions when filtering programs
 * 3. Card Hover Effects: Scale and elevation changes on interaction
 * 4. Image Galleries: Program images with zoom effects
 * 5. Responsive Grid: Adapts layout based on screen size
 * 6. Detailed Information: Age ranges, schedules, capacity, and features
 * 7. Call-to-Action: Enrollment and tour scheduling options
 * 8. Visual Hierarchy: Clear organization of program information
 * 9. Interactive Elements: Hover states and smooth transitions
 * 10. Accessibility: Proper labeling and keyboard navigation
 */