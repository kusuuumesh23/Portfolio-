/**
 * lib/motion.ts
 * Single source of truth for motion constants, easing curves, durations, and spring presets.
 */

// Timing durations (in seconds)
export const DURATIONS = {
  instant: 0,
  micro: 0.15,
  fast: 0.25,
  normal: 0.45,
  moderate: 0.7,
  slow: 1.0,
  preloader: 1.2,
} as const;

// Cubic bezier arrays for Motion for React & GSAP equivalents
export const EASINGS = {
  // Editorial curve: smooth deceleration with crisp start
  editorial: [0.25, 1, 0.5, 1] as [number, number, number, number],
  // Ultra smooth for large reveals
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Snappy for interactive micro-actions
  snappy: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  // Mask reveal for typography
  reveal: [0.76, 0, 0.24, 1] as [number, number, number, number],
  // Standard ease-out
  easeOut: [0.33, 1, 0.68, 1] as [number, number, number, number],
} as const;

// GSAP string easing equivalents
export const GSAP_EASINGS = {
  editorial: "power3.out",
  smooth: "power4.out",
  reveal: "expo.out",
  linear: "none",
} as const;

// Spring physics configurations for Motion for React
export const SPRINGS = {
  magnetic: {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  cursorFollower: {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.2,
  },
  cursorDot: {
    type: "spring" as const,
    stiffness: 700,
    damping: 38,
    mass: 0.05,
  },
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 14,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
} as const;

// Stagger intervals (in seconds)
export const STAGGERS = {
  char: 0.015,
  word: 0.035,
  line: 0.07,
  item: 0.05,
  section: 0.1,
} as const;
