"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const categoryCards = sectionRef.current.querySelectorAll<HTMLElement>(
        ".skill-category-block"
      );

      categoryCards.forEach((cat) => {
        // Thin category dividing line animation
        const divider = cat.querySelector<HTMLElement>(".category-divider");
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: cat,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // Staggered reveal of skill rows
        const rows = cat.querySelectorAll<HTMLElement>(".skill-row");
        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cat,
                start: "top 82%",
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
      id="skills"
      className="relative flex min-h-[85vh] w-full flex-col justify-center px-6 py-24 md:px-12 md:py-32 max-w-6xl mx-auto border-t border-border"
    >
      {/* Section Header */}
      <SectionHeader
        number="03"
        title={"TOOLS OF /\nTHE TRADE."}
        category="Technical Repertoire"
      />

      {/* Clean Typographic Grid with 4 Categories (No colorful logo cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {skillCategories.map((cat, catIdx) => {
          const categoryNumber = String(catIdx + 1).padStart(2, "0");

          return (
            <div
              key={cat.id}
              className="skill-category-block group/cat flex flex-col justify-start"
            >
              {/* Category Header */}
              <div className="flex items-baseline justify-between mb-3 pb-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent font-medium select-none">
                    {categoryNumber}
                  </span>
                  <h3 className="font-heading text-lg md:text-xl font-medium tracking-tight text-text">
                    {cat.name}
                  </h3>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {cat.skills.length} Tools
                </span>
              </div>

              {/* Thin animated divider */}
              <div
                aria-hidden="true"
                className="category-divider h-px w-full bg-border origin-left mb-4"
              />

              {/* Skills list with sibling dimming and interactive note on hover/focus */}
              <ul className="flex flex-col divide-y divide-border/40" role="list">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    tabIndex={0}
                    aria-label={
                      skill.note
                        ? `${skill.name}: ${skill.note}`
                        : skill.name
                    }
                    className="skill-row group/skill flex items-center justify-between py-3.5 px-1.5 transition-all duration-200 group-hover/cat:opacity-40 hover:!opacity-100 focus-within:!opacity-100 focus:outline-none focus-visible:bg-surface-subtle/50 rounded-[4px]"
                  >
                    {/* Left: Skill name + highlight indicator */}
                    <div className="flex items-center gap-3 transition-transform duration-200 group-hover/skill:translate-x-1.5 group-focus-within/skill:translate-x-1.5">
                      {skill.highlight ? (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
                          title="Core Competency"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-border flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-heading text-sm md:text-base font-normal text-text/90 group-hover/skill:text-text group-hover/skill:font-medium transition-colors">
                        {skill.name}
                      </span>
                    </div>

                    {/* Right: Optional interactive one-line note */}
                    {skill.note && (
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] text-muted group-hover/skill:text-accent group-focus-within/skill:text-accent transition-colors duration-200 text-right truncate max-w-[55%] pl-2 select-none"
                      >
                        {skill.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
