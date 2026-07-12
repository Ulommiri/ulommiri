import { PageHero } from "@/components/layout/page-hero";
import { FeatureList } from "@/components/sections/feature-list";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getExperiencesContent } from "@/sanity/content";

export const metadata = pageMetadata({
	title: "Experiences",
	description:
		"Private omakase, sunrise dock yoga, an open-air cinema over the lake and slow golden-hour days — the signature experiences of the Ulọmmiri lake house.",
	path: "/experiences",
});

export default async function ExperiencesPage() {
	const content = await getExperiencesContent();

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Experiences", path: "/experiences" },
				])}
			/>
			<PageHero
				eyebrow={content.heroEyebrow}
				title={content.heroTitle}
				subtitle={content.heroSubtitle}
				image={content.heroImage.src}
				videoUrl={content.heroVideoUrl}
			/>
			<FeatureList
				items={content.items.map((item) => ({
					...item,
					image: item.image.src,
				}))}
			/>
			<PageCta title={content.cta.title} body={content.cta.body} />
		</main>
	);
}
