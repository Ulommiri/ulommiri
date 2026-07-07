"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function FilmModal({
	open,
	onClose,
	src,
	poster,
}: {
	open: boolean;
	onClose: () => void;
	src: string;
	poster?: string;
}) {
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		window.__lenis?.stop();
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", onKey);
			window.__lenis?.start();
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
					onClick={onClose}
					className="fixed inset-0 z-100 flex items-center justify-center bg-obsidian/92 px-4 backdrop-blur-sm md:px-8"
				>
					<button
						onClick={onClose}
						aria-label="Close film"
						className="z-10 absolute top-6 right-6 flex size-11 cursor-pointer items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-obsidian md:top-5 md:right-4"
					>
						<X className="size-5" />
					</button>

					<motion.div
						initial={{ scale: 0.96, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.96, opacity: 0 }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
						onClick={(e) => e.stopPropagation()}
						className="relative aspect-video w-full max-w-6xl overflow-hidden bg-obsidian shadow-2xl"
					>
						<video
							src={src}
							poster={poster}
							controls
							autoPlay
							playsInline
							className="h-full w-full object-contain"
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
