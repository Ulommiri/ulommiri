"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { CtaButton } from "@/components/ui/cta-button";
import { scrollToSection } from "@/lib/scroll";
import { HERO_VIDEO, heroMeta } from "@/data/site";

export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const [loaded, setLoaded] = useState(false);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
	const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
	const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

	return (
		<section
			ref={ref}
			className="relative h-screen w-full overflow-hidden bg-obsidian"
		// className="relative h-svh min-h-175 w-full overflow-hidden bg-obsidian"
		>
			<motion.div
				style={{ scale: videoScale, y: videoY }}
				className="absolute inset-0 will-change-transform"
			>
				<video
					src={HERO_VIDEO}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					onCanPlay={() => setLoaded(true)}
					className={`h-full w-full object-cover transition-opacity duration-1600 ease-out ${loaded ? "opacity-100" : "opacity-0"
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
							text={[heroMeta.headline[0], heroMeta.headline[1]]}
							as="span"
							delay={0.5}
							// className="block text-[clamp(4rem,min(12vw,15vh),8rem)] font-bold text-ivory"
							className="block text-[4rem] md:text-[6.5rem] font-bold text-ivory"
						/>
						<AnimatedHeading
							text={heroMeta.headline[2]}
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
							{heroMeta.standfirst}
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<CtaButton onClick={() => scrollToSection("#reserve")}>
								Reserve your stay
							</CtaButton>
							<CtaButton
								tone="outline"
								withArrow={false}
								onClick={() => scrollToSection("#house")}
							>
								<Play className="size-3.5 fill-current" />
								Watch the film
							</CtaButton>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
