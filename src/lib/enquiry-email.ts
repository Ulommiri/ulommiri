import { format } from "date-fns";
import type { EnquiryPayload } from "@/lib/enquiry";

const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(char) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			})[char] as string
	);

const label =
	"padding: 14px 0 4px; font-family: Arial, Helvetica, sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #997a5e;";
const value =
	"padding: 0 0 14px; font-family: Georgia, 'Times New Roman', serif; font-size: 17px; color: #efdcc3; border-bottom: 1px solid #35251a;";

function detailRow(name: string, detail: string) {
	return `
		<tr><td style="${label}">${name}</td></tr>
		<tr><td style="${value}">${escapeHtml(detail)}</td></tr>`;
}

export function buildEnquiryEmail(enquiry: EnquiryPayload) {
	const stay = `${format(enquiry.arrival, "d MMMM yyyy")} — ${format(
		enquiry.departure,
		"d MMMM yyyy"
	)}`;
	const nights = Math.max(
		1,
		Math.round(
			(enquiry.departure.getTime() - enquiry.arrival.getTime()) / 86400000
		)
	);
	const phone = `${enquiry.dial} ${enquiry.phone}`;
	const subject = `New stay enquiry — ${enquiry.name} · ${format(
		enquiry.arrival,
		"d MMM"
	)} to ${format(enquiry.departure, "d MMM")}`;

	const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin: 0; padding: 0; background-color: #0a0502;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0502; padding: 48px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
					<tr>
						<td align="center" style="padding-bottom: 12px; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; letter-spacing: 10px; color: #caa17c;">
							UL&#7884;MMIRI
						</td>
					</tr>
					<tr>
						<td align="center" style="padding-bottom: 28px; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 14px; color: #b9a992;">
							A house held by water
						</td>
					</tr>
					<tr>
						<td style="border-top: 1px solid #caa17c; padding-bottom: 32px;"></td>
					</tr>
					<tr>
						<td style="background-color: #1b1008; border: 1px solid #35251a; padding: 40px 36px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td style="padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #caa17c;">
										New stay enquiry
									</td>
								</tr>
								<tr>
									<td style="padding-bottom: 26px; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.2; color: #efdcc3;">
										${escapeHtml(enquiry.name)} would like to be held by the water
									</td>
								</tr>
								${detailRow("Stay", `${stay} · ${nights} ${nights === 1 ? "night" : "nights"}`)}
								${detailRow("Guests", enquiry.guests)}
								${detailRow("Email", enquiry.email)}
								${detailRow("Phone", phone)}
								${enquiry.occasion ? detailRow("Occasion", enquiry.occasion) : ""}
								${enquiry.message
			? `
								<tr><td style="${label}">Their message</td></tr>
								<tr>
									<td style="padding: 4px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 16px; line-height: 1.7; color: #d9c6ab;">
										&ldquo;${escapeHtml(enquiry.message)}&rdquo;
									</td>
								</tr>`
			: ""
		}
								<tr>
									<td style="padding-top: 28px;">
										<a href="mailto:${escapeHtml(enquiry.email)}" style="display: inline-block; background-color: #caa17c; color: #0a0502; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; padding: 15px 32px;">
											Reply to ${escapeHtml(enquiry.name.split(" ")[0])}
										</a>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td align="center" style="padding-top: 28px; font-family: Arial, Helvetica, sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6f5a44;">
							Sent from the reserve form &middot; ulommiri.com
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;

	const text = [
		"New stay enquiry — Ulọmmiri",
		"",
		`Name: ${enquiry.name}`,
		`Stay: ${stay} (${nights} ${nights === 1 ? "night" : "nights"})`,
		`Guests: ${enquiry.guests}`,
		`Email: ${enquiry.email}`,
		`Phone: ${phone}`,
		enquiry.occasion ? `Occasion: ${enquiry.occasion}` : "",
		enquiry.message ? `Message: ${enquiry.message}` : "",
	]
		.filter(Boolean)
		.join("\n");

	return { subject, html, text };
}
