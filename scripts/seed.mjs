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

const experienceItems = [
	{
		title: "Private Omakase",
		tagline: "At the counter",
		description:
			"A resident chef builds a sushi counter inside the house, course by course, from the day's finest cuts — theatre, dinner and ritual in one sitting.",
		meta: "Resident chef · by the evening",
		file: "omakase-chef.jpg",
	},
	{
		title: "Sunrise Dock Yoga",
		tagline: "On the water",
		description:
			"Slow flows on the floating deck as the lake wakes and the mist still rests on the surface, a guide unrolling the morning one breath at a time.",
		meta: "Daily · at sunrise",
		file: "dock-yoga.jpg",
	},
	{
		title: "The Infinity Pool",
		tagline: "Golden hour",
		description:
			"A mirror of warm water that dissolves into the lake at the horizon, sun-loungers and shade and a glass of something cold within easy reach.",
		meta: "Heated · lakefront",
		file: "pool-lakeview.jpg",
	},
	{
		title: "Open-Air Cinema",
		tagline: "Under the stars",
		description:
			"A screen raised over the water at dusk, blankets and warm light on the dock, films that run long into the still, dark evening.",
		meta: "On the dock · at dusk",
		file: "lake-cinema.jpg",
	},
	{
		title: "Garden Gatherings",
		tagline: "Long tables",
		description:
			"Long-table lunches and golden-hour toasts among the flowers and the trees, the kind of afternoon that forgets to end.",
		meta: "By arrangement",
		file: "garden-toast.jpg",
	},
	{
		title: "The Games Loft",
		tagline: "Between swims",
		description:
			"Billiards, a lounge and lake views for the unhurried competitive hours between the water and the table.",
		meta: "Billiards · lounge",
		file: "game-room.jpg",
	},
];

async function buildExperiences() {
	const itemMembers = [];
	for (let i = 0; i < experienceItems.length; i++) {
		const it = experienceItems[i];
		itemMembers.push({
			_type: "experience",
			_key: `experience-${i}`,
			title: it.title,
			tagline: it.tagline,
			description: it.description,
			meta: it.meta,
			image: await imageField(it.file),
		});
	}

	return {
		_id: "experiences",
		_type: "experiences",
		heroVideoUrl:
			"https://res.cloudinary.com/dkoi9zeli/video/upload/v1783027894/Ulomiri-Highlight-Reel-Trim_1_hbprs7.mp4",
		heroImage: await imageField("omakase-chef.jpg"),
		heroEyebrow: "Experiences",
		heroTitleLine1: "Days made",
		heroTitleLine2: "of water",
		heroSubtitle:
			"Private omakase at the counter, sunrise yoga on the dock, films raised over the lake at dusk — the house is a series of slow, deliberate pleasures, arranged by conversation and shaped to your rhythm.",
		items: itemMembers,
		ctaTitleLine1: "Come be held",
		ctaTitleLine2: "by the water",
		ctaBody:
			"Tell us how you like to spend a day, and we will build it into the house before you arrive.",
	};
}

async function buildAccommodations() {
	return {
		_id: "accommodations",
		_type: "accommodations",
		heroImage: await imageField("suite-window.jpg"),
		heroEyebrow: "Accommodations",
		heroTitleLine1: "Rooms that",
		heroTitleLine2: "face the water",
		heroSubtitle:
			"Linen, light and quiet — every chamber opens toward the lake, so the water is the first thing you see and the last thing you hear.",
		ctaTitleLine1: "Wake to",
		ctaTitleLine2: "the water",
		ctaBody:
			"A limited number of chambers open each season. Reserve the house and we will prepare it exactly to your rhythm.",
	};
}

const eventItems = [
	{
		title: "Garden Celebrations",
		tagline: "Golden-hour toasts",
		description:
			"Intimate celebrations among the flowers and the trees — long tables, warm light and the lake as a backdrop.",
		meta: "Up to 40 guests",
		file: "garden-toast.jpg",
	},
	{
		title: "Poolside Evenings",
		tagline: "Warm nights by the water",
		description:
			"The pool deck after dark, lit low and gathered close, cocktails and cinema beneath the open sky.",
		meta: "Cocktails · cinema",
		file: "poolside-cinema.jpg",
	},
	{
		title: "Cinema on the Dock",
		tagline: "Films over the lake",
		description:
			"A private screening raised over still water, the whole house turned toward a single glowing screen.",
		meta: "Private screenings",
		file: "cinema-deck.jpg",
	},
];

async function buildEvents() {
	const itemMembers = [];
	for (let i = 0; i < eventItems.length; i++) {
		const it = eventItems[i];
		itemMembers.push({
			_type: "event",
			_key: `event-${i}`,
			title: it.title,
			tagline: it.tagline,
			description: it.description,
			meta: it.meta,
			image: await imageField(it.file),
		});
	}

	return {
		_id: "events",
		_type: "events",
		heroImage: await imageField("garden-toast.jpg"),
		heroEyebrow: "Events",
		heroTitleLine1: "Gatherings",
		heroTitleLine2: "by the water",
		heroSubtitle:
			"Long-table lunches, garden celebrations and evenings that drift late — the house holds a small number of gatherings each season, each one built around the water.",
		items: itemMembers,
		ctaTitleLine1: "Let the water",
		ctaTitleLine2: "hold your day",
		ctaBody:
			"Tell us what you are celebrating, and we will shape the house around it.",
		ctaLabel: "Enquire about events",
	};
}

const galleryPage = {
	_id: "galleryPage",
	_type: "galleryPage",
	eyebrow: "Gallery",
	titleLine1: "The house,",
	titleLine2: "in light",
	ctaTitleLine1: "Seen enough",
	ctaTitleLine2: "to stay?",
	ctaBody:
		"The photographs only hold still. The house does not — come let it move around you.",
};

async function buildLocation() {
	return {
		_id: "location",
		_type: "location",
		heroImage: await imageField("aerial-estate.jpg"),
		heroEyebrow: "Location",
		heroTitleLine1: "On the edge",
		heroTitleLine2: "of the water",
		heroSubtitle:
			"Set into the treeline where the lawn meets the lake — private, unhurried, and a world away while still within easy reach.",
		settingLabel: "The Setting",
		settingText:
			"The house keeps its own weather. Forest on three sides, water on the fourth, and a stillness that arrives the moment the trees close behind you.",
		details: [
			{
				_type: "detail",
				_key: "detail-0",
				title: "The Setting",
				body: "Wrapped in old trees, the house sits where a private lawn slips gently into the lake — no through-road, no neighbours in sight, only water and the long green quiet.",
			},
			{
				_type: "detail",
				_key: "detail-1",
				title: "Getting Here",
				body: "An easy drive from the city and its airport, then a final turn through the trees. Arrivals by water are welcome; a boat waits at the dock.",
			},
			{
				_type: "detail",
				_key: "detail-2",
				title: "A Private Address",
				body: "Ulọmmiri is a private residence. The exact location and gate details are shared with confirmed guests ahead of arrival.",
			},
		],
		closingImage: await imageField("dock-yoga.jpg"),
		closingLine: "Coordinates on request",
		closingCoords: "34°N · 84°W",
		ctaTitleLine1: "Find your way",
		ctaTitleLine2: "to the water",
		ctaBody:
			"Reserve the house and we will send directions, gate codes and a warm welcome ahead of your arrival.",
	};
}

async function buildReservePage() {
	return {
		_id: "reservePage",
		_type: "reservePage",
		heroImage: await imageField("lake-cinema.jpg"),
		heroEyebrow: "Book Your Stay",
		heroTitleLine1: "Reserve",
		heroTitleLine2: "the house",
		heroSubtitle:
			"A limited number of stays open each season. Reservations are made by conversation, so the house can be prepared exactly to your rhythm.",
		enquireLabel: "Enquire",
		enquireLeadLine: "Begin with a",
		enquireAccent: "conversation",
		enquireBody:
			"Share your dates and the shape of your stay. We answer every enquiry within 24 hours and hold the house to a single booking at a time.",
	};
}

async function buildChefs() {
	return {
		_id: "chefs",
		_type: "chefs",
		heroImage: await imageField("omakase-chef.jpg"),
		heroEyebrow: "Available by request",
		heroTitleLine1: "Resident",
		heroTitleLine2: "Chefs",
		heroSubtitle:
			"Every memorable stay is accompanied by exceptional dining. Our resident chefs bring world-class culinary expertise to the estate, creating intimate, restaurant-quality experiences that unfold in the privacy of your home. Whether it's an elegant omakase at the counter or a family-style celebration, every menu is thoughtfully crafted and tailored to your occasion.",
		items: [
			{
				_type: "chef",
				_key: "chef-0",
				name: "Chef Alex",
				role: "Founder, Homekase | Japanese Omakase Specialist",
				bio: "With more than two decades of experience in Japanese gastronomy, Chef Alex has dedicated his career to mastering the precision, artistry, and quiet elegance that define authentic Japanese cuisine. His passion for omakase inspired the creation of Homekase—a concept centered on bringing refined, chef-led dining into the intimacy of a private setting.\n\nAt the estate, Chef Alex curates bespoke omakase experiences where every course is prepared before guests with meticulous attention to detail, seasonal ingredients, and traditional techniques. Each dinner is a journey through Japanese culinary craftsmanship, designed to be as memorable as the setting itself.",
				image: await imageField("omakase-chef.jpg"),
			},
			{
				_type: "chef",
				_key: "chef-1",
				name: "Chef Corneal",
				role: "Private Chef | Global & Contemporary Cuisine",
				bio: "With more than a decade of professional culinary experience, Chef Corneal is celebrated for her versatility and ability to transform any occasion into an extraordinary dining experience. From elevated Southern comfort and African cuisine to Mediterranean classics, contemporary American fare, brunches, seafood feasts, and elegant multi-course dinners, her menus are thoughtfully tailored to every guest and every gathering.\n\nKnown for her warm hospitality and creative approach, Chef Corneal combines exceptional technique with bold flavors, ensuring every meal feels both deeply personal and effortlessly refined.",
				image: await imageField("chef-portrait.jpg"),
			},
		],
		quote:
			"Luxury is measured not only by where you stay, but by the moments shared over a beautifully prepared meal.",
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
	await client.createIfNotExists(home);
	console.log("✓ Home Page document ensured (kept existing edits)");

	await client.createIfNotExists(settings);
	console.log("✓ Site Settings document ensured (kept existing edits)");

	const pages = [
		["Experiences Page", await buildExperiences()],
		["Accommodations Page", await buildAccommodations()],
		["Events Page", await buildEvents()],
		["Gallery Page", galleryPage],
		["Location Page", await buildLocation()],
		["Reserve Page", await buildReservePage()],
		["Our Chefs Page", await buildChefs()],
	];

	for (const [label, doc] of pages) {
		await client.createIfNotExists(doc);
		console.log(`✓ ${label} document ensured (kept existing edits)`);
	}

	console.log(
		"Done. The seed never overwrites existing documents — to reset a page, delete it in /studio first, then re-run."
	);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
