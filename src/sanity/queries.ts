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

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
	contactEmail,
	contactPhones,
	socials[]{ label, href },
	footerTagline,
	footerLocation
}`);
