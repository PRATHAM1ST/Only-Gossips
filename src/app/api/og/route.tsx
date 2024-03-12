import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
	const margueriteFontData = await fetch(
		new URL("./marguerite.ttf", import.meta.url)
	).then((res) => res.arrayBuffer());

	const gothamFontData = await fetch(
		new URL("./gotham.otf", import.meta.url)
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		(
			<div tw="flex items-center justify-center h-full w-full text-9xl bg-white">
				<span
					tw="leading-none"
					style={{
						fontFamily: '"gotham"',
					}}
				>
					Only
				</span>
				<span
					tw="leading-none -mb-14"
					style={{
						fontFamily: '"margurite"',
						// color: "rgb(14 165 233)",
						color: "rgb(20 83 45)"
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
