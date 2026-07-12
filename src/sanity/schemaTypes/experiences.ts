import { defineArrayMember, defineField, defineType } from "sanity";

export const experiences = defineType({
	name: "experiences",
	title: "Experiences Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "items", title: "Experiences" },
		{ name: "cta", title: "Call to action" },
	],
	fields: [
		defineField({
			name: "heroVideoUrl",
			title: "Hero background video URL",
			description:
				"Optional. A background video for the page hero. Leave empty to use the fallback image below.",
			type: "url",
			group: "hero",
		}),
		defineField({
			name: "heroImage",
			title: "Hero fallback image",
			description:
				"Shown while the video loads, or on its own if no video URL is set.",
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
			title: "Experiences",
			type: "array",
			group: "items",
			of: [
				defineArrayMember({
					type: "object",
					name: "experience",
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
	],
	preview: {
		prepare: () => ({ title: "Experiences Page" }),
	},
});
