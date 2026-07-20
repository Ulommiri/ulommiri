import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY_RUN = process.argv.includes("--dry-run");

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
	throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: "2024-10-01",
	token,
	useCdn: false,
});

const imagesDir = path.join(root, "src", "assets", "images");

const photos = [
	{ key: "great-room-lake", file: "great-room-lake.jpg", caption: "The great room", alt: "The double-height great room facing the lake" },
	{ key: "living-room-fireplace", file: "living-room-fireplace.jpg", caption: "The living room", alt: "The living room fireplace and walnut wall" },
	{ key: "kitchen", file: "kitchen.jpg", caption: "The kitchen", alt: "The chef's kitchen in white stone" },
	{ key: "dining-lakeview", file: "dining-lakeview.jpg", caption: "The dining room", alt: "The dining table looking out to the water" },
	{ key: "terrace-lakeview", file: "terrace-lakeview.jpg", caption: "The terrace", alt: "The covered terrace above the lake" },
	{ key: "nursery", file: "nursery.jpg", caption: "The nursery", alt: "The nursery and its lit alcoves" },
	{ key: "house-rear-pool", file: "house-rear-pool.jpg", caption: "The pool terrace", alt: "The pool terrace and lawn from above" },
	{ key: "house-entrance-dusk", file: "house-entrance-dusk.jpg", caption: "The approach", alt: "The house at dusk from the drive" },
	{ key: "house-aerial-lake", file: "house-aerial-lake.jpg", caption: "The grounds", alt: "The grounds and the lake from above" },
	{ key: "kitchen-lakeview", file: "kitchen-lakeview.jpg", caption: "The kitchen, toward the water", alt: "The kitchen looking through to the lake" },
	{ key: "bedroom-suite", file: "bedroom-suite.jpg", caption: "A bedroom suite", alt: "A bedroom suite in linen and warm oak" },
	{ key: "primary-bath", file: "primary-bath.jpg", caption: "The primary bath", alt: "The primary bathroom with freestanding tub and walk-in shower" },
	{ key: "guest-bath-white", file: "guest-bath-white.jpg", caption: "A guest bath", alt: "A guest bathroom in white subway tile" },
	{ key: "guest-bath-black", file: "guest-bath-black.jpg", caption: "A guest bath", alt: "A guest bathroom in black tile" },
	{ key: "guest-bath-subway", file: "guest-bath-subway.jpg", caption: "A guest bath", alt: "A guest bathroom with vessel basin and walk-in shower" },
	{ key: "games-loft", file: "games-loft.jpg", caption: "The games loft", alt: "The billiards loft with a wet bar and lake views" },
	{ key: "media-lounge", file: "media-lounge.jpg", caption: "The media lounge", alt: "The media lounge with floor seating and a garden door" },
	{ key: "study", file: "study.jpg", caption: "The study", alt: "The study with a sculpted desk and lit alcoves" },
	{ key: "house-rear-day", file: "house-rear-day.jpg", caption: "The rear elevation", alt: "The rear of the house and the pool in daylight" },
	{ key: "house-front-day", file: "house-front-day.jpg", caption: "The approach", alt: "The front of the house in daylight" },
	{ key: "lake-aerial-wide", file: "lake-aerial-wide.jpg", caption: "The lake", alt: "The house on the lake from above" },
];

const upgrades = [
	{ key: "living-room-fireplace", file: "living-room-fireplace-hd.jpg" },
	{ key: "terrace-lakeview", file: "terrace-lakeview-hd.jpg" },
];

const facts = [
	{ key: "bedrooms", label: "Bedrooms", value: "" },
	{ key: "bathrooms", label: "Bathrooms", value: "" },
	{ key: "sleeps", label: "Sleeps", value: "14 guests" },
	{ key: "interior", label: "Interior", value: "" },
	{ key: "garage", label: "Garage", value: "3 bays" },
	{ key: "grounds", label: "Grounds", value: "Private lakefront" },
];

const spaces = [
	"Double-height great room",
	"Living room with fireplace",
	"Chef's kitchen",
	"Lakeview dining",
	"Covered terrace",
	"Nursery",
	"Games loft",
	"Infinity pool",
];

const enquiryRecipients = ["info@onuestates.com", "adamcmcw@gmail.com"];

const assetCache = new Map();

async function uploadImage(filename) {
	if (assetCache.has(filename)) return assetCache.get(filename);
	const filePath = path.join(imagesDir, filename);
	if (!fs.existsSync(filePath)) throw new Error(`Missing image: ${filePath}`);
	const asset = await client.assets.upload("image", fs.createReadStream(filePath), { filename });
	assetCache.set(filename, asset._id);
	return asset._id;
}

async function imageField(filename) {
	const assetId = await uploadImage(filename);
	return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function run() {
	console.log(`Project ${projectId} / dataset ${dataset}${DRY_RUN ? " — DRY RUN" : ""}`);

	const home = await client.getDocument("home");
	const accommodations = await client.getDocument("accommodations");
	const settings = await client.getDocument("settings");

	if (!home || !accommodations || !settings) {
		throw new Error("Expected home, accommodations and settings documents to exist. Run npm run seed first.");
	}

	const existingGalleryKeys = new Set((home.gallery ?? []).map((g) => g._key));
	const missingGallery = photos.filter((p) => !existingGalleryKeys.has(`house-${p.key}`));

	const existingInteriorKeys = new Set((accommodations.interiors ?? []).map((i) => i._key));
	const missingInteriors = photos.filter((p) => !existingInteriorKeys.has(`interior-${p.key}`));

	console.log(`Gallery: ${(home.gallery ?? []).length} existing, ${missingGallery.length} to append`);
	console.log(`Interiors: ${(accommodations.interiors ?? []).length} existing, ${missingInteriors.length} to append`);
	console.log(`Facts: ${(accommodations.facts ?? []).length} existing`);
	console.log(`Enquiry recipients: ${JSON.stringify(settings.enquiryRecipients ?? [])} existing`);

	const widths = await client.fetch(
		`{
			"gallery": *[_id == "home"][0].gallery[]{ _key, "w": image.asset->metadata.dimensions.width },
			"interiors": *[_id == "accommodations"][0].interiors[]{ _key, "w": image.asset->metadata.dimensions.width }
		}`
	);
	const widthFor = (rows, key) => (rows ?? []).find((r) => r._key === key)?.w ?? 0;

	const pendingUpgrades = upgrades.flatMap((u) => {
		const targets = [];
		if (widthFor(widths.gallery, `house-${u.key}`) && widthFor(widths.gallery, `house-${u.key}`) < 1500) {
			targets.push({ doc: "home", path: `gallery[_key=="house-${u.key}"].image`, file: u.file });
		}
		if (widthFor(widths.interiors, `interior-${u.key}`) && widthFor(widths.interiors, `interior-${u.key}`) < 1500) {
			targets.push({ doc: "accommodations", path: `interiors[_key=="interior-${u.key}"].image`, file: u.file });
		}
		return targets;
	});

	console.log(`Low-resolution photographs to upgrade: ${pendingUpgrades.length}`);

	if (DRY_RUN) {
		console.log("Dry run — nothing written.");
		return;
	}

	if (missingGallery.length) {
		const members = [];
		for (const p of missingGallery) {
			members.push({
				_type: "galleryImage",
				_key: `house-${p.key}`,
				alt: p.alt,
				image: await imageField(p.file),
			});
		}
		await client.patch("home").setIfMissing({ gallery: [] }).append("gallery", members).commit();
		console.log(`✓ Appended ${members.length} photographs to the gallery`);
	}

	if (missingInteriors.length) {
		const members = [];
		for (const p of missingInteriors) {
			members.push({
				_type: "interior",
				_key: `interior-${p.key}`,
				caption: p.caption,
				alt: p.alt,
				image: await imageField(p.file),
			});
		}
		await client
			.patch("accommodations")
			.setIfMissing({ interiors: [] })
			.append("interiors", members)
			.commit();
		console.log(`✓ Appended ${members.length} photographs to Inside the house`);
	}

	await client
		.patch("accommodations")
		.setIfMissing({
			factsLabel: "The House",
			factsTitleLine1: "Everything",
			factsTitleLine2: "under one roof",
			facts: facts.map((f) => ({ _type: "fact", _key: f.key, label: f.label, value: f.value })),
			spaces,
			interiorsLabel: "Inside",
			interiorsTitleLine1: "The house,",
			interiorsTitleLine2: "room by room",
		})
		.commit();
	console.log("✓ House facts and section copy ensured (existing values kept)");

	await client
		.patch("galleryPage")
		.setIfMissing({
			collageLabel: "Every Room",
			collageTitleLine1: "The whole house,",
			collageTitleLine2: "at a glance",
		})
		.commit();
	console.log("✓ Gallery collage copy ensured (existing values kept)");

	for (const upgrade of pendingUpgrades) {
		await client
			.patch(upgrade.doc)
			.set({ [upgrade.path]: await imageField(upgrade.file) })
			.commit();
		console.log(`✓ Upgraded ${upgrade.path} to the high-resolution photograph`);
	}

	await client.patch("settings").setIfMissing({ enquiryRecipients }).commit();
	console.log("✓ Enquiry recipients ensured (existing list kept)");

	console.log("Done. Nothing existing was overwritten.");
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
