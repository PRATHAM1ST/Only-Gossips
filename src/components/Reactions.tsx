"use client"

import React from "react";
import ReactionAdder from "./ReactionAdder";
import { ReactionsType } from "@/utils/getReactions";

export default function Reactions({
	postId,
	reactionsOnPost,
	defaultReactionAdderArray,
}: {
	postId: string;
	reactionsOnPost: any[];
	defaultReactionAdderArray: ReactionsType[];
}) {

    
	return (
		<div
			className="reactions flex text-2xl items-center justify-center z-10"
			style={{
				gap: "-15rem",
			}}
		>
			{reactionsOnPost
				.slice(0)
				.slice(-5)
				.map((reaction: any, idx: number) => (
					<div className="-ml-5" key={idx}>
						{reaction.emojie}
					</div>
				))}
			<ReactionAdder
				postId={postId}
				reactions={defaultReactionAdderArray}
			/>
		</div>
	);
}
