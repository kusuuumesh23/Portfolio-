"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the currently active section in the viewport using IntersectionObserver.
 * Does not use scroll event listeners to preserve high scroll performance.
 */
export function useActiveSection(
  sectionIds: string[],
  defaultSection = "home"
): string {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Find the visible section with highest intersection ratio or highest on page
        if (visibleSections.size > 0) {
          let bestId = "";
          let maxRatio = -1;

          visibleSections.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              bestId = id;
            }
          });

          if (bestId) {
            setActiveSection(bestId);
          }
        }
      },
      {
        // Give priority to sections in the upper half of the viewport
        rootMargin: "-15% 0px -40% 0px",
        threshold: [0.1, 0.3, 0.6, 0.9],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
