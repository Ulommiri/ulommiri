import { Hero } from "@/components/sections/hero";
import { Ethos } from "@/components/sections/ethos";
import { Chambers } from "@/components/sections/chambers";
import { Water } from "@/components/sections/water";
import { Rituals } from "@/components/sections/rituals";
import { Gallery } from "@/components/sections/gallery";
import { Reserve } from "@/components/sections/reserve";

export default function Home() {
	return (
		<main>
			<Hero />
			<Ethos />
			<Chambers />
			<Water />
			<Rituals />
			<Gallery />
			<Reserve />
		</main>
	);
}
