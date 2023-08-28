"use client";

import { useState } from "react";
import Reactions from "./Reactions";
import Report from "./Report";
import ViewsIncrementer from "./Views";
import { GossipsType } from "@/utils/getGossips";
import { ReactionsType } from "@/utils/getReactions";

export default function PostFooter({
	gossip,
	reactions,
}: {
	gossip: GossipsType;
	reactions: ReactionsType[];
}) {
	const [reactionsOnPostCount, setReactionsOnPostCount] = useState<number>(
		gossip.totalReactions
	);

	return (
		<div className="container-footer flex justify-between items-center mt-4">
			<Report postId={gossip.id} />
			<div className="stats font-bold text-neutral-500 text-xs">
				<ViewsIncrementer
					postId={gossip.id}
					views={gossip.views ?? []}
				/>
				{"•"} {reactionsOnPostCount} Reactions
			</div>
			<Reactions
				setReactionsOnPostCount={setReactionsOnPostCount}
				postId={gossip.id}
				reactionsOnPost={gossip.reactions ?? []}
				defaultReactionAdderArray={reactions}
			/>
		</div>
	);
}
