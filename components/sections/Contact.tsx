"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked backdrop opacity transition (eases to a deeper grounding tone without animating body bg)
  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !backdropRef.current) {
        return;
      }

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          },
        }
      );

      // Fade-up sequence for contact calls to action
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll(".contact-reveal-item");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const cleanEmail = siteConfig.email.replace(/\s*\[EDIT ME\]\s*/g, "").trim();

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cleanEmail);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = cleanEmail;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${cleanEmail}`;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[90vh] w-full flex-col justify-center px-6 py-24 md:px-12 md:py-36 max-w-6xl mx-auto border-t border-border overflow-hidden"
    >
      {/* Scroll-Linked Darker Opacity Backdrop Layer (Contrast-Safe) */}
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-surface-subtle/80 dark:bg-[#080808]/90 transition-opacity duration-300"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      />

      {/* Section Header */}
      <SectionHeader
        number="05"
        title={"LET'S BUILD /\nSOMETHING."}
        category="Inquiries & Collaborations"
      />

      <div ref={contentRef} className="flex flex-col items-start gap-10 mt-2">
        {/* Supporting Narrative */}
        <p className="contact-reveal-item body-lg text-muted max-w-2xl leading-relaxed select-text">
          Have an idea, an opportunity, a project to collaborate on, or just want to connect? Let&apos;s talk.
        </p>

        {/* Primary Action Buttons: Oversized Magnetic Mailto + Copy Email */}
        <div className="contact-reveal-item flex flex-wrap items-center gap-5 sm:gap-6">
          {/* Oversized MagneticButton (Cursor grows over this button) */}
          <div data-cursor-text="LET'S TALK">
            <MagneticButton
              onClick={handleEmailClick}
              ariaLabel={`Send email to ${cleanEmail}`}
              radius={100}
              strength={0.3}
              className="bg-text text-bg hover:bg-accent hover:text-white px-8 py-5 sm:px-10 sm:py-6 text-sm sm:text-base font-heading font-medium tracking-wide shadow-lg group transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} aria-hidden="true" />
                <span>Send Email</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </MagneticButton>
          </div>

          {/* Copy-Email Button with Tactile Feedback and Screen Reader Announcement */}
          <MagneticButton
            onClick={handleCopyEmail}
            ariaLabel="Copy email address to clipboard"
            radius={70}
            strength={0.2}
            className="border border-border bg-bg hover:border-text px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-mono uppercase tracking-wider text-text transition-colors duration-200"
          >
            <span className="flex items-center gap-2.5 select-none">
              {copied ? (
                <>
                  <Check size={16} className="text-accent animate-in zoom-in-50" aria-hidden="true" />
                  <span className="text-accent font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={15} className="text-muted" aria-hidden="true" />
                  <span>Copy Email</span>
                </>
              )}
            </span>
          </MagneticButton>

          {/* Accessible Live Region for Screen Readers */}
          <div className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </div>
        </div>

        {/* Social Links Row with Letter Roll / Slide Micro-Interaction */}
        <div className="contact-reveal-item pt-10 border-t border-border/70 w-full mt-4">
          <span className="label-mono text-muted block mb-4">Connect Directly</span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider">
            {/* Email link */}
            <AnimatedLink
              href={`mailto:${cleanEmail}`}
              external
              ariaLabel="Email Kusumesh directly"
              className="group/link text-text hover:text-accent transition-colors"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] align-middle">
                <span className="block transition-transform duration-300 ease-out group-hover/link:-translate-y-full">
                  Email
                </span>
                <span
                  aria-hidden="true"
                  className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover/link:-translate-y-full text-accent"
                >
                  Email
                </span>
              </span>
            </AnimatedLink>

            {/* GitHub */}
            <AnimatedLink
              href={siteConfig.socials.github}
              external
              ariaLabel="Kusumesh's GitHub profile (opens in new tab)"
              className="group/link text-muted hover:text-text transition-colors"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] align-middle">
                <span className="block transition-transform duration-300 ease-out group-hover/link:-translate-y-full">
                  GitHub
                </span>
                <span
                  aria-hidden="true"
                  className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover/link:-translate-y-full text-text"
                >
                  GitHub
                </span>
              </span>
            </AnimatedLink>

            {/* LinkedIn */}
            <AnimatedLink
              href={siteConfig.socials.linkedin}
              external
              ariaLabel="Kusumesh's LinkedIn profile (opens in new tab)"
              className="group/link text-muted hover:text-text transition-colors"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] align-middle">
                <span className="block transition-transform duration-300 ease-out group-hover/link:-translate-y-full">
                  LinkedIn
                </span>
                <span
                  aria-hidden="true"
                  className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover/link:-translate-y-full text-text"
                >
                  LinkedIn
                </span>
              </span>
            </AnimatedLink>

            {/* Twitter / X */}
            <AnimatedLink
              href={siteConfig.socials.twitter}
              external
              ariaLabel="Kusumesh's Twitter / X profile (opens in new tab)"
              className="group/link text-muted hover:text-text transition-colors"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] align-middle">
                <span className="block transition-transform duration-300 ease-out group-hover/link:-translate-y-full">
                  Twitter / X
                </span>
                <span
                  aria-hidden="true"
                  className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover/link:-translate-y-full text-text"
                >
                  Twitter / X
                </span>
              </span>
            </AnimatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
