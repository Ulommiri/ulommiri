import { GalleryCanvas } from "@/components/sections/gallery-canvas";
import { PageCta } from "@/components/sections/page-cta";
import { JsonLd } from "@/components/seo/json-ld";
import {
	pageMetadata,
	breadcrumbSchema,
	imageGallerySchema,
} from "@/lib/seo";

export const metadata = pageMetadata({
	title: "Gallery",
	description:
		"A photographic drift through Ulọmmiri — the lakeview suites, infinity pool, private dock and open-air cinema, in light, water and shadow.",
	path: "/gallery",
});

export default function GalleryPage() {
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
			<GalleryCanvas />
			<PageCta
				title={["Seen enough", "to stay?"]}
				body="The photographs only hold still. The house does not — come let it move around you."
			/>
		</main>
	);
}
