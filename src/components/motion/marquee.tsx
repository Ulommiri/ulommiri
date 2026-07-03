import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
};

export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex shrink-0 animate-[marquee_linear_infinite] items-center gap-[var(--marquee-gap,4rem)] pr-[var(--marquee-gap,4rem)] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
