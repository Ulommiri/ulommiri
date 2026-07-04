"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type FeatureRowProps = {
	index: string;
	title: string;
	tagline?: string;
	description: string;
	meta?: string;
	image: StaticImageData;
	reverse?: boolean;
};

export function FeatureRow({
	index,
	title,
	tagline,
	description,
	meta,
	image,
	reverse = false,
}: FeatureRowProps) {
	return (
		<div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
			<div
				className={cn(
					"group relative aspect-4/5 overflow-hidden bg-espresso",
					reverse && "md:order-2"
				)}
			>
				<motion.div
					className="absolute inset-0"
					initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
					whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
					viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
					transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
				>
					<motion.div
						className="absolute inset-0"
						initial={{ scale: 1.25 }}
						whileInView={{ scale: 1 }}
						viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
						transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
					>
						<Image
							src={image}
							alt={title}
							fill
							placeholder="blur"
							sizes="(max-width: 768px) 100vw, 50vw"
							className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
						/>
					</motion.div>
				</motion.div>
				<div className="absolute inset-0 bg-copper/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
			</div>

			<div className={cn(reverse && "md:order-1")}>
				<Reveal>
					<span className="font-display text-xl text-brass">{index}</span>
				</Reveal>
				{tagline && (
					<Reveal delay={0.05}>
						<p className="eyebrow mt-4 text-gold">{tagline}</p>
					</Reveal>
				)}
				<AnimatedHeading
					text={title}
					as="h2"
					delay={0.1}
					className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] font-light text-ivory"
				/>
				<Reveal delay={0.15}>
					<p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ivory/65">
						{description}
					</p>
				</Reveal>
				{meta && (
					<Reveal delay={0.2}>
						<p className="mt-8 flex items-center gap-3 text-[0.7rem] tracking-[0.25em] text-brass uppercase">
							{meta}
						</p>
					</Reveal>
				)}
			</div>
		</div>
	);
}
