import Header from "@/components/Header";
import PostFooter from "@/components/Post/Footer/PostFooter";
import { getSingleGossip } from "@/utils/Gossip/getSingleGossip";
import Image from "next/image";
import { getReactions } from "@/utils/Reaction/getReactions";
import NotFound from "./not-found";
import Share from "@/components/Post/Share";

export default async function Home({ params }: { params: { id: string } }) {
	const gossip = await getSingleGossip(params.id);
    const reactions = await getReactions();

	if (!gossip)
		return (
			<NotFound />
		);

	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			<div
				key={gossip.id}
				className="relative container grid gap-3 border-2 border-black rounded-2xl px-6 py-7 max-w-2xl mx-auto overflow-hidden"
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
					<Share id={gossip.id} title={gossip.title}/>
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
				<div className="gossip-images flex gap-3 flex-wrap">
					{gossip.images?.map((image: any, idx: number) => (
						<Image
							key={image.info.id}
							src={image.info.secure_url}
							width={image.info.width}
							height={image.info.height}
							alt={`${gossip.title} image ${idx}`}
							className="gossip-image max-h-52 w-auto"
						/>
					))}
				</div>
				<div
					className="gossip-message"
					dangerouslySetInnerHTML={{ __html: gossip.content }}
				></div>

				<PostFooter gossip={gossip} reactions={reactions} />
			</div>
		</div>
	);
}
