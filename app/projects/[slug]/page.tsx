import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedLink } from "@/components/motion/AnimatedLink";

// Statically generate all project case study routes
export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

// Dynamic Open Graph and SEO metadata per project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} — Case Study`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [project.image],
    },
  };
}

function GithubIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = projects[projectIndex];
  const nextProject: Project = projects[(projectIndex + 1) % projects.length];
  const projectNumber = String(projectIndex + 1).padStart(2, "0");

  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-text">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-6 py-28 md:py-36">
        {/* Breadcrumb / Back Link */}
        <div className="mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-text transition-colors group focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-accent uppercase tracking-widest mb-4">
            <span>Project {projectNumber}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{project.year}</span>
          </div>

          <h1 className="display-lg md:display-xl text-text font-medium tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="body-lg text-muted max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Meta Bar: Role, Stack, Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-border mb-16 font-mono text-xs">
          {/* Role */}
          <div>
            <span className="text-muted block uppercase tracking-wider mb-1.5">Role</span>
            <span className="text-text font-medium">{project.role || "Frontend & Motion"}</span>
          </div>

          {/* Year */}
          <div>
            <span className="text-muted block uppercase tracking-wider mb-1.5">Timeline</span>
            <span className="text-text font-medium">{project.year}</span>
          </div>

          {/* Stack */}
          <div className="md:col-span-1">
            <span className="text-muted block uppercase tracking-wider mb-1.5">Technologies</span>
            <span className="text-text font-medium leading-relaxed">
              {project.stack.join(" · ")}
            </span>
          </div>

          {/* Action Links */}
          <div className="flex flex-col gap-2">
            <span className="text-muted block uppercase tracking-wider mb-1.5">Artifacts</span>
            <div className="flex items-center gap-5">
              <AnimatedLink
                href={project.liveUrl}
                external
                ariaLabel={`View ${project.title} live deployment (opens in new tab)`}
                className="gap-1 text-text hover:text-accent font-medium uppercase tracking-wider"
              >
                <ExternalLink size={12} aria-hidden="true" />
                <span>Live Demo</span>
              </AnimatedLink>

              <AnimatedLink
                href={project.githubUrl}
                external
                ariaLabel={`View ${project.title} GitHub repository (opens in new tab)`}
                className="gap-1 text-muted hover:text-text uppercase tracking-wider"
              >
                <GithubIcon size={12} />
                <span>Code</span>
              </AnimatedLink>
            </div>
          </div>
        </div>

        {/* Hero Preview Image Frame */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px] border border-border bg-surface-subtle mb-20">
          <Image
            src={project.image}
            alt={`Full preview of ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
        </div>

        {/* Narrative Sections (Placeholder Copy clearly marked with [EDIT ME]) */}
        <div className="space-y-16 max-w-3xl mb-24">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="label-mono text-accent">01 / Overview & Problem</div>
            <h2 className="heading-md text-text">The Challenge & Objectives</h2>
            <p className="body-base text-muted leading-relaxed select-text">
              Modern digital interfaces often prioritize flashy visual effects over comprehension and user ergonomics. For {project.title}, the objective was to construct an uncompromisingly responsive tool that feels immediate and tactile while preserving strict accessibility and zero cumulative layout shift. [EDIT ME]
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="label-mono text-accent">02 / Technical Architecture</div>
            <h2 className="heading-md text-text">Design Systems & Engineering Decisions</h2>
            <p className="body-base text-muted leading-relaxed select-text">
              Built on Next.js App Router and TypeScript, every component adheres to strict token-driven styling and semantic markup. Animation loops are unified to eliminate micro-stutters: transforms and opacity changes are executed through hardware-accelerated compositor layers, leaving the main UI thread unburdened. [EDIT ME]
            </p>
            <div className="p-6 border border-border bg-surface-subtle/40 rounded-[8px] font-mono text-xs space-y-2 text-muted">
              <div className="text-text font-medium">Key Engineering Specs: [EDIT ME]</div>
              <ul className="list-disc list-inside space-y-1 text-muted/90">
                <li>Strict zero layout shift architecture (CLS &lt; 0.02)</li>
                <li>Single animation clock driving smooth scrolling and scrubbed triggers</li>
                <li>Hardware-accelerated CSS transforms and composited opacity</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="label-mono text-accent">03 / Outcomes & Reflections</div>
            <h2 className="heading-md text-text">Key Takeaways & Craft</h2>
            <p className="body-base text-muted leading-relaxed select-text">
              The finished system balances editorial restraint with dynamic tactile responsiveness. Keyboard-only navigation pathways and reduced motion queries were verified from day one, proving that high-end motion design and strict accessibility elevate each other rather than conflict. [EDIT ME]
            </p>
          </section>
        </div>

        {/* Next Project Teaser Footer Link */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/#projects"
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-text transition-colors"
          >
            &larr; Return to Selected Work
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col sm:items-end text-left sm:text-right"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-accent mb-1 flex items-center gap-1 sm:justify-end">
              <span>Next Case Study</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
            <span className="font-heading text-xl sm:text-2xl font-medium text-text group-hover:text-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
