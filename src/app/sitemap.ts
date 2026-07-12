import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const routes: {
		path: string;
		priority: number;
		changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
	}[] = [
		{ path: "/", priority: 1, changeFrequency: "weekly" },
		{ path: "/accommodations", priority: 0.9, changeFrequency: "monthly" },
		{ path: "/experiences", priority: 0.9, changeFrequency: "monthly" },
		{ path: "/events", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/location", priority: 0.7, changeFrequency: "monthly" },
		{ path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
		{ path: "/reserve", priority: 0.9, changeFrequency: "monthly" },
	];

	return routes.map((route) => ({
		url: `${SITE_URL}${route.path}`,
		lastModified: now,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));
}
