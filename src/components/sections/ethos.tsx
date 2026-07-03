import { Monogram } from "@/components/brand/monogram";
import { Marquee } from "@/components/motion/marquee";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { SectionLabel } from "@/components/layout/section-heading";
import { ethos } from "@/data/site";

export function Ethos() {
	return (
		<section
			id="house"
			className="relative overflow-hidden border-t border-border bg-obsidian py-28 md:py-44"
		>
			<div className="pointer-events-none absolute inset-0 flex items-center opacity-[0.03]">
				<Marquee duration={60} className="w-full">
					<span className="font-display text-[18vw] leading-none whitespace-nowrap text-ivory">
						UL&#7884;MMIRI · A HOUSE HELD BY WATER ·&nbsp;
					</span>
				</Marquee>
			</div>

			<div className="relative mx-auto max-w-5xl px-6 md:px-12">
				<div className="mb-14 flex items-center justify-between">
					<SectionLabel>{ethos.eyebrow}</SectionLabel>
					<Monogram className="h-10 text-gold/70" />
				</div>

				<ScrollRevealText
					text={ethos.body}
					className="text-balance text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.2] font-light text-ivory"
				/>

				<div className="mt-16 flex items-center gap-5">
					<span className="font-display text-xl text-gold italic">
						{ethos.signature}
					</span>
				</div>
			</div>
		</section>
	);
}
