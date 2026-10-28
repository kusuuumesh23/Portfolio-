"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
  isHovered: boolean;
}

/**
 * Tracks window mouse coordinates throttled via requestAnimationFrame.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: -100,
    y: -100,
    isHovered: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    let latestEvent: MouseEvent | null = null;

    const onMouseMove = (event: MouseEvent) => {
      latestEvent = event;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (latestEvent) {
            setPosition({
              x: latestEvent.clientX,
              y: latestEvent.clientY,
              isHovered: true,
            });
          }
          rafId = null;
        });
      }
    };

    const onMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isHovered: false }));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return position;
}
