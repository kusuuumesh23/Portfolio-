"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { MagneticButton } from "@/components/motion/MagneticButton";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-text">
      <Preloader />
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />

        {/* SECTION: CONTACT */}
        <section
          id="contact"
          className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-24 border-t border-border"
        >
          <SectionHeader
            number="05"
            title={"LET'S BUILD\nSOMETHING."}
            category="Inquiries"
          />

          <Reveal direction="up" distance={30}>
            <div className="flex flex-col items-start gap-8">
              <p className="body-lg text-muted max-w-xl">
                Have an idea, an internship opportunity, or want to connect? Let&apos;s talk.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <MagneticButton
                  onClick={() => {
                    window.location.href = `mailto:${siteConfig.email}`;
                  }}
                  className="bg-text text-bg px-8 py-4 text-sm font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  Send Email ({siteConfig.email.split(" ")[0]})
                </MagneticButton>
              </div>

              <div className="flex items-center gap-8 text-sm font-mono pt-8 border-t border-border w-full text-muted">
                <AnimatedLink href={siteConfig.socials.github} external>
                  GitHub
                </AnimatedLink>
                <AnimatedLink href={siteConfig.socials.linkedin} external>
                  LinkedIn
                </AnimatedLink>
                <AnimatedLink href={siteConfig.socials.twitter} external>
                  Twitter / X
                </AnimatedLink>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-4">
        <div>&copy; 2026 {siteConfig.name}. All data loaded from /data.</div>
        <div className="flex items-center gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{siteConfig.education.institution}</span>
        </div>
      </footer>
    </div>
  );
}
