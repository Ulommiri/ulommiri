import type { Metadata } from "next";
import { contact, faqs, galleryImages } from "@/data/site";

const rawSiteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ulommiri.com";

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
	name: "Ulọmmiri",
	legalName: "Ulọmmiri — Onu Estates",
	title: "Ulọmmiri — A Private Lake House Held by Water",
	description:
		"Ulọmmiri is a private lakefront house in the United States — a whole-house retreat of light-filled suites, an infinity pool, private omakase and open-air cinema, offered by exclusive booking one stay at a time.",
	tagline: "A house held by water",
	locale: "en_US",
	country: "US",
	twitter: "@ulommiri",
	keywords: [
		"Ulọmmiri",
		"private lake house",
		"luxury lakefront retreat",
		"whole-house rental",
		"private resort",
		"lakefront villa United States",
		"exclusive lake house rental",
		"private omakase",
		"infinity pool lake house",
		"luxury retreat",
	],
} as const;

export function absoluteUrl(path = "/"): string {
	if (path.startsWith("http")) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
	title: string;
	description: string;
	path: string;
	keywords?: string[];
};

export function pageMetadata({
	title,
	description,
	path,
	keywords,
}: PageMetaInput): Metadata {
	const url = absoluteUrl(path);
	return {
		title,
		description,
		keywords: keywords ?? [...siteConfig.keywords],
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: siteConfig.name,
			locale: siteConfig.locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${SITE_URL}/#organization`,
		name: siteConfig.name,
		legalName: siteConfig.legalName,
		url: SITE_URL,
		logo: absoluteUrl("/icon.png"),
		image: absoluteUrl("/opengraph-image"),
		description: siteConfig.description,
		email: contact.email,
		telephone: contact.phones[0]?.label,
		areaServed: "US",
		sameAs: [
			"https://www.instagram.com/ulommiri",
			"https://www.tiktok.com/@ulommiri",
			"https://www.snapchat.com/@ulommiri",
		],
	};
}

export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		url: SITE_URL,
		name: siteConfig.name,
		description: siteConfig.description,
		inLanguage: "en-US",
		publisher: { "@id": `${SITE_URL}/#organization` },
	};
}

export function resortSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Resort",
		"@id": `${SITE_URL}/#lodging`,
		name: siteConfig.name,
		description: siteConfig.description,
		url: SITE_URL,
		image: [
			absoluteUrl("/opengraph-image"),
			...galleryImages.slice(0, 4).map((g) => absoluteUrl(g.src.src)),
		],
		logo: absoluteUrl("/icon.png"),
		email: contact.email,
		telephone: contact.phones[0]?.label,
		priceRange: "$$$$",
		currenciesAccepted: "USD",
		petsAllowed: true,
		smokingAllowed: false,
		numberOfRooms: 4,
		address: {
			"@type": "PostalAddress",
			addressCountry: "US",
		},
		containsPlace: {
			"@type": "Accommodation",
			accommodationCategory: "Whole house",
		},
		amenityFeature: [
			{ "@type": "LocationFeatureSpecification", name: "Heated infinity pool", value: true },
			{ "@type": "LocationFeatureSpecification", name: "Private dock", value: true },
			{ "@type": "LocationFeatureSpecification", name: "Open-air cinema", value: true },
			{ "@type": "LocationFeatureSpecification", name: "Lakefront", value: true },
			{ "@type": "LocationFeatureSpecification", name: "Private chef / omakase", value: true },
			{ "@type": "LocationFeatureSpecification", name: "Games loft", value: true },
		],
		parentOrganization: { "@id": `${SITE_URL}/#organization` },
		sameAs: [
			"https://www.instagram.com/ulommiri",
			"https://www.tiktok.com/@ulommiri",
			"https://www.snapchat.com/@ulommiri",
		],
	};
}

export function faqSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: { "@type": "Answer", text: faq.answer },
		})),
	};
}

export function breadcrumbSchema(
	trail: { name: string; path: string }[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: trail.map((crumb, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: crumb.name,
			item: absoluteUrl(crumb.path),
		})),
	};
}

export function imageGallerySchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ImageGallery",
		name: `${siteConfig.name} — Gallery`,
		description: siteConfig.description,
		url: absoluteUrl("/gallery"),
		image: galleryImages.map((g) => ({
			"@type": "ImageObject",
			contentUrl: absoluteUrl(g.src.src),
			caption: g.alt,
		})),
	};
}
