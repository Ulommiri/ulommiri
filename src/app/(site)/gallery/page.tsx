import { GalleryCanvas } from "@/components/sections/gallery-canvas";
import { GalleryCollage } from "@/components/sections/gallery-collage";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import {
	pageMetadata,
	breadcrumbSchema,
	imageGallerySchema,
} from "@/lib/seo";
import { getGalleryPageContent, getSharedGallery } from "@/sanity/content";

export const metadata = pageMetadata({
	title: "Gallery",
	description:
		"A photographic drift through Ulọmmiri — the lakeview suites, infinity pool, private dock and open-air cinema, in light, water and shadow.",
	path: "/gallery",
});

export default async function GalleryPage() {
	const [content, images] = await Promise.all([
		getGalleryPageContent(),
		getSharedGallery(),
	]);

	return (
		<main>
			<JsonLd
				data={[
					breadcrumbSchema([
						{ name: "Home", path: "/" },
						{ name: "Gallery", path: "/gallery" },
					]),
					imageGallerySchema(),
				]}
			/>
			<GalleryCanvas
				items={images}
				heading={{
					eyebrow: content.eyebrow,
					titleLine1: content.title[0],
					titleLine2: content.title[1],
				}}
			/>
			<GalleryCollage
				label={content.collage.label}
				title={content.collage.title}
				items={images}
			/>
			<PageCta title={content.cta.title} body={content.cta.body} />
		</main>
	);
}
