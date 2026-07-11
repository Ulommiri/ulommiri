import type { StaticImageData } from "next/image";

import { client } from "@/sanity/client";
import { HOME_QUERY, SETTINGS_QUERY } from "@/sanity/queries";
import {
	HERO_VIDEO,
	chambers as chambersFallback,
	contact,
	ethos as ethosFallback,
	faqs as faqsFallback,
	footer as footerFallback,
	galleryImages as galleryFallback,
	heroMeta,
	offerings as offeringsFallback,
	reserve as reserveFallback,
} from "@/data/site";

export type MediaImage = {
	src: string | StaticImageData;
	width: number;
	height: number;
	alt: string;
};

export type HeroContent = {
	videoUrl: string;
	filmUrl: string;
	eyebrow: string;
	headline: [string, string, string];
	standfirst: string;
};

export type EthosContent = { eyebrow: string; body: string; signature: string };

export type ChamberContent = {
	index: string;
	name: string;
	tagline: string;
	description: string;
	size: string;
	image: MediaImage;
};

export type OfferingContent = {
	index: string;
	title: string;
	description: string;
};

export type FaqContent = { question: string; answer: string };

export type ReserveContent = {
	eyebrow: string;
	headline: string;
	body: string;
	cta: string;
	note: string;
};

export type HomeContent = {
	hero: HeroContent;
	ethos: EthosContent;
	chambers: ChamberContent[];
	offerings: OfferingContent[];
	gallery: MediaImage[];
	faqs: FaqContent[];
	reserve: ReserveContent;
};

export type SiteSettings = {
	contactEmail: string;
	contactEmailHref: string;
	contactPhones: { label: string; href: string }[];
	socials: { label: string; href: string }[];
	footerTagline: string;
	footerLocation: string;
};

type RawMedia = {
	url?: string | null;
	width?: number | null;
	height?: number | null;
};

type RawHome = {
	heroVideoUrl?: string | null;
	heroFilmUrl?: string | null;
	heroEyebrow?: string | null;
	heroHeadlineLine1?: string | null;
	heroHeadlineLine2?: string | null;
	heroHeadlineAccent?: string | null;
	heroStandfirst?: string | null;
	ethosEyebrow?: string | null;
	ethosBody?: string | null;
	ethosSignature?: string | null;
	chambers?:
		| (RawMedia & {
				name?: string | null;
				tagline?: string | null;
				description?: string | null;
				size?: string | null;
		  })[]
		| null;
	offerings?: ({ title?: string | null; description?: string | null })[] | null;
	gallery?: (RawMedia & { alt?: string | null })[] | null;
	faqs?: ({ question?: string | null; answer?: string | null })[] | null;
	reserveEyebrow?: string | null;
	reserveHeadline?: string | null;
	reserveBody?: string | null;
	reserveCta?: string | null;
	reserveNote?: string | null;
};

type RawSettings = {
	contactEmail?: string | null;
	contactPhones?: (string | null)[] | null;
	socials?: ({ label?: string | null; href?: string | null })[] | null;
	footerTagline?: string | null;
	footerLocation?: string | null;
};

const text = (value: unknown, fallback: string): string =>
	typeof value === "string" && value.trim() ? value : fallback;

const list = <T>(value: T[] | null | undefined, fallback: T[]): T[] =>
	Array.isArray(value) && value.length ? value : fallback;

const pad = (i: number) => String(i + 1).padStart(2, "0");

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

type SanityMedia = {
	url?: string | null;
	width?: number | null;
	height?: number | null;
} | null;

const media = (raw: SanityMedia, alt: string): MediaImage | null => {
	if (!raw?.url) return null;
	return {
		src: raw.url,
		width: raw.width ?? 1600,
		height: raw.height ?? 1067,
		alt,
	};
};

const heroFallback: HeroContent = {
	videoUrl: HERO_VIDEO,
	filmUrl: HERO_VIDEO,
	eyebrow: heroMeta.eyebrow,
	headline: [heroMeta.headline[0], heroMeta.headline[1], heroMeta.headline[2]],
	standfirst: heroMeta.standfirst,
};

const chambersContentFallback: ChamberContent[] = chambersFallback.map(
	(c, i) => ({
		index: pad(i),
		name: c.name,
		tagline: c.tagline,
		description: c.description,
		size: c.size,
		image: {
			src: c.image,
			width: c.image.width,
			height: c.image.height,
			alt: c.name,
		},
	})
);

const offeringsContentFallback: OfferingContent[] = offeringsFallback.map(
	(o, i) => ({ index: pad(i), title: o.title, description: o.description })
);

const galleryContentFallback: MediaImage[] = galleryFallback.map((g) => ({
	src: g.src,
	width: g.src.width,
	height: g.src.height,
	alt: g.alt,
}));

const reserveContentFallback: ReserveContent = {
	eyebrow: reserveFallback.eyebrow,
	headline: reserveFallback.headline,
	body: reserveFallback.body,
	cta: reserveFallback.cta,
	note: reserveFallback.note,
};

export async function getHomeContent(): Promise<HomeContent> {
	const data = (await client
		.fetch(HOME_QUERY, {}, { next: { tags: ["sanity"], revalidate: 60 } })
		.catch(() => null)) as RawHome | null;

	if (!data) {
		return {
			hero: heroFallback,
			ethos: ethosFallback,
			chambers: chambersContentFallback,
			offerings: offeringsContentFallback,
			gallery: galleryContentFallback,
			faqs: faqsFallback,
			reserve: reserveContentFallback,
		};
	}

	const chambers: ChamberContent[] = list(data.chambers, []).map((c, i) => {
		const image = media(c, text(c?.name, "")) ?? chambersContentFallback[i]?.image;
		return {
			index: pad(i),
			name: text(c?.name, ""),
			tagline: text(c?.tagline, ""),
			description: text(c?.description, ""),
			size: text(c?.size, ""),
			image: image ?? chambersContentFallback[0].image,
		};
	});

	const gallery: MediaImage[] = list(data.gallery, [])
		.map((g) => media(g, text(g?.alt, "")))
		.filter((img): img is MediaImage => img !== null);

	const offerings: OfferingContent[] = list(data.offerings, []).map((o, i) => ({
		index: pad(i),
		title: text(o?.title, ""),
		description: text(o?.description, ""),
	}));

	const faqs: FaqContent[] = list(data.faqs, [])
		.map((f) => ({
			question: text(f?.question, ""),
			answer: text(f?.answer, ""),
		}))
		.filter((f) => f.question && f.answer);

	const heroVideoUrl = text(data.heroVideoUrl, heroFallback.videoUrl);

	return {
		hero: {
			videoUrl: heroVideoUrl,
			filmUrl: text(data.heroFilmUrl, heroVideoUrl),
			eyebrow: text(data.heroEyebrow, heroFallback.eyebrow),
			headline: [
				text(data.heroHeadlineLine1, heroFallback.headline[0]),
				text(data.heroHeadlineLine2, heroFallback.headline[1]),
				text(data.heroHeadlineAccent, heroFallback.headline[2]),
			],
			standfirst: text(data.heroStandfirst, heroFallback.standfirst),
		},
		ethos: {
			eyebrow: text(data.ethosEyebrow, ethosFallback.eyebrow),
			body: text(data.ethosBody, ethosFallback.body),
			signature: text(data.ethosSignature, ethosFallback.signature),
		},
		chambers: chambers.length ? chambers : chambersContentFallback,
		offerings: offerings.length ? offerings : offeringsContentFallback,
		gallery: gallery.length ? gallery : galleryContentFallback,
		faqs: faqs.length ? faqs : faqsFallback,
		reserve: {
			eyebrow: text(data.reserveEyebrow, reserveContentFallback.eyebrow),
			headline: text(data.reserveHeadline, reserveContentFallback.headline),
			body: text(data.reserveBody, reserveContentFallback.body),
			cta: text(data.reserveCta, reserveContentFallback.cta),
			note: text(data.reserveNote, reserveContentFallback.note),
		},
	};
}

const settingsFallback: SiteSettings = {
	contactEmail: contact.email,
	contactEmailHref: contact.emailHref,
	contactPhones: contact.phones.map((p) => ({ label: p.label, href: p.href })),
	socials: footerFallback.socials.map((s) => ({ label: s.label, href: s.href })),
	footerTagline: footerFallback.tagline,
	footerLocation: footerFallback.location,
};

export async function getSiteSettings(): Promise<SiteSettings> {
	const data = (await client
		.fetch(SETTINGS_QUERY, {}, { next: { tags: ["sanity"], revalidate: 60 } })
		.catch(() => null)) as RawSettings | null;
	if (!data) return settingsFallback;

	const email = text(data.contactEmail, settingsFallback.contactEmail);
	const phones = list(data.contactPhones, []).filter(
		(p): p is string => typeof p === "string" && p.trim().length > 0
	);
	const socials = list(data.socials, []).filter(
		(s) => text(s?.label, "") && text(s?.href, "")
	);

	return {
		contactEmail: email,
		contactEmailHref: `mailto:${email}`,
		contactPhones: phones.length
			? phones.map((p) => ({ label: p, href: telHref(p) }))
			: settingsFallback.contactPhones,
		socials: socials.length
			? socials.map((s) => ({ label: text(s?.label, ""), href: text(s?.href, "") }))
			: settingsFallback.socials,
		footerTagline: text(data.footerTagline, settingsFallback.footerTagline),
		footerLocation: text(data.footerLocation, settingsFallback.footerLocation),
	};
}
