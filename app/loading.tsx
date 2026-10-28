export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[50vh] w-full items-center justify-center"
    >
      <div className="label-mono text-muted animate-pulse">Loading...</div>
    </div>
  );
}
