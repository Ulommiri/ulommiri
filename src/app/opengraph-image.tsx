import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const monogram = encodeURIComponent(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="408 58 84 164" fill="none"><g stroke="#caa17c" stroke-width="6" stroke-linecap="round"><line x1="420" y1="70" x2="480" y2="70"/><path d="M 424 96 L 424 148 Q 424 176 450 176 Q 476 176 476 148 L 476 96"/></g><circle cx="450" cy="204" r="7" fill="#caa17c"/></svg>`,
);

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					background:
						"radial-gradient(120% 120% at 50% 0%, #1b1008 0%, #0a0502 60%)",
					color: "#efdcc3",
					fontFamily: "serif",
					padding: "80px",
				}}
			>
				<img
					width={110}
					height={132}
					src={`data:image/svg+xml,${monogram}`}
					alt=""
				/>
				<div
					style={{
						marginTop: 44,
						fontSize: 84,
						letterSpacing: 22,
						fontWeight: 500,
					}}
				>
					UL{"Ọ"}MMIRI
				</div>
				<div
					style={{
						marginTop: 28,
						fontSize: 34,
						fontStyle: "italic",
						color: "#caa17c",
					}}
				>
					A house held by water
				</div>
				<div
					style={{
						marginTop: 40,
						fontSize: 22,
						letterSpacing: 8,
						textTransform: "uppercase",
						color: "#997a5e",
					}}
				>
					Private Lakefront Retreat · United States
				</div>
			</div>
		),
		size,
	);
}
