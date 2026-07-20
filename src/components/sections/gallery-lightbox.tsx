"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaImage } from "@/sanity/content";
import "@/lib/scroll";

export function useLightbox(count: number) {
	const [active, setActive] = useState<number | null>(null);

	const step = useCallback(
		(direction: 1 | -1) =>
			setActive((current) =>
				current === null ? current : (current + direction + count) % count
			),
		[count]
	);

	const close = useCallback(() => setActive(null), []);

	useEffect(() => {
		const lenis = window.__lenis;
		if (active !== null) lenis?.stop();
		else lenis?.start();
		return () => lenis?.start();
	}, [active]);

	useEffect(() => {
		if (active === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			if (e.key === "ArrowRight") step(1);
			if (e.key === "ArrowLeft") step(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active, close, step]);

	return { active, open: setActive, close, step };
}

export function Lightbox({
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
					key="lightbox"
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
							placeholder={typeof items[index].src === "string" ? "empty" : "blur"}
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
