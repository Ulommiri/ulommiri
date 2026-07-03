import dynamic from "next/dynamic";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";

const WaterCanvas = dynamic(() =>
  import("@/components/interactive/water-canvas").then((m) => m.WaterCanvas)
);

export function Water() {
  return (
    <section
      id="water"
      className="relative flex h-svh min-h-160 items-center justify-center overflow-hidden border-t border-border bg-obsidian"
    >
      <WaterCanvas />
      <div className="absolute inset-0 bg-obsidian/30" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-obsidian via-transparent to-obsidian" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="eyebrow text-gold">The Water</span>
        </Reveal>
        <AnimatedHeading
          text={["Where the water", "remembers", "your name"]}
          as="h2"
          className="mt-8 text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-light text-ivory"
          lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-md text-pretty text-base leading-relaxed text-ivory/70">
            Move through the surface. The water responds to you the way it
            responds to everything at Ulọmmiri — slowly, and without hurry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
