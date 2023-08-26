import { ImageResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
	const margueriteFontData = await fetch(
		new URL("./marguerite.ttf", import.meta.url)
	).then((res) => res.arrayBuffer());

	const gothamFontData = await fetch(
		new URL("./gotham.otf", import.meta.url)
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					fontSize: 40,
					color: "black",
					background: "white",
					width: "100%",
					height: "100%",
					padding: "50px 200px",
					textAlign: "center",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<span
					style={{
						fontFamily: '"gotham"',
					}}
				>
					Only
				</span>
				<span
					style={{
						fontFamily: '"margurite"',
						color: "rgb(14 165 233)",
					}}
				>
					Gossips
				</span>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "margurite",
					data: margueriteFontData,
					style: "normal",
				},
				{
					name: "gotham",
					data: gothamFontData,
					style: "normal",
				},
			],
		}
	);
}
