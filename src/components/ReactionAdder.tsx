"use client";

import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ReactionsType } from "@/utils/getReactions";
import { addPostReaction } from "@/utils/addPostReaction";
import { checkUserPostReaction } from "@/utils/checkUserPostReaction";
import { removePostReaction } from "@/utils/removePostReaction";

export default function ReactionAdder({
	postId,
	reactions,
}: {
	postId: string;
	reactions: ReactionsType[];
}) {
	const [currentReaction, setCurrentReaction] = useState<any>(null);

	useEffect(() => {
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

	const handleRemoveUserReaction = () => {
		console.log("removing reaction");

		removePostReaction({
			userId: String(localStorage.getItem("userId")),
			postId: postId,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
				setCurrentReaction(null);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div className="relative add-reaction bg-black text-white rounded-full w-8 h-8 flex items-center cursor-pointer z-10">
			<label className="absolute right-8 px-4 py-2 rounded-lg shadow-xl bg-white z-20 justify-self-start">
				{reactions.map((reaction: ReactionsType) => (
					<span
						key={reaction.id}
						className="cursor-pointer hover:text-5xl ease-in-out duration-100 align-baseline"
						onClick={() => handleAddingReaction(reaction.id)}
					>
						{currentReaction?.reactionId === reaction.id
							? ""
							: reaction.emojie}
					</span>
				))}
			</label>

			{currentReaction ? (
				<div onClick={handleRemoveUserReaction}>
					{currentReaction.emojie}
				</div>
			) : (
				<AddOutlinedIcon className="m-auto" />
			)}
		</div>
	);
}
