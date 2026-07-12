import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { chambers, type Feature } from "@/data/site";
import { suiteWindow } from "@/assets";

export const metadata = pageMetadata({
	title: "Accommodations",
	description:
		"Light-filled lakeview suites, an infinity pool, a games loft and a floating deck — every chamber at Ulọmmiri opens toward the water.",
	path: "/accommodations",
});

const spaces: Feature[] = chambers.map((chamber) => ({
	index: chamber.index,
	title: chamber.name,
	tagline: chamber.tagline,
	description: chamber.description,
	meta: chamber.size,
	image: chamber.image,
}));

export default function AccommodationsPage() {
	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Accommodations", path: "/accommodations" },
				])}
			/>
			<PageHero
				eyebrow="Accommodations"
				title={["Rooms that", "face the water"]}
				subtitle="Linen, light and quiet — every chamber opens toward the lake, so the water is the first thing you see and the last thing you hear."
				image={suiteWindow}
			/>
			<FeatureList items={spaces} />
			<PageCta
				title={["Wake to", "the water"]}
				body="A limited number of chambers open each season. Reserve the house and we will prepare it exactly to your rhythm."
			/>
		</main>
	);
}
