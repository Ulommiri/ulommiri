import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getChefsContent } from "@/sanity/content";

export const metadata = pageMetadata({
	title: "Our Chefs",
	description:
		"Meet the resident chefs of Ulọmmiri — a Japanese omakase specialist and a global private chef bringing restaurant-quality dining into the privacy of the estate, available by request.",
	path: "/chefs",
});

export default async function ChefsPage() {
	const content = await getChefsContent();

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Our Chefs", path: "/chefs" },
				])}
			/>
			<PageHero
				eyebrow={content.hero.eyebrow}
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image.src}
				videoUrl={content.hero.videoUrl}
			/>

			<section className="mx-auto max-w-360 space-y-28 px-6 py-28 md:space-y-40 md:px-12 md:py-40">
				{content.chefs.map((chef, i) => (
					<div
						key={chef.name}
						className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
					>
						<div
							className={
								i % 2 === 1
									? "group relative aspect-4/5 overflow-hidden bg-espresso md:order-2"
									: "group relative aspect-4/5 overflow-hidden bg-espresso"
							}
						>
							<Image
								src={chef.image.src}
								alt={chef.name}
								fill
								placeholder={
									typeof chef.image.src === "string" ? "empty" : "blur"
								}
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-copper/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
						</div>

						<div className={i % 2 === 1 ? "md:order-1" : undefined}>
							<AnimatedHeading
								text={chef.name}
								as="h2"
								delay={0.05}
								className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] font-light text-ivory"
							/>
							<Reveal delay={0.1}>
								<p className="eyebrow mt-5 text-gold">{chef.role}</p>
							</Reveal>
							<div className="mt-8 space-y-5">
								{chef.paragraphs.map((paragraph, p) => (
									<Reveal key={p} delay={0.15 + p * 0.05}>
										<p className="max-w-xl text-pretty text-base leading-relaxed text-ivory/65">
											{paragraph}
										</p>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				))}
			</section>

			<section className="border-t border-border bg-obsidian px-6 py-28 md:py-36">
				<Reveal>
					<blockquote className="mx-auto max-w-4xl text-balance text-center font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] font-light text-ivory italic">
						“{content.quote}”
					</blockquote>
				</Reveal>
			</section>

			<PageCta
				eyebrow="Dine"
				title={["A Table", "Set For You"]}
				body="Tell us the shape of your stay and we will arrange the chef, the menu and the evening around it."
			/>
		</main>
	);
}
