"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let hasMountedOnce = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const isInitialMount = !hasMountedOnce;

  useEffect(() => {
    hasMountedOnce = true;
    // Reset scroll to top immediately upon route mount
    scrollTo(0, { immediate: true });

    // Ensure all ScrollTriggers recalculate geometry after route transition
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [scrollTo]);

  if (prefersReducedMotion || isInitialMount) {
    return (
      <div className="w-full flex-1 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Lightweight Curtain Overlay on Route Navigation (Transform only, pointer-events none, never traps navigation) */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: "top center" }}
        className="pointer-events-none fixed inset-0 z-[9990] bg-text select-none"
      />

      {/* Main Page Content Enter Transition on Route Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
