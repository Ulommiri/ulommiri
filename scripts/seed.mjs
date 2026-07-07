import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
	const file = path.join(root, ".env.local");
	if (!fs.existsSync(file)) return;
	for (const line of fs.readFileSync(file, "utf8").split("\n")) {
		const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
		if (!match) continue;
		const key = match[1];
		let value = match[2].trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		if (!(key in process.env)) process.env[key] = value;
	}
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
	throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local");
}
if (!token) {
	throw new Error(
		"Missing SANITY_API_WRITE_TOKEN in .env.local. Create an Editor token at sanity.io/manage → API → Tokens and paste it in."
	);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: "2024-10-01",
	token,
	useCdn: false,
});

const imagesDir = path.join(root, "src", "assets", "images");
const assetCache = new Map();

async function uploadImage(filename) {
	if (assetCache.has(filename)) return assetCache.get(filename);
	const filePath = path.join(imagesDir, filename);
	const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
		filename,
	});
	assetCache.set(filename, asset._id);
	return asset._id;
}

async function imageField(filename) {
	const assetId = await uploadImage(filename);
	return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

const chambers = [
	{
		name: "The Lakeview Suite",
		tagline: "Wake to the water",
		description:
			"A light-filled chamber of linen and calm, its windows opening straight onto the lake and the morning it carries.",
		size: "King suite · lake-facing",
		file: "suite-morning.jpg",
	},
	{
		name: "The Water Terrace",
		tagline: "A pool that meets the lake",
		description:
			"A heated infinity pool that dissolves into the water beyond, with sun-loungers, shade and a glass in easy reach.",
		size: "Infinity pool · sun deck",
		file: "pool-lakeview.jpg",
	},
	{
		name: "The Games Loft",
		tagline: "Long, unhurried afternoons",
		description:
			"A bright lounge of billiards and lake views, made for the slow competitive hours between swims.",
		size: "Billiards · lounge · lake views",
		file: "game-room.jpg",
	},
	{
		name: "The Floating Deck",
		tagline: "Where the evenings gather",
		description:
			"A private dock that becomes an open-air cinema at dusk, the screen glowing over still, dark water.",
		size: "Private dock · open-air cinema",
		file: "lake-cinema.jpg",
	},
];

const offerings = [
	{
		title: "Private Omakase",
		description:
			"A resident chef building a sushi counter in the house, course by course, from the day's finest cuts.",
	},
	{
		title: "Sunrise Dock Yoga",
		description:
			"Slow flows on the floating deck as the lake wakes, mist still resting on the water.",
	},
	{
		title: "The Infinity Pool",
		description:
			"A mirror of warm water that dissolves into the lake at the horizon, champagne optional but encouraged.",
	},
	{
		title: "Open-Air Cinema",
		description:
			"A screen raised over the water at dusk, blankets and warm light, films beneath the stars.",
	},
	{
		title: "Garden Gatherings",
		description:
			"Long-table lunches and golden-hour toasts among the flowers and the trees.",
	},
	{
		title: "The Games Loft",
		description:
			"Billiards, lounge and lake views for the unhurried hours between the water and the table.",
	},
];

const gallery = [
	{ file: "lake-cinema.jpg", alt: "Open-air cinema over the lake at dusk" },
	{ file: "pool-lakeview.jpg", alt: "The infinity pool meeting the lake" },
	{ file: "omakase-chef.jpg", alt: "Omakase prepared at the counter" },
	{ file: "suite-morning.jpg", alt: "Morning light in a lakeview suite" },
	{ file: "dock-yoga.jpg", alt: "Sunrise yoga on the floating dock" },
	{ file: "game-room.jpg", alt: "The lakeview games loft" },
	{ file: "garden-toast.jpg", alt: "Garden gatherings at golden hour" },
	{ file: "chef-portrait.jpg", alt: "The resident chef at the counter" },
	{ file: "poolside-cinema.jpg", alt: "Poolside evenings after dark" },
	{ file: "aerial-estate.jpg", alt: "The house and lake from above" },
	{ file: "omakase-lakeside.jpg", alt: "Omakase set beside the water" },
	{ file: "suite-window.jpg", alt: "A suite opening toward the lake" },
];

const faqs = [
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

async function buildHome() {
	const chamberMembers = [];
	for (let i = 0; i < chambers.length; i++) {
		const c = chambers[i];
		chamberMembers.push({
			_type: "chamber",
			_key: `chamber-${i}`,
			name: c.name,
			tagline: c.tagline,
			description: c.description,
			size: c.size,
			image: await imageField(c.file),
		});
	}

	const galleryMembers = [];
	for (let i = 0; i < gallery.length; i++) {
		const g = gallery[i];
		galleryMembers.push({
			_type: "galleryImage",
			_key: `gallery-${i}`,
			alt: g.alt,
			image: await imageField(g.file),
		});
	}

	return {
		_id: "home",
		_type: "home",
		heroVideoUrl:
			"https://res.cloudinary.com/dkoi9zeli/video/upload/v1783027894/Ulomiri-Highlight-Reel-Trim_1_hbprs7.mp4",
		heroEyebrow: "A private lake house · United States",
		heroHeadlineLine1: "A house",
		heroHeadlineLine2: "held by",
		heroHeadlineAccent: "water",
		heroStandfirst:
			"On the quiet edge of the lake, Ulọmmiri gathers light, silence and slow luxury into a single unbroken breath.",
		ethosEyebrow: "The House",
		ethosBody:
			"Ulọmmiri means the house held by water. Here, mornings arrive as reflections on the ceiling and the day is measured by the light on the lake rather than the clock. Every room opens toward the water, every surface remembers the hand that shaped it, and stillness is treated as the rarest luxury of all.",
		ethosSignature: "A house held by water",
		chambers: chamberMembers,
		offerings: offerings.map((o, i) => ({
			_type: "offering",
			_key: `offering-${i}`,
			title: o.title,
			description: o.description,
		})),
		gallery: galleryMembers,
		faqs: faqs.map((f, i) => ({
			_type: "faq",
			_key: `faq-${i}`,
			question: f.question,
			answer: f.answer,
		})),
		reserveEyebrow: "Stay",
		reserveHeadline: "Come be held by the water",
		reserveBody:
			"A limited number of chambers open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm.",
		reserveCta: "Book your stay",
		reserveNote: "Enquiries answered within 24 hours",
	};
}

const settings = {
	_id: "settings",
	_type: "settings",
	contactEmail: "info@onuestates.com",
	contactPhones: ["+1 (281) 798-5787", "+1 (404) 543-7492"],
	socials: [
		{
			_type: "social",
			_key: "instagram",
			label: "Instagram",
			href: "https://www.instagram.com/ulommiri",
		},
		{
			_type: "social",
			_key: "tiktok",
			label: "TikTok",
			href: "https://www.tiktok.com/@ulommiri",
		},
		{
			_type: "social",
			_key: "snapchat",
			label: "Snapchat",
			href: "https://www.snapchat.com/@ulommiri",
		},
	],
	footerTagline: "A house held by water",
	footerLocation: "Lakefront · United States",
};

async function run() {
	console.log(`Seeding project ${projectId} / dataset ${dataset} …`);
	const home = await buildHome();
	await client.createOrReplace(home);
	console.log("✓ Home Page document created");
	await client.createOrReplace(settings);
	console.log("✓ Site Settings document created");
	console.log("Done. Open /studio to review and publish.");
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
