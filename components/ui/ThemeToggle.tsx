"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASINGS } from "@/lib/motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-none border border-border bg-bg text-text transition-colors duration-150 hover:border-text focus-visible:outline-2 focus-visible:outline-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-icon"
            initial={prefersReducedMotion ? { opacity: 1 } : { rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASINGS.snappy }}
            className="flex items-center justify-center"
          >
            {/* Sun icon for switching to light */}
            <svg
              className="h-4 w-4 stroke-current stroke-[1.75] text-accent group-hover:text-text transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="light-icon"
            initial={prefersReducedMotion ? { opacity: 1 } : { rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASINGS.snappy }}
            className="flex items-center justify-center"
          >
            {/* Moon icon for switching to dark */}
            <svg
              className="h-4 w-4 stroke-current stroke-[1.75] text-accent group-hover:text-text transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
