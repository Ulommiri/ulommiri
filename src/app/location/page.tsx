import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { aerialEstate, dockYoga } from "@/assets";

export const metadata: Metadata = {
	title: "Location — Ulọmmiri",
	description:
		"Ulọmmiri sits on the quiet edge of a private lake, wrapped in forest and held by the water.",
};

const details = [
	{
		title: "The Setting",
		body: "Wrapped in old trees, the house sits where a private lawn slips gently into the lake — no through-road, no neighbours in sight, only water and the long green quiet.",
	},
	{
		title: "Getting Here",
		body: "An easy drive from the city and its airport, then a final turn through the trees. Arrivals by water are welcome; a boat waits at the dock.",
	},
	{
		title: "A Private Address",
		body: "Ulọmmiri is a private residence. The exact location and gate details are shared with confirmed guests ahead of arrival.",
	},
];

export default function LocationPage() {
	return (
		<main>
			<PageHero
				eyebrow="Location"
				title={["On the edge", "of the water"]}
				subtitle="Set into the treeline where the lawn meets the lake — private, unhurried, and a world away while still within easy reach."
				image={aerialEstate}
			/>

			<section className="mx-auto max-w-5xl px-6 py-28 md:px-12 md:py-40">
				<SectionLabel>The Setting</SectionLabel>
				<ScrollRevealText
					text="The house keeps its own weather. Forest on three sides, water on the fourth, and a stillness that arrives the moment the trees close behind you."
					className="mt-10 text-balance text-[clamp(1.6rem,4vw,3rem)] leading-[1.2] font-light text-ivory"
				/>
			</section>

			<section className="mx-auto max-w-360 px-6 pb-28 md:px-12 md:pb-32">
				<div className="grid gap-12 border-t border-border pt-14 md:grid-cols-3 md:gap-16">
					{details.map((detail, i) => (
						<Reveal key={detail.title} delay={i * 0.08}>
							<h2 className="font-display text-2xl text-ivory">
								{detail.title}
							</h2>
							<p className="mt-5 text-base leading-relaxed text-ivory/60">
								{detail.body}
							</p>
						</Reveal>
					))}
				</div>
			</section>

			<section className="relative h-svh max-h-200 min-h-125 w-full overflow-hidden">
				<Image
					src={dockYoga}
					alt="Morning on the floating dock"
					fill
					placeholder="blur"
					sizes="100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-obsidian/40" />
				<div className="absolute inset-0 flex items-center justify-center px-6">
					<p className="font-display text-center text-[clamp(1.75rem,5vw,4rem)] leading-tight text-ivory italic">
						Coordinates on request
						<span className="mt-4 block text-base tracking-[0.3em] text-gold/80 not-italic uppercase">
							34°N · 84°W
						</span>
					</p>
				</div>
			</section>

			<PageCta
				title={["Find your way", "to the water"]}
				body="Reserve the house and we will send directions, gate codes and a warm welcome ahead of your arrival."
			/>
		</main>
	);
}
