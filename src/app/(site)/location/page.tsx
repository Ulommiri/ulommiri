import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getLocationContent } from "@/sanity/content";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
	title: "Location",
	description:
		"Ulọmmiri sits on the quiet edge of a private lake in the United States — wrapped in forest, held by the water, an easy drive from the city and its airport.",
	path: "/location",
});

export default async function LocationPage() {
	const content = await getLocationContent();

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Location", path: "/location" },
				])}
			/>
			<PageHero
				eyebrow={content.hero.eyebrow}
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image.src}
				videoUrl={content.hero.videoUrl}
			/>

			<section className="mx-auto max-w-5xl px-6 py-28 md:px-12 md:py-40">
				<SectionLabel>{content.settingLabel}</SectionLabel>
				<ScrollRevealText
					text={content.settingText}
					className="mt-10 text-balance text-[clamp(1.6rem,4vw,3rem)] leading-[1.2] font-light text-ivory"
				/>
			</section>

			<section className="mx-auto max-w-360 px-6 pb-28 md:px-12 md:pb-32">
				<div className="grid gap-12 border-t border-border pt-14 md:grid-cols-3 md:gap-16">
					{content.details.map((detail, i) => (
						<Reveal key={detail.title} delay={i * 0.08}>
							<h2 className="font-display text-2xl text-ivory">
								{detail.title}
							</h2>
							<p className="mt-5 text-base leading-relaxed text-ivory/60">
								{detail.body}
							</p>
						</Reveal>
					))}
				</div>
			</section>

			<section className="relative h-svh max-h-200 min-h-125 w-full overflow-hidden">
				<Image
					src={content.closingImage.src}
					alt={content.closingImage.alt}
					fill
					placeholder={
						typeof content.closingImage.src === "string" ? "empty" : "blur"
					}
					sizes="100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-obsidian/40" />
				<div className="absolute inset-0 flex items-center justify-center px-6">
					<p className="font-display text-center text-[clamp(1.75rem,5vw,4rem)] leading-tight text-ivory italic">
						{content.closingLine}
						<span className="mt-4 block text-base tracking-[0.3em] text-gold/80 not-italic uppercase">
							{content.closingCoords}
						</span>
					</p>
				</div>
			</section>

			<PageCta title={content.cta.title} body={content.cta.body} />
		</main>
	);
}
