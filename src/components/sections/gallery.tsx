"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { SectionLabel } from "@/components/layout/section-heading";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import type { MediaImage } from "@/sanity/content";
import { cn } from "@/lib/utils";

const SPACING = 650;
const FIRST_Z = 430;
const END_DISTANCE = 430;

const scatter = [
	{ x: -16, y: -10 },
	{ x: 17, y: 8 },
	{ x: -14, y: 12 },
	{ x: 16, y: -12 },
	{ x: -18, y: -2 },
	{ x: 13, y: 12 },
	{ x: -15, y: 6 },
	{ x: 18, y: -8 },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const fadeFor = (distance: number) => {
	if (distance <= 70) return 0;
	const near = clamp01((distance - 70) / 240);
	const far = clamp01((2.7 * SPACING - distance) / (1.15 * SPACING));
	return near * far;
};

const panelFadeFor = (distance: number) =>
	clamp01((END_DISTANCE + 0.9 * SPACING - distance) / (0.7 * SPACING));

function TunnelItem({
	image,
	index,
	setRef,
}: {
	image: MediaImage;
	index: number;
	setRef: (el: HTMLElement | null) => void;
}) {
	const landscape = image.width > image.height;
	const spot = scatter[index % scatter.length];
	const z = FIRST_Z + index * SPACING;
	const opacity = fadeFor(z);

	return (
		<figure
			ref={setRef}
			className="absolute top-1/2 left-1/2 will-change-[opacity]"
			style={{
				transform: `translate(-50%, -50%) translate3d(${spot.x}vw, ${spot.y}vh, ${-z}px)`,
				opacity,
				visibility: opacity < 0.02 ? "hidden" : "visible",
			}}
		>
			<div
				className={cn(
					"relative overflow-hidden bg-espresso",
					landscape
						? "aspect-3/2 w-[clamp(17rem,46vw,36rem)]"
						: "aspect-3/4 w-[clamp(13rem,30vw,23rem)]"
				)}
			>
				<Image
					src={image.src}
					alt={image.alt}
					fill
					sizes="(max-width: 768px) 80vw, 36rem"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-copper/15 mix-blend-multiply" />
				<figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 bg-linear-to-t from-obsidian/70 to-transparent px-5 pt-12 pb-4">
					<span className="font-display text-base text-ivory/90 md:text-lg">
						{image.alt}
					</span>
					<span className="font-display text-sm text-gold">
						{String(index + 1).padStart(2, "0")}
					</span>
				</figcaption>
			</div>
		</figure>
	);
}

export function Gallery({
	items: allItems,
	limit = 6,
}: {
	items: MediaImage[];
	limit?: number;
}) {
	const items = allItems.slice(0, limit);
	const sectionRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<(HTMLElement | null)[]>([]);
	const reduce = useReducedMotion();

	const panelZ = FIRST_Z + items.length * SPACING;
	const travel = panelZ - END_DISTANCE;

	useEffect(() => {
		if (reduce) return;

		const section = sectionRef.current;
		const track = trackRef.current;
		const overlay = overlayRef.current;
		const panel = panelRef.current;
		const counter = counterRef.current;
		const line = lineRef.current;
		const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
		if (!section || !track || !overlay || !panel || !counter || !line) return;

		const apply = (camZ: number) => {
			const sway =
				Math.sin(camZ / 850) * Math.min(window.innerWidth * 0.03, 46);
			track.style.transform = `translate3d(${sway}px, 0px, ${camZ}px)`;

			nodes.forEach((node, i) => {
				const o = fadeFor(FIRST_Z + i * SPACING - camZ);
				node.style.opacity = String(o);
				node.style.visibility = o < 0.02 ? "hidden" : "visible";
			});

			const panelOpacity = panelFadeFor(panelZ - camZ);
			panel.style.opacity = String(panelOpacity);
			panel.style.visibility = panelOpacity < 0.02 ? "hidden" : "visible";

			const progress = camZ / travel;
			overlay.style.opacity = String(1 - clamp01(progress / 0.1));
			line.style.transform = `scaleX(${clamp01(progress)})`;
			const index = Math.min(
				nodes.length - 1,
				Math.max(0, Math.round(camZ / SPACING))
			);
			counter.textContent = String(index + 1).padStart(2, "0");
		};

		const state = { z: 0 };
		const ctx = gsap.context(() => {
			gsap.to(state, {
				z: travel,
				ease: "none",
				onUpdate: () => apply(state.z),
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${Math.round(travel)}`,
					pin: true,
					scrub: 1.1,
					anticipatePin: 1,
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
	}, [reduce, items.length, panelZ, travel]);

	if (reduce) {
		return (
			<section
				id="gallery"
				className="border-t border-border bg-obsidian py-28 md:py-36"
			>
				<div className="mx-auto max-w-360 px-6 md:px-12">
					<SectionLabel>Gallery</SectionLabel>
					<AnimatedHeading
						text={["The House,", "In Glimpses"]}
						className="mt-8 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light text-ivory"
						lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
					/>
					<GalleryGrid items={items} className="mt-16" />
					<Link
						href="/gallery"
						className="mt-14 inline-flex cursor-pointer items-center gap-3 border border-gold/40 px-8 py-4 text-xs tracking-[0.3em] text-ivory uppercase transition-colors duration-500 hover:bg-gold hover:text-obsidian"
					>
						Enter the gallery
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section
			ref={sectionRef}
			id="gallery"
			className="relative border-t border-border bg-obsidian"
		>
			<div
				className="relative h-svh min-h-150 overflow-hidden"
				style={{ perspective: "1100px" }}
			>
				<div className="pointer-events-none absolute top-1/4 -left-40 h-160 w-160 rounded-full bg-copper/10 blur-[140px]" />
				<div className="pointer-events-none absolute -right-40 bottom-1/4 h-160 w-160 rounded-full bg-gold/6 blur-[150px]" />

				<div
					ref={trackRef}
					className="absolute inset-0 will-change-transform"
					style={{ transformStyle: "preserve-3d" }}
				>
					{items.map((image, i) => (
						<TunnelItem
							key={image.alt}
							image={image}
							index={i}
							setRef={(el) => {
								itemRefs.current[i] = el;
							}}
						/>
					))}

					<div
						ref={panelRef}
						className="absolute top-1/2 left-1/2 flex w-max max-w-[90vw] flex-col items-center text-center"
						style={{
							transform: `translate(-50%, -50%) translate3d(0, 0, ${-panelZ}px)`,
							opacity: 0,
							visibility: "hidden",
						}}
					>
						<span className="eyebrow text-gold">The full gallery</span>
						<p className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-light text-ivory">
							Every hour,
							<span className="block text-gold italic">kept in light</span>
						</p>
						<Link
							href="/gallery"
							className="mt-12 inline-flex cursor-pointer items-center gap-3 border border-gold/40 px-10 py-5 text-xs tracking-[0.3em] text-ivory uppercase transition-colors duration-500 hover:bg-gold hover:text-obsidian"
						>
							Enter the gallery
						</Link>
					</div>
				</div>

				<div
					ref={overlayRef}
					className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-28 md:px-12 md:pt-32"
				>
					<SectionLabel>Gallery</SectionLabel>
					<AnimatedHeading
						text={["The house,", "in glimpses"]}
						className="mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-light text-ivory"
						lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
					/>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-6 px-6 pb-8 md:px-12">
					<span className="font-display text-sm text-gold">
						<span ref={counterRef}>01</span>
						<span className="text-ivory/40"> / {String(items.length).padStart(2, "0")}</span>
					</span>
					<div className="relative h-px flex-1 bg-ivory/15">
						<div
							ref={lineRef}
							className="absolute inset-0 origin-left bg-gold/70"
							style={{ transform: "scaleX(0)" }}
						/>
					</div>
					<span className="hidden text-[0.6rem] tracking-[0.3em] text-ivory/50 uppercase md:block">
						Scroll — the house drifts past
					</span>
				</div>
			</div>
		</section>
	);
}
