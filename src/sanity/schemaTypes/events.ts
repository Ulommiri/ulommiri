import { defineArrayMember, defineField, defineType } from "sanity";

export const events = defineType({
	name: "events",
	title: "Events Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "items", title: "Events" },
		{ name: "cta", title: "Call to action" },
	],
	fields: [
		defineField({
			name: "heroVideoUrl",
			title: "Hero background video URL",
			description:
				"Optional. Leave empty to use the fallback image below as a still hero.",
			type: "url",
			group: "hero",
		}),
		defineField({
			name: "heroImage",
			title: "Hero fallback image",
			type: "image",
			options: { hotspot: true },
			group: "hero",
		}),
		defineField({
			name: "heroEyebrow",
			title: "Hero eyebrow",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroTitleLine1",
			title: "Title line 1",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroTitleLine2",
			title: "Title line 2",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroSubtitle",
			title: "Subtitle",
			type: "text",
			rows: 3,
			group: "hero",
		}),
		defineField({
			name: "items",
			title: "Events",
			type: "array",
			group: "items",
			of: [
				defineArrayMember({
					type: "object",
					name: "event",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({ name: "tagline", title: "Tagline", type: "string" }),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "meta",
							title: "Meta / detail label",
							type: "string",
						}),
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
						}),
					],
					preview: {
						select: { title: "title", subtitle: "tagline", media: "image" },
					},
				}),
			],
		}),
		defineField({
			name: "ctaTitleLine1",
			title: "CTA title line 1",
			type: "string",
			group: "cta",
		}),
		defineField({
			name: "ctaTitleLine2",
			title: "CTA title line 2",
			type: "string",
			group: "cta",
		}),
		defineField({
			name: "ctaBody",
			title: "CTA body",
			type: "text",
			rows: 3,
			group: "cta",
		}),
		defineField({
			name: "ctaLabel",
			title: "CTA button label",
			type: "string",
			group: "cta",
		}),
	],
	preview: {
		prepare: () => ({ title: "Events Page" }),
	},
});
