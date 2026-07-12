import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/interactive/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/interactive/scroll-progress";
import { getSiteSettings } from "@/sanity/content";

// Caps the HTML Cache-Control s-maxage: DigitalOcean's edge (Cloudflare)
// caches pages per s-maxage and cannot be purged by revalidateTag, so HTML
// must expire quickly there. Sanity data stays cached via tagged fetches.
export const revalidate = 10;

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await getSiteSettings();

	return (
		<>
			<Cursor />
			<ScrollProgress />
			<SmoothScroll>
				<Navbar />
				{children}
				<Footer settings={settings} />
			</SmoothScroll>
		</>
	);
}
