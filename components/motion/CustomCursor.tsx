"use client";

import React, { useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { useCursor } from "./CursorContext";
import { SPRINGS } from "@/lib/motion";

export function CustomCursor() {
  const { cursorState, isAvailable } = useCursor();

  // Snappy spring for the center dot
  const dotX = useSpring(-100, SPRINGS.cursorDot);
  const dotY = useSpring(-100, SPRINGS.cursorDot);

  // Smooth floating spring for follower ring/pill
  const followerX = useSpring(-100, SPRINGS.cursorFollower);
  const followerY = useSpring(-100, SPRINGS.cursorFollower);

  useEffect(() => {
    if (!isAvailable || typeof window === "undefined") return;

    const onMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isAvailable, dotX, dotY, followerX, followerY]);

  if (!isAvailable) return null;

  const isHidden = cursorState.variant === "hidden";
  const isHover = cursorState.variant === "hover";
  const isText = cursorState.variant === "text";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Small center dot */}
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
          scale: isHover ? 1.4 : 1,
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
