import Header from "../../components/Header";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
	GossipsType,
	getGossips,
	GossipsResponseType,
} from "@/utils/getGossips";
import { increasePostViewCount } from "@/utils/increasePostViewCount";
import Pagination from "@/components/Pagination";
import { ReactionsType, getReactions } from "@/utils/getReactions";
import Reactions from "@/components/Reactions";
import Report from "@/components/Report";

export default async function Home({ params }: { params: { page: number } }) {
	const gossipsResponse: GossipsResponseType = await getGossips({
		pageNumber: params.page,
	});

	const gossips = gossipsResponse.data;

	const reactions: ReactionsType[] = await getReactions();

	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			{gossips.map((gossip: any) => (
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
						<ShareRoundedIcon className="text-5xl" />
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
					<div
						className="gossip-message"
						dangerouslySetInnerHTML={{ __html: gossip.content }}
					></div>

					<div className="container-footer flex justify-between items-center mt-4">
						<Report postId={gossip.id} />
						<div className="stats font-bold text-neutral-500 text-xs">
							{gossip.views.length + 1} Views {"•"}{" "}
							{gossip.totalReactions} Reactions
						</div>
						<Reactions
							postId={gossip.id}
							reactionsOnPost={gossip.reactions}
							defaultReactionAdderArray={reactions}
						/>
					</div>
				</div>
			))}
			<Pagination
				currentPage={params.page}
				totalPagesCount={Number(gossipsResponse.totalGossipsPages)}
			/>
		</div>
	);
}
