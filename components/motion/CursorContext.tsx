"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type CursorVariant = "default" | "hover" | "text" | "hidden";

export interface CursorState {
  variant: CursorVariant;
  text?: string;
}

interface CursorContextValue {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
  isAvailable: boolean;
}

const CursorContext = createContext<CursorContextValue>({
  cursorState: { variant: "default" },
  setCursorVariant: () => {},
  resetCursor: () => {},
  isAvailable: false,
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: "default",
  });

  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotion();
  const isAvailable = !isTouch && !prefersReducedMotion;

  const setCursorVariant = useCallback(
    (variant: CursorVariant, text?: string) => {
      setCursorState({ variant, text });
    },
    []
  );

  const resetCursor = useCallback(() => {
    setCursorState({ variant: "default", text: undefined });
  }, []);

  // Event delegation to automatically pick up data-cursor and data-cursor-text attributes
  useEffect(() => {
    if (!isAvailable || typeof window === "undefined") return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest<HTMLElement>("[data-cursor]");
      const cursorTextEl = target.closest<HTMLElement>("[data-cursor-text]");

      if (cursorTextEl) {
        const text = cursorTextEl.getAttribute("data-cursor-text") || "VIEW";
        setCursorState({ variant: "text", text });
      } else if (cursorEl) {
        const variant =
          (cursorEl.getAttribute("data-cursor") as CursorVariant) || "hover";
        setCursorState({ variant });
      } else if (target.closest("a, button, [role='button']")) {
        setCursorState({ variant: "hover" });
      } else {
        setCursorState({ variant: "default" });
      }
    };

    const handleMouseLeaveDoc = () => {
      setCursorState({ variant: "hidden" });
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
    };
  }, [isAvailable]);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setCursorVariant,
        resetCursor,
        isAvailable,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor(): CursorContextValue {
  return useContext(CursorContext);
}
