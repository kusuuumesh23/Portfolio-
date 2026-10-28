"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="cursor-pointer inline-flex items-center gap-2 border border-border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-text hover:border-text transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {resolvedTheme === "dark" ? (
        <>
          <Sun className="h-3.5 w-3.5 text-accent" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-accent" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}
