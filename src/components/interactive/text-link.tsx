"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function TextLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group/link relative inline-block cursor-pointer overflow-hidden py-1 text-ivory",
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
    </Link>
  );
}
