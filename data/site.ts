export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  heroIntro: string;
  headlinePrimary: string;
  headlineSecondary: string;
  statement: string;
  bio: string[];
  email: string;
  location: string;
  timezone: string;
  status: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  education: {
    institution: string;
    level: string;
    degree?: string;
    dates?: string;
  };
  seo: {
    title: string;
    titleTemplate: string;
    description: string;
    siteUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Kusumesh",
  initials: "K",
  role: "First-year student at Newton School of Technology",
  heroIntro: "HEY, I'M KUSUMESH",
  headlinePrimary: "CREATIVE",
  headlineSecondary: "DEVELOPER.",
  statement: "I build thoughtful digital experiences through code, creativity, and curiosity.",
  bio: [
    "I'm a first-year student exploring the intersection of modern frontend engineering, typography, and interactive motion systems. [EDIT ME]",
    "Focusing on clean software architecture, craft, and building web products that feel tactile and responsive. [EDIT ME]",
  ],
  email: "kusumesh.talokar@example.com [EDIT ME]",
  location: "Pune, India [EDIT ME]",
  timezone: "Asia/Kolkata [EDIT ME]",
  status: "Currently building exploratory web experiments and mastering motion design [EDIT ME]",
  availability: "Available for summer internships & collaborations [EDIT ME]",
  socials: {
    github: "https://github.com/kusumesh [EDIT ME]",
    linkedin: "https://linkedin.com/in/kusumesh [EDIT ME]",
    twitter: "https://x.com/kusumesh [EDIT ME]",
  },
  education: {
    institution: "Newton School of Technology",
    level: "First year",
    degree: "Computer Science & AI [EDIT ME]",
    dates: "2024 — Present [EDIT ME]",
  },
  seo: {
    title: "Kusumesh — First-year student at Newton School of Technology",
    titleTemplate: "%s | Kusumesh",
    description: "Personal portfolio of Kusumesh, a first-year student at Newton School of Technology. Ultra-minimal editorial portfolio featuring interactive motion, web development, and engineering craft.",
    siteUrl: "https://kusumesh.dev",
  },
};
