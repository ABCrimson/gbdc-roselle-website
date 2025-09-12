/**
 * Program Types
 * 
 * TypeScript type definitions for daycare programs.
 * Ensures type safety across all program-related components.
 * 
 * Like a rulebook that makes sure everyone uses the same words
 * when talking about our programs!
 */

/**
 * Age groups for different programs
 */
export type AgeGroup = "infant" | "toddler" | "preschool" | "prek" | "schoolage";

/**
 * Schedule item for daily activities
 */
export interface ScheduleItem {
  time: string;
  activity: string;
}

/**
 * Program schedule structure
 */
export interface ProgramSchedule {
  daily: ScheduleItem[];
  weekly?: {
    monday?: ScheduleItem[];
    tuesday?: ScheduleItem[];
    wednesday?: ScheduleItem[];
    thursday?: ScheduleItem[];
    friday?: ScheduleItem[];
  };
}

/**
 * Testimonial from parents
 */
export interface Testimonial {
  text: string;
  author: string;
  role: string;
  rating?: number;
}

/**
 * Pricing structure for programs
 */
export interface ProgramPricing {
  weekly: number;
  monthly: number;
  registration: number;
  materials?: number;
  meals?: number;
}

/**
 * Main Program interface
 */
export interface Program {
  // Basic Information
  id: string;
  name: string;
  ageGroup: AgeGroup;
  ageRange: string;
  
  // Descriptions
  description: string;
  shortDescription: string;
  
  // Visual Assets
  image: string;
  gallery: string[];
  
  // Program Details
  features: string[];
  schedule: ProgramSchedule;
  
  // Enrollment Information
  capacity: number;
  currentEnrollment: number;
  waitlist: boolean;
  
  // Pricing
  price: ProgramPricing;
  
  // Social Proof
  testimonial?: Testimonial;
  
  // Additional Information
  teacherRatio?: string;
  certifications?: string[];
  specialPrograms?: string[];
}

/**
 * Enrollment status for display
 */
export interface EnrollmentStatus {
  available: boolean;
  spotsLeft: number;
  waitlistLength?: number;
  nextOpeningEstimate?: Date;
}

/**
 * Filter options for programs
 */
export interface ProgramFilters {
  ageGroup?: AgeGroup;
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: "available" | "waitlist" | "all";
  schedule?: "full-day" | "half-day" | "after-school";
}