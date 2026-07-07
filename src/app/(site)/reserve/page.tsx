import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ReserveForm } from "@/components/sections/reserve-form";
import { SectionLabel } from "@/components/layout/section-heading";
import { TextLink } from "@/components/interactive/text-link";
import { contact } from "@/data/site";
import { lakeCinema } from "@/assets";

export const metadata: Metadata = {
	title: "Book Your Stay — Ulọmmiri",
	description:
		"Reserve the house. A limited number of stays open each season at Ulọmmiri.",
};

export default function ReservePage() {
	return (
		<main>
			<PageHero
				eyebrow="Book Your Stay"
				title={["Reserve", "the house"]}
				subtitle="A limited number of stays open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm."
				image={lakeCinema}
			/>

			<section className="mx-auto max-w-360 px-6 py-24 md:px-12 md:py-32">
				<div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
					<div className="lg:sticky lg:top-32 lg:h-fit">
						<SectionLabel>Enquire</SectionLabel>
						<h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none font-light text-ivory">
							Begin with a
							<span className="text-gold italic"> conversation</span>
						</h2>
						<p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/60">
							Share your dates and the shape of your stay. We answer every
							enquiry within 24 hours and hold the house to a single booking at a
							time.
						</p>

						<dl className="mt-12 flex flex-col gap-6 border-t border-border pt-10">
							<div className="flex flex-col gap-1">
								<dt className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
									Email
								</dt>
								<dd>
									<TextLink
										href={contact.emailHref}
										className="text-lg text-ivory"
									>
										{contact.email}
									</TextLink>
								</dd>
							</div>
							<div className="flex flex-col gap-1">
								<dt className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
									Telephone
								</dt>
								{contact.phones.map((phone) => (
									<dd key={phone.href}>
										<TextLink
											href={phone.href}
											className="text-lg text-ivory"
										>
											{phone.label}
										</TextLink>
									</dd>
								))}
							</div>
						</dl>
					</div>

					<ReserveForm />
				</div>
			</section>
		</main>
	);
}
