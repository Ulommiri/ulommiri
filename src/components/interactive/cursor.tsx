"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      hovering = Boolean(interactive);
    };

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.22;
      ring.y += (pos.y - ring.y) * 0.22;
      const scale = hovering ? 1.9 : 1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = hovering ? "0.9" : "0.5";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hovering ? 0 : 1})`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-90 hidden md:block">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-9 rounded-full border border-gold/70 transition-[opacity] duration-300 will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-1.5 rounded-full bg-gold will-change-transform"
      />
    </div>
  );
}
