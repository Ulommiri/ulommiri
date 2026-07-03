import type { StaticImageData } from "next/image";
import {
	suiteMorning,
	gameRoom,
	poolLakeview,
	lakeCinema,
	dockYoga,
	omakaseChef,
	gardenToast,
	poolsideCinema,
	cinemaDeck,
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
	className: string;
};

export const galleryImages: GalleryImage[] = [
	{
		src: lakeCinema,
		alt: "Open-air cinema over the lake at dusk",
		className: "col-span-6 row-span-2 md:col-span-4",
	},
	{
		src: poolLakeview,
		alt: "The infinity pool meeting the lake",
		className: "col-span-6 md:col-span-4",
	},
	{
		src: omakaseChef,
		alt: "Omakase prepared at the counter",
		className: "col-span-6 md:col-span-4",
	},
	{
		src: gameRoom,
		alt: "The lakeview games loft",
		className: "col-span-6 md:col-span-4",
	},
	{
		src: dockYoga,
		alt: "Sunrise yoga on the floating dock",
		className: "col-span-6 row-span-2 md:col-span-4",
	},
	{
		src: gardenToast,
		alt: "Garden gatherings at golden hour",
		className: "col-span-6 md:col-span-4",
	},
];

export const reserve = {
	eyebrow: "Stay",
	headline: "Come be held by the water",
	body: "A limited number of chambers open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm.",
	cta: "Book your stay",
	note: "Enquiries answered within 24 hours",
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
				{ label: "Instagram", href: "#" },
				{ label: "hello@ulommiri.com", href: "mailto:hello@ulommiri.com" },
				{ label: "+1 (000) 000-0000", href: "tel:+10000000000" },
			],
		},
	],
	location: "Lakefront · United States",
};
