"use client";

import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { getReactions, ReactionsType } from "@/utils/getReactions";
import { addPostReaction } from "@/utils/addPostReaction";
import { checkUserPostReaction } from "@/utils/checkUserPostReaction";

export default function ReactionAdder({ postId }: { postId: string }) {
	const [reactions, setReactions] = useState<ReactionsType[]>([]);
	const [currentReaction, setCurrentReaction] = useState<any>(null);

	useEffect(() => {
		if (process.env.NODE_ENV !== "development") {
			getReactions().then((data: ReactionsType[]) => {
				setReactions(data);
			});
		}

		checkUserPostReaction({
			userId: String(localStorage.getItem("userId")),
			postId: postId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setCurrentReaction(res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}, []);

	const handleAddingReaction = (reactionId: string) => {
		console.log("adding reaction");

		addPostReaction({
			userId: String(localStorage.getItem("userId")),
			postId: postId,
			reactionId: reactionId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setCurrentReaction({
					emojie: res.emojie,
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div className="relative add-reaction bg-black text-white rounded-full w-8 h-8 flex items-center cursor-pointer z-10">
			<label className="px-4 py-2 rounded-lg shadow-xl bg-white z-20 justify-self-start -translate-x-full">
				{reactions.map((reaction: ReactionsType) =>
					currentReaction ? (
						<span
							key={reaction.id}
							className="cursor-pointer hover:text-5xl ease-in-out duration-100 align-baseline"
							onClick={() => handleAddingReaction(reaction.id)}
						>
							{reaction.emojie}
						</span>
					) : (
						currentReaction?.reactionId !== reaction.id && (
							<span
								key={reaction.id}
								className="cursor-pointer hover:text-5xl ease-in-out duration-100 align-baseline"
								onClick={() =>
									handleAddingReaction(reaction.id)
								}
							>
								{reaction.emojie}
							</span>
						)
					)
				)}
			</label>

			{currentReaction ? (
				currentReaction.emojie
			) : (
				<AddOutlinedIcon className="m-auto" />
			)}
		</div>
	);
}
