export type ExperienceType =
  | "education"
  | "milestone"
  | "hackathon"
  | "opensource"
  | "project";

export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  place: string;
  type: ExperienceType;
  typeLabel: string;
  description: string;
  link?: string;
  current?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: "nst-first-year",
    year: "2024 — Present",
    title: "First-Year Student",
    place: "Newton School of Technology",
    type: "education",
    typeLabel: "Education",
    description:
      "First-year undergraduate curriculum focusing on computer science, algorithms, software design, and artificial intelligence.",
    current: true,
  },
  {
    id: "hackathon-placeholder",
    year: "2024",
    title: "University Hackathon Participant [EDIT ME]",
    place: "Campus Hack 2024 [EDIT ME]",
    type: "hackathon",
    typeLabel: "Hackathon",
    description:
      "Collaborated in a 24-hour sprint building an accessible web prototype with minimal latency and high contrast standards. [EDIT ME]",
  },
  {
    id: "opensource-placeholder",
    year: "2024",
    title: "Open Source Contributor [EDIT ME]",
    place: "Developer Community [EDIT ME]",
    type: "opensource",
    typeLabel: "Open Source",
    description:
      "Triaged issues, authored unit test cases, and refined documentation for developer tooling repositories. [EDIT ME]",
  },
  {
    id: "notable-project-placeholder",
    year: "2024",
    title: "Architectural Showcase [EDIT ME]",
    place: "Independent Project [EDIT ME]",
    type: "project",
    typeLabel: "Notable Project",
    description:
      "Built a production-grade web project focusing on editorial typography, fluid layouts, and zero cumulative layout shift. [EDIT ME]",
  },
  {
    id: "milestone-placeholder",
    year: "2024",
    title: "Portfolio System Architecture [EDIT ME]",
    place: "Design & Engineering Milestone",
    type: "milestone",
    typeLabel: "Milestone",
    description:
      "Engineered an ultra-minimal editorial portfolio utilizing GSAP ScrollTrigger and Motion physics. [EDIT ME]",
  },
];
