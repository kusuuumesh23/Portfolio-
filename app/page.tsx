"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { MagneticButton } from "@/components/motion/MagneticButton";

import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-text">
      <Preloader />
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />

        {/* SECTION: ABOUT */}
        <section
          id="about"
          className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-20 border-t border-border"
        >
          <SectionHeader
            number="01"
            title="MORE THAN / JUST CODE."
            category="About Kusumesh"
          />

          <Reveal direction="up" distance={25}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted">
              <div>
                <p className="body-lg text-text mb-4">
                  {siteConfig.bio[0]}
                </p>
                <p className="body-base">
                  {siteConfig.bio[1]}
                </p>
              </div>

              <div className="border border-border p-6 bg-surface-subtle/30">
                <div className="label-mono text-muted mb-4">Core Philosophy</div>
                <ul className="space-y-3 text-xs font-mono text-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Editorial restraint over sensory overload</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Every motion serves comprehension and hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Accessible, keyboard-first, and zero layout shifts</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION: PROJECTS */}
        <section
          id="projects"
          className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-20 border-t border-border"
        >
          <SectionHeader
            number="02"
            title="SELECTED WORK."
            category="Engineering Portfolio"
          />

          <Reveal direction="up" distance={30}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, idx) => (
                <div
                  key={p.slug}
                  data-cursor-text="VIEW"
                  className="border border-border p-6 flex flex-col justify-between hover:border-text transition-colors bg-surface-subtle/20"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                      <span>0{idx + 1}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="heading-sm text-text mb-2">{p.title}</h3>
                    <p className="body-sm text-muted mb-6">{p.description}</p>
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted">{p.stack.slice(0, 2).join(", ")}</span>
                    <AnimatedLink href={p.githubUrl} external>
                      Source &rarr;
                    </AnimatedLink>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* SECTION: EXPERIENCE */}
        <section
          id="experience"
          className="min-h-[75vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-20 border-t border-border"
        >
          <SectionHeader
            number="03"
            title="TOOLS & JOURNEY."
            category="Background"
          />

          <Reveal direction="up" distance={30}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skills */}
              <div className="border border-border p-6">
                <div className="label-mono text-muted mb-4">Tools of the Trade</div>
                <div className="space-y-4">
                  {skillCategories.map((c) => (
                    <div key={c.id}>
                      <span className="text-xs font-mono uppercase text-accent block mb-1">
                        {c.name}
                      </span>
                      <p className="text-sm text-text">
                        {c.skills.map((s) => s.name).join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience timeline */}
              <div className="border border-border p-6">
                <div className="label-mono text-muted mb-4">Milestones & Education</div>
                <div className="space-y-4">
                  {experiences.map((e) => (
                    <div key={e.id} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
                      <div className="flex items-center justify-between text-xs font-mono text-muted mb-1">
                        <span className="text-text font-medium">{e.title}</span>
                        <span>{e.year}</span>
                      </div>
                      <p className="text-xs text-muted font-mono">{e.place}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION: CONTACT */}
        <section
          id="contact"
          className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-24 border-t border-border"
        >
          <SectionHeader
            number="04"
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
