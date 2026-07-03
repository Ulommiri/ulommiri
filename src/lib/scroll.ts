import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSection(hash: string) {
  if (typeof window === "undefined") return;
  const target = document.querySelector(hash);
  if (!target) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -20 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
