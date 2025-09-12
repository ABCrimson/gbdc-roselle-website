/**
 * Program Card Component
 * 
 * Individual card for each daycare program with beautiful hover effects.
 * Uses Framer Motion 12's latest animation features for smooth interactions.
 * 
 * Like a colorful brochure page that comes to life when you touch it!
 */

"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  Users, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  Sparkles,
  Heart,
  BookOpen,
  Palette
} from "lucide-react";
import type { Program } from "@/types/programs";

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
}

// Icons for different age groups
const ageGroupIcons = {
  infant: Heart,
  toddler: Sparkles,
  preschool: BookOpen,
  prek: Palette,
  schoolage: Users
};

/**
 * Individual Program Card
 */
export function ProgramCard({ program, onClick }: ProgramCardProps) {
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform motion values to rotation
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Spring animation for smooth movement
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  
  // Get the icon for this age group
  const Icon = ageGroupIcons[program.ageGroup] || Users;
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  // Check if program has waitlist
  const isWaitlistOnly = program.waitlist && 
    program.currentEnrollment >= program.capacity;
  
  return (
    <motion.div
      className="relative h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="
          relative
          h-full
          bg-card
          rounded-xl
          shadow-lg
          overflow-hidden
          cursor-pointer
          group
          transform-gpu
          preserve-3d
          @container
        "
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY
        }}
        onClick={onClick}
      >
        {/* Image Section with Overlay */}
        <div className="relative h-48 @sm:h-56 overflow-hidden">
          {/* Placeholder image - replace with actual image component */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20">
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Age Badge */}
          <motion.div 
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs font-semibold text-primary">
              {program.ageRange}
            </span>
          </motion.div>
          
          {/* Waitlist Badge */}
          {isWaitlistOnly && (
            <motion.div 
              className="absolute top-4 right-4 bg-orange-500/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-semibold text-white">
                Waitlist Only
              </span>
            </motion.div>
          )}
          
          {/* Icon Overlay - appears on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-full p-4"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 @sm:p-8">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-xl @sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {program.name}
            </h3>
            <p className="text-muted-foreground text-sm @sm:text-base line-clamp-2">
              {program.shortDescription}
            </p>
          </div>
          
          {/* Features Preview - shows first 3 */}
          <div className="space-y-2 mb-4">
            {program.features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span className="text-xs @sm:text-sm text-muted-foreground line-clamp-1">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Capacity */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs @sm:text-sm text-muted-foreground">
                {program.currentEnrollment}/{program.capacity} enrolled
              </span>
            </div>
            
            {/* Schedule */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs @sm:text-sm text-muted-foreground">
                Full Day
              </span>
            </div>
          </div>
          
          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-baseline gap-1">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-lg @sm:text-xl font-bold text-foreground">
                {program.price.weekly}
              </span>
              <span className="text-xs @sm:text-sm text-muted-foreground">
                /week
              </span>
            </div>
            
            {/* Learn More Button */}
            <motion.button
              className="
                flex items-center gap-1 
                text-primary font-semibold 
                text-sm @sm:text-base
                group/btn
              "
              whileHover={{ x: 5 }}
              whileTap={{ x: 0 }}
            >
              Learn More
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
        
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)",
            backgroundSize: "200% 200%"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
}