import Header from "../components/Header";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactionsType, getReactions } from "@/utils/getReactions";
import { GossipsType, getGossips } from "@/utils/getGossips";
import { increasePostViewCount } from "@/utils/increasePostViewCount";

export default async function Home() {
	const gossips: GossipsType[] = await getGossips();
	const reactions: ReactionsType[]  = await getReactions();

	const gossipIds = gossips.map((gossip: GossipsType) => gossip.id);
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
						{new Date(gossip.createdAt).toLocaleString()}
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
							{gossip.views + 1} Views {"•"} {gossip.totalReactions}{" "}
							Reactions
						</div>
						<div
							className="reactions flex text-2xl items-center justify-center"
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
							<div className="relative add-reaction bg-black text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer ease-in-out duration-300">
								
								<label className="flex absolute right-0 top-0 -translate-y-full px-4 py-2 rounded-lg shadow-xl z-20 ease-in-out duration-300">
									{
										reactions.map((reaction: ReactionsType) => (
											<span key={reaction.id} className="cursor-pointer">
												{reaction.emojie}
											</span>
										))
									}
								</label>

								<AddOutlinedIcon />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
