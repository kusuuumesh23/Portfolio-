"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

// Register ScrollTrigger once safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  lock?: boolean;
}

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion is requested or coarse touch device, do not run smooth scroll engine
    if (prefersReducedMotion || isTouch || typeof window === "undefined") {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with ScrollTrigger
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // Drive Lenis directly from GSAP ticker for a single unified animation clock
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, isTouch]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "auto" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            const top =
              el.getBoundingClientRect().top +
              window.scrollY +
              (options?.offset || 0);
            window.scrollTo({ top, behavior: "auto" });
          }
        } else if (target instanceof HTMLElement) {
          const top =
            target.getBoundingClientRect().top +
            window.scrollY +
            (options?.offset || 0);
          window.scrollTo({ top, behavior: "auto" });
        }
      }
    },
    []
  );

  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  const contextValue = useMemo<SmoothScrollContextValue>(
    () => ({
      get lenis() {
        return lenisRef.current;
      },
      scrollTo,
      stop,
      start,
    }),
    [scrollTo, stop, start]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}
