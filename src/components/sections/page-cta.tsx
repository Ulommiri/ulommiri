import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { Monogram } from "@/components/brand/monogram";

type PageCtaProps = {
	eyebrow?: string;
	title: string | string[];
	body?: string;
	ctaLabel?: string;
	ctaHref?: string;
};

export function PageCta({
	eyebrow = "Stay",
	title,
	body,
	ctaLabel = "Book your stay",
	ctaHref = "/reserve",
}: PageCtaProps) {
	return (
		<section className="relative overflow-hidden border-t border-border bg-obsidian py-28 md:py-40">
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<Monogram className="h-[70vh] text-gold/[0.03]" />
			</div>
			<div className="pointer-events-none absolute -top-32 left-1/2 h-140 w-140 -translate-x-1/2 rounded-full bg-copper/12 blur-[120px]" />

			<div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
				<Reveal>
					<span className="eyebrow text-gold">{eyebrow}</span>
				</Reveal>
				<AnimatedHeading
					text={title}
					className="mt-8 text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] font-light text-ivory"
				/>
				{body && (
					<Reveal delay={0.15}>
						<p className="mx-auto mt-8 max-w-lg text-pretty text-base leading-relaxed text-ivory/65">
							{body}
						</p>
					</Reveal>
				)}
				<Reveal delay={0.25}>
					<div className="mt-12">
						<CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
