"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/interactive/magnetic";
import { cn } from "@/lib/utils";

type CtaProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: "solid" | "outline";
  withArrow?: boolean;
  magnetic?: boolean;
  className?: string;
};

export function CtaButton({
  children,
  href,
  onClick,
  tone = "solid",
  withArrow = true,
  magnetic = true,
  className,
}: CtaProps) {
  const inner = (
    <Button
      asChild={Boolean(href)}
      onClick={onClick}
      className={cn(
        "relative h-13 cursor-pointer overflow-hidden rounded-none px-8 text-[0.7rem] font-medium tracking-[0.24em] uppercase transition-colors duration-500",
        tone === "solid"
          ? "bg-gold text-obsidian hover:bg-gold"
          : "border border-gold/45 bg-transparent text-ivory hover:bg-transparent",
        className
      )}
    >
      {href ? (
        <Link href={href}>
          <CtaInner tone={tone} withArrow={withArrow}>
            {children}
          </CtaInner>
        </Link>
      ) : (
        <CtaInner tone={tone} withArrow={withArrow}>
          {children}
        </CtaInner>
      )}
    </Button>
  );

  if (!magnetic) return inner;
  return <Magnetic strength={0.3}>{inner}</Magnetic>;
}

function CtaInner({
  children,
  tone,
  withArrow,
}: {
  children: React.ReactNode;
  tone: "solid" | "outline";
  withArrow: boolean;
}) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:translate-y-0",
          tone === "solid" ? "bg-ivory" : "bg-gold"
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-2.5 transition-colors duration-500",
          tone === "outline" && "group-hover/button:text-obsidian"
        )}
      >
        {children}
        {withArrow && (
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
        )}
      </span>
    </>
  );
}
