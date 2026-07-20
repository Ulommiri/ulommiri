"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { cn } from "@/lib/utils";
import type { HouseInteriorContent } from "@/sanity/content";

type HouseGalleryProps = {
	label: string;
	title: [string, string];
	items: HouseInteriorContent[];
};

const SPANS = [4, 2, 2, 4, 3, 3];

const RATIOS: Record<number, string> = {
	2: "md:aspect-3/4",
	3: "md:aspect-4/3",
	4: "md:aspect-16/10",
	5: "md:aspect-16/9",
	6: "md:aspect-21/9",
};

function layout(count: number) {
	const spans: number[] = [];
	let filled = 0;
	for (let i = 0; i < count; i++) {
		const isLast = i === count - 1;
		const remaining = 6 - (filled % 6);
		const span = isLast ? remaining : SPANS[i % SPANS.length];
		spans.push(span);
		filled += span;
	}
	return spans;
}

export function HouseGallery({ label, title, items }: HouseGalleryProps) {
	if (!items.length) return null;

	const spans = layout(items.length);

	return (
		<section className="border-t border-border bg-obsidian py-24 md:py-32">
			<div className="mx-auto max-w-360 px-6 md:px-12">
				<div className="max-w-2xl">
					<SectionLabel>{label}</SectionLabel>
					<AnimatedHeading
						text={[title[0], title[1]]}
						as="h2"
						delay={0.1}
						className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-light text-ivory"
					/>
				</div>

				<div className="mt-16 grid gap-4 md:grid-cols-6 md:gap-6">
					{items.map((item, i) => (
						<figure
							key={`${item.caption}-${i}`}
							className={cn(
								"group",
								spans[i] === 2 && "md:col-span-2",
								spans[i] === 3 && "md:col-span-3",
								spans[i] === 4 && "md:col-span-4",
								spans[i] === 5 && "md:col-span-5",
								spans[i] === 6 && "md:col-span-6"
							)}
						>
							<div
								className={cn(
									"relative aspect-4/3 overflow-hidden bg-espresso",
									RATIOS[spans[i]]
								)}
							>
								<motion.div
									className="absolute inset-0"
									initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
									whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
									viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
									transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
								>
									<Image
										src={item.src}
										alt={item.alt}
										fill
										placeholder={typeof item.src === "string" ? "empty" : "blur"}
										sizes={`(max-width: 768px) 100vw, ${Math.round((spans[i] / 6) * 100)}vw`}
										className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
									/>
								</motion.div>
								<div className="absolute inset-0 bg-copper/10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
							</div>
							{item.caption && (
								<Reveal delay={0.1}>
									<figcaption className="mt-4 text-[0.7rem] tracking-[0.25em] text-brass uppercase">
										{item.caption}
									</figcaption>
								</Reveal>
							)}
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
