/**
 * GBDC Stats Section Component
 * 
 * Displays key statistics about Great Beginnings Day Care with animated counters,
 * scroll-triggered number animations, and visual progress bars.
 * 
 * Features:
 * - Animated counters that count up when visible
 * - Scroll-triggered number animations
 * - Visual progress bars with smooth animations
 * - Key achievements and milestones
 * - Mobile-responsive design
 * - Child-friendly visual elements
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Award, 
  Heart, 
  GraduationCap, 
  Star,
  Clock,
  Smile
} from "lucide-react";
import { 
  counterVariants,
  progressBarVariants,
  staggerContainerVariants,
  staggerItemVariants,
  slideUpVariants
} from "@/components/ui/animation-variants";
import { ScrollMotionWrapper, MotionWrapper } from "@/components/ui/motion-wrapper";

/**
 * Counter animation hook
 */
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 100
  });

  useEffect(() => {
    springValue.on("change", (latest) => {
      setCount(Math.round(latest));
    });

    return () => springValue.clearListeners();
  }, [springValue]);

  const startCounter = () => {
    motionValue.set(end);
  };

  return { count, startCounter };
}

/**
 * Stat data structure
 */
interface Stat {
  id: string;
  title: string;
  value: number;
  suffix: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  progressColor: string;
  maxValue?: number; // For progress bar calculation
}

/**
 * Stats data
 */
const stats: Stat[] = [
  {
    id: "families",
    title: "Happy Families",
    value: 150,
    suffix: "+",
    description: "Families trust us with their children's care and education",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    progressColor: "bg-red-500",
    maxValue: 200
  },
  {
    id: "experience",
    title: "Years of Excellence",
    value: 10,
    suffix: "+",
    description: "Years serving the Roselle community since we acquired the center",
    icon: Calendar,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    progressColor: "bg-primary-600",
    maxValue: 30
  },
  {
    id: "children",
    title: "Children Served",
    value: 500,
    suffix: "+",
    description: "Children have grown and learned in our programs",
    icon: Users,
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
    progressColor: "bg-secondary-600",
    maxValue: 600
  },
  {
    id: "satisfaction",
    title: "Parent Satisfaction",
    value: 98,
    suffix: "%",
    description: "Of parents would recommend us to other families",
    icon: Smile,
    color: "text-accent-green-600",
    bgColor: "bg-accent-green-50",
    progressColor: "bg-accent-green-600",
    maxValue: 100
  },
  {
    id: "teachers",
    title: "Qualified Teachers",
    value: 15,
    suffix: "+",
    description: "Experienced and certified early childhood educators",
    icon: GraduationCap,
    color: "text-accent-purple-600",
    bgColor: "bg-accent-purple-50",
    progressColor: "bg-accent-purple-600",
    maxValue: 20
  },
  {
    id: "awards",
    title: "Awards & Recognition",
    value: 12,
    suffix: "+",
    description: "Awards and recognitions for excellence in childcare",
    icon: Award,
    color: "text-accent-orange-600",
    bgColor: "bg-accent-orange-50",
    progressColor: "bg-accent-orange-600",
    maxValue: 15
  },
  {
    id: "programs",
    title: "Educational Programs",
    value: 25,
    suffix: "+",
    description: "Different educational and enrichment programs offered",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    progressColor: "bg-yellow-600",
    maxValue: 30
  },
  {
    id: "hours",
    title: "Operating Hours",
    value: 12,
    suffix: " hrs",
    description: "Daily operating hours to serve working families",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    progressColor: "bg-indigo-600",
    maxValue: 12
  }
];

/**
 * Individual Stat Card Component
 */
function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count, startCounter } = useCounter(stat.value);
  const Icon = stat.icon;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startCounter, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, startCounter]);

  const progressPercentage = stat.maxValue 
    ? (count / stat.maxValue) * 100 
    : (count / stat.value) * 100;

  return (
    <motion.div
      ref={ref}
      variants={counterVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group"
    >
      <div className={`child-friendly-card ${stat.bgColor} p-6 text-center space-y-4 border-2 border-transparent group-hover:border-opacity-20 group-hover:border-current transition-all duration-300`}>
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-16 h-16 mx-auto ${stat.bgColor} border-2 border-current border-opacity-20 rounded-2xl flex items-center justify-center ${stat.color} group-hover:shadow-lg transition-shadow`}
        >
          <Icon className="w-8 h-8" />
        </motion.div>

        {/* Counter */}
        <div className="space-y-2">
          <motion.div 
            className={`text-4xl md:text-5xl font-bold ${stat.color}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {count}{stat.suffix}
          </motion.div>
          
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
            {stat.title}
          </h3>
        </div>

        {/* Progress Bar */}
        {stat.maxValue && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${stat.progressColor} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${progressPercentage}%` } : { width: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% of capacity
            </p>
          </div>
        )}

        {/* Description */}
        <motion.p 
          className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {stat.description}
        </motion.p>

        {/* Decorative Element */}
        <motion.div
          className={`w-8 h-1 ${stat.progressColor} rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Achievement Highlights Component
 */
function AchievementHighlights() {
  const achievements = [
    {
      year: "1999",
      title: "Experience Begins",
      description: "Our owners began their journey in early childhood education"
    },
    {
      year: "2014",
      title: "New Ownership",
      description: "Acquired Great Beginnings with vision for excellence"
    },
    {
      year: "2016",
      title: "Expansion",
      description: "Added enhanced preschool and after-school programs"
    },
    {
      year: "2020",
      title: "Technology",
      description: "Implemented parent communication app and virtual learning"
    },
    {
      year: "2023",
      title: "Recognition",
      description: "Named 'Best Daycare in Roselle' by local families"
    }
  ];

  return (
    <ScrollMotionWrapper variants={slideUpVariants} threshold={0.1}>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-3 rounded-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Our Journey of Excellence
          </h3>
          <p className="text-gray-600">
            Key milestones in our commitment to quality childcare
          </p>
        </div>

        <MotionWrapper variants={staggerContainerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                variants={staggerItemVariants}
                className="text-center space-y-2 p-4"
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                  index % 2 === 0 ? 'bg-primary-600' : 'bg-secondary-600'
                }`}>
                  {achievement.year.slice(-2)}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </ScrollMotionWrapper>
  );
}

/**
 * Stats Section Component
 */
export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
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
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-yellow-300">Impact</span> by the Numbers
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-blue-100 leading-relaxed">
                These numbers represent more than statistics—they represent the trust families 
                place in us and the positive impact we've made in our community.
              </p>
            </div>
          </div>
        </ScrollMotionWrapper>

        {/* Stats Grid */}
        <MotionWrapper
          variants={staggerContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={staggerItemVariants}>
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </MotionWrapper>

        {/* Achievement Timeline */}
        <AchievementHighlights />

        {/* Call-to-Action */}
        <ScrollMotionWrapper 
          variants={slideUpVariants}
          threshold={0.1}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.p
              className="text-lg text-blue-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to become part of our growing community of happy families?
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
                className="child-friendly-button bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg inline-flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                Join Our Family
              </a>
            </motion.div>
          </div>
        </ScrollMotionWrapper>
      </div>
    </section>
  );
}

/**
 * Stats section features:
 * 
 * 1. Animated Counters: Numbers count up when section enters viewport
 * 2. Progress Bars: Visual representation of statistics with smooth animations
 * 3. Scroll Triggers: Animations activate when elements become visible
 * 4. Achievement Timeline: Historical milestones with staggered animations
 * 5. Color-Coded Stats: Each statistic has its own color theme
 * 6. Hover Effects: Interactive elements with smooth transitions
 * 7. Responsive Grid: Adapts layout based on screen size
 * 8. Trust Building: Statistics designed to build credibility
 * 9. Visual Hierarchy: Clear organization of information
 * 10. Call-to-Action: Encourages engagement at section end
 */