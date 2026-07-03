import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { chambers, type Feature } from "@/data/site";
import { suiteWindow } from "@/assets";

export const metadata: Metadata = {
	title: "Accommodations — Ulọmmiri",
	description:
		"Light-filled suites and lakeside spaces, each turned toward the water at Ulọmmiri.",
};

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
