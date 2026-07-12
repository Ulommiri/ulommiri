import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const monogram = encodeURIComponent(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="408 58 84 164" fill="none"><g stroke="#caa17c" stroke-width="8" stroke-linecap="round"><line x1="420" y1="70" x2="480" y2="70"/><path d="M 424 96 L 424 148 Q 424 176 450 176 Q 476 176 476 148 L 476 96"/></g><circle cx="450" cy="204" r="9" fill="#caa17c"/></svg>`,
);

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#0a0502",
				}}
			>
				<img
					width={300}
					height={360}
					src={`data:image/svg+xml,${monogram}`}
					alt=""
				/>
			</div>
		),
		size,
	);
}
