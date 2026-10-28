"use client";

import { useSyncExternalStore } from "react";

export interface LocalTimeData {
  time: string;
  timeZone: string;
  isMounted: boolean;
}

const emptySubscribe = () => () => {};

function subscribeTime(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getTimeSnapshot(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return new Date().toLocaleTimeString();
  }
}

/**
 * Returns current local time in a given timezone.
 * Uses useSyncExternalStore for strict React 19 hydration safety with zero cascading renders.
 */
export function useLocalTime(timeZone = "Asia/Kolkata"): LocalTimeData {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const time = useSyncExternalStore(
    subscribeTime,
    () => getTimeSnapshot(timeZone),
    () => "--:-- --"
  );

  return { time, timeZone, isMounted };
}
