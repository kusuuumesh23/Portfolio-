import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Preloader } from "@/components/motion/Preloader";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedLink } from "@/components/motion/AnimatedLink";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Preloader />

      {/* Header / Nav Placeholder */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-none py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-heading font-medium tracking-tight text-lg">
            {siteConfig.initials}
          </span>
          <span className="text-muted text-xs font-mono hidden sm:inline">
            / {siteConfig.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedLink href="/dev" className="text-xs font-mono text-accent">
            Motion Lab (/dev)
          </AnimatedLink>
          <span className="inline-flex items-center gap-2 text-xs font-mono text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="hidden md:inline">Phase 1: Motion</span>
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero & Identity Demonstration */}
      <section className="flex-1 px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto w-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="label-mono text-accent">{siteConfig.heroIntro}</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-xs font-mono text-muted">{siteConfig.location}</span>
          </div>

          <h1 className="display-2xl text-text mb-6">
            <SplitText type="words" variant="mask-reveal">
              {`${siteConfig.headlinePrimary} ${siteConfig.headlineSecondary}`}
            </SplitText>
          </h1>

          <p className="body-lg text-muted max-w-2xl mb-8">
            {siteConfig.statement}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted border-t border-b border-border py-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase text-muted block mb-0.5">Role</span>
              <span className="text-text font-medium">{siteConfig.role}</span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <span className="text-xs font-mono uppercase text-muted block mb-0.5">Education</span>
              <span className="text-text font-medium">{siteConfig.education.institution}</span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <span className="text-xs font-mono uppercase text-muted block mb-0.5">Status</span>
              <span className="text-text font-medium">{siteConfig.status}</span>
            </div>
          </div>
        </div>

        {/* Foundation Data Verification Grid with GSAP Reveal */}
        <Reveal direction="up" distance={30} duration={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {/* Projects preview */}
            <div
              data-cursor-text="PROJECTS"
              className="border border-border p-6 rounded-none hover:border-text transition-colors"
            >
              <div className="label-mono text-muted mb-3">Data / Projects ({projects.length})</div>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p.slug} className="text-sm">
                    <span className="text-text font-medium block">{p.title}</span>
                    <span className="text-muted text-xs font-mono">{p.year} &middot; {p.stack.slice(0, 2).join(", ")}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills preview */}
            <div className="border border-border p-6 rounded-none hover:border-text transition-colors">
              <div className="label-mono text-muted mb-3">Data / Skills ({skillCategories.length} categories)</div>
              <ul className="space-y-3">
                {skillCategories.map((c) => (
                  <li key={c.id} className="text-sm">
                    <span className="text-text font-medium block">{c.name}</span>
                    <span className="text-muted text-xs font-mono">
                      {c.skills.map((s) => s.name).slice(0, 3).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience preview */}
            <div className="border border-border p-6 rounded-none hover:border-text transition-colors">
              <div className="label-mono text-muted mb-3">Data / Experience ({experiences.length} entries)</div>
              <ul className="space-y-3">
                {experiences.slice(0, 3).map((e) => (
                  <li key={e.id} className="text-sm">
                    <span className="text-text font-medium block">{e.title}</span>
                    <span className="text-muted text-xs font-mono">{e.place} ({e.year})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-muted gap-4">
          <div>&copy; 2026 {siteConfig.name}. All data loaded from /data.</div>
          <div className="flex items-center gap-6">
            <AnimatedLink href={siteConfig.socials.github} external>
              GitHub
            </AnimatedLink>
            <AnimatedLink href={siteConfig.socials.linkedin} external>
              LinkedIn
            </AnimatedLink>
            <AnimatedLink href={`mailto:${siteConfig.email}`}>
              Email
            </AnimatedLink>
          </div>
        </footer>
      </section>
    </main>
  );
}
