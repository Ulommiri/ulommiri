import { defineField, defineType } from "sanity";

export const galleryPage = defineType({
	name: "galleryPage",
	title: "Gallery Page",
	type: "document",
	groups: [
		{ name: "intro", title: "Intro" },
		{ name: "cta", title: "Call to action" },
	],
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow",
			type: "string",
			group: "intro",
		}),
		defineField({
			name: "titleLine1",
			title: "Title line 1",
			type: "string",
			group: "intro",
		}),
		defineField({
			name: "titleLine2",
			title: "Title line 2 (gold italic)",
			type: "string",
			group: "intro",
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
		prepare: () => ({ title: "Gallery Page" }),
	},
});
