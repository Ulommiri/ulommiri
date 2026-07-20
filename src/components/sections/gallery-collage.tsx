"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { Lightbox, useLightbox } from "@/components/sections/gallery-lightbox";
import type { MediaImage } from "@/sanity/content";

type GalleryCollageProps = {
	label: string;
	title: [string, string];
	items: MediaImage[];
};

const COLUMN_DRIFT = [-90, 60, -40];

function toColumns(items: MediaImage[], count: number) {
	const columns: { image: MediaImage; index: number }[][] = Array.from(
		{ length: count },
		() => []
	);
	items.forEach((image, index) => {
		columns[index % count].push({ image, index });
	});
	return columns;
}

function useColumnCount() {
	const subscribe = useCallback((onChange: () => void) => {
		const query = window.matchMedia("(min-width: 768px)");
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	return useSyncExternalStore(
		subscribe,
		() => (window.matchMedia("(min-width: 768px)").matches ? 3 : 2),
		() => 3
	);
}

export function GalleryCollage({ label, title, items }: GalleryCollageProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const columnCount = useColumnCount();
	const { active, open, close, step } = useLightbox(items.length);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const columns = toColumns(items, columnCount);

	if (!items.length) return null;

	return (
		<>
			<section
				ref={sectionRef}
				className="relative overflow-hidden border-t border-border bg-obsidian py-24 md:py-32"
			>
				<div className="mx-auto max-w-360 px-6 md:px-12">
					<div className="max-w-2xl">
						<SectionLabel>{label}</SectionLabel>
						<AnimatedHeading
							text={[title[0], title[1]]}
							as="h2"
							delay={0.1}
							className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-light text-ivory"
						/>
						<Reveal delay={0.2}>
							<p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ivory/65">
								Every room, every view — the whole house in one place.
							</p>
						</Reveal>
					</div>

					<div className="mt-16 grid grid-cols-2 items-start gap-3 md:grid-cols-3 md:gap-6">
						{columns.map((column, columnIndex) => (
							<CollageColumn
								key={columnIndex}
								column={column}
								columnIndex={columnIndex}
								progress={scrollYProgress}
								reduce={Boolean(reduce)}
								onSelect={open}
							/>
						))}
					</div>
				</div>
			</section>

			<Lightbox index={active} items={items} onClose={close} onStep={step} />
		</>
	);
}

function CollageColumn({
	column,
	columnIndex,
	progress,
	reduce,
	onSelect,
}: {
	column: { image: MediaImage; index: number }[];
	columnIndex: number;
	progress: ReturnType<typeof useScroll>["scrollYProgress"];
	reduce: boolean;
	onSelect: (index: number) => void;
}) {
	const drift = COLUMN_DRIFT[columnIndex % COLUMN_DRIFT.length];
	const y = useTransform(progress, [0, 1], [drift, -drift]);

	return (
		<motion.div
			style={reduce ? undefined : { y }}
			className="flex flex-col gap-3 will-change-transform md:gap-6"
		>
			{column.map(({ image, index }) => (
				<CollageTile
					key={`${image.alt}-${index}`}
					image={image}
					index={index}
					reduce={reduce}
					onSelect={onSelect}
				/>
			))}
		</motion.div>
	);
}

function CollageTile({
	image,
	index,
	reduce,
	onSelect,
}: {
	image: MediaImage;
	index: number;
	reduce: boolean;
	onSelect: (index: number) => void;
}) {
	const ratio = image.width && image.height ? image.width / image.height : 1;

	return (
		<motion.button
			type="button"
			onClick={() => onSelect(index)}
			initial={reduce ? undefined : { opacity: 0, scale: 0.94, filter: "blur(6px)" }}
			whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
			transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
			style={{ aspectRatio: ratio }}
			className="group relative w-full cursor-pointer overflow-hidden bg-espresso"
		>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				placeholder={typeof image.src === "string" ? "empty" : "blur"}
				sizes="(max-width: 768px) 46vw, 30vw"
				className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-copper/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
			<div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-linear-to-t from-obsidian/80 to-transparent px-4 pt-10 pb-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
				<span className="truncate font-display text-sm text-ivory">
					{image.alt}
				</span>
				<span className="font-display text-xs text-gold">
					{String(index + 1).padStart(2, "0")}
				</span>
			</div>
		</motion.button>
	);
}
