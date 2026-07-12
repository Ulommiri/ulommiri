"use client";

import { ArrowRight, ArrowUp } from "lucide-react";
import { Monogram } from "@/components/brand/monogram";
import {
	InstagramIcon,
	SnapchatIcon,
	TiktokIcon,
} from "@/components/brand/social-icons";
import { ScrollLink } from "@/components/interactive/scroll-link";
import { TextLink } from "@/components/interactive/text-link";
import { footer } from "@/data/site";
import type { SiteSettings } from "@/sanity/content";

const socialIcons: Record<
	string,
	(props: { className?: string }) => React.JSX.Element
> = {
	Instagram: InstagramIcon,
	TikTok: TiktokIcon,
	Snapchat: SnapchatIcon,
};

function FooterLink({ href, label }: { href: string; label: string }) {
	const isAnchor = href.startsWith("#") && href.length > 1;
	const className = "text-sm text-ivory/60";
	return isAnchor ? (
		<ScrollLink href={href} className={className}>
			{label}
		</ScrollLink>
	) : (
		<TextLink href={href} className={className}>
			{label}
		</TextLink>
	);
}

export function Footer({ settings }: { settings: SiteSettings }) {
	const scrollTop = () => {
		if (window.__lenis) window.__lenis.scrollTo(0);
		else window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const columns = [
		footer.columns[0],
		footer.columns[1],
		{
			title: "Connect",
			links: [
				{ label: settings.contactEmail, href: settings.contactEmailHref },
				...settings.contactPhones,
			],
		},
	];

	return (
		<footer className="relative border-t border-border bg-espresso pt-20 pb-10">
			<div className="mx-auto max-w-360 px-6 md:px-12">
				<div className="flex flex-col gap-14 border-b border-border pb-16 lg:flex-row lg:justify-between">
					<div className="max-w-sm">
						<div className="flex items-center gap-4 text-gold">
							<Monogram className="h-12" />
							<span className="font-display text-3xl tracking-[0.28em] text-ivory">
								UL&#7884;MMIRI
							</span>
						</div>
						<p className="mt-6 font-display text-2xl text-ivory/70 italic">
							{settings.footerTagline}
						</p>
						<div className="mt-8 flex items-center gap-3">
							{settings.socials.map((social) => {
								const Icon = socialIcons[social.label];
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-gold/30 text-ivory/70 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-obsidian"
									>
										{Icon ? (
											<Icon className="size-4" />
										) : (
											<span className="text-xs">{social.label[0]}</span>
										)}
									</a>
								);
							})}
						</div>
					</div>

					<div className="max-w-sm">
						<p className="eyebrow text-brass">Stay close to the water</p>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="mt-5 flex items-center gap-3 border-b border-border pb-3 focus-within:border-gold/50"
						>
							<input
								type="email"
								required
								placeholder="Your email"
								className="w-full bg-transparent text-base text-ivory placeholder:text-ivory/40 focus:outline-none"
							/>
							<button
								type="submit"
								aria-label="Subscribe"
								className="cursor-pointer text-gold transition-transform duration-300 hover:translate-x-1"
							>
								<ArrowRight className="size-5" />
							</button>
						</form>
						<p className="mt-4 text-xs text-ivory/40">
							Occasional letters from the house. No noise, only water.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-3">
					{columns.map((column) => (
						<div key={column.title}>
							<p className="eyebrow mb-6 text-brass">{column.title}</p>
							<ul className="flex flex-col gap-4">
								{column.links.map((link) => (
									<li key={link.label}>
										<FooterLink href={link.href} label={link.label} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
					<p className="text-xs tracking-[0.15em] text-ivory/40 uppercase">
						&copy; {new Date().getFullYear()} Ul&#7884;mmiri &middot;{" "}
						{settings.footerLocation}
					</p>
					<button
						onClick={scrollTop}
						className="group flex cursor-pointer items-center gap-2 text-xs tracking-[0.2em] text-ivory/50 uppercase transition-colors hover:text-gold"
					>
						Back to top
						<ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
					</button>
				</div>
			</div>
		</footer>
	);
}
