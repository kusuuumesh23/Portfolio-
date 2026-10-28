"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useLocalTime } from "@/hooks/useLocalTime";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const { time, isMounted } = useLocalTime(siteConfig.timezone);
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    scrollTo(0);
  };

  return (
    <footer className="w-full border-t border-border bg-bg text-muted py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        {/* Left: Copyright & Name */}
        <div className="flex flex-wrap items-center gap-2 text-center md:text-left select-none">
          <span className="text-text font-medium">{siteConfig.name}</span>
          <span className="text-border">/</span>
          <span>&copy; {currentYear}</span>
          <span className="text-border hidden sm:inline">/</span>
          <span className="text-muted/70 hidden sm:inline">All data driven from /data</span>
        </div>

        {/* Center: Live Local Time */}
        <div className="flex items-center gap-2 select-none" aria-label={`Current local time in ${siteConfig.location}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="uppercase text-muted/80">{siteConfig.location.split(",")[0]}:</span>
          <span className="text-text font-medium tabular-nums">
            {isMounted ? time : "--:-- --"}
          </span>
        </div>

        {/* Right: Back-to-Top Button */}
        <div>
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Scroll back to top of page"
            className="group flex items-center gap-2 py-1 px-2 -mr-2 text-muted hover:text-text transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent rounded-[3px]"
          >
            <span>Back to top</span>
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="text-accent transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
