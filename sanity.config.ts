"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletonTypes = new Set(["home", "settings"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	schema,
	document: {
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(
						({ action }) => action && singletonActions.has(action)
					)
				: input,
	},
	plugins: [
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
