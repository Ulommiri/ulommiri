import Link from "next/link";
import { Monogram } from "./monogram";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Ulọmmiri — home"
      className={cn(
        "group inline-flex items-center gap-3 text-ivory",
        className
      )}
    >
      <Monogram className="h-8 text-gold transition-colors duration-500 group-hover:text-ivory" />
      {showWordmark && (
        <span className="font-display text-xl leading-none tracking-[0.32em] text-ivory">
          UL&#7884;MMIRI
        </span>
      )}
    </Link>
  );
}
