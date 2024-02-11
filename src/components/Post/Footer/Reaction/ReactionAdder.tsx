"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactionsType } from "@/utils/Reaction/getReactions";
import { addPostReaction } from "@/utils/Gossip/Reaction/addPostReaction";
import { removePostReaction } from "@/utils/Gossip/Reaction/removePostReaction";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ReactionAdder({
	userId,
	postId,
	reactions,
	currentReaction,
	setCurrentReaction,
	setPostReactions,
	setReactionsOnPostCount,
}: {
	userId: string;
	postId: string;
	reactions: ReactionsType[];
	currentReaction: {
		id: string;
		emojie: string;
	} | null;
	setCurrentReaction: any;
	setPostReactions: any;
	setReactionsOnPostCount: any;
}) {
	const handleAddingReaction = (reactionId: string) => {
		if (!userId) return;
		console.log("adding reaction");
		addPostReaction({
			userId: String(userId),
			postId: postId,
			reactionId: reactionId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setReactionsOnPostCount((prev: number) =>
					currentReaction === null ? (prev += 1) : prev
				);
				setCurrentReaction({
					id: String(res.reactionId),
					emojie: String(res.emojie),
				});
				setPostReactions(res.updatedPostReactions);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const handleRemoveUserReaction = () => {
		console.log("removing reaction");

		removePostReaction({
			userId: userId,
			postId: postId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setCurrentReaction(null);
				setReactionsOnPostCount((prev: number) => (prev -= 1));
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div className="relative add-reaction bg-black text-white rounded-full w-8 h-8 flex items-center cursor-pointer">
			<HoverCard>
				<HoverCardTrigger className="w-full h-full flex items-center justify-center ">
					<AddOutlinedIcon className="m-auto" />
				</HoverCardTrigger>
				<HoverCardContent>
					{reactions.map((reaction: ReactionsType) => (
						<span
							key={reaction.id}
							className="cursor-pointer hover:text-5xl ease-in-out duration-100 align-baseline"
							onClick={() => handleAddingReaction(reaction.id)}
						>
							{currentReaction?.id === reaction.id
								? ""
								: reaction.emojie}
						</span>
					))}
				</HoverCardContent>
			</HoverCard>

			{currentReaction ? (
				<div onClick={handleRemoveUserReaction}>
					{currentReaction.emojie}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
