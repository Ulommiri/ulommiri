import { defineField, defineType } from "sanity";

export const reservePage = defineType({
	name: "reservePage",
	title: "Reserve Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "enquire", title: "Enquire" },
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
			name: "enquireLabel",
			title: "Section label",
			type: "string",
			group: "enquire",
		}),
		defineField({
			name: "enquireLeadLine",
			title: "Headline lead line",
			type: "string",
			group: "enquire",
		}),
		defineField({
			name: "enquireAccent",
			title: "Headline accent (gold italic)",
			type: "string",
			group: "enquire",
		}),
		defineField({
			name: "enquireBody",
			title: "Body",
			type: "text",
			rows: 3,
			group: "enquire",
		}),
	],
	preview: {
		prepare: () => ({ title: "Reserve Page" }),
	},
});
