"use client";

import React, { useEffect, useState } from "react";
import ReactionAdder from "./ReactionAdder";
import { ReactionsType } from "@/utils/getReactions";
import { checkUserPostReaction } from "@/utils/checkUserPostReaction";

export default function Reactions({
	postId,
	reactionsOnPost,
	defaultReactionAdderArray,
}: {
	postId: string;
	reactionsOnPost: any[];
	defaultReactionAdderArray: ReactionsType[];
}) {
	const [postReactions, setPostReactions] = useState<any[]>(reactionsOnPost);
	const [currentReaction, setCurrentReaction] = useState<{
		id: string;
		emojie: string;
	} | null>(null);
	const userId = String(localStorage.getItem("userId"));

	const getCurrentUserReaction = () => {
		checkUserPostReaction({
			userId: userId,
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

	console.log(postId, defaultReactionAdderArray, userId, currentReaction);

	return (
		<div className="reactions flex text-2xl items-center justify-center z-10">
			{postReactions
				.slice(0)
				.slice(-5)
				.map(
					(reaction: any, idx: number) =>
						reaction.reactionId !== currentReaction?.id && (
							<div className="-ml-5" key={idx}>
								{reaction.emojie}
							</div>
						)
				)}
			<ReactionAdder
				postId={postId}
				reactions={defaultReactionAdderArray}
				currentReaction={currentReaction}
				setCurrentReaction={setCurrentReaction}
				setPostReactions={setPostReactions}
			/>
		</div>
	);
}
