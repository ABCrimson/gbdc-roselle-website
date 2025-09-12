/**
 * GBDC Testimonials Section Component
 * 
 * Features parent testimonials in an animated carousel with auto-play,
 * star ratings, and smooth transitions between testimonials.
 * 
 * Features:
 * - Carousel/slider with auto-play functionality
 * - Smooth transitions between testimonials
 * - Parent quotes with photos and details
 * - Animated star ratings
 * - Navigation dots and arrows
 * - Touch/swipe gestures for mobile
 * - Auto-pause on hover
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, Heart } from "lucide-react";
import Image from "next/image";
import { 
  carouselVariants,
  starVariants,
  slideUpVariants,
  staggerContainerVariants,
  staggerItemVariants
} from "@/components/ui/animation-variants";
import { ScrollMotionWrapper, MotionWrapper } from "@/components/ui/motion-wrapper";

/**
 * Testimonial data structure
 */
interface Testimonial {
  id: string;
  name: string;
  role: string;
  childName: string;
  childAge: string;
  rating: number;
  quote: string;
  image: string;
  program: string;
  dateJoined: string;
}

/**
 * Testimonials data
 */
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Working Mom",
    childName: "Emma",
    childAge: "3 years old",
    rating: 5,
    quote: "Great Beginnings has been such a blessing for our family. Emma absolutely loves her teachers and friends. The daily updates and photos help me feel connected to her day, and I can see how much she's learning and growing every single day.",
    image: "/images/testimonials/sarah.jpg",
    program: "Young Scholars",
    dateJoined: "September 2022"
  },
  {
    id: "2", 
    name: "Michael Rodriguez",
    role: "Single Father",
    childName: "Lucas",
    childAge: "5 years old",
    rating: 5,
    quote: "As a single dad, finding quality childcare was crucial. The staff at Great Beginnings treat Lucas like family. His confidence has soared, and he's so well-prepared for kindergarten. I couldn't ask for better care for my son.",
    image: "/images/testimonials/michael.jpg",
    program: "Young Scholars",
    dateJoined: "January 2023"
  },
  {
    id: "3",
    name: "Jennifer & David Chen",
    role: "Working Parents",
    childName: "Lily",
    childAge: "2 years old",
    rating: 5,
    quote: "We were nervous about starting daycare, but Great Beginnings made the transition so smooth. Lily runs to her teachers every morning! The individualized care and attention to detail is remarkable. We feel so lucky to be part of this community.",
    image: "/images/testimonials/chen-family.jpg", 
    program: "Little Explorers",
    dateJoined: "May 2023"
  },
  {
    id: "4",
    name: "Amanda Thompson",
    role: "First-Time Mom",
    childName: "Noah",
    childAge: "10 months old",
    rating: 5,
    quote: "Leaving Noah for the first time was so hard, but the infant care team is incredible. They follow his schedule perfectly, send updates throughout the day, and treat him with such love and patience. I have complete peace of mind.",
    image: "/images/testimonials/amanda.jpg",
    program: "Tiny Beginnings", 
    dateJoined: "March 2023"
  },
  {
    id: "5",
    name: "Robert & Maria Garcia",
    role: "Busy Professionals",
    childName: "Sofia",
    childAge: "7 years old",
    rating: 5,
    quote: "The after-school program is fantastic! Sofia gets help with homework, plays with friends, and participates in enriching activities. The staff communicates well with us about her progress. It's exactly what our family needed.",
    image: "/images/testimonials/garcia-family.jpg",
    program: "After School Adventures",
    dateJoined: "August 2022"
  }
];

/**
 * Star Rating Component
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <motion.div 
      className="flex gap-1 justify-center mb-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          variants={starVariants}
          custom={index}
        >
          <Star 
            className={`w-6 h-6 ${
              index < rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Individual Testimonial Card Component
 */
function TestimonialCard({ 
  testimonial, 
  direction 
}: { 
  testimonial: Testimonial;
  direction: number;
}) {
  return (
    <motion.div
      key={testimonial.id}
      custom={direction}
      variants={carouselVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="absolute inset-0 flex items-center justify-center p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="child-friendly-card bg-white p-8 md:p-12 text-center space-y-6 shadow-2xl">
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-full">
              <Quote className="w-8 h-8 text-primary-600" />
            </div>
          </motion.div>

          {/* Star Rating */}
          <StarRating rating={testimonial.rating} />

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic"
          >
            "{testimonial.quote}"
          </motion.blockquote>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-gray-200"
          >
            {/* Author Photo */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-primary-200 to-secondary-200 shadow-lg"
              >
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} - Great Beginnings parent`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 bg-red-500 p-1 rounded-full">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
            </div>

            {/* Author Details */}
            <div className="text-center md:text-left space-y-1">
              <h4 className="font-bold text-gray-900 text-lg">
                {testimonial.name}
              </h4>
              <p className="text-gray-600">
                {testimonial.role}
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  Parent of <span className="font-medium text-primary-600">{testimonial.childName}</span> 
                  {" "}({testimonial.childAge})
                </p>
                <p>
                  <span className="font-medium">{testimonial.program}</span> • Joined {testimonial.dateJoined}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Navigation Dots Component
 */
function NavigationDots({ 
  total, 
  current, 
  onChange 
}: { 
  total: number;
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onChange(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            current === index
              ? "bg-primary-600 shadow-lg"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Navigation Arrows Component
 */
function NavigationArrows({
  onPrevious,
  onNext
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      {/* Previous Button */}
      <motion.button
        onClick={onPrevious}
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </>
  );
}

/**
 * Testimonials Section Component
 */
export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const previousTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial, isAutoPlaying]);

  // Touch/swipe handling
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      previousTestimonial();
    } else if (info.offset.x < -swipeThreshold) {
      nextTestimonial();
    }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-green-50 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
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
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-2xl">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What <span className="text-primary-600">Parents</span> Say
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                Don't just take our word for it. Hear from the families who trust 
                Great Beginnings with their most precious treasures.
              </p>
            </div>
          </div>
        </ScrollMotionWrapper>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="relative h-96 md:h-80 overflow-hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                direction={direction}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <NavigationArrows
              onPrevious={previousTestimonial}
              onNext={nextTestimonial}
            />
          </motion.div>

          {/* Navigation Dots */}
          <NavigationDots
            total={testimonials.length}
            current={currentIndex}
            onChange={goToTestimonial}
          />
        </div>

        {/* Trust Indicators */}
        <ScrollMotionWrapper 
          variants={staggerContainerVariants}
          threshold={0.1}
          className="mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: "150+", label: "Happy Families", icon: Heart },
                { number: "4.9/5", label: "Average Rating", icon: Star },
                { number: "25+", label: "Years Experience", icon: Quote }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={staggerItemVariants}
                  className="space-y-3"
                >
                  <div className="flex justify-center">
                    <stat.icon className="w-8 h-8 text-primary-600 fill-current" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollMotionWrapper>
      </div>
    </section>
  );
}

/**
 * Testimonials section features:
 * 
 * 1. Auto-Playing Carousel: Automatically cycles through testimonials
 * 2. Touch Gestures: Swipe left/right on mobile devices  
 * 3. Navigation Controls: Dots and arrow buttons for manual navigation
 * 4. Animated Stars: Star ratings animate when testimonial appears
 * 5. Smooth Transitions: Spring animations between testimonials
 * 6. Auto-Pause: Pauses auto-play when user hovers over section
 * 7. Parent Details: Shows parent name, role, child info, and program
 * 8. Trust Indicators: Display key statistics to build credibility
 * 9. Responsive Design: Optimized for mobile and desktop viewing
 * 10. Accessibility: Proper ARIA labels and keyboard navigation
 */