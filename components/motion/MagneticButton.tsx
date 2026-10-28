"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { SPRINGS } from "@/lib/motion";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  as?: "button" | "div";
  ariaLabel?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  radius = 90,
  onClick,
  as = "button",
  ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const disabledPhysics = prefersReducedMotion || isTouch || disabled;

  // Spring physics for smooth follow and snappy snap-back
  const x = useSpring(0, SPRINGS.magnetic);
  const y = useSpring(0, SPRINGS.magnetic);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabledPhysics || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (disabledPhysics) return;
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (disabledPhysics) return;
  };

  if (as === "button") {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <motion.button
          type="button"
          disabled={disabled}
          onClick={onClick}
          aria-label={ariaLabel}
          style={{ x, y }}
          className={`cursor-pointer inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-accent ${className}`}
        >
          {children}
        </motion.button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        style={{ x, y }}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
