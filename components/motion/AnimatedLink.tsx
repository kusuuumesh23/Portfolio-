"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  underlineClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

export function AnimatedLink({
  href,
  children,
  className = "",
  external = false,
  underlineClassName = "bg-accent",
  onClick,
  ariaLabel,
}: AnimatedLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState<"left" | "right">("left");

  const handleMouseEnter = () => {
    setOrigin("left");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOrigin("right");
    setIsHovered(false);
  };

  const content = (
    <span
      className={`group relative inline-flex items-center text-inherit transition-colors ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">{children}</span>
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          style={{ transformOrigin: origin === "left" ? "left" : "right" }}
          className={`absolute bottom-0 left-0 h-[1.5px] w-full ${underlineClassName} pointer-events-none`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        />
      )}
    </span>
  );

  const sharedProps = {
    onClick,
    "aria-label": ariaLabel,
    className: "inline-block focus-visible:outline-2 focus-visible:outline-accent",
  };

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        {...sharedProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {content}
    </Link>
  );
}
