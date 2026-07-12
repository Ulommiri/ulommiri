"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import type { MediaImage } from "@/sanity/content";
import "@/lib/scroll";

type GalleryHeading = {
	eyebrow: string;
	titleLine1: string;
	titleLine2: string;
};

const BLOCK_W = 2360;
const BLOCK_H = 2620;

const tiles = [
	{ x: 80, y: 140, w: 400 },
	{ x: 620, y: 60, w: 480 },
	{ x: 1240, y: 200, w: 380 },
	{ x: 1760, y: 80, w: 440 },
	{ x: 140, y: 980, w: 360 },
	{ x: 640, y: 1120, w: 460 },
	{ x: 1260, y: 940, w: 400 },
	{ x: 1820, y: 1060, w: 360 },
	{ x: 100, y: 1840, w: 440 },
	{ x: 660, y: 1960, w: 380 },
	{ x: 1220, y: 1800, w: 460 },
	{ x: 1800, y: 1900, w: 400 },
];

const wrap = (value: number, max: number) => ((value % max) + max) % max;

const subscribeResize = (callback: () => void) => {
	window.addEventListener("resize", callback);
	return () => window.removeEventListener("resize", callback);
};

const getScale = () =>
	Math.max(0.52, window.innerWidth / 1500, window.innerHeight / 2400);

function Tile({
	image,
	index,
	scale,
	onOpen,
}: {
	image: MediaImage;
	index: number;
	scale: number;
	onOpen: (index: number) => void;
}) {
	const tile = tiles[index];
	const ratio = image.width / image.height;

	return (
		<button
			type="button"
			onClick={() => onOpen(index)}
			className="group absolute cursor-pointer overflow-hidden bg-espresso"
			style={{
				left: tile.x * scale,
				top: tile.y * scale,
				width: tile.w * scale,
				height: (tile.w / ratio) * scale,
			}}
		>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				draggable={false}
				sizes="(max-width: 768px) 45vw, 480px"
				className="pointer-events-none object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
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
		</button>
	);
}

function Lightbox({
	index,
	items,
	onClose,
	onStep,
}: {
	index: number | null;
	items: MediaImage[];
	onClose: () => void;
	onStep: (direction: 1 | -1) => void;
}) {
	return (
		<AnimatePresence>
			{index !== null && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					onClick={onClose}
					className="fixed inset-0 z-100 flex items-center justify-center bg-obsidian/90 px-4 backdrop-blur-xl md:px-16"
				>
					<motion.figure
						key={index}
						initial={{ opacity: 0, y: 26, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						onClick={(e) => e.stopPropagation()}
						className="relative w-full max-w-5xl"
					>
						<Image
							src={items[index].src}
							alt={items[index].alt}
							width={items[index].width}
							height={items[index].height}
							placeholder={
								typeof items[index].src === "string" ? "empty" : "blur"
							}
							sizes="(max-width: 768px) 92vw, 64rem"
							className="mx-auto h-auto max-h-[74vh] w-auto object-contain"
						/>
						<figcaption className="mt-5 flex items-baseline justify-between gap-4">
							<span className="font-display text-lg text-ivory md:text-xl">
								{items[index].alt}
							</span>
							<span className="font-display text-sm text-brass">
								{String(index + 1).padStart(2, "0")} /{" "}
								{String(items.length).padStart(2, "0")}
							</span>
						</figcaption>
					</motion.figure>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onStep(-1);
						}}
						className="absolute top-1/2 left-4 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/40 font-display text-xl text-ivory transition-colors duration-500 hover:bg-gold hover:text-obsidian md:left-8"
						aria-label="Previous image"
					>
						←
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onStep(1);
						}}
						className="absolute top-1/2 right-4 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/40 font-display text-xl text-ivory transition-colors duration-500 hover:bg-gold hover:text-obsidian md:right-8"
						aria-label="Next image"
					>
						→
					</button>
					<button
						type="button"
						onClick={onClose}
						className="absolute top-6 right-4 cursor-pointer text-[0.65rem] tracking-[0.3em] text-ivory/70 uppercase transition-colors duration-300 hover:text-gold md:right-8"
					>
						Close
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export function GalleryCanvas({
	items,
	heading,
}: {
	items: MediaImage[];
	heading: GalleryHeading;
}) {
	const worldRef = useRef<HTMLDivElement>(null);
	const zoomRef = useRef<HTMLDivElement>(null);
	const pos = useRef({
		tx: 0,
		ty: 0,
		cx: 0,
		cy: 0,
		vx: 0,
		vy: 0,
		px: 0,
		py: 0,
		moved: 0,
		down: false,
		zoom: 1,
	});
	const [interacted, setInteracted] = useState(false);
	const [active, setActive] = useState<number | null>(null);
	const reduce = useReducedMotion();
	const scale = useSyncExternalStore(subscribeResize, getScale, () => 1);

	const step = (direction: 1 | -1) =>
		setActive((current) =>
			current === null
				? current
				: (current + direction + items.length) % items.length
		);

	useEffect(() => {
		if (reduce) return;

		const onMove = (e: PointerEvent) => {
			const p = pos.current;
			if (!p.down) return;
			const dx = e.clientX - p.px;
			const dy = e.clientY - p.py;
			p.tx += dx;
			p.ty += dy;
			p.vx = dx;
			p.vy = dy;
			p.moved += Math.abs(dx) + Math.abs(dy);
			p.px = e.clientX;
			p.py = e.clientY;
		};
		const onUp = () => {
			const p = pos.current;
			if (!p.down) return;
			p.down = false;
			p.tx += p.vx * 12;
			p.ty += p.vy * 12;
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onUp);

		let raf = 0;
		const loop = () => {
			const p = pos.current;
			const s = getScale();
			if (!p.down) {
				p.tx -= 0.24;
				p.ty -= 0.14;
			}
			p.cx += (p.tx - p.cx) * 0.085;
			p.cy += (p.ty - p.cy) * 0.085;

			const bw = BLOCK_W * s;
			const bh = BLOCK_H * s;
			if (worldRef.current) {
				worldRef.current.style.transform = `translate3d(${
					wrap(p.cx, bw) - bw
				}px, ${wrap(p.cy, bh) - bh}px, 0)`;
			}

			const speed = Math.abs(p.tx - p.cx) + Math.abs(p.ty - p.cy);
			p.zoom += (Math.max(0.9, 1 - speed * 0.00028) - p.zoom) * 0.07;
			if (zoomRef.current) {
				zoomRef.current.style.transform = `scale(${p.zoom})`;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
			cancelAnimationFrame(raf);
		};
	}, [reduce]);

	useEffect(() => {
		const lenis = window.__lenis;
		if (active !== null) lenis?.stop();
		else lenis?.start();
		return () => lenis?.start();
	}, [active]);

	useEffect(() => {
		if (active === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActive(null);
			if (e.key === "ArrowRight") step(1);
			if (e.key === "ArrowLeft") step(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active]);

	const openTile = (index: number) => {
		if (pos.current.moved < 8) setActive(index);
	};

	if (reduce) {
		return (
			<>
				<section className="border-t border-border bg-obsidian pt-36 pb-24 md:pt-44">
					<div className="mx-auto max-w-360 px-6 md:px-12">
						<span className="eyebrow text-gold">{heading.eyebrow}</span>
						<h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-light text-ivory">
							{heading.titleLine1}
							<span className="block text-gold italic">
								{heading.titleLine2}
							</span>
						</h1>
						<GalleryGrid
							items={items}
							onSelect={setActive}
							className="mt-16"
						/>
					</div>
				</section>
				<Lightbox
					index={active}
					items={items}
					onClose={() => setActive(null)}
					onStep={step}
				/>
			</>
		);
	}

	const blockW = BLOCK_W * scale;
	const blockH = BLOCK_H * scale;

	return (
		<>
			<section
				onPointerDown={(e) => {
					const p = pos.current;
					p.down = true;
					p.px = e.clientX;
					p.py = e.clientY;
					p.vx = 0;
					p.vy = 0;
					p.moved = 0;
					setInteracted(true);
				}}
				className="relative h-svh min-h-150 cursor-grab touch-pan-y overflow-hidden bg-obsidian select-none active:cursor-grabbing"
			>
				<div ref={zoomRef} className="absolute inset-0 will-change-transform">
					<div ref={worldRef} className="absolute top-0 left-0 will-change-transform">
						{[0, 1].flatMap((row) =>
							[0, 1].map((col) => (
								<div
									key={`${row}-${col}`}
									className="absolute"
									style={{
										left: col * blockW,
										top: row * blockH,
										width: blockW,
										height: blockH,
									}}
								>
									{items.map((image, i) => (
										<Tile
											key={image.alt}
											image={image}
											index={i}
											scale={scale}
											onOpen={openTile}
										/>
									))}
								</div>
							))
						)}
					</div>
				</div>

				<div
					className="pointer-events-none absolute inset-0 z-5"
					style={{ boxShadow: "inset 0 0 180px 40px rgba(10, 5, 2, 0.85)" }}
				/>
				<div className="pointer-events-none absolute inset-0 z-5 opacity-[0.05] mix-blend-overlay grain" />

				<motion.div
					animate={{ opacity: interacted ? 0 : 1 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
				>
					<div
						className="absolute inset-0"
						style={{
							background:
								"radial-gradient(ellipse at center, rgba(10, 5, 2, 0.65) 0%, rgba(10, 5, 2, 0.2) 45%, transparent 70%)",
						}}
					/>
					<span className="eyebrow relative text-gold">
						{heading.eyebrow}
					</span>
					<h1 className="relative mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] font-light text-ivory">
						{heading.titleLine1}
						<span className="block text-gold italic">
							{heading.titleLine2}
						</span>
					</h1>
					<p className="relative mt-8 text-[0.65rem] tracking-[0.3em] text-ivory/60 uppercase">
						Drag to wander · Click to linger
					</p>
				</motion.div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-6 pb-6 text-[0.6rem] tracking-[0.3em] text-ivory/50 uppercase md:px-12">
					<span>An endless drift</span>
					<span>Scroll to continue</span>
				</div>
			</section>

			<Lightbox
				index={active}
				items={items}
				onClose={() => setActive(null)}
				onStep={step}
			/>
		</>
	);
}
