"use client";

import { motion, type Variants } from "framer-motion";
import { createElement } from "react";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const word: Variants = {
  hidden: { y: "140%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedHeading({
  text,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  once = true,
}: AnimatedHeadingProps) {
  const lines = Array.isArray(text) ? text : [text];

  return createElement(
    motion[as],
    {
      className: cn("font-display", className),
      variants: container(stagger, delay),
      initial: "hidden",
      whileInView: "visible",
      viewport: { once, margin: "-10% 0px -10% 0px" },
    },
    lines.map((line, i) => (
      <span key={i} className={cn("block", lineClassName)}>
        {line.split(" ").map((w, j) => (
          <span
            key={j}
            className="mr-[0.26em] inline-block overflow-hidden pb-[0.22em] align-bottom last:mr-0"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    ))
  );
}
