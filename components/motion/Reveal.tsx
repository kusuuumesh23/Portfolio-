"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  childSelector?: string;
  threshold?: string;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

export function Reveal({
  children,
  direction = "up",
  distance = 32,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  childSelector,
  threshold = "top 88%",
  className = "",
  as = "div",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Component = as;

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const targets = childSelector
        ? containerRef.current.querySelectorAll(childSelector)
        : containerRef.current;

      const x =
        direction === "left"
          ? distance
          : direction === "right"
          ? -distance
          : 0;
      const y =
        direction === "up" ? distance : direction === "down" ? -distance : 0;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x,
          y,
          willChange: "transform, opacity",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: threshold,
            once: true,
          },
          onComplete: () => {
            gsap.set(targets, { clearProps: "willChange" });
          },
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [
        prefersReducedMotion,
        direction,
        distance,
        duration,
        delay,
        stagger,
        childSelector,
        threshold,
      ],
    }
  );

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {children}
    </Component>
  );
}
