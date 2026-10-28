"use client";

import React from "react";

// Easily toggle the grain overlay globally from this single flag
export const GRAIN_OVERLAY_ENABLED = true;

/**
 * Subtle noise/grain overlay.
 * Uses a tiny procedural SVG noise filter, fixed to viewport, pointer-events none,
 * with minimal opacity to provide tactile editorial texture without hurting performance.
 */
export function GrainOverlay() {
  if (!GRAIN_OVERLAY_ENABLED) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] dark:opacity-[0.045] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
