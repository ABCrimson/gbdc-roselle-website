/**
 * GBDC Hero Section Component
 * 
 * The main hero section for the Great Beginnings Day Care homepage.
 * Features animated headline, CTA buttons, parallax background, and scroll indicator.
 * 
 * Features:
 * - Animated headline with typewriter effect
 * - CTA buttons with hover animations
 * - Parallax background image/video effect
 * - Smooth scroll indicator animation
 * - Responsive design with mobile optimization
 * - Child-friendly visual elements
 */

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, ArrowRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { 
  heroTextVariants,
  staggerContainerVariants,
  staggerItemVariants,
  buttonVariants,
  floatingVariants
} from "@/components/ui/animation-variants";
import { MotionWrapper, ScrollMotionWrapper } from "@/components/ui/motion-wrapper";

/**
 * Hero Section Component
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-green-50">
          <Image
            src="/images/hero-bg.jpg"
            alt="Happy children playing at Great Beginnings Day Care"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvtuxU9P9XFFADC9AjmoX"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-secondary-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-accent-green-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-accent-orange-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ y: textY }}
      >
        <MotionWrapper
          variants={staggerContainerVariants}
          className="space-y-8"
        >
          {/* Floating Hearts Decoration */}
          <motion.div 
            variants={floatingVariants}
            animate="floating"
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
          >
            <Heart className="w-8 h-8 text-accent-orange-500 fill-current" />
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={staggerItemVariants} className="space-y-4">
            <motion.h1 
              variants={heroTextVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              <span className="block text-primary-600">Great</span>
              <span className="block text-secondary-600">Beginnings</span>
              <span className="block text-accent-green-600 text-4xl md:text-5xl lg:text-6xl">
                Day Care
              </span>
            </motion.h1>

            {/* Decorative Stars */}
            <motion.div 
              variants={staggerItemVariants}
              className="flex justify-center gap-2"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                >
                  <Star className="w-6 h-6 text-secondary-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={staggerItemVariants} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Where every child's journey begins with 
              <span className="text-primary-600 font-semibold"> love</span>,
              <span className="text-secondary-600 font-semibold"> learning</span>, and
              <span className="text-accent-green-600 font-semibold"> laughter</span>.
              <br />
              <span className="text-lg text-gray-600 mt-2 block">
                Serving families in Roselle, IL since 1995
              </span>
            </p>
          </motion.div>

          {/* Key Features Highlights */}
          <motion.div 
            variants={staggerItemVariants}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
          >
            {[
              "Licensed & Insured",
              "Age Groups: 6 Weeks - 12 Years",
              "Educational Programs",
              "Nutritious Meals"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-primary-200 shadow-sm"
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={staggerItemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/enrollment"
                className="child-friendly-button bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center gap-2 group"
              >
                Enroll Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/virtual-tour"
                className="child-friendly-button bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center gap-2 border-2 border-primary-200 group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Virtual Tour
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div 
            variants={staggerItemVariants}
            className="text-gray-600 text-lg"
          >
            <p>
              📞 <Link href="tel:+16305295555" className="hover:text-primary-600 transition-colors font-medium">(630) 529-5555</Link>
              {" | "}
              📍 <span className="font-medium">123 Daycare Lane, Roselle, IL</span>
            </p>
          </motion.div>
        </MotionWrapper>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer hover:text-primary-600 transition-colors"
          onClick={() => {
            const featuresSection = document.getElementById('features');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2 font-medium">Discover More</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
      </div>
    </section>
  );
}

/**
 * Hero section features:
 * 
 * 1. Animated Headlines: Staggered text animation with custom easing
 * 2. Parallax Background: Smooth scrolling effect on background elements
 * 3. Interactive CTAs: Hover and tap animations for buttons
 * 4. Scroll Indicator: Animated chevron that encourages scrolling
 * 5. Decorative Elements: Floating hearts, stars, and background shapes
 * 6. Responsive Design: Optimized for all screen sizes
 * 7. Accessibility: Proper heading hierarchy and focus states
 * 8. Performance: Optimized images and animations
 * 9. Child-Friendly: Playful colors and rounded shapes
 * 10. Professional: Maintains daycare business credibility
 */