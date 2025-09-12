/**
 * Filter Tabs Component
 * 
 * Beautiful animated tabs for filtering programs by age group.
 * Uses Framer Motion 12 for smooth transitions and interactions.
 * 
 * Like colorful folder tabs that help you find exactly what you're looking for!
 */

"use client";

import { motion } from "framer-motion";
import { Baby, Users, GraduationCap, School, Backpack, Sparkles } from "lucide-react";
import type { AgeGroup } from "@/types/programs";

interface FilterTabsProps {
  selectedAgeGroup: AgeGroup | "all";
  onSelectAgeGroup: (ageGroup: AgeGroup | "all") => void;
  programCounts: Record<AgeGroup | "all", number>;
}

// Tab configuration with icons and colors
const tabs: {
  id: AgeGroup | "all";
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}[] = [
  { 
    id: "all", 
    label: "All Programs", 
    icon: Sparkles, 
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  { 
    id: "infant", 
    label: "Infants", 
    icon: Baby, 
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30"
  },
  { 
    id: "toddler", 
    label: "Toddlers", 
    icon: Users, 
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  { 
    id: "preschool", 
    label: "Preschool", 
    icon: School, 
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  { 
    id: "prek", 
    label: "Pre-K", 
    icon: GraduationCap, 
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30"
  },
  { 
    id: "schoolage", 
    label: "School Age", 
    icon: Backpack, 
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30"
  }
];

/**
 * Filter Tabs Component
 */
export function FilterTabs({ 
  selectedAgeGroup, 
  onSelectAgeGroup, 
  programCounts 
}: FilterTabsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex flex-wrap gap-2 p-1.5 bg-muted/50 rounded-xl backdrop-blur-sm">
        {tabs.map((tab) => {
          const isSelected = selectedAgeGroup === tab.id;
          const Icon = tab.icon;
          const count = programCounts[tab.id];
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onSelectAgeGroup(tab.id)}
              className={`
                relative
                flex items-center gap-2
                px-4 py-2.5
                rounded-lg
                font-medium
                text-sm
                transition-all
                ${isSelected 
                  ? `${tab.bgColor} ${tab.color} shadow-lg` 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {/* Background Animation for Selected Tab */}
              {isSelected && (
                <motion.div
                  className={`absolute inset-0 rounded-lg ${tab.bgColor}`}
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              
              {/* Tab Content */}
              <div className="relative flex items-center gap-2">
                {/* Animated Icon */}
                <motion.div
                  animate={{
                    rotate: isSelected ? [0, -10, 10, -10, 0] : 0,
                    scale: isSelected ? 1.1 : 1
                  }}
                  transition={{
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut"
                    },
                    scale: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                
                {/* Label */}
                <span className="hidden sm:inline">{tab.label}</span>
                
                {/* Count Badge */}
                <motion.span
                  className={`
                    ml-1 px-2 py-0.5 
                    text-xs font-bold 
                    rounded-full
                    ${isSelected 
                      ? "bg-white/80 text-gray-800 dark:bg-black/30 dark:text-white" 
                      : "bg-muted text-muted-foreground"
                    }
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0.1
                  }}
                >
                  {count}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}