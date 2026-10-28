"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-text">
      <Navbar />

      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center max-w-4xl mx-auto w-full select-none"
      >
        {/* Oversized 404 Display Typography */}
        <div
          aria-hidden="true"
          className="font-heading text-8xl sm:text-[11rem] md:text-[15rem] font-bold tracking-tighter text-text/10 leading-none -mb-6 md:-mb-12"
        >
          404
        </div>

        <div className="label-mono text-accent mb-3">Void Space</div>

        <h1 className="display-lg text-text font-medium tracking-tight mb-4">
          Coordinates Not Found.
        </h1>

        <p className="body-base text-muted max-w-md mb-10 leading-relaxed">
          The requested route does not exist or has been relocated within the architecture.
        </p>

        {/* Magnetic Button for Home Navigation */}
        <MagneticButton as="div" radius={90} strength={0.3}>
          <Link
            href="/"
            aria-label="Return to portfolio home page"
            className="bg-text text-bg hover:bg-accent hover:text-white px-8 py-4 text-xs font-mono uppercase tracking-wider font-medium transition-colors duration-200 inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </MagneticButton>
      </main>

      <Footer />
    </div>
  );
}
