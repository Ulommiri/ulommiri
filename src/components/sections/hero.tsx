"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { CtaButton } from "@/components/ui/cta-button";
import { FilmModal } from "@/components/interactive/film-modal";
import type { HeroContent } from "@/sanity/content";

const CLOUDINARY_UPLOAD = "/video/upload/";

function optimizedVideo(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return url;
	return url.replace(
		CLOUDINARY_UPLOAD,
		`${CLOUDINARY_UPLOAD}q_auto,w_1920,c_limit/`
	);
}

function filmVideo(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return url;
	return url.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}q_auto/`);
}

function posterFrame(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return undefined;
	return url
		.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}so_0,q_auto,f_auto/`)
		.replace(/\.(mp4|webm|mov|m4v)$/i, ".jpg");
}

export function Hero({ hero }: { hero: HeroContent }) {
	const ref = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [loaded, setLoaded] = useState(false);
	const [filmOpen, setFilmOpen] = useState(false);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
	const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
	const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

	const videoSrc = optimizedVideo(hero.videoUrl);
	const poster = posterFrame(hero.videoUrl);
	const filmSrc = filmVideo(hero.filmUrl);
	const filmPoster = posterFrame(hero.filmUrl);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const markLoaded = () => setLoaded(true);
		if (video.readyState >= 2) markLoaded();
		video.addEventListener("loadeddata", markLoaded);

		const attempt = video.play();
		if (attempt) attempt.catch(() => { });

		return () => video.removeEventListener("loadeddata", markLoaded);
	}, []);

	return (
		<section
			ref={ref}
			className="relative h-screen w-full overflow-hidden bg-obsidian"
		// className="relative h-svh min-h-175 w-full overflow-hidden bg-obsidian"
		>
			<motion.div
				style={{
					scale: videoScale,
					y: videoY,
					backgroundImage: poster ? `url(${poster})` : undefined,
				}}
				className="absolute inset-0 bg-obsidian bg-cover bg-center will-change-transform"
			>
				<video
					ref={videoRef}
					src={videoSrc}
					poster={poster}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					onLoadedData={() => setLoaded(true)}
					className={`h-full w-full object-cover transition-opacity duration-1000 ease-out ${loaded ? "opacity-100" : "opacity-0"
						}`}
				/>
			</motion.div>

			<div className="absolute inset-0 bg-linear-to-b from-obsidian/70 via-obsidian/20 to-obsidian" />
			<div className="absolute inset-0 bg-linear-to-r from-obsidian/60 via-transparent to-obsidian/30" />
			<div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay grain" />

			<motion.div
				style={{ y: contentY, opacity: contentOpacity }}
				className="relative z-10 mx-auto flex h-full max-w-360 flex-col justify-center px-6 pt-20 pb-20 md:px-12 md:pt-38 md:pb-24 lg:justify-end"
			>

				<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
					<div aria-hidden className="leading-[0.86] tracking-[-0.02em]">
						<AnimatedHeading
							text={[hero.headline[0], hero.headline[1]]}
							as="span"
							delay={0.5}
							// className="block text-[clamp(4rem,min(12vw,15vh),8rem)] font-bold text-ivory"
							className="block text-[4rem] md:text-[6.5rem] font-bold text-ivory"
						/>
						<AnimatedHeading
							text={hero.headline[2]}
							as="span"
							delay={0.9}
							// className="block text-[clamp(4rem,min(12vw,15vh),8rem)] font-semibold text-gold italic"
							className="block text-[4rem] md:text-[6.5rem] font-semibold text-gold italic"
						/>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
						className="flex w-full flex-col gap-7 lg:max-w-xs lg:pb-4"
					>
						<p className="text-pretty text-base leading-relaxed text-ivory/70">
							{hero.standfirst}
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<CtaButton href="/reserve">Reserve your stay</CtaButton>
							<CtaButton
								tone="outline"
								withArrow={false}
								onClick={() => setFilmOpen(true)}
							>
								<Play className="size-3.5 fill-current" />
								Watch the film
							</CtaButton>
						</div>
					</motion.div>
				</div>
			</motion.div>

			<FilmModal
				open={filmOpen}
				onClose={() => setFilmOpen(false)}
				src={filmSrc}
				poster={filmPoster}
			/>
		</section>
	);
}
