import Header from "../../components/Header";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactionsType, getReactions } from "@/utils/getReactions";
import { GossipsType, getGossips } from "@/utils/getGossips";
import { increasePostViewCount } from "@/utils/increasePostViewCount";

export default async function Home({ params }: { params: { page: number } }) {
	const gossips: GossipsType[] = await getGossips({
		pageNumber: params.page,
	});
	const reactions: ReactionsType[] = await getReactions();

	// const gossipIds = gossips.map((gossip: GossipsType) => gossip.id);
	// await increasePostViewCount(gossipIds);

	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			{gossips?.map((gossip: any) => (
				<div
					key={gossip.id}
					className="relative container grid gap-3 border-2 border-black rounded-2xl px-6 py-7 max-w-2xl mx-auto"
				>
					<div
						className="absolute top-0 right-0 opacity-10 text-9xl select-none"
						style={{ zIndex: -1 }}
					>
						{gossip.backgroundEmoji}
					</div>
					<div
						className="absolute left-0 bottom-0 opacity-10 text-9xl select-none"
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
							hour: "2-digit"
						})}
					</div>
					<div
						className="gossip-message"
						dangerouslySetInnerHTML={{ __html: gossip.content }}
					></div>

					<div className="container-footer flex justify-between items-center mt-4">
						<button className="report border-red-500 rounded border-2 px-3 py-1 text-red-500 text-xs cursor-pointer">
							Report
						</button>
						<div className="stats font-bold text-neutral-500 text-xs">
							{gossip.views + 1} Views {"•"}{" "}
							{gossip.totalReactions} Reactions
						</div>
						<div
							className="reactions flex text-2xl items-center justify-center z-10"
							style={{
								gap: "-15rem",
							}}
						>
							{gossip.reactions.map(
								(reaction: any, idx: number) => (
									<div
										className="reaction bg-black text-white rounded-full w-8 h-8 flex justify-center items-center"
										key={idx}
									>
										{reaction.emoji}
									</div>
								)
							)}
							<div className="relative add-reaction bg-black text-white rounded-full w-8 h-8 flex items-center cursor-pointer z-10">
								<label className="px-4 py-2 rounded-lg shadow-xl bg-white z-20 justify-self-start -translate-x-full">
									{reactions.map(
										(reaction: ReactionsType) => (
											<span
												key={reaction.id}
												className="cursor-pointer hover:text-5xl ease-in-out duration-100 align-baseline"
											>
												{reaction.emojie}
											</span>
										)
									)}
								</label>

								<AddOutlinedIcon className="m-auto" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
