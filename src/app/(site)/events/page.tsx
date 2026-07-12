import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getEventsContent, getSiteSettings } from "@/sanity/content";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
	title: "Events",
	description:
		"Intimate lakeside celebrations — garden gatherings, poolside evenings and cinema on the dock. Ulọmmiri hosts a small number of private events by the water each season.",
	path: "/events",
});

export default async function EventsPage() {
	const [content, settings] = await Promise.all([
		getEventsContent(),
		getSiteSettings(),
	]);

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Events", path: "/events" },
				])}
			/>
			<PageHero
				eyebrow={content.hero.eyebrow}
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image.src}
				videoUrl={content.hero.videoUrl}
			/>
			<FeatureList
				items={content.items.map((item) => ({
					...item,
					image: item.image.src,
				}))}
			/>
			<PageCta
				title={content.cta.title}
				body={content.cta.body}
				ctaLabel={content.cta.label}
				ctaHref={settings.contactEmailHref}
			/>
		</main>
	);
}
