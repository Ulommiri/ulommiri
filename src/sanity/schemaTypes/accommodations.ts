import { defineArrayMember, defineField, defineType } from "sanity";

export const accommodations = defineType({
	name: "accommodations",
	title: "Accommodations Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "facts", title: "The house at a glance" },
		{ name: "interiors", title: "Inside the house" },
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
			name: "factsLabel",
			title: "Section label",
			type: "string",
			group: "facts",
		}),
		defineField({
			name: "factsTitleLine1",
			title: "Title line 1",
			type: "string",
			group: "facts",
		}),
		defineField({
			name: "factsTitleLine2",
			title: "Title line 2 (gold italic)",
			type: "string",
			group: "facts",
		}),
		defineField({
			name: "facts",
			title: "Facts",
			description:
				"Leave a value empty to hide that fact until the number is confirmed.",
			type: "array",
			group: "facts",
			of: [
				defineArrayMember({
					type: "object",
					name: "fact",
					fields: [
						defineField({ name: "label", title: "Label", type: "string" }),
						defineField({ name: "value", title: "Value", type: "string" }),
					],
					preview: { select: { title: "value", subtitle: "label" } },
				}),
			],
		}),
		defineField({
			name: "spaces",
			title: "Named spaces",
			description: "Rooms and areas listed beside the facts.",
			type: "array",
			group: "facts",
			of: [defineArrayMember({ type: "string" })],
		}),
		defineField({
			name: "interiorsLabel",
			title: "Section label",
			type: "string",
			group: "interiors",
		}),
		defineField({
			name: "interiorsTitleLine1",
			title: "Title line 1",
			type: "string",
			group: "interiors",
		}),
		defineField({
			name: "interiorsTitleLine2",
			title: "Title line 2 (gold italic)",
			type: "string",
			group: "interiors",
		}),
		defineField({
			name: "interiors",
			title: "Photographs",
			type: "array",
			group: "interiors",
			of: [
				defineArrayMember({
					type: "object",
					name: "interior",
					fields: [
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
						}),
						defineField({ name: "caption", title: "Caption", type: "string" }),
						defineField({ name: "alt", title: "Alt text", type: "string" }),
					],
					preview: { select: { title: "caption", media: "image" } },
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
		prepare: () => ({ title: "Accommodations Page" }),
	},
});
