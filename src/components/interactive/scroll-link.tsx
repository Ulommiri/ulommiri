"use client";

import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function ScrollLink({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(href);
        onNavigate?.();
      }}
      className={cn(
        "group/link relative inline-block cursor-pointer overflow-hidden",
        className
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 block translate-y-full text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-y-0">
          {children}
        </span>
      </span>
    </a>
  );
}
