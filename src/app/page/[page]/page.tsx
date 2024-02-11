import Header from "../../../components/Header";
import {
	GossipsType,
	getGossips,
	GossipsResponseType,
} from "@/utils/Gossip/getGossips";
import Pagination from "@/components/Pagination";
import { ReactionsType, getReactions } from "@/utils/Reaction/getReactions";
import Image from "@/components/Image";
import PostFooter from "@/components/Post/Footer/PostFooter";
import Share from "@/components/Post/Share";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home({ params }: { params: { page: number } }) {
	const gossipsResponse: GossipsResponseType = await getGossips({
		pageNumber: params.page,
	});

	const gossips = gossipsResponse.data;

	const reactions: ReactionsType[] = await getReactions();

	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			{gossips.map((gossip: GossipsType) => (
				<div
					key={gossip.id}
					className="relative container grid gap-3 border-2 border-black dark:border-slate-300 rounded-2xl px-6 py-7 max-w-2xl mx-auto overflow-hidden"
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
								{gossip.images?.length > 1 &&
									<>
										<CarouselPrevious />
										<CarouselNext />
									</>
								}
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
			<Pagination
				currentPage={params.page}
				totalPagesCount={Number(gossipsResponse.totalGossipsPages)}
			/>
		</div>
	);
}
