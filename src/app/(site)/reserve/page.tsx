import { PageHero } from "@/components/layout/page-hero";
import { ReserveForm } from "@/components/sections/reserve-form";
import { SectionLabel } from "@/components/layout/section-heading";
import { TextLink } from "@/components/interactive/text-link";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getReservePageContent, getSiteSettings } from "@/sanity/content";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
	title: "Book Your Stay",
	description:
		"Reserve Ulọmmiri, the private lake house. A limited number of whole-house stays open each season, booked by conversation. Enquiries answered within 24 hours.",
	path: "/reserve",
});

export default async function ReservePage() {
	const [content, settings] = await Promise.all([
		getReservePageContent(),
		getSiteSettings(),
	]);

	return (
		<main>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Book Your Stay", path: "/reserve" },
				])}
			/>
			<PageHero
				eyebrow={content.hero.eyebrow}
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image.src}
				videoUrl={content.hero.videoUrl}
			/>

			<section className="mx-auto max-w-360 px-6 py-24 md:px-12 md:py-32">
				<div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
					<div className="lg:sticky lg:top-32 lg:h-fit">
						<SectionLabel>{content.enquireLabel}</SectionLabel>
						<h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none font-light text-ivory">
							{content.enquireLeadLine}
							<span className="text-gold italic"> {content.enquireAccent}</span>
						</h2>
						<p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/60">
							{content.enquireBody}
						</p>

						<dl className="mt-12 flex flex-col gap-6 border-t border-border pt-10">
							<div className="flex flex-col gap-1">
								<dt className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
									Email
								</dt>
								<dd>
									<TextLink
										href={settings.contactEmailHref}
										className="text-lg text-ivory"
									>
										{settings.contactEmail}
									</TextLink>
								</dd>
							</div>
							<div className="flex flex-col gap-1">
								<dt className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
									Telephone
								</dt>
								{settings.contactPhones.map((phone) => (
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
