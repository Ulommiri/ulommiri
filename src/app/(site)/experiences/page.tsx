import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { experiences } from "@/data/site";
import { omakaseChef } from "@/assets";

export const metadata = pageMetadata({
	title: "Experiences",
	description:
		"Private omakase, sunrise dock yoga, an open-air cinema over the lake and slow golden-hour days — the signature experiences of the Ulọmmiri lake house.",
	path: "/experiences",
});

export default function ExperiencesPage() {
	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Experiences", path: "/experiences" },
				])}
			/>
			<PageHero
				eyebrow="Experiences"
				title={["Days made", "of water"]}
				subtitle="Private omakase at the counter, sunrise yoga on the dock, films raised over the lake at dusk — the house is a series of slow, deliberate pleasures, arranged by conversation and shaped to your rhythm."
				image={omakaseChef}
			/>
			<FeatureList items={experiences} />
			<PageCta
				title={["Come be held", "by the water"]}
				body="Tell us how you like to spend a day, and we will build it into the house before you arrive."
			/>
		</main>
	);
}
