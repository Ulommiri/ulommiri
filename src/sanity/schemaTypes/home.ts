import { defineArrayMember, defineField, defineType } from "sanity";

export const home = defineType({
	name: "home",
	title: "Home Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "ethos", title: "The House" },
		{ name: "chambers", title: "Chambers" },
		{ name: "offerings", title: "Experiences" },
		{ name: "gallery", title: "Gallery" },
		{ name: "faqs", title: "FAQs" },
		{ name: "reserve", title: "Reserve" },
	],
	fields: [
		defineField({
			name: "heroVideoUrl",
			title: "Hero background video URL",
			type: "url",
			group: "hero",
		}),
		defineField({
			name: "heroFilmUrl",
			title: "Film video URL (Watch the film button)",
			description:
				"Optional. A separate video for the 'Watch the film' button. Leave empty to reuse the hero background video.",
			type: "url",
			group: "hero",
		}),
		defineField({
			name: "heroEyebrow",
			title: "Hero eyebrow",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroHeadlineLine1",
			title: "Headline line 1",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroHeadlineLine2",
			title: "Headline line 2",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroHeadlineAccent",
			title: "Headline accent line (gold italic)",
			type: "string",
			group: "hero",
		}),
		defineField({
			name: "heroStandfirst",
			title: "Hero standfirst",
			type: "text",
			rows: 3,
			group: "hero",
		}),

		defineField({
			name: "ethosEyebrow",
			title: "Eyebrow",
			type: "string",
			group: "ethos",
		}),
		defineField({
			name: "ethosBody",
			title: "Body",
			type: "text",
			rows: 5,
			group: "ethos",
		}),
		defineField({
			name: "ethosSignature",
			title: "Signature line",
			type: "string",
			group: "ethos",
		}),

		defineField({
			name: "chambers",
			title: "Chambers",
			type: "array",
			group: "chambers",
			of: [
				defineArrayMember({
					type: "object",
					name: "chamber",
					fields: [
						defineField({ name: "name", title: "Name", type: "string" }),
						defineField({ name: "tagline", title: "Tagline", type: "string" }),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "size",
							title: "Size / detail label",
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
						select: { title: "name", subtitle: "tagline", media: "image" },
					},
				}),
			],
		}),

		defineField({
			name: "offerings",
			title: "Experiences",
			type: "array",
			group: "offerings",
			of: [
				defineArrayMember({
					type: "object",
					name: "offering",
					fields: [
						defineField({ name: "title", title: "Title", type: "string" }),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						}),
					],
					preview: { select: { title: "title", subtitle: "description" } },
				}),
			],
		}),

		defineField({
			name: "gallery",
			title: "Gallery",
			type: "array",
			group: "gallery",
			of: [
				defineArrayMember({
					type: "object",
					name: "galleryImage",
					fields: [
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
						}),
						defineField({
							name: "alt",
							title: "Caption / alt text",
							type: "string",
						}),
					],
					preview: { select: { title: "alt", media: "image" } },
				}),
			],
		}),

		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			group: "faqs",
			of: [
				defineArrayMember({
					type: "object",
					name: "faq",
					fields: [
						defineField({ name: "question", title: "Question", type: "string" }),
						defineField({
							name: "answer",
							title: "Answer",
							type: "text",
							rows: 4,
						}),
					],
					preview: { select: { title: "question" } },
				}),
			],
		}),

		defineField({
			name: "reserveEyebrow",
			title: "Eyebrow",
			type: "string",
			group: "reserve",
		}),
		defineField({
			name: "reserveHeadline",
			title: "Headline",
			type: "string",
			group: "reserve",
		}),
		defineField({
			name: "reserveBody",
			title: "Body",
			type: "text",
			rows: 3,
			group: "reserve",
		}),
		defineField({
			name: "reserveCta",
			title: "Button label",
			type: "string",
			group: "reserve",
		}),
		defineField({
			name: "reserveNote",
			title: "Note under button",
			type: "string",
			group: "reserve",
		}),
	],
	preview: {
		prepare: () => ({ title: "Home Page" }),
	},
});
