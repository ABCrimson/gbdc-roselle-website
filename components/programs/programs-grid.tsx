/**
 * Programs Grid Component
 * 
 * A beautiful grid layout showing all our daycare programs.
 * Uses Tailwind CSS 4.0 container queries for responsive design
 * and Framer Motion 12 for smooth animations.
 * 
 * Like a colorful catalog of all the fun learning adventures
 * we offer for different age groups!
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ProgramCard } from "./program-card";
import { ProgramModal } from "./program-modal";
import { FilterTabs } from "./filter-tabs";
import type { Program, AgeGroup } from "@/types/programs";

// Our daycare programs data
const programs: Program[] = [
  {
    id: "infant",
    name: "Infant Care",
    ageGroup: "infant" as AgeGroup,
    ageRange: "6 weeks - 12 months",
    description: "Nurturing care for your littlest ones with personalized attention and developmental activities.",
    shortDescription: "Safe, loving environment for babies",
    image: "/images/programs/infant-care.jpg",
    features: [
      "Individual feeding and sleeping schedules",
      "Daily tummy time and sensory play",
      "Gentle music and story time",
      "Parent communication app with photos",
      "Dedicated infant-only space",
      "1:3 teacher-to-child ratio"
    ],
    schedule: {
      daily: [
        { time: "7:00 AM", activity: "Arrival & Free Play" },
        { time: "9:00 AM", activity: "Morning Snack" },
        { time: "9:30 AM", activity: "Sensory Activities" },
        { time: "10:30 AM", activity: "Nap Time" },
        { time: "12:00 PM", activity: "Lunch" },
        { time: "1:00 PM", activity: "Quiet Play" },
        { time: "2:00 PM", activity: "Afternoon Nap" },
        { time: "3:30 PM", activity: "Snack Time" },
        { time: "4:00 PM", activity: "Music & Movement" },
        { time: "5:00 PM", activity: "Pick-up & Free Play" }
      ]
    },
    gallery: [
      "/images/programs/infant/room.jpg",
      "/images/programs/infant/play.jpg",
      "/images/programs/infant/nap.jpg",
      "/images/programs/infant/toys.jpg"
    ],
    testimonial: {
      text: "The infant care program exceeded our expectations. Our daughter is thriving!",
      author: "Sarah Johnson",
      role: "Parent"
    },
    price: {
      weekly: 375,
      monthly: 1500,
      registration: 150
    },
    capacity: 12,
    currentEnrollment: 10,
    waitlist: true
  },
  {
    id: "toddler",
    name: "Toddler Program",
    ageGroup: "toddler" as AgeGroup,
    ageRange: "1 - 2 years",
    description: "Active learning environment where toddlers explore, discover, and develop social skills.",
    shortDescription: "Exploration and discovery for curious toddlers",
    image: "/images/programs/toddler-care.jpg",
    features: [
      "Potty training support",
      "Language development activities",
      "Art and creative expression",
      "Outdoor play twice daily",
      "Social skill building",
      "1:4 teacher-to-child ratio"
    ],
    schedule: {
      daily: [
        { time: "7:00 AM", activity: "Arrival & Centers" },
        { time: "8:30 AM", activity: "Circle Time" },
        { time: "9:00 AM", activity: "Morning Snack" },
        { time: "9:30 AM", activity: "Learning Activities" },
        { time: "10:30 AM", activity: "Outdoor Play" },
        { time: "11:30 AM", activity: "Lunch" },
        { time: "12:30 PM", activity: "Nap/Rest Time" },
        { time: "2:30 PM", activity: "Snack" },
        { time: "3:00 PM", activity: "Art & Music" },
        { time: "4:00 PM", activity: "Free Play" },
        { time: "5:00 PM", activity: "Pick-up Time" }
      ]
    },
    gallery: [
      "/images/programs/toddler/classroom.jpg",
      "/images/programs/toddler/art.jpg",
      "/images/programs/toddler/outdoor.jpg",
      "/images/programs/toddler/reading.jpg"
    ],
    testimonial: {
      text: "My son loves going to daycare! The teachers are amazing with toddlers.",
      author: "Michael Chen",
      role: "Parent"
    },
    price: {
      weekly: 350,
      monthly: 1400,
      registration: 150
    },
    capacity: 16,
    currentEnrollment: 14,
    waitlist: false
  },
  {
    id: "preschool",
    name: "Preschool",
    ageGroup: "preschool" as AgeGroup,
    ageRange: "3 - 4 years",
    description: "Comprehensive preschool curriculum preparing children for kindergarten success.",
    shortDescription: "School readiness through play-based learning",
    image: "/images/programs/preschool.jpg",
    features: [
      "Pre-K curriculum aligned with state standards",
      "STEAM activities and experiments",
      "Beginning reading and math concepts",
      "Weekly field trips and special guests",
      "School readiness assessments",
      "1:8 teacher-to-child ratio"
    ],
    schedule: {
      daily: [
        { time: "7:00 AM", activity: "Early Arrival" },
        { time: "8:30 AM", activity: "Morning Meeting" },
        { time: "9:00 AM", activity: "Literacy Block" },
        { time: "10:00 AM", activity: "Snack & Outdoor Play" },
        { time: "11:00 AM", activity: "Math & Science" },
        { time: "12:00 PM", activity: "Lunch" },
        { time: "1:00 PM", activity: "Rest/Quiet Time" },
        { time: "2:00 PM", activity: "Art & Music" },
        { time: "3:00 PM", activity: "Snack" },
        { time: "3:30 PM", activity: "Centers & Free Choice" },
        { time: "5:00 PM", activity: "Pick-up" }
      ]
    },
    gallery: [
      "/images/programs/preschool/learning.jpg",
      "/images/programs/preschool/science.jpg",
      "/images/programs/preschool/playground.jpg",
      "/images/programs/preschool/graduation.jpg"
    ],
    testimonial: {
      text: "The preschool program prepared our daughter perfectly for kindergarten!",
      author: "Emily Rodriguez",
      role: "Parent"
    },
    price: {
      weekly: 325,
      monthly: 1300,
      registration: 150
    },
    capacity: 20,
    currentEnrollment: 18,
    waitlist: false
  },
  {
    id: "prek",
    name: "Pre-K Program",
    ageGroup: "prek" as AgeGroup,
    ageRange: "4 - 5 years",
    description: "Advanced kindergarten preparation with focus on academic and social readiness.",
    shortDescription: "Advanced preparation for kindergarten",
    image: "/images/programs/prek.jpg",
    features: [
      "Kindergarten-level academics",
      "Writing and early reading skills",
      "Advanced math concepts",
      "Science experiments and projects",
      "Social-emotional learning",
      "1:10 teacher-to-child ratio"
    ],
    schedule: {
      daily: [
        { time: "7:00 AM", activity: "Arrival" },
        { time: "8:30 AM", activity: "Morning Circle" },
        { time: "9:00 AM", activity: "Reading & Writing" },
        { time: "10:00 AM", activity: "Snack & Recess" },
        { time: "10:45 AM", activity: "Mathematics" },
        { time: "11:45 AM", activity: "Lunch" },
        { time: "12:45 PM", activity: "Rest Time" },
        { time: "1:45 PM", activity: "Science/Social Studies" },
        { time: "2:45 PM", activity: "Specials (Art/Music/PE)" },
        { time: "3:30 PM", activity: "Snack" },
        { time: "4:00 PM", activity: "Homework Help & Centers" },
        { time: "5:30 PM", activity: "Pick-up" }
      ]
    },
    gallery: [
      "/images/programs/prek/classroom.jpg",
      "/images/programs/prek/reading.jpg",
      "/images/programs/prek/math.jpg",
      "/images/programs/prek/graduation.jpg"
    ],
    testimonial: {
      text: "The Pre-K program gave our son the confidence he needed for kindergarten.",
      author: "David Kim",
      role: "Parent"
    },
    price: {
      weekly: 300,
      monthly: 1200,
      registration: 150
    },
    capacity: 24,
    currentEnrollment: 22,
    waitlist: false
  },
  {
    id: "afterschool",
    name: "After School Care",
    ageGroup: "schoolage" as AgeGroup,
    ageRange: "5 - 12 years",
    description: "Safe, engaging after-school program with homework help and enrichment activities.",
    shortDescription: "Homework help and fun activities after school",
    image: "/images/programs/afterschool.jpg",
    features: [
      "School pickup service available",
      "Dedicated homework time with tutoring",
      "STEM and coding clubs",
      "Sports and physical activities",
      "Art and drama programs",
      "Healthy snacks provided"
    ],
    schedule: {
      daily: [
        { time: "2:30 PM", activity: "School Pickup" },
        { time: "3:00 PM", activity: "Arrival & Snack" },
        { time: "3:30 PM", activity: "Homework Time" },
        { time: "4:30 PM", activity: "Clubs & Activities" },
        { time: "5:30 PM", activity: "Free Play/Pick-up" },
        { time: "6:00 PM", activity: "Late Pick-up" }
      ]
    },
    gallery: [
      "/images/programs/afterschool/homework.jpg",
      "/images/programs/afterschool/sports.jpg",
      "/images/programs/afterschool/stem.jpg",
      "/images/programs/afterschool/art.jpg"
    ],
    testimonial: {
      text: "The after-school program is a lifesaver! Great homework support and activities.",
      author: "Jennifer Park",
      role: "Parent"
    },
    price: {
      weekly: 175,
      monthly: 700,
      registration: 100
    },
    capacity: 30,
    currentEnrollment: 25,
    waitlist: false
  },
  {
    id: "summer",
    name: "Summer Camp",
    ageGroup: "schoolage" as AgeGroup,
    ageRange: "5 - 12 years",
    description: "Exciting summer adventures with weekly themes, field trips, and special activities.",
    shortDescription: "Fun-filled summer adventures and learning",
    image: "/images/programs/summer-camp.jpg",
    features: [
      "Weekly themed activities",
      "Field trips twice a week",
      "Swimming and water play",
      "Arts, crafts, and drama",
      "Science experiments",
      "Special guest presenters"
    ],
    schedule: {
      daily: [
        { time: "7:00 AM", activity: "Early Drop-off" },
        { time: "8:30 AM", activity: "Morning Assembly" },
        { time: "9:00 AM", activity: "Theme Activities" },
        { time: "10:30 AM", activity: "Snack & Games" },
        { time: "11:00 AM", activity: "Special Activity/Field Trip" },
        { time: "12:30 PM", activity: "Lunch" },
        { time: "1:30 PM", activity: "Quiet Time/Reading" },
        { time: "2:30 PM", activity: "Water Play/Sports" },
        { time: "4:00 PM", activity: "Snack & Free Choice" },
        { time: "5:30 PM", activity: "Pick-up" }
      ]
    },
    gallery: [
      "/images/programs/summer/outdoor.jpg",
      "/images/programs/summer/water.jpg",
      "/images/programs/summer/fieldtrip.jpg",
      "/images/programs/summer/crafts.jpg"
    ],
    testimonial: {
      text: "Best summer camp ever! My kids beg to go back every year.",
      author: "Robert Thompson",
      role: "Parent"
    },
    price: {
      weekly: 250,
      monthly: 1000,
      registration: 200
    },
    capacity: 40,
    currentEnrollment: 35,
    waitlist: true
  }
];

/**
 * Main Programs Grid Component
 */
export function ProgramsGrid() {
  // State for filtering programs by age group
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | "all">("all");
  
  // State for the selected program modal
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Filter programs based on selected age group
  const filteredPrograms = selectedAgeGroup === "all" 
    ? programs 
    : programs.filter(p => p.ageGroup === selectedAgeGroup);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      {/* Container with padding for mobile and desktop */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Age-appropriate programs designed to nurture growth, learning, and happiness at every stage
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs 
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
          programCounts={{
            all: programs.length,
            infant: programs.filter(p => p.ageGroup === "infant").length,
            toddler: programs.filter(p => p.ageGroup === "toddler").length,
            preschool: programs.filter(p => p.ageGroup === "preschool").length,
            prek: programs.filter(p => p.ageGroup === "prek").length,
            schoolage: programs.filter(p => p.ageGroup === "schoolage").length
          }}
        />

        {/* Programs Grid with Container Queries */}
        <LayoutGroup>
          <motion.div 
            className="
              @container
              grid 
              grid-cols-1 
              @md:grid-cols-2 
              @2xl:grid-cols-3 
              gap-6 
              lg:gap-8
              mt-8
            "
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    layout: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }}
                >
                  <ProgramCard
                    program={program}
                    onClick={() => setSelectedProgram(program)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Enrollment CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Ready to Enroll?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Schedule a tour to see our facilities and meet our caring staff. 
            We'd love to show you around!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Tour
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Enrollment Forms
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Program Details Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}