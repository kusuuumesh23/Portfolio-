import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/motion/Preloader";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((mod) => mod.Projects)
);
const Skills = dynamic(
  () => import("@/components/sections/Skills").then((mod) => mod.Skills)
);
const Experience = dynamic(
  () => import("@/components/sections/Experience").then((mod) => mod.Experience)
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.Contact)
);

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
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
