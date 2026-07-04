"use client";

import { useRef } from "react";
import Image from "next/image";
import {
	motion,
	useScroll,
	useTransform,
	useMotionTemplate,
	useReducedMotion,
} from "framer-motion";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { galleryImages, type GalleryImage } from "@/data/site";
import { cn } from "@/lib/utils";

const alignments = ["justify-start", "justify-end", "justify-center"];

function DepthItem({ image, index }: { image: GalleryImage; index: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.32, 1, 1.06]);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.82, 1],
		[0, 1, 1, 0.5]
	);
	const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
	const blurValue = useTransform(scrollYProgress, [0, 0.45], [16, 0]);
	const filter = useMotionTemplate`blur(${blurValue}px)`;

	const landscape = image.src.width > image.src.height;

	return (
		<div
			ref={ref}
			className={cn(
				"flex min-h-[72vh] items-center px-6 md:px-12",
				alignments[index % alignments.length]
			)}
		>
			<figure className={landscape ? "w-[min(90vw,52rem)]" : "w-[min(76vw,32rem)]"}>
				<div className="mb-4 flex items-baseline justify-between">
					<Reveal y={16}>
						<span className="font-display text-lg text-ivory/90 md:text-xl">
							{image.alt}
						</span>
					</Reveal>
					<span className="font-display text-sm text-brass">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>
				<motion.div
					style={reduce ? undefined : { scale, opacity, y, filter }}
					className="origin-center will-change-transform"
				>
					<div
						className={cn(
							"relative overflow-hidden bg-obsidian",
							landscape ? "aspect-3/2" : "aspect-3/4"
						)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							sizes="(max-width: 768px) 88vw, 52rem"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-copper/15 mix-blend-multiply" />
					</div>
				</motion.div>
			</figure>
		</div>
	);
}

export function Gallery({ limit }: { limit?: number }) {
	const items = limit ? galleryImages.slice(0, limit) : galleryImages;

	return (
		<section
			id="gallery"
			className="relative overflow-hidden border-t border-border bg-obsidian py-28 md:py-40"
		>
			<div className="pointer-events-none absolute top-1/4 -left-40 h-160 w-160 rounded-full bg-copper/10 blur-[140px]" />
			<div className="pointer-events-none absolute -right-40 bottom-1/4 h-160 w-160 rounded-full bg-gold/6 blur-[150px]" />

			<div className="relative mx-auto max-w-360 px-6 md:px-12">
				<div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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
							Light, water and shadow move through Ul&#7884;mmiri all
							day. Scroll, and each hour rises to meet you.
						</p>
					</Reveal>
				</div>
			</div>

			<div className="relative mt-8">
				{items.map((image, i) => (
					<DepthItem key={image.alt} image={image} index={i} />
				))}
			</div>
		</section>
	);
}
