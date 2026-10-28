"use client";

import React, { useState } from "react";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { Preloader } from "@/components/motion/Preloader";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/data/site";

export default function DevPage() {
  const [showPreloader, setShowPreloader] = useState(false);
  const localTime = useLocalTime(siteConfig.timezone);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const mousePos = useMousePosition();
  const { scrollTo } = useSmoothScroll();

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 max-w-5xl mx-auto flex flex-col gap-16">
      {showPreloader && (
        <Preloader
          forceShow
          onComplete={() => setShowPreloader(false)}
        />
      )}

      {/* Header Bar */}
      <header className="flex flex-wrap items-center justify-between border-b border-border pb-6 gap-4">
        <div>
          <span className="label-mono text-accent">Phase 1 / Motion Lab</span>
          <h1 className="heading-md mt-1">Infrastructure Demo</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MagneticButton
            onClick={() => setShowPreloader(true)}
            className="border border-border px-4 py-2 text-xs font-mono uppercase text-text hover:border-text transition-colors"
          >
            Replay Preloader
          </MagneticButton>
        </div>
      </header>

      {/* Diagnostics Panel (Live Hooks) */}
      <section className="border border-border p-6 bg-surface-subtle/50">
        <div className="label-mono text-muted mb-4">00 / Diagnostics & Hooks</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-muted block">Local Time</span>
            <span className="text-text font-medium">{localTime.time}</span>
          </div>
          <div>
            <span className="text-muted block">Reduced Motion</span>
            <span className={prefersReducedMotion ? "text-accent" : "text-text"}>
              {prefersReducedMotion ? "Active (Disabled)" : "Inactive"}
            </span>
          </div>
          <div>
            <span className="text-muted block">Pointer Type</span>
            <span className={isTouch ? "text-accent" : "text-text"}>
              {isTouch ? "Touch / Coarse" : "Fine (Mouse)"}
            </span>
          </div>
          <div>
            <span className="text-muted block">Mouse Position</span>
            <span className="text-text">
              {mousePos.isHovered ? `${Math.round(mousePos.x)}, ${Math.round(mousePos.y)}` : "Inactive"}
            </span>
          </div>
        </div>
      </section>

      {/* SectionHeader Component Demo */}
      <section>
        <SectionHeader
          number="01"
          title="TYPOGRAPHY & SPLIT TEXT"
          category="Motion Baseline"
        />
        <div className="flex flex-col gap-8">
          <div>
            <div className="label-mono text-muted mb-2">SplitText (Words Variant)</div>
            <SplitText
              type="words"
              variant="mask-reveal"
              as="h2"
              className="display-lg text-text"
            >
              Ultra-minimal editorial typography in motion.
            </SplitText>
          </div>

          <div>
            <div className="label-mono text-muted mb-2">SplitText (Chars Variant)</div>
            <SplitText
              type="chars"
              variant="mask-reveal"
              as="p"
              className="heading-md text-muted"
            >
              Every character translates up with precision spring timing.
            </SplitText>
          </div>
        </div>
      </section>

      {/* Interactive Springs (Magnetic & AnimatedLink) */}
      <section>
        <SectionHeader
          number="02"
          title="SPRINGS & CURSOR INTERACTION"
          category="Tactile Feedback"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Magnetic Buttons */}
          <div className="border border-border p-8 flex flex-col items-start gap-4">
            <div className="label-mono text-muted">MagneticButton Physics</div>
            <p className="body-sm text-muted">
              Pulls toward mouse pointer within 90px radius, snaps smoothly back on leave.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <MagneticButton
                onClick={() => alert("Magnetic primary clicked")}
                className="bg-text text-bg px-6 py-3 text-sm font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Primary Magnetic
              </MagneticButton>

              <MagneticButton
                onClick={() => alert("Magnetic ghost clicked")}
                className="border border-border text-text px-6 py-3 text-sm font-medium hover:border-text transition-colors"
              >
                Secondary Ghost
              </MagneticButton>
            </div>
          </div>

          {/* Custom Cursor Hover States */}
          <div className="border border-border p-8 flex flex-col gap-4">
            <div className="label-mono text-muted">CustomCursor Triggers</div>
            <p className="body-sm text-muted">
              Hover over cards below to see the dot and follower morph into custom states.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div
                data-cursor-text="VIEW PROJECT"
                className="border border-border p-6 flex items-center justify-center text-xs font-mono text-muted hover:border-accent hover:text-text transition-colors cursor-pointer select-none"
              >
                Hover for &quot;VIEW PROJECT&quot;
              </div>

              <div
                data-cursor-text="EXPLORE"
                className="border border-border p-6 flex items-center justify-center text-xs font-mono text-muted hover:border-accent hover:text-text transition-colors cursor-pointer select-none"
              >
                Hover for &quot;EXPLORE&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Links Demo */}
      <section>
        <div className="border border-border p-8 flex flex-col gap-4">
          <div className="label-mono text-muted">AnimatedLink Directional Underline</div>
          <p className="body-sm text-muted">
            Hover to test directional scaleX drawing from entry side to exit side:
          </p>
          <div className="flex flex-wrap items-center gap-8 mt-2 text-base font-medium">
            <AnimatedLink href="/">
              Return Home
            </AnimatedLink>
            <AnimatedLink href="https://github.com/kusumesh" external>
              GitHub Profile &rarr;
            </AnimatedLink>
            <AnimatedLink href="https://linkedin.com/in/kusumesh" external>
              LinkedIn Profile &rarr;
            </AnimatedLink>
          </div>
        </div>
      </section>

      {/* Reveal Component (Scroll-linked GSAP) */}
      <section id="target-section">
        <SectionHeader
          number="03"
          title="SCROLLTRIGGER REVEALS"
          category="GSAP Scope"
        />

        <div className="flex items-center gap-4 mb-8">
          <MagneticButton
            onClick={() => scrollTo(0)}
            className="border border-border px-4 py-2 text-xs font-mono uppercase text-muted hover:text-text hover:border-text transition-colors"
          >
            Scroll to Top
          </MagneticButton>
        </div>

        <Reveal direction="up" distance={40} duration={0.8}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="border border-border p-6 flex flex-col justify-between h-48 bg-surface-subtle/30"
              >
                <span className="label-mono text-accent">Card 0{num}</span>
                <div>
                  <h3 className="heading-sm mb-1">Scroll-Triggered</h3>
                  <p className="body-sm text-muted">
                    GSAP reveals tied to scroll with zero layout shifts.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
