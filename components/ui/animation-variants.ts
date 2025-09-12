/**
 * GBDC Animation Variants for Framer Motion
 * 
 * This file contains all reusable animation variants for the GBDC website.
 * Variants provide child-friendly, smooth animations that enhance user experience
 * while being accessible and performance-optimized.
 * 
 * Features:
 * - Reduced motion support for accessibility
 * - Child-friendly timing and easing
 * - Optimized for performance
 * - Consistent animation patterns throughout the site
 */

import type { Variants } from "framer-motion";

/**
 * Fade animation variants - smooth opacity transitions
 */
export const fadeVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

/**
 * Slide up animation variants - content appearing from below
 */
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
    }
  }
};

/**
 * Slide in from left variants
 */
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/**
 * Slide in from right variants
 */
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/**
 * Scale animation variants - gentle growing effect
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

/**
 * Stagger container variants - for animating children in sequence
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Stagger item variants - for use with stagger containers
 */
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

/**
 * Card hover animation variants - for interactive cards
 */
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

/**
 * Button animation variants - child-friendly button interactions
 */
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

/**
 * Counter animation variants - for animated numbers
 */
export const counterVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Carousel animation variants - for testimonial carousel
 */
export const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

/**
 * Floating animation variants - gentle up and down motion
 */
export const floatingVariants: Variants = {
  floating: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * Hero text animation variants - dramatic entrance for headlines
 */
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

/**
 * Progress bar animation variants
 */
export const progressBarVariants: Variants = {
  hidden: {
    width: 0
  },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.5
    }
  }
};

/**
 * Icon animation variants - for feature icons
 */
export const iconVariants: Variants = {
  rest: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

/**
 * Star rating animation variants
 */
export const starVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180
  },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

/**
 * Page transition variants - for overall page animations
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

/**
 * Parallax variants - for background elements
 */
export const parallaxVariants: Variants = {
  hidden: {
    y: 0
  },
  visible: {
    y: -50,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

/**
 * Mobile-friendly animation variants that reduce motion on smaller screens
 */
export const mobileReducedVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

/**
 * Utility function to get appropriate variants based on screen size and user preferences
 */
export const getResponsiveVariants = (
  isMobile: boolean, 
  prefersReducedMotion: boolean,
  defaultVariants: Variants
): Variants => {
  if (prefersReducedMotion || isMobile) {
    return mobileReducedVariants;
  }
  return defaultVariants;
};