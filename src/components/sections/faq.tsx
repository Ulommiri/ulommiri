"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/layout/section-heading";
import { TextLink } from "@/components/interactive/text-link";
import type { FaqContent, SiteSettings } from "@/sanity/content";
import { cn } from "@/lib/utils";

export function Faq({
	faqs,
	contact,
}: {
	faqs: FaqContent[];
	contact: Pick<SiteSettings, "contactEmail" | "contactEmailHref">;
}) {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section
			id="faq"
			className="relative border-t border-border bg-obsidian py-28 md:py-40"
		>
			<div className="mx-auto grid max-w-360 gap-14 px-6 md:px-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
				<div className="lg:sticky lg:top-32 lg:h-fit">
					<SectionLabel>Questions</SectionLabel>
					<AnimatedHeading
						text={["Everything", "You Might Ask"]}
						className="mt-8 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] font-light text-ivory"
						lineClassName="[&:nth-child(2)]:text-gold [&:nth-child(2)]:italic"
					/>
					<Reveal delay={0.15}>
						<p className="mt-8 max-w-xs text-base leading-relaxed text-ivory/55">
							Still wondering something? Write to us at{" "}
							<TextLink href={contact.contactEmailHref} className="text-gold">
								{contact.contactEmail}
							</TextLink>
							.
						</p>
					</Reveal>
				</div>

				<ul className="flex flex-col">
					{faqs.map((item, i) => {
						const isOpen = open === i;
						return (
							<li
								key={item.question}
								className="border-t border-border last:border-b"
							>
								<button
									onClick={() => setOpen(isOpen ? null : i)}
									aria-expanded={isOpen}
									className="group flex w-full cursor-pointer items-center gap-5 py-7 text-left md:gap-8"
								>
									<span className="font-display text-lg text-brass transition-colors duration-500 group-hover:text-gold">
										0{i + 1}
									</span>
									<span
										className={cn(
											"flex-1 font-display text-2xl leading-tight transition-colors duration-500 md:text-3xl",
											isOpen
												? "text-gold"
												: "text-ivory group-hover:text-ivory/80"
										)}
									>
										{item.question}
									</span>
									<Plus
										className={cn(
											"size-5 shrink-0 text-gold transition-transform duration-500 ease-luxe",
											isOpen && "rotate-135"
										)}
									/>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{
												duration: 0.5,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="overflow-hidden"
										>
											<p className="max-w-2xl pr-6 pb-8 pl-11 text-base leading-relaxed text-ivory/60 md:pl-13 md:text-lg">
												{item.answer}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
