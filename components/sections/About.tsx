"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const techContainerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useGSAP(
    () => {
      // Gentle scroll parallax on the profile image frame (disabled on touch & reduced motion)
      if (!prefersReducedMotion && !isTouch && imageInnerRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { y: -20, scale: 1.05 },
          {
            y: 20,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Animated horizontal divider drawing in
      if (!prefersReducedMotion && dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Staggered fade and subtle shift for technology typographic labels
      if (!prefersReducedMotion && techContainerRef.current) {
        const labels = techContainerRef.current.querySelectorAll(".tech-item");
        gsap.fromTo(
          labels,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techContainerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isTouch] }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[90vh] w-full flex-col justify-center px-6 py-24 md:px-12 md:py-32 max-w-6xl mx-auto border-t border-border"
    >
      {/* Section Header */}
      <SectionHeader
        number="01"
        title={"MORE THAN /\nJUST CODE."}
        category="About Kusumesh"
      />

      {/* Asymmetrical Two-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (5 cols): Large Lead Paragraph + Profile Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="space-y-4">
            <span className="label-mono text-accent">Perspective</span>
            <div className="body-lg text-text font-normal leading-relaxed select-text">
              <SplitText type="words" variant="mask-reveal">
                {siteConfig.about.lead}
              </SplitText>
            </div>
          </div>

          {/* Minimal Profile Image with gentle parallax */}
          <div
            ref={imageContainerRef}
            className="relative w-full aspect-[3/4] max-w-sm overflow-hidden rounded-[10px] border border-border bg-surface-subtle"
          >
            <div
              ref={imageInnerRef}
              className="relative h-full w-full select-none"
            >
              <Image
                src="/images/profile.jpg"
                alt={`${siteConfig.name} - ${siteConfig.role}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                priority={false}
              />
            </div>

            {/* Subtle corner badge */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 bg-bg/90 border border-border px-3 py-1 text-[10px] font-mono uppercase text-muted tracking-widest backdrop-none">
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>{siteConfig.education.institution.split(" ")[0]} &middot; Year 1</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Supporting paragraphs, divider, and typographic tech labels */}
        <div className="lg:col-span-7 flex flex-col gap-10 lg:pl-6">
          {/* Paragraph 1: Background */}
          <div className="space-y-2">
            <h3 className="label-mono text-muted">01 / Background</h3>
            <p className="body-base text-muted leading-relaxed select-text">
              {siteConfig.about.background}
            </p>
          </div>

          {/* Paragraph 2: Interests */}
          <div className="space-y-2">
            <h3 className="label-mono text-muted">02 / Interests</h3>
            <p className="body-base text-muted leading-relaxed select-text">
              {siteConfig.about.interests}
            </p>
          </div>

          {/* Paragraph 3: Approach */}
          <div className="space-y-2">
            <h3 className="label-mono text-muted">03 / Approach</h3>
            <p className="body-base text-muted leading-relaxed select-text">
              {siteConfig.about.approach}
            </p>
          </div>

          {/* Animated Horizontal Divider */}
          <div
            ref={dividerRef}
            aria-hidden="true"
            className="h-px w-full bg-border origin-left"
          />

          {/* Animated Technology Labels (Pill-Free, Typographic) */}
          <div ref={techContainerRef} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted">
                Selected Technologies & Tooling
              </span>
              <span className="text-xs font-mono text-accent">08 Stack Items</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {siteConfig.about.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-item group flex flex-col justify-between border-b border-border/80 pb-3 transition-transform duration-200 hover:-translate-y-0.5 select-none"
                >
                  <span className="font-heading text-sm font-medium text-text group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-muted tracking-wider">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
