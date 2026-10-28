"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SectionHeaderProps {
  number: string;
  title: string;
  category?: string;
  className?: string;
}

export function SectionHeader({
  number,
  title,
  category,
  className = "",
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      // Animate number and category
      tl.fromTo(
        numberRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
      );

      // Animate horizontal dividing rule (transform scaleX only, no width animation)
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.3"
        );
      }

      // Animate heading title
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={containerRef} className={`w-full mb-12 md:mb-16 ${className}`}>
      {/* Top index and drawing rule */}
      <div className="flex items-center gap-4 mb-4">
        <span
          ref={numberRef}
          className="font-mono text-xs uppercase tracking-widest text-accent font-medium select-none"
        >
          {number}
        </span>
        <div
          ref={lineRef}
          aria-hidden="true"
          className="flex-1 h-px bg-border origin-left"
        />
        {category && (
          <span className="font-mono text-xs uppercase tracking-wider text-muted hidden sm:inline select-none">
            {category}
          </span>
        )}
      </div>

      {/* Main Section Title */}
      <h2
        ref={titleRef}
        className="heading-md md:display-lg text-text whitespace-pre-line"
      >
        {title}
      </h2>
    </div>
  );
}
