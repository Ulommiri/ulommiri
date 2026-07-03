import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="408 58 84 164"
      fill="none"
      className={cn("h-full w-auto", className)}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="420" y1="70" x2="480" y2="70" />
        <path d="M 424 96 L 424 148 Q 424 176 450 176 Q 476 176 476 148 L 476 96" />
      </g>
      <circle cx="450" cy="204" r="7" fill="currentColor" />
    </svg>
  );
}
