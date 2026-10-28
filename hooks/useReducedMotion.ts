"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Hook to detect if user has requested reduced motion at OS level.
 * When true, all smooth scrolling, parallax, looping animations, and magnetic effects must be disabled.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
