import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { HouseFacts } from "@/components/sections/house-facts";
import { HouseGallery } from "@/components/sections/house-gallery";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getAccommodationsContent, getSharedChambers } from "@/sanity/content";

export const metadata = pageMetadata({
	title: "Accommodations",
	description:
		"Light-filled lakeview suites, an infinity pool, a games loft and a floating deck — every chamber at Ulọmmiri opens toward the water.",
	path: "/accommodations",
});

export default async function AccommodationsPage() {
	const [content, chambers] = await Promise.all([
		getAccommodationsContent(),
		getSharedChambers(),
	]);

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Accommodations", path: "/accommodations" },
				])}
			/>
			<PageHero
				eyebrow={content.hero.eyebrow}
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image.src}
				videoUrl={content.hero.videoUrl}
			/>
			<HouseFacts
				label={content.facts.label}
				title={content.facts.title}
				items={content.facts.items}
				spaces={content.facts.spaces}
			/>
			<HouseGallery
				label={content.interiors.label}
				title={content.interiors.title}
				items={content.interiors.items}
			/>
			<FeatureList
				items={chambers.map((chamber) => ({
					index: chamber.index,
					title: chamber.name,
					tagline: chamber.tagline,
					description: chamber.description,
					meta: chamber.size,
					image: chamber.image.src,
				}))}
			/>
			<PageCta title={content.cta.title} body={content.cta.body} />
		</main>
	);
}
