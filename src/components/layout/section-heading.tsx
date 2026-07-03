import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionLabel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Reveal>
			<span
				className={cn("flex items-center gap-4 eyebrow text-brass", className)}
			>
				{children}
			</span>
		</Reveal>
	);
}
