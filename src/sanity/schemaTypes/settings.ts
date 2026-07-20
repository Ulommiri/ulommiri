import { defineArrayMember, defineField, defineType } from "sanity";

export const settings = defineType({
	name: "settings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "contactEmail",
			title: "Contact email",
			type: "string",
		}),
		defineField({
			name: "contactPhones",
			title: "Contact phone numbers",
			type: "array",
			of: [defineArrayMember({ type: "string" })],
		}),
		defineField({
			name: "enquiryRecipients",
			title: "Enquiry alert recipients",
			description:
				"Every address here receives an email when a reservation enquiry is submitted. Leave empty to fall back to the contact email.",
			type: "array",
			of: [defineArrayMember({ type: "string" })],
		}),
		defineField({
			name: "socials",
			title: "Social links",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "social",
					fields: [
						defineField({ name: "label", title: "Label", type: "string" }),
						defineField({ name: "href", title: "URL", type: "url" }),
					],
					preview: { select: { title: "label", subtitle: "href" } },
				}),
			],
		}),
		defineField({
			name: "footerTagline",
			title: "Footer tagline",
			type: "string",
		}),
		defineField({
			name: "footerLocation",
			title: "Footer location line",
			type: "string",
		}),
	],
	preview: {
		prepare: () => ({ title: "Site Settings" }),
	},
});
