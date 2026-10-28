"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data/experience";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !timelineRef.current || !progressBarRef.current) {
        return;
      }

      // Progressive drawing of the vertical timeline line with scroll scrub
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      // Staggered fade and slide for each timeline entry as the line reaches it
      const entryElements = timelineRef.current.querySelectorAll<HTMLElement>(
        ".timeline-entry"
      );

      entryElements.forEach((entry, idx) => {
        const content = entry.querySelector<HTMLElement>(".timeline-content");
        const node = entry.querySelector<HTMLElement>(".timeline-node");

        gsap.fromTo(
          content,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 80%",
              once: true,
              onEnter: () => setActiveIndex(idx),
              onEnterBack: () => setActiveIndex(idx),
            },
          }
        );

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.6, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 md:py-32 max-w-6xl mx-auto border-t border-border"
    >
      {/* Section Header */}
      <SectionHeader
        number="04"
        title={"JOURNEY & /\nMILESTONES."}
        category="Education & Milestones"
      />

      {/* Minimal Vertical Timeline (Typography-driven, left-aligned single column) */}
      <div ref={timelineRef} className="relative pl-6 sm:pl-10">
        {/* Background Static Hairline Guide */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-6 left-[7px] sm:left-[11px] w-px bg-border"
        />

        {/* Animated Progressive Draw Line (Scrubbed scaleY via ScrollTrigger) */}
        <div
          ref={progressBarRef}
          aria-hidden="true"
          className="absolute top-2 bottom-6 left-[7px] sm:left-[11px] w-px bg-accent origin-top scale-y-0 transition-opacity duration-300"
          style={{
            transform: prefersReducedMotion ? "scaleY(1)" : undefined,
          }}
        />

        {/* Timeline Entries */}
        <div className="flex flex-col space-y-12 sm:space-y-16">
          {experiences.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                className={`timeline-entry relative group ${
                  isActive ? "timeline-entry-active" : ""
                }`}
              >
                {/* Timeline Node Marker */}
                <div
                  aria-hidden="true"
                  className={`timeline-node absolute -left-[24px] sm:-left-[36px] top-1.5 flex items-center justify-center`}
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent scale-125 shadow-[0_0_8px_rgba(226,74,41,0.5)]"
                        : "border-border bg-bg group-hover:border-text group-hover:bg-text"
                    }`}
                  />
                </div>

                {/* Content Block */}
                <div className="timeline-content flex flex-col">
                  {/* Metadata Row: Type badge + Year + Current indicator */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border bg-surface-subtle text-muted rounded-[3px] select-none">
                      {item.typeLabel}
                    </span>

                    <span className="font-mono text-xs text-muted/90 tracking-wide select-none">
                      {item.year}
                    </span>

                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent select-none">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span>Current</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-heading text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-text group-hover:text-accent"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Place / Institution */}
                  <div className="font-mono text-xs sm:text-sm text-muted mt-0.5 mb-3">
                    {item.place}
                  </div>

                  {/* One-line Description */}
                  <p className="body-base text-muted/90 leading-relaxed max-w-2xl select-text">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
