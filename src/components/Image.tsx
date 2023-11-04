"use server";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

const getImage = async (src: string) => {
	try {
		const buffer = await fetch(src).then(async (res) =>
			Buffer.from(await res.arrayBuffer())
		);

		const {
			metadata: { height, width },
			...plaiceholder
		} = await getPlaiceholder(buffer, { size: 10 });

		return {
			...plaiceholder,
			img: { src, height, width },
		};
	} catch (e) {
		return {
			base64: "",
			img: { src, height: 0, width: 0 },
		};
	}
};

export default async function CustomImage({
	src,
	height,
	width,
	alt,
	className,
}: {
	src: string;
	height: number;
	width: number;
	alt: string;
	className: string;
}) {
	const { base64, img } = await getImage(src);
	if (img.height === 0 || img.width === 0) return null;
	return (
		<Image
			src={src}
			height={height}
			width={width}
			alt={alt}
			className={className}
			placeholder="blur"
			blurDataURL={base64}
		/>
	);
}
