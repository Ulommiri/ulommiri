"use client";

import { useState } from "react";
import { format, startOfToday } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const controlClass =
	"h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-ivory shadow-none transition-colors focus-visible:border-gold focus-visible:ring-0 dark:bg-transparent";

function Field({
	label,
	htmlFor,
	className,
	children,
}: {
	label: string;
	htmlFor?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={cn("flex flex-col gap-3", className)}>
			<Label
				htmlFor={htmlFor}
				className="text-[0.7rem] tracking-[0.25em] text-brass uppercase"
			>
				{label}
			</Label>
			{children}
		</div>
	);
}

function DateField({
	label,
	date,
	onSelect,
	fromDate,
}: {
	label: string;
	date?: Date;
	onSelect: (date?: Date) => void;
	fromDate: Date;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Field label={label}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						className={cn(
							controlClass,
							"justify-between font-normal hover:bg-transparent",
							!date && "text-ivory/30"
						)}
					>
						{date ? format(date, "d MMMM yyyy") : "Select date"}
						<CalendarIcon className="size-4 text-brass" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(value) => {
							onSelect(value);
							setOpen(false);
						}}
						disabled={{ before: fromDate }}
						autoFocus
					/>
				</PopoverContent>
			</Popover>
		</Field>
	);
}

export function ReserveForm() {
	const [submitted, setSubmitted] = useState(false);
	const [arrival, setArrival] = useState<Date>();
	const [departure, setDeparture] = useState<Date>();
	const [guests, setGuests] = useState("");

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
					<Field label="Full name" htmlFor="name">
						<Input
							id="name"
							name="name"
							required
							placeholder="Your name"
							className={controlClass}
						/>
					</Field>
					<Field label="Email" htmlFor="email">
						<Input
							id="email"
							name="email"
							type="email"
							required
							placeholder="you@email.com"
							className={controlClass}
						/>
					</Field>

					<DateField
						label="Arrival"
						date={arrival}
						fromDate={startOfToday()}
						onSelect={(value) => {
							setArrival(value);
							if (departure && value && departure < value) {
								setDeparture(undefined);
							}
						}}
					/>
					<DateField
						label="Departure"
						date={departure}
						fromDate={arrival ?? startOfToday()}
						onSelect={setDeparture}
					/>

					<Field label="Guests">
						<Select value={guests} onValueChange={setGuests}>
							<SelectTrigger
								className={cn(
									controlClass,
									"data-placeholder:text-ivory/30"
								)}
							>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{["1 – 2", "3 – 4", "5 – 6", "7 – 8", "More than 8"].map(
									(option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</Field>

					<Field label="Occasion" htmlFor="occasion">
						<Input
							id="occasion"
							name="occasion"
							placeholder="Getaway, celebration…"
							className={controlClass}
						/>
					</Field>
				</div>

				<Field label="Anything we should know" htmlFor="message">
					<textarea
						id="message"
						name="message"
						rows={4}
						placeholder="Tell us about the stay you have in mind"
						className={cn(controlClass, "h-auto resize-none py-3")}
					/>
				</Field>

				<div>
					<CtaButton magnetic={false}>Send enquiry</CtaButton>
				</div>
			</form>
		</Reveal>
	);
}
