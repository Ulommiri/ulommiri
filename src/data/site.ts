import type { StaticImageData } from "next/image";
import {
	suiteMorning,
	suiteWindow,
	gameRoom,
	poolLakeview,
	lakeCinema,
	dockYoga,
	omakaseChef,
	omakaseLakeside,
	chefPortrait,
	gardenToast,
	poolsideCinema,
	cinemaDeck,
	aerialEstate,
} from "@/assets";

export const HERO_VIDEO =
	"https://res.cloudinary.com/dkoi9zeli/video/upload/v1783027894/Ulomiri-Highlight-Reel-Trim_1_hbprs7.mp4";

export const navLinks = [
	{ label: "Experiences", href: "/experiences" },
	{ label: "Location", href: "/location" },
	{ label: "Events", href: "/events" },
	{ label: "Accommodations", href: "/accommodations" },
	{ label: "Gallery", href: "/gallery" },
] as const;

export const reserveCta = { label: "Book Your Stay", href: "/reserve" };

export const heroMeta = {
	eyebrow: "A private lake house · United States",
	headline: ["A house", "held by", "water"],
	standfirst:
		"On the quiet edge of the lake, Ulọmmiri gathers light, silence and slow luxury into a single unbroken breath.",
	location: "34°N · 84°W",
	established: "Est. on the lake",
};

export const ethos = {
	eyebrow: "The House",
	body: "Ulọmmiri means the house of water. Here, mornings arrive as reflections on the ceiling and the day is measured by the light on the lake rather than the clock. Every room opens toward the water, every surface remembers the hand that shaped it, and stillness is treated as the rarest luxury of all.",
	signature: "A house held by water",
};

export type Chamber = {
	index: string;
	name: string;
	tagline: string;
	description: string;
	image: StaticImageData;
	size: string;
};

export const chambers: Chamber[] = [
	{
		index: "01",
		name: "The Lakeview Suite",
		tagline: "Wake to the water",
		description:
			"A light-filled chamber of linen and calm, its windows opening straight onto the lake and the morning it carries.",
		image: suiteMorning,
		size: "King suite · lake-facing",
	},
	{
		index: "02",
		name: "The Water Terrace",
		tagline: "A pool that meets the lake",
		description:
			"A heated infinity pool that dissolves into the water beyond, with sun-loungers, shade and a glass in easy reach.",
		image: poolLakeview,
		size: "Infinity pool · sun deck",
	},
	{
		index: "03",
		name: "The Games Loft",
		tagline: "Long, unhurried afternoons",
		description:
			"A bright lounge of billiards and lake views, made for the slow competitive hours between swims.",
		image: gameRoom,
		size: "Billiards · lounge · lake views",
	},
	{
		index: "04",
		name: "The Floating Deck",
		tagline: "Where the evenings gather",
		description:
			"A private dock that becomes an open-air cinema at dusk, the screen glowing over still, dark water.",
		image: lakeCinema,
		size: "Private dock · open-air cinema",
	},
];

export type Offering = {
	index: string;
	title: string;
	description: string;
};

export const offerings: Offering[] = [
	{
		index: "01",
		title: "Private Omakase",
		description:
			"A resident chef building a sushi counter in the house, course by course, from the day's finest cuts.",
	},
	{
		index: "02",
		title: "Sunrise Dock Yoga",
		description:
			"Slow flows on the floating deck as the lake wakes, mist still resting on the water.",
	},
	{
		index: "03",
		title: "The Infinity Pool",
		description:
			"A mirror of warm water that dissolves into the lake at the horizon, champagne optional but encouraged.",
	},
	{
		index: "04",
		title: "Open-Air Cinema",
		description:
			"A screen raised over the water at dusk, blankets and warm light, films beneath the stars.",
	},
	{
		index: "05",
		title: "Garden Gatherings",
		description:
			"Long-table lunches and golden-hour toasts among the flowers and the trees.",
	},
	{
		index: "06",
		title: "The Games Loft",
		description:
			"Billiards, lounge and lake views for the unhurried hours between the water and the table.",
	},
];

export type Feature = {
	index: string;
	title: string;
	tagline: string;
	description: string;
	meta: string;
	image: StaticImageData;
};

export const experiences: Feature[] = [
	{
		index: "01",
		title: "Private Omakase",
		tagline: "At the counter",
		description:
			"A resident chef builds a sushi counter inside the house, course by course, from the day's finest cuts — theatre, dinner and ritual in one sitting.",
		meta: "Resident chef · by the evening",
		image: omakaseChef,
	},
	{
		index: "02",
		title: "Sunrise Dock Yoga",
		tagline: "On the water",
		description:
			"Slow flows on the floating deck as the lake wakes and the mist still rests on the surface, a guide unrolling the morning one breath at a time.",
		meta: "Daily · at sunrise",
		image: dockYoga,
	},
	{
		index: "03",
		title: "The Infinity Pool",
		tagline: "Golden hour",
		description:
			"A mirror of warm water that dissolves into the lake at the horizon, sun-loungers and shade and a glass of something cold within easy reach.",
		meta: "Heated · lakefront",
		image: poolLakeview,
	},
	{
		index: "04",
		title: "Open-Air Cinema",
		tagline: "Under the stars",
		description:
			"A screen raised over the water at dusk, blankets and warm light on the dock, films that run long into the still, dark evening.",
		meta: "On the dock · at dusk",
		image: lakeCinema,
	},
	{
		index: "05",
		title: "Garden Gatherings",
		tagline: "Long tables",
		description:
			"Long-table lunches and golden-hour toasts among the flowers and the trees, the kind of afternoon that forgets to end.",
		meta: "By arrangement",
		image: gardenToast,
	},
	{
		index: "06",
		title: "The Games Loft",
		tagline: "Between swims",
		description:
			"Billiards, a lounge and lake views for the unhurried competitive hours between the water and the table.",
		meta: "Billiards · lounge",
		image: gameRoom,
	},
];

export const events: Feature[] = [
	{
		index: "01",
		title: "Garden Celebrations",
		tagline: "Golden-hour toasts",
		description:
			"Intimate celebrations among the flowers and the trees — long tables, warm light and the lake as a backdrop.",
		meta: "Up to 40 guests",
		image: gardenToast,
	},
	{
		index: "02",
		title: "Poolside Evenings",
		tagline: "Warm nights by the water",
		description:
			"The pool deck after dark, lit low and gathered close, cocktails and cinema beneath the open sky.",
		meta: "Cocktails · cinema",
		image: poolsideCinema,
	},
	{
		index: "03",
		title: "Cinema on the Dock",
		tagline: "Films over the lake",
		description:
			"A private screening raised over still water, the whole house turned toward a single glowing screen.",
		meta: "Private screenings",
		image: cinemaDeck,
	},
];

export type GalleryImage = {
	src: StaticImageData;
	alt: string;
};

export const galleryImages: GalleryImage[] = [
	{ src: lakeCinema, alt: "Open-air cinema over the lake at dusk" },
	{ src: poolLakeview, alt: "The infinity pool meeting the lake" },
	{ src: omakaseChef, alt: "Omakase prepared at the counter" },
	{ src: suiteMorning, alt: "Morning light in a lakeview suite" },
	{ src: dockYoga, alt: "Sunrise yoga on the floating dock" },
	{ src: gameRoom, alt: "The lakeview games loft" },
	{ src: gardenToast, alt: "Garden gatherings at golden hour" },
	{ src: chefPortrait, alt: "The resident chef at the counter" },
	{ src: poolsideCinema, alt: "Poolside evenings after dark" },
	{ src: aerialEstate, alt: "The house and lake from above" },
	{ src: omakaseLakeside, alt: "Omakase set beside the water" },
	{ src: suiteWindow, alt: "A suite opening toward the lake" },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
	{
		question: "What is included in a stay?",
		answer:
			"Exclusive use of the entire house and grounds — the suites, the infinity pool, the dock and the games loft — along with fresh linens, a welcome provision and a dedicated host to arrange anything you need.",
	},
	{
		question: "How many guests can the house sleep?",
		answer:
			"The house comfortably sleeps a small group across its suites. Share your party size when you enquire and we will confirm the best configuration for your stay.",
	},
	{
		question: "Is there a minimum stay?",
		answer:
			"A two-night minimum applies for most of the year, with longer minimums over holidays and peak weekends. We are happy to accommodate longer, slower stays.",
	},
	{
		question: "Are the experiences included?",
		answer:
			"Use of the pool, dock and grounds is always included. Signature experiences such as private omakase, sunrise yoga and open-air cinema are arranged on request and priced separately.",
	},
	{
		question: "Can we host an event here?",
		answer:
			"Yes — the house holds a small number of intimate gatherings each season. Tell us what you are planning and we will tailor the grounds and service around it.",
	},
	{
		question: "What is your cancellation policy?",
		answer:
			"Reservations may be adjusted or cancelled with full flexibility up to 30 days before arrival. Closer dates are handled case by case — we would rather find a solution than a penalty.",
	},
	{
		question: "Are children and pets welcome?",
		answer:
			"Well-behaved children and pets are welcome with prior notice, so we can prepare the house and grounds to keep everyone safe and comfortable.",
	},
];

export const reserve = {
	eyebrow: "Stay",
	headline: "Come be held by the water",
	body: "A limited number of chambers open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm.",
	cta: "Book your stay",
	note: "Enquiries answered within 24 hours",
};

export const contact = {
	email: "info@onuestates.com",
	emailHref: "mailto:info@onuestates.com",
	phones: [
		{ label: "+1 (281) 798-5787", href: "tel:+12817985787" },
		{ label: "+1 (404) 543-7492", href: "tel:+14045437492" },
	],
};

export const footer = {
	tagline: "A house held by water",
	columns: [
		{
			title: "Explore",
			links: [
				{ label: "Experiences", href: "/experiences" },
				{ label: "Accommodations", href: "/accommodations" },
				{ label: "Events", href: "/events" },
				{ label: "Location", href: "/location" },
			],
		},
		{
			title: "Visit",
			links: [
				{ label: "Gallery", href: "/gallery" },
				{ label: "Book Your Stay", href: "/reserve" },
				{ label: "Home", href: "/" },
			],
		},
		{
			title: "Connect",
			links: [
				{ label: contact.email, href: contact.emailHref },
				...contact.phones,
			],
		},
	],
	socials: [
		{ label: "Instagram", href: "https://www.instagram.com/ulommiri" },
		{ label: "TikTok", href: "https://www.tiktok.com/@ulommiri" },
		{ label: "Snapchat", href: "https://www.snapchat.com/@ulommiri" },
	],
	location: "Lakefront · United States",
};
