"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionLabel } from "@/components/layout/section-heading";
import { chambers } from "@/data/site";

export function Chambers() {
	const sectionRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [enhanced, setEnhanced] = useState(false);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (reduce.matches) return;
		setEnhanced(true);

		const ctx = gsap.context(() => {
			const track = trackRef.current;
			const section = sectionRef.current;
			if (!track || !section) return;

			const getScrollLength = () => track.scrollWidth - window.innerWidth;

			gsap.to(track, {
				x: () => -getScrollLength(),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${getScrollLength()}`,
					pin: true,
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});
		}, sectionRef);

		const refresh = () => ScrollTrigger.refresh();
		window.addEventListener("load", refresh);

		return () => {
			ctx.revert();
			window.removeEventListener("load", refresh);
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id="chambers"
			className="relative overflow-hidden border-t border-border bg-espresso"
		>
			<div
				ref={trackRef}
				className={
					enhanced
						? "flex h-svh items-center"
						: "flex snap-x snap-mandatory items-center gap-6 overflow-x-auto py-24 md:py-0"
				}
			>
				<IntroPanel />
				{chambers.map((chamber) => (
					<ChamberCard key={chamber.index} chamber={chamber} />
				))}
				<OutroPanel />
			</div>
		</section>
	);
}

function IntroPanel() {
	return (
		<div className="flex h-full w-[85vw] shrink-0 snap-start flex-col justify-center px-6 md:w-160 md:px-24">
			<SectionLabel>The Chambers</SectionLabel>
			<h2 className="mt-8 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-light text-ivory">
				Four ways
				<br />
				to be held
				<span className="text-gold italic"> by water</span>
			</h2>
			<p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/60">
				A small collection of chambers, each turned toward the lake and shaped
				for a different kind of quiet. Scroll to move through them.
			</p>
		</div>
	);
}

function ChamberCard({ chamber }: { chamber: (typeof chambers)[number] }) {
	return (
		<article className="group relative flex h-full w-[85vw] shrink-0 snap-center items-center px-3 md:w-160 md:px-8">
			<div className="relative h-125 w-full overflow-hidden md:h-140">
				<Image
					src={chamber.image}
					alt={chamber.name}
					fill
					sizes="(max-width: 768px) 85vw, 40rem"
					className="object-cover transition-transform duration-1200 ease-luxe group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/10 to-transparent" />
				<div className="absolute inset-0 bg-copper/20 mix-blend-multiply" />

				<span className="absolute top-6 left-6 font-display text-2xl text-ivory/80">
					{chamber.index}
				</span>
				<span className="absolute top-8 right-6 text-[0.6rem] tracking-[0.25em] text-ivory/60 uppercase">
					{chamber.size}
				</span>

				<div className="absolute inset-x-6 bottom-6">
					<p className="eyebrow mb-3 text-gold">{chamber.tagline}</p>
					<h3 className="font-display text-4xl leading-none text-ivory md:text-5xl">
						{chamber.name}
					</h3>
					<p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70 opacity-0 transition-all duration-700 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
						{chamber.description}
					</p>
				</div>
			</div>
		</article>
	);
}

function OutroPanel() {
	return (
		<div className="flex h-full w-[70vw] shrink-0 snap-start items-center px-6 md:w-140 md:px-24">
			<p className="font-display text-3xl leading-snug text-ivory/40 md:text-4xl">
				Every chamber returns you
				<span className="text-gold"> to the same water.</span>
			</p>
		</div>
	);
}
