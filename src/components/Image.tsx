"use server";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

const getImage = async (src: string) => {
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
