import type { SchemaTypeDefinition } from "sanity";

import { home } from "./home";
import { settings } from "./settings";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [home, settings],
};
