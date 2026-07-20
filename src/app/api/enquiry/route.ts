import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ValidationError } from "yup";
import { enquirySchema } from "@/lib/enquiry";
import { buildEnquiryEmail } from "@/lib/enquiry-email";
import { stayOverlapsBooked, toBookedIntervals } from "@/lib/availability";
import { getReservePageContent, getSiteSettings } from "@/sanity/content";

export async function POST(request: Request) {
	let payload;
	try {
		payload = enquirySchema.validateSync(await request.json(), {
			abortEarly: true,
			stripUnknown: true,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof ValidationError
						? error.message
						: "That enquiry could not be read.",
			},
			{ status: 400 }
		);
	}

	const [{ blockedDates }, settings] = await Promise.all([
		getReservePageContent(),
		getSiteSettings(),
	]);
	if (stayOverlapsBooked(payload.arrival, payload.departure, toBookedIntervals(blockedDates))) {
		return NextResponse.json(
			{ error: "Those dates have just been booked. Please choose different dates." },
			{ status: 409 }
		);
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		return NextResponse.json(
			{ error: "The enquiry service is not configured yet." },
			{ status: 500 }
		);
	}

	const { subject, html, text } = buildEnquiryEmail(payload);
	const resend = new Resend(apiKey);
	const { error } = await resend.emails.send({
		from: process.env.RESEND_FROM ?? "Ulọmmiri Reservations <reservations@ulommiri.com>",
		to: settings.enquiryRecipients,
		replyTo: payload.email,
		subject,
		html,
		text,
	});

	if (error) {
		console.error("Resend error:", error);
		return NextResponse.json(
			{ error: "Your enquiry could not be sent. Please try again shortly." },
			{ status: 502 }
		);
	}

	return NextResponse.json({ ok: true });
}
