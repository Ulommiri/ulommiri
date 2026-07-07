import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
	items: { src: string | StaticImageData; alt: string }[];
	onSelect?: (index: number) => void;
	className?: string;
};

export function GalleryGrid({ items, onSelect, className }: GalleryGridProps) {
	return (
		<div className={cn("grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5", className)}>
			{items.map((image, index) => {
				const content = (
					<>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							sizes="(max-width: 768px) 46vw, 30vw"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-copper/15 mix-blend-multiply" />
					</>
				);
				return onSelect ? (
					<button
						key={image.alt}
						type="button"
						onClick={() => onSelect(index)}
						className="relative aspect-4/3 cursor-pointer overflow-hidden bg-espresso"
					>
						{content}
					</button>
				) : (
					<div
						key={image.alt}
						className="relative aspect-4/3 overflow-hidden bg-espresso"
					>
						{content}
					</div>
				);
			})}
		</div>
	);
}
