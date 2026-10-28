"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/data/site";
import { EASINGS } from "@/lib/motion";

const PRELOADER_SESSION_KEY = "kusumesh-preloader-seen";

export interface PreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const emptySubscribe = () => () => {};

export function Preloader({ onComplete, forceShow = false }: PreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if session has already seen the preloader
  const alreadySeen = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return !!sessionStorage.getItem(PRELOADER_SESSION_KEY);
      } catch {
        return false;
      }
    },
    () => false
  );

  const shouldPreload = isMounted && (forceShow || (!prefersReducedMotion && !alreadySeen));

  useEffect(() => {
    if (!shouldPreload) {
      if (isMounted) onComplete?.();
      return;
    }

    const startTime = performance.now();
    const durationMs = 850;

    let animId: number;
    let timerId: NodeJS.Timeout;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (elapsed < durationMs) {
        animId = requestAnimationFrame(frame);
      } else {
        timerId = setTimeout(() => {
          try {
            sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
          } catch {
            // Ignore
          }
          setIsDismissed(true);
          onComplete?.();
        }, 150);
      }
    };

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timerId);
    };
  }, [shouldPreload, isMounted, onComplete]);

  if (!shouldPreload || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-curtain"
        initial={{ opacity: 1, y: "0%" }}
        exit={{
          y: "-100%",
          transition: {
            duration: 0.65,
            ease: EASINGS.reveal,
          },
        }}
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-8 md:p-16 select-none"
      >
        {/* Top meta */}
        <div className="flex items-center justify-between text-xs font-mono uppercase text-muted">
          <span className="tracking-widest">{siteConfig.name}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Initializing</span>
          </span>
        </div>

        {/* Center Monogram */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASINGS.editorial }}
            className="display-xl font-heading font-medium tracking-tighter text-text mb-2"
          >
            {siteConfig.initials}
          </motion.div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">
            {siteConfig.role}
          </div>
        </div>

        {/* Bottom Progress Counter */}
        <div className="flex items-end justify-between border-t border-border pt-4">
          <span className="font-mono text-xs uppercase text-muted tracking-wider">
            {siteConfig.location}
          </span>
          <div className="font-mono text-xl md:text-2xl font-medium tracking-tight text-text tabular-nums">
            {progress < 10 ? `0${progress}` : progress}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
