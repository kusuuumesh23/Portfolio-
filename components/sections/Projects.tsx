"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function GithubIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { SectionHeader } from "@/components/motion/SectionHeader";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Aspect ratio configurations to alternate layout rhythm
const ASPECT_RATIOS = [
  "aspect-[16/10]",
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[3/2]",
];

interface ProjectImageProps {
  project: Project;
  priority: boolean;
  aspectClass: string;
}

function ProjectImage({ project, priority, aspectClass }: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`project-image-frame relative w-full overflow-hidden rounded-[10px] border border-border bg-surface-subtle ${aspectClass} select-none group/img`}
    >
      {!hasError && project.image ? (
        <div className="project-inner-img relative h-full w-full">
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
            onError={() => setHasError(true)}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
          {/* Subtle gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : (
        /* Tasteful Typographic Fallback Placeholder */
        <div className="flex h-full w-full flex-col justify-between p-8 bg-surface-subtle font-mono text-muted border border-dashed border-border/80">
          <div className="flex justify-between items-center text-xs tracking-widest uppercase">
            <span>{project.slug}</span>
            <span>{project.year}</span>
          </div>
          <div className="my-auto py-6">
            <span className="font-heading text-2xl md:text-3xl text-text font-medium block mb-2">
              {project.title}
            </span>
            <span className="text-xs uppercase tracking-wider text-accent">
              Editorial Canvas Preview
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-muted/70">
            <span>{project.stack.slice(0, 3).join(" · ")}</span>
            <span>NO IMAGE ASSET</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const projectRows = sectionRef.current.querySelectorAll<HTMLElement>(".project-row");

      projectRows.forEach((row) => {
        // Staggered metadata reveal
        const metaItems = row.querySelectorAll(".project-meta-item");
        if (metaItems.length > 0) {
          gsap.fromTo(
            metaItems,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        // Image frame clip-path wipe reveal
        const imageFrame = row.querySelector<HTMLElement>(".project-image-frame");
        if (imageFrame) {
          gsap.fromTo(
            imageFrame,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              duration: 1.05,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: imageFrame,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // Subtle parallax scrub on the inner image (desktop only)
        const innerImg = row.querySelector<HTMLElement>(".project-inner-img");
        if (!isTouch && innerImg && imageFrame) {
          gsap.fromTo(
            innerImg,
            { y: -24, scale: 1.05 },
            {
              y: 24,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: imageFrame,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isTouch] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 md:py-32 max-w-6xl mx-auto border-t border-border"
    >
      {/* Section Header */}
      <SectionHeader
        number="02"
        title="SELECTED WORK."
        category="Featured Projects"
      />

      {/* Large Editorial Rows (Not Cards) */}
      <div className="flex flex-col">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          const aspectClass = ASPECT_RATIOS[idx % ASPECT_RATIOS.length];
          const formattedIndex = String(idx + 1).padStart(2, "0");
          // Linked to project.liveUrl until /projects/[slug] route is built in Phase 8
          const targetUrl = project.liveUrl;

          return (
            <article
              key={project.slug}
              data-cursor-text="VIEW PROJECT"
              className={`project-row group border-t border-border py-16 md:py-24 first:border-t-0 ${
                idx === 2 ? "lg:pt-28" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Column: Text Info */}
                <div
                  className={`flex flex-col justify-between ${
                    isEven
                      ? "lg:col-span-5 lg:order-1"
                      : "lg:col-span-5 lg:order-2"
                  }`}
                >
                  {/* Top Meta: Oversized index + Year & Role */}
                  <div className="project-meta-item flex items-baseline justify-between mb-6 pb-4 border-b border-border/60">
                    <span className="font-mono text-4xl md:text-6xl font-light text-muted/30 select-none tracking-tighter">
                      {formattedIndex}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-xs text-muted">
                      <span>{project.year}</span>
                      {project.role && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          <span className="text-accent">{project.role}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Animated Title */}
                  <div className="project-meta-item">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live project (opens in new tab)`}
                      className="group/title inline-flex items-center gap-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-text hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="transition-transform duration-300 group-hover/title:translate-x-2">
                        {project.title}
                      </span>
                      <ArrowUpRight
                        size={24}
                        aria-hidden="true"
                        className="opacity-0 -translate-x-2 translate-y-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all duration-300 text-accent flex-shrink-0"
                      />
                    </a>
                  </div>

                  {/* Short Description */}
                  <p className="project-meta-item body-base text-muted leading-relaxed mt-4 mb-8 select-text">
                    {project.description}
                  </p>

                  {/* Stack as Typographic List (Pill-free) */}
                  <div className="project-meta-item mb-8">
                    <span className="label-mono text-muted/80 block mb-2.5">
                      Technologies
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted">
                      {project.stack.map((tech, i) => (
                        <span key={tech} className="inline-flex items-center gap-2.5">
                          <span className="text-text/90 font-medium">{tech}</span>
                          {i < project.stack.length - 1 && (
                            <span className="text-border select-none" aria-hidden="true">
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links: Live Demo & GitHub */}
                  <div className="project-meta-item flex items-center gap-6 pt-4 border-t border-border/60 text-xs font-mono">
                    <AnimatedLink
                      href={project.liveUrl}
                      external
                      ariaLabel={`Open live demo for ${project.title} in new tab`}
                      className="gap-1.5 text-text hover:text-accent font-medium uppercase tracking-wider"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      <span>Live Demo</span>
                    </AnimatedLink>

                    <AnimatedLink
                      href={project.githubUrl}
                      external
                      ariaLabel={`Open source code for ${project.title} on GitHub in new tab`}
                      className="gap-1.5 text-muted hover:text-text tracking-wider"
                    >
                      <GithubIcon size={13} />
                      <span>Source Code</span>
                    </AnimatedLink>
                  </div>
                </div>

                {/* Column: Large Preview Image */}
                <div
                  className={`${
                    isEven
                      ? "lg:col-span-7 lg:order-2"
                      : "lg:col-span-7 lg:order-1"
                  }`}
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} preview (opens in new tab)`}
                    className="block focus-visible:outline-2 focus-visible:outline-accent rounded-[10px]"
                  >
                    <ProjectImage
                      project={project}
                      priority={idx === 0}
                      aspectClass={aspectClass}
                    />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
