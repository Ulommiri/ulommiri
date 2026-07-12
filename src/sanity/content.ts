import type { StaticImageData } from "next/image";

import { client } from "@/sanity/client";
import {
	HOME_QUERY,
	EXPERIENCES_QUERY,
	CHAMBERS_QUERY,
	GALLERY_QUERY,
	ACCOMMODATIONS_QUERY,
	EVENTS_QUERY,
	GALLERY_PAGE_QUERY,
	LOCATION_QUERY,
	RESERVE_QUERY,
	CHEFS_QUERY,
	SETTINGS_QUERY,
} from "@/sanity/queries";
import {
	HERO_VIDEO,
	chambers as chambersFallback,
	contact,
	ethos as ethosFallback,
	experiences as experiencesFallbackData,
	events as eventsFallbackData,
	faqs as faqsFallback,
	footer as footerFallback,
	galleryImages as galleryFallback,
	heroMeta,
	offerings as offeringsFallback,
	reserve as reserveFallback,
} from "@/data/site";
import {
	omakaseChef,
	chefPortrait,
	suiteWindow,
	gardenToast,
	aerialEstate,
	dockYoga,
	lakeCinema,
} from "@/assets";

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

export type ExperienceItem = {
	index: string;
	title: string;
	tagline: string;
	description: string;
	meta: string;
	image: MediaImage;
};

export type ExperiencesContent = {
	heroVideoUrl: string;
	heroImage: MediaImage;
	heroEyebrow: string;
	heroTitle: [string, string];
	heroSubtitle: string;
	items: ExperienceItem[];
	cta: { title: [string, string]; body: string };
};

export type PageHeroContent = {
	videoUrl: string;
	image: MediaImage;
	eyebrow: string;
	title: [string, string];
	subtitle: string;
};

export type AccommodationsContent = {
	hero: PageHeroContent;
	cta: { title: [string, string]; body: string };
};

export type EventsContent = {
	hero: PageHeroContent;
	items: ExperienceItem[];
	cta: { title: [string, string]; body: string; label: string };
};

export type GalleryPageContent = {
	eyebrow: string;
	title: [string, string];
	cta: { title: [string, string]; body: string };
};

export type LocationDetail = { title: string; body: string };

export type LocationContent = {
	hero: PageHeroContent;
	settingLabel: string;
	settingText: string;
	details: LocationDetail[];
	closingImage: MediaImage;
	closingLine: string;
	closingCoords: string;
	cta: { title: [string, string]; body: string };
};

export type ReservePageContent = {
	hero: PageHeroContent;
	enquireLabel: string;
	enquireLeadLine: string;
	enquireAccent: string;
	enquireBody: string;
};

export type ChefItem = {
	name: string;
	role: string;
	paragraphs: string[];
	image: MediaImage;
};

export type ChefsContent = {
	hero: PageHeroContent;
	chefs: ChefItem[];
	quote: string;
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

type RawExperiences = {
	heroVideoUrl?: string | null;
	heroEyebrow?: string | null;
	heroTitleLine1?: string | null;
	heroTitleLine2?: string | null;
	heroSubtitle?: string | null;
	heroImageUrl?: string | null;
	heroImageWidth?: number | null;
	heroImageHeight?: number | null;
	items?:
	| (RawMedia & {
		title?: string | null;
		tagline?: string | null;
		description?: string | null;
		meta?: string | null;
	})[]
	| null;
	ctaTitleLine1?: string | null;
	ctaTitleLine2?: string | null;
	ctaBody?: string | null;
};

type RawPageHero = {
	heroVideoUrl?: string | null;
	heroEyebrow?: string | null;
	heroTitleLine1?: string | null;
	heroTitleLine2?: string | null;
	heroSubtitle?: string | null;
	heroImageUrl?: string | null;
	heroImageWidth?: number | null;
	heroImageHeight?: number | null;
};

type RawAccommodations = RawPageHero & {
	ctaTitleLine1?: string | null;
	ctaTitleLine2?: string | null;
	ctaBody?: string | null;
};

type RawEvents = RawPageHero & {
	items?:
	| (RawMedia & {
		title?: string | null;
		tagline?: string | null;
		description?: string | null;
		meta?: string | null;
	})[]
	| null;
	ctaTitleLine1?: string | null;
	ctaTitleLine2?: string | null;
	ctaBody?: string | null;
	ctaLabel?: string | null;
};

type RawGalleryPage = {
	eyebrow?: string | null;
	titleLine1?: string | null;
	titleLine2?: string | null;
	ctaTitleLine1?: string | null;
	ctaTitleLine2?: string | null;
	ctaBody?: string | null;
};

type RawLocation = RawPageHero & {
	settingLabel?: string | null;
	settingText?: string | null;
	details?: ({ title?: string | null; body?: string | null })[] | null;
	closingLine?: string | null;
	closingCoords?: string | null;
	closingImageUrl?: string | null;
	closingImageWidth?: number | null;
	closingImageHeight?: number | null;
	ctaTitleLine1?: string | null;
	ctaTitleLine2?: string | null;
	ctaBody?: string | null;
};

type RawReservePage = RawPageHero & {
	enquireLabel?: string | null;
	enquireLeadLine?: string | null;
	enquireAccent?: string | null;
	enquireBody?: string | null;
};

type RawChefs = RawPageHero & {
	items?:
		| (RawMedia & {
				name?: string | null;
				role?: string | null;
				bio?: string | null;
		  })[]
		| null;
	quote?: string | null;
};

type RawChamber = RawMedia & {
	name?: string | null;
	tagline?: string | null;
	description?: string | null;
	size?: string | null;
};

type RawGalleryItem = RawMedia & { alt?: string | null };

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
		.fetch(HOME_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
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

const experiencesFallback: ExperiencesContent = {
	heroVideoUrl: HERO_VIDEO,
	heroImage: {
		src: omakaseChef,
		width: omakaseChef.width,
		height: omakaseChef.height,
		alt: "",
	},
	heroEyebrow: "Experiences",
	heroTitle: ["Days made", "of water"],
	heroSubtitle:
		"Private omakase at the counter, sunrise yoga on the dock, films raised over the lake at dusk — the house is a series of slow, deliberate pleasures, arranged by conversation and shaped to your rhythm.",
	items: experiencesFallbackData.map((e, i) => ({
		index: pad(i),
		title: e.title,
		tagline: e.tagline,
		description: e.description,
		meta: e.meta,
		image: {
			src: e.image,
			width: e.image.width,
			height: e.image.height,
			alt: e.title,
		},
	})),
	cta: {
		title: ["Come be held", "by the water"],
		body: "Tell us how you like to spend a day, and we will build it into the house before you arrive.",
	},
};

export async function getExperiencesContent(): Promise<ExperiencesContent> {
	const data = (await client
		.fetch(EXPERIENCES_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawExperiences | null;

	if (!data) return experiencesFallback;

	const heroImage: MediaImage = data.heroImageUrl
		? {
			src: data.heroImageUrl,
			width: data.heroImageWidth ?? 1600,
			height: data.heroImageHeight ?? 1067,
			alt: "",
		}
		: experiencesFallback.heroImage;

	const items: ExperienceItem[] = list(data.items, [])
		.map((it, i) => {
			const image =
				media(it, text(it?.title, "")) ??
				experiencesFallback.items[i]?.image ??
				experiencesFallback.items[0].image;
			return {
				index: pad(i),
				title: text(it?.title, ""),
				tagline: text(it?.tagline, ""),
				description: text(it?.description, ""),
				meta: text(it?.meta, ""),
				image,
			};
		})
		.filter((it) => it.title);

	return {
		heroVideoUrl: text(data.heroVideoUrl, experiencesFallback.heroVideoUrl),
		heroImage,
		heroEyebrow: text(data.heroEyebrow, experiencesFallback.heroEyebrow),
		heroTitle: [
			text(data.heroTitleLine1, experiencesFallback.heroTitle[0]),
			text(data.heroTitleLine2, experiencesFallback.heroTitle[1]),
		],
		heroSubtitle: text(data.heroSubtitle, experiencesFallback.heroSubtitle),
		items: items.length ? items : experiencesFallback.items,
		cta: {
			title: [
				text(data.ctaTitleLine1, experiencesFallback.cta.title[0]),
				text(data.ctaTitleLine2, experiencesFallback.cta.title[1]),
			],
			body: text(data.ctaBody, experiencesFallback.cta.body),
		},
	};
}

const staticImage = (
	src: (typeof omakaseChef),
	alt: string
): MediaImage => ({ src, width: src.width, height: src.height, alt });

function pageHero(
	raw: RawPageHero | null,
	fb: PageHeroContent
): PageHeroContent {
	if (!raw) return fb;
	const image: MediaImage = raw.heroImageUrl
		? {
			src: raw.heroImageUrl,
			width: raw.heroImageWidth ?? 1600,
			height: raw.heroImageHeight ?? 1067,
			alt: "",
		}
		: fb.image;
	return {
		videoUrl: text(raw.heroVideoUrl, fb.videoUrl),
		image,
		eyebrow: text(raw.heroEyebrow, fb.eyebrow),
		title: [
			text(raw.heroTitleLine1, fb.title[0]),
			text(raw.heroTitleLine2, fb.title[1]),
		],
		subtitle: text(raw.heroSubtitle, fb.subtitle),
	};
}

export async function getSharedChambers(): Promise<ChamberContent[]> {
	const data = (await client
		.fetch(CHAMBERS_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawChamber[] | null;

	if (!data || !data.length) return chambersContentFallback;

	const chambers = data
		.map((c, i) => {
			const image =
				media(c, text(c?.name, "")) ??
				chambersContentFallback[i]?.image ??
				chambersContentFallback[0].image;
			return {
				index: pad(i),
				name: text(c?.name, ""),
				tagline: text(c?.tagline, ""),
				description: text(c?.description, ""),
				size: text(c?.size, ""),
				image,
			};
		})
		.filter((c) => c.name);

	return chambers.length ? chambers : chambersContentFallback;
}

export async function getSharedGallery(): Promise<MediaImage[]> {
	const data = (await client
		.fetch(GALLERY_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawGalleryItem[] | null;

	if (!data) return galleryContentFallback;

	const gallery = data
		.map((g) => media(g, text(g?.alt, "")))
		.filter((img): img is MediaImage => img !== null);

	return gallery.length ? gallery : galleryContentFallback;
}

const accommodationsFallback: AccommodationsContent = {
	hero: {
		videoUrl: "",
		image: staticImage(suiteWindow, ""),
		eyebrow: "Accommodations",
		title: ["Rooms that", "face the water"],
		subtitle:
			"Linen, light and quiet — every chamber opens toward the lake, so the water is the first thing you see and the last thing you hear.",
	},
	cta: {
		title: ["Wake to", "the water"],
		body: "A limited number of chambers open each season. Reserve the house and we will prepare it exactly to your rhythm.",
	},
};

export async function getAccommodationsContent(): Promise<AccommodationsContent> {
	const data = (await client
		.fetch(ACCOMMODATIONS_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawAccommodations | null;

	if (!data) return accommodationsFallback;

	return {
		hero: pageHero(data, accommodationsFallback.hero),
		cta: {
			title: [
				text(data.ctaTitleLine1, accommodationsFallback.cta.title[0]),
				text(data.ctaTitleLine2, accommodationsFallback.cta.title[1]),
			],
			body: text(data.ctaBody, accommodationsFallback.cta.body),
		},
	};
}

const eventsFallback: EventsContent = {
	hero: {
		videoUrl: "",
		image: staticImage(gardenToast, ""),
		eyebrow: "Events",
		title: ["Gatherings", "by the water"],
		subtitle:
			"Long-table lunches, garden celebrations and evenings that drift late — the house holds a small number of gatherings each season, each one built around the water.",
	},
	items: eventsFallbackData.map((e, i) => ({
		index: pad(i),
		title: e.title,
		tagline: e.tagline,
		description: e.description,
		meta: e.meta,
		image: staticImage(e.image, e.title),
	})),
	cta: {
		title: ["Let the water", "hold your day"],
		body: "Tell us what you are celebrating, and we will shape the house around it.",
		label: "Enquire about events",
	},
};

export async function getEventsContent(): Promise<EventsContent> {
	const data = (await client
		.fetch(EVENTS_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawEvents | null;

	if (!data) return eventsFallback;

	const items: ExperienceItem[] = list(data.items, [])
		.map((it, i) => {
			const image =
				media(it, text(it?.title, "")) ??
				eventsFallback.items[i]?.image ??
				eventsFallback.items[0].image;
			return {
				index: pad(i),
				title: text(it?.title, ""),
				tagline: text(it?.tagline, ""),
				description: text(it?.description, ""),
				meta: text(it?.meta, ""),
				image,
			};
		})
		.filter((it) => it.title);

	return {
		hero: pageHero(data, eventsFallback.hero),
		items: items.length ? items : eventsFallback.items,
		cta: {
			title: [
				text(data.ctaTitleLine1, eventsFallback.cta.title[0]),
				text(data.ctaTitleLine2, eventsFallback.cta.title[1]),
			],
			body: text(data.ctaBody, eventsFallback.cta.body),
			label: text(data.ctaLabel, eventsFallback.cta.label),
		},
	};
}

const galleryPageFallback: GalleryPageContent = {
	eyebrow: "Gallery",
	title: ["The house,", "in light"],
	cta: {
		title: ["Seen enough", "to stay?"],
		body: "The photographs only hold still. The house does not — come let it move around you.",
	},
};

export async function getGalleryPageContent(): Promise<GalleryPageContent> {
	const data = (await client
		.fetch(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawGalleryPage | null;

	if (!data) return galleryPageFallback;

	return {
		eyebrow: text(data.eyebrow, galleryPageFallback.eyebrow),
		title: [
			text(data.titleLine1, galleryPageFallback.title[0]),
			text(data.titleLine2, galleryPageFallback.title[1]),
		],
		cta: {
			title: [
				text(data.ctaTitleLine1, galleryPageFallback.cta.title[0]),
				text(data.ctaTitleLine2, galleryPageFallback.cta.title[1]),
			],
			body: text(data.ctaBody, galleryPageFallback.cta.body),
		},
	};
}

const locationFallback: LocationContent = {
	hero: {
		videoUrl: "",
		image: staticImage(aerialEstate, ""),
		eyebrow: "Location",
		title: ["On the edge", "of the water"],
		subtitle:
			"Set into the treeline where the lawn meets the lake — private, unhurried, and a world away while still within easy reach.",
	},
	settingLabel: "The Setting",
	settingText:
		"The house keeps its own weather. Forest on three sides, water on the fourth, and a stillness that arrives the moment the trees close behind you.",
	details: [
		{
			title: "The Setting",
			body: "Wrapped in old trees, the house sits where a private lawn slips gently into the lake — no through-road, no neighbours in sight, only water and the long green quiet.",
		},
		{
			title: "Getting Here",
			body: "An easy drive from the city and its airport, then a final turn through the trees. Arrivals by water are welcome; a boat waits at the dock.",
		},
		{
			title: "A Private Address",
			body: "Ulọmmiri is a private residence. The exact location and gate details are shared with confirmed guests ahead of arrival.",
		},
	],
	closingImage: staticImage(dockYoga, "Morning on the floating dock"),
	closingLine: "Coordinates on request",
	closingCoords: "34°N · 84°W",
	cta: {
		title: ["Find your way", "to the water"],
		body: "Reserve the house and we will send directions, gate codes and a warm welcome ahead of your arrival.",
	},
};

export async function getLocationContent(): Promise<LocationContent> {
	const data = (await client
		.fetch(LOCATION_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawLocation | null;

	if (!data) return locationFallback;

	const details: LocationDetail[] = list(data.details, [])
		.map((d) => ({ title: text(d?.title, ""), body: text(d?.body, "") }))
		.filter((d) => d.title && d.body);

	const closingImage: MediaImage = data.closingImageUrl
		? {
			src: data.closingImageUrl,
			width: data.closingImageWidth ?? 1600,
			height: data.closingImageHeight ?? 1067,
			alt: locationFallback.closingImage.alt,
		}
		: locationFallback.closingImage;

	return {
		hero: pageHero(data, locationFallback.hero),
		settingLabel: text(data.settingLabel, locationFallback.settingLabel),
		settingText: text(data.settingText, locationFallback.settingText),
		details: details.length ? details : locationFallback.details,
		closingImage,
		closingLine: text(data.closingLine, locationFallback.closingLine),
		closingCoords: text(data.closingCoords, locationFallback.closingCoords),
		cta: {
			title: [
				text(data.ctaTitleLine1, locationFallback.cta.title[0]),
				text(data.ctaTitleLine2, locationFallback.cta.title[1]),
			],
			body: text(data.ctaBody, locationFallback.cta.body),
		},
	};
}

const reservePageFallback: ReservePageContent = {
	hero: {
		videoUrl: "",
		image: staticImage(lakeCinema, ""),
		eyebrow: "Book Your Stay",
		title: ["Reserve", "the house"],
		subtitle:
			"A limited number of stays open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm.",
	},
	enquireLabel: "Enquire",
	enquireLeadLine: "Begin with a",
	enquireAccent: "conversation",
	enquireBody:
		"Share your dates and the shape of your stay. We answer every enquiry within 24 hours and hold the house to a single booking at a time.",
};

export async function getReservePageContent(): Promise<ReservePageContent> {
	const data = (await client
		.fetch(RESERVE_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawReservePage | null;

	if (!data) return reservePageFallback;

	return {
		hero: pageHero(data, reservePageFallback.hero),
		enquireLabel: text(data.enquireLabel, reservePageFallback.enquireLabel),
		enquireLeadLine: text(
			data.enquireLeadLine,
			reservePageFallback.enquireLeadLine
		),
		enquireAccent: text(data.enquireAccent, reservePageFallback.enquireAccent),
		enquireBody: text(data.enquireBody, reservePageFallback.enquireBody),
	};
}

const toParagraphs = (value: string): string[] =>
	value
		.split(/\n+/)
		.map((p) => p.trim())
		.filter(Boolean);

const chefsFallback: ChefsContent = {
	hero: {
		videoUrl: "",
		image: staticImage(omakaseChef, ""),
		eyebrow: "Available by request",
		title: ["Resident", "Chefs"],
		subtitle:
			"Every memorable stay is accompanied by exceptional dining. Our resident chefs bring world-class culinary expertise to the estate, creating intimate, restaurant-quality experiences that unfold in the privacy of your home. Whether it's an elegant omakase at the counter or a family-style celebration, every menu is thoughtfully crafted and tailored to your occasion.",
	},
	chefs: [
		{
			name: "Chef Alex",
			role: "Founder, Homekase | Japanese Omakase Specialist",
			paragraphs: [
				"With more than two decades of experience in Japanese gastronomy, Chef Alex has dedicated his career to mastering the precision, artistry, and quiet elegance that define authentic Japanese cuisine. His passion for omakase inspired the creation of Homekase—a concept centered on bringing refined, chef-led dining into the intimacy of a private setting.",
				"At the estate, Chef Alex curates bespoke omakase experiences where every course is prepared before guests with meticulous attention to detail, seasonal ingredients, and traditional techniques. Each dinner is a journey through Japanese culinary craftsmanship, designed to be as memorable as the setting itself.",
			],
			image: staticImage(omakaseChef, "Chef Alex"),
		},
		{
			name: "Chef Corneal",
			role: "Private Chef | Global & Contemporary Cuisine",
			paragraphs: [
				"With more than a decade of professional culinary experience, Chef Corneal is celebrated for her versatility and ability to transform any occasion into an extraordinary dining experience. From elevated Southern comfort and African cuisine to Mediterranean classics, contemporary American fare, brunches, seafood feasts, and elegant multi-course dinners, her menus are thoughtfully tailored to every guest and every gathering.",
				"Known for her warm hospitality and creative approach, Chef Corneal combines exceptional technique with bold flavors, ensuring every meal feels both deeply personal and effortlessly refined.",
			],
			image: staticImage(chefPortrait, "Chef Corneal"),
		},
	],
	quote:
		"Luxury is measured not only by where you stay, but by the moments shared over a beautifully prepared meal.",
};

export async function getChefsContent(): Promise<ChefsContent> {
	const data = (await client
		.fetch(CHEFS_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
		.catch(() => null)) as RawChefs | null;

	if (!data) return chefsFallback;

	const chefs: ChefItem[] = list(data.items, [])
		.map((it, i) => {
			const image =
				media(it, text(it?.name, "")) ??
				chefsFallback.chefs[i]?.image ??
				chefsFallback.chefs[0].image;
			const bio = text(it?.bio, "");
			return {
				name: text(it?.name, ""),
				role: text(it?.role, ""),
				paragraphs: bio
					? toParagraphs(bio)
					: (chefsFallback.chefs[i]?.paragraphs ?? []),
				image,
			};
		})
		.filter((c) => c.name);

	return {
		hero: pageHero(data, chefsFallback.hero),
		chefs: chefs.length ? chefs : chefsFallback.chefs,
		quote: text(data.quote, chefsFallback.quote),
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
		.fetch(SETTINGS_QUERY, {}, { next: { revalidate: 3600, tags: ["sanity"] } })
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
		contactPhones: phones.map((p) => ({ label: p, href: telHref(p) })),
		socials: socials.length
			? socials.map((s) => ({ label: text(s?.label, ""), href: text(s?.href, "") }))
			: settingsFallback.socials,
		footerTagline: text(data.footerTagline, settingsFallback.footerTagline),
		footerLocation: text(data.footerLocation, settingsFallback.footerLocation),
	};
}
