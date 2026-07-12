import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
	heroVideoUrl,
	heroFilmUrl,
	heroEyebrow,
	heroHeadlineLine1,
	heroHeadlineLine2,
	heroHeadlineAccent,
	heroStandfirst,
	ethosEyebrow,
	ethosBody,
	ethosSignature,
	chambers[]{
		name,
		tagline,
		description,
		size,
		"url": image.asset->url,
		"width": image.asset->metadata.dimensions.width,
		"height": image.asset->metadata.dimensions.height
	},
	offerings[]{ title, description },
	gallery[]{
		alt,
		"url": image.asset->url,
		"width": image.asset->metadata.dimensions.width,
		"height": image.asset->metadata.dimensions.height
	},
	faqs[]{ question, answer },
	reserveEyebrow,
	reserveHeadline,
	reserveBody,
	reserveCta,
	reserveNote
}`);

export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experiences"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	items[]{
		title,
		tagline,
		description,
		meta,
		"url": image.asset->url,
		"width": image.asset->metadata.dimensions.width,
		"height": image.asset->metadata.dimensions.height
	},
	ctaTitleLine1,
	ctaTitleLine2,
	ctaBody
}`);

export const CHAMBERS_QUERY = defineQuery(`*[_type == "home"][0].chambers[]{
	name,
	tagline,
	description,
	size,
	"url": image.asset->url,
	"width": image.asset->metadata.dimensions.width,
	"height": image.asset->metadata.dimensions.height
}`);

export const GALLERY_QUERY = defineQuery(`*[_type == "home"][0].gallery[]{
	alt,
	"url": image.asset->url,
	"width": image.asset->metadata.dimensions.width,
	"height": image.asset->metadata.dimensions.height
}`);

export const ACCOMMODATIONS_QUERY = defineQuery(`*[_type == "accommodations"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	ctaTitleLine1,
	ctaTitleLine2,
	ctaBody
}`);

export const EVENTS_QUERY = defineQuery(`*[_type == "events"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	items[]{
		title,
		tagline,
		description,
		meta,
		"url": image.asset->url,
		"width": image.asset->metadata.dimensions.width,
		"height": image.asset->metadata.dimensions.height
	},
	ctaTitleLine1,
	ctaTitleLine2,
	ctaBody,
	ctaLabel
}`);

export const CHEFS_QUERY = defineQuery(`*[_type == "chefs"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	items[]{
		name,
		role,
		bio,
		"url": image.asset->url,
		"width": image.asset->metadata.dimensions.width,
		"height": image.asset->metadata.dimensions.height
	},
	quote
}`);

export const GALLERY_PAGE_QUERY = defineQuery(`*[_type == "galleryPage"][0]{
	eyebrow,
	titleLine1,
	titleLine2,
	ctaTitleLine1,
	ctaTitleLine2,
	ctaBody
}`);

export const LOCATION_QUERY = defineQuery(`*[_type == "location"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	settingLabel,
	settingText,
	details[]{ title, body },
	closingLine,
	closingCoords,
	"closingImageUrl": closingImage.asset->url,
	"closingImageWidth": closingImage.asset->metadata.dimensions.width,
	"closingImageHeight": closingImage.asset->metadata.dimensions.height,
	ctaTitleLine1,
	ctaTitleLine2,
	ctaBody
}`);

export const RESERVE_QUERY = defineQuery(`*[_type == "reservePage"][0]{
	heroVideoUrl,
	heroEyebrow,
	heroTitleLine1,
	heroTitleLine2,
	heroSubtitle,
	"heroImageUrl": heroImage.asset->url,
	"heroImageWidth": heroImage.asset->metadata.dimensions.width,
	"heroImageHeight": heroImage.asset->metadata.dimensions.height,
	enquireLabel,
	enquireLeadLine,
	enquireAccent,
	enquireBody
}`);

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
	contactEmail,
	contactPhones,
	socials[]{ label, href },
	footerTagline,
	footerLocation
}`);
