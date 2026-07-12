import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { contact, events } from "@/data/site";
import { gardenToast } from "@/assets";

export const metadata = pageMetadata({
	title: "Events",
	description:
		"Intimate lakeside celebrations — garden gatherings, poolside evenings and cinema on the dock. Ulọmmiri hosts a small number of private events by the water each season.",
	path: "/events",
});

export default function EventsPage() {
	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Events", path: "/events" },
				])}
			/>
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
				ctaHref={contact.emailHref}
			/>
		</main>
	);
}
