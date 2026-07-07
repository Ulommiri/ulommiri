import { Hero } from "@/components/sections/hero";
import { Ethos } from "@/components/sections/ethos";
import { Chambers } from "@/components/sections/chambers";
import { Rituals } from "@/components/sections/rituals";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { Reserve } from "@/components/sections/reserve";
import { getHomeContent, getSiteSettings } from "@/sanity/content";

export default async function Home() {
	const [content, settings] = await Promise.all([
		getHomeContent(),
		getSiteSettings(),
	]);

	return (
		<main>
			<Hero hero={content.hero} />
			<Ethos ethos={content.ethos} />
			<Chambers chambers={content.chambers} />
			<Rituals offerings={content.offerings} />
			<Gallery items={content.gallery} limit={6} />
			<Faq faqs={content.faqs} contact={settings} />
			<Reserve reserve={content.reserve} />
		</main>
	);
}
