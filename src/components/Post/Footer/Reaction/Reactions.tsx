"use client";

import React, { useEffect, useState } from "react";
import ReactionAdder from "./ReactionAdder";
import { ReactionsType } from "@/utils/Reaction/getReactions";
import { checkUserPostReaction } from "@/utils/User/checkUserPostReaction";

export default function Reactions({
	userId,
	postId,
	reactionsOnPost,
	defaultReactionAdderArray,
	setReactionsOnPostCount
}: {
	userId: string;
	postId: string;
	reactionsOnPost: ReactionsType[];
	defaultReactionAdderArray: ReactionsType[];
	setReactionsOnPostCount: any;
}) {
	const [postReactions, setPostReactions] = useState<any[]>(reactionsOnPost);
	const [currentReaction, setCurrentReaction] = useState<{
		id: string;
		emojie: string;
	} | null>(null); 
	
	const getCurrentUserReaction = () => { 
		if (!userId) return;
		checkUserPostReaction({
			userId: String(userId),
			postId: postId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setCurrentReaction({
					id: res.reactionId,
					emojie: res.emojie,
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	useEffect(() => {
		getCurrentUserReaction(); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="reactions flex text-2xl items-center justify-center">
			{postReactions
				.slice(0)
				.slice(-5)
				.map(
					(reaction: any, idx: number) =>
						reaction.userId !== userId && (
							<div className="-ml-5" key={idx}>
								{reaction.emojie}
							</div>
						)
				)}
			<ReactionAdder
				userId={userId}
				setReactionsOnPostCount={setReactionsOnPostCount}
				postId={postId}
				reactions={defaultReactionAdderArray}
				currentReaction={currentReaction}
				setCurrentReaction={setCurrentReaction}
				setPostReactions={setPostReactions}
			/>
		</div>
	);
}
