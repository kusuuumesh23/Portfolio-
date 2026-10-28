"use client";

import { useSyncExternalStore } from "react";

const subscribeTouch = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const pointerMedia = window.matchMedia("(pointer: coarse)");
  const hoverMedia = window.matchMedia("(hover: none)");
  pointerMedia.addEventListener("change", callback);
  hoverMedia.addEventListener("change", callback);
  return () => {
    pointerMedia.removeEventListener("change", callback);
    hoverMedia.removeEventListener("change", callback);
  };
};

const getTouchSnapshot = () => {
  if (typeof window === "undefined") return false;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const touchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
  return hasCoarsePointer || noHover || touchPoints;
};

/**
 * Detects touch / coarse pointer input devices synchronously with useSyncExternalStore.
 * Used to disable custom cursors, magnetic pull physics, and hover-dependent states.
 */
export function useIsTouch(): boolean {
  return useSyncExternalStore(subscribeTouch, getTouchSnapshot, () => false);
}
