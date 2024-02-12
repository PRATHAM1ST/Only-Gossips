"use client";

import { GossipsType } from "@/utils/Gossip/getGossips";
import Masonry from "react-masonry-css";
import Share from "./Post/Share";
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
	CarouselItem,
} from "./ui/carousel";
import Image from "next/image";
import PostFooter from "./Post/Footer/PostFooter";

export default function PostObject({gossips, reactions} : {gossips: any, reactions: any}) {
	return (
		<Masonry
			breakpointCols={2}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{gossips.map((gossip: GossipsType) => (
				<div
					key={gossip.id}
					className="relative container grid gap-3 border-2 border-black rounded-2xl px-6 py-7 max-w-2xl mx-auto overflow-hidden h-fit"
				>
					<div
						className="absolute m-10 top-0 right-0 opacity-10 text-9xl select-none"
						style={{ zIndex: -1 }}
					>
						{gossip.backgroundEmoji}
					</div>
					<div
						className="absolute m-10 left-0 bottom-0 opacity-10 text-9xl select-none"
						style={{ zIndex: -1 }}
					>
						{gossip.backgroundEmoji}
					</div>
					<div className="container-header flex justify-between">
						<h1 className="gossip-title text-5xl font-bold">
							{gossip.title}
						</h1>
						<Share id={gossip.id} title={gossip.title} />
					</div>
					<div className="gossip-createdAt font-bold text-neutral-500 text-xs">
						{new Date(gossip.createdAt).toLocaleString("en-US", {
							hour12: true,
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							timeZone: "Asia/Kolkata",
						})}
					</div>
					{!!gossip.images?.length && (
						<div className="gossip-images flex gap-3 flex-wrap m-auto">
							<Carousel>
								<CarouselContent>
									{gossip.images?.map(
										(image: any, idx: number) => (
											<CarouselItem key={image.info.id}>
												<Image
													src={image.info.secure_url}
													width={image.info.width}
													height={image.info.height}
													alt={`${gossip.title} image ${idx}`}
													className="gossip-image max-h-52 w-auto m-auto"
												/>
											</CarouselItem>
										)
									)}
								</CarouselContent>
								{gossip.images?.length > 1 && (
									<>
										<CarouselPrevious />
										<CarouselNext />
									</>
								)}
							</Carousel>
						</div>
					)}
					<div
						className="gossip-message"
						dangerouslySetInnerHTML={{ __html: gossip.content }}
					></div>

					<PostFooter gossip={gossip} reactions={reactions} />
				</div>
			))}
		</Masonry>
	);
}
