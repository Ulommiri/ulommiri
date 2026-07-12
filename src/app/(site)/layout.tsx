import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/interactive/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/interactive/scroll-progress";
import { getSiteSettings } from "@/sanity/content";

export const dynamic = "force-dynamic";

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
