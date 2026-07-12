import { defineArrayMember, defineField, defineType } from "sanity";

export const chefs = defineType({
	name: "chefs",
	title: "Our Chefs Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "chefs", title: "Chefs" },
		{ name: "closing", title: "Closing" },
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
			title: "Intro / subtitle",
			type: "text",
			rows: 4,
			group: "hero",
		}),
		defineField({
			name: "items",
			title: "Chefs",
			type: "array",
			group: "chefs",
			of: [
				defineArrayMember({
					type: "object",
					name: "chef",
					fields: [
						defineField({ name: "name", title: "Name", type: "string" }),
						defineField({
							name: "role",
							title: "Role / credentials line",
							type: "string",
						}),
						defineField({
							name: "bio",
							title: "Biography",
							description: "Separate paragraphs with a blank line.",
							type: "text",
							rows: 8,
						}),
						defineField({
							name: "image",
							title: "Portrait",
							type: "image",
							options: { hotspot: true },
						}),
					],
					preview: {
						select: { title: "name", subtitle: "role", media: "image" },
					},
				}),
			],
		}),
		defineField({
			name: "quote",
			title: "Closing quote",
			type: "text",
			rows: 3,
			group: "closing",
		}),
	],
	preview: {
		prepare: () => ({ title: "Our Chefs Page" }),
	},
});
