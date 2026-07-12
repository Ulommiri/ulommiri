import type { SchemaTypeDefinition } from "sanity";

import { home } from "./home";
import { experiences } from "./experiences";
import { accommodations } from "./accommodations";
import { events } from "./events";
import { galleryPage } from "./galleryPage";
import { location } from "./location";
import { reservePage } from "./reservePage";
import { chefs } from "./chefs";
import { settings } from "./settings";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		home,
		experiences,
		accommodations,
		events,
		galleryPage,
		location,
		reservePage,
		chefs,
		settings,
	],
};
