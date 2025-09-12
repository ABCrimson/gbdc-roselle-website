/**
 * Program Modal Component
 * 
 * Full-screen modal showing detailed program information with image gallery.
 * Uses Framer Motion 12 for beautiful entrance/exit animations.
 * 
 * Like opening a magical book that shows you everything about each program!
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from "lucide-react";
import type { Program } from "@/types/programs";

interface ProgramModalProps {
  program: Program;
  onClose: () => void;
}

/**
 * Program Details Modal
 */
export function ProgramModal({ program, onClose }: ProgramModalProps) {
  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Navigate gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % program.gallery.length
    );
  };
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? program.gallery.length - 1 : prev - 1
    );
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section with Gallery */}
          <div className="relative h-64 md:h-96">
            {/* Image Gallery */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={program.gallery[currentImageIndex]}
                  alt={`${program.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1536px) 100vw"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Gallery Navigation */}
            {program.gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                  onClick={previousImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {program.gallery.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? "w-8 bg-white" 
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Program Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {program.name}
              </motion.h2>
              <motion.p 
                className="text-lg text-white/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {program.ageRange}
              </motion.p>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-3">About This Program</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
              
              {/* Features */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">Program Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {program.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Daily Schedule */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4">Daily Schedule</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  {program.schedule.daily.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 py-2 border-b last:border-0"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.03 }}
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium w-20">
                        {item.time}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.activity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Testimonial */}
              {program.testimonial && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-primary/5 rounded-lg p-6"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic mb-3">
                    "{program.testimonial.text}"
                  </blockquote>
                  <div className="text-sm">
                    <span className="font-semibold">{program.testimonial.author}</span>
                    <span className="text-muted-foreground"> • {program.testimonial.role}</span>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Sidebar - 1 column on desktop */}
            <div className="space-y-6">
              {/* Enrollment Info */}
              <motion.div
                className="bg-muted/30 rounded-lg p-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4">Enrollment Information</h3>
                
                {/* Capacity */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Enrollment Status</span>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute left-0 top-0 h-full ${
                        program.waitlist ? "bg-orange-500" : "bg-green-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(program.currentEnrollment / program.capacity) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {program.currentEnrollment} / {program.capacity} enrolled
                    </span>
                    {program.waitlist && (
                      <span className="text-xs text-orange-500 font-semibold">
                        Waitlist Only
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weekly</span>
                    <span className="font-semibold">${program.price.weekly}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly</span>
                    <span className="font-semibold">${program.price.monthly}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Registration</span>
                    <span className="font-semibold">${program.price.registration}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  {program.waitlist ? "Join Waitlist" : "Enroll Now"}
                </button>
                <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Schedule a Tour
                </button>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                className="space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="text-sm font-semibold text-muted-foreground">Questions?</h4>
                <a 
                  href="tel:+16305550123" 
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (630) 555-0123
                </a>
                <a 
                  href="mailto:info@greatbeginningsdaycare.com" 
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@greatbeginningsdaycare.com
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}