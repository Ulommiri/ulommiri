import Image, { type StaticImageData } from "next/image";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
	eyebrow: string;
	title: string | string[];
	subtitle?: string;
	image: StaticImageData;
};

export function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
	return (
		<section className="relative flex h-svh min-h-160 w-full items-end overflow-hidden bg-obsidian">
			<Image
				src={image}
				alt=""
				fill
				priority
				placeholder="blur"
				sizes="100vw"
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-obsidian/55" />
			<div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/25 to-obsidian/50" />
			<div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay grain" />

			<div className="relative z-10 mx-auto w-full max-w-360 px-6 pb-16 md:px-12 md:pb-24">
				<Reveal>
					<span className="flex items-center gap-4 eyebrow text-gold">
						<span className="h-px w-10 bg-gold/50" />
						{eyebrow}
					</span>
				</Reveal>
				<AnimatedHeading
					text={title}
					as="h1"
					delay={0.1}
					className="mt-8 text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] font-light text-ivory"
				/>
				{subtitle && (
					<Reveal delay={0.2}>
						<p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ivory/70">
							{subtitle}
						</p>
					</Reveal>
				)}
			</div>
		</section>
	);
}
