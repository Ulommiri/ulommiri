import { Monogram } from "@/components/brand/monogram";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import type { ReserveContent } from "@/sanity/content";

export function Reserve({ reserve }: { reserve: ReserveContent }) {
  return (
    <section
      id="reserve"
      className="relative overflow-hidden border-t border-border bg-obsidian py-32 md:py-48"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Monogram className="h-[80vh] text-gold/[0.04]" />
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-copper/15 blur-[120px]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="eyebrow text-gold">{reserve.eyebrow}</span>
        </Reveal>
        <AnimatedHeading
          text={reserve.headline}
          className="mt-8 text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] font-light text-ivory"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-lg text-pretty text-base leading-relaxed text-ivory/65">
            {reserve.body}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <CtaButton href="/reserve">{reserve.cta}</CtaButton>
            <span className="text-[0.65rem] tracking-[0.25em] text-ivory/40 uppercase">
              {reserve.note}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
