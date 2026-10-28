"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime client exception:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center max-w-xl mx-auto w-full select-none"
    >
      <div className="label-mono text-accent mb-3">Render Exception</div>

      <h1 className="heading-md md:display-lg text-text font-medium tracking-tight mb-4">
        An unexpected error occurred.
      </h1>

      <p className="body-base text-muted max-w-md mb-8 leading-relaxed">
        The application encountered an issue while rendering this view. State can be restored by resetting the tree.
      </p>

      {error.digest && (
        <div className="font-mono text-[10px] text-muted/60 mb-8 border border-border px-3 py-1 bg-surface-subtle/50 rounded">
          Digest: {error.digest}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Reset / Try Again MagneticButton */}
        <MagneticButton
          onClick={() => reset()}
          ariaLabel="Reset error boundary and reload state"
          radius={80}
          className="bg-text text-bg hover:bg-accent hover:text-white px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-medium transition-colors duration-200"
        >
          <span className="flex items-center gap-2">
            <RotateCcw size={14} aria-hidden="true" />
            <span>Try Again</span>
          </span>
        </MagneticButton>

        {/* Home fallback button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-border hover:border-text font-mono text-xs uppercase tracking-wider text-muted hover:text-text transition-colors duration-200 rounded-[3px] focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Home size={14} aria-hidden="true" />
          <span>Home</span>
        </Link>
      </div>
    </main>
  );
}
