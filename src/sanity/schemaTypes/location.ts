import { defineArrayMember, defineField, defineType } from "sanity";

export const location = defineType({
	name: "location",
	title: "Location Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "setting", title: "The Setting" },
		{ name: "details", title: "Details" },
		{ name: "closing", title: "Closing" },
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
			name: "settingLabel",
			title: "Section label",
			type: "string",
			group: "setting",
		}),
		defineField({
			name: "settingText",
			title: "Section statement",
			type: "text",
			rows: 4,
			group: "setting",
		}),
		defineField({
			name: "details",
			title: "Detail cards",
			type: "array",
			group: "details",
			of: [
				defineArrayMember({
					type: "object",
					name: "detail",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({
							name: "body",
							title: "Body",
							type: "text",
							rows: 3,
						}),
					],
					preview: { select: { title: "title", subtitle: "body" } },
				}),
			],
		}),
		defineField({
			name: "closingImage",
			title: "Closing image",
			type: "image",
			options: { hotspot: true },
			group: "closing",
		}),
		defineField({
			name: "closingLine",
			title: "Closing line",
			type: "string",
			group: "closing",
		}),
		defineField({
			name: "closingCoords",
			title: "Coordinates label",
			type: "string",
			group: "closing",
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
		prepare: () => ({ title: "Location Page" }),
	},
});
