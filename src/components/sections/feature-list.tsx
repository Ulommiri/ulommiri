import type { StaticImageData } from "next/image";
import { FeatureRow } from "@/components/sections/feature-row";

export type FeatureListItem = {
	index: string;
	title: string;
	tagline?: string;
	description: string;
	meta?: string;
	image: string | StaticImageData;
};

export function FeatureList({ items }: { items: FeatureListItem[] }) {
	return (
		<section className="mx-auto max-w-360 px-6 py-24 md:px-12 md:py-32">
			<div className="flex flex-col gap-24 md:gap-40">
				{items.map((item, i) => (
					<FeatureRow
						key={item.index}
						index={item.index}
						title={item.title}
						tagline={item.tagline}
						description={item.description}
						meta={item.meta}
						image={item.image}
						reverse={i % 2 === 1}
					/>
				))}
			</div>
		</section>
	);
}
