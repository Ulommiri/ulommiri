import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { offerings } from "@/data/site";

export function Rituals() {
  return (
    <section
      id="rituals"
      className="relative border-t border-border bg-obsidian py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-360 gap-16 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionLabel>Rituals</SectionLabel>
          <AnimatedHeading
            text={["Rituals of", "water & fire"]}
            className="mt-8 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light text-ivory"
            lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/60">
              The house is less a hotel than a series of small ceremonies &mdash;
              things to sink into, one unhurried hour at a time.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {offerings.map((offering) => (
            <li key={offering.index}>
              <Reveal y={20}>
                <div className="group flex cursor-pointer items-start gap-6 border-t border-border py-8 transition-colors duration-500 last:border-b hover:border-gold/40 md:gap-10 md:py-10">
                  <span className="font-display text-lg text-brass transition-colors duration-500 group-hover:text-gold">
                    {offering.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-3xl leading-none text-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-4xl">
                        {offering.title}
                      </h3>
                      <ArrowUpRight className="size-6 shrink-0 text-brass opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold group-hover:opacity-100" />
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/55 md:text-base">
                      {offering.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
