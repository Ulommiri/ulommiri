import Image from "next/image";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { galleryImages } from "@/data/site";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative border-t border-border bg-espresso py-28 md:py-40"
    >
      <div className="mx-auto max-w-360 px-6 md:px-12">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <AnimatedHeading
              text={["The house,", "in glimpses"]}
              className="mt-8 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light text-ivory"
              lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
            />
          </div>
          <Reveal>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/55">
              Light, water and shadow move through Ul&#7884;mmiri all day. These
              are a few of the hours worth staying for.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-12 gap-3 md:auto-rows-[240px] md:gap-4">
          {galleryImages.map((image, i) => (
            <Reveal
              key={image.alt}
              delay={(i % 3) * 0.08}
              className={cn(
                "group relative overflow-hidden bg-obsidian",
                image.className
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-copper/25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-[0.65rem] tracking-[0.2em] text-ivory/80 uppercase opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2">
                {image.alt}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
