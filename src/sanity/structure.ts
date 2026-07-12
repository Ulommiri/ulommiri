import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Home Page")
				.id("home")
				.child(S.document().schemaType("home").documentId("home")),
			S.listItem()
				.title("Experiences Page")
				.id("experiences")
				.child(
					S.document().schemaType("experiences").documentId("experiences")
				),
			S.listItem()
				.title("Accommodations Page")
				.id("accommodations")
				.child(
					S.document()
						.schemaType("accommodations")
						.documentId("accommodations")
				),
			S.listItem()
				.title("Events Page")
				.id("events")
				.child(S.document().schemaType("events").documentId("events")),
			S.listItem()
				.title("Gallery Page")
				.id("galleryPage")
				.child(
					S.document().schemaType("galleryPage").documentId("galleryPage")
				),
			S.listItem()
				.title("Location Page")
				.id("location")
				.child(S.document().schemaType("location").documentId("location")),
			S.listItem()
				.title("Reserve Page")
				.id("reservePage")
				.child(
					S.document().schemaType("reservePage").documentId("reservePage")
				),
			S.listItem()
				.title("Our Chefs Page")
				.id("chefs")
				.child(S.document().schemaType("chefs").documentId("chefs")),
			S.listItem()
				.title("Site Settings")
				.id("settings")
				.child(S.document().schemaType("settings").documentId("settings")),
		]);
