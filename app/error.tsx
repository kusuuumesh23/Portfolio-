"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="label-mono text-accent mb-4">Error State</div>
      <h1 className="heading-md mb-4">An unexpected error occurred.</h1>
      <p className="body-base text-muted max-w-md mb-8">
        We encountered an error while rendering this page.
      </p>
      <button
        onClick={() => reset()}
        className="cursor-pointer inline-flex items-center px-6 py-3 border border-border text-sm font-medium hover:border-text transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
