import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Gallery } from "@/components/sections/gallery";
import { poolLakeview } from "@/assets";

export const metadata: Metadata = {
	title: "Gallery — Ulọmmiri",
	description: "Light, water and shadow moving through Ulọmmiri.",
};

export default function GalleryPage() {
	return (
		<main>
			<PageHero
				eyebrow="Gallery"
				title={["The house,", "in light"]}
				subtitle="A few of the hours worth staying for the pool at golden hour, the counter mid-service, the lake at dusk."
				image={poolLakeview}
			/>
			<Gallery />
		</main>
	);
}
