"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { TextLink } from "@/components/interactive/text-link";
import { CtaButton } from "@/components/ui/cta-button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, reserveCta } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 400);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b transition-all duration-700",
          scrolled
            ? "border-border bg-obsidian/70 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      />
      <nav className="mx-auto flex h-20 max-w-360 items-center justify-between px-6 md:h-24 md:px-12">
        <Logo />

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <TextLink
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-[0.18em] text-ivory/80 uppercase"
            >
              {link.label}
            </TextLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <CtaButton tone="outline" withArrow={false} magnetic href={reserveCta.href}>
            {reserveCta.label}
          </CtaButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="cursor-pointer text-ivory lg:hidden"
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="px-8 py-10">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Logo className="mb-14" />
            <div className="flex flex-col gap-7">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group/link flex items-baseline gap-3 font-display text-3xl text-ivory transition-colors hover:text-gold"
                >
                  <span className="text-sm text-gold">0{i + 1}</span>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <CtaButton
                tone="solid"
                magnetic={false}
                className="w-full"
                href={reserveCta.href}
                onClick={() => setOpen(false)}
              >
                {reserveCta.label}
              </CtaButton>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
