import React from "react";

export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-6 select-none"
    >
      {/* Hairline Progress Indicator */}
      <div className="relative h-[2px] w-28 bg-border overflow-hidden rounded-full">
        <div className="h-full w-full bg-accent animate-pulse" />
      </div>
      <div className="font-mono text-[11px] text-muted tracking-widest uppercase">
        Loading...
      </div>
    </div>
  );
}
