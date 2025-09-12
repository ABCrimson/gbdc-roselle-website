/**
 * Motion Wrapper Component
 * 
 * A reusable wrapper component that provides common Framer Motion functionality
 * with accessibility support and reduced motion preferences.
 */

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  className?: string;
  custom?: any;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function MotionWrapper({
  children,
  variants,
  initial = "hidden",
  animate = "visible",
  exit,
  className,
  custom,
  delay = 0,
  duration,
  once = true,
  amount = 0.1,
  ...props
}: MotionWrapperProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // If user prefers reduced motion, return static content
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      className={className}
      custom={custom}
      viewport={{ once, amount }}
      transition={duration ? { duration, delay } : { delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-triggered motion wrapper
 */
export function ScrollMotionWrapper({
  children,
  variants,
  className,
  threshold = 0.1,
  ...props
}: MotionWrapperProps & { threshold?: number }) {
  return (
    <MotionWrapper
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      className={className}
      {...props}
    >
      {children}
    </MotionWrapper>
  );
}