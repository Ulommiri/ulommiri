"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function Field({
	label,
	className,
	children,
}: {
	label: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<label className={cn("flex flex-col gap-3", className)}>
			<span className="text-[0.7rem] tracking-[0.25em] text-brass uppercase">
				{label}
			</span>
			{children}
		</label>
	);
}

const fieldClass =
	"w-full border-b border-border bg-transparent pb-3 text-base text-ivory transition-colors placeholder:text-ivory/30 focus:border-gold focus:outline-none [color-scheme:dark]";

export function ReserveForm() {
	const [submitted, setSubmitted] = useState(false);

	if (submitted) {
		return (
			<div className="flex flex-col items-start gap-6 border border-border bg-espresso/40 p-10 md:p-14">
				<span className="flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold">
					<Check className="size-5" />
				</span>
				<h3 className="font-display text-3xl text-ivory">
					Your enquiry is on its way
				</h3>
				<p className="max-w-md text-base leading-relaxed text-ivory/60">
					Thank you. The house will be in touch within 24 hours to shape the
					details of your stay.
				</p>
			</div>
		);
	}

	return (
		<Reveal>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setSubmitted(true);
				}}
				className="flex flex-col gap-10"
			>
				<div className="grid gap-10 md:grid-cols-2">
					<Field label="Full name">
						<input
							type="text"
							required
							placeholder="Your name"
							className={fieldClass}
						/>
					</Field>
					<Field label="Email">
						<input
							type="email"
							required
							placeholder="you@email.com"
							className={fieldClass}
						/>
					</Field>
					<Field label="Arrival">
						<input type="date" required className={fieldClass} />
					</Field>
					<Field label="Departure">
						<input type="date" required className={fieldClass} />
					</Field>
					<Field label="Guests">
						<select required defaultValue="" className={fieldClass}>
							<option value="" disabled>
								Select
							</option>
							{["1 – 2", "3 – 4", "5 – 6", "7 – 8", "More than 8"].map(
								(option) => (
									<option
										key={option}
										value={option}
										className="bg-espresso text-ivory"
									>
										{option}
									</option>
								)
							)}
						</select>
					</Field>
					<Field label="Occasion">
						<input
							type="text"
							placeholder="Getaway, celebration…"
							className={fieldClass}
						/>
					</Field>
				</div>

				<Field label="Anything we should know">
					<textarea
						rows={4}
						placeholder="Tell us about the stay you have in mind"
						className={cn(fieldClass, "resize-none")}
					/>
				</Field>

				<div>
					<CtaButton magnetic={false}>Send enquiry</CtaButton>
				</div>
			</form>
		</Reveal>
	);
}
