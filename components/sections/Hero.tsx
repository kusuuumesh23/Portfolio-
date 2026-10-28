"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/data/site";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASINGS, SPRINGS } from "@/lib/motion";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgDriftRef = useRef<HTMLDivElement>(null);

  const localTime = useLocalTime(siteConfig.timezone);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const { scrollTo } = useSmoothScroll();

  // Mouse movement parallax for headline (a few pixels of spring-based translate, desktop only)
  const mouseX = useSpring(0, SPRINGS.cursorFollower);
  const mouseY = useSpring(0, SPRINGS.cursorFollower);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || isTouch) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Small range: -8px to +8px
    const offsetX = ((clientX - centerX) / centerX) * 8;
    const offsetY = ((clientY - centerY) / centerY) * 8;

    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || isTouch) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scrubbed GSAP ScrollTrigger: smooth transition out as user scrolls into About section
  useGSAP(
    () => {
      if (prefersReducedMotion || !heroRef.current || !contentRef.current) return;

      // Hero content fades and translates slightly up on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Background drift with scroll (transform only)
      if (bgDriftRef.current) {
        gsap.to(bgDriftRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pt-24 pb-8 md:px-12 md:pt-28 md:pb-12"
    >
      {/* Subtle Background Detail: Fine dot grid drifting with scroll */}
      <div
        ref={bgDriftRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(var(--text) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase text-muted">
        {/* Intro */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASINGS.editorial }}
          className="flex items-center gap-3"
        >
          <span className="text-accent font-medium">{siteConfig.heroIntro}</span>
          <span className="h-px w-6 bg-border" />
          <span className="hidden sm:inline">{siteConfig.role}</span>
        </motion.div>

        {/* Live Local Time & Availability */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASINGS.editorial }}
          className="flex items-center gap-4 sm:gap-6"
        >
          {/* Availability indicator with opacity-only pulse */}
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-accent animate-pulse"
              style={{
                animationDuration: "2s",
              }}
            />
            <span className="hidden md:inline">{siteConfig.availability}</span>
          </div>

          {/* Local Time Indicator */}
          <div className="flex items-center gap-1.5 text-muted">
            <span className="text-text font-medium">{localTime.time}</span>
            <span className="text-[10px] text-muted">
              {siteConfig.location.split(",")[0]}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Center: Massive Editorial Headline & Narrative */}
      <div ref={contentRef} className="my-auto py-12 md:py-16">
        {/* Headline with mouse parallax translate */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
          }}
          className="max-w-6xl will-change-transform"
        >
          <h1
            aria-label={`${siteConfig.headlinePrimary} ${siteConfig.headlineSecondary}`}
            className="display-2xl text-text uppercase tracking-tighter"
          >
            {/* Line 1: CREATIVE */}
            <span className="block overflow-hidden">
              <motion.span
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: "0%" }
                    : { y: "105%", opacity: 0.2 }
                }
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2,
                  ease: EASINGS.reveal,
                }}
                className="block"
              >
                {siteConfig.headlinePrimary}
              </motion.span>
            </span>

            {/* Line 2: DEVELOPER. */}
            <span className="block overflow-hidden">
              <motion.span
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: "0%" }
                    : { y: "105%", opacity: 0.2 }
                }
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.35,
                  ease: EASINGS.reveal,
                }}
                className="block text-muted hover:text-text transition-colors duration-300"
              >
                {siteConfig.headlineSecondary}
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Supporting Line & Status */}
        <div className="mt-8 md:mt-12 max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.55,
              ease: EASINGS.editorial,
            }}
            className="body-lg text-muted mb-6"
          >
            {siteConfig.statement}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.75,
              ease: EASINGS.editorial,
            }}
            className="flex items-center gap-3 text-xs font-mono text-muted"
          >
            <span className="text-accent font-medium">Currently:</span>
            <span className="text-text">{siteConfig.status}</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.9,
          ease: EASINGS.editorial,
        }}
        className="flex items-end justify-between border-t border-border pt-6 gap-6"
      >
        {/* Magnetic Button to Contact Section */}
        <div className="flex items-center gap-4">
          <MagneticButton
            onClick={() => scrollTo("#contact", { offset: -70 })}
            className="bg-text text-bg px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-medium hover:bg-accent hover:text-white transition-colors duration-150"
          >
            Get in touch &rarr;
          </MagneticButton>

          <span className="text-xs font-mono text-muted hidden sm:inline">
            {siteConfig.education.institution}
          </span>
        </div>

        {/* Real Accessible Scroll-down Button */}
        <button
          type="button"
          onClick={() => scrollTo("#about", { offset: -70 })}
          aria-label="Scroll to about section"
          className="group flex items-center gap-2.5 text-xs font-mono uppercase text-muted hover:text-text transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent py-2"
        >
          <span className="hidden sm:inline">Scroll Down</span>
          <motion.span
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 4, 0],
                  }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-7 w-7 items-center justify-center border border-border group-hover:border-text transition-colors"
          >
            <ArrowDown className="h-3.5 w-3.5 text-accent group-hover:text-text transition-colors" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
