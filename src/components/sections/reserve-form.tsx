"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
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
import { enquirySchema } from "@/lib/enquiry";
import { dialCodes } from "@/data/dial-codes";
import { cn } from "@/lib/utils";

const controlClass =
	"h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-ivory shadow-none transition-colors focus-visible:border-gold focus-visible:ring-0 dark:bg-transparent";

type EnquiryFormValues = {
	name: string;
	email: string;
	dial: string;
	phone: string;
	arrival?: Date;
	departure?: Date;
	guests: string;
	occasion: string;
	message: string;
};

function Field({
	label,
	htmlFor,
	error,
	className,
	children,
}: {
	label: string;
	htmlFor?: string;
	error?: string | false;
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
			{error && <p className="text-xs text-[#dd8a6e]">{error}</p>}
		</div>
	);
}

function DateField({
	label,
	date,
	onSelect,
	onClose,
	fromDate,
	error,
}: {
	label: string;
	date?: Date;
	onSelect: (date?: Date) => void;
	onClose: () => void;
	fromDate: Date;
	error?: string | false;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Field label={label} error={error}>
			<Popover
				open={open}
				onOpenChange={(next) => {
					setOpen(next);
					if (!next) onClose();
				}}
			>
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
							onClose();
						}}
						disabled={{ before: fromDate }}
						autoFocus
					/>
				</PopoverContent>
			</Popover>
		</Field>
	);
}

function SuccessNote({
	name,
	email,
	onReset,
}: {
	name: string;
	email: string;
	onReset: () => void;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
			className="relative overflow-hidden border border-gold/25 bg-espresso/40 p-10 md:p-14"
		>
			<div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />
			<motion.span
				initial={{ scale: 0.4, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
				className="flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold"
			>
				<Check className="size-6" />
			</motion.span>
			<p className="eyebrow mt-8 text-gold">Enquiry received</p>
			<h3 className="mt-4 font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
				Thank you, {name}.
				<span className="block text-gold italic">The house is listening.</span>
			</h3>
			<p className="mt-6 max-w-md text-base leading-relaxed text-ivory/60">
				Your enquiry has reached us and we will reply to{" "}
				<span className="text-ivory">{email}</span> within 24 hours to shape
				the details of your stay.
			</p>
			<button
				type="button"
				onClick={onReset}
				className="mt-10 cursor-pointer text-[0.7rem] tracking-[0.25em] text-ivory/50 uppercase transition-colors duration-300 hover:text-gold"
			>
				Send another enquiry
			</button>
		</motion.div>
	);
}

export function ReserveForm() {
	const [sent, setSent] = useState<{ name: string; email: string } | null>(
		null
	);
	const [serverError, setServerError] = useState<string | null>(null);

	const formik = useFormik<EnquiryFormValues>({
		initialValues: {
			name: "",
			email: "",
			dial: "US",
			phone: "",
			arrival: undefined,
			departure: undefined,
			guests: "",
			occasion: "",
			message: "",
		},
		validationSchema: enquirySchema,
		onSubmit: async (values, helpers) => {
			setServerError(null);
			const dialCode =
				dialCodes.find((entry) => entry.iso === values.dial)?.code ?? values.dial;
			try {
				const response = await fetch("/api/enquiry", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...values, dial: dialCode }),
				});
				if (!response.ok) {
					const data = await response.json().catch(() => null);
					setServerError(
						data?.error ??
						"Your enquiry could not be sent. Please try again shortly."
					);
					return;
				}
				setSent({ name: values.name.trim().split(" ")[0], email: values.email });
				helpers.resetForm();
			} catch {
				setServerError(
					"Your enquiry could not be sent. Please check your connection and try again."
				);
			}
		},
	});

	const fieldError = (field: keyof EnquiryFormValues) =>
		formik.touched[field] && (formik.errors[field] as string | undefined);

	if (sent) {
		return (
			<SuccessNote
				name={sent.name}
				email={sent.email}
				onReset={() => setSent(null)}
			/>
		);
	}

	const selectedDial = dialCodes.find((entry) => entry.iso === formik.values.dial);

	return (
		<Reveal>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
				<div className="grid gap-10 md:grid-cols-2">
					<Field label="Full name" htmlFor="name" error={fieldError("name")}>
						<Input
							id="name"
							placeholder="Your name"
							className={controlClass}
							{...formik.getFieldProps("name")}
						/>
					</Field>
					<Field label="Email" htmlFor="email" error={fieldError("email")}>
						<Input
							id="email"
							type="email"
							placeholder="you@email.com"
							className={controlClass}
							{...formik.getFieldProps("email")}
						/>
					</Field>

					<Field
						label="Phone"
						htmlFor="phone"
						error={fieldError("phone") || fieldError("dial")}
						className="md:col-span-2"
					>
						<div className="flex items-stretch gap-4">
							<Select
								value={formik.values.dial}
								onValueChange={(value) => {
									formik.setFieldValue("dial", value);
									formik.setFieldTouched("dial", true, false);
								}}

							>
								<SelectTrigger
									aria-label="Country code"
									className={cn(controlClass, "w-28 shrink-0")}
								>
									<SelectValue>
										{selectedDial
											? `${selectedDial.flag} ${selectedDial.code}`
											: "Code"}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{dialCodes.map((entry) => (
										<SelectItem key={entry.iso} value={entry.iso}>
											{entry.flag} {entry.country}{" "}
											<span className="text-muted-foreground">
												{entry.code}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Input
								id="phone"
								type="tel"
								inputMode="tel"
								placeholder="Phone number"
								className={controlClass}
								{...formik.getFieldProps("phone")}
							/>
						</div>
					</Field>

					<DateField
						label="Arrival"
						date={formik.values.arrival}
						fromDate={startOfToday()}
						error={fieldError("arrival")}
						onClose={() => formik.setFieldTouched("arrival", true)}
						onSelect={(value) => {
							formik.setFieldValue("arrival", value);
							if (
								formik.values.departure &&
								value &&
								formik.values.departure < value
							) {
								formik.setFieldValue("departure", undefined);
							}
						}}
					/>
					<DateField
						label="Departure"
						date={formik.values.departure}
						fromDate={formik.values.arrival ?? startOfToday()}
						error={fieldError("departure")}
						onClose={() => formik.setFieldTouched("departure", true)}
						onSelect={(value) => formik.setFieldValue("departure", value)}
					/>

					<Field label="Guests" error={fieldError("guests")}>
						<Select
							value={formik.values.guests}
							onValueChange={(value) => {
								formik.setFieldValue("guests", value);
								formik.setFieldTouched("guests", true, false);
							}}
						>
							<SelectTrigger
								className={cn(controlClass, "data-placeholder:text-ivory/30")}
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
							placeholder="Getaway, celebration…"
							className={controlClass}
							{...formik.getFieldProps("occasion")}
						/>
					</Field>
				</div>

				<Field label="Anything we should know" htmlFor="message">
					<textarea
						id="message"
						rows={4}
						placeholder="Tell us about the stay you have in mind"
						className={cn(controlClass, "h-auto resize-none py-3")}
						{...formik.getFieldProps("message")}
					/>
				</Field>

				<div className="flex flex-col gap-5">
					{serverError && (
						<p className="max-w-md text-sm leading-relaxed text-[#dd8a6e]">
							{serverError}
						</p>
					)}
					<div>
						<CtaButton
							magnetic={false}
							className={cn(
								formik.isSubmitting && "pointer-events-none opacity-60"
							)}
						>
							{formik.isSubmitting ? "Sending…" : "Send enquiry"}
						</CtaButton>
					</div>
				</div>
			</form>
		</Reveal>
	);
}
