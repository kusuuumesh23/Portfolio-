export interface SkillItem {
  name: string;
  highlight?: boolean;
  note?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "TypeScript", highlight: true, note: "Strict typing & modular interfaces" },
      { name: "React / Next.js", highlight: true, note: "App Router & Server Components" },
      { name: "Tailwind CSS", note: "Utility architecture & design tokens" },
      { name: "Motion & GSAP", highlight: true, note: "Physics-based & scroll-driven motion" },
      { name: "Semantic HTML / a11y", note: "Screen readers & keyboard accessibility" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", highlight: true, note: "REST APIs & asynchronous I/O" },
      { name: "Express / Fastify", note: "Lightweight microservices" },
      { name: "PostgreSQL", note: "Relational schema design & queries" },
      { name: "RESTful Architecture", note: "Clean API contracts" },
    ],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    skills: [
      { name: "Python", highlight: true, note: "Data scripting & model evaluation" },
      { name: "LLM APIs & Prompting", note: "Structured output & function calling" },
      { name: "NumPy & Pandas", note: "Data manipulation & analytics" },
      { name: "Foundational ML", note: "Supervised learning & neural networks" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", highlight: true, note: "Trunk-based workflow & PRs" },
      { name: "VS Code & Zed", note: "Modern developer ergonomics" },
      { name: "Figma", note: "Design systems & wireframing" },
      { name: "Vercel & CI/CD", note: "Automated previews & deployments" },
    ],
  },
];
