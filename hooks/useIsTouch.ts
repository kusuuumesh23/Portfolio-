"use client";

import { useEffect, useState } from "react";

/**
 * Detects touch / coarse pointer input devices.
 * Used to disable custom cursors, magnetic pull physics, and hover-dependent states.
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;
      const touchPoints = navigator.maxTouchPoints > 0;
      setIsTouch(hasCoarsePointer || noHover || touchPoints);
    };

    checkTouch();

    const pointerMedia = window.matchMedia("(pointer: coarse)");
    const hoverMedia = window.matchMedia("(hover: none)");

    pointerMedia.addEventListener("change", checkTouch);
    hoverMedia.addEventListener("change", checkTouch);

    return () => {
      pointerMedia.removeEventListener("change", checkTouch);
      hoverMedia.removeEventListener("change", checkTouch);
    };
  }, []);

  return isTouch;
}
