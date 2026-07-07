import type { Metadata } from "next";
import { GalleryCanvas } from "@/components/sections/gallery-canvas";
import { PageCta } from "@/components/sections/page-cta";

export const metadata: Metadata = {
	title: "Gallery — Ulọmmiri",
	description:
		"An endless drift through the house — light, water and shadow at Ulọmmiri.",
};

export default function GalleryPage() {
	return (
		<main>
			<GalleryCanvas />
			<PageCta
				title={["Seen enough", "to stay?"]}
				body="The photographs only hold still. The house does not — come let it move around you."
			/>
		</main>
	);
}
