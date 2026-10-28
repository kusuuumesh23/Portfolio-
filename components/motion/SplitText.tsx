"use client";

import React, { useMemo } from "react";
import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASINGS } from "@/lib/motion";

export interface SplitTextProps {
  children: string;
  type?: "chars" | "words";
  variant?: "mask-reveal" | "fade-up";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function SplitText({
  children,
  type = "words",
  variant = "mask-reveal",
  delay = 0,
  duration = 0.6,
  stagger = 0.025,
  className = "",
  as = "span",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as;

  // Accessibility: keep full raw string for screen readers
  const fullText = children;

  // Split logic memoized
  const words = useMemo(() => {
    return children.split(" ");
  }, [children]);

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: variant === "mask-reveal" ? "105%" : 16,
      opacity: variant === "mask-reveal" ? 1 : 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: EASINGS.editorial,
      },
    },
  };

  return (
    <Component className={className} aria-label={fullText}>
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        aria-hidden="true"
      >
        {type === "words"
          ? words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block whitespace-nowrap"
              >
                <span className="inline-block overflow-hidden align-top">
                  <motion.span
                    variants={itemVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
                {wordIndex < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))
          : words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block whitespace-nowrap"
              >
                {Array.from(word).map((char, charIndex) => (
                  <span
                    key={`${char}-${charIndex}`}
                    className="inline-block overflow-hidden align-top"
                  >
                    <motion.span
                      variants={itemVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
                {wordIndex < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
      </motion.span>
    </Component>
  );
}
