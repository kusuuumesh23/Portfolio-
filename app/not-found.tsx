import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="label-mono text-muted mb-4">Error 404</div>
      <h1 className="display-xl mb-4">Page not found.</h1>
      <p className="body-base text-muted max-w-md mb-8">
        The requested resource does not exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 border border-border text-sm font-medium hover:border-text transition-colors"
      >
        Back to {siteConfig.name}&apos;s Portfolio
      </Link>
    </main>
  );
}
