"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCursor } from "./CursorContext";
import { SPRINGS } from "@/lib/motion";

export function CustomCursor() {
  const { cursorState, isAvailable } = useCursor();
  const [hasMoved, setHasMoved] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  // Direct 1:1 hardware tracking for the center dot (zero lag, zero waving)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth, critically damped spring for follower ring/pill (no oscillating wave)
  const followerX = useSpring(-100, SPRINGS.cursorFollower);
  const followerY = useSpring(-100, SPRINGS.cursorFollower);

  useEffect(() => {
    if (!isAvailable || typeof window === "undefined") return;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      if (!isInViewport) setIsInViewport(true);

      dotX.set(e.clientX);
      dotY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const onMouseLeave = () => {
      setIsInViewport(false);
    };

    const onMouseEnter = () => {
      setIsInViewport(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isAvailable, hasMoved, isInViewport, dotX, dotY, followerX, followerY]);

  if (!isAvailable) return null;

  const isHidden = cursorState.variant === "hidden" || !hasMoved || !isInViewport;
  const isHover = cursorState.variant === "hover";
  const isText = cursorState.variant === "text";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Small center dot (direct 1:1 tracking) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity: isHidden ? 0 : isText ? 0 : 1,
          scale: isHover ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-accent"
      />

      {/* Follower ring / text pill */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isHover ? 1.35 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0"
      >
        {isText ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-text text-bg px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-medium shadow-md whitespace-nowrap"
          >
            {cursorState.text || "VIEW"}
          </motion.div>
        ) : (
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-200 ${
              isHover
                ? "h-10 w-10 border-accent/60 bg-accent/10"
                : "h-8 w-8 border-text/25"
            }`}
          />
        )}
      </motion.div>
    </div>
  );
}
