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
				.title("Site Settings")
				.id("settings")
				.child(S.document().schemaType("settings").documentId("settings")),
		]);
