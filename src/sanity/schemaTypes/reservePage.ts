import { defineArrayMember, defineField, defineType } from "sanity";

export const reservePage = defineType({
	name: "reservePage",
	title: "Reserve Page",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
		{ name: "enquire", title: "Enquire" },
		{ name: "availability", title: "Availability" },
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
		defineField({
			name: "blockedRanges",
			title: "Booked / blocked dates",
			description:
				"Dates already booked through any channel. Guests cannot select these on the reserve form and will see them as unavailable.",
			type: "array",
			group: "availability",
			of: [
				defineArrayMember({
					type: "object",
					name: "bookedRange",
					fields: [
						defineField({
							name: "from",
							title: "First day",
							type: "date",
							options: { dateFormat: "DD MMM YYYY" },
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "to",
							title: "Last day",
							description: "Leave empty to block a single day.",
							type: "date",
							options: { dateFormat: "DD MMM YYYY" },
						}),
						defineField({
							name: "label",
							title: "Label",
							description: "Optional note for your own reference.",
							type: "string",
						}),
					],
					preview: {
						select: { from: "from", to: "to", label: "label" },
						prepare({ from, to, label }) {
							const span = to && to !== from ? `${from} → ${to}` : from;
							return {
								title: span || "Booked period",
								subtitle: label || "Booked",
							};
						},
					},
				}),
			],
		}),
	],
	preview: {
		prepare: () => ({ title: "Reserve Page" }),
	},
});
