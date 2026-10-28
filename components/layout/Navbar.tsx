"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASINGS } from "@/lib/motion";

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { scrollTo, stop: stopLenis, start: startLenis } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const activeSection = useActiveSection(
    NAV_ITEMS.map((item) => item.id),
    "home"
  );

  // Monitor scroll for compact navbar and smart show/hide on scroll direction
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Compact state threshold
          setIsScrolled(currentY > 40);

          // Smart hide on fast downward scroll, show on upward scroll
          if (currentY > 180) {
            const diff = currentY - lastScrollY.current;
            if (diff > 12) {
              // Scrolling down
              setIsHidden(true);
            } else if (diff < -12) {
              // Scrolling up
              setIsHidden(false);
            }
          } else {
            setIsHidden(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and Lenis when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      stopLenis();
      document.body.style.overflow = "hidden";
    } else {
      startLenis();
      document.body.style.overflow = "";
    }

    return () => {
      startLenis();
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, stopLenis, startLenis]);

  // Keyboard support: Escape closes mobile menu and restores focus to hamburger trigger
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        hamburgerButtonRef.current?.focus();
      }

      // Focus trap within mobile menu
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll<
          HTMLAnchorElement | HTMLButtonElement
        >('a[href], button:not([disabled])');

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (href === "#home") {
        scrollTo(0, { offset: 0 });
      } else {
        scrollTo(href, { offset: -70 });
      }
    },
    [scrollTo]
  );

  return (
    <>
      {/* Floating Navbar */}
      <motion.header
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        animate={{
          opacity: 1,
          y: isHidden && !mobileMenuOpen ? "-100%" : "0%",
        }}
        transition={{ duration: 0.35, ease: EASINGS.editorial }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 md:px-8 pointer-events-none"
      >
        <div
          className={`pointer-events-auto transition-all duration-300 w-full max-w-5xl flex items-center justify-between ${
            isScrolled
              ? "mt-3 py-2.5 px-5 md:px-6 bg-bg border border-border shadow-xs"
              : "mt-4 md:mt-6 py-3 px-4 md:px-6 bg-transparent border border-transparent"
          }`}
        >
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            aria-label={`${siteConfig.name} - Home`}
            className="group flex items-center gap-2.5 text-text focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="font-heading font-semibold text-lg tracking-tight group-hover:text-accent transition-colors">
              {siteConfig.initials}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-mono uppercase text-muted tracking-widest hidden sm:inline">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative text-xs font-mono uppercase tracking-wider transition-colors duration-150 py-1 focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive ? "text-text font-medium" : "text-muted hover:text-text"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="h-1 w-1 rounded-full bg-accent" />
                    )}
                    {item.label}
                  </span>
                  {/* Subtle hover/active underline */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-accent transition-transform duration-200 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Hamburger Trigger */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-bg text-text focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="relative h-3 w-4 flex flex-col justify-between">
                <span
                  className={`h-[1.5px] w-full bg-current transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-current transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASINGS.editorial }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-bg px-6 py-8 md:hidden"
          >
            {/* Top drawer bar with close button */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-heading font-medium tracking-tight text-lg">
                {siteConfig.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  hamburgerButtonRef.current?.focus();
                }}
                aria-label="Close menu"
                className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-bg text-text focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative h-3 w-4 flex flex-col justify-between">
                  <span className="h-[1.5px] w-full bg-current translate-y-[5px] rotate-45" />
                  <span className="h-[1.5px] w-full bg-current -translate-y-[5px] -rotate-45" />
                </div>
              </button>
            </div>

            {/* Navigation links with staggered masked entrance */}
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 my-auto">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <div key={item.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.04 * idx,
                        ease: EASINGS.editorial,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-baseline justify-between text-2xl font-heading tracking-tight py-1 focus-visible:outline-2 focus-visible:outline-accent ${
                          isActive ? "text-text font-medium" : "text-muted hover:text-text"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          0{idx + 1}
                        </span>
                      </a>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer Status & Socials */}
            <div className="border-t border-border pt-6 flex flex-col gap-4 text-xs font-mono text-muted">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-text">{siteConfig.availability}</span>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-text transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
