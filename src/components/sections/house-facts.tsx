import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import type { HouseFactContent } from "@/sanity/content";

type HouseFactsProps = {
	label: string;
	title: [string, string];
	items: HouseFactContent[];
	spaces: string[];
};

export function HouseFacts({ label, title, items, spaces }: HouseFactsProps) {
	if (!items.length && !spaces.length) return null;

	return (
		<section className="border-t border-border bg-obsidian py-24 md:py-32">
			<div className="mx-auto grid max-w-360 gap-16 px-6 md:grid-cols-12 md:px-12">
				<div className="md:col-span-5">
					<SectionLabel>{label}</SectionLabel>
					<AnimatedHeading
						text={[title[0], title[1]]}
						as="h2"
						delay={0.1}
						className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-light text-ivory"
					/>
				</div>

				<div className="md:col-span-7">
					{items.length > 0 && (
						<dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
							{items.map((fact, i) => (
								<Reveal key={fact.label} delay={i * 0.05}>
									<div className="border-t border-border pt-4">
										<dt className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
											{fact.label}
										</dt>
										<dd className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-light text-ivory">
											{fact.value}
										</dd>
									</div>
								</Reveal>
							))}
						</dl>
					)}

					{spaces.length > 0 && (
						<Reveal delay={0.2}>
							<ul className="mt-14 flex flex-wrap gap-x-3 gap-y-3">
								{spaces.map((space) => (
									<li
										key={space}
										className="border border-border px-4 py-2 text-sm text-ivory/70"
									>
										{space}
									</li>
								))}
							</ul>
						</Reveal>
					)}
				</div>
			</div>
		</section>
	);
}
