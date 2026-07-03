import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { events } from "@/data/site";
import { gardenToast } from "@/assets";

export const metadata: Metadata = {
	title: "Events — Ulọmmiri",
	description:
		"Intimate celebrations, garden gatherings and golden-hour toasts by the water at Ulọmmiri.",
};

export default function EventsPage() {
	return (
		<main>
			<PageHero
				eyebrow="Events"
				title={["Gatherings", "by the water"]}
				subtitle="Long-table lunches, garden celebrations and evenings that drift late — the house holds a small number of gatherings each season, each one built around the water."
				image={gardenToast}
			/>
			<FeatureList items={events} />
			<PageCta
				title={["Let the water", "hold your day"]}
				body="Tell us what you are celebrating, and we will shape the house around it."
				ctaLabel="Enquire about events"
				ctaHref="mailto:hello@ulommiri.com"
			/>
		</main>
	);
}
