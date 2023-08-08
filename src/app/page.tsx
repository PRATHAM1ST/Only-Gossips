import Header from "../components/Header";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GossipType = {
	id: string;
	title: string;
	content: string;
	backgroundEmoji: string;
	views: number;
	totalReactions: number;
	reactions?: any[];
};

async function getGossips() {
	return await prisma.post.findMany({
		select :{
			id: true,
			title: true,
			content: true,
			backgroundEmoji: true,
			views: true,
			totalReactions: true,
			reactions: true,
		}
	});
}

export default async function Home() {
	const gossips: GossipType[] = await getGossips();

	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			{gossips?.map((gossip: any) => (
				<div
					key={gossip.id}
					className="container grid gap-3 border-2 border-black rounded-2xl px-6 py-7 max-w-2xl mx-auto"
				>
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
						<button className="report border-red-500 rounded border-2 px-3 py-1 text-red-500 text-xs">
							Report
						</button>
						<div className="stats font-bold text-neutral-500 text-xs">
							{gossip.views} Views {"•"} {gossip.totalReactions}{" "}
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
							<div className="add-reaction bg-black text-white rounded-full w-8 h-8 flex justify-center items-center">
								<AddOutlinedIcon />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
