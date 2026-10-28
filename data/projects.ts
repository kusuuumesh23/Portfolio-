export interface Project {
  slug: string;
  title: string;
  year: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  role?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "kinetic-type-lab",
    title: "Kinetic Type Lab [EDIT ME]",
    year: "2024",
    description: "An experimental typographic playground exploring variable fonts, spring physics, and fluid clamp layouts. [EDIT ME]",
    stack: ["TypeScript", "Next.js", "GSAP", "Tailwind CSS"],
    image: "/images/projects/project-01.webp",
    liveUrl: "https://example.com/kinetic-type-lab [EDIT ME]",
    githubUrl: "https://github.com/kusumesh/kinetic-type-lab [EDIT ME]",
    role: "Frontend & Creative Direction",
    featured: true,
  },
  {
    slug: "mono-canvas",
    title: "Mono Canvas [EDIT ME]",
    year: "2024",
    description: "Minimalist browser-based vector sketchbook with procedural grid snapping and SVG export engine. [EDIT ME]",
    stack: ["TypeScript", "Canvas API", "Web Audio", "Vite"],
    image: "/images/projects/project-02.webp",
    liveUrl: "https://example.com/mono-canvas [EDIT ME]",
    githubUrl: "https://github.com/kusumesh/mono-canvas [EDIT ME]",
    role: "Full Stack Engineer",
    featured: true,
  },
  {
    slug: "synapse-audio",
    title: "Synapse Visualizer [EDIT ME]",
    year: "2024",
    description: "Real-time FFT audio visualizer built with Web Audio API, low-overhead canvas shaders, and zero layout shift. [EDIT ME]",
    stack: ["Web Audio API", "GLSL", "React", "Lenis"],
    image: "/images/projects/project-03.webp",
    liveUrl: "https://example.com/synapse-audio [EDIT ME]",
    githubUrl: "https://github.com/kusumesh/synapse-audio [EDIT ME]",
    role: "Audio & Motion Engineer",
    featured: true,
  },
  {
    slug: "craft-notes",
    title: "Craft Notes [EDIT ME]",
    year: "2024",
    description: "Local-first markdown notebook featuring instantaneous full-text fuzzy search and bidirectional wiki links. [EDIT ME]",
    stack: ["Next.js", "IndexedDB", "Tailwind CSS", "Motion"],
    image: "/images/projects/project-04.webp",
    liveUrl: "https://example.com/craft-notes [EDIT ME]",
    githubUrl: "https://github.com/kusumesh/craft-notes [EDIT ME]",
    role: "Product & Architecture",
    featured: true,
  },
];
